#!/usr/bin/env node
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import {json,emit,sha256} from './core.js';
import {executeJsonWorker,attemptAccountingNotice} from './run-integrity.js';
import {assertHumanCandidateSeal} from './human-candidate-seal.js';
import {parseModelJson} from './sense-resolution-core.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const configPath=path.resolve(process.argv[2]),runDir=path.resolve(process.argv[3]),candidatePath=path.resolve(process.argv[4]);
if(!process.argv[5])throw new Error('A separately recorded human-approved candidate seal is required before constitutional audit.');
const sealPath=path.resolve(process.argv[5]);
const config=await json(configPath),candidate=await json(candidatePath),seal=await json(sealPath),source=await json(path.resolve(path.dirname(configPath),config.source_packet));
const sealedHashes=assertHumanCandidateSeal(candidate,seal);
const ajv=new Ajv2020({allErrors:true});
const validateReconstruction=ajv.compile(await json(path.join(root,'schemas/meaning-reconstruction.schema.json')));
const validateAudit=ajv.compile(await json(path.join(root,'schemas/human-candidate-audit.schema.json')));
const expected=candidate.verse_renderings.map(v=>v.reference);
const expectedNotes=(candidate.reader_notes||[]).map(n=>n.note_id);
const assertRefs=o=>{const refs=o.map(x=>x.reference);if(JSON.stringify(refs)!==JSON.stringify(expected))throw new Error(`References must be ${expected.join(', ')}`)};
const requiredChecks=['semantic_propositions','logical_relationships','rhetorical_structure','meaningful_ambiguity','agency_and_force','key_term_continuity','source_traceability','back_translation','copyright_independence','second_oral_test'];
const assertAudit=o=>{assertRefs(o.verse_assessments);const notes=o.reader_note_assessments.map(x=>x.note_id);if(JSON.stringify(notes)!==JSON.stringify(expectedNotes))throw new Error(`Reader notes must be ${expectedNotes.join(', ')}`);const checks=o.constitutional_checks.map(x=>x.check);if(JSON.stringify([...checks].sort())!==JSON.stringify([...requiredChecks].sort()))throw new Error('Every constitutional audit check must appear exactly once.');if((o.verse_assessments.some(x=>x.status==='block')||o.reader_note_assessments.some(x=>x.status==='block')||o.constitutional_checks.some(x=>x.outcome==='block'))&&o.overall_eligible)throw new Error('Any block requires overall_eligible false.');};
const parse=parseModelJson;
async function call(worker,stage,prompt,validate,assert=()=>{}){
  return executeJsonWorker({
    config,
    runDir,
    worker,
    stage,
    prompt,
    parse,
    validate,
    assert,
    recordContext:{unit_id:config.unit_id},
    rawPrefix:`failures/raw/${stage}/${worker.role}`
  });
}

const readerProfile='You are a religion-naive adult reader. You have no Greek text, benchmark, comparison translation, commentary, or model notes. Report only what the English communicates or reasonably implies.';
const reconstructionPrompt=`${readerProfile} Reconstruct the meaning of each verse and the passage as a whole. Do not evaluate translation quality and do not guess missing source wording. Schema: {"verse_meanings":[{"reference":"Phil.1.1","propositions":["..."],"inferred_relationships":["..."]}],"passage_summary":"...","unclear_phrases":[{"reference":"...","phrase":"...","possible_meanings":["..."]}]}. Include exactly every supplied verse in order. Be concise enough to complete the JSON. ENGLISH ONLY:${JSON.stringify(candidate.verse_renderings)}`;
const reconstructions=await Promise.all(config.workers.map(w=>call(w,'meaning_reconstruction',reconstructionPrompt,validateReconstruction,o=>assertRefs(o.verse_meanings))));
for(const x of reconstructions)await emit(runDir,`outputs/reconstructions/${x.role}.json`,x);

