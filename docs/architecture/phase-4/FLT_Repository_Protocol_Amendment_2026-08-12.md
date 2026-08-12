# FLT Repository Protocol Amendment — 2026-08-12

**Authority:** Human Editor / Executive Editor  
**Status:** adopted  
**Scope:** repository publication and deterministic repository file-write recovery

## Amendment 1 — Routine unit finalization

FLT no longer requires a feature branch or pull request for routine unit finalization. Once the Human Editor has explicitly authorized the exact wording and state transition, accepted candidate files, seals, passage manifests, Librarian/Decision logs, and audit receipts may be committed directly to the repository default branch.

Feature branches remain appropriate for architecture/governance changes, broad refactors, experimental work, or when an external publishing capability requires them.

## Amendment 2 — Controller file-write recovery

For repository file writes/updates only, a deterministic 404, stale-SHA, or pathing error does not automatically end the controller operation.

The Controller may:

1. re-read the canonical file path and current default-branch blob/commit SHA;
2. correct only the path or expected SHA needed to perform the same already-authorized write; and
3. retry that exact write, with no more than three total attempts.

The recovery may not change Human Editor wording, broaden scope, create adjacent work, dispatch providers, reset provider-attempt budgets, alter a job ID, or reuse a consumed nonce.

After three failed file-write attempts, the Controller halts that write and reports the exact limitation.

This amendment does not relax controls for provider dispatch, workflow dispatch, cancellation, live Actions-control uncertainty, PR-creation uncertainty, or provider request attempts. Those remain governed by their existing safety rules and the Autonomous Circuit Breaker.

## Legacy-field interpretation

Older engine manifests may contain `interactive_repository_or_actions_connection_attempt_limit: 1`. For deterministic repository **file-write** recovery, that legacy field is superseded by this amendment and the updated `AGENTS.md` / passage-state-machine rules. It remains the conservative default for Actions/control operations unless a more specific rule applies.
