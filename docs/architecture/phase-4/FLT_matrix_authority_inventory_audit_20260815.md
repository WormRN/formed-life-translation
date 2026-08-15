# FLT Matrix Authority Inventory and Audit — 2026-08-15

**Authority:** Human Editor directive.  
**Audit mode:** REPORT ONLY for historical false-lock impact and Revision 5 reclassification findings.  
**Migration status:** the separately authorized `approved_*` authority-label mapping is accepted and implemented at packet-build time.  
**No translation wording is altered by this report or migration.**  
**No sealed wording is reopened.**

## 1. Candidate impact — COL 2:6–15

Run `31776807461` produced two valid unsealed candidates (A and B). Under the new OPEN WITH CAUTIONS entry for `ἐν Χριστῷ / ἐν αὐτῷ / ἐν ᾧ`:

- Candidate A reading text uses `in him` at Col.2:6, 2:10, and 2:11. No reading-text restriction is triggered.
- Candidate B reading text uses `in union with him` at Col.2:6 and `in union with Christ` at Col.2:10 and 2:11.
- Candidate B therefore carries three affected editorial items. These are **not silently corrected**. The candidate remains an unsealed historical artifact and the Decision Brief must surface the restriction for Human Editor review.
- Candidate A contains one explanatory risk sentence using the phrase `union with Christ`; because this is apparatus rather than reading text, it is not itself a restricted reading-text rendering.

## 2. Accepted `approved_*` authority-label migration

The Human Editor accepted the following mapping on 2026-08-15. The harness now normalizes these legacy labels before material enters a worker-facing packet. Historical committed packets remain available through Git history for provenance. An unrecognized future `approved_*` label is a packet-build error and may not pass through unchanged.

| Legacy label | Accepted authority type | Reason |
|---|---|---|
| `approved_for_unit` | GOVERNED | Approval is scoped to a unit/context and does not by itself create a fixed English gloss. |
| `approved_contextual_alert` | GOVERNED | The label explicitly signals context-dependent guidance. |
| `approved_underdetermined` | OPEN WITH CAUTIONS | Multiple live senses are intentionally retained and premature resolution is forbidden. |
| `approved_contested_stub` | OPEN WITH CAUTIONS | Direction exists while exact sense remains contested. |
| `approved_continuity_alert` | GOVERNED | Continuity matters, but contextual function can govern English variation. |
| `approved_word_family_alert` | GOVERNED | The family echo should be considered/preserved where possible without forcing distortion. |
| `approved_discourse_chain` | LOCKED **only for the Col.2:12–13 συν-compound chain** | The Human Editor explicitly ruled that the with-Christ element must remain audible. |
| `approved_contested_syntax` | OPEN WITH CAUTIONS | The syntactic relation remains unresolved and English must survive multiple live analyses. |

### `approved_discourse_chain` uniqueness check

Repository inspection found the label only on:

- `συνθάπτω` — Col.2:12
- `συνεγείρω` — Col.2:12
- `συζωοποιέω` — Col.2:13

No other current construction carries `approved_discourse_chain`. The packet builder now refuses to map that label to LOCKED for any lemma outside these three, so a future reuse cannot silently inherit lock authority.

## 3. Historical defect report — `approved` was incorrectly treated as LOCKED

### Defect

The pre-repair `lockedMatrixLemmas()` logic classified an entire lemma as locked when either its **Entry status** or any **Sense status** was `approved`. That contradicted Matrix §2.2 and §2.3: maturity/scope approval was being confused with fixed-rendering authority.

The faulty preflight was introduced on **2026-08-13** in commit `ee4313ce77a6a7894f18eabcb2b705226560a491`. It did not itself compare a candidate's English wording with one fixed gloss; operationally, it required every falsely classified lemma present in a unit to have a Matrix alert, and those alerts then entered the blind worker packet. The defect therefore created an unjustified route by which contextual precedents could acquire lock-like force.

### Lemmas globally misclassified at the historical Col.2:1–5 snapshot

At checkout `5a5574ce76f728f5246e17b9495eaee9368ee471`, the old parser treated these mature entries as LOCKED because an entry or sense carried `approved` status:

- `εὐαγγέλιον`
- `ἅγιος`
- `δοῦλος`
- `ἐπίσκοπος`
- `διάκονος`
- `χάρις`
- `μυστήριον`
- `τέλειος`
- `ἀνταναπληρόω`
- `ἀγωνίζομαι`
- `ἀγών`

