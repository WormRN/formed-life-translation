# Formed Life Translation

## Translation Packet Template — Version 2.0

**Project:** Formed Life Translation  
**Document type:** Controlled work order for translation, review, adjudication, and logging  
**Governing authority:** Subordinate to the FLT Constitution v2.0, standalone policies, Style Guide v2.0, and Contextual Lexical Matrix v2.0  
**Supersedes:** Translation Packet Template v1.0 and the operational portions of the Process Addendum v1.0

> **The packet gives each agent only the source material, governing rules, and task-specific context needed for its assigned role. It preserves blind drafting, separates drafting from checking, makes every significant claim auditable, and keeps final authority with the human editor.**

---

# 0. Purpose and Boundaries

A Translation Packet is the standard controlled input for one FLT translation unit.

A packet may govern:

- a paragraph;
- a discourse unit;
- a chapter section;
- a whole chapter for literary review;
- changed lines only;
- a special lexical, textual, theological, or copyright review.

The packet is not:

- the final translation file;
- a substitute for the Constitution or Style Guide;
- a place to paste every governing document;
- a composite of modern English translations;
- an autonomous decision-maker;
- a license for agents to reopen settled decisions outside the task scope.

The packet exists to ensure that every participant works from:

- the same Greek source;
- the same unit boundaries;
- the same approved contextual information;
- the same scoped lexical precedents;
- the same known risks;
- the same output schema;
- the same escalation rules.

---

# 1. Packet Classes

Each packet must declare one class.

## 1.1 Drafting Packet

Used for blind independent first drafts.

A Drafting Packet contains:

- Greek source text;
- approved morphology and neutral source-side lexical data;
- only the minimum literary context required to identify referents, boundaries, and discourse location;
- relevant Style Guide rules;
- relevant Matrix entries, limited to approved scope and unresolved cautions;
- approved FLT precedents that have passed similarity review;
- identical common-goal drafting instructions and a neutral candidate identifier.

Draft independence is not merely separation from other English drafts. It also requires control of shared interpretive framing.

The three workers may share:

- the same Greek text;
- morphology;
- lexically established semantic range;
- textual-variant data;
- neutral historical facts;
- unit boundaries and immediate context.

They should not ordinarily receive pre-decided interpretive conclusions about:

- the preferred contextual sense;
- the discourse solution;
- the correct ambiguity resolution;
- the likely theological conclusion;
- the expected best rendering.

When an interpretive note must be supplied because the task cannot be executed responsibly without it, the note must be labeled as `probable`, `possible`, or `disputed` and its common-source effect must be disclosed in later cross-critique.

It must not contain:

- copyrighted comparison translations;
- notes revealing distinctive comparison wording;
- a preferred English draft;
- another worker’s draft;
- unreviewed FLT wording;
- copyright similarity findings.

## 1.2 Self-Critique Packet

Used immediately after one worker produces a draft.

It contains:

- the worker’s own draft;
- the same source-side material used for drafting;
- the common self-critique instructions;
- no other worker drafts;
- no comparison translations.

The purpose is to expose weaknesses before cross-comparison, not to let the worker rewrite endlessly.

## 1.3 Cross-Critique Packet

Used after all independent drafts and self-critiques are recorded.

It may contain:

- all independent drafts;
- all self-critiques;
- Greek source and context;
- relevant governing rules;
- relevant Matrix entries.

It must still exclude copyrighted comparison translations.

## 1.4 Checker Packet

Used for a focused review lens.

Each checker receives only the material needed for its assigned lens, plus sufficient context to avoid atomized verse review.

Context is sufficient when it contains every antecedent, referent, connector relationship, quotation boundary, repetition anchor, and discourse movement on which the unit’s warranted meaning depends. Context beyond that threshold should be omitted unless the checker’s lens specifically requires it.

Examples:

- Warrant Checker;
- Communication and Readability Checker;
- Discourse and Cohesion Checker;
- Theological-Risk Checker;
- Ambiguity and Scope Checker;
- Matrix and Precedent Checker;
- Copyright-Independence Checker.

## 1.5 Decision-Brief Packet

Used by the synthesis or boss agent after drafting and checking.

It may contain:

- the source unit;
- independent drafts;
- self-critiques;
- cross-critiques;
- checker reports;
- relevant governing excerpts;
- relevant Matrix entries;
- prior binding decisions;
- unresolved questions.

It produces alternatives and evidence for the human editor. It does not finalize the translation.

The decision brief may be assembled in two stages:

