import test from 'node:test';
import assert from 'node:assert/strict';
import {assertPassageSenseResolution,assertLockedMatrixAlerts,lockedMatrixLemmas,openWithCautionsRestrictedRenderings,assertPacketMatrixHygiene,normalizeMatrixAlertsForPacket,assertCandidateSenseApparatus,assertCommonBasePromptHash,parseModelJson} from '../src/sense-resolution-core.js';

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

test('locked Matrix parser uses Authority type, not approved maturity status',()=>{
  const matrix=`## μυστήριον · mystērion\n\n**Entry status:** approved\n**Authority type:** LOCKED\n\n---\n\n## δοῦλος · doulos\n\n**Entry status:** working\n\n### Sense 1 — service\n\n**Sense status:** approved\n**Authority type:** GOVERNED\n\n---\n\n## πλήρωμα · plērōma\n\n**Entry status:** approved\n`;
  assert.deepEqual([...lockedMatrixLemmas(matrix)].sort(),['μυστήριον']);
});

test('locked Matrix preflight blocks a unit missing an alert for an explicitly LOCKED Greek lemma',()=>{
  const matrix=`## μυστήριον · mystērion\n\n**Entry status:** approved\n**Authority type:** LOCKED\n\n---\n\n## πλήρωμα · plērōma\n\n**Entry status:** approved\n**Authority type:** GOVERNED\n`;
  const source={'Col.2.2':[{lemma:'μυστήριον'},{lemma:'πλήρωμα'}]};
  const valid={units:[{unit_id:'COL-02-001-005',matrix_alerts:[{lemma:'μυστήριον'}],verses:[{reference:'Col.2.2'}]}]};
  assert.doesNotThrow(()=>assertLockedMatrixAlerts(valid,{matrixMarkdown:matrix,sourceLemmaIndex:source}));
  const missing={units:[{unit_id:'COL-02-001-005',matrix_alerts:[],verses:[{reference:'Col.2.2'}]}]};
  assert.throws(()=>assertLockedMatrixAlerts(missing,{matrixMarkdown:matrix,sourceLemmaIndex:source}),/missing matrix_alerts for locked lemmas: μυστήριον/);
});

test('locked Matrix preflight requires unit-scoped matrix_alerts and canonical parsed source',()=>{
  const matrix=`## μυστήριον · mystērion\n\n**Entry status:** approved\n**Authority type:** LOCKED\n`;
  const noAlerts={units:[{unit_id:'COL-02-001-005',verses:[{reference:'Col.2.2'}]}]};
  assert.throws(()=>assertLockedMatrixAlerts(noAlerts,{matrixMarkdown:matrix,sourceLemmaIndex:{'Col.2.2':[{lemma:'μυστήριον'}]}}),/matrix_alerts array is required/);
  const missingSource={units:[{unit_id:'COL-02-001-005',matrix_alerts:[],verses:[{reference:'Col.2.2'}]}]};
  assert.throws(()=>assertLockedMatrixAlerts(missingSource,{matrixMarkdown:matrix,sourceLemmaIndex:{}}),/parsed SBLGNT source missing Col\.2\.2/);
});

test('packet hygiene reads restricted renderings from OPEN WITH CAUTIONS Matrix entries',()=>{
  const matrix=`## construction\n\n**Authority type:** OPEN WITH CAUTIONS\n\n**Restricted renderings:**\n- \`in union with Christ\`\n- \`spirit powers\`\n\n## next section\n`;
  assert.deepEqual(openWithCautionsRestrictedRenderings(matrix),['in union with Christ','spirit powers']);
  assert.throws(()=>assertPacketMatrixHygiene({matrix_entries:[{guidance:'Use spirit powers here.'}]},{matrixMarkdown:matrix}),/restricted 'spirit powers'/);
  assert.doesNotThrow(()=>assertPacketMatrixHygiene({matrix_entries:[{guidance:'Use spirit powers here.',human_editor_approved_restricted_renderings:['spirit powers']}]},{matrixMarkdown:matrix}));
});

test('legacy approved labels normalize to accepted authority types and reject unmapped labels',()=>{
  const normalized=normalizeMatrixAlertsForPacket([
    {lemma:'φιλοσοφία',status:'approved_for_unit'},
    {lemma:'στοιχεῖον',status:'approved_underdetermined'},
    {lemma:'δόγμα',status:'approved_contested_syntax'},
    {lemma:'συνθάπτω',status:'approved_discourse_chain'}
  ]);
  assert.deepEqual(normalized.map(x=>x.authority_type),['GOVERNED','OPEN WITH CAUTIONS','OPEN WITH CAUTIONS','LOCKED']);
  assert(normalized.every(x=>x.status==='approved'));
  assert.throws(()=>normalizeMatrixAlertsForPacket([{lemma:'x',status:'approved_future_label'}]),/unmapped legacy label/);
});

test('approved_discourse_chain can map to LOCKED only for the Col.2.12-13 with-Christ chain',()=>{
  assert.doesNotThrow(()=>normalizeMatrixAlertsForPacket([
    {lemma:'συνθάπτω',status:'approved_discourse_chain'},
    {lemma:'συνεγείρω',status:'approved_discourse_chain'},
    {lemma:'συζωοποιέω',status:'approved_discourse_chain'}
  ]));
  assert.throws(()=>normalizeMatrixAlertsForPacket([{lemma:'συμβιβάζω',status:'approved_discourse_chain'}]),/only for the Col\.2:12–13 with-Christ chain/);
});

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