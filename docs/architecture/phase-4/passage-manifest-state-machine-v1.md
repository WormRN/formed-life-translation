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
| `ready` or `running` | `cancel_requested` | Exact `flt cancel` | 0 provider calls |
| `cancel_requested` | `cancelled` | Verified remote cancellation | 0 |
| `cancel_requested` | `cancel_unverified` | Remote status unavailable after one attempt | 0 |

No command may jump directly from `paused` to `running`. Resume and dispatch are deliberately separate operations. The `awaiting_human_editor` to `ready` handoff may arm only a new distinct job ID; it may not reuse, resume, or rerun the completed job that produced the Human Editor checkpoint.

## Revision and idempotency

Every state-changing request names the expected manifest revision. A mismatch stops the operation. Each logical provider job has one stable job ID and idempotency key. Quarantined, cancelled, and completed job IDs are terminal and cannot be reused.

A proposed state transition becomes authoritative only after it is merged to the default branch. Branch contents and open pull requests are proposals, not live engine state.

## Command contracts

### Status

`flt status <UNIT_ID>` reads the engine and passage manifests and reports the current state. It does not require an Actions connection and must not mutate anything.

### Resume dry run

`flt resume <UNIT_ID> --dry-run --expected-revision <REVISION>` reports the proposed transition and unmet requirements. It makes no changes and performs no external calls.

### Live resume

A live resume requires the exact unit ID, exact proposed job ID, matching revision, no active job, and Human Editor authorization scoped to that job. It may only propose `paused` to `ready`; it never dispatches.

### Human-editor next-stage handoff

When a completed provider job is `awaiting_human_editor`, an explicit Human Editor wording selection or decision may arm a new distinct next-stage job and transition the passage back to `ready`, provided the authorization is scoped to that new job, the prior job remains terminal/non-reusable, no active job exists, and the new workflow passes the ordinary credential-free dispatch gate.

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

A workflow that cannot pass this gate must expose no provider credentials and make no provider calls.

## Failure behavior

One failed interactive repository or Actions connection ends that controller operation. The agent reports the exact limitation and continues only with actions explicitly allowed without that connection. It never asks the Human Editor to mediate between ChatGPT and GitHub. This does not reset or replace the bounded provider-request policy inside an already authorized job.
