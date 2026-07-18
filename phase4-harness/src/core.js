import {createHash} from 'node:crypto';
import {mkdir, readFile, writeFile, appendFile} from 'node:fs/promises';
import path from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

export const ROLES={
  readability_worker:'Produce exceptionally clear, natural, adult English near a sixth-grade reading level while preserving all warranted meaning.',
  greek_fidelity_worker:'Protect semantic coverage, discourse relations, scope, agency, ambiguity, and meaningful form while producing acceptable English.',
  balanced_worker:'Balance source fidelity with clear, natural FLT English; identify choices that require human judgment.'
};
export const sha256=v=>createHash('sha256').update(typeof v==='string'?v:JSON.stringify(v)).digest('hex');
export async function json(file){return JSON.parse(await readFile(file,'utf8'));}
export function validateSeparation(workers){
  if(workers.length!==3) throw new Error('Exactly three drafting workers are required.');
  if(new Set(workers.map(w=>w.role)).size!==3) throw new Error('Worker roles must be unique.');
  if(new Set(workers.map(w=>w.provider)).size!==3) throw new Error('Live Phase 4 requires three distinct providers.');
  if(new Set(workers.map(w=>`${w.provider}:${w.model}`)).size!==3) throw new Error('Provider/model identities must be unique.');
  for(const w of workers) if(!ROLES[w.role]) throw new Error(`Unknown role: ${w.role}`);
}
export function makePacket(source,runId,role){
  const packet={packet_id:`PKT-${source.unit_id}-${role.toUpperCase()}-${Date.now()}`,run_id:runId,unit_id:source.unit_id,role,passage:source.passage,visibility_class:['N','G'],role_mission:ROLES[role],source_data:source.source_data,governing_rules:source.governing_rules,matrix_entries:source.matrix_entries,scoped_precedents:source.scoped_precedents||[],forbidden_material_check:{benchmark_absent:true,copyright_text_absent:true,sibling_drafts_absent:true,prior_human_wording_absent:true},integrity_status:'pass'};
  const forbidden=['benchmark','copyright_text','sibling_drafts','prior_human_wording','candidate_text','comparison_translations'];
  const keys=[]; const walk=x=>{if(Array.isArray(x))x.forEach(walk);else if(x&&typeof x==='object')for(const [k,v] of Object.entries(x)){keys.push(k);walk(v)}}; walk(packet);
  const leaks=keys.filter(k=>forbidden.includes(k)&&!k.endsWith('_absent'));
  if(leaks.length) throw new Error(`Visibility violation: ${[...new Set(leaks)].join(', ')}`);
  if(Object.values(packet.forbidden_material_check).some(v=>v!==true)) throw new Error('Blindness attestation failed.');
  return packet;
}
export async function validators(root){
  const ajv=new Ajv2020({allErrors:true,strict:false}); addFormats(ajv);
  const draft=await json(path.join(root,'schemas/draft-output.schema.json')); ajv.addSchema(draft,'draft-output.schema.json');
  const envelope=await json(path.join(root,'schemas/role-output.schema.json'));
  return {draft:ajv.compile(draft),envelope:ajv.compile(envelope)};
}
export async function emit(base,relative,data){const file=path.join(base,relative);await mkdir(path.dirname(file),{recursive:true});await writeFile(file,typeof data==='string'?data:JSON.stringify(data,null,2)+'\n');return file;}
export async function event(base,event){await mkdir(path.join(base,'manifest'),{recursive:true});await appendFile(path.join(base,'manifest/event_log.jsonl'),JSON.stringify({...event,at:new Date().toISOString()})+'\n');}