const anonymous=Object.fromEntries(reconstructions.map((x,i)=>[`Reader Report ${i+1}`,x.output]));
const greek={edition:source.source_data.edition,verses:source.source_data.verses.map(v=>({reference:v.reference,greek:v.greek,tokens:v.tokens.map(t=>({greek:t.greek,lemma:t.lemma,morph:t.morph}))}))};
const auditPrompt=`Audit the exact human-edited reading text and its reader notes together against the Greek semantic floor and the anonymous English-only reader reconstructions. The notes exist for transparent disclosure and wider critical trust; do not treat them as apologies or require them merely because the reading text is dynamic. FLT is firmly dynamic-equivalence: reordering, unpacking, supplied connectors, contextual clarification, sentence splitting, and rhetorical recreation are permitted. Do not prefer literal wording or object to loss of Greek surface form when meaning survives. A block requires material loss, addition, or likely misleading meaning. A warning marks a defensible but review-worthy inference. Treat human wording respectfully and recommend only the minimum repair necessary. Explicitly check semantic propositions; cause, contrast, purpose, result, and sequence; deliberate repetition and rhetorical force; meaningful ambiguity; agency, voice, force, and certainty; key-term continuity; source traceability; whether an English-only back-translation recovers substantially the same meaning; process independence from comparison translations; and the completed listener-only oral test. Schema: {"verse_assessments":[{"reference":"Phil.1.1","status":"pass|warn|block","findings":[{"kind":"meaning_loss|added_meaning|misleading_meaning|acceptable_dynamic_move","english_signal":"...","source_constraint":"...","assessment":"...","minimum_repair":"..."}]}],"reader_note_assessments":[{"note_id":"...","reference":"...","status":"pass|warn|block","assessment":"...","minimum_repair":"..."}],"constitutional_checks":[{"check":"semantic_propositions","outcome":"pass|warn|block","rationale":"..."}],"overall_eligible":true,"overall_statement":"..."}. Include exactly every supplied verse and reader note in their supplied order and each check exactly once: ${requiredChecks.join(', ')}. Any block requires overall_eligible false. Use no more than one finding per verse; use an empty findings array for a clean pass. Keep every assessment, rationale, repair, and the overall statement to one concise sentence. MATERIAL:${JSON.stringify({candidate:candidate.verse_renderings,reader_notes:candidate.reader_notes||[],reader_reports:anonymous,greek,governing_rules:source.governing_rules,matrix_entries:source.matrix_entries,process_evidence:{comparison_translations_exposed:false,listener_only_stage_completed:true}})}`;
const audits=await Promise.all(config.workers.map(w=>call(w,'semantic_audit',auditPrompt,validateAudit,assertAudit)));
for(const x of audits)await emit(runDir,`outputs/audits/${x.role}.json`,x);

let md=`# FLT Phase 4 — Exact Text and Reader-Note Audit\n\n**Candidate:** ${candidate.candidate_id}  \n**Status:** Audit evidence only; human decision required.\n\n## Human-edited reading text\n\n${candidate.verse_renderings.map(v=>`**${v.reference.replace(/^Phil\.\d+\./,'')}** ${v.text}`).join('\n\n')}\n\n## Reader notes audited with the text\n\n${(candidate.reader_notes||[]).map(n=>`- **${n.reference} — ${n.anchor}:** ${n.text}`).join('\n')}\n\n## Independent semantic-floor results\n\n`;
for(const [i,a] of audits.entries()){md+=`### Auditor ${i+1}: ${a.output.overall_eligible?'eligible':'blocked'}\n\n${a.output.overall_statement}\n\n`;for(const v of a.output.verse_assessments.filter(v=>v.status!=='pass'))md+=`- **${v.reference} — ${v.status}:** ${v.findings.map(f=>f.assessment).join(' ')}\n`;for(const n of a.output.reader_note_assessments.filter(n=>n.status!=='pass'))md+=`- **${n.note_id} — ${n.status}:** ${n.assessment}\n`;for(const c of a.output.constitutional_checks.filter(c=>c.outcome!=='pass'))md+=`- **${c.check} — ${c.outcome}:** ${c.rationale}\n`;md+='\n'}
md+='## Interpretation\n\nEligibility means the candidate remains defensible inside FLT’s semantic floor. Warnings identify documented human choices; they are not automatic demands for more literal wording. Any block requires human review before advancement.\n';
await emit(runDir,'outputs/human-candidate-audit.md',md);
await emit(runDir,'manifest/audit-provenance.json',{run_id:config.run_id,candidate_id:candidate.candidate_id,reconstructions:reconstructions.map(x=>x.provider_provenance),audits:audits.map(x=>x.provider_provenance),candidate_seal:{path:path.relative(process.cwd(),sealPath),...sealedHashes,seal_sha256:sha256(seal)},attempt_accounting:attemptAccountingNotice,validated_worker_checkpoints:['checkpoints/meaning_reconstruction/','checkpoints/semantic_audit/'],visibility:'Reconstruction stage sees reading text only. Audit stage sees the exact candidate, its reader notes, anonymous reconstructions, and Greek. No benchmark or comparison translations.',status:'human_audit_review'});
console.log('Human candidate meaning audit complete');
