from pathlib import Path

p=Path('docs/current/FLT_contextual_lexical_matrix_v2.0.md')
s=p.read_text()
pairs=[
("**Definition:** Paul exerts himself like a competitor in the demanding work of ministry.","**Definition:** Paul struggles intensely in the demanding work of ministry."),
("**Approved renderings:** `compete`.  ","**Approved renderings:** `struggle`.  "),
("**Restricted renderings:** Generic `struggle` or `strive` when it unnecessarily erases the deliberate lexical link to ἀγών in Col.2.1.  ","**Restricted renderings:** A rendering that severs the deliberate lexical link to ἀγών in Col.2.1 without contextual necessity.  "),
("**Literary / discourse links:** Direct word-family bridge from Col.1.29 ἀγωνίζομαι to Col.2.1 ἀγών.  ","**Literary / discourse links:** Direct word-family bridge from Col.1.29 `struggle` to Col.2.1 `struggling`.  "),
("**Worked examples:** Col.1.29 — `compete`.  ","**Worked examples:** Col.1.29 — `struggle` (Human Editor precedent update, 2026-08-13).  "),
("**Approved renderings:** `contest`.  ","**Approved renderings:** `struggle`; natural inflection such as `struggling` when syntax requires it.  "),
("**Restricted renderings:** A generic rendering that unnecessarily severs the lexical bridge to `compete` in Col.1.29.  ","**Restricted renderings:** A rendering that unnecessarily severs the lexical bridge to `struggle` in Col.1.29.  "),
("**Literary / discourse links:** Col.1.29 `compete` → Col.2.1 `contest`.  ","**Literary / discourse links:** Col.1.29 `struggle` → Col.2.1 `struggling`.  "),
("**Worked examples:** Col.2.1 — approved lexical rendering `contest`; final verse wording remains subject to the ordinary Human Editor workflow.  ","**Worked examples:** Col.2.1 — `struggling` in the Human Editor synthesis.  ")]
for old,new in pairs:
    if old not in s: raise SystemExit('missing expected Matrix phrase: '+old)
    s=s.replace(old,new,1)
