# Engine 2.2 Cost and Integrity Guardrails

**Status:** Required for all new Engine 2.2 drafting, oral-smoothing, and constitutional-audit workflows.

These controls reduce accidental provider spending without changing FLT's translation goal, prompts, source material, provider diversity, human authority, or constitutional standard.

## Quality boundary

Retain the current quality-bearing stages and three-provider architecture:

1. three blind source-aware candidates;
2. three English-only listener diagnoses;
3. three source-aware smoothing proposals;
4. three English-only meaning reconstructions;
5. three source-aware constitutional audits.

Do not substitute lower-capability models or remove a stage merely to reduce cost. Chapter-level review remains available for discourse, coherence, and note interactions that cannot be evaluated safely at unit level.

## Attempt accounting

Every request attempt must create:

`manifest/attempts/<stage>/<role>/attempt-<n>.json`

The record distinguishes:

- `accepted`: response passed parsing, schema validation, and integrity checks;
- `response_rejected`: the provider returned a response, but it failed a downstream check;
- `request_failed`: no usable provider response was returned.

Usage metadata is preserved for every HTTP-success response, including malformed or schema-invalid output. When a provider error does not return usage, the attempt is still recorded and usage is explicitly marked unavailable. Provider billing dashboards remain authoritative for that narrow category.

## Validated worker checkpoints

A worker writes a checkpoint immediately after its response passes every stage-specific validation:

`checkpoints/<stage>/<role>.json`

Before calling a provider, the runner may reuse that checkpoint only when all of the following match:

- stage;
- worker role;
- provider;
- model;
- SHA-256 of the immutable base prompt.

The checkpoint output is revalidated against the current schema and stage integrity assertions. Any mismatch rejects the checkpoint and permits a fresh call. A failed sibling therefore cannot invalidate or overwrite a successful worker.

GitHub Actions workflows must restore and save the `checkpoints/` directory across attempts of the same workflow run. Use an attempt-specific immutable cache key and a run-specific restore prefix:

```yaml
- name: Restore validated worker checkpoints
  if: github.event_name != 'pull_request'
  uses: actions/cache/restore@v4
  with:
    path: phase4-harness/runs/${{ steps.run.outputs.run_id }}/checkpoints
    key: flt-${{ github.run_id }}-${{ github.run_attempt }}
    restore-keys: |
      flt-${{ github.run_id }}-

# Run the Engine stage here.

- name: Save validated worker checkpoints
  if: always() && github.event_name != 'pull_request'
  uses: actions/cache/save@v4
  with:
    path: phase4-harness/runs/${{ steps.run.outputs.run_id }}/checkpoints
    key: flt-${{ github.run_id }}-${{ github.run_attempt }}
```

The normal `if: always()` artifact upload must continue to preserve the full ledger and checkpoints even when the job fails.

## Exact human-authority binding

Before a constitutional audit, the approved candidate must receive a separate seal:

```bash
node phase4-harness/scripts/seal-human-candidate.mjs \
  docs/architecture/phase-4/<human-candidate>.json \
  docs/architecture/phase-4/<human-candidate>.seal.json
```

The seal records the exact hashes of:

- ordered reading text;
- ordered approved reader notes;
- candidate identity and full auditable material.

The human-approved candidate and seal must be reviewed and committed before the audit begins. The audit command requires the seal as its final argument:

```bash
node phase4-harness/src/human-candidate-audit.js \
  <config.json> <run-directory> <human-candidate.json> <human-candidate.seal.json>
```

The runner verifies the seal before any provider call. A changed verse, changed note, substituted smoother proposal, wrong candidate file, or stale seal fails closed with zero audit calls.

## Chapter completion

Unit-level audit evidence must not be repeated merely because a chapter closes. Chapter completion should first verify coverage, exact assembly, note order, cross-unit links, and discourse flow. A model stage is warranted when the chapter-level task evaluates an interaction not already tested at unit level. Any wording changed during chapter review receives the required targeted oral, heuristic-delta, and constitutional recheck.

This rule prevents automatic repetition while preserving the whole-chapter safeguard whenever it can discover something the unit gates could not.
