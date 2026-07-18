# FLT Phase 4 — Executable Orchestration

**Benchmark chapter:** Philippians 1  
**First live unit:** Philippians 1:12–18  
**Status:** Minimal harness implemented; live provider run awaits operator credentials.

Phase 4 moves Engine 2.0 from documented simulation to executable orchestration. The first implementation lives in `phase4-harness/` and directly answers the Phase 3 conditional-pass defects.

## Acceptance gate for the first live run

1. All three provider/model identities are distinct.
2. All three blind packets pass visibility checks and have different role missions.
3. Every successful output passes both the draft schema and saved-envelope schema.
4. Every attempt, including failures, is preserved and logged.
5. Any exhausted or non-retryable failure blocks downstream output.
6. Provenance includes packet hash, provider, model, request ID, timing, and usage.
7. The generated brief exposes choices to the human editor and makes no finalization claim.

Passing this gate validates genuine drafting-worker separation. It does not yet validate independent critique/checker stages or publication readiness.

## Deliberate minimalism

The harness does not reproduce the entire Phase 3 pipeline in its first executable increment. It establishes trustworthy plumbing first. Later Phase 4 increments should add self-critique, anonymized cross-critique, focused checking, controlled synthesis, copyright review, and proposed Matrix/Decision Log patches without weakening the blind boundaries.