old="""## σάρξ · sarx

**Internal lemma ID:** FLT-GRC-SARX  
**Strong’s:** G4561  
**Entry status:** stub

**Semantic range.** Flesh, body, human descent, human limitation, merely human capability, or the sphere opposed to the Spirit.  
**Theological significance.** Critical in Pauline anthropology.  
**Default posture.** Render by context; mandatory review when the Spirit/flesh contrast or sinful-human-sphere sense is live.  
**Global unresolved questions.** Whether any single phrase can responsibly handle the Pauline theological sense.
"""
new="""## σάρξ · sarx

**Internal lemma ID:** FLT-GRC-SARX  
**Strong’s:** G4561  
**Entry status:** approved  
**Last reviewed:** 2026-08-13  
**Human editor:** David L. Davis

**Semantic range.** Flesh, body, embodied presence, human descent, human limitation, merely human capability, or the sphere opposed to the Spirit.  
**Theological significance.** Critical in Pauline anthropology; the Col.2.1/2.5 use is non-theological embodied-presence language and must not be confused with the flesh/Spirit contrast.  
**Default posture.** Sense-dependent.

### Sense 1 — Bodily or face-to-face presence

**Sense status:** approved  
**Definition:** Physical personal presence as contrasted with absence or nonbodily solidarity.  
**Recognition cues:** Col.2.1 face/flesh expression and Col.2.5 bodily absence contrasted with presence in spirit.  
**Approved renderings:** `in person`; natural constructions using `person` where English syntax requires.  
**Restricted renderings:** `flesh` when it would sound anatomical or theological in this context.  
**In-text clarification boundary:** Express ordinary face-to-face or bodily presence without importing a flesh/Spirit moral contrast.  
**Footnote triggers:** Normally none.  
**Literary / discourse links:** Col.2.1 and Col.2.5 form a deliberate personal-presence bracket.  
**Evidence basis:** lexical range, syntax, discourse, and Human Editor precedent.  
**Confidence:** high  
**Approved scope:** Col.2.1 and Col.2.5 embodied-presence expressions.  
**Decision Log references:** Colossians 2:1-5 Human Editor synthesis, 2026-08-13.  
**Worked examples:** Col.2.1 — `met me in person`; Col.2.5 — `not there in person`.  
**Exceptions / unresolved questions:** Other Pauline σάρξ senses remain passage-specific and require fresh classification.

**Cross-sense cautions.** Do not generalize this embodied-presence rendering to theological flesh/Spirit contexts.  
**Lemma-family links.** — pending —  
**Global unresolved questions.** Other Pauline senses remain unresolved outside this approved scope.
"""
if old not in s: raise SystemExit('sarx block not found')
s=s.replace(old,new,1)
anchor='\n---\n\n## πλήρωμα · plērōma\n'
additions="""
---

## ἀποκρύπτω / ἀπόκρυφος · apokryptō / apokryphos

**Internal lemma IDs:** FLT-GRC-APOKRYPTO / FLT-GRC-APOKRYPHOS  
**Entry status:** approved  
**Last reviewed:** 2026-08-13  
**Human editor:** David L. Davis

**Semantic range.** Hide, conceal; hidden or kept out of sight.

### Sense 1 — Hidden in the Colossians secret-plan discourse

**Sense status:** approved  
**Definition:** Something concealed or kept hidden, whether formerly concealed and then revealed (1:26) or presently located hidden in Christ (2:3).  
**Recognition cues:** Col.1.26 and Col.2.3; direct discourse connection with μυστήριον / secret plan and wisdom/knowledge in Christ.  
**Approved renderings:** `hidden`.  
**Restricted renderings:** paraphrases that erase the repeated hidden-language link without contextual necessity.  
**Literary / discourse links:** Col.1.26 `hidden` → Col.2.3 `hidden`.  
**Confidence:** high  
**Approved scope:** Col.1.26 and Col.2.3.  
**Decision Log references:** Colossians 2:1-5 Human Editor synthesis, 2026-08-13.  
**Worked examples:** Col.1.26 — `kept hidden`; Col.2.3 — `lies hidden`.

**Cross-sense cautions.** `Hidden` in 2:3 must not imply elite-only access; the treasures are located in Christ.

---

## συμβιβάζω · symbibazō

**Internal lemma ID:** FLT-GRC-SYMBIBAZO  
**Strong’s:** G4822  
**Entry status:** approved  
**Last reviewed:** 2026-08-13  
**Human editor:** David L. Davis

**Semantic range.** Bring together, unite, join, bind together; in other contexts infer or conclude.

### Sense 1 — Community joined together in love

**Sense status:** approved  
**Definition:** The members of the community are joined or bound together with one another in love.  
**Recognition cues:** Col.2.2; plural community context; ἐν ἀγάπῃ.  
**Approved renderings:** `bind together`; inflected/passive `bound together`.  
**Restricted renderings:** cognitive senses such as `conclude` in this context.  
**Literary / discourse links:** Strengthened hearts and communal love in Col.2.2.  
**Confidence:** high  
**Approved scope:** Col.2.2.  
**Decision Log references:** Colossians 2:1-5 Human Editor synthesis, 2026-08-13.  
**Worked examples:** Col.2.2 — `bound together in love`.

**Cross-sense cautions.** Other συμβιβάζω contexts may use a reasoning/inference sense and require fresh classification.
"""
if anchor not in s: raise SystemExit('plērōma anchor not found')
s=s.replace(anchor,additions+anchor,1)
p.write_text(s)

q=Path('docs/architecture/phase-4/COL-01-024-029_human-final-v2.2.json')
t=q.read_text()
old='That is why I labor and compete, with the energy He powerfully works within me.'
new='That is why I labor and struggle, with the energy He powerfully works within me.'
if old not in t: raise SystemExit('Col.1.29 wording anchor not found')
q.write_text(t.replace(old,new,1))
