# FLT Phase 4 — Minimal Multi-Model Harness

This is the first executable harness for the Formed Life Translation. Its benchmark chapter is Philippians 1; its first live unit is Philippians 1:12–18.

Phase 4 reserves run sequence numbers 101–999 so its immutable run IDs cannot collide with the Phase 3 simulation series.

## What it proves

- three blind drafting roles are dispatched concurrently to three distinct providers;
- packets are rebuilt from an allowlist, so benchmark English, comparison translations, sibling drafts, and prior human wording are never loaded into blind calls;
- model JSON and the saved output envelope are schema-validated;
- raw attempts are append-only and retries are logged;
- a failed worker blocks the unit and prevents a decision brief;
- timestamps, model identity, provider request ID, usage, packet hash, raw output, and events are preserved;
- the result is a human decision brief, never an automatically finalized translation.

The first adapters are OpenAI Responses, Anthropic Messages, and Google Gemini `generateContent`. Requiring three distinct providers is intentionally stricter than merely making three calls to one model.

## Run

Requires Node 20+ and credentials for all three providers.

```bash
cd phase4-harness
npm install
cp config.example.json config.json
export OPENAI_API_KEY=...
export ANTHROPIC_API_KEY=...
export GEMINI_API_KEY=...
npm test
npm run validate -- config.json
npm run run -- config.json
```

Model names in `config.json` are explicit run inputs, not permanent project endorsements. Update them to models actually available to the operator and record any substitution by creating a new run configuration/run ID.

## Safe-stop and retry policy

Provider timeouts, HTTP 408/429/5xx responses, malformed JSON, and schema failures may be retried up to `max_attempts` (default three total attempts, matching Phase 3's initial call plus two retries). Missing credentials, unknown providers, visibility failures, corrupted source identity, and exhausted retries block the run. Failed raw outputs and events remain in the run directory.

## Phase 4 boundary

This first slice performs independent blind drafts and produces the human comparison brief. Self-critique, anonymized cross-critique, focused checkers, controlled synthesis, post-draft copyright comparison, Matrix patches, and decision-log patches are deliberately subsequent increments. They must reuse the same visibility, validation, retry, provenance, and safe-stop primitives.