**Clarification on `πίστις`:** although it is a multi-sense Matrix entry and is exactly the kind of term that must not become a fixed gloss, at this historical snapshot its entry and its personal-trust sense were still `working`, not `approved`. Therefore the defective parser did **not** actually classify `πίστις` as LOCKED in these runs. The defect was broad enough to make that possible as soon as any πίστις sense became `approved`, which is why separating Authority type from maturity status is necessary.

### Philippians drafting runs

**Affected lemmas: none.** Philippians v0.9 RC1 was completed and frozen on **2026-08-10**, three days before the faulty lock preflight was introduced. No Philippians drafting run could therefore have been constrained by this code path.

**Sealed wording evidence:** none. There is no causal path from this August 13 defect to the already-frozen Philippians reading text. This audit does not reopen Philippians.

### Colossians 1 drafting runs

**Affected lemmas: none through this code path.** Colossians 1 drafting and Human Editor sealing preceded introduction of the August 13 false-lock preflight. Later audits/repository work do not retroactively make those earlier drafts products of this parser.

**Sealed wording evidence:** none attributable to this defect. This audit does not reopen Colossians 1.

### Colossians 2:1–5 drafting runs

- Run `31674227604` did **not** reach the Matrix/candidate preflight; it failed earlier while constructing the bounded run identity.
- Run `31674368604` did execute the blind-drafting harness under the faulty parser.
- Of the globally misclassified mature lemmas above, the Greek unit and its Matrix alerts intersected the false-lock set at **`ἀγών` and `μυστήριον`**. Those were the two mature Matrix lemmas operationally exposed to the faulty lock classification in this run.
- `πίστις` occurs in Col.2:5 but was not false-locked at that historical Matrix snapshot because its statuses were still `working`.

**Sealed wording evidence:** no evidence that the defect mechanically fixed the final English. In fact, the sealed Human Editor record shows the opposite for both affected terms:

- `ἀγών`: the earlier `contest` treatment was explicitly superseded; sealed Col.2:1 reads **`fighting`**, while Col.1:29 remains **`struggling`** and Col.4:12 remains open.
- `μυστήριον`: sealed Col.2:2 intentionally varies from Col.1:26 `secret plan` to **`the secret God kept hidden — Christ Himself`** under a Human Editor contextual ruling.

Those explicit Human Editor overrides broke any mechanical fixed-gloss effect before sealing. No reopening is authorized or recommended by this finding.

### Colossians 2:6–15 drafting runs

Runs `31776021443`, `31776254049`, `31776431733`, `31776593648`, and `31776807461` occurred after introduction of the faulty parser. However, **none of the globally misclassified mature lemmas listed above occurs in the Col.2:6–15 Greek unit in a way that brought that false-lock set into the preflight.** The many unit-specific `approved_*` alerts in this packet were a separate ad-hoc-label problem; they were not what the old base-Matrix parser used to manufacture its false-lock set.

**Affected false-lock lemmas in these runs: none.** The current 2:6–15 candidates are unsealed in any case. Their separate `in union with` drift issue is recorded in §1 and remains a Human Editor editorial item.

### Historical impact conclusion

The old parser was architecturally dangerous because it globally collapsed maturity into lock authority. In the actual drafting history examined here, its **direct operational exposure was narrow**: `ἀγών` and `μυστήριον` in the successful-to-provider Col.2:1–5 run. The sealed Human Editor wording shows contextual variation for both rather than evidence of a mechanically imposed fixed gloss. No sealed translation wording shows evidence that must be reopened because of this defect.

## 4. Revision 5 — current base Matrix audit findings

Audit test: **Would this ruling still be made if the term were first encountered in a different context?**

These are findings only. They do not reclassify any existing base-Matrix entry.

### Pilot / developed entries

- `εὐαγγέλιον` — **finding:** likely GOVERNED, not a general lock. The base entry itself distinguishes message and mission senses and permits contextual English variation.
- `ἅγιος` — **finding:** likely GOVERNED. Substantival `God's holy people` and adjectival `holy / set apart for God` depend on syntactic function and context.
- `δοῦλος` — **finding:** likely GOVERNED. Apostolic self-designation, literal slavery, and metaphorical bondage explicitly receive different treatment.
- `ἐπίσκοπος` — **finding:** likely GOVERNED. Philippians 1:1 has a local-role precedent while developed ministry-role contexts remain open.
- `διάκονος` — **finding:** GOVERNED is already consistent with the Human Editor directive; congregational role and general service are distinguished.
- `χάρις` — **finding:** likely GOVERNED. Divine favor, greeting formula, concrete gift/benefit, and gratitude are explicitly distinct senses.
- `πίστις` — **finding:** likely GOVERNED / possibly OPEN WITH CAUTIONS in disputed constructions. The base entry explicitly warns against allowing familiar `faith` language to hide trust, faithfulness, or content-of-belief distinctions.

