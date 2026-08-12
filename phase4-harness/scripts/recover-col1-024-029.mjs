#!/usr/bin/env node
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {readFile} from 'node:fs/promises';
import Ajv2020 from 'ajv/dist/2020.js';
import {json,emit,event,requestModel,sha256} from '../src/core.js';
import {reserveProviderAttempt,haltTask,validateCircuitBreakerConfig} from '../src/circuit-breaker.js';
import {workerCallFingerprint} from '../src/run-integrity.js';
import {assertPassageSenseResolution,unitSenseMaterial,assertCandidateSenseApparatus,assertCommonBasePromptHash,parseModelJson} from '../src/sense-resolution-core.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const [configArg,runArg,sourceArg,priorArg]=process.argv.slice(2);
const preflightOnly=process.argv.includes('--preflight-only');
if(!priorArg)throw new Error('usage: recover-col1-024-029.mjs <config> <runDir> <source> <priorArtifactDir> [--preflight-only]');
const configPath=path.resolve(configArg),runDir=path.resolve(runArg),sourcePath=path.resolve(sourceArg),priorDir=path.resolve(priorArg);
const config=await json(configPath),chapter=await json(sourcePath);
validateCircuitBreakerConfig(config);
const passageSenseBrief=assertPassageSenseResolution(chapter);
const unit=chapter.units?.[0];
if(!unit||unit.unit_id!=='COL-01-024-029')throw new Error('Recovery source unit mismatch');
const validate=new Ajv2020({allErrors:true}).compile(await json(path.join(root,'schemas/chapter-unit-candidate.schema.json')));
const commonMission='Produce one independent FLT candidate under the same constitutional goal as every other candidate: communicate the full meaning, logic, tone, discourse movement, and theological force of the Greek in clear, natural, dignified English that a religion-naive adult can follow on one hearing. Build natural English sentences and paragraphs rather than preserving Greek clause architecture. Dynamic expression is the default; preserve material meaning and avoid unsupported commentary.';
const common={project:{translation_identity:chapter.translation_identity,target_reader:chapter.target_reader,tone:chapter.tone,engine_version:'2.2'},governing_rules:chapter.governing_rules,existing_decisions:chapter.existing_decisions,matrix_entries:chapter.matrix_alerts||[],passage_sense_resolution:unitSenseMaterial(passageSenseBrief,unit),unit:{unit_id:unit.unit_id,passage:unit.passage,title:unit.title,known_issues:unit.known_issues,verses:unit.verses},visibility:{sealed_human_unit_absent:!chapter.sealed_unit,prior_flt_wording_absent:true,prior_candidates_absent:true,editor_benchmark_absent:true,comparison_translations_absent:true}};
const prompt=`You are drafting one blind unit for FLT ${chapter.book} ${chapter.chapter}. Mission: ${commonMission} The reading text is firmly dynamic-equivalence; closeness to Greek form is not a virtue by itself. Make the main assertion easy to hear; split, combine, reorder, or unpack when needed. Actively avoid stacked clauses, preposition clusters, delayed subjects or main verbs, abstract-noun chains, embedded explanations, repetitive English openings, and translated-sounding prose. Preserve deliberate repetition, escalation, logical relationships, meaningful ambiguity, agency, force, and key-term links. Do not self-certify oral quality: record the oral design moves you made and any remaining risk. Do not reconstruct or refer to any sealed human wording. The passage-sense brief is source-side analysis completed before English composition. Follow each primary contextual sense. For every alternatives_retained entry, record one concise contested sense_decision, choose one primary reading in the verse, and expose one concise viable alternative only in alternate_readings; never place candidate alternatives in brackets inside the reading text. Provide a reader note for every entry marked reader_note_required. Keep every apparatus explanation to one sentence. Do not repeat the source brief. Return at most six dynamic_moves, six oral_design_moves, three remaining_oral_risks, five risks, and three human_questions. Schema: {"verse_renderings":[{"reference":"${unit.verses[0].reference}","text":"..."}],"paragraph_rendering":"...","dynamic_moves":[{"reference":"...","move":"...","warrant":"..."}],"oral_design_moves":[{"reference":"...","obstacle":"...","move":"...","source_warrant":"..."}],"sense_decisions":[{"sense_id":"...","reference":"...","primary_rendering_choice":"...","reason":"..."}],"alternate_readings":[{"sense_id":"...","reference":"...","primary_reading":"...","alternative_reading":"...","tradeoff":"..."}],"reader_notes":[{"sense_id":"...","reference":"...","note":"...","supports_dynamic_rendering":true}],"remaining_oral_risks":[{"reference":"...","risk":"..."}],"risks":[{"reference":"...","risk":"..."}],"human_questions":[{"reference":"...","question":"...","options":["...","..."]}]}. MATERIAL:${JSON.stringify(common)}`;
const baseHash=sha256(prompt);
const expectedRefs=unit.verses.map(v=>v.reference);
const assertOutput=output=>{
  if(!validate(output))throw new Error(`Schema invalid: ${JSON.stringify(validate.errors)}`);
  const refs=output.verse_renderings.map(v=>v.reference);
  if(JSON.stringify(refs)!==JSON.stringify(expectedRefs))throw new Error(`Return exactly these verse references in order: ${expectedRefs.join(', ')}`);
  assertCandidateSenseApparatus(output,unit,passageSenseBrief);
};
const unwrap=value=>Array.isArray(value)&&value.length===1?value[0]:value;

