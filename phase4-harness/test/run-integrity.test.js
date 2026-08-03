import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {executeJsonWorker} from '../src/run-integrity.js';
import {createHumanCandidateSeal,assertHumanCandidateSeal} from '../src/human-candidate-seal.js';

const worker={role:'readability_worker',provider:'anthropic',model:'test-model'};
const config={run_id:'TEST-RUN',unit_id:'TEST-UNIT',max_attempts:3,timeout_ms:1000};
const parse=text=>JSON.parse(text);
const validate=value=>{
  validate.errors=value?.ok===true?null:[{message:'ok must be true'}];
  return value?.ok===true;
};

test('records rejected usage, checkpoints a valid worker, and resumes without another call',async()=>{
  const runDir=await mkdtemp(path.join(os.tmpdir(),'flt-integrity-'));
  let calls=0;
  const request=async()=>{
    calls++;
    return calls===1
      ? {text:'{"ok":false}',id:'bad-response',usage:{input_tokens:10,output_tokens:2}}
      : {text:'{"ok":true}',id:'good-response',usage:{input_tokens:11,output_tokens:2}};
  };
  try{
    const first=await executeJsonWorker({config,runDir,worker,stage:'test_stage',prompt:'immutable prompt',parse,validate,request});
    assert.equal(first.output.ok,true);
    assert.equal(calls,2);
    const rejected=JSON.parse(await readFile(path.join(runDir,'manifest/attempts/test_stage/readability_worker/attempt-1.json'),'utf8'));
    assert.equal(rejected.outcome,'response_rejected');
    assert.deepEqual(rejected.usage,{input_tokens:10,output_tokens:2});

    const resumed=await executeJsonWorker({
      config,runDir,worker,stage:'test_stage',prompt:'immutable prompt',parse,validate,
      request:async()=>{throw new Error('checkpoint should prevent a paid call')}
    });
    assert.equal(resumed.resumed_from_checkpoint,true);
    assert.equal(resumed.provider_provenance.request_id,'good-response');
  }finally{
    await rm(runDir,{recursive:true,force:true});
  }
});

test('rejects a checkpoint when the immutable prompt changes',async()=>{
  const runDir=await mkdtemp(path.join(os.tmpdir(),'flt-integrity-'));
  let calls=0;
  const request=async()=>({text:'{"ok":true}',id:`response-${++calls}`,usage:{input_tokens:1,output_tokens:1}});
  try{
    await executeJsonWorker({config,runDir,worker,stage:'test_stage',prompt:'prompt one',parse,validate,request});
    const changed=await executeJsonWorker({config,runDir,worker,stage:'test_stage',prompt:'prompt two',parse,validate,request});
    assert.equal(calls,2);
    assert.equal(changed.resumed_from_checkpoint,undefined);
    assert.equal(changed.provider_provenance.request_id,'response-2');
  }finally{
    await rm(runDir,{recursive:true,force:true});
  }
});

test('human seal blocks any later reading-text or note substitution',()=>{
  const candidate={
    candidate_id:'PHP-04-004-009-HUMAN',
    passage:'Philippians 4:4-9',
    verse_renderings:[{reference:'Phil.4.4',text:'Rejoice in the Lord.'}],
    reader_notes:[{note_id:'n1',reference:'Phil.4.4',anchor:'Rejoice',status:'approved',text:'A note.'}]
  };
  const seal=createHumanCandidateSeal(candidate,{approvedAt:'2026-08-02T00:00:00Z'});
  assert.doesNotThrow(()=>assertHumanCandidateSeal(candidate,seal));
  assert.throws(
    ()=>assertHumanCandidateSeal({...candidate,verse_renderings:[{reference:'Phil.4.4',text:'Different wording.'}]},seal),
    /reading_text_sha256/
  );
  assert.throws(
    ()=>assertHumanCandidateSeal({...candidate,reader_notes:[{...candidate.reader_notes[0],text:'Different note.'}]},seal),
    /reader_notes_sha256/
  );
});