1. provisional synthesis identifies the viable candidate or candidates after non-copyright checks;
2. the Copyright-Independence Checker reviews every candidate still eligible for recommendation;
3. the final decision brief incorporates those copyright findings before human adjudication.

## 1.6 Changed-Lines Packet

Used when only a limited portion of an otherwise stable unit changed.

It contains:

- the changed lines;
- enough surrounding Greek and English context to judge them;
- the reason for change;
- applicable prior decisions;
- a narrow check for meaning, ambiguity, precedent, oral clarity, and new risk.

It must not reopen the entire passage unless the change creates a broader conflict.

## 1.7 Chapter Literary Packet

Used after unit-level decisions to test the full chapter.

It focuses on:

- paragraph movement;
- voice;
- repetition;
- thematic links;
- emotional progression;
- oral flow;
- consistency of names, titles, and recurring terms;
- abrupt shifts introduced by local editing.

It does not automatically reopen every verse-level decision.

## 1.8 Oral-English Smoothing Packet

**Purpose:** Diagnose one-hearing friction in a provisional human synthesis, propose bounded source-aware repairs, and preserve a complete change record before exact-candidate audit.

**English-only stage may see:**

- provisional selected English;
- target-reader profile;
- diagnostic categories.

**English-only stage may not see:**

- Greek or parsed data;
- source notes or Matrix entries;
- comparison translations;
- prior model reasoning.

**Source-aware stage may see:**

- provisional selected English;
- anonymous listener reports;
- Greek and parsed source data;
- governing rules;
- relevant Matrix entries and scoped precedents.

**Required outputs:**

- listener-only diagnosis;
- complete proposed verse list;
- exact change log;
- constitutional smoothing checks;
- remaining risks;
- human decision brief.

The packet must declare that no proposal changes FLT wording without exact human approval.

---

# 2. Core Metadata

Every packet begins with this block.

```yaml
packet_id:
packet_version:
packet_class:
project: Formed Life Translation
book:
chapter:
unit_reference:
unit_description:
source_text: SBLGNT
source_file:
source_commit:
prepared_date:
prepared_by:
workflow_stage:
current_status:
human_editor:
comparison_blind: true | false
contains_copyrighted_comparison_text: true | false
relevant_decision_log_refs:
parent_packet_id:
```

## 2.1 Packet ID Convention

Recommended form:

```text
FLT-[BOOK]-[CHAPTER]-[UNIT]-[STAGE]-[REV]
```

Example:

```text
FLT-PHP-01-01_02-DRAFT-R01
```

## 2.2 Required Integrity Checks

Before execution, the harness confirms:

```yaml
integrity_checks:
  greek_source_present: true
  unit_boundaries_present: true
  common_goal_instructions_present: true
  output_schema_present: true
  relevant_matrix_entries_present_or_declared_none: true
  relevant_precedents_present_or_declared_none: true
  copyrighted_comparison_text_absent_for_blind_stage: true
  unreviewed_flt_text_absent_for_blind_stage: true
```

A failed integrity check blocks the packet from running.

---

# 3. Unit Context

Provide enough context to translate the unit as part of a discourse, but not so much that the agent loses focus.

```md
## Book Context

[Short description of author, audience, situation, genre, and major purpose.]

## Immediate Context

[What comes immediately before and after the unit.]

## Unit Function

[What this unit does in the paragraph, argument, story, or exhortation.]

## Tone and Rhetorical Force

[Affectionate, confrontational, urgent, ironic, lamenting, celebratory, etc.]

## Discourse Movement

[Proposition sequence, scene movement, argument steps, or rhetorical progression.]

## Target-Reader Risks

[Church vocabulary, long argument, unclear referents, cultural assumptions, difficult imagery, etc.]
```

Context claims must be marked when uncertain:

```text
established | probable | possible | disputed
```

Do not present interpretive judgments as settled facts merely to simplify the packet.

---

# 4. Source Material

## 4.1 Greek Text

```md
## Greek Source

[Insert exact SBLGNT text for the active unit.]
```

Include surrounding Greek only when needed for:

- pronoun reference;
- discourse flow;
- lexical repetition;
- argument structure;
- quotation boundaries;
- ambiguity.

## 4.2 Parsed Data

```md
## Parsed Data

| Token | Lemma | Morphology | Basic lexical range | Source |
|---|---|---|---|---|
```

Parsed data may assist the agent but does not override contextual interpretation.

## 4.3 Source-Side Notes

Source-side notes must distinguish neutral observation from interpretive judgment.

Include only notes relevant to the task:

