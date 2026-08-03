#!/usr/bin/env node
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import {json,emit} from './core.js';
import {executeJsonWorker,attemptAccountingNotice} from './run-integrity.js';
import {parseModelJson} from './sense-resolution-core.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const configPath=path.resolve(process.argv[2]);
const runDir=path.resolve(process.argv[3]);
const candidatePath=path.resolve(process.argv[4]);
const config=await json(configPath);
const candidate=await json(candidatePath);
const source=await json(path.resolve(path.dirname(configPath),config.source_packet));
const ajv=new Ajv2020({allErrors:true,strict:false});

const listenerSchema={
  type:'object',additionalProperties:false,
  required:['chapter_summaries','verse_observations','cross_letter_observations','one_hearing_assessment'],
  properties:{
    chapter_summaries:{type:'array',minItems:4,maxItems:4,items:{type:'object',additionalProperties:false,required:['chapter','movement','oral_coherence'],properties:{chapter:{type:'integer',minimum:1,maximum:4},movement:{type:'string',minLength:1},oral_coherence:{enum:['clear','minor_friction','substantial_friction']}}}},
    verse_observations:{type:'array',maxItems:12,items:{type:'object',additionalProperties:false,required:['reference','category','severity','listener_effect'],properties:{reference:{type:'string',minLength:1},category:{enum:['oral_flow','unclear_referent','density','repetition','transition','adult_naturalness','other']},severity:{enum:['low','medium','high']},listener_effect:{type:'string',minLength:1}}}},
    cross_letter_observations:{type:'array',maxItems:8,items:{type:'object',additionalProperties:false,required:['range','category','assessment'],properties:{range:{type:'string',minLength:1},category:{enum:['movement','voice','terminology','repetition','theme_link','chapter_seam','other']},assessment:{type:'string',minLength:1}}}},
    one_hearing_assessment:{type:'string',minLength:1}
  }
};

const requiredChecks=['oral_flow','paragraph_and_letter_movement','cross_unit_cohesion','terminology_continuity','rhetoric_and_repetition','semantic_floor','note_placement_and_redundancy','cumulative_dynamic_expansion','chapters_1_2_engine_2_2_compatibility','copyright_status_integrity'];
const finding={type:'object',additionalProperties:false,required:['reference','category','severity','assessment','source_or_context_evidence','minimum_action'],properties:{reference:{type:'string',minLength:1},category:{enum:['oral_flow','discourse','terminology','semantic_floor','rhetoric','note','cumulative_expansion','chapter_seam','copyright_status','other']},severity:{enum:['advisory','human_decision','block']},assessment:{type:'string',minLength:1},source_or_context_evidence:{type:'string',minLength:1},minimum_action:{type:'string',minLength:1}}};
const sourceSchema={
  type:'object',additionalProperties:false,
  required:['chapter_findings','cross_letter_findings','chapters_1_2_certification','constitutional_checks','overall_recommendation'],
  properties:{
    chapter_findings:{type:'array',maxItems:12,items:finding},
    cross_letter_findings:{type:'array',maxItems:12,items:finding},
    chapters_1_2_certification:{type:'object',additionalProperties:false,required:['status','findings','statement'],properties:{status:{enum:['compatible','review_required','blocked']},findings:{type:'array',maxItems:10,items:finding},statement:{type:'string',minLength:1}}},
    constitutional_checks:{type:'array',minItems:10,maxItems:10,items:{type:'object',additionalProperties:false,required:['check','outcome','rationale'],properties:{check:{type:'string'},outcome:{enum:['pass','warn','block']},rationale:{type:'string',minLength:1}}}},
    overall_recommendation:{type:'string',minLength:1}
  }
};
const validateListener=ajv.compile(listenerSchema);
const validateSource=ajv.compile(sourceSchema);
const expectedRefs=candidate.verse_renderings.map(v=>v.reference);
if(expectedRefs.length!==104||expectedRefs[0]!=='Phil.1.1'||expectedRefs.at(-1)!=='Phil.4.23')throw new Error('Whole-letter candidate must contain exact continuous Philippians 1:1-4:23 coverage.');

async function call(worker,stage,prompt,validate,assert=()=>{}){
  return executeJsonWorker({config,runDir,worker,stage,prompt,parse:parseModelJson,validate,assert,recordContext:{unit_id:config.unit_id},rawPrefix:`failures/raw/${stage}/${worker.role}`});
}

const englishMaterial={chapters:candidate.chapters,verse_renderings:candidate.verse_renderings};
const listenerPrompt=`You are an English-only whole-letter listener for the Formed Life Translation of Philippians. You receive only the exact accepted English reading text, arranged by chapter. Evaluate whether a religion-naive adult or older adolescent near a sixth-grade reading level can follow the letter on one hearing. Review chapter movement, seams between previously translated units, cross-chapter links, recurring vocabulary, deliberate versus tiring repetition, pronoun clarity, sentence density, adult naturalness, and the force of the closing. Do not infer Greek, evaluate theology, consult or mention another Bible translation, reproduce the text, propose replacement wording, or treat a possible alternative as a defect. Report only concrete friction. Return JSON only matching exactly: {"chapter_summaries":[{"chapter":1,"movement":"...","oral_coherence":"clear|minor_friction|substantial_friction"}],"verse_observations":[{"reference":"Phil.1.1","category":"oral_flow|unclear_referent|density|repetition|transition|adult_naturalness|other","severity":"low|medium|high","listener_effect":"..."}],"cross_letter_observations":[{"range":"Phil.1.1-4.23","category":"movement|voice|terminology|repetition|theme_link|chapter_seam|other","assessment":"..."}],"one_hearing_assessment":"..."}. Include chapters 1,2,3,4 exactly once and in order. MATERIAL:${JSON.stringify(englishMaterial)}`;
const listeners=await Promise.all(config.workers.map(w=>call(w,'whole_letter_listener',listenerPrompt,validateListener,o=>{if(o.chapter_summaries.map(x=>x.chapter).join(',')!=='1,2,3,4')throw new Error('Chapter summaries must be 1,2,3,4 in order.');})));
for(const x of listeners)await emit(runDir,`outputs/listeners/${x.role}.json`,x);

