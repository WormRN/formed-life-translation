#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import {json,emit,sha256} from './core.js';
import {executeJsonWorker,attemptAccountingNotice} from './run-integrity.js';
import {assertPassageSenseResolution,assertLockedMatrixAlerts,unitSenseMaterial,assertCandidateSenseApparatus,assertCommonBasePromptHash,parseModelJson} from './sense-resolution-core.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const configPath=path.resolve(process.argv[2]),runDir=path.resolve(process.argv[3]),sourcePath=path.resolve(process.argv[4]);
const config=await json(configPath),chapter=await json(sourcePath);
const passageSenseBrief=assertPassageSenseResolution(chapter);
const matrixMarkdown=await fs.readFile(path.resolve(root,'../docs/current/FLT_contextual_lexical_matrix_v2.0.md'),'utf8');
const sourceLemmaIndex=await json(path.resolve(root,'../data/source/sblgnt_parsed.json'));
assertLockedMatrixAlerts(chapter,{matrixMarkdown,sourceLemmaIndex});
const validate=new Ajv2020({allErrors:true}).compile(await json(path.join(root,'schemas/chapter-unit-candidate.schema.json')));
const commonMission='Produce one independent FLT candidate under the same constitutional goal as every other candidate: communicate the full meaning, logic, tone, discourse movement, and theological force of the Greek in clear, natural, dignified English that a religion-naive adult can follow on one hearing. Build natural English sentences and paragraphs rather than preserving Greek clause architecture. Dynamic expression is the default; preserve material meaning and avoid unsupported commentary.';
async function call(worker,unit,prompt){
  return executeJsonWorker({
    config,
    runDir,
    worker,
    stage:'blind_reader_first_unit_draft',
    prompt,
    parse:parseModelJson,
    validate,
    assert:output=>{
      const refs=output.verse_renderings.map(v=>v.reference);
      const expected=unit.verses.map(v=>v.reference);
      if(JSON.stringify(refs)!==JSON.stringify(expected))throw new Error(`Return exactly these verse references in order: ${expected.join(', ')}.`);
      assertCandidateSenseApparatus(output,unit,passageSenseBrief);
    },
    recordContext:{
      chapter_id:chapter.chapter_id,
      unit_id:unit.unit_id,
      base_prompt_sha256:sha256(prompt)
    },
    rawPrefix:`failures/raw/${unit.unit_id}/${worker.role}`
  });
}

const provenance=[];
for(const unit of chapter.units){
  const common={project:{translation_identity:chapter.translation_identity,target_reader:chapter.target_reader,tone:chapter.tone,engine_version:'2.2'},governing_rules:chapter.governing_rules,existing_decisions:chapter.existing_decisions,matrix_entries:unit.matrix_alerts,passage_sense_resolution:unitSenseMaterial(passageSenseBrief,unit),unit:{unit_id:unit.unit_id,passage:unit.passage,title:unit.title,known_issues:unit.known_issues,verses:unit.verses},visibility:{sealed_human_unit_absent:!chapter.sealed_unit,prior_flt_wording_absent:true,prior_candidates_absent:true,editor_benchmark_absent:true,comparison_translations_absent:true}};
  const results=await Promise.all(config.workers.map(w=>call(w,unit,`You are drafting one blind unit for FLT ${chapter.book} ${chapter.chapter}. Mission: ${commonMission} The reading text is firmly dynamic-equivalence; closeness to Greek form is not a virtue by itself. Make the main assertion easy to hear; split, combine, reorder, or unpack when needed. Actively avoid stacked clauses, preposition clusters, delayed subjects or main verbs, abstract-noun chains, embedded explanations, repetitive English openings, and translated-sounding prose. Preserve deliberate repetition, escalation, logical relationships, meaningful ambiguity, agency, force, and key-term links. Do not self-certify oral quality: record the oral design moves you made and any remaining risk. Do not reconstruct or refer to any sealed human wording. The passage-sense brief is source-side analysis completed before English composition. Follow each primary contextual sense. For every alternatives_retained entry, record one concise contested sense_decision, choose one primary reading in the verse, and expose one concise viable alternative only in alternate_readings; never place candidate alternatives in brackets inside the reading text. Provide a reader note for every entry marked reader_note_required. Keep every apparatus explanation to one sentence. Do not repeat the source brief. Return at most six dynamic_moves, six oral_design_moves, three remaining_oral_risks, five risks, and three human_questions. Schema: {"verse_renderings":[{"reference":"${unit.verses[0].reference}","text":"..."}],"paragraph_rendering":"...","dynamic_moves":[{"reference":"...","move":"...","warrant":"..."}],"oral_design_moves":[{"reference":"...","obstacle":"...","move":"...","source_warrant":"..."}],"sense_decisions":[{"sense_id":"...","reference":"...","primary_rendering_choice":"...","reason":"..."}],"alternate_readings":[{"sense_id":"...","reference":"...","primary_reading":"...","alternative_reading":"...","tradeoff":"..."}],"reader_notes":[{"sense_id":"...","reference":"...","note":"...","supports_dynamic_rendering":true}],"remaining_oral_risks":[{"reference":"...","risk":"..."}],"risks":[{"reference":"...","risk":"..."}],"human_questions":[{"reference":"...","question":"...","options":["...","..."]}]}. MATERIAL:${JSON.stringify(common)}`)));
  for(const x of results)assertCandidateSenseApparatus(x.output,unit,passageSenseBrief);
  assertCommonBasePromptHash(results);
  for(const x of results){await emit(runDir,`outputs/units/${unit.unit_id}/${x.role}.json`,x);provenance.push(x)}
  let md=`# ${unit.passage} — Blind Reader-First Candidates\n\n**Status:** Human editing required; no candidate is approved.\n\n`;
  for(const [i,x] of results.entries())md+=`## Candidate ${String.fromCharCode(65+i)}\n\n${x.output.verse_renderings.map(v=>`**${v.reference.split('.').at(-1)}** ${v.text}`).join('\n\n')}\n\n`;
  await emit(runDir,`outputs/briefs/${unit.unit_id}.md`,md);
}
await emit(runDir,'manifest/chapter-drafting-provenance.json',{run_id:config.run_id,chapter_id:chapter.chapter_id,sealed_unit:chapter.sealed_unit,common_prompt_sha256:assertCommonBasePromptHash(provenance),common_prompt_verified:new Set(provenance.map(x=>x.base_prompt_sha256)).size===1,passage_sense_gate:{version:'2.2',status:'passed',brief_status:passageSenseBrief.status,editor_benchmark_absent:true},provider_calls:provenance.map(x=>x.provider_provenance),attempt_accounting:attemptAccountingNotice,validated_worker_checkpoints:'checkpoints/blind_reader_first_unit_draft/',visibility:'Each worker saw one Greek unit, project rules, and scoped decisions. Any sealed human wording, benchmarks, and comparison translations were absent.',status:'engine_2_2_passage_sense_drafts_ready_for_human_editing'});
console.log('Blind unit drafting complete');