```md
## Source-Side Notes

- Syntax:
- Discourse:
- Lexical:
- Textual:
- Historical/cultural:
- OT quotation/allusion:
```

Label each note:

```text
neutral observation | probable interpretation | possible interpretation | disputed interpretation
```

Blind workers normally receive neutral observations. Interpretive notes are withheld unless necessary, and any shared interpretive framing must be reported to cross-reviewers as a possible common-source bias.

Do not include another English translation as a “gloss.”

## 4.4 Variant Alerts

Use this scale:

| Level | Meaning | Required handling |
|---|---|---|
| 0 | Orthographic or no translation effect | omit |
| 1 | Negligible English effect | silent source log |
| 2 | Minor possible English effect | brief packet note |
| 3 | Meaningful translation decision | checker review |
| 4 | Reader-visible, theological, or familiar-version difference | human decision and likely note |
| 5 | Major passage-level issue | special review packet |

Format:

```yaml
variant_alert:
  verse:
  level:
  sblgnt_reading:
  alternate_reading:
  evidence_summary:
  translation_effect:
  reader_effect:
  required_action:
```

No agent may silently replace the SBLGNT reading with a familiar alternative.

---

# 5. Governing Content Contract

The full Constitution, Style Guide, Copyright Policy, and Matrix must not be pasted into every packet.

A well-formed packet contains only the governing excerpts needed for its class and role. The selection mechanism belongs to the assembler and architecture specifications; this section defines the required packet contents.

## 5.1 Governing Core

Every role receives this irreducible core:

```md
1. Translate the Greek meaning into clear, natural, dignified English for a religion-naive adult or older adolescent reading near the sixth-grade level.
2. Dynamic expression is the normal posture. Departure from Greek form needs no defense; every significant meaning expressed in English does.
3. Pass both tests:
   - Communication Test: Does the wording communicate clearly, naturally, coherently, and appropriately to the target reader?
   - Warrant Test: Can every significant meaning expressed in English be responsibly defended from the Greek and its context?
4. Check both failure directions:
   - too loose;
   - too literal.
5. Preserve or recreate form that carries meaning.
6. Do not add commentary, unsupported logic, motive, theology, or certainty.
7. The human editor makes every final decision.
```

## 5.2 Task-Specific Governing Rules

The assembler adds only sections relevant to the task and review lens.

All three blind drafting candidates receive the same drafting rules, source packet, known issues, Matrix excerpts, precedents, output schema, and constitutional mission. Provider or candidate identity must never alter the translation goal.

Examples:

- all drafting candidates: dynamic default, reading level, clarification boundary, theological vocabulary, form preservation;
- Warrant Checker: significant meaning, connectors, active/passive, ambiguity, clarification boundary;
- Communication Checker: reading level, sentence flow, oral comprehension, pronouns, paragraph cohesion;
- Matrix Checker: lexical governance and scoped precedents;
- Copyright Checker: full applicable Copyright Independence Policy rules.

## 5.3 Matrix Retrieval

A **weighted lemma** is any lemma that meets at least one of these conditions:

- it has an existing Matrix entry;
- it carries elevated theological, cultural, discourse, or ambiguity risk in the active context;
- its rendering may create a recurring cross-passage precedent;
- it is part of a lemma family already governed by the Matrix;
- a source analyst or human editor flags it for lexical governance.

For every weighted lemma in the unit, include:

- lemma and identifiers;
- relevant possible senses;
- sense status;
- approved scope;
- approved renderings;
- restricted renderings;
- in-text clarification boundary;
- literary links;
- unresolved questions;
- evidence and confidence.

If a plausibly weighted lemma has no Matrix entry, the packet must create a `matrix_entry_missing` issue. The agent applies the general Style Guide, proposes a provisional contextual rendering, and escalates the occurrence for possible stub creation. Absence from the Matrix is not permission to ignore a high-impact lexical decision.

Do not include unrelated senses merely because they belong to the same lemma.

## 5.4 Precedent Retrieval

A precedent may enter a packet only when:

- it has a Decision Log reference;
- its scope overlaps the active context;
- its wording has passed required copyright similarity review;
- it has not been reopened or superseded.

Format:

```yaml
precedent:
  decision_log_ref:
  issue:
  approved_wording_or_rule:
  scope:
  exclusions:
  status:
  copyright_review_status:
```

A precedent outside its scope is evidence, not a binding rule.

---

# 6. Known Issues and Escalation Flags

Known Issues are populated from source analysis, unresolved issues inherited from a parent packet, applicable Decision Log entries, checker findings from an earlier cycle, and human-editor instructions.

