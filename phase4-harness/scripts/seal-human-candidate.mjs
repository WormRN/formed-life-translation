#!/usr/bin/env node
import path from 'node:path';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHumanCandidateSeal} from '../src/human-candidate-seal.js';

const candidatePath=path.resolve(process.argv[2]||'');
const sealPath=path.resolve(process.argv[3]||'');
if(!process.argv[2]||!process.argv[3]){
  console.error('Usage: node scripts/seal-human-candidate.mjs <human-candidate.json> <seal.json>');
  process.exit(2);
}
const candidate=JSON.parse(await readFile(candidatePath,'utf8'));
const seal=createHumanCandidateSeal(candidate);
await mkdir(path.dirname(sealPath),{recursive:true});
await writeFile(sealPath,JSON.stringify(seal,null,2)+'\n');
console.log(`Sealed ${candidate.candidate_id}: ${seal.candidate_material_sha256}`);
