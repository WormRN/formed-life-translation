#!/usr/bin/env node
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import {json,emit,event,requestModel,sha256} from './core.js';
import {buildListenerPrompt,buildSourceAwarePrompt,assertSmoothingIntegrity,smoothingDecisionBrief} from './smoothing-core.js';
import {parseModelJson} from './sense-resolution-core.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const configPath=path.resolve(process.argv[2]);
const runDir=path.resolve(process.argv[3]);
const candidatePath=path.resolve(process.argv[4]);
const sourcePath=path.resolve(process.argv[5]);
const config=await json(configPath),candidate=await json(candidatePath),source=await json(sourcePath);
const ajv=new Ajv2020({allErrors:true});
const validateDiagnosis=ajv.compile(await json(path.join(root,'schemas/oral-listener-diagnosis.schema.json')));
const validateProposal=ajv.compile(await json(path.join(root,'schemas/source-aware-smoothing.schema.json')));
const parse=parseModelJson;

async function call(worker,stage,prompt,validate,assert=()=>{}){
  let repair='';
  for(let attempt=1;attempt<=3;attempt++){
    const full=`Return complete JSON only. ${repair}\n${prompt}`;
    const started=new Date(),controller=new AbortController(),timer=setTimeout(()=>controller.abort(),config.timeout_ms||180000);
    try{
      const r=await requestModel(worker,full,controller.signal);
      await emit(runDir,`failures/raw/${stage}/${worker.role}/attempt-${attempt}.txt`,r.text);
      const output=parse(r.text);
      if(!validate(output)){repair=`Repair schema errors: ${JSON.stringify(validate.errors)}. Be concise.`;throw new Error(repair)}
      assert(output);
      const record={run_id:config.run_id,unit_id:config.unit_id,stage,role:worker.role,attempt,input_sha256:sha256(full),output,provider_provenance:{provider:worker.provider,model:worker.model,request_id:r.id,started_at:started.toISOString(),finished_at:new Date().toISOString(),usage:r.usage}};
      await event(runDir,{type:`${stage}_complete`,role:worker.role,attempt});
      return record;
    }catch(e){
      if(!repair)repair=`Previous output was incomplete or malformed: ${String(e)}. Be concise and close the JSON.`;
      await event(runDir,{type:`${stage}_failure`,role:worker.role,attempt,error:String(e)});
      if(attempt===3)throw e;
    }finally{clearTimeout(timer)}
  }
}

const listenerPrompt=buildListenerPrompt(candidate);
const diagnoses=await Promise.all(config.workers.map(w=>call(w,'listener_only_diagnosis',listenerPrompt,validateDiagnosis,o=>{
  const allowed=new Set(candidate.verse_renderings.map(v=>v.reference));
  const seen=new Set();
  for(const x of o.verse_observations){if(!allowed.has(x.reference))throw new Error(`Unknown listener reference ${x.reference}`);if(seen.has(x.reference))throw new Error(`Duplicate listener reference ${x.reference}`);seen.add(x.reference)}
})));
for(const x of diagnoses)await emit(runDir,`outputs/listener-diagnoses/${x.role}.json`,x);

const anonymous=Object.fromEntries(diagnoses.map((x,i)=>[`Listener ${i+1}`,x.output]));
const smoothingPrompt=buildSourceAwarePrompt(candidate,source,anonymous);
const proposals=await Promise.all(config.workers.map(w=>call(w,'source_aware_smoothing',smoothingPrompt,validateProposal,o=>assertSmoothingIntegrity(candidate,o))));
for(const x of proposals)await emit(runDir,`outputs/smoothing-proposals/${x.role}.json`,x);
await emit(runDir,'outputs/oral-smoothing-decision-brief.md',smoothingDecisionBrief(candidate,proposals));
await emit(runDir,'manifest/oral-smoothing-provenance.json',{run_id:config.run_id,candidate_id:candidate.candidate_id,listener_only_input_sha256:sha256(listenerPrompt),listener_diagnoses:diagnoses.map(x=>x.provider_provenance),source_aware_proposals:proposals.map(x=>x.provider_provenance),visibility:'Listener-only diagnosis saw selected English only. Source-aware proposals saw the selected English, anonymous listener reports, Greek source data, governing rules, and matrix entries. No comparison translation was exposed.',status:'human_smoothing_decision_required'});
console.log('Oral-English smoothing proposals complete; human decision required');