Resolved issues do not carry forward as open issues. Their governing outcome appears as precedent when appropriate.

The Known Issues list is non-exhaustive. Absence of a named risk never licenses unsupported expansion, hidden literalism, or any other unflagged defect.

```md
## Known Issues

### Lexical
-

### Syntax
-

### Discourse / Cohesion
-

### Ambiguity / Scope
-

### Theological Risk
-

### Readability / Oral Flow
-

### Possible Too-Loose Risk
-

### Possible Too-Literal Risk
-

### Copyright / Contamination Risk
-

### Footnote or Study-Layer Need
-

### Human-Only Decisions
-
```

Each issue receives:

```yaml
issue_id:
issue_type:
description:
severity: ordinary | elevated | high | critical
owner:
blocking: true | false
required_output:
```

Severity describes the importance of the underlying issue before review. Checker verdict describes the disposition after review.

Crosswalk:

- `ordinary` or `elevated` may receive any verdict;
- `high` may not close on `PASS WITH NOTE` unless the checker explains why no significant risk remains;
- `critical` must end as `PASS` with explicit evidence or `HUMAN DECISION`; it may not be cleared by silence;
- any severity marked `blocking: true` stops the workflow until the required verdict or human action is recorded.

## 6.1 Automatic Human Escalation

The packet must mark an issue human-only when it involves:

- a critical theological fork;
- a meaningful unresolved ambiguity;
- a textual variant level 4 or 5;
- a Matrix stub in a high-stakes context;
- conflict between governing documents;
- conflict between approved precedents;
- a proposed exception to an approved Matrix sense;
- a likely copyright red-risk finding;
- a change to translation philosophy or policy;
- a decision that would create broad cross-book precedent.

Agents may analyze these issues but may not settle them.

---

# 7. Independent Common-Goal Drafting

The first three drafts are produced independently and blindly.

No worker sees another worker’s draft, the current human-edited FLT wording, or comparison translations.

## 7.1 One Governing Mission

Candidate A, Candidate B, and Candidate C receive this identical mission:

> Produce one independent FLT candidate that communicates the full meaning, logic, tone, discourse movement, and theological force of the Greek in clear, natural, dignified English for a religion-naive adult or older adolescent reading near the sixth-grade level. Dynamic expression is the normal posture. Preserve meaningful form, ambiguity, and theological force; do not add unsupported commentary or make the English more expressive than the Greek.

The candidates differ only because independent models may reason and write differently. They are not assigned readability, Greek-fidelity, or balanced missions.

Current provider mapping:

- Candidate A — Claude Sonnet
- Candidate B — GPT-5.6 Sol
- Candidate C — Gemini Pro

Provider mapping may change only through an explicit process decision. A provider change never changes the constitutional mission.

## 7.2 Common Priorities

Every candidate applies the same priorities:

1. pass the Warrant Test and Communication Test together;
2. communicate the complete warranted meaning;
3. use clear, natural, mature English near the sixth-grade level;
4. preserve or recreate meaningful form, tone, rhetoric, ambiguity, and discourse movement;
5. remain free in form and disciplined in meaning;
6. preserve scoped lexical and editorial precedents without seeing the current unit’s human wording;
7. identify uncertainties for human judgment.

No candidate receives extra credit for Greek-shaped English, and no candidate may gain readability by losing or adding meaning.

## 7.3 Identical Inputs and Prompt Verification

The harness must verify before model calls that all three candidates receive:

- the same Greek and source-side data;
- the same unit and context;
- the same governing excerpts;
- the same Matrix entries and scoped precedents;
- the same known issues;
- the same required output schema;
- the same mission and priorities.

The exact common drafting prompt must be hashed. The run is invalid unless the recorded common-prompt hash is identical for A, B, and C. Candidate or provider identity belongs in provenance metadata, not in the mission text.

Legacy labels such as `readability_worker`, `greek_fidelity_worker`, and `balanced_worker` may remain temporarily in machine configuration for backward compatibility, but they must resolve to the identical common mission and must not inject different priorities, risks, or instructions.

## 7.4 Required Common Output

```yaml
candidate_id: A | B | C
proposed_rendering:
verse_renderings:
paragraphing:
sense_selections:
significant_meanings_expressed:
dynamic_moves:
meaningful_forms_preserved_or_recreated:
possible_too_loose_risks:
possible_too_literal_risks:
footnotes_suggested:
uncertainties:
human_questions:
confidence_by_issue:
```

Each candidate must identify every place where its rendering expands one Greek word or compact construction beyond one English phrase or dependent clause. Such expansion is not automatically wrong, but it must be flagged for independent warrant review.

