import test from 'node:test';
import assert from 'node:assert/strict';
import {buildListenerPrompt,assertSmoothingIntegrity,CONSTITUTIONAL_CHECKS} from '../src/smoothing-core.js';

const candidate={candidate_id:'HUMAN',verse_renderings:[{reference:'Phil.3.1',text:'One.'},{reference:'Phil.3.2',text:'Two.'}]};
const checks=CONSTITUTIONAL_CHECKS.map(check=>({check,outcome:'pass',rationale:'preserved'}));
const valid={proposed_verse_renderings:[{reference:'Phil.3.1',text:'One!'}, {reference:'Phil.3.2',text:'Two.'}],changes:[{reference:'Phil.3.1',current_wording:'One.',oral_problem:'weak landing',proposed_wording:'One!',form_change:'other',meaning_risk:'none',source_warrant:'same proposition',logic_and_rhetoric_check:'preserved'}],constitutional_checks:checks,remaining_risks:[],recommendation:'adopt'};

test('listener prompt exposes English only and forbids rewriting',()=>{const p=buildListenerPrompt(candidate);assert.match(p,/ENGLISH ONLY/);assert.match(p,/do not propose wording/i);assert.doesNotMatch(p,/greek_source|matrix_entries/)});
test('smoothing integrity accepts fully logged changes',()=>assert.doesNotThrow(()=>assertSmoothingIntegrity(candidate,valid)));
test('smoothing integrity rejects silent changes',()=>{const bad=structuredClone(valid);bad.proposed_verse_renderings[1].text='Changed silently.';assert.throws(()=>assertSmoothingIntegrity(candidate,bad),/Silent or spurious/)});
test('smoothing integrity rejects source wording mismatch',()=>{const bad=structuredClone(valid);bad.changes[0].current_wording='Not the candidate.';assert.throws(()=>assertSmoothingIntegrity(candidate,bad),/Current wording mismatch/)});
test('smoothing integrity requires all constitutional checks',()=>{const bad=structuredClone(valid);bad.constitutional_checks.pop();assert.throws(()=>assertSmoothingIntegrity(candidate,bad),/every required constitutional check/)});
