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
- Once an exact provider job is durably authorized and dispatched, its internal request attempts remain governed by `docs/architecture/phase-4/FLT_Autonomous_Circuit_Breaker_v1.md`; do not broaden or reset those budgets.
- Never resume or rerun a quarantined, cancelled, or completed job.
- A historical preflight receipt or old chat authorization is not current authorization.
- A UI animation is not evidence that a remote job is active.

## Repository write protocol — Human Editor amendment 2026-08-12

This section supersedes older FLT repository conventions that required feature branches for routine unit finalization and that stopped every repository file-write operation after the first deterministic 404/path error.

- **Routine unit finalization is direct-to-default-branch.** Once the Human Editor has explicitly authorized the exact wording/state change, accepted candidate files, passage-manifest updates, seals, Decision/Librarian logs, and audit receipts may be committed directly to the default branch. FLT itself does not require a feature branch or PR for those routine unit-finalization writes.
- Feature branches remain permitted for architecture/governance changes, broad refactors, experimental work, or when an external publishing capability imposes a branch/PR requirement.
- **Repository file-write auto-recovery:** for a repository contents write/update that returns a deterministic `404`, stale-SHA, or pathing error, the Controller may autonomously re-read the intended canonical path, sync the latest default-branch blob/commit SHA, correct the path or expected SHA, and retry the same authorized write.
- The Controller may make **up to three total repository file-write attempts for that exact authorized write**. It must not broaden the file scope, alter Human Editor wording, create adjacent work, or reset provider budgets while recovering.
- If three file-write attempts fail, or the failure is not a deterministic path/SHA/file-write error, halt that write and report the exact boundary.
- This three-attempt file-write recovery rule **does not apply to provider dispatch, workflow dispatch, cancellation, live Actions-control uncertainty, PR creation uncertainty, or provider request attempts**. Those remain governed by their specific safety rules and the circuit breaker.
- The legacy `execution_control.interactive_repository_or_actions_connection_attempt_limit: 1` value in an older engine manifest is deprecated for deterministic repository **file-write** recovery. It continues to describe the conservative default for Actions/control operations unless a newer governing file says otherwise.

## Complete-package exact-audit protocol — Human Editor Amendment 3, 2026-08-12

The terminal Exact-Candidate Semantic Audit evaluates the **complete Human Editor-authorized package**, not naked reading text whenever required note or override material exists.

- Before a terminal exact audit, the Controller must assemble and seal the exact reading text together with **all drafted Reader Notes (`[rn]`) and Transparency Notes (`[tn]`) that apply to the unit and are intended to accompany or govern interpretation of the candidate**, plus every formally logged Executive/Human Editor Override applicable to that wording.
- If the Passage-Sense gate, Librarian backlog, candidate metadata, Decision Log, or Human Editor directive marks a note as required for the terminal package, the credential-free audit preflight must verify that the drafted note is actually present. A required-but-missing drafted note makes the package ineligible for provider dispatch.
- The Controller must not substitute a backlog placeholder for a drafted note when the note itself is required to disambiguate the reading text. The actual approved/drafted note text must be bundled.
- Auditor prompts must explicitly identify the object under review as **reading text + bundled `[rn]`/`[tn]` notes + binding Executive Overrides** and require theological, semantic, source-traceability, readability, and constitutional evaluation of the package as a whole.
- A note may clarify an ambiguity the reading text intentionally leaves for the note layer, but notes may not be used to excuse a reading text that materially contradicts the source or the FLT Constitution.
- Formally logged Executive Overrides are binding constraints on preference-level or already-adjudicated issues. Auditors may still block for a distinct material meaning loss, addition, contradiction, or misleading implication not actually covered by the override.
- The candidate seal/audit receipt must identify the bundled package components sufficiently to prove which reading text, notes, and overrides were audited.
- An exact audit that omits a required package component is a **packaging failure, not valid terminal semantic evidence**, and cannot by itself finalize or reject the candidate.

## FLT control commands

These phrases are controller commands. They are not permission to perform adjacent work.

### `flt status <UNIT_ID>`

Read and validate the engine manifest and exact passage manifest. Report the manifest revision, current state and phase, active job and run IDs, allowed and forbidden actions, authorization status, next permitted action, and remote status. This command is read-only: no repository writes, provider calls, workflow dispatches, or translation wording.

### `flt resume <UNIT_ID> --dry-run --expected-revision <REVISION>`

Report the exact proposed transition and every unmet precondition. Make no repository changes, provider calls, workflow dispatches, or translation wording.

### `flt resume <UNIT_ID> --job <JOB_ID> --authorization-id <ID> --expected-revision <REVISION>`

A live resume is permitted only when the passage manifest allows it, the revision matches, no job is active, and the Human Editor has authorized that exact job and transition. Resume may move only `paused` to `ready`; it does not dispatch providers or workflows. The durable transition becomes authoritative only when committed to the default branch.

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