# 8. Self-Critique

Each worker critiques only its own recorded draft.

The worker must not replace the whole draft unless it identifies a concrete failure.

Required questions:

```md
1. Where may my draft add meaning not warranted by the Greek?
2. Where may it lose, weaken, narrow, or overstate meaning?
3. Where may it be too literal?
4. Where may it be too expansive?
5. Which connector, actor, referent, motive, or theological implication did I make explicit?
6. Which metaphors, repetitions, ambiguities, and rhetorical effects did I preserve or alter?
7. Which phrase is least natural aloud?
8. Which phrase is most likely to confuse a religion-naive reader?
9. Which decision needs independent checking?
10. Which wording is already strong and should not be rewritten without reason?
```

Output:

```yaml
role:
draft_id:
must_fix:
possible_improvements:
defended_choices:
warrant_questions:
communication_questions:
recommended_revisions_only:
```

Self-critique findings are evidence, not certification.

---

# 9. Cross-Critique

After all drafts and self-critiques are recorded, each worker or dedicated cross-reviewer evaluates the alternatives.

Drafts are presented anonymously as Draft A, Draft B, and Draft C. Cross-reviewers must not be told which drafting role produced each candidate until their reports are recorded.

Cross-critique must:

- compare meanings, not merely wording;
- identify unique strengths;
- identify shared blind spots;
- identify where all models may be repeating the same bias;
- avoid selecting a winner merely by majority agreement;
- avoid composing a final hybrid sentence unless explicitly assigned;
- identify any interpretive framing shared by all workers that may have produced artificial convergence.

Required output:

```yaml
reviewer:
drafts_reviewed:
best_supported_elements_by_draft:
meaning_at_risk_by_draft:
clarity_at_risk_by_draft:
shared_biases:
incompatible_interpretations:
promising_combinations:
questions_for_checkers:
```

---

# 10. Focused Checkers

Checker reports must distinguish:

Checker ownership is primary rather than exclusive:

- the Warrant Checker decides whether expressed meaning is supported by the Greek and context;
- the Matrix Checker decides whether lexical governance, sense status, scope, and precedent were followed;
- the Theological-Risk Checker identifies doctrinal consequences, distortions, or system-driven bias.

A checker may flag an issue outside its primary ownership but must route it to the owning checker rather than independently settle it. Conflicting checker findings proceed to the Decision-Brief Agent and, when significant, to the human editor.

```text
PASS | PASS WITH NOTE | REVISE | BLOCK | HUMAN DECISION
```

A checker never finalizes wording.

## 10.1 Warrant Checker

Checks whether every significant meaning in each candidate is defensible.

Owns:

- propositions;
- agency;
- scope;
- logical relationships;
- supplied information;
- ambiguity;
- lexical-sense warrant;
- clarification versus commentary;
- overstatement and understatement.

Required output:

```yaml
candidate_id:
verdict:
significant_meaning_findings:
unsupported_additions:
meaning_losses:
scope_or_agency_shifts:
connector_findings:
ambiguity_findings:
clarification_findings:
required_revisions:
human_decisions:
```

## 10.2 Communication and Readability Checker

Checks first-read comprehension and adult naturalness.

Owns:

- sentence flow;
- religion-naive vocabulary;
- referent clarity;
- clause overload;
- hidden literalism;
- choppiness;
- adult dignity;
- likely oral difficulty.

This checker flags but does not certify oral quality. Human listening remains required.

Required output:

```yaml
candidate_id:
verdict:
first_read_findings:
religion_naive_vocabulary:
pronoun_and_referent_findings:
sentence_and_clause_findings:
hidden_literalism:
choppiness_or_over_simplification:
oral_flow_flags:
recommended_revisions:
```

## 10.3 Discourse and Cohesion Checker

Checks the paragraph and larger unit.

Owns:

- discourse movement;
- paragraphing;
- thematic links;
- repetition;
- transitions;
- argument structure;
- emotional progression;
- local edits that break larger flow.

Required output:

```yaml
candidate_id:
verdict:
paragraph_function:
discourse_map:
cohesion_strengths:
broken_links:
repetition_findings:
transition_findings:
argument_or_scene_findings:
recommended_revisions:
```

## 10.4 Theological-Risk Checker

Checks for theological distortion without enforcing one preferred theological system beyond the governing FLT framework.

Owns:

- doctrinal additions;
- doctrinal losses;
- contested theological terms;
- lexical decisions with broad doctrinal effects;
- harmonization;
- inherited church readings presented as certain;
- significant ambiguity.

