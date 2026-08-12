# FLT Passage Manifest State Machine v1

## Purpose

The passage manifest makes a chat disposable. It records the current execution state of one translation unit on the repository's default branch. A new agent resumes from that file, not from conversational memory.

`config/engine_manifest.yaml` remains the durable Engine 2.2 configuration and project history. It points to exactly one current passage manifest. The passage manifest contains only unit-scoped mutable state: phase, revision, permissions, job identities, authorization, remote run identity, next action, and state transitions.

This outer controller complements the existing Autonomous Circuit Breaker v1. The passage manifest decides whether a provider job may start or resume. After a job is validly dispatched, the circuit breaker retains authority over provider-attempt ceilings, checkpoint recovery, and machine-readable halt records.

## Authority order

1. Human Editor's explicit decision for the exact action.
2. Current passage manifest on the default branch.
3. `config/engine_manifest.yaml` and governing project documents.
4. Repository artifacts and receipts identified by those manifests.

Chat history, memory, attachments, handoff prompts, and UI status indicators are never execution state.

## State transitions

| From | To | Trigger | Provider/workflow calls |
|---|---|---|---:|
| `paused` | `ready` | Authorized live `flt resume` | 0 |
| `ready` | `running` | Separately authorized dispatch for the exact job | At most the manifest limit |
| `running` | `awaiting_human_editor` | Verified job completion and durable receipt | 0 |
| `awaiting_human_editor` | `ready` | Explicit Human Editor selection/decision plus authorization of a new distinct next-stage job | 0 |
| `awaiting_human_editor` | `completed` | Explicit Human Editor acceptance when no further required editorial job remains | 0 |
| `blocked` | `ready` | Explicit Human Editor unlock for the exact blocked job after verified halt evidence, preserving cumulative ledger and validated checkpoints | 0 |
| `ready` or `running` | `cancel_requested` | Exact `flt cancel` | 0 provider calls |
| `cancel_requested` | `cancelled` | Verified remote cancellation | 0 |
| `cancel_requested` | `cancel_unverified` | Remote status unavailable after one attempt | 0 |

No command may jump directly from `paused` to `running`. Resume and dispatch are deliberately separate operations. The `awaiting_human_editor` to `ready` handoff may arm only a new distinct job ID; it may not reuse, resume, or rerun the completed job that produced the Human Editor checkpoint. A `blocked` to `ready` recovery is not a fresh budget: it requires an exact Human Editor unlock for the blocked task, preserves the task's cumulative attempt ledger, restores only explicitly authorized validated checkpoints, and uses a fresh launch nonce.

## Revision, idempotency, and repository publication

Every state-changing request names the expected manifest revision. A mismatch stops the logical state transition until the Controller refreshes the authoritative default-branch state. Each logical provider job has one stable job ID and idempotency key. Quarantined, cancelled, and completed job IDs are terminal and cannot be reused.

A state transition becomes authoritative only when committed to the repository's default branch. Branch contents and open pull requests are proposals, not live engine state.

**Human Editor repository-protocol amendment — 2026-08-12:** FLT does **not** require a feature branch or pull request for routine unit finalization. Once the Human Editor has explicitly authorized the exact wording/state change, the Controller may write accepted candidate files, seals, passage manifests, Librarian/Decision logs, and audit receipts directly to the default branch. Architecture/governance work, broad refactors, experiments, or external publishing-tool requirements may still use feature branches.

## Command contracts

### Status

`flt status <UNIT_ID>` reads the engine and passage manifests and reports the current state. It does not require an Actions connection and must not mutate anything.

### Resume dry run

`flt resume <UNIT_ID> --dry-run --expected-revision <REVISION>` reports the proposed transition and unmet requirements. It makes no changes and performs no external calls.

### Live resume

A live resume requires the exact unit ID, exact proposed job ID, matching revision, no active job, and Human Editor authorization scoped to that job. It may only move `paused` to `ready`; it never dispatches.

