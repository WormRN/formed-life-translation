#!/usr/bin/env node
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {readFile} from 'node:fs/promises';
import Ajv2020 from 'ajv/dist/2020.js';
import {json,emit,event,requestModel,sha256,assertVerseSequence,expectedReferences,COMMON_CANDIDATE_MISSION} from './core.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const configPath=path.resolve(process.argv[2]);
const runDir=path.resolve(process.argv[3]);
const config=await json(configPath);
const source=await json(path.resolve(path.dirname(configPath),config.source_packet));
const expected=expectedReferences(source.source_data);
const ajv=new Ajv2020({allErrors:true});
const validators={
  focused:ajv.compile(await json(path.join(root,'schemas/focused-check.schema.json'))),
  synthesis:ajv.compile(await json(path.join(root,'schemas/synthesis.schema.json'))),
  evaluation:ajv.compile(await json(path.join(root,'schemas/synthesis-evaluation.schema.json')))
};
const roleOrder=[...config.workers].map(x=>x.role).sort();
const draftLabel=Object.fromEntries(roleOrder.map((r,i)=>[r,`Draft ${String.fromCharCode(65+i)}`]));
const candidateLabel=Object.fromEntries(roleOrder.map((r,i)=>[r,`Candidate ${String.fromCharCode(65+i)}`]));
const resume=process.argv.includes('--resume');
const drafts=Object.fromEntries(await Promise.all(config.workers.map(async w=>[draftLabel[w.role],(await json(path.join(runDir,`outputs/drafts/${w.role}.json`))).output.verse_renderings])));

function parse(text){if(!text?.trim())throw new Error('EMPTY_MODEL_RESPONSE');const candidate=text.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1]||text;try{return JSON.parse(candidate)}catch(e){throw new Error(`MALFORMED_OR_TRUNCATED_JSON: ${e.message}`)}}
async function modelCall(worker,stage,prompt,validate){
  let repair='';
  for(let attempt=1;attempt<=3;attempt++){
    const complete=`Return one complete JSON object only. ${repair}\n${prompt}`;
    const started=new Date(),controller=new AbortController(),timer=setTimeout(()=>controller.abort(),config.timeout_ms||180000);
    try{
      const r=await requestModel(worker,complete,controller.signal);
      await emit(runDir,`failures/raw/${stage}/${worker.role}/attempt-${attempt}.txt`,r.text);
      const output=parse(r.text);
      if(!validate(output)){repair=`Your previous JSON failed schema validation. Repair the complete response. Errors: ${JSON.stringify(validate.errors)}`;throw new Error(`Schema validation: ${JSON.stringify(validate.errors)}`)}
      const record={run_id:config.run_id,unit_id:config.unit_id,stage,reviewer_role:worker.role,attempt,input_sha256:sha256(complete),output,provider_provenance:{provider:worker.provider,model:worker.model,request_id:r.id,started_at:started.toISOString(),finished_at:new Date().toISOString(),usage:r.usage}};
      await event(runDir,{type:`${stage}_complete`,role:worker.role,attempt});return record;
    }catch(e){if(!repair)repair=`Your previous response was empty, truncated, or malformed (${String(e)}). Be concise and close every JSON structure.`;await event(runDir,{type:`${stage}_failure`,role:worker.role,attempt,error:String(e),repair_feedback_added:true});if(attempt===3)throw e}
    finally{clearTimeout(timer)}
  }
}
async function resumeOrCall(worker,stage,relative,prompt,validate,assertOutput=()=>{}){
  if(resume){
    try{
      const prior=await json(path.join(runDir,relative));
      if(validate(prior.output)){assertOutput(prior.output);await event(runDir,{type:`${stage}_reused`,role:worker.role,source_run_id:prior.run_id});return prior}
    }catch(e){await event(runDir,{type:`${stage}_reuse_unavailable`,role:worker.role,error:String(e)})}
    for(let attempt=3;attempt>=1;attempt--){
      try{
        const raw=await readFile(path.join(runDir,`failures/raw/${stage}/${worker.role}/attempt-${attempt}.txt`),'utf8');
        const output=parse(raw);
        if(validate(output)){
          assertOutput(output);
          const recovered={run_id:config.run_id,unit_id:config.unit_id,stage,reviewer_role:worker.role,attempt,output,input_sha256:null,provider_provenance:{provider:worker.provider,model:worker.model,request_id:null,usage:{},recovery_note:'Validated raw response recovered after parent stage aborted before envelope emission.'}};
          await event(runDir,{type:`${stage}_raw_recovered`,role:worker.role,attempt});return recovered;
        }
      }catch{}
    }
  }
  return modelCall(worker,stage,prompt,validate);
}

