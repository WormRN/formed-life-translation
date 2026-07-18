# FLT Phase 4 — Executable Orchestration

**Benchmark chapter:** Philippians 1  
**First live unit:** Philippians 1:12–18  
**Status:** First live unit completed through blind ensemble evaluation; provisional human editorial decision pending.

Phase 4 moves Engine 2.0 from documented simulation to executable orchestration. The first implementation lives in `phase4-harness/` and directly answers the Phase 3 conditional-pass defects.

## Acceptance gate for the first live run

1. All three provider/model identities are distinct.
2. All three blind packets pass visibility checks and have different role missions.
3. Every successful output passes both the draft schema and saved-envelope schema.
4. Every attempt, including failures, is preserved and logged.
5. Any exhausted or non-retryable failure blocks downstream output.
6. Provenance includes packet hash, provider, model, request ID, timing, and usage.
7. The generated brief exposes choices to the human editor and makes no finalization claim.

The first live unit passed genuine drafting-worker separation and subsequently completed self-critique, anonymized cross-critique, focused checking, three independent syntheses, and blind synthesis evaluation. It remains unapproved and is not publication-ready.

## Deliberate minimalism

The harness began with trustworthy drafting plumbing and now supports critique, focused checking, controlled synthesis, blind evaluation, provenance recovery, and resumable partial runs. Remaining Phase 4 increments include human adjudication capture, automated consolidation of duplicate decision questions, copyright review, proposed Matrix/Decision Log patches, and chapter-scale testing without weakening blind boundaries.

## First live-unit evidence

- Passage: Philippians 1:12–18
- Completed ensemble run: `FLT-PHP-01-20260718-901`
- GitHub Actions run: `29658592179`
- Provenance artifact: `8433634100`
- Editorial artifact: [`PHP-01-012-018_editorial-brief.md`](./PHP-01-012-018_editorial-brief.md)

The editorial artifact contains a recommended composite and five consolidated human decisions. No model or harness stage has authority to finalize the wording.
