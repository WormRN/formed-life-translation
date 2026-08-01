# FLT Engine 2.2 — Passage-Sense Resolution Gate

**Status:** Implemented experimental engine increment  
**Position:** Before blind A/B/C drafting  
**Human authority:** Unchanged

## Purpose

Engine 2.1 repaired oral-English architecture after human synthesis. Engine 2.2 addresses the upstream problem exposed by Philippians 3:1–11: a model can write smooth English while selecting the wrong contextual function for a source expression.

The gate separates contextual interpretation from English composition. Drafting cannot begin until a source-side brief maps the passage argument, propositions, context-sensitive expressions, primary senses, viable alternatives, discourse evidence, reader-text guidance, literal-note guidance, and decision risks.

## Required sequence

1. Assemble Greek source and contextual data.
2. Resolve the passage argument and proposition map without drafting FLT English.
3. Flag expressions governed by discourse, metaphor, metonymy, wordplay, intertext, scope, or disputed syntax.
4. Record one primary contextual sense and either:
   - mark the issue resolved; or
   - retain genuinely viable alternatives for human decision.
5. Distinguish reading-text guidance from literal or explanatory note guidance.
6. Give all three candidates the identical source-side brief and verify one common prompt hash.
7. Keep alternative readings in the candidate-review apparatus, not automatically in the FLT reading text.
8. Require the human editor to choose the exact reading text and notes.
9. When a dynamic rendering depends on a note for transparency, audit the reading text and note together.
10. Continue through listener diagnosis, source-aware smoothing, exact-wording approval, and semantic audit.

## Enforced integrity rules

The harness blocks drafting when:

- the Engine 2.2 brief is absent or incomplete;
- any verse is absent from the proposition map;
- a contextual expression lacks source expression, function, sense, discourse evidence, text guidance, note guidance, or risk analysis;
- an unresolved expression lacks a viable alternative and a human-decision flag;
- a note-dependent translation lacks a required reader-note flag;
- prior FLT wording, prior candidates, the editor benchmark, or comparison translations are not attested absent;
- a candidate omits a required sense decision, alternate-reading entry, or reader note;
- a candidate inserts its alternatives into brackets inside the reading text;
- the three provider prompt hashes differ.

## Layered lexical governance

The Contextual Lexical Matrix remains the durable lexical layer. Engine 2.2 adds scoped passage layers:

| Layer | Function |
|---|---|
| Lemma entry | Semantic range and standing cautions |
| Sense inventory | Known contextual functions |
| Passage decision | Primary sense for this occurrence |
| Discourse rationale | How the argument supports the decision |
| Translation precedent | Relevant prior decisions within their scope |
| Alignment record | Greek-to-English accountability |
| Exception alert | Why the ordinary rendering must not govern here |

The engine retrieves only relevant material. It does not place every occurrence of a lemma into every drafting prompt.

## Bracketed alternatives

Candidates may offer a concise alternative when the source brief marks more than one reading viable. These alternatives belong in the review apparatus by default, similar in purpose to an Amplified-style visibility aid but without crowding the reading text. The human editor may exceptionally retain a bracketed alternative in the final text.

## Benchmark protection

The pre–Engine 2.2 Philippians 3:1–11 editor draft is preserved as evaluation-only evidence. It is excluded from the source packet, worker prompt, and common-prompt hash. It may be compared only after the new candidates have been recorded.