Required output:

```yaml
candidate_id:
verdict:
theological_claims_preserved:
possible_distortions:
contested_terms:
ambiguities:
tradition_bias_risks:
human_only_questions:
```

## 10.5 Matrix and Precedent Checker

Checks whether the candidate:

- selected a defensible contextual sense;
- stayed within approved scope;
- used restricted wording only when permitted;
- preserved required literary links;
- followed binding precedent;
- avoided extending a precedent beyond scope;
- escalated stubs and reopened entries correctly.

Required output:

```yaml
candidate_id:
verdict:
lemma_findings:
sense_selection_findings:
scope_findings:
precedent_findings:
restricted_rendering_findings:
required_escalations:
```

## 10.6 Ambiguity and Scope Checker

May be combined with the Warrant Checker in ordinary units, but must be separate for high-risk passages.

Owns:

- singular/plural scope;
- generic versus direct address;
- pronoun referents;
- genitive ambiguity;
- temporal and modal force;
- divine passive;
- actor and recipient;
- deliberate ambiguity.

Required output:

```yaml
candidate_id:
verdict:
ambiguities_present:
ambiguities_preserved:
ambiguities_silently_resolved:
scope_changes:
person_number_changes:
agency_changes:
recommended_actions:
```

## 10.7 Copyright-Independence Checker

Runs only after the independent FLT candidate has been recorded.

This checker may receive the approved comparison set under the Copyright Independence Policy.

Owns:

- exact overlap;
- distinctive phrase overlap;
- structural overlap;
- interpretive overlap;
- shared clarifications;
- sustained similarity;
- comparison concentration;
- independence documentation.

Required output:

```yaml
candidate_id:
draft_commit_or_record:
comparison_set:
findings:
risk_category: green | yellow | orange | red
distinctive_matches:
structural_matches:
interpretive_matches:
sustained_similarity:
independent_path_assessment:
recommended_action:
human_review_required:
consultation_log_entry:
```

The checker must not rewrite solely to reduce overlap.

All checker findings must be independently derived from the Greek, candidate, and governing rules. A checker must not treat a worker’s self-reported risks or clarifications as complete.

---

# 10.8 Targeted Revision Agent

A designated Revision Agent may revise a candidate only after checker findings identify concrete defects.

It receives:

- the recorded candidate;
- the specific findings to address;
- the Greek and necessary context;
- relevant governing rules and Matrix entries;
- the instruction not to disturb unaffected wording without reason.

It returns changed lines, reasons, and any new risks introduced.

```yaml
source_candidate_id:
revision_cycle:
findings_addressed:
changed_lines:
unchanged_lines_preserved:
warrant_effect:
communication_effect:
new_risks:
unresolved_findings:
```

A candidate may undergo no more than two machine revision cycles for the same unresolved issue set. If a required checker still returns `REVISE`, `BLOCK`, or `HUMAN DECISION` after the second cycle, the workflow stops for human adjudication. New evidence may start a new cycle only with human authorization.

---

# 11. Review-Lens-to-Gate Mapping

## 11.1 Blocking Gates

A candidate cannot proceed to human finalization when:

- the Warrant Checker returns `BLOCK`;
- any required checker returns `HUMAN DECISION` on an unresolved issue;
- the Matrix Checker identifies a stub, reopened sense, missing entry, or out-of-scope precedent requiring human judgment;
- a required Matrix or precedent conflict remains unresolved;
- a critical ambiguity is silently resolved;
- a level 4 or 5 variant lacks human decision;
- the Copyright Checker returns red;
- a human-only issue has been settled by an agent;
- source or packet integrity is compromised.

## 11.2 Required Revision Gates

A candidate returns for revision when:

- Warrant Checker returns `REVISE`;
- Communication Checker identifies a first-read failure;
- Discourse Checker identifies a broken argument or paragraph movement;
- Theological Checker identifies likely distortion;
- Copyright Checker returns orange unless the human editor explicitly retains and documents the wording.

## 11.3 Advisory Findings

These do not automatically block:

- optional polish;
- minor stylistic preference;
- non-significant lexical variation;
- optional footnote;
- sentence-length review flag with no actual comprehension problem;
- isolated green copyright overlap.

## 11.4 Human Decision Findings

These proceed to the decision brief rather than automatic revision, but they remain blocking until the human editor records a decision.

---

# 12. Decision-Brief Agent

The Decision-Brief Agent synthesizes evidence for the human editor.

