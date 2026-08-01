import test from 'node:test';
import assert from 'node:assert/strict';
import {assertPassageSenseResolution,assertCandidateSenseApparatus,assertCommonBasePromptHash,parseModelJson} from '../src/sense-resolution-core.js';

const chapter=()=>({
  units:[{verses:[{reference:'Phil.3.1'},{reference:'Phil.3.2'}]}],
  passage_sense_resolution:{
    gate_version:'2.2',status:'complete_for_blind_drafting',
    visibility_attestation:{source_side_only:true,prior_flt_wording_absent:true,prior_candidates_absent:true,editor_benchmark_absent:true,comparison_translations_absent:true},
    passage_argument:['warning','identity'],
    proposition_map:[{references:['Phil.3.1'],statement:'Rejoice and receive a protective reminder.'},{references:['Phil.3.2'],statement:'Watch out for harmful teachers.'}],
    expressions:[
      {sense_id:'transition',references:['Phil.3.1'],source_expression:'to loipon',status:'resolved',contextual_function:'transition',primary_sense:'now',viable_alternatives:[],discourse_evidence:'The letter continues.',reading_text_guidance:'Use a natural transition.',literal_note_guidance:'No note normally needed.',choice_risks:'Finally may imply closure.',human_decision_required:false,reader_note_required:false,audit_text_and_note_together:false},
      {sense_id:'wordplay',references:['Phil.3.2'],source_expression:'katatome',status:'alternatives_retained',contextual_function:'hostile wordplay',primary_sense:'mutilation',viable_alternatives:['those who cut the body'],discourse_evidence:'It contrasts with circumcision in the next verse.',reading_text_guidance:'Preserve the warning and bodily force.',literal_note_guidance:'Explain the circumcision wordplay.',choice_risks:'Mutilation may hide the wordplay.',human_decision_required:true,reader_note_required:true,audit_text_and_note_together:true}
    ]
  }
});

test('accepts a complete source-side Engine 2.2 brief',()=>assert.doesNotThrow(()=>assertPassageSenseResolution(chapter())));
test('blocks drafting without a passage-sense brief',()=>assert.throws(()=>assertPassageSenseResolution({units:[]}),/brief is required/));
test('blocks leaked editor benchmark visibility',()=>{const x=chapter();x.passage_sense_resolution.visibility_attestation.editor_benchmark_absent=false;assert.throws(()=>assertPassageSenseResolution(x),/editor_benchmark_absent/)});
test('requires unresolved senses to expose viable alternatives',()=>{const x=chapter();x.passage_sense_resolution.expressions[1].viable_alternatives=[];assert.throws(()=>assertPassageSenseResolution(x),/retain alternatives/)});
test('requires complete candidate sense, alternative, and note apparatus',()=>{
  const x=chapter(),brief=assertPassageSenseResolution(x),unit=x.units[0];
  const valid={verse_renderings:[{reference:'Phil.3.1',text:'Now rejoice.'},{reference:'Phil.3.2',text:'Watch out.'}],sense_decisions:[{sense_id:'wordplay'}],alternate_readings:[{sense_id:'wordplay'}],reader_notes:[{sense_id:'wordplay'}]};
  assert.doesNotThrow(()=>assertCandidateSenseApparatus(valid,unit,brief));
  assert.throws(()=>assertCandidateSenseApparatus({...valid,alternate_readings:[]},unit,brief),/alternate-reading apparatus/);
});
test('keeps bracketed alternatives out of the reading text',()=>{
  const x=chapter(),brief=assertPassageSenseResolution(x),unit=x.units[0];
  const output={verse_renderings:[{reference:'Phil.3.1',text:'Now rejoice.'},{reference:'Phil.3.2',text:'Watch out. [Alternative: beware.]'}],sense_decisions:[{sense_id:'wordplay'}],alternate_readings:[{sense_id:'wordplay'}],reader_notes:[{sense_id:'wordplay'}]};
  assert.throws(()=>assertCandidateSenseApparatus(output,unit,brief),/review apparatus/);
});

test('common-goal attestation tolerates provider-specific schema repair prompts',()=>{
  const records=[
    {base_prompt_sha256:'same-base',input_sha256:'first-attempt'},
    {base_prompt_sha256:'same-base',input_sha256:'repair-attempt'},
    {base_prompt_sha256:'same-base',input_sha256:'another-repair'}
  ];
  assert.equal(assertCommonBasePromptHash(records),'same-base');
  assert.throws(()=>assertCommonBasePromptHash([...records.slice(0,2),{base_prompt_sha256:'different-base'}]),/base prompt hash mismatch/);
});

test('parser accepts one complete object with harmless extra closing delimiters',()=>{
  assert.deepEqual(parseModelJson('{"ok":true}\n}'),{ok:true});
});
test('parser rejects additional model content or a second object',()=>{
  assert.throws(()=>parseModelJson('{"ok":true}\n{"second":true}'),/ADDITIONAL_CONTENT/);
  assert.throws(()=>parseModelJson('{"ok":'),SyntaxError);
});