const priorLedger=await json(path.join(priorDir,'manifest/task-attempt-budget.json'));
const priorAttemptsDir=path.join(priorDir,'manifest/attempts/blind_reader_first_unit_draft');
const greekAttempt2=path.join(priorAttemptsDir,'greek_fidelity_worker/attempt-2.json');
let orphanHasAttemptRecord=true;try{await readFile(greekAttempt2,'utf8')}catch(e){if(e.code==='ENOENT')orphanHasAttemptRecord=false;else throw e}
if(priorLedger.attempts_used!==5||priorLedger.reservations?.[4]?.role!=='greek_fidelity_worker'||orphanHasAttemptRecord)throw new Error('Prior ledger does not match the Human-Editor-authorized orphan-reservation reconciliation');
const reconciledLedger={...priorLedger,attempts_used:4,reservations:priorLedger.reservations.slice(0,4),reconciliation:{released_orphan_sequence:5,reason:'No matching attempt record/provider response; balanced-worker halt won concurrent race',authorized_by:'HE-COL-01-024-029-RECOVER-20260811'}};
await emit(runDir,'manifest/task-attempt-budget.json',reconciledLedger);

const readabilityCheckpoint=await json(path.join(priorDir,'checkpoints/blind_reader_first_unit_draft/readability_worker.json'));
assertOutput(readabilityCheckpoint.record.output);
if(readabilityCheckpoint.record.base_prompt_sha256!==baseHash)throw new Error('Readability checkpoint common prompt hash mismatch');
const readability={...readabilityCheckpoint.record,resumed_from_checkpoint:true,recovered_from_run:'31545365297'};
await emit(runDir,'checkpoints/blind_reader_first_unit_draft/readability_worker.json',readabilityCheckpoint);
await event(runDir,{type:'blind_reader_first_unit_draft_checkpoint_resumed',role:'readability_worker',from_run:'31545365297'});

const balancedRaw=await readFile(path.join(priorDir,'failures/raw/COL-01-024-029/balanced_worker/attempt-2.txt'),'utf8');
const balancedOutput=unwrap(parseModelJson(balancedRaw));
assertOutput(balancedOutput);
const balancedMeta=await json(path.join(priorAttemptsDir,'balanced_worker/attempt-2.json'));
const balancedWorker=config.workers.find(w=>w.role==='balanced_worker');
const balanced={run_id:'FLT-COL-01-20260811-2',task_id:config.task_id,stage:'blind_reader_first_unit_draft',role:'balanced_worker',attempt:2,task_attempt:4,input_sha256:balancedMeta.input_sha256,output:balancedOutput,chapter_id:chapter.chapter_id,unit_id:unit.unit_id,base_prompt_sha256:baseHash,provider_provenance:{provider:balancedWorker.provider,model:balancedWorker.model,request_id:balancedMeta.request_id,started_at:balancedMeta.started_at,finished_at:balancedMeta.finished_at,usage:balancedMeta.usage},resumed_from_checkpoint:true,recovered_from_rejected_response:true,recovery_normalization:'single_element_array_unwrapped'};
const balancedFingerprint=workerCallFingerprint({stage:'blind_reader_first_unit_draft',worker:balancedWorker,prompt});
await emit(runDir,'checkpoints/blind_reader_first_unit_draft/balanced_worker.json',{schema_version:1,fingerprint:balancedFingerprint,validated_at:new Date().toISOString(),record:balanced});
await event(runDir,{type:'blind_reader_first_unit_draft_response_recovered',role:'balanced_worker',from_run:'31545365297',provider_calls_added:0});

if(preflightOnly){
  await emit(runDir,'manifest/recovery-preflight.json',{schema_version:1,status:'pass',task_id:config.task_id,base_prompt_sha256:baseHash,reconciled_attempts_used:4,readability_checkpoint_valid:true,balanced_singleton_array_valid:true,provider_attempts_reserved:0,provider_calls_made:0});
  console.log('Recovery preflight passed with zero provider calls');
  process.exit(0);
}

