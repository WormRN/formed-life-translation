export const ORAL_FLAGS=[
  'clause_stack','breath_length','preposition_cluster','delayed_core',
  'repetitive_opening','abstract_noun_load','parenthetical_overload',
  'accidental_repetition','unclear_referent','weak_landing','other'
];

export const CONSTITUTIONAL_CHECKS=[
  'semantic_propositions','logical_relationships','rhetorical_structure',
  'meaningful_ambiguity','agency_and_force','key_term_continuity',
  'source_traceability','back_translation','copyright_independence',
  'second_oral_test'
];

export function buildListenerPrompt(candidate){
  return `You are the listener-only diagnostic stage in the Formed Life Translation Oral-English Smoothing Pass. You receive only the selected English. Do not guess Greek wording, evaluate theology, rewrite the passage, or compare it with any Bible translation. Diagnose places where a religion-naive adult may lose the main point on one hearing. Distinguish deliberate rhetorical repetition from accidental fatigue. Flag stacked or nested clauses, breath overload, preposition clusters, delayed subjects or main verbs, repetitive openings, abstract-noun chains, embedded explanations, unclear referents, and weak sentence landings. Return JSON only matching: {"verse_observations":[{"reference":"Phil.3.1","current_wording":"...","flags":["clause_stack"],"listener_effect":"...","severity":"low|medium|high"}],"passage_observations":["..."],"one_hearing_summary":"..."}. Include an observation only where there is concrete friction; do not propose wording. ENGLISH ONLY:${JSON.stringify(candidate.verse_renderings)}`;
}

export function buildSourceAwarePrompt(candidate,source,listenerReports){
  const material={
    selected_english:candidate.verse_renderings,
    selected_reader_notes:candidate.reader_notes||[],
    anonymous_listener_reports:listenerReports,
    greek_source:source.source_data,
    governing_rules:source.governing_rules,
    matrix_entries:source.matrix_entries||[]
  };
  return `You are the source-aware proposal stage in the Formed Life Translation Oral-English Smoothing Pass. Address only concrete one-hearing comprehension or oral-flow problems. This is controlled comprehension repair, not general beautification. Prefer the smallest faithful change. You may split or combine sentences, move the main assertion forward, reorder clauses, turn an abstract noun into a natural verb, vary an English transition, or move explanation to a note. Preserve every semantic proposition; cause, contrast, purpose, result, and sequence; deliberate repetition and escalation; meaningful ambiguity; agency, voice, force, and certainty; key-term links; and traceability to the Greek. Do not imitate or consult comparison translations. Return a complete proposed verse list, but log every changed verse. A verse not listed in changes must remain byte-for-byte identical. Return JSON only matching: {"proposed_verse_renderings":[{"reference":"Phil.3.1","text":"..."}],"changes":[{"reference":"Phil.3.1","current_wording":"...","oral_problem":"...","proposed_wording":"...","form_change":"split|combine|reorder|verbify|vary_transition|move_to_note|other","meaning_risk":"...","source_warrant":"...","logic_and_rhetoric_check":"..."}],"constitutional_checks":[{"check":"semantic_propositions","outcome":"pass|warn|block","rationale":"..."}],"remaining_risks":[{"reference":"...","risk":"..."}],"recommendation":"..."}. Include each of these checks exactly once: ${CONSTITUTIONAL_CHECKS.join(', ')}. MATERIAL:${JSON.stringify(material)}`;
}

export function assertSmoothingIntegrity(candidate,output){
  const expectedRefs=candidate.verse_renderings.map(v=>v.reference);
  const proposedRefs=output.proposed_verse_renderings.map(v=>v.reference);
  if(JSON.stringify(expectedRefs)!==JSON.stringify(proposedRefs))throw new Error(`Smoothing references must be exactly ${expectedRefs.join(', ')}`);
  const original=new Map(candidate.verse_renderings.map(v=>[v.reference,v.text]));
  const proposed=new Map(output.proposed_verse_renderings.map(v=>[v.reference,v.text]));
  const changes=new Map();
  for(const change of output.changes){
    if(changes.has(change.reference))throw new Error(`Duplicate smoothing change for ${change.reference}`);
    if(!original.has(change.reference))throw new Error(`Unknown smoothing reference ${change.reference}`);
    if(change.current_wording!==original.get(change.reference))throw new Error(`Current wording mismatch for ${change.reference}`);
    if(change.proposed_wording!==proposed.get(change.reference))throw new Error(`Proposed wording mismatch for ${change.reference}`);
    if(change.current_wording===change.proposed_wording)throw new Error(`No-op smoothing change for ${change.reference}`);
    changes.set(change.reference,change);
  }
  for(const ref of expectedRefs){
    const differs=original.get(ref)!==proposed.get(ref);
    if(differs!==changes.has(ref))throw new Error(`Silent or spurious smoothing change for ${ref}`);
  }
  const checks=output.constitutional_checks.map(x=>x.check);
  if(checks.length!==new Set(checks).size)throw new Error('Constitutional checks must be unique.');
  if(JSON.stringify([...checks].sort())!==JSON.stringify([...CONSTITUTIONAL_CHECKS].sort()))throw new Error('Smoothing output must include every required constitutional check exactly once.');
}

export function smoothingDecisionBrief(candidate,proposals){
  let md=`# FLT Oral-English Smoothing Decision Brief\n\n**Candidate:** ${candidate.candidate_id}\n\n**Status:** Proposals only. No wording changes until the human editor approves an exact candidate.\n\n`;
  for(const [i,p] of proposals.entries()){
    md+=`## Proposal ${String.fromCharCode(65+i)}\n\n`;
    if(!p.output.changes.length)md+='No change recommended.\n\n';
    for(const c of p.output.changes)md+=`### ${c.reference}\n\n- Current: ${c.current_wording}\n- Oral problem: ${c.oral_problem}\n- Proposed: ${c.proposed_wording}\n- Form change: ${c.form_change}\n- Meaning risk: ${c.meaning_risk}\n- Source warrant: ${c.source_warrant}\n- Logic/rhetoric: ${c.logic_and_rhetoric_check}\n\n`;
    const warnings=p.output.constitutional_checks.filter(x=>x.outcome!=='pass');
    if(warnings.length)md+=`**Constitutional warnings:** ${warnings.map(x=>`${x.check}: ${x.rationale}`).join(' ')}\n\n`;
  }
  md+='## Human action\n\nApprove exact changes, revise them, or retain the selected wording. Only the human-approved exact text may be sealed for semantic audit.\n';
  return md;
}
