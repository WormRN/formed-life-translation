#!/usr/bin/env node
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import {json,emit,event,requestModel,sha256} from './core.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const configPath=path.resolve(process.argv[2]),runDir=path.resolve(process.argv[3]),candidatePath=path.resolve(process.argv[4]);
const config=await json(configPath),candidate=await json(candidatePath),source=await json(path.resolve(path.dirname(configPath),config.source_packet));
const ajv=new Ajv2020({allErrors:true});
const validateReconstruction=ajv.compile(await json(path.join(root,'schemas/meaning-reconstruction.schema.json')));
const validateAudit=ajv.compile(await json(path.join(root,'schemas/human-candidate-audit.schema.json')));
const expected=candidate.verse_renderings.map(v=>v.reference);
const assertRefs=o=>{const refs=o.map(x=>x.reference);if(JSON.stringify(refs)!==JSON.stringify(expected))throw new Error(`References must be ${expected.join(', ')}`)};
const parse=t=>{if(!t?.trim())throw new Error('EMPTY_MODEL_RESPONSE');const s=t.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1]||t;return JSON.parse(s)};
async function call(worker,stage,prompt,validate,assert=()=>{}){let repair='';for(let attempt=1;attempt<=3;attempt++){const full=`Return complete JSON only. ${repair}\n${prompt}`,started=new Date(),controller=new AbortController(),timer=setTimeout(()=>controller.abort(),config.timeout_ms||180000);try{const r=await requestModel(worker,full,controller.signal);await emit(runDir,`failures/raw/${stage}/${worker.role}/attempt-${attempt}.txt`,r.text);const output=parse(r.text);if(!validate(output)){repair=`Repair schema errors: ${JSON.stringify(validate.errors)}. Be concise.`;throw new Error(repair)}assert(output);const record={run_id:config.run_id,unit_id:config.unit_id,stage,role:worker.role,attempt,input_sha256:sha256(full),output,provider_provenance:{provider:worker.provider,model:worker.model,request_id:r.id,started_at:started.toISOString(),finished_at:new Date().toISOString(),usage:r.usage}};await event(runDir,{type:`${stage}_complete`,role:worker.role,attempt});return record}catch(e){if(!repair)repair=`Previous output was incomplete or malformed: ${String(e)}. Be concise and close the JSON.`;await event(runDir,{type:`${stage}_failure`,role:worker.role,attempt,error:String(e)});if(attempt===3)throw e}finally{clearTimeout(timer)}}}

const readerProfile='You are a religion-naive adult reader. You have no Greek text, benchmark, comparison translation, commentary, or model notes. Report only what the English communicates or reasonably implies.';
const reconstructionPrompt=`${readerProfile} Reconstruct the meaning of each verse and the passage as a whole. Do not evaluate translation quality and do not guess missing source wording. Schema: {"verse_meanings":[{"reference":"Phil.1.1","propositions":["..."],"inferred_relationships":["..."]}],"passage_summary":"...","unclear_phrases":[{"reference":"...","phrase":"...","possible_meanings":["..."]}]}. Include exactly every supplied verse in order. Be concise enough to complete the JSON. ENGLISH ONLY:${JSON.stringify(candidate.verse_renderings)}`;
const reconstructions=await Promise.all(config.workers.map(w=>call(w,'meaning_reconstruction',reconstructionPrompt,validateReconstruction,o=>assertRefs(o.verse_meanings))));
for(const x of reconstructions)await emit(runDir,`outputs/reconstructions/${x.role}.json`,x);

const anonymous=Object.fromEntries(reconstructions.map((x,i)=>[`Reader Report ${i+1}`,x.output]));
const greek={edition:source.source_data.edition,verses:source.source_data.verses.map(v=>({reference:v.reference,greek:v.greek,tokens:v.tokens.map(t=>({greek:t.greek,lemma:t.lemma,morph:t.morph}))}))};
const auditPrompt=`Audit the exact human-edited candidate against the Greek semantic floor and the anonymous English-only reader reconstructions. FLT is firmly dynamic-equivalence: reordering, unpacking, supplied connectors, contextual clarification, sentence splitting, and rhetorical recreation are permitted. Do not prefer literal wording or object to loss of Greek surface form when meaning survives. A block requires material loss, addition, or likely misleading meaning. A warning marks a defensible but review-worthy inference. Treat human wording respectfully and recommend only the minimum repair necessary. Schema: {"verse_assessments":[{"reference":"Phil.1.1","status":"pass|warn|block","findings":[{"kind":"meaning_loss|added_meaning|misleading_meaning|acceptable_dynamic_move","english_signal":"...","source_constraint":"...","assessment":"...","minimum_repair":"..."}]}],"overall_eligible":true,"overall_statement":"..."}. Include exactly every supplied verse in order. Keep pass findings concise so the JSON completes. MATERIAL:${JSON.stringify({candidate:candidate.verse_renderings,reader_reports:anonymous,greek,governing_rules:source.governing_rules,matrix_entries:source.matrix_entries})}`;
const audits=await Promise.all(config.workers.map(w=>call(w,'semantic_audit',auditPrompt,validateAudit,o=>assertRefs(o.verse_assessments))));
for(const x of audits)await emit(runDir,`outputs/audits/${x.role}.json`,x);

let md=`# FLT Phase 4 — Human Candidate Meaning Audit\n\n**Candidate:** ${candidate.candidate_id}  \n**Status:** Audit evidence only; human decision required.\n\n## Human-edited text\n\n${candidate.verse_renderings.map(v=>`**${v.reference.replace(/^Phil\.\d+\./,'')}** ${v.text}`).join('\n\n')}\n\n## Independent semantic-floor results\n\n`;
for(const [i,a] of audits.entries()){md+=`### Auditor ${i+1}: ${a.output.overall_eligible?'eligible':'blocked'}\n\n${a.output.overall_statement}\n\n`;for(const v of a.output.verse_assessments.filter(v=>v.status!=='pass'))md+=`- **${v.reference} — ${v.status}:** ${v.findings.map(f=>f.assessment).join(' ')}\n`;md+='\n'}
md+='## Interpretation\n\nEligibility means the candidate remains defensible inside FLT’s semantic floor. Warnings identify documented human choices; they are not automatic demands for more literal wording. Any block requires human review before advancement.\n';
await emit(runDir,'outputs/human-candidate-audit.md',md);
await emit(runDir,'manifest/audit-provenance.json',{run_id:config.run_id,candidate_id:candidate.candidate_id,reconstructions:reconstructions.map(x=>x.provider_provenance),audits:audits.map(x=>x.provider_provenance),visibility:'Reconstruction stage sees English only. Audit stage sees candidate, anonymous reconstructions, and Greek. No benchmark or comparison translations.',status:'human_audit_review'});
console.log('Human candidate meaning audit complete');
