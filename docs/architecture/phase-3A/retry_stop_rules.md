# FLT Phase 3A — Retry and Stop Rules

## Retryable failures

A role may be retried for:

- malformed JSON or schema mismatch;
- empty required field;
- transient timeout;
- provider error;
- accidental truncation;
- explicit refusal unrelated to content policy;
- output in the wrong language or format.

## Non-retryable failures

Stop and escalate for:

- benchmark or copyrighted text leakage into a blind role;
- source packet corruption;
- missing or conflicting governing authority;
- unresolved human-only theological decision;
- repeated hallucination of Greek data;
- unauthorized finalization claim;
- repeated failure after maximum retries.

## Limits

- Schema/format retries: maximum 2.
- Provider/timeout retries: maximum 2.
- Controlled revision cycles: maximum 2.
- Same model may not silently replace a failed independent worker.
- A replacement model must be logged as a role substitution.

## Safe-stop behavior

When limits are reached:

1. mark role or unit `blocked`;
2. preserve all failed attempts;
3. state the exact blocking reason;
4. identify the missing human or system decision;
5. prevent downstream stages from treating the unit as complete.

No stage may infer missing content or fabricate a successful result.
