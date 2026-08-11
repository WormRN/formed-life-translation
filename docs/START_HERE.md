# FLT Engine 2.2 — Start Here

**Repository:** `WormRN/formed-life-translation`  
**Authority:** Required entry point for every new FLT chat or agent session  
**Engine configuration and project history:** `config/engine_manifest.yaml`  
**Current execution state:** the passage manifest named by `execution_control.current_passage_manifest`  
**Latest audit receipt:** `config/latest_audit_run.json` when relevant

## Mandatory bootstrap

Before proposing a translation, launching a workflow, interpreting an audit, recording a decision, or reporting project status:

1. Read root `AGENTS.md` completely.
2. Read this file completely.
3. Read `config/engine_manifest.yaml`.
4. Read the current passage manifest named by `execution_control.current_passage_manifest`.
5. Verify that the unit ID and engine version agree across both manifests.
6. Read only the governing documents and exact unit files required for the next permitted action.
7. Report the verified unit, passage-manifest revision, state, active job, authorization, and next permitted action.

If any required file cannot be retrieved, is internally inconsistent, or conflicts with another authoritative repository file, stop and report the conflict. Do not reconstruct continuity from chat memory, uploaded Version 1 files, handoff prose, prior agent claims, or generic translation preferences.

## Two manifest layers

`config/engine_manifest.yaml` defines the engine, governing documents, accepted history, and pointer to the current unit.

The current passage manifest under `config/passages/` records mutable execution state for one unit: phase, revision, permissions, job IDs, authorization, remote run identity, and next action.

For execution status, the passage manifest on the default branch is authoritative. Branches and open pull requests contain proposed state only.

## Authority boundary

The Human Editor owns every translation decision.

- The Human Editor selects wording, authorizes exact jobs and transitions, accepts or rejects audit findings, and finalizes units.
- The primary assistant orchestrates the engine and may recommend wording, but may not silently substitute its preference for the Human Editor's selection.
- Workers and auditors provide evidence only.
- A human-selected candidate is sealed for audit and must remain exact unless the Human Editor explicitly authorizes a change.
- The Human Editor is not GitHub middleware. Connected repository tools perform authorized GitHub work. If a connector lacks a required operation, stop that operation and report the boundary.

## Control commands

`flt status` is read-only and must not connect to Actions merely to establish local repository state.

`flt resume --dry-run` reports a proposed transition without writes, provider calls, workflow dispatches, or translation wording.

A live `flt resume` may move `paused` to `ready` only after exact authorization and a matching passage-manifest revision. Resume never dispatches.

`flt cancel` requires an exact known job ID. It never cancels an unidentified run and never retries an external cancellation automatically.

Provider dispatch is a separate operation and is forbidden unless the default-branch passage manifest marks the exact job `authorized_ready` and every dispatch precondition passes.

After a valid dispatch, provider-attempt ceilings, checkpoint recovery, and halt records remain governed by `docs/architecture/phase-4/FLT_Autonomous_Circuit_Breaker_v1.md`.

## Translation workflow

For each authorized new unit:

1. Prepare one blind source packet from the SBLGNT and governing documents.
2. Complete the Passage-Sense Resolution Gate before English drafting.
3. Generate three independent candidates from the same constitutional goal:
   - Candidate A — Claude Sonnet
   - Candidate B — GPT-5.6 Sol
   - Candidate C — Gemini Pro
4. Keep the candidates blind from one another, prior approved English, comparison translations, editor benchmarks, and conversation drafts.
5. Present untouched A/B/C candidates verse by verse.
6. The Human Editor produces or selects the editor candidate.
7. Seal that exact candidate and run independent reader reconstructions plus semantic-floor audits.
8. Return evidence and severity classifications to the Human Editor.
9. Record acceptance or repair only after an explicit human decision.

Do not replace the common-goal A/B/C process with separate readability, fidelity, and blended missions.

## Failure behavior

- One failed interactive repository or Actions connection ends that controller operation.
- Record or report remote status as unknown; never infer success, failure, or activity.
- Never enter an automatic retry loop.
- Continue only safe actions explicitly permitted by the passage manifest.
- A UI animation is not evidence of a remote job.
- Quarantined, cancelled, and completed job IDs are terminal and cannot be resumed or rerun.

## Audit retrieval without user-supplied links

When an audit receipt exists:

1. Read `config/latest_audit_run.json`.
2. Use its recorded run ID, URL, artifact, outcome, auditor counts, and semantic-pass fields.
3. Treat Actions success as transport/execution success only; semantic pass requires the recorded audit evidence.
4. Ask the Human Editor for a run link only if repository-based retrieval is genuinely unavailable and the requested task cannot safely stop.

Every new exact-candidate audit workflow must publish or update `config/latest_audit_run.json` after completion.

## Current work

The current passage manifest is authoritative for the active unit and next permitted action. At the architectural-repair checkpoint, Colossians translation, candidate generation, provider calls, and workflow dispatch are forbidden until the clean resume test passes and the Human Editor separately authorizes an exact new job.
