# Autonomous Circuit Breaker v1

**Authority:** Human Editor approved 2026-08-08.  
**Purpose:** Prevent a provider, workflow, or external-service failure from becoming an unbounded autonomous recovery loop.

## Production authorization

1. Every paid workflow must use `workflow_dispatch` only. A pull request, push, merge, workflow-file repair, or receipt write must never launch a provider call.
2. A production dispatch must identify an immutable commit SHA, an explicit task ID, and the authorized task budget.
3. A failed production task is halted. No workflow-level relaunch, rerun, or recovery call is authorized without an explicit Human Editor unlock naming that task and failed operation.
4. Completed Philippians workflows are archived. A new task requires a new Human-Editor-authorized workflow or an explicitly reviewed reactivation PR.

## Provider budget

- Maximum per worker: **2 total attempts**, including the first request.
- Maximum per task: **8 total provider attempts**, including rejected responses and calls made in earlier workflow runs.
- The task ledger must be restored with checkpoints during recovery. Checkpoint reuse consumes no new attempt.
- An attempt is reserved in the persistent ledger before the provider request.
- Reaching either ceiling writes `manifest/system-halt.json` and stops before another call.

## External connection policy

| Status | Default action |
|---|---|
| 429, 500, 502, 503, 504 | At most 3 total attempts with waits of 1 minute and 5 minutes before attempts 2 and 3 |
| 404 | Stop immediately, except a documented newly-created-resource lookup may use the bounded retry schedule |
| 400, 401, 403, 409, 422 | Stop immediately |
| Unknown or unclassified | Stop unless explicitly classified by tested code |

After the external-attempt allowance is exhausted, preserve the unsent payload locally, write the halt record when possible, perform no further external calls or writes, and return one final halt report to the Human Editor.

## Mandatory halt record

The machine-readable halt record must include:

- task ID and halt code;
- exact failed operation;
- attempts used and allowed;
- provider calls made;
- valid checkpoints preserved;
- unsent payload path, when applicable;
- `human_unlock_required: true`;
- `further_external_actions_authorized: false`;
- `further_paid_calls_authorized: false`.

A halt must end the automated turn normally so the Human Editor can still communicate. It does not halt explanatory text generation needed to report the failure.

## Human unlock

A valid unlock must name:

1. the halted task;
2. the exact failed operation;
3. the number of additional attempts authorized;
4. whether provider spending is authorized; and
5. which existing checkpoints and task ledger must be restored.

“Continue,” “try again,” or a general instruction to resume translation does not unlock a halted production task.

## Zero-provider-call preflight

Before a paid workflow can be dispatched, validation must confirm:

- run ID and explicit task ID;
- immutable commit SHA;
- prompt and schema share one tested output contract;
- fenced JSON parsing;
- accepted aliases and normalization rules;
- mocked outputs pass every schema and semantic assertion;
- two-attempt worker and eight-attempt task ceilings;
- restored checkpoint fingerprints and persistent task ledger;
- manual-only production trigger;
- no provider secrets are available to pull-request validation jobs; and
- a zero-provider-call preflight receipt exists.

No preflight repair commit may itself launch production.
