#!/usr/bin/env node
import path from 'node:path';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {requestModel, sha256} from './core.js';

const [configArg, sourceArg, runDirArg, runId] = process.argv.slice(2);
if (!configArg || !sourceArg || !runDirArg || !runId) {
  throw new Error('Usage: process-revalidation-batch.js CONFIG SOURCE RUN_DIR RUN_ID');
}
const config = JSON.parse(await readFile(path.resolve(configArg), 'utf8'));
const source = JSON.parse(await readFile(path.resolve(sourceArg), 'utf8'));
const runDir = path.resolve(runDirArg);
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const emit = async (relative, data) => {
  const file = path.join(runDir, relative);
  await mkdir(path.dirname(file), {recursive: true});
  await writeFile(file, typeof data === 'string' ? data : JSON.stringify(data, null, 2) + '\n');
};
const extractJson = text => {
  if (!text || !text.trim()) throw new Error('EMPTY_MODEL_RESPONSE');
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  return JSON.parse(fenced ? fenced[1] : text);
};
const validateOutput = (output, unit) => {
  if (!output || !Array.isArray(output.verse_renderings) || !output.paragraph_rendering) {
    throw new Error('Required rendering fields missing');
  }
  for (const key of ['dynamic_moves', 'risks', 'human_questions']) {
    if (!Array.isArray(output[key])) throw new Error(`Required array missing: ${key}`);
  }
  const expected = unit.verses.map(v => v.reference);
  const actual = output.verse_renderings.map(v => v.reference);
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Verse references must be exactly: ${expected.join(', ')}`);
  }
  if (output.verse_renderings.some(v => typeof v.text !== 'string' || !v.text.trim())) {
    throw new Error('Every verse requires nonempty text');
  }
};
const byProvider = provider => {
  const worker = config.workers.find(w => w.provider === provider);
  if (!worker) throw new Error(`Missing configured provider: ${provider}`);
  return worker;
};
const candidates = [
  {candidate_id: 'A', display_name: 'Claude Sonnet', worker: byProvider('anthropic')},
  {candidate_id: 'B', display_name: 'GPT-5.6 Sol', worker: byProvider('openai')},
  {candidate_id: 'C', display_name: 'Gemini Pro', worker: byProvider('google')}
];
if (new Set(candidates.map(c => c.worker.provider)).size !== 3) {
  throw new Error('Recovery requires three distinct providers');
}
if (!source.blindness?.current_flt_text_absent || !source.blindness?.comparison_translations_absent) {
  throw new Error('Blindness attestation failed');
}
const makePrompt = unit => {
  const material = {
    project: {
      book: source.book,
      source_edition: source.source_edition,
      target_reader: source.target_reader,
      translation_identity: source.translation_identity
    },
    common_candidate_mission: source.common_candidate_mission,
    governing_rules: source.governing_rules,
    style_and_matrix_rules: source.style_and_matrix_rules,
    unit,
    visibility: source.blindness
  };
  return `You are one of three independent blind FLT drafting candidates. Every candidate receives this exact same constitutional mission, source packet, rules, known issues, and output schema. Candidate identity and provider identity do not change the task.

Return complete JSON only in this shape:
{"verse_renderings":[{"reference":"${unit.verses[0].reference}","text":"..."}],"paragraph_rendering":"...","dynamic_moves":[{"reference":"...","move":"...","warrant":"..."}],"risks":[{"reference":"...","risk":"..."}],"human_questions":[{"reference":"...","question":"...","options":["...","..."]}]}

Translate every listed verse exactly once and in order. Produce an independent rendering from the SBLGNT and governing material. Do not reconstruct, quote, or refer to any current FLT wording or modern comparison translation. Do not claim final authority.

MATERIAL:${JSON.stringify(material)}`;
};
const callCandidate = async (candidate, unit, commonPrompt) => {
  const commonPromptSha256 = sha256(commonPrompt);
  let lastError = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const prompt = attempt === 1
      ? commonPrompt
      : `${commonPrompt}\n\nYour previous response failed JSON or schema validation. Return complete corrected JSON only, with every required verse and field.`;
    const started = new Date();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), config.timeout_ms || 240000);
    try {
      const response = await requestModel(candidate.worker, prompt, controller.signal);
      await emit(`failures/raw/${unit.unit_id}/candidate-${candidate.candidate_id}/attempt-${attempt}.txt`, response.text);
      const output = extractJson(response.text);
      validateOutput(output, unit);
      return {
        run_id: runId,
        batch_id: source.batch_id,
        unit_id: unit.unit_id,
        passage: unit.passage,
        stage: 'blind_common_goal_process_revalidation',
        candidate_id: candidate.candidate_id,
        display_name: candidate.display_name,
        attempt,
        common_prompt_sha256: commonPromptSha256,
        attempt_prompt_sha256: sha256(prompt),
        output,
        provider_provenance: {
          provider: candidate.worker.provider,
          model: candidate.worker.model,
          request_id: response.id,
          started_at: started.toISOString(),
          finished_at: new Date().toISOString(),
          usage: response.usage || {}
        },
        blindness: source.blindness,
        status: 'complete'
      };
    } catch (error) {
      lastError = error;
      if (attempt < 3) await sleep(attempt * 2000);
    } finally {
      clearTimeout(timer);
    }
  }
  throw new Error(`${unit.unit_id} candidate ${candidate.candidate_id} failed: ${String(lastError)}`);
};
const runUnit = async unit => {
  const prompt = makePrompt(unit);
  const expectedHash = sha256(prompt);
  const results = await Promise.all(candidates.map(candidate => callCandidate(candidate, unit, prompt)));
  const hashes = results.map(result => result.common_prompt_sha256);
  const commonGoalVerified = hashes.every(hash => hash === expectedHash) && new Set(hashes).size === 1;
  if (!commonGoalVerified) throw new Error(`${unit.unit_id} common prompt attestation failed`);
  for (const result of results) {
    await emit(`outputs/units/${unit.unit_id}/candidate-${result.candidate_id}.json`, result);
  }
  let brief = `# ${unit.passage} — Common-Goal Process Revalidation\n\n`;
  brief += `**Status:** Untouched blind candidates; human comparison with the current FLT is required.\n\n`;
  brief += `**Common prompt SHA-256:** \`${expectedHash}\`\n\n`;
  for (const verse of unit.verses) {
    brief += `## Verse ${verse.reference.split('.').at(-1)}\n\n`;
    for (const result of results) {
      const rendering = result.output.verse_renderings.find(v => v.reference === verse.reference);
      brief += `**${result.candidate_id} — ${result.display_name}**\n\n${rendering.text}\n\n`;
    }
  }
  await emit(`outputs/briefs/${unit.unit_id}.md`, brief);
  return {
    unit_id: unit.unit_id,
    passage: unit.passage,
    common_prompt_sha256: expectedHash,
    common_goal_verified: true,
    candidates: results.map(result => ({
      candidate_id: result.candidate_id,
      display_name: result.display_name,
      provider: result.provider_provenance.provider,
      model: result.provider_provenance.model,
      request_id: result.provider_provenance.request_id,
      attempt: result.attempt,
      usage: result.provider_provenance.usage
    }))
  };
};
const unitResults = await Promise.all(source.units.map(runUnit));
const aggregatePromptSha256 = sha256(unitResults.map(unit => ({
  unit_id: unit.unit_id,
  common_prompt_sha256: unit.common_prompt_sha256
})));
const provenance = {
  schema_version: 1,
  run_id: runId,
  batch_id: source.batch_id,
  purpose: source.purpose,
  unit_count: unitResults.length,
  candidate_count: unitResults.length * candidates.length,
  common_goal_verified: unitResults.every(unit => unit.common_goal_verified),
  current_flt_hidden: true,
  comparison_translations_hidden: true,
  excluded_valid_unit: source.blindness.excluded_valid_unit,
  aggregate_prompt_sha256: aggregatePromptSha256,
  units: unitResults,
  completed_at: new Date().toISOString(),
  status: 'ready_for_sequential_human_revalidation'
};
await emit('manifest/process-revalidation-provenance.json', provenance);
let index = '# Philippians Process Revalidation Batch\n\n';
index += `**Run:** ${runId}\n\n**Units:** ${unitResults.length}\n\n**Candidates:** ${unitResults.length * 3}\n\n`;
index += '**Status:** Common-goal prompts verified; current FLT remained hidden; present one unit at a time for human revalidation.\n\n';
for (const unit of unitResults) index += `- ${unit.passage}: \`outputs/briefs/${unit.unit_id}.md\`\n`;
await emit('outputs/recovery-index.md', index);
console.log(JSON.stringify({
  run_id: runId,
  unit_count: unitResults.length,
  candidate_count: unitResults.length * 3,
  common_goal_verified: provenance.common_goal_verified,
  aggregate_prompt_sha256: aggregatePromptSha256
}));