const anonymous=Object.fromEntries(listeners.map((x,i)=>[`Listener Report ${i+1}`,x.output]));
const sourceMaterial={candidate:{verse_renderings:candidate.verse_renderings,reader_notes:candidate.reader_notes,chapters:candidate.chapters,authority:candidate.authority},listener_reports:anonymous,source_data:source.source_data,governing_rules:source.governing_rules,process_evidence:{comparison_translations_exposed:false,accepted_unit_wording_changed:false,chapters_1_2_redrafted:false,copyright_status:'DEFERRED_BATCH'}};
const sourcePrompt=`You are a source-aware whole-letter reviewer for the Formed Life Translation of Philippians. Review the exact accepted text and notes as one letter against the supplied SBLGNT token data, governing rules, and anonymous English-only listener reports. This is issue-driven certification, not retranslation. Respect prior Human Editor decisions and distinguish a demonstrable defect from a merely possible alternative. Examine oral flow, paragraph and letter movement, unit and chapter seams, terminology continuity, purposeful repetition, rhetoric, semantic floor, note placement or redundancy, cumulative dynamic over-expansion, and whether the already-frozen chapters 1-2 remain compatible with Engine 2.2. A block requires material loss, unsupported addition, or likely misleading meaning; a warning requires a concrete review-worthy issue. Copyright comparison texts are absent, so verify only that DEFERRED_BATCH remains honest and do not claim clearance. Reviewers provide evidence only and may not alter, accept, reject, or finalize wording. Keep findings concise, cite exact references, and state the minimum action; replacement wording may be suggested only when needed to make a concrete repair intelligible. Include each constitutional check exactly once: ${requiredChecks.join(', ')}. Return JSON only matching exactly: {"chapter_findings":[{"reference":"Phil.1.1","category":"oral_flow|discourse|terminology|semantic_floor|rhetoric|note|cumulative_expansion|chapter_seam|copyright_status|other","severity":"advisory|human_decision|block","assessment":"...","source_or_context_evidence":"...","minimum_action":"..."}],"cross_letter_findings":[],"chapters_1_2_certification":{"status":"compatible|review_required|blocked","findings":[],"statement":"..."},"constitutional_checks":[{"check":"oral_flow","outcome":"pass|warn|block","rationale":"..."}],"overall_recommendation":"..."}. MATERIAL:${JSON.stringify(sourceMaterial)}`;
const reviews=await Promise.all(config.workers.map(w=>call(w,'whole_letter_source_review',sourcePrompt,validateSource,o=>{const checks=o.constitutional_checks.map(x=>x.check).sort();if(JSON.stringify(checks)!==JSON.stringify([...requiredChecks].sort()))throw new Error('Every whole-letter constitutional check must appear exactly once.');if(o.chapters_1_2_certification.status==='compatible'&&o.chapters_1_2_certification.findings.some(x=>x.severity==='block'))throw new Error('Compatible certification cannot contain a block.');})));
for(const x of reviews)await emit(runDir,`outputs/source-reviews/${x.role}.json`,x);

let md='# FLT Philippians — Whole-Letter Review Evidence\n\n**Status:** Review evidence only; the Human Editor must decide every proposed repair and final certification.\n\n';
for(const [i,r] of reviews.entries()){
  md+=`## Source-aware reviewer ${i+1}\n\n**Chapters 1-2 compatibility:** ${r.output.chapters_1_2_certification.status}\n\n${r.output.chapters_1_2_certification.statement}\n\n`;
  const findings=[...r.output.chapter_findings,...r.output.cross_letter_findings,...r.output.chapters_1_2_certification.findings];
  if(!findings.length)md+='No concrete issue was reported.\n\n';
  else for(const f of findings)md+=`- **${f.reference} — ${f.severity}/${f.category}:** ${f.assessment} Minimum action: ${f.minimum_action}\n`;
  md+=`\n**Recommendation:** ${r.output.overall_recommendation}\n\n`;
}
md+='## Authority boundary\n\nThis artifact does not change Scripture or notes. Reopening, repair, certification, and final whole-letter acceptance belong to the Human Editor.\n';
await emit(runDir,'outputs/whole-letter-review.md',md);
await emit(runDir,'manifest/whole-letter-review-provenance.json',{schema_version:1,run_id:config.run_id,candidate_id:candidate.candidate_id,listeners:listeners.map(x=>x.provider_provenance),source_reviewers:reviews.map(x=>x.provider_provenance),attempt_accounting:attemptAccountingNotice,visibility:'Listener stage saw accepted English reading text only. Source reviewers saw accepted text and notes, anonymous listener reports, SBLGNT token data, and governing rules. No comparison translation was supplied.',status:'human_review_required'});
console.log('Whole-letter review complete');

