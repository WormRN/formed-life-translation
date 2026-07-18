# FLT Phase 4 — First Live Drafting Pilot

**GitHub run:** `29652953024`  
**Artifact label:** `FLT-PHP-01-20260718-001`  
**Outcome:** Successful with two harness defects requiring repair  
**Publication status:** Not final

## What passed

- Three genuinely separate provider calls completed on their first attempts.
- Claude Sonnet 5 served as readability worker.
- GPT-5.6 Sol served as Greek-fidelity worker.
- Gemini 3.1 Pro Preview served as balanced worker.
- Blind packet construction, schema validation, provenance capture, decision-brief generation, and artifact upload completed.
- API secrets remained masked in GitHub logs.

## Costs reported by the human operator

- Anthropic: approximately $0.06
- OpenAI: approximately $0.12
- Google: approximately $0.13
- Total: approximately $0.31

These are operator-observed dashboard costs, not calculated harness values.

## Human signal

The human editor especially favored the readability worker's treatment of Philippians 1:15. This is a preliminary preference signal, not a final translation decision, and must not be exposed to later blind drafting or blind critique roles.

## Defects and repair gate

The decision brief displayed `proposed_rendering` rather than assembling the validated verse fields, and the generated run ID collided with the Phase 3 simulation ID. Before critique, the harness must render the verse array, enforce the exact ordered references, reserve noncolliding Phase 4 IDs, and complete one clean rerun.
