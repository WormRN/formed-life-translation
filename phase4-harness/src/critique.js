#!/usr/bin/env node
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import {json,emit,event,requestModel,sha256} from './core.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const configPath=path.resolve(process.argv[2]);
const runDir=path.resolve(process.argv[3]);
const config=await json(configPath);
const source=await json(path.resolve(path.dirname(configPath),config.source_packet));
const schema=await json(path.join(root,'schemas/critique.schema.json'));
const validate=new Ajv2020({allErrors:true}).compile(schema);
const drafts=Object.fromEntries(await Promise.all(config.workers.map(async w=>[w.role,await json(path.join(runDir,`outputs/drafts/${w.role}.json`))])));
const parse=t=>{if(!t?.trim())throw new Error('EMPTY_MODEL_RESPONSE');const candidate=t.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1]||t;try{return JSON.parse(candidate)}catch(e){throw new Error(`MALFORMED_OR_TRUNCATED_JSON: ${e.message}`)}};
const exampleRef=source.source_data?.verses?.[0]?.reference||'BOOK.CHAPTER.VERSE';
const shape=`Return JSON only: {"scope":"self|cross","strengths":["..."],"findings":[{"draft_label":"...","reference":"${exampleRef}","severity":"must_revise|should_consider|minor","category":"semantic_coverage|readability|discourse|meaningful_form|theological_restraint|matrix_precedent|oral_flow|other","finding":"...","recommendation":"..."}],"human_only_questions":[{"reference":"...","question":"..."}]}. Never produce a replacement translation or claim final authority.`;

async function call(worker,stage,payload){
  let repair='';
  for(let attempt=1;attempt<=3;attempt++){
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),180000),started=new Date();
    try{
      const prompt=`${shape}\n${repair}\nGOVERNING SOURCE AND RULES:\n${JSON.stringify({source_data:source.source_data,governing_rules:source.governing_rules,matrix_entries:source.matrix_entries})}\n\nTASK:\n${payload}`;
      const r=await requestModel(worker,prompt,controller.signal);
      await emit(runDir,`failures/raw/${stage}/${worker.role}/attempt-${attempt}.txt`,r.text);
      const output=parse(r.text);
      if(!validate(output)){
        repair=`IMPORTANT REPAIR: Your previous JSON failed validation. Correct only the schema problems and return the complete JSON again. Errors: ${JSON.stringify(validate.errors)}\n`;
        throw new Error(`Schema validation: ${JSON.stringify(validate.errors)}`);
      }
      const record={run_id:config.run_id,unit_id:config.unit_id,stage,critic_role:worker.role,attempt,input_sha256:sha256(prompt),output,provider_provenance:{provider:worker.provider,model:worker.model,request_id:r.id,started_at:started.toISOString(),finished_at:new Date().toISOString(),usage:r.usage}};
      await event(runDir,{type:`${stage}_complete`,role:worker.role,attempt});return record;
    }catch(e){if(!repair)repair=`IMPORTANT REPAIR: Your previous response was empty, truncated, or malformed (${String(e)}). Return one complete JSON object only, using the exact required schema. Be concise and reserve enough output tokens to close the JSON object.\n`;await event(runDir,{type:`${stage}_failure`,role:worker.role,attempt,error:String(e),repair_feedback_added:true});if(attempt===3)throw e}
    finally{clearTimeout(timer)}
  }
}

const self=await Promise.all(config.workers.map(w=>call(w,'self_critique',`Critique only your own draft below. You may see no sibling draft. Set scope=self and draft_label=OWN.\n${JSON.stringify(drafts[w.role].output)}`)));
for(const x of self)await emit(runDir,`outputs/critiques/self/${x.critic_role}.json`,x);
const cross=await Promise.all(config.workers.map(w=>{const others=config.workers.filter(x=>x.role!==w.role).sort((a,b)=>a.role.localeCompare(b.role));const anonymous=Object.fromEntries(others.map((x,i)=>[`Draft ${String.fromCharCode(65+i)}`,drafts[x.role].output.verse_renderings]));return call(w,'cross_critique',`Critique the two anonymous sibling drafts. Their identities are forbidden. Do not infer identities. Set scope=cross and use only Draft A or Draft B as draft_label.\n${JSON.stringify(anonymous)}`)}));
for(const x of cross)await emit(runDir,`outputs/critiques/cross/${x.critic_role}.json`,x);
await emit(runDir,'manifest/critique_provenance.json',{run_id:config.run_id,unit_id:config.unit_id,self_critiques:self.map(x=>x.provider_provenance),cross_critiques:cross.map(x=>x.provider_provenance),visibility:'self sees own draft only; cross sees two anonymous sibling drafts; benchmark, comparison translations, identities, and human preferences absent',status:'ready_for_focused_checking'});
console.log('Critique stage complete');
