import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {emit} from './core.js';

export const MAX_WORKER_ATTEMPTS=2;
export const MAX_TASK_ATTEMPTS=8;
export const TRANSIENT_HTTP_STATUSES=new Set([429,500,502,503,504]);
export const EXTERNAL_RETRY_DELAYS_MS=[0,60000,300000];

export function classifyHttpStatus(status,{newResourceLookup=false}={}){
  if(TRANSIENT_HTTP_STATUSES.has(status))return {retryable:true,reason:'transient_http'};
  if(status===404&&newResourceLookup)return {retryable:true,reason:'new_resource_not_indexed'};
  return {retryable:false,reason:'nontransient_http'};
}

async function readJson(file){
  try{return JSON.parse(await readFile(file,'utf8'));}
  catch(error){if(error?.code==='ENOENT')return null;throw error;}
}

const locks=new Map();
async function serialized(key,operation){
  const previous=locks.get(key)??Promise.resolve();
  let release;
  const current=new Promise(resolve=>{release=resolve;});
  const queued=previous.then(()=>current);
  locks.set(key,queued);
  await previous;
  try{return await operation();}
  finally{release();if(locks.get(key)===queued)locks.delete(key);}
}

export async function haltTask(runDir,details){
  const report={
    schema_version:1,
    status:'SYSTEM_HALT',
    halt_code:details.halt_code,
    task_id:details.task_id,
    failed_operation:details.failed_operation,
    attempts_used:details.attempts_used,
    attempts_allowed:details.attempts_allowed,
    provider_calls_made:details.provider_calls_made,
    valid_checkpoints_preserved:details.valid_checkpoints_preserved??[],
    unsent_payload_path:details.unsent_payload_path??null,
    human_unlock_required:true,
    further_external_actions_authorized:false,
    further_paid_calls_authorized:false,
    error:details.error??null,
    halted_at:new Date().toISOString()
  };
  await emit(runDir,'manifest/system-halt.json',report);
  const error=new Error(`SYSTEM HALT: ${report.halt_code}`);
  error.name='CircuitBreakerHalt';
  error.haltReport=report;
  throw error;
}

export function validateCircuitBreakerConfig(config){
  const workerLimit=config.max_attempts??MAX_WORKER_ATTEMPTS;
  const taskLimit=config.task_max_attempts??MAX_TASK_ATTEMPTS;
  if(!config.task_id)throw new Error('Preflight: task_id is required for cumulative attempt accounting.');
  if(!Number.isInteger(workerLimit)||workerLimit<1||workerLimit>MAX_WORKER_ATTEMPTS)throw new Error(`Preflight: max_attempts must be 1-${MAX_WORKER_ATTEMPTS}.`);
  if(!Number.isInteger(taskLimit)||taskLimit<1||taskLimit>MAX_TASK_ATTEMPTS)throw new Error(`Preflight: task_max_attempts must be 1-${MAX_TASK_ATTEMPTS}.`);
  if(taskLimit<workerLimit)throw new Error('Preflight: task_max_attempts cannot be below max_attempts.');
  return {workerLimit,taskLimit};
}

export async function reserveProviderAttempt({config,runDir,stage,role}){
  const {taskLimit}=validateCircuitBreakerConfig(config);
  const ledgerFile=path.join(runDir,'manifest/task-attempt-budget.json');
  return serialized(ledgerFile,async()=>{
    const existing=await readJson(ledgerFile);
    const ledger=existing??{schema_version:1,task_id:config.task_id,attempts_allowed:taskLimit,attempts_used:0,reservations:[]};
    if(ledger.task_id!==config.task_id)throw new Error('Preflight: restored task ledger belongs to a different task_id.');
    if(ledger.attempts_allowed!==taskLimit)throw new Error('Preflight: restored task ledger budget differs from the authorized budget.');
    if(ledger.attempts_used>=taskLimit){
      return haltTask(runDir,{halt_code:'TASK_PROVIDER_BUDGET_EXHAUSTED',task_id:config.task_id,failed_operation:`${stage}/${role}`,attempts_used:ledger.attempts_used,attempts_allowed:taskLimit,provider_calls_made:ledger.attempts_used});
    }
    ledger.attempts_used++;
    ledger.reservations.push({sequence:ledger.attempts_used,stage,role,reserved_at:new Date().toISOString()});
    await emit(runDir,'manifest/task-attempt-budget.json',ledger);
    return ledger.attempts_used;
  });
}