When more than one candidate passes both the Communication Test and Warrant Test, both are considered equally faithful for synthesis purposes. Literal resemblance to Greek earns no additional faithfulness credit. The recommended base candidate must be the clearer or more natural dynamic rendering unless meaningful form, scope, ambiguity, or another warranted feature makes the alternative superior.

The Decision-Brief Agent must positively explain why its recommendation is preferable. It may not select a candidate merely because it accumulated fewer flags.

It must not:

- vote by model majority;
- assume the most literal candidate is safest;
- assume the most readable candidate is best;
- hide disagreements;
- create false consensus;
- silently settle human-only issues;
- introduce new comparison wording.

## 12.1 Required Decision Brief

```md
# Decision Brief

## Unit
[reference]

## Greek Communication Summary
[propositions, logic, tone, force, meaningful form]

## Candidate Overview
### Candidate A
- strengths:
- weaknesses:
- checker verdicts:

### Candidate B
- strengths:
- weaknesses:
- checker verdicts:

### Candidate C
- strengths:
- weaknesses:
- checker verdicts:

## Points of Agreement

## Real Disputes

## Significant Meaning at Stake

## Target-Reader Consequences

## Matrix and Precedent Consequences

## Copyright Findings

## Recommended Base Candidate
[one candidate, with reasons]

## Recommended Revisions
[changed lines only where possible]

## Alternatives for Human Decision
1.
2.
3.

## Human-Only Questions

## Proposed Footnotes

## Proposed Decision Log Entries

## Confidence and Residual Risk
```

The recommendation must identify why it passes both constitutional tests.

---

# 13. Human Editorial Decision

The human editor may:

- adopt a candidate;
- combine elements;
- revise wording;
- request another targeted check;
- reopen a precedent;
- reject all candidates;
- defer a decision;
- authorize a footnote;
- establish a new Matrix precedent;
- require changed-lines review;
- mark the unit provisionally complete.

Required record:

```yaml
human_decision:
  selected_wording:
  basis:
  rejected_options:
  unresolved_items:
  footnotes:
  matrix_updates:
  decision_log_updates:
  copyright_action:
  further_checks:
  status:
```

No agent output becomes FLT text until this decision is recorded.

---

# 13A. Oral-English Smoothing Gate

A human synthesis is provisional until this gate is complete.

## 13A.1 Listener-Only Diagnosis

Three independent listeners receive only the selected English. They identify concrete one-hearing friction but do not rewrite the text.

Required output:

```yaml
listener_diagnosis:
  verse_observations:
    - reference:
      current_wording:
      flags:
      listener_effect:
      severity:
  passage_observations:
  one_hearing_summary:
```

## 13A.2 Source-Aware Proposals

Source-aware smoothers receive the provisional English, anonymous listener diagnoses, Greek source data, governing rules, and relevant Matrix entries. No comparison translation may enter this stage.

Each proposal must provide:

```yaml
smoothing_proposal:
  proposed_verse_renderings:
  changes:
    - reference:
      current_wording:
      oral_problem:
      proposed_wording:
      form_change:
      meaning_risk:
      source_warrant:
      logic_and_rhetoric_check:
  constitutional_checks:
    - check:
      outcome: PASS | WARN | BLOCK
      rationale:
  remaining_risks:
  recommendation:
```

The harness must reject:

- any changed verse missing from the change log;
- any change-log entry that does not match the selected source wording;
- any proposed wording that does not match the complete proposed verse list;
- missing or duplicated constitutional checks;
- any claim that a machine proposal has become final text.

## 13A.3 Human Approval and Audit Handoff

The human editor may accept, combine, revise, or reject smoothing proposals. The exact approved wording is then sealed. The semantic-floor audit must evaluate that exact wording—not the pre-smoothing synthesis and not an auditor's repair.

A BLOCK in semantic propositions, logic, rhetoric, ambiguity, agency and force, key-term continuity, traceability, or back-translation prevents automatic advancement and returns the issue to the human editor.

---

# 14. Changed-Lines Review

Use this process when a human or stylist alters only part of a stable passage.

Required checks:

1. Does the change preserve the Greek meaning?
2. Does it alter agency, scope, logic, tone, ambiguity, or theological force?
3. Does it conflict with the Matrix or Decision Log?
4. Does it create new copyright risk?
5. Does it improve first-read and oral clarity?
6. Does it break paragraph flow or repetition?
7. Does it require a new footnote?

Output:

```yaml
changed_lines:
reason_for_change:
warrant_result:
communication_result:
precedent_result:
copyright_result:
new_risks:
recommendation:
```

Do not reopen unaffected lines without a concrete reason.

---