### Human-editor next-stage handoff

When a completed provider job is `awaiting_human_editor`, an explicit Human Editor wording selection or decision may arm a new distinct next-stage job and transition the passage back to `ready`, provided the authorization is scoped to that new job, the prior job remains terminal/non-reusable, no active job exists, and the new workflow passes the ordinary credential-free dispatch gate.

### Human-editor blocked-job unlock

When a task is `blocked`, recovery to `ready` requires an explicit Human Editor unlock naming the exact task and failed operation, the additional attempt allowance, whether provider spending is authorized, and which checkpoint/ledger state must be restored. Recovery must preserve cumulative provider-attempt accounting, must not reuse the consumed launch nonce, and must pass a fresh zero-provider-call preflight before any provider credential is exposed.

### Cancel

Cancel requires an exact known job ID and revision. Unknown jobs stop the operation. Terminal jobs are idempotent no-ops. An active job receives one external cancellation attempt; uncertainty becomes `cancel_unverified`, never an automatic retry loop.

## Workflow enforcement

Before provider credentials are available, every production workflow must validate all of the following from the passage manifest on the immutable target commit:

- unit and engine version match;
- passage state is `ready`;
- exact job state is `authorized_ready`;
- exact authorization ID and manifest revision match the dispatch inputs;
- no active job exists;
- idempotency key is not terminal or quarantined;
- provider and attempt ceilings match the approved job.

For a **terminal Exact-Candidate Semantic Audit**, the credential-free gate must additionally validate the complete package:

- the exact Human Editor-approved reading text is present and matches its seal;
- every drafted Reader Note (`[rn]`) and Transparency Note (`[tn]`) marked required/applicable for the terminal audit is present in the candidate package and represented in the seal;
- every formally logged Executive/Human Editor Override applicable to the audited wording is bundled or referenced as a binding audit constraint;
- the auditor common prompt explicitly instructs all auditors to judge the whole package—reading text, notes, and binding overrides—for semantic, theological, source-traceability, readability, and constitutional fidelity;
- the audit receipt identifies the exact package components actually audited.

A terminal audit may not dispatch providers against naked reading text when required note or override material exists. A missing required package component is a packaging failure and produces no valid terminal semantic verdict. Notes may resolve an intentional reading-layer ambiguity, but they may not excuse a reading text that materially contradicts the source or governing Constitution. Binding overrides suppress only the issue actually adjudicated; distinct material semantic defects remain blockable.

A workflow that cannot pass its applicable gate must expose no provider credentials and make no provider calls.

## Repository file-write recovery

For repository **file writes/updates only**, the Controller may recover automatically from a deterministic 404, pathing error, or stale blob/commit SHA without requiring a new Human Editor message.

1. Re-read the canonical path and current default-branch file/blob/commit SHA.
2. Correct only the path or expected SHA needed to perform the same already-authorized write.
3. Retry that exact write.
4. Permit no more than **three total attempts** for the exact write operation.

Recovery must not change the authorized translation wording, broaden file scope, create adjacent work, dispatch providers, alter job identity, reset a circuit-breaker ledger, or reuse a consumed nonce.

After the third failed file-write attempt, halt that write and report the exact limitation.

This recovery rule does **not** apply to workflow/provider dispatch, cancellation, live Actions-control uncertainty, PR creation uncertainty, or provider request attempts. Those remain subject to their existing one-shot control rules or the Autonomous Circuit Breaker as applicable.

## Failure behavior

A failed **Actions/control** operation whose remote state is uncertain ends that controller operation unless a more specific governing rule authorizes recovery. Report the exact limitation and `remote_status: unknown`; do not infer success or enter an uncontrolled retry loop.

A deterministic **repository file-write** 404/path/SHA failure is governed instead by the bounded three-attempt repository file-write recovery protocol above.

The Controller never asks the Human Editor to mediate between ChatGPT and GitHub. These outer-controller rules do not reset or replace the bounded provider-request policy inside an already authorized job.
