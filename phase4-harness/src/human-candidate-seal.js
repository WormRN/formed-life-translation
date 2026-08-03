import {sha256} from './core.js';

function exactReading(candidate){
  return (candidate.verse_renderings||[]).map(({reference,text})=>({reference,text}));
}

function exactNotes(candidate){
  return (candidate.reader_notes||[]).map(({note_id,reference,anchor,status,text})=>({note_id,reference,anchor,status,text}));
}

export function candidateSealHashes(candidate){
  const reading_text=exactReading(candidate);
  const reader_notes=exactNotes(candidate);
  const material={
    candidate_id:candidate.candidate_id,
    passage:candidate.passage,
    reading_text,
    reader_notes
  };
  return {
    reading_text_sha256:sha256(reading_text),
    reader_notes_sha256:sha256(reader_notes),
    candidate_material_sha256:sha256(material)
  };
}

export function createHumanCandidateSeal(candidate,{approvedBy='human_editor',approvedAt=new Date().toISOString()}={}){
  if(!candidate.candidate_id||!candidate.passage)throw new Error('Candidate id and passage are required before sealing.');
  if(!(candidate.verse_renderings||[]).length)throw new Error('At least one verse rendering is required before sealing.');
  return {
    schema_version:1,
    candidate_id:candidate.candidate_id,
    passage:candidate.passage,
    human_approved:true,
    approved_by:approvedBy,
    approved_at:approvedAt,
    ...candidateSealHashes(candidate),
    audit_authority:'Only the candidate whose exact reading-text and reader-note hashes match this seal may enter the constitutional audit.'
  };
}

export function assertHumanCandidateSeal(candidate,seal){
  if(!seal||seal.schema_version!==1||seal.human_approved!==true)throw new Error('A version-1 human-approved candidate seal is required before any audit provider call.');
  if(seal.candidate_id!==candidate.candidate_id||seal.passage!==candidate.passage)throw new Error('Candidate identity does not match the human-approved seal.');
  const actual=candidateSealHashes(candidate);
  for(const key of ['reading_text_sha256','reader_notes_sha256','candidate_material_sha256']){
    if(seal[key]!==actual[key])throw new Error(`Human-approved candidate seal mismatch: ${key}.`);
  }
  return actual;
}