const evidence=[];
for(const critic of config.workers){
  const own=await json(path.join(runDir,`outputs/critiques/self/${critic.role}.json`));
  for(const f of own.output.findings)evidence.push({...f,draft_label:draftLabel[critic.role],evidence_scope:'self'});
  const cross=await json(path.join(runDir,`outputs/critiques/cross/${critic.role}.json`));
  const others=roleOrder.filter(r=>r!==critic.role);
  const localMap=Object.fromEntries(others.map((r,i)=>[`Draft ${String.fromCharCode(65+i)}`,draftLabel[r]]));
  for(const f of cross.output.findings)evidence.push({...f,draft_label:localMap[f.draft_label]||f.draft_label,evidence_scope:'cross'});
}

const common={source_data:source.source_data,governing_rules:source.governing_rules,matrix_entries:source.matrix_entries,drafts,critique_evidence:evidence};
const focused=await Promise.all(config.workers.map(w=>resumeOrCall(w,'focused_check',`outputs/focused-checks/${w.role}.json`,`Mission: ${COMMON_CANDIDATE_MISSION} Examine every draft and critique claim under that same mission. Resolve what evidence permits; preserve genuine ambiguity; do not create a translation. Provider and author identities are unavailable. Human preferences, benchmark wording, and comparison translations are forbidden. Schema: {"specialty":"...","findings":[{"reference":"...","issue":"...","analysis":"...","recommendation":"...","confidence":"high|medium|low"}],"convergences":["..."],"human_decisions":[{"reference":"...","question":"...","credible_options":["...","..."],"stakes":"..."}]}. MATERIAL: ${JSON.stringify(common)}`,validators.focused)));
for(const x of focused)await emit(runDir,`outputs/focused-checks/${x.reviewer_role}.json`,x);

const focusedAnonymous=Object.fromEntries(focused.map((x,i)=>[`Specialist Report ${i+1}`,x.output]));
const synthPrompt=`Act as one independent controlled synthesizer. Produce a new candidate for ${source.passage||config.unit_id} from the three anonymous drafts and specialist reports. Follow the source and governing rules. Do not vote, copy a whole draft by default, infer identities, consult comparison translations, or claim final authority. Preserve unresolved choices explicitly. Schema: {"verse_renderings":[{"reference":"${expected[0]}","text":"..."}],"change_log":[{"reference":"...","choice":"...","warrant":"..."}],"unresolved_decisions":[{"reference":"...","question":"...","options":["...","..."]}],"self_assessment":"..."}. Include exactly these verses in order: ${expected.join(', ')}. MATERIAL: ${JSON.stringify({...common,focused_reports:focusedAnonymous})}`;
const syntheses=await Promise.all(config.workers.map(w=>resumeOrCall(w,'independent_synthesis',`outputs/syntheses/${w.role}.json`,synthPrompt,validators.synthesis,o=>assertVerseSequence(o,expected))));
for(const x of syntheses){assertVerseSequence(x.output,expected);await emit(runDir,`outputs/syntheses/${x.reviewer_role}.json`,x)}

