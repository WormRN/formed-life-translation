# FLT Engine 2.0 — Start Here

**Repository:** `WormRN/formed-life-translation`  
**Authority:** This file is the required entry point for every new FLT chat or agent session.  
**Machine state:** `config/engine_manifest.yaml`  
**Latest audit receipt:** `config/latest_audit_run.json` when present.

## Mandatory bootstrap

Before proposing a translation, launching a workflow, interpreting an audit, or recording a decision:

1. Read this file completely.
2. Read `config/engine_manifest.yaml`.
3. Verify live access to this repository and confirm the manifest reports Engine 2.0.
4. Read every governing document listed in the manifest that is relevant to the next action.
5. Read the current unit's exact candidate/source/workflow files listed in the manifest.
6. State the verified checkpoint before continuing.

If these files cannot be retrieved, **stop** and report that repository continuity has not been established. Do not reconstruct the engine from chat memory, uploaded Version 1 files, or generic translation preferences.

## Authority boundary

The human editor owns every translation decision.

- The human editor selects wording, authorizes repairs, accepts or rejects audit findings, and finalizes units.
- The primary assistant is the orchestration boss. It routes packets, launches workers and checkers, preserves blindness, verifies evidence, and prepares decision briefs.
- The orchestration boss may recommend wording, but it may not silently substitute its preference for the human editor's selection.
- Worker models and checker models provide evidence only. Their drafts, classifications, warnings, and eligibility judgments are not verdicts.
- A human-selected candidate is sealed for audit. It must be submitted exactly as selected unless the human editor explicitly authorizes a change.
- If the human editor says “run the appropriate checks,” “send this through the next phase,” or equivalent language, perform the Engine 2.0 checkpoint workflow. A boss-only editorial review is not a substitute and must be clearly labeled if separately requested.
- Auditors may identify omissions, additions, ambiguity, theological risk, communication problems, or possible repairs. They may not repair, accept, reject, or finalize the candidate.

## Translation workflow

For each new unit:

1. Prepare one blind source packet from the SBLGNT and governing documents.
2. Generate three independent candidates from the same constitutional goal:
   - Candidate A — Claude Sonnet
   - Candidate B — GPT-5.6 Sol
   - Candidate C — Gemini Pro
3. Keep the candidates blind from one another, prior approved English, and comparison translations.
4. Present the untouched A/B/C candidates verse by verse.
5. The human editor produces or selects the editor candidate.
6. Seal that exact candidate and run independent reader reconstructions plus semantic-floor audits.
7. Return evidence and severity classifications to the human editor.
8. Record acceptance or repair only after an explicit human decision.

Do not replace this common-goal A/B/C process with separate readability, fidelity, and blended translation goals.

## Audit retrieval without user-supplied links

The user should not normally have to copy a GitHub Actions run URL into the chat.

1. Read `config/latest_audit_run.json`.
2. Use its repository, workflow path, run ID, run URL, artifact name, job outcome, auditor counts, and semantic-pass field to retrieve and verify the evidence.
3. Treat a successful Actions job as transport/execution success only. A semantic pass requires the recorded audit evidence; it does not finalize the translation.
4. If the receipt says an audit is still pending or failed, report that state accurately.
5. Ask the user for a run link only after repository-based and connected-GitHub retrieval are genuinely unavailable.

Every new exact-candidate audit workflow must publish or update `config/latest_audit_run.json` after it completes.

## Current work

The manifest is authoritative for the current passage, stage, file paths, accepted units, and next permitted action. Update the manifest whenever the project advances to a new unit or stage.
