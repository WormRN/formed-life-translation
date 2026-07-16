# FLT Version 2.0 — Downstream Requirements

This file preserves implementation questions deliberately left out of the Constitution. They must be resolved in the Style Guide, Copyright Independence Policy, Translation Packet, agent rules, and system architecture before the translation harness is considered complete.

## 1. Define “Significant Meaning”

The Style Guide and warrant-checker rules must define when a meaning is significant enough to require explicit warrant review.

At minimum, significance includes effects on:

- the passage’s stated or implied proposition;
- who acts, receives, speaks, believes, commands, or responds;
- logical relationships such as cause, purpose, result, condition, contrast, or inference;
- scope, degree, time, agency, or certainty;
- theological content or doctrinal implication;
- tone, emphasis, emotional force, metaphor, or rhetorical effect;
- an ambiguity that could alter responsible interpretation;
- cohesion within the sentence, paragraph, or larger argument.

Minor English adjustments that do not affect these features need not receive separate semantic justification.

## 2. Map Review Lenses to the Workflow

The Translation Packet and agent rules must define:

- which constitutional review lenses are combined;
- which require separate reviewers;
- which findings are advisory;
- which findings block approval;
- which disputes must be escalated to the human editor.

No agent-rule author should have to infer the review pipeline independently.

## 3. Protect Blind Drafting from Precedent Contamination

Prior FLT wording may be supplied to drafting agents as precedent only after it has passed the required copyright-similarity review.

Unreviewed FLT drafts must not be treated as clean inputs, because they may carry unlogged overlap from copyrighted translations.

## 4. Define Clarification Versus Commentary

The Style Guide must distinguish legitimate translation clarification from commentary.

The governing principle is:

> Clarification belongs in the reading text when it is necessary to communicate meaning already carried implicitly or explicitly by the Greek. It becomes commentary when it adds explanation, background, application, doctrinal synthesis, or interpretive detail beyond what the sentence itself communicates.

This boundary should be taught through examples and semantic tests rather than a rigid word-count or clause-count limit.

## 5. Define Oral-Review Procedures

Oral review should not rely on an AI agent merely asserting that a sentence “sounds natural.”

The workflow should include:

- human reading aloud;
- text-to-speech playback where practical;
- punctuation-free listening tests;
- pronoun and referent checks;
- garden-path detection;
- cadence and emphasis review;
- flags for difficult sound clusters and overloaded clauses.

Human listening remains the controlling test.

## 6. Prevent Context-Window Dilution

The full Constitution, Style Guide, Lexical Matrix, and Copyright Policy should not be pasted into every worker prompt.

The architecture should instead provide:

- concise role-specific agent instructions;
- only the Style Guide rules relevant to the assigned unit;
- only the lexical entries relevant to terms present in the unit;
- only the checker criteria needed for the assigned review lens;
- sufficient governing context for the boss or decision-brief agent to resolve cross-rule disputes.

The Constitution governs the system. Translation Packets operationalize only the relevant portion for each task.

---

These requirements are binding design obligations for the remaining Version 2.0 documents and future harness implementation.