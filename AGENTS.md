# Formed Life Translation Agent Instructions

The live repository is the sole authority for FLT execution state. Chat history, memory, attachments, handoff prose, UI animations, and prior agent claims are not execution state.

## Required bootstrap

Before any FLT action:

1. Read `docs/START_HERE.md`.
2. Read `config/engine_manifest.yaml`.
3. Read the current passage manifest named by `execution_control.current_passage_manifest`.
4. Read only the governing and unit files required for the requested next action.
5. Confirm the unit ID, manifest revision, state, active job, authorization, and next permitted action.

If any required file is missing, invalid, stale, or contradictory, stop and report the exact conflict. Never reconstruct state from conversation history.

## Authority and safety

- David L. Davis is the Human Editor and owns every wording, authorization, acceptance, reopening, and finalization decision.
- The Human Editor is not a GitHub operator or middleware. Use the connected repository tools for authorized repository work. If a required capability is unavailable, report the boundary and stop that operation; do not ask the Human Editor to shuttle code, URLs, SHAs, or buttons between systems.
- Philippians v0.9 RC1 is frozen. Do not modify, reopen, rerun, or reconstruct it unless the Human Editor explicitly authorizes that exact action.
- Never translate, generate candidate wording, call providers, dispatch a workflow, or mutate translation artifacts unless the current passage manifest permits that exact action and job ID.
- For an interactive repository or Actions control operation, stop after the first failed connection and report `remote_status: unknown`. Never enter an agent-driven retry loop.
- Once an exact provider job is durably authorized and dispatched, its internal request attempts remain governed by `docs/architecture/phase-4/FLT_Autonomous_Circuit_Breaker_v1.md`; do not broaden or reset those budgets.
- Never resume or rerun a quarantined, cancelled, or completed job.
- A historical preflight receipt or old chat authorization is not current authorization.
- A UI animation is not evidence that a remote job is active.

## FLT control commands

These phrases are controller commands. They are not permission to perform adjacent work.

### `flt status <UNIT_ID>`

Read and validate the engine manifest and exact passage manifest. Report the manifest revision, current state and phase, active job and run IDs, allowed and forbidden actions, authorization status, next permitted action, and remote status. This command is read-only: no repository writes, provider calls, workflow dispatches, or translation wording.

### `flt resume <UNIT_ID> --dry-run --expected-revision <REVISION>`

Report the exact proposed transition and every unmet precondition. Make no repository changes, provider calls, workflow dispatches, or translation wording.

### `flt resume <UNIT_ID> --job <JOB_ID> --authorization-id <ID> --expected-revision <REVISION>`

A live resume is permitted only when the passage manifest allows it, the revision matches, no job is active, and the Human Editor has authorized that exact job and transition. Resume may move only `paused` to `ready`; it does not dispatch providers or workflows. The durable transition must be proposed through an authorized repository change and becomes authoritative only when merged to the default branch.

### `flt cancel <UNIT_ID> --job <JOB_ID> --expected-revision <REVISION>`

Require an exact known job ID and matching revision. A terminal job is an idempotent no-op. For an active job, record `cancel_requested`, make one exact external cancellation attempt when the connector supports it, and record `cancelled` or `cancel_unverified`. Never cancel an unidentified run, never retry automatically, and never call a provider during cancellation.

## Dispatch gate

Provider dispatch is a separate transition from resume. It requires all of the following on the default branch:

- passage state `ready`;
- the exact job state `authorized_ready`;
- an authorization ID scoped to that exact job;
- no active job;
- a matching expected manifest revision;
- an idempotency key not used by a terminal or quarantined job;
- a workflow preflight that validates the passage manifest before exposing provider credentials.

If any condition fails, stop without dispatching.

## Candidate and editorial invariants

- Candidate A, Candidate B, and Candidate C independently pursue the same FLT constitutional goal.
- Preserve blindness from prior FLT wording, prior candidates, comparison translations, editor benchmarks, and conversation drafts.
- Candidate and audit outputs are evidence, not verdicts.
- Human Editor approval is required at every established editorial gate.
- Never silently repair or finalize wording.
