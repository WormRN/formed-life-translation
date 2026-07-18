# Formed Life Translation

## Phase 3 — Production Mechanics Test Plan

**Project:** Formed Life Translation (FLT)  
**Phase:** 3  
**Status:** Active  
**Benchmark:** Frozen Philippians 1 v0.2  
**Repository benchmark path:** `pilots/philippians/phase-2/`  
**Purpose:** Validate that the Engine 2.0 translation harness can execute the approved workflow reliably, transparently, and with controlled human workload.

---

## 1. Phase 3 Objective

Phase 3 tests the machinery, not the wording of Philippians 1.

The frozen Philippians 1 v0.2 chapter is the fixed benchmark. The system must process the same source material through the intended production workflow and demonstrate that:

- packets are assembled correctly;
- drafting roles remain properly isolated;
- checker roles receive only permitted information;
- handoffs are complete and structured;
- copyright comparison occurs only after blind drafting;
- revision loops stop at defined limits;
- unresolved matters are escalated rather than guessed;
- provenance is preserved;
- human intervention is limited to meaningful editorial decisions.

Phase 3 does not authorize publication and does not reopen the frozen benchmark.

---

## 2. Governing Principle

> The benchmark is not a target the agents are allowed to imitate. It is an external evaluation standard used after the run.

The active run must begin from:

- SBLGNT Greek;
- approved parsed data;
- applicable Constitution, Style Guide, Matrix, packet rules, and scoped precedents;
- neutral passage context.

The frozen English chapter must be hidden from all drafting and ordinary checking roles.

---

## 3. Success Definition

Phase 3 passes when the harness can complete one full controlled run and produce:

1. valid role-specific packets;
2. three independently generated drafts;
3. self-critiques;
4. anonymized cross-critiques;
5. focused checker reports;
6. one controlled revision candidate;
7. one human decision brief;
8. a chapter-level literary report;
9. a post-draft copyright report;
10. a complete provenance manifest;
11. a measurable human-decision burden;
12. a clear pass, fail, or escalate result for every stage.

A high-quality English draft alone does not constitute a Phase 3 pass.

---

## 4. Fixed Benchmark Inputs

### 4.1 Source input

- SBLGNT Greek text for Philippians 1
- parsed morphology and lemma data
- unit boundaries:
  - 1:1–2
  - 1:3–11
  - 1:12–18
  - 1:19–26
  - 1:27–30

### 4.2 Governing inputs

- Constitution v2.0
- Copyright Independence Policy v2.0
- Style Guide v2.0
- Contextual Lexical Matrix v2.0
- Translation Packet Template v2.0
- Agent Roles and Checker Specifications v2.0
- approved scoped precedents only

### 4.3 Hidden evaluation inputs

The following must not be visible to drafting workers:

- frozen Philippians 1 v0.2 English;
- Phase 2 validation report;
- prior model drafts;
- prior copyright findings;
- copyrighted comparison translations.

These materials may be introduced only at their authorized evaluation stage.

---

## 5. Test Architecture

The Phase 3 test is divided into nine gates.

### Gate 1 — Packet Assembly

**Goal:** Build complete role-specific packets without contaminating blind stages.

**Tests:**

- correct Greek verses included;
- sufficient local and chapter context included;
- applicable Matrix entries included;
- irrelevant Matrix entries excluded;
- approved precedents labeled as governing;
- interpretive conclusions withheld from blind workers;
- copyrighted comparison text absent;
- packet integrity status recorded.

**Pass condition:** Every required field is present and no forbidden field appears.

**Automatic failure:**

- frozen benchmark wording appears;
- copyrighted English wording appears;
- preferred interpretation is presented as neutral source data;
- wrong verse range or missing Greek text.

---

### Gate 2 — Independent Drafting

**Goal:** Generate three genuinely separate drafts.

**Roles:**

- Readability Worker
- Greek-Fidelity Worker
- Balanced Worker