const greekWorker=config.workers.find(w=>w.role==='greek_fidelity_worker');
const taskAttempt=await reserveProviderAttempt({config,runDir,stage:'blind_reader_first_unit_draft',role:'greek_fidelity_worker'});
if(taskAttempt!==5)throw new Error(`Recovery expected cumulative task attempt 5, got ${taskAttempt}`);
const repair='This is the second and final authorized repair attempt. Return ONE JSON object, not an array. Correct all JSON syntax and quoting. Include every required schema field, exactly the six verse references in order, exactly the three contested sense decisions and alternate readings, and the required reader note. Do not add prose outside JSON.';
const full=`Return complete JSON only. ${repair}\n${prompt}`;
const started=new Date();const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),config.timeout_ms||300000);
let response;
try{
  response=await requestModel(greekWorker,full,controller.signal);
  await emit(runDir,'failures/raw/COL-01-024-029/greek_fidelity_worker/attempt-2.txt',response.text);
  const greekOutput=unwrap(parseModelJson(response.text));
  assertOutput(greekOutput);
  const finished=new Date();
  const greek={run_id:config.run_id,task_id:config.task_id,stage:'blind_reader_first_unit_draft',role:'greek_fidelity_worker',attempt:2,task_attempt:taskAttempt,input_sha256:sha256(full),output:greekOutput,chapter_id:chapter.chapter_id,unit_id:unit.unit_id,base_prompt_sha256:baseHash,provider_provenance:{provider:greekWorker.provider,model:greekWorker.model,request_id:response.id,started_at:started.toISOString(),finished_at:finished.toISOString(),usage:response.usage||{}},recovery_from_run:'31545365297'};
  await emit(runDir,'manifest/attempts/blind_reader_first_unit_draft/greek_fidelity_worker/attempt-2.json',{schema_version:1,run_id:config.run_id,task_id:config.task_id,stage:'blind_reader_first_unit_draft',role:'greek_fidelity_worker',provider:greekWorker.provider,model:greekWorker.model,attempt:2,task_attempt:taskAttempt,fingerprint:workerCallFingerprint({stage:'blind_reader_first_unit_draft',worker:greekWorker,prompt}),input_sha256:sha256(full),output_sha256:sha256(response.text),request_id:response.id??null,started_at:started.toISOString(),finished_at:finished.toISOString(),outcome:'accepted',usage:response.usage||{}});
  await emit(runDir,'checkpoints/blind_reader_first_unit_draft/greek_fidelity_worker.json',{schema_version:1,fingerprint:workerCallFingerprint({stage:'blind_reader_first_unit_draft',worker:greekWorker,prompt}),validated_at:finished.toISOString(),record:greek});
  await event(runDir,{type:'blind_reader_first_unit_draft_complete',role:'greek_fidelity_worker',attempt:2,task_attempt:taskAttempt});

  const byRole={readability_worker:readability,greek_fidelity_worker:greek,balanced_worker:balanced};
  const results=config.workers.map(w=>byRole[w.role]);
  assertCommonBasePromptHash(results);
  for(const x of results)await emit(runDir,`outputs/units/${unit.unit_id}/${x.role}.json`,x);
  let md=`# ${unit.passage} — Blind Reader-First Candidates\n\n**Status:** Human editing required; no candidate is approved.\n\n`;
  for(const [i,x] of results.entries())md+=`## Candidate ${String.fromCharCode(65+i)}\n\n${x.output.verse_renderings.map(v=>`**${v.reference.replace(/^Col\\.1\\./,'')}** ${v.text}`).join('\n\n')}\n\n`;
  await emit(runDir,`outputs/briefs/${unit.unit_id}.md`,md);
  await emit(runDir,'manifest/chapter-drafting-provenance.json',{run_id:config.run_id,task_id:config.task_id,chapter_id:chapter.chapter_id,common_prompt_sha256:baseHash,common_prompt_verified:true,passage_sense_gate:{version:'2.2',status:'passed',brief_status:passageSenseBrief.status,editor_benchmark_absent:true},recovery:{prior_run_id:'31545365297',prior_artifact_id:9122291043,readability_checkpoint_preserved:true,balanced_singleton_array_recovered:true,balanced_provider_calls_added:0,greek_fidelity_final_attempt:2,cumulative_provider_calls:5,original_task_ceiling:8},provider_calls:results.map(x=>x.provider_provenance),visibility:'All workers share the same immutable source-side base prompt. Accepted Colossians wording, benchmarks, comparison translations, and conversation drafts were absent.',status:'engine_2_2_recovered_blind_candidates_ready_for_human_editing'});
  console.log('Recovered blind unit drafting complete');
}catch(error){
  const finished=new Date();
  await emit(runDir,'manifest/attempts/blind_reader_first_unit_draft/greek_fidelity_worker/attempt-2.json',{schema_version:1,run_id:config.run_id,task_id:config.task_id,stage:'blind_reader_first_unit_draft',role:'greek_fidelity_worker',provider:greekWorker.provider,model:greekWorker.model,attempt:2,task_attempt:taskAttempt,input_sha256:sha256(full),output_sha256:response?sha256(response.text):null,request_id:response?.id??null,started_at:started.toISOString(),finished_at:finished.toISOString(),outcome:response?'response_rejected':'request_failed',usage:response?.usage||{},error:String(error)});
  await haltTask(runDir,{halt_code:'WORKER_ATTEMPT_LIMIT_EXHAUSTED',task_id:config.task_id,failed_operation:'blind_reader_first_unit_draft/greek_fidelity_worker',attempts_used:taskAttempt,attempts_allowed:8,provider_calls_made:taskAttempt,valid_checkpoints_preserved:['readability_worker','balanced_worker'],error:String(error)});
}finally{clearTimeout(timer)}
