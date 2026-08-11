# Autonomous Circuit Breaker v1

**Authority:** Human Editor approved 2026-08-08; manifest-authorized one-shot push launch approved 2026-08-10.  
**Purpose:** Prevent a provider, workflow, or external-service failure from becoming an unbounded autonomous recovery loop while allowing the primary assistant to launch an exactly authorized job without requiring the Human Editor to operate GitHub.

## Production authorization

1. Paid workflows may use either `workflow_dispatch` or a manifest-authorized one-shot `push` trigger. A push-triggered paid job is permitted only when the default-branch passage manifest already names the exact job as `authorized_ready`, contains the exact Human Editor authorization ID, records a passed zero-provider-call preflight, permits provider/workflow dispatch, and carries a unique armed launch nonce for that job.
2. Pull-request validation jobs must make zero provider calls and must not receive provider secrets. A PR or unmerged branch is never authoritative execution state.
3. For a manifest-authorized one-shot push launch, the first job must be credential-free and must atomically advance the authoritative manifest from `ready` to `running`, recording the exact job ID and GitHub run ID before any provider job is eligible to receive provider credentials. If that state claim cannot be written and verified, the provider job must not run.
4. A production launch must identify an immutable commit SHA, an explicit task ID, an authorization ID, a manifest revision, and the authorized task budget.
5. A unique launch nonce is single-use. Once the manifest leaves `ready` or the nonce is marked consumed, later pushes must not launch that job again.
6. A failed production task is halted. No workflow-level relaunch, rerun, or recovery call is authorized without an explicit Human Editor unlock naming that task and failed operation.
7. Completed Philippians workflows remain archived. A new task requires a new Human-Editor-authorized workflow or an explicitly reviewed reactivation PR.

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

Before a paid workflow can be launched, validation must confirm:

- explicit task ID, authorization ID, and manifest revision;
- immutable commit identity or an immutable push commit supplied by GitHub;
- prompt and schema share one tested output contract;
- fenced JSON parsing;
- accepted aliases and normalization rules;
- mocked outputs pass every schema and semantic assertion;
- two-attempt worker and eight-attempt task ceilings;
- restored checkpoint fingerprints and persistent task ledger;
- the exact production trigger mode (`workflow_dispatch` or manifest-authorized one-shot `push`);
- for one-shot push launch, an armed unique launch nonce and a credential-free state-claim gate that writes `running` before provider secrets are exposed;
- no provider secrets are available to pull-request validation jobs or the state-claim gate; and
- a zero-provider-call preflight receipt exists.

A preflight repair PR must itself make zero provider calls. A merge may launch production only when the exact job is already authorized in the default-branch manifest and the merge is the intentionally armed one-shot launch event.
