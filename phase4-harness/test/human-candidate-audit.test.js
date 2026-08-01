import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import Ajv2020 from 'ajv/dist/2020.js';

const schema=JSON.parse(fs.readFileSync(new URL('../schemas/human-candidate-audit.schema.json',import.meta.url)));
const validate=new Ajv2020({allErrors:true}).compile(schema);
const checks=['semantic_propositions','logical_relationships','rhetorical_structure','meaningful_ambiguity','agency_and_force','key_term_continuity','source_traceability','back_translation','copyright_independence','second_oral_test'];
const output={
  verse_assessments:[{reference:'Phil.3.1',status:'pass',findings:[]}],
  reader_note_assessments:[{note_id:'Phil.3.1-note',reference:'Phil.3.1',status:'pass',assessment:'The note is accurate.',minimum_repair:'None.'}],
  constitutional_checks:checks.map(check=>({check,outcome:'pass',rationale:'Preserved.'})),
  overall_eligible:true,
  overall_statement:'The text and note are eligible.'
};

test('exact-text audit schema includes ordered reader-note assessments and ten checks',()=>assert.equal(validate(output),true,JSON.stringify(validate.errors)));
test('exact-text audit schema rejects omission of reader-note assessments',()=>{const bad=structuredClone(output);delete bad.reader_note_assessments;assert.equal(validate(bad),false)});