**Tests:**

- each worker receives the same neutral source data;
- no worker sees sibling drafts;
- no worker sees benchmark English;
- each worker returns the required schema;
- major expansions and interpretive moves are disclosed;
- no worker marks its own output final.

**Pass condition:** Three structurally valid, independently derived drafts are produced.

**Failure condition:** Substantial evidence of leaked sibling or benchmark wording, missing rationale fields, or self-certification.

---

### Gate 3 — Self-Critique and Blind Cross-Critique

**Goal:** Test whether critique adds evidence rather than merely preference.

**Tests:**

- each self-critique sees only its own draft;
- cross-critique receives anonymized drafts;
- critiques cite Greek, discourse, lexical, or reader evidence;
- critiques distinguish must-fix defects from optional polish;
- no critique silently rewrites the entire passage.

**Pass condition:** Every substantive criticism identifies a reason and affected wording.

---

### Gate 4 — Focused Checkers

**Required checkers:**

- Warrant Checker
- Communication and Readability Checker
- Discourse and Cohesion Checker
- Theological-Risk Checker
- Matrix and Precedent Checker
- Ambiguity and Scope Checker

**Tests:**

- each checker operates within role boundaries;
- each checker independently derives findings;
- each finding is classified:
  - pass;
  - warning;
  - must revise;
  - human decision;
- checkers do not certify issues outside their scope;
- conflicting checker findings are preserved rather than silently harmonized.

**Pass condition:** All required checker reports are complete and machine-readable.

---

### Gate 5 — Controlled Revision

**Goal:** Produce a revision that responds only to substantiated findings.

**Tests:**

- every change links to a checker finding;
- unchanged wording remains unchanged unless a documented reason exists;
- revision does not introduce new unsupported interpretation;
- revision agent discloses unresolved conflicts;
- revision loop count is recorded.

**Loop limit:** Maximum two controlled revision cycles before human escalation.

**Pass condition:** Revised candidate resolves all must-fix findings or explicitly escalates them.

---

### Gate 6 — Human Decision Brief

**Goal:** Reduce human work to real decisions.

**Required contents:**

- candidate text with verse numbers;
- must-fix issues;
- unresolved alternatives;
- Greek evidence;
- readability implications;
- theological implications;
- Matrix or precedent implications;
- recommended option;
- confidence;
- exact question for the human editor.

**Human-load target:**

- no more than 20 percent of verses should require substantive reconstruction;
- ordinary polish should not be escalated;
- every escalation should be answerable without rebuilding the packet manually.

This target is provisional and will be adjusted from test evidence.

---

### Gate 7 — Chapter Literary and Oral Review

**Goal:** Confirm that the assembled chapter sounds like one coherent letter.

**Tests:**

- paragraph movement;
- participant continuity;
- rhetorical repetition;
- sentence rhythm;
- oral breath length;
- emotional tone;
- transitions between units;
- consistency of recurring terms.

**Pass condition:** No chapter-level defect requires wholesale unit rewriting.

---

### Gate 8 — Post-Draft Copyright Review

**Goal:** Test copyright independence without contaminating drafting.

**Timing rule:** This gate occurs only after the candidate and decision brief are complete.

**Tests:**

- compare against the approved comparison set;
- identify exact, near-exact, and structural resemblance;
- distinguish unavoidable source-constrained similarity from distinctive phrasing;
- avoid automatic rewriting based on short common phrases;
- route meaningful concentrated overlaps to targeted redrafting from Greek;
- preserve the original draft and comparison record.

**Pass condition:** No unresolved high-risk concentrated overlap remains.

**Important:** This gate is a project safeguard, not legal clearance.

---

### Gate 9 — Provenance, Failure Recovery, and Freeze

**Required records:**