function extractJson(text){const fenced=text.match(/```(?:json)?\s*([\s\S]*?)```/i);return JSON.parse(fenced?fenced[1]:text);}
function prompt(packet){return `You are an FLT drafting worker. Return JSON only, matching this shape: {"proposed_rendering":"...","verse_renderings":[{"reference":"Phil.1.12","text":"..."}],"significant_decisions":[{"reference":"...","decision":"...","rationale":"..."}],"risks":[{"reference":"...","kind":"meaning_loss|added_meaning|too_loose|too_literal|oral_flow|theological|other","detail":"..."}],"human_only_questions":[{"reference":"...","question":"..."}]}. Include exactly Philippians 1:12 through 1:18 in verse_renderings. Never claim final authority.\n\nROLE PACKET:\n${JSON.stringify(packet)}`;}
async function request(worker,packet,signal){
  const key=process.env[worker.api_key_env]; if(!key) throw Object.assign(new Error(`Missing ${worker.api_key_env}`),{retryable:false});
  const bodyText=prompt(packet); let url,headers={'content-type':'application/json'},body,parse;
  if(worker.provider==='openai'){url='https://api.openai.com/v1/responses';headers.authorization=`Bearer ${key}`;body={model:worker.model,input:bodyText};parse=j=>({text:j.output_text??j.output?.flatMap(x=>x.content||[]).map(x=>x.text||'').join(''),id:j.id,usage:j.usage||{}})}
  else if(worker.provider==='anthropic'){url='https://api.anthropic.com/v1/messages';headers['x-api-key']=key;headers['anthropic-version']='2023-06-01';body={model:worker.model,max_tokens:5000,messages:[{role:'user',content:bodyText}]};parse=j=>({text:(j.content||[]).map(x=>x.text||'').join(''),id:j.id,usage:j.usage||{}})}
  else if(worker.provider==='google'){url=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(worker.model)}:generateContent?key=${encodeURIComponent(key)}`;body={contents:[{parts:[{text:bodyText}]}],generationConfig:{responseMimeType:'application/json'}};parse=j=>({text:j.candidates?.[0]?.content?.parts?.map(x=>x.text||'').join('')||'',id:j.responseId||null,usage:j.usageMetadata||{}})}
  else throw Object.assign(new Error(`Unsupported provider ${worker.provider}`),{retryable:false});
  const res=await fetch(url,{method:'POST',headers,body:JSON.stringify(body),signal}); if(!res.ok)throw Object.assign(new Error(`${worker.provider} HTTP ${res.status}: ${(await res.text()).slice(0,500)}`),{retryable:res.status===408||res.status===429||res.status>=500});return parse(await res.json());
}
export async function runWorker({worker,packet,runDir,maxAttempts,timeoutMs,validate}){
  const packetHash=sha256(packet); const rawDir=`failures/raw/${worker.role}`;
  for(let attempt=1;attempt<=maxAttempts;attempt++){
    const started=new Date(); const controller=new AbortController(); const timer=setTimeout(()=>controller.abort(),timeoutMs);
    try{const response=await request(worker,packet,controller.signal);await emit(runDir,`${rawDir}/attempt-${attempt}.txt`,response.text);const output=extractJson(response.text);if(!validate(output))throw Object.assign(new Error(`Schema: ${JSON.stringify(validate.errors)}`),{retryable:true});const finished=new Date();const envelope={run_id:packet.run_id,unit_id:packet.unit_id,role:worker.role,attempt,status:'complete',input_packet_sha256:packetHash,output,self_finalization_claim:false,created_at:finished.toISOString(),provider_provenance:{provider:worker.provider,model:worker.model,request_id:response.id,started_at:started.toISOString(),finished_at:finished.toISOString(),latency_ms:finished-started,usage:response.usage},warnings:[],raw_output_path:`${rawDir}/attempt-${attempt}.txt`};await event(runDir,{type:'worker_complete',role:worker.role,attempt,packet_sha256:packetHash});return envelope}
    catch(error){await event(runDir,{type:'worker_failure',role:worker.role,attempt,retryable:error.retryable!==false,error:String(error)});if(error.retryable===false||attempt===maxAttempts)throw error}
    finally{clearTimeout(timer)}
  }
}
export function decisionBrief(outputs){
  let md=`# FLT Phase 4 — Human Decision Brief\n\n**Unit:** Philippians 1:12–18  \n**Status:** Human choice required; no wording is finalized.\n\n`;
  for(const o of outputs){md+=`## ${o.role.replaceAll('_',' ')}\n\n${o.output.proposed_rendering}\n\n`;}
  const questions=outputs.flatMap(o=>o.output.human_only_questions.map(q=>({...q,role:o.role})));
  md+='## Decisions requiring attention\n\n';md+=questions.length?questions.map((q,i)=>`${i+1}. **${q.reference} (${q.role})** — ${q.question}`).join('\n'):'No worker marked a human-only question. Compare the three renderings verse by verse and select a base candidate before synthesis.';
  md+='\n\n## Human action\n\nChoose a base rendering, record any verse-level choices, or return the unit for controlled revision. The harness will not select or silently merge a final text.\n';return md;
}
