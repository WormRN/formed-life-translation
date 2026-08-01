export const SENSE_GATE_VERSION='2.2';

const nonEmpty=(value,label)=>{
  if(typeof value!=='string'||!value.trim()) throw new Error(`Passage-sense gate: missing ${label}`);
};
const exactIds=(actual,expected,label)=>{
  const a=[...actual].sort(),e=[...expected].sort();
  if(JSON.stringify(a)!==JSON.stringify(e)) throw new Error(`Passage-sense gate: ${label} must cover exactly ${e.join(', ')}; received ${a.join(', ')}`);
};

export function assertPassageSenseResolution(chapter){
  const brief=chapter.passage_sense_resolution;
  if(!brief||brief.gate_version!==SENSE_GATE_VERSION) throw new Error('Passage-sense gate: Engine 2.2 brief is required before drafting.');
  if(brief.status!=='complete_for_blind_drafting') throw new Error('Passage-sense gate: brief is not complete for blind drafting.');
  const a=brief.visibility_attestation||{};
  for(const key of ['source_side_only','prior_flt_wording_absent','prior_candidates_absent','editor_benchmark_absent','comparison_translations_absent']){
    if(a[key]!==true) throw new Error(`Passage-sense gate: visibility attestation failed for ${key}`);
  }
  if(!Array.isArray(brief.passage_argument)||brief.passage_argument.length<2) throw new Error('Passage-sense gate: passage argument is incomplete.');
  if(!Array.isArray(brief.proposition_map)||!brief.proposition_map.length) throw new Error('Passage-sense gate: proposition map is required.');
  if(!Array.isArray(brief.expressions)||!brief.expressions.length) throw new Error('Passage-sense gate: contextual expressions are required.');

  const units=chapter.units||[];
  const verseRefs=new Set(units.flatMap(u=>(u.verses||[]).map(v=>v.reference)));
  const propositionRefs=new Set(brief.proposition_map.flatMap(p=>p.references||[]));
  exactIds(propositionRefs,verseRefs,'proposition references');

  const ids=new Set();
  for(const [i,e] of brief.expressions.entries()){
    nonEmpty(e.sense_id,`expressions[${i}].sense_id`);
    if(ids.has(e.sense_id)) throw new Error(`Passage-sense gate: duplicate sense_id ${e.sense_id}`);
    ids.add(e.sense_id);
    if(!Array.isArray(e.references)||!e.references.length||e.references.some(r=>!verseRefs.has(r))) throw new Error(`Passage-sense gate: invalid references for ${e.sense_id}`);
    for(const key of ['source_expression','contextual_function','primary_sense','discourse_evidence','reading_text_guidance','literal_note_guidance','choice_risks']) nonEmpty(e[key],`${e.sense_id}.${key}`);
    if(!['resolved','alternatives_retained'].includes(e.status)) throw new Error(`Passage-sense gate: invalid status for ${e.sense_id}`);
    const alternatives=e.viable_alternatives||[];
    if(e.status==='alternatives_retained'&&(!alternatives.length||e.human_decision_required!==true)) throw new Error(`Passage-sense gate: ${e.sense_id} must retain alternatives for human decision`);
    if(e.status==='resolved'&&e.human_decision_required===true) throw new Error(`Passage-sense gate: resolved sense ${e.sense_id} cannot require a human choice`);
    if(e.audit_text_and_note_together===true&&e.reader_note_required!==true) throw new Error(`Passage-sense gate: ${e.sense_id} requires a reader note when text and note must be audited together`);
  }
  return brief;
}

export function unitSenseMaterial(brief,unit){
  const refs=new Set(unit.verses.map(v=>v.reference));
  return {
    gate_version:brief.gate_version,
    status:brief.status,
    passage_argument:brief.passage_argument,
    proposition_map:brief.proposition_map.filter(p=>(p.references||[]).some(r=>refs.has(r))),
    expressions:brief.expressions.filter(e=>e.references.some(r=>refs.has(r))).map(e=>({
      sense_id:e.sense_id,references:e.references,source_expression:e.source_expression,status:e.status,
      contextual_function:e.contextual_function,primary_sense:e.primary_sense,viable_alternatives:e.viable_alternatives,
      discourse_evidence:e.discourse_evidence,reading_text_guidance:e.reading_text_guidance,
      literal_note_guidance:e.literal_note_guidance,choice_risks:e.choice_risks,
      human_decision_required:e.human_decision_required,reader_note_required:e.reader_note_required,
      audit_text_and_note_together:e.audit_text_and_note_together
    }))
  };
}

export function assertCandidateSenseApparatus(output,unit,brief){
  const material=unitSenseMaterial(brief,unit);
  const allIds=material.expressions.map(e=>e.sense_id);
  const altIds=material.expressions.filter(e=>e.status==='alternatives_retained').map(e=>e.sense_id);
  const noteIds=material.expressions.filter(e=>e.reader_note_required===true).map(e=>e.sense_id);
  exactIds((output.sense_decisions||[]).map(x=>x.sense_id),allIds,'sense decisions');
  exactIds((output.alternate_readings||[]).map(x=>x.sense_id),altIds,'alternate-reading apparatus');
  exactIds((output.reader_notes||[]).map(x=>x.sense_id),noteIds,'reader-note apparatus');
  for(const v of output.verse_renderings||[]){
    if(/\[(?:alternative|or|literally)\b/i.test(v.text)) throw new Error(`Passage-sense gate: alternatives belong in the review apparatus, not the reading text (${v.reference})`);
  }
}
