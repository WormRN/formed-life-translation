# FLT — Style Guide (v01)

**Project:** Formed Life Translation (FLT)  
**Document type:** Style Guide — operational presentation and wording rules governed by the Constitution  
**Status:** v01 starter  
**Created:** 2026-06-12  

> This Style Guide contains faster-moving detail. It may change more often than the Constitution. When it conflicts with the Constitution, the Constitution governs.

---

## 1. Style Aim

FLT should sound clear, direct, warm, and readable aloud.

The reader-facing text should feel like natural contemporary English without becoming slangy, cute, or casual in a way that undermines the seriousness of Scripture.

Preferred feel:

- clear
- natural
- orally readable
- emotionally honest
- pastorally accessible
- simple without sounding childish
- contemporary without sounding trendy

Avoid:

- churchy language without explanation
- archaic phrasing
- needless abstraction
- over-smoothed paraphrase
- academic jargon
- long stacked clauses
- quickly dated slang

---

## 2. Reading-Level Target

Working target: Flesch-Kincaid grade ~6.

Allow grade 7–8 when:

- the Greek argument is genuinely dense
- the theological term must be retained
- a simpler rendering would distort meaning
- a passage’s rhetorical weight requires more complex phrasing

The reading-level score is a servant, not the master. Do not sacrifice meaning just to lower a score.

---

## 3. Sentence Length and Flow

Prefer short to moderate sentences.

Long Greek periods may be broken into multiple English sentences.

Use clear sequence markers when needed:

- because
- so
- then
- therefore
- but
- yet
- still
- meanwhile

Do not overuse connectors where English flow is already clear.

---

## 4. Paragraphing

Paragraphs should follow discourse units, not merely verse numbers.

A paragraph break may signal:

- new topic
- new speaker
- new scene
- new argument stage
- movement from explanation to exhortation
- emotional or rhetorical shift

For chapter-level review, check whether the paragraphing helps the reader follow the larger movement of the chapter.

---

## 5. Punctuation

Use contemporary punctuation.

Prefer periods over semicolons for readability.

Use em dashes sparingly for interruption, explanation, or rhetorical punch.

Use exclamation points rarely and only when the Greek tone supports emotional force.

Avoid heavy parentheses in the reading view. Use footnotes or sentence restructuring instead.

---

## 6. Contractions

Contractions are permitted when they sound natural and do not weaken solemnity.

Examples:

- don’t
- doesn’t
- can’t
- I’m
- you’re

Avoid contractions in places where they sound flippant, reduce rhetorical weight, or create a tone mismatch.

This rule may be revisited after more chapter-level read-aloud testing.

---

## 7. Capitalization

### Deity Pronouns

Capitalize pronouns referring to God or Christ:

- He
- Him
- His
- Himself

Where the referent is genuinely contested, choose the clearer reading in the text and footnote the alternative when important.

### Spirit / spirit

Use **Spirit** when referring to the Holy Spirit.

Use **spirit** for the human spirit, disposition, breath, or non-divine sense.

If the referent is contested, note the issue in the editor file or footnote if reader-facing.

### Christ / Messiah

Use **Christ** as the default body-text rendering of Χριστός.

At first occurrence in each book, footnote that Christ means “Anointed One” or “Messiah.”

---

## 8. Divine Name Formatting

The Constitution defines the policy. This guide defines the working encoding.

In source/editor files, encode OT-quotation instances where Greek κύριος renders Hebrew YHWH as:

```text
{{divine-name:Lord}}
```

The reading view may render this later as small caps or another consistent form. Until typography is finalized, the semantic marker is more important than the visual display.

Suggested temporary Markdown rendering:

```md
Lord¹
```

Footnote:

```md
¹ The Hebrew source behind this quotation uses the divine name YHWH, often represented as Yahweh.
```

Do not render ordinary NT κύριος as Yahweh in the body text.

---

## 9. Old Testament Quotations and Allusions

### Direct OT Quotations

Direct OT quotations should be marked in the study/editor layer.

Reading-view formatting remains a pending decision. Options:

- small caps
- indentation
- quotation block
- footnote only
- semantic tag converted at export

Working source-file marker:

```text
{{ot-quote:...}}
```

or, for a whole quotation block:

```text
{{ot-quote-start}}
...
{{ot-quote-end}}
```

### Allusions and Echoes

Do not auto-mark allusions typographically.

If an allusion is significant, use a note:

```md
This wording echoes [OT reference].
```

Because identifying an allusion is a judgment call, it should be flagged by the editor or a reviewer, not asserted mechanically.

---

## 10. Footnote Taxonomy

Footnotes should be brief and consistent.

### 1. Literal-Source Note

Use when a dynamic rendering replaces an idiom, metaphor, or figure.

Format:

```md
Greek literally ...
```

### 2. Weighted-Term Departure Note

