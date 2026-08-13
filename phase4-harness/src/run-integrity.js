import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {emit,event,requestModel,sha256} from './core.js';
import {classifyHttpStatus,haltTask,reserveProviderAttempt,validateCircuitBreakerConfig} from './circuit-breaker.js';

const unavailableUsage={available:false,reason:'provider response usage unavailable'};
async function readCheckpoint(file){try{return JSON.parse(await readFile(file,'utf8'));}catch(error){if(error?.code==='ENOENT')return null;throw error}}
export function workerCallFingerprint({stage,worker,prompt}){return sha256({schema_version:1,stage,role:worker.role,provider:worker.provider,model:worker.model,resolved_snapshot:worker.resolved_snapshot??null,snapshot_status:worker.snapshot_status??null,base_prompt_sha256:sha256(prompt)});}

function retryDisposition(error){
  const status=error?.httpStatus??Number(String(error).match(/HTTP\s+(\d{3})/)?.[1]);
  if(Number.isInteger(status))return classifyHttpStatus(status,{newResourceLookup:error?.newResourceLookup===true});
  if(error?.retryable===false)return {retryable:false,reason:'explicit_nonretryable'};
  return {retryable:true,reason:'schema_or_transport_repair'};
}

export async function executeJsonWorker({config,runDir,worker,stage,prompt,parse,validate,assert=()=>{},recordContext={},rawPrefix=`failures/raw/${stage}/${worker.role}`,request=requestModel}){
  const {workerLimit:maxAttempts,taskLimit}=validateCircuitBreakerConfig(config);
  const timeoutMs=config.timeout_ms||180000;
  const fingerprint=workerCallFingerprint({stage,worker,prompt});
  const checkpointFile=path.join(runDir,'checkpoints',stage,`${worker.role}.json`);
  const checkpoint=await readCheckpoint(checkpointFile);
  if(checkpoint){
    try{
      if(checkpoint.fingerprint!==fingerprint)throw new Error('checkpoint fingerprint mismatch');
      if(checkpoint.record?.provider_provenance?.provider!==worker.provider||checkpoint.record?.provider_provenance?.model!==worker.model)throw new Error('checkpoint provider/model mismatch');
      if((checkpoint.record?.provider_provenance?.resolved_snapshot??null)!==(worker.resolved_snapshot??null))throw new Error('checkpoint resolved snapshot mismatch');
      if((checkpoint.record?.provider_provenance?.snapshot_status??null)!==(worker.snapshot_status??null))throw new Error('checkpoint snapshot status mismatch');
      if(!validate(checkpoint.record.output))throw new Error(`checkpoint schema invalid: ${JSON.stringify(validate.errors)}`);
      assert(checkpoint.record.output);
      await event(runDir,{type:`${stage}_checkpoint_resumed`,role:worker.role,fingerprint});
      return {...checkpoint.record,resumed_from_checkpoint:true};
    }catch(error){await event(runDir,{type:`${stage}_checkpoint_rejected`,role:worker.role,fingerprint,error:String(error)});}
  }
  let repair='';
  for(let attempt=1;attempt<=maxAttempts;attempt++){
    const full=`Return complete JSON only. ${repair}\n${prompt}`;
    const started=new Date();
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),timeoutMs);
    let response=null,output=null,outcome='request_failed',taskAttempt=null;
    try{
      taskAttempt=await reserveProviderAttempt({config,runDir,stage,role:worker.role});
      response=await request(worker,full,controller.signal);
      await emit(runDir,`${rawPrefix}/attempt-${attempt}.txt`,response.text);
      output=parse(response.text);
      if(!validate(output)){repair=`Repair schema errors: ${JSON.stringify(validate.errors)}. Be concise.`;throw new Error(repair);}
      assert(output);outcome='accepted';
      const finished=new Date();
      const record={run_id:config.run_id,task_id:config.task_id,stage,role:worker.role,attempt,task_attempt:taskAttempt,input_sha256:sha256(full),output,...recordContext,provider_provenance:{provider:worker.provider,model:worker.model,resolved_snapshot:worker.resolved_snapshot??null,snapshot_status:worker.snapshot_status??null,request_id:response.id,started_at:started.toISOString(),finished_at:finished.toISOString(),usage:response.usage??unavailableUsage}};
      await emit(runDir,`manifest/attempts/${stage}/${worker.role}/attempt-${attempt}.json`,{schema_version:1,run_id:config.run_id,task_id:config.task_id,stage,role:worker.role,provider:worker.provider,model:worker.model,resolved_snapshot:worker.resolved_snapshot??null,snapshot_status:worker.snapshot_status??null,attempt,task_attempt:taskAttempt,fingerprint,input_sha256:sha256(full),output_sha256:sha256(response.text),request_id:response.id??null,started_at:started.toISOString(),finished_at:finished.toISOString(),outcome,usage:response.usage??unavailableUsage});
      await emit(runDir,`checkpoints/${stage}/${worker.role}.json`,{schema_version:1,fingerprint,validated_at:finished.toISOString(),record});
      await event(runDir,{type:`${stage}_complete`,role:worker.role,attempt,task_attempt:taskAttempt,fingerprint});
      return record;
    }catch(error){
      if(error?.name==='CircuitBreakerHalt')throw error;
      if(response)outcome='response_rejected';
      if(!repair)repair=`Previous output was incomplete or malformed: ${String(error)}. Be concise and close the JSON.`;
      await emit(runDir,`manifest/attempts/${stage}/${worker.role}/attempt-${attempt}.json`,{schema_version:1,run_id:config.run_id,task_id:config.task_id,stage,role:worker.role,provider:worker.provider,model:worker.model,resolved_snapshot:worker.resolved_snapshot??null,snapshot_status:worker.snapshot_status??null,attempt,task_attempt:taskAttempt,fingerprint,input_sha256:sha256(full),output_sha256:response?sha256(response.text):null,request_id:response?.id??null,started_at:started.toISOString(),finished_at:new Date().toISOString(),outcome,usage:response?.usage??unavailableUsage,error:String(error)});
      await event(runDir,{type:`${stage}_failure`,role:worker.role,attempt,task_attempt:taskAttempt,fingerprint,error:String(error),usage_recorded:Boolean(response?.usage)});
      const disposition=retryDisposition(error);
      if(!disposition.retryable||attempt===maxAttempts){
        await haltTask(runDir,{halt_code:disposition.retryable?'WORKER_ATTEMPT_LIMIT_EXHAUSTED':'NONTRANSIENT_EXTERNAL_FAILURE',task_id:config.task_id,failed_operation:`${stage}/${worker.role}`,attempts_used:taskAttempt,attempts_allowed:taskLimit,provider_calls_made:taskAttempt,error:String(error)});
      }
    }finally{clearTimeout(timer);}
  }
}

export const attemptAccountingNotice={scope:'Every model attempt is reserved against one persistent task ledger before the request. Restored checkpoints consume no call allowance.',billing_limit:'Provider dashboards remain authoritative for calls that fail before usage metadata is returned.',worker_limit:2,task_limit:8};
