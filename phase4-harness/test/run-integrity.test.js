import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {executeJsonWorker} from '../src/run-integrity.js';
import {classifyHttpStatus,validateCircuitBreakerConfig} from '../src/circuit-breaker.js';
import {createHumanCandidateSeal,assertHumanCandidateSeal} from '../src/human-candidate-seal.js';

const worker={role:'readability_worker',provider:'anthropic',model:'test-model',resolved_snapshot:'test-model-20260812',snapshot_status:'provider_pinned_snapshot'};
const config={run_id:'TEST-RUN',task_id:'TEST-TASK',unit_id:'TEST-UNIT',max_attempts:2,task_max_attempts:8,timeout_ms:1000};
const parse=text=>JSON.parse(text);
const validate=value=>{
  validate.errors=value?.ok===true?null:[{message:'ok must be true'}];
  return value?.ok===true;
};

test('records rejected usage, model snapshot provenance, checkpoints a valid worker, and resumes without another call',async()=>{
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
    assert.equal(first.provider_provenance.model,'test-model');
    assert.equal(first.provider_provenance.resolved_snapshot,'test-model-20260812');
    assert.equal(first.provider_provenance.snapshot_status,'provider_pinned_snapshot');
    const rejected=JSON.parse(await readFile(path.join(runDir,'manifest/attempts/test_stage/readability_worker/attempt-1.json'),'utf8'));
    assert.equal(rejected.outcome,'response_rejected');
    assert.equal(rejected.resolved_snapshot,'test-model-20260812');
    assert.equal(rejected.snapshot_status,'provider_pinned_snapshot');
    assert.deepEqual(rejected.usage,{input_tokens:10,output_tokens:2});

    const resumed=await executeJsonWorker({
      config,runDir,worker,stage:'test_stage',prompt:'immutable prompt',parse,validate,
      request:async()=>{throw new Error('checkpoint should prevent a paid call')}
    });
    assert.equal(resumed.resumed_from_checkpoint,true);
    assert.equal(resumed.provider_provenance.request_id,'good-response');
    assert.equal(resumed.provider_provenance.resolved_snapshot,'test-model-20260812');
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

test('rejects a checkpoint when resolved model snapshot metadata changes',async()=>{
  const runDir=await mkdtemp(path.join(os.tmpdir(),'flt-integrity-'));
  let calls=0;
  const request=async()=>({text:'{"ok":true}',id:`response-${++calls}`,usage:{input_tokens:1,output_tokens:1}});
  try{
    await executeJsonWorker({config,runDir,worker,stage:'snapshot_stage',prompt:'same prompt',parse,validate,request});
    const changedWorker={...worker,resolved_snapshot:'test-model-20260813'};
    const changed=await executeJsonWorker({config,runDir,worker:changedWorker,stage:'snapshot_stage',prompt:'same prompt',parse,validate,request});
    assert.equal(calls,2);
    assert.equal(changed.resumed_from_checkpoint,undefined);
    assert.equal(changed.provider_provenance.resolved_snapshot,'test-model-20260813');
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


test('preflight enforces explicit task authorization and conservative ceilings',()=>{
  assert.throws(()=>validateCircuitBreakerConfig({...config,task_id:'HUMAN_AUTHORIZATION_REQUIRED'}),/authorized task_id/);
  assert.throws(()=>validateCircuitBreakerConfig({...config,max_attempts:3}),/max_attempts/);
  assert.throws(()=>validateCircuitBreakerConfig({...config,task_max_attempts:9}),/task_max_attempts/);
});

test('HTTP classification retries only documented transient statuses',()=>{
  for(const status of [429,500,502,503,504])assert.equal(classifyHttpStatus(status).retryable,true);
  for(const status of [400,401,403,404,409,422])assert.equal(classifyHttpStatus(status).retryable,false);
  assert.equal(classifyHttpStatus(404,{newResourceLookup:true}).retryable,true);
});

test('nontransient external failure halts immediately with a machine-readable report',async()=>{
  const runDir=await mkdtemp(path.join(os.tmpdir(),'flt-halt-'));
  let calls=0;
  try{
    await assert.rejects(executeJsonWorker({
      config,runDir,worker,stage:'terminal_http',prompt:'immutable prompt',parse,validate,
      request:async()=>{calls++;throw Object.assign(new Error('anthropic HTTP 404'),{httpStatus:404,retryable:false});}
    }),/SYSTEM HALT/);
    assert.equal(calls,1);
    const halt=JSON.parse(await readFile(path.join(runDir,'manifest/system-halt.json'),'utf8'));
    assert.equal(halt.halt_code,'NONTRANSIENT_EXTERNAL_FAILURE');
    assert.equal(halt.human_unlock_required,true);
    assert.equal(halt.further_external_actions_authorized,false);
    assert.equal(halt.further_paid_calls_authorized,false);
  }finally{await rm(runDir,{recursive:true,force:true});}
});

test('task-level ceiling persists and blocks the next provider request',async()=>{
  const runDir=await mkdtemp(path.join(os.tmpdir(),'flt-budget-'));
  const oneCallConfig={...config,max_attempts:1,task_max_attempts:1};
  let calls=0;
  try{
    await executeJsonWorker({config:oneCallConfig,runDir,worker,stage:'first',prompt:'one',parse,validate,request:async()=>({text:'{"ok":true}',id:`response-${++calls}`,usage:{}})});
    await assert.rejects(executeJsonWorker({config:oneCallConfig,runDir,worker:{...worker,role:'second_worker'},stage:'second',prompt:'two',parse,validate,request:async()=>({text:'{"ok":true}',id:`response-${++calls}`,usage:{}})}),/SYSTEM HALT/);
    assert.equal(calls,1);
    const ledger=JSON.parse(await readFile(path.join(runDir,'manifest/task-attempt-budget.json'),'utf8'));
    assert.equal(ledger.attempts_used,1);
  }finally{await rm(runDir,{recursive:true,force:true});}
});