### High-priority stubs

- `δικαιοσύνη` — **finding:** not suitable for LOCKED status as presently written; multiple major contextual senses remain open. Likely OPEN WITH CAUTIONS or future GOVERNED entry after adjudication.
- `δικαιόω` — **finding:** not suitable for LOCKED status as presently written; declare/vindicate/acquit/show-right/place-right distinctions remain unresolved. Likely OPEN WITH CAUTIONS or future GOVERNED.
- `σάρξ` — **finding:** not suitable for LOCKED status; the entry explicitly lists physical body, descent, limitation, human capability, and Spirit-opposed sphere senses. Likely GOVERNED once developed; currently OPEN WITH CAUTIONS.
- `ἀπολύτρωσις / λύτρωσις` — **finding:** not suitable for LOCKED status as presently written; rescue/release/redemption/ransom force varies. Likely OPEN WITH CAUTIONS or future GOVERNED.
- `ἱλαστήριον / ἱλασμός` — **finding:** not suitable for LOCKED status; the entry itself requires mandatory Human Editor adjudication. OPEN WITH CAUTIONS is the apparent fit, pending ruling.

### Colossians continuity entries

- `μυστήριον` — **finding:** Human Editor has explicitly placed this in the LOCKED set, with the protected hidden/revealed thread and approved 2:2 contextual variation. The older base entry's warning against a universal mechanical gloss should be read as scope protection, not as revocation of the new explicit lock.
- `τέλειος` — **finding:** likely GOVERNED rather than LOCKED. `complete` is approved in Col.1:28, while the entry states that other senses/books require separate review.
- `ἀνταναπληρόω` — **finding:** likely GOVERNED/local precedent rather than LOCKED. The approved `taking my turn` ruling is passage-specific to Col.1:24.
- `ἀγωνίζομαι` — **finding:** existing base wording (`compete`) fails the new test because the later Human Editor ruling varies Col.1:29 to `struggling` and Col.2:1 to `fighting`. Present for GOVERNED review; no base-Matrix reclassification is applied here.
- `ἀγών` — **finding:** same family conflict as `ἀγωνίζομαι`; the old `contest` continuity lock is superseded in practice by context-sensitive Human Editor rulings. Present for GOVERNED review; no base-Matrix reclassification is applied here.
- `πλήρωμα` — **finding:** likely GOVERNED / OPEN WITH CAUTIONS at unresolved occurrences. The base entry explicitly says no fixed technical meaning should be assumed and Col.2:9 required fresh resolution.
- `κεφαλή` — **finding:** likely GOVERNED. The base entry preserves the head/body image but explicitly refuses one abstract theory across contexts.
- `σῶμα` — **finding:** likely GOVERNED. Corporate-body and physical-body senses must remain distinct.
- `εἰκών` — **finding:** likely GOVERNED. `image` is a Col.1:15 anchor, but later contexts require separate classification.
- `πρωτότοκος` — **finding:** likely GOVERNED. Col.1:15 rank/authority and Col.1:18 resurrection relation are explicitly distinct contextual uses.

## 5. Explicit LOCKED registrations supplied by Human Editor ruling

The Authority-Type Amendment carries explicit LOCKED registrations for:

- `μυστήριον`
- `ἀποκρύπτω / ἀπόκρυφος`
- `παρίστημι`
- `νῦν / νυνί`
- `συνθάπτω / συνεγείρω / συζωοποιέω`
- `κτίσις`

These registrations implement direct Human Editor rulings. They are not inferred reclassifications from base-Matrix maturity status.

## 6. No-action boundaries

- No translation text was edited.
- No sealed wording was reopened.
- No unsealed candidate was normalized or silently repaired.
- No Revision 5 base-Matrix finding was applied as a reclassification.
- Historical `approved_*` packet labels remain recoverable in Git history; current worker-facing packets normalize the accepted mapping before drafting.
- No provider call, workflow rerun, or translation generation was authorized or performed by this audit.