# 15. Chapter-Level Read-Aloud and Literary Review

After unit decisions are assembled, review the full chapter.

Required review:

- paragraph movement;
- consistent voice;
- recurring-term coherence;
- deliberate repetition;
- argument continuity;
- transitions;
- emotional force;
- stiffness;
- breath and cadence;
- pronoun clarity;
- abrupt register changes;
- footnote load;
- reader fatigue.

Human read-aloud is required before chapter finalization.

TTS may supplement but not replace human listening.

Chapter-level corrections return through changed-lines review unless they expose a passage-level failure.

---

# 16. Stopping Rule

A unit may be marked provisionally complete when:

1. no major Greek meaning is knowingly lost or added;
2. both constitutional tests pass;
3. blocking checker findings are resolved;
4. critical ambiguities and variants have human decisions;
5. the target reader can understand the main communication;
6. major decisions are logged;
7. applicable Matrix updates are recorded;
8. copyright review status is acceptable for the current stage;
9. remaining issues are explicitly deferred rather than forgotten.

The goal is defensible progress, not exhausted perfection.

---

# 17. Required Unit Output Bundle

Each completed unit must preserve:

- the controlling packet and metadata;
- three independent drafts;
- self-critiques;
- anonymous cross-critiques;
- focused checker reports;
- revision records;
- copyright consultation record;
- decision brief;
- human decision;
- applicable Decision Log and Matrix update references.

The repository path and folder layout are defined in the system architecture and may change without revising this packet contract.

---

# 18. Minimal Drafting Packet

Use this compressed form for an ordinary worker call.

```md
# FLT Drafting Task

## Candidate
[A | B | C — identifier only; the mission is identical]

## Unit
[Book, chapter, verses]

## Greek
[Greek text]

## Context
[Immediate context, unit function, tone, discourse movement]

## Relevant Source Notes
[Only necessary syntax, lexical, variant, OT, or historical notes]

## Relevant Matrix Entries
[Only applicable senses, statuses, scope, restrictions, and unresolved items]

## Relevant Precedents
[Only scoped, similarity-cleared precedents]

## Governing Core
1. Dynamic expression is the default.
2. Pass the Communication Test and Warrant Test.
3. Check too loose and too literal.
4. Preserve meaningful form.
5. Clarify source meaning; do not add commentary.
6. Write for a religion-naive adult near sixth-grade reading level.
7. Human editor decides.

## Known Issues
[Issue list]

## Required Output
[Role schema]
```

---

# 19. Minimal Checker Packet

```md
# FLT Checker Task

## Checker Role
[Warrant | Communication | Discourse | Theology | Matrix | Ambiguity | Copyright]

## Unit and Context
[Reference and sufficient context]

## Greek
[Greek text]

## Candidate(s)
[Relevant candidate text]

## Governing Rules for This Lens
[Only needed rules]

## Relevant Matrix / Precedent
[Only needed entries]

## Known Issues
[Issues owned by this checker]

## Verdict Scale
PASS | PASS WITH NOTE | REVISE | BLOCK | HUMAN DECISION

## Required Output
[Checker schema]
```

---

# 20. One-Screen Workflow

1. Assemble a clean source-side packet and validate integrity.
2. Separate neutral shared data from interpretive framing.
3. Retrieve only relevant governing excerpts, Matrix senses, and scoped precedents.
4. Run three blind independent candidates—A, B, and C—under one identical constitutional mission and verify one common prompt hash.
5. Record drafts before comparison.
6. Run self-critiques.
7. Present drafts anonymously and run cross-critiques without copyrighted translations.
8. Run focused non-copyright checkers.
9. Use targeted revision for concrete defects, with no more than two machine revision cycles for the same issue set.
10. Produce provisional synthesis and identify candidates eligible for recommendation.
11. Run copyright comparison on every candidate still eligible for recommendation.
12. Finalize the decision brief with copyright findings included.
13. Human editor creates or selects a provisional exact synthesis.
14. Run the listener-only Oral-English diagnosis.
15. Run source-aware smoothing proposals with a complete change log and constitutional checks.
16. Human editor approves the exact post-smoothing wording.
17. Seal and run the expanded exact-candidate semantic audit.
18. Resolve any BLOCK or human-only finding; never permit a machine to finalize wording.
19. Log decisions and update the Matrix or Style Guide when warranted.
20. Run chapter-level literary and oral review; any wording change returns through changed-lines review, smoothing, and fresh audit.
21. Mark provisionally complete when the stopping rule is met.

---

*End of Translation Packet Template v2.0.*
