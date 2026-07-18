# FLT Phase 3A — Run Directory Contract

Each production run must use an immutable run ID:

`FLT-<book>-<chapter>-<YYYYMMDD>-<sequence>`

Example:

`FLT-PHP-01-20260718-001`

## Required directory structure

```text
runs/
└── FLT-PHP-01-20260718-001/
    ├── manifest/
    │   ├── run_manifest.json
    │   ├── governing_versions.json
    │   ├── input_hashes.json
    │   └── event_log.jsonl
    ├── packets/
    │   ├── source_master/
    │   ├── readability_worker/
    │   ├── greek_fidelity_worker/
    │   ├── balanced_worker/
    │   ├── self_critique/
    │   ├── cross_critique/
    │   ├── focused_checkers/
    │   ├── revision/
    │   ├── decision_brief/
    │   ├── literary_review/
    │   └── copyright_review/
    ├── outputs/
    │   ├── drafts/
    │   ├── critiques/
    │   ├── checker_reports/
    │   ├── revisions/
    │   ├── decision_briefs/
    │   ├── chapter_candidates/
    │   └── final_reports/
    ├── metrics/
    │   ├── human_burden.json
    │   ├── run_metrics.json
    │   └── benchmark_comparison.json
    ├── failures/
    │   ├── retries.jsonl
    │   ├── blocked_items.json
    │   └── malformed_outputs/
    └── freeze/
        ├── freeze_manifest.md
        └── file_hashes.json
```

## Immutability rules

1. Raw model outputs are append-only.
2. A corrected output receives a new attempt number.
3. No failed output may be overwritten or deleted.
4. Human edits must be stored as explicit decisions, never silent replacements.
5. Benchmark English must remain outside blind-stage directories.
6. Copyright comparison material must exist only under `copyright_review/`.
7. Every generated file must be recorded in `event_log.jsonl`.
8. Any post-freeze change requires a new run ID or new versioned freeze.