Use when a Tier 2 or Tier 3 glossary term departs from a traditional gloss.

Format:

```md
Greek [term] can mean ...; here rendered ... because ...
```

### 3. Alternative-Rendering Note

Use when another rendering is genuinely defensible.

Format:

```md
Or ...
```

### 4. Traditional-Rendering Note

Use when FLT departs from familiar traditional wording.

Format:

```md
Traditionally rendered ...
```

### 5. Textual-Variant Note

Use when a variant affects the reading or when readers are likely to notice.

Format:

```md
Some later manuscripts read ...
```

or:

```md
Some manuscripts include ...
```

Do not overload the reading view with Level 0–2 variants.

### 6. Divine-Name Note

Use for OT quotations where Hebrew has YHWH behind Greek κύριος.

Format:

```md
The Hebrew source uses the divine name YHWH, often represented as Yahweh.
```

### 7. Cultural / Historical Note

Use for obscure persons, places, customs, measurements, coins, legal terms, or name meanings.

Keep brief.

---

## 11. Reading View vs Study View

### Reading View

The reading view is for uninterrupted reading.

It should include:

- clean text
- paragraphing
- minimal necessary notes
- no heavy apparatus
- no Strong’s numbers
- no model notes

### Study View

The study view may include:

- Greek text
- formal gloss
- Strong’s numbers
- morphology
- variant alerts
- glossary notes
- interpretive notes
- supplied-word markers
- reverse-interlinear alignment

---

## 12. Dynamic Rendering Moves

Permitted when needed:

- reorder Greek word order into natural English
- split long sentences
- combine very short fragments when English requires it
- supply implied subject or object
- make implicit logic explicit
- render idioms for sense
- clarify pronoun referents
- convert noun phrases into verbal phrases
- use second person for a general principle when appropriate
- render ancient measures, currency, and time into understandable equivalents

Each significant move should remain traceable in notes or alignment metadata.

---

## 13. Form-Change Warning List

The following are allowed but should not be automatic:

- singular → plural
- plural → singular
- third person → second person
- noun → verb
- verb → noun
- passive → active
- metaphor → explanation
- repeated Greek word → varied English wording
- same Greek term → different English rendering across contexts

When a form-change could affect meaning, note it in the editor file.

---

## 14. Gender Rendering

Render masculine generics according to intended meaning.

Examples:

- ἀδελφοί addressing the whole church → “brothers and sisters”
- singular generic “man/he” → plural “people/they” where appropriate
- general exhortation → second person “you” where clarity improves

Do not neutralize masculine language referring to God, Christ, or a specific male person.

---

## 15. Technical Terms, Money, Measures, and Time

Non-theological technical terms should usually be rendered in clear modern equivalents in the text, with the literal Greek in a footnote when useful.

Examples:

- denarius → “a full day’s wage”
- cubit → modern distance, where comprehension requires
- third hour / sixth hour → approximate modern time where appropriate

This category is especially important in the Gospels, Acts, and Revelation.

---

## 16. Names and Titles

Keep standard English biblical names unless there is a strong reason to change.

Explain name meanings only when the text itself draws attention to them or when the meaning bears on the passage.

Titles should be understandable:

- Christ — retained; footnote as Messiah / Anointed One
- apostle — context-dependent; may be retained with first-use note
- Pharisee / Sadducee — retained; note where needed
- synagogue — retained; note if audience confusion is likely

---

## 17. Read-Aloud Pass

Every finalized chapter must be read aloud.

Listen for:

- breath length
- awkward clauses
- unnatural transitions
- repeated words that sound accidental
- underpowered emotional moments
- over-explained lines
- loss of rhetorical force
- places where the listener loses the subject or main point

Read-aloud corrections should be checked against the Greek before finalization.

---

## 18. Copyright-Independence Check

Before finalizing a chapter, compare the final reading against major copyrighted translations only for awareness.

Ask:

1. Does FLT accidentally shadow a copyrighted translation too closely?
2. Is the wording independently defensible from the Greek?
3. Did the wording arise from FLT’s process rather than from copying?
4. Would a reader see FLT as a distinct translation voice?

Do not use copyrighted translations as drafting sources.

---

## 19. Editor File Fields

Default chapter editor fields:

```md
### Phil 1:1
- **Greek:**
- **Gloss/lexical:**
- **Strong’s:**
- **Variant Alerts:** none
- **Draft:**
- **Editor:**
- **Notes:**
- **Footnotes:**
- **Decision Log:**
```

Variant Alerts should be included only when Level 2 or higher, or when the editor manually wants a reminder.

---

## 20. Status Terms

Use file status consistently:

- `draft` — machine/model/engine output or early human work
- `edited` — at least one full human editorial pass complete
- `reviewed` — passed model/human review but not final
- `finalized` — approved for master file
- `reopened` — previously finalized but reopened by later precedent

Status lives inside the file header, not the filename.