const candidates=Object.fromEntries(syntheses.map(x=>[candidateLabel[x.reviewer_role],x.output]));
const compactSource={edition:source.source_data.edition,verses:source.source_data.verses.map(v=>({reference:v.reference,greek:v.greek}))};
const evaluationPrompt=`Blindly evaluate all three candidate syntheses against the Greek source, governing rules, and specialist reports. Evaluate each candidate independently before making verse-level preferences. Do not infer authorship, create replacement wording, or declare a final translation. A model vote is advisory; send value-laden or genuinely underdetermined choices to the human. Be concise: at most four strengths and four risks per candidate; keep each item under 240 characters and each vote reason under 400 characters. Schema: {"candidate_assessments":[{"candidate_label":"Candidate A","strengths":["..."],"risks":["..."]}],"verse_preferences":[{"reference":"${expected[0]}","preferred_candidate":"Candidate A|Candidate B|Candidate C|hybrid|human_choice","reason":"...","confidence":"high|medium|low"}],"remaining_human_decisions":[{"reference":"...","question":"...","why_model_vote_is_insufficient":"..."}]}. Include all three candidates and exactly these verse preferences in order: ${expected.join(', ')}. MATERIAL: ${JSON.stringify({source_data:compactSource,governing_rules:source.governing_rules,matrix_entries:source.matrix_entries,focused_reports:focusedAnonymous,candidates})}`;
const evaluations=await Promise.all(config.workers.map(w=>resumeOrCall(w,'blind_synthesis_evaluation',`outputs/evaluations/${w.role}.json`,evaluationPrompt,validators.evaluation)));
for(const x of evaluations)await emit(runDir,`outputs/evaluations/${x.reviewer_role}.json`,x);

let brief=`# FLT Phase 4 — Ensemble Human Decision Brief\n\n**Unit:** ${source.passage||config.unit_id}  \n**Status:** Advisory ensemble complete; no wording is finalized.  \n**Run:** ${config.run_id}\n\n## Independent synthesis candidates\n\n`;
for(const label of Object.keys(candidates)){brief+=`### ${label}\n\n${candidates[label].verse_renderings.map(v=>`**${v.reference.split('.').at(-1)}** ${v.text}`).join('\n\n')}\n\n`}
brief+='## Blind verse-level evaluation votes\n\n';
for(const ref of expected){const votes=evaluations.map(x=>x.output.verse_preferences.find(v=>v.reference===ref));brief+=`### ${ref}\n\n${votes.map((v,i)=>`- Evaluator ${i+1}: **${v.preferred_candidate}** (${v.confidence}) — ${v.reason}`).join('\n')}\n\n`}
brief+='## Decisions explicitly reserved for the human\n\n';
const decisions=[...focused.flatMap(x=>x.output.human_decisions),...evaluations.flatMap(x=>x.output.remaining_human_decisions)];
brief+=decisions.length?decisions.map((d,i)=>`${i+1}. **${d.reference}** — ${d.question}${d.stakes?`  \n   Stakes: ${d.stakes}`:''}${d.why_model_vote_is_insufficient?`  \n   Why reserved: ${d.why_model_vote_is_insufficient}`:''}`).join('\n\n'):'No report reserved a decision; the human must still approve or return the unit.';
brief+='\n\n## Human authority\n\nChoose a candidate or verse-level combination, request another focused check, or return the unit for revision. Model votes are evidence, not authority.\n';
await emit(runDir,'outputs/human-decision-brief.md',brief);
await emit(runDir,'manifest/review_provenance.json',{run_id:config.run_id,parent_run_id:(await json(path.join(runDir,'manifest/review_recovery.json'))).parent_run_id,draft_label_map:draftLabel,candidate_label_map:candidateLabel,focused_checks:focused.map(x=>x.provider_provenance),independent_syntheses:syntheses.map(x=>x.provider_provenance),blind_evaluations:evaluations.map(x=>x.provider_provenance),visibility:'source + anonymous drafts + normalized anonymous critique evidence; no benchmark, comparison translations, provider identity, or human wording preference',role_reuse_disclosure:'The same three providers serve in sequential common-mission review, synthesis, and evaluation stages; calls are independent but providers are not unique across stages.',status:'human_decision_required'});
console.log('Focused checking, synthesis, and blind evaluation complete');
