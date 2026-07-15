# FLT — Translation Packet Template (v01)

**Project:** Formed Life Translation (FLT)  
**Document type:** Translation Packet Template  
**Status:** v01 starter  
**Created:** 2026-06-12  

> A translation packet is the standard input given to GPT, Claude, Gemini, or a human reviewer. It keeps every reviewer working from the same source, same goals, same known issues, and same constraints.
>
> The packet is not the final chapter file. It is the controlled work order for a chapter or unit.

---

# FLT Translation Packet

## 1. Metadata

```md
Book:
Chapter:
Unit:
Source text:
Current editor file:
Current status:
Date:
Prepared by:
Model role:
```

Example:

```md
Book: Philippians
Chapter: 1
Unit: Whole chapter, reviewed in paragraph units
Source text: SBLGNT parsed text
Current editor file: FLT_PHP_01_v04.md
Current status: edited / not finalized
Model role: Greek Guardian
```

---

## 2. Constitution Excerpt for Models

Use this short version unless a task requires more.

```md
The Formed Life Translation is a dynamic-equivalence New Testament translation from the SBLGNT Greek text. It aims for clear, natural contemporary English, roughly NLT-like in readability, for new believers and readers unfamiliar with church vocabulary.

Translate meaning over form, but use the minimum departure from the Greek required for clarity. Preserve the meaning, logic, tone, and theological force of the Greek. Do not copy existing modern translation wording. The human editor makes the final decision.
```

---

## 3. Chapter Context

```md
Book context:
Chapter summary:
Tone:
Major themes:
Discourse movement:
Reader-facing challenge:
```

Example:

```md
Book context: Philippians is a warm pastoral letter written from imprisonment to a church that has partnered with Paul in the good news.
Chapter summary: Paul greets the church, thanks God for them, explains that his imprisonment has advanced the good news, reflects on life and death in Christ, and exhorts the church to live in a way that honors the good news.
Tone: affectionate, joyful, courageous, pastoral.
Reader-facing challenge: maintain Paul’s warmth and courage without flattening the theological density of vv. 19–30.
```

---

## 4. Chapter Map

```md
1. vv. 1–2 — Greeting
2. vv. 3–11 — Thanksgiving and prayer
3. vv. 12–18 — Paul’s imprisonment advances the good news
4. vv. 19–26 — Christ honored whether Paul lives or dies
5. vv. 27–30 — Live worthy of the good news under opposition
```

Adjust the unit map per chapter.

---

## 5. Source Text

Include only the relevant unit unless whole-chapter review is needed.

```md
## Greek Text
[insert SBLGNT Greek text]

## Parsed / Gloss Data
[insert word table, gloss, Strong’s, morphology, or reference to editor file]
```

Do not paste NA28 text into model packets. If NA28 differs, summarize the difference in the Variant Alerts section.

---

## 6. Current FLT Draft

```md
## Current Draft / Editor Text
[insert current FLT reading or editor text]
```

For a chapter-level literary pass, include the full reading view.

For a unit-level Greek review, include only the relevant verses plus enough surrounding context.

---

## 7. Existing Decisions Applied

```md
- Source base: SBLGNT
- Reading-level target: approximately grade 6, tolerate 7–8 where needed
- εὐαγγέλιον: good news; must carry announcement of what God has done
- Χριστός: Christ, with first-use note as Messiah / Anointed One
- ἅγιοι: God’s holy people when referring to believers
- πίστις / πιστεύω: faith / trust / the faith according to context
- Deity pronouns: capitalized
- OT quotations: direct quotations marked in study layer; reading-view format pending
- Divine-name quotation instances: encode semantically as {{divine-name:Lord}}
```

Add chapter-specific decisions.

---

## 8. Known Translation Issues

```md
- Key terms:
- Syntax / discourse issues:
- Ambiguities:
- Theological risks:
- Readability risks:
- Possible over-translation risks:
- Possible under-translation risks:
- OT quotations / allusions:
- Variant alerts:
```

Example from Philippians 1:

```md
- δοῦλοι in v.1: servants vs slaves vs bondservants.
- χάρις in vv.2 and 7: should grace be consistent or contextually varied?
- σωτηρία in v.19: deliverance vs salvation; possible ambiguity.
- πνεῦμα in v.27: human/shared spirit vs Holy Spirit.
- πολιτεύεσθε in v.27: live as citizens vs live in a way that honors.
```

---

## 9. Textual Variant Alerts

Use only meaningful alerts. Do not overwhelm the packet.

### Severity Scale

| Level | Meaning | Packet treatment |
|---|---|---|
| 0 | Orthographic / no translation impact | Omit |
| 1 | No likely English impact | Silent log only |
| 2 | Minor English impact | Include briefly |
| 3 | Meaningful translation decision | Require review |
| 4 | Reader-visible / theological / KJV-noticeable | Require decision log and likely note |
| 5 | Major passage-level issue | Special review |

### Alert Format

```md
### Variant Alert
Verse:
Level:
Comparison:
SBLGNT reading summary:
NA28 / RP / TR-family reading summary:
Translation impact:
Reader-facing impact:
Recommended editor action:
```

Example placeholder:

```md
### Variant Alert
Verse: Phil __
Level: 3
Comparison: SBLGNT / NA28
SBLGNT reading summary:
NA28 reading summary:
Translation impact:
Reader-facing impact:
Recommended editor action: Human editor check NA28 before finalizing.
```

---

## 10. Model Role Instructions

### A. Clarity Translator

```md
You are the Clarity Translator. Optimize for readable, natural, oral English for a new believer or reader unfamiliar with church language. Protect the meaning, but focus on whether the passage can be understood when read aloud.

Return:
1. Proposed rendering
2. Readability strengths
3. Places that sound awkward or too churchy
4. Places where the current draft may over-explain or under-explain
5. Suggested revisions
6. Risks to Greek fidelity
```

### B. Greek Guardian

```md
You are the Greek Guardian. Protect the meaning, logic, syntax, ambiguity, repeated terms, and theological force of the Greek. Do not merely prefer literal English; identify what must not be lost.

Return:
1. Greek propositions
2. Greek details preserved in the current draft
3. Greek details weakened or lost
4. Over-translation risks
5. Under-translation risks
6. Variant or ambiguity concerns
7. Suggested revisions
```

### C. Balanced Editor

```md
You are the Balanced Editor. Try to produce the best FLT candidate: clear contemporary English that carries the Greek meaning with minimum necessary departure.

Return:
1. Proposed rendering
2. Reasons for changes
3. Greek fidelity notes
4. Readability notes
5. Footnotes needed
6. Remaining decision questions
```

### D. Red-Team Reviewer

```md
You are the Red-Team Reviewer. Challenge the draft. Look for misleading wording, flattened theology, unnecessary smoothing, over-paraphrase, loss of ambiguity, or accidental similarity to copyrighted translations.

Return:
1. Top risks
2. Wording that could mislead
3. Wording that is too loose
4. Wording that is too literal or churchy
5. Copyright-independence concerns
6. Required human decisions
```

### E. Committee Secretary

```md
You are the Committee Secretary. Do not create a new translation first. Summarize the debate for the human editor.

Return:
1. Main issues
2. Options considered
3. Strongest argument for each option
4. Strongest argument against each option
5. Recommended hybrid wording
6. Unresolved questions
7. Decision-log items
8. Confidence level
```

---

## 11. Self-Critique Prompt

Use after a model produces a draft, before showing it the other models.

```md
Review your own answer critically.

Identify:
1. Where your wording may be too loose.
2. Where it may be too literal.
3. Where it may sound unnatural.
4. Where it may under-translate the Greek.
5. Where it may over-translate the Greek.
6. What alternative wording you would now consider.
```

---

## 12. Cross-Critique Prompt

Use after blind drafts and self-critiques are complete.

```md
You are now reviewing several proposed renderings of the same Greek passage.

For each option:
1. Make the strongest argument in favor of it.
2. Make the strongest argument against it.
3. Identify any Greek meaning it may lose or weaken.
4. Identify any English readability advantage.
5. Identify any theological or interpretive risk.
6. Suggest a better hybrid if possible.

Then summarize the decision points the human editor must resolve.
```

---

## 13. Quality Checks

### A. Semantic Proposition Check

```md
List the propositions communicated by the Greek. Then compare the FLT draft against them.

Meaning preserved:
Meaning lost:
Meaning added:
Meaning shifted:
```

### B. Back-Translation Check

```md
Based only on the English FLT draft, reconstruct what you think the original text means. Then compare that reconstruction to the Greek proposition list.
```

### C. Read-Aloud Check

```md
Evaluate the chapter as oral English.

Awkward sentence:
Too long:
Too choppy:
Unclear referent:
Strong cadence:
Weak cadence:
Suggested revision:
```

### D. Key-Term Consistency Check

```md
Compare recurring Greek terms against the glossary. Flag inconsistent renderings that are not justified by context.
```

### E. Copyright-Independence Check

```md
Assess whether the wording appears independently generated and defensible from the Greek and FLT style guide rather than dependent on a copyrighted English translation.
```

---

## 14. Human Decision Section

```md
## Human Editor Decision

Verse / unit:
Issue:
Options considered:
Final wording:
Reason:
Footnote needed:
Glossary update needed:
Style Guide update needed:
Decision Log entry:
Status:
```

---

## 15. Output for Chapter Editor File

After review, update the chapter editor file:

```md
### Phil 1:__
- **Greek:**
- **Gloss/lexical:**
- **Strong’s:**
- **Variant Alerts:**
- **Draft:**
- **Editor:**
- **Notes:**
- **Footnotes:**
- **Decision Log:**
```

---

## 16. How Tomorrow’s Philippians 1 Trial Should Run

1. Use `FLT_PHP_01_v04.md` as the current editor file.
2. Treat Philippians 1 as a calibration chapter, not a failure redo.
3. Divide into five units:
   - vv. 1–2
   - vv. 3–11
   - vv. 12–18
   - vv. 19–26
   - vv. 27–30
4. Run at least Greek Guardian and Clarity Translator on each unit.
5. Compile a chapter-level reading pass.
6. Run Red-Team and Committee Secretary at the chapter level.
7. Produce `FLT_PHP_01_v05.md` only after human decisions.
```