- run ID;
- packet hashes;
- governing-document versions;
- model/vendor identifiers;
- timestamps;
- role prompts;
- raw outputs;
- schema-validation results;
- checker findings;
- revision links;
- human decisions;
- copyright-stage inputs;
- final candidate hash;
- error and retry log.

**Failure-recovery tests:**

- malformed JSON or schema;
- missing role output;
- model refusal;
- timeout;
- duplicate output;
- contradictory checker findings;
- exhausted revision loop;
- unavailable comparison source.

**Pass condition:** The system stops safely, reports the failure, and never silently substitutes incomplete work.

---

## 6. Benchmark Evaluation

After the blind run is complete, compare the resulting candidate with frozen Philippians 1 v0.2.

The comparison asks:

- Did the harness recover the same major semantic decisions?
- Did it preserve the same chapter movement and tone?
- Where did it improve on the benchmark?
- Where did it regress?
- Which differences are legitimate alternatives?
- How many human decisions were required?
- How much of the benchmark quality depended on manual reconstruction?
- Did copyright review create unnecessary churn?

The benchmark is not scored by exact wording match.

---

## 7. Metrics

Record the following for each unit and the whole chapter:

- packet completeness rate;
- schema-valid output rate;
- number of retries;
- number of agent failures;
- number of must-fix findings;
- number of optional-polish findings;
- number of human decisions;
- number of verses requiring human reconstruction;
- number of revision cycles;
- unresolved Matrix gaps;
- unresolved ambiguity cases;
- copyright flags by severity;
- percentage of candidate wording retained after human review;
- elapsed processing time;
- estimated model cost where available.

---

## 8. Phase 3 Pass Categories

### PASS

The complete harness works as designed, produces a defensible chapter candidate, preserves provenance, and keeps human reconstruction within the target range.

### CONDITIONAL PASS

The translation core works, but one or more production mechanisms require correction before a new chapter is attempted.

### FAIL

Any of the following occurs:

- blind-stage contamination;
- missing provenance;
- silent role substitution;
- uncontrolled revision loops;
- copyright material exposed before authorized stage;
- incomplete source packet accepted as valid;
- benchmark-quality output requires extensive human reconstruction;
- failures are hidden rather than surfaced.

---

## 9. Execution Sequence

1. Create the Phase 3 run directory and run manifest.
2. Assemble the five neutral source packets.
3. Validate packet visibility classes.
4. Run three isolated drafting roles per unit.
5. Run self-critiques.
6. Run anonymized cross-critiques.
7. Select a candidate through the documented synthesis rule.
8. Run focused checkers.
9. Run controlled revision, maximum two cycles.
10. Produce the human decision brief.
11. Run chapter literary and oral review.
12. Perform post-draft copyright review.
13. Compare with frozen v0.2 benchmark.
14. Record metrics and defects.
15. Issue Phase 3 verdict.
16. Freeze the complete run evidence.

---

## 10. Human Editor Role During Phase 3

The human editor should not be asked to:

- reconstruct Greek packets;
- compare unnamed options without verse numbers;
- rewrite entire paragraphs because the system failed to synthesize;
- decide ordinary punctuation or harmless polish;
- repeat already settled scoped precedents.

The human editor should be asked to decide:

- genuine ambiguity;
- meaningful theological or lexical tradeoffs;
- major dynamic-expansion choices;
- broad precedent;
- unresolved copyright redrafting;
- final acceptance or rejection of the candidate.

---

## 11. Immediate Phase 3 Work Package

The first active work package is:

### Phase 3A — Harness Contract and Test Fixtures

Create:

- canonical run-directory structure;
- run-manifest schema;
- packet schema validator;
- role-output schema validator;
- visibility-control checklist;
- retry and stop rules;
- human-decision burden tracker;
- frozen benchmark evaluation rubric.

Only after these fixtures are defined should the full blind rerun begin.

---

## 12. Current Status

- Phase 2: complete and frozen.
- Phase 3: active.
- Phase 3A: authorized.
- Full blind rerun: not yet started.
