# The Formed Life Translation

## Contextual Lexical Matrix — Version 2.0

**Project:** Formed Life Translation  
**Document type:** Governing lexical decisions for recurring Greek terms across contexts  
**Governing authority:** Subordinate to the FLT Constitution v2.0 and Style Guide v2.0  
**Supersedes:** FLT Glossary v1.0

> **A recurring Greek term is governed by its contextual senses, evidence, scope, and approved precedent—not by one fixed English gloss. Consistency in FLT means accountability to meaning across contexts, not mechanical repetition of one word.**

---

# 1. Purpose

The Contextual Lexical Matrix replaces the former glossary model.

Greek words often behave like English words such as *run*: the same form may describe physical movement, operating a machine, managing an organization, flowing liquid, or continuing over time. Context determines the sense.

Accordingly, the Matrix does not tell a translator, “This Greek word always equals this English word.” It records:

- the source-side semantic range;
- the contextual senses FLT distinguishes;
- the evidence used to identify those senses;
- approved renderings within defined scopes;
- restricted renderings and their risks;
- theological, literary, and discourse links;
- footnote and escalation requirements;
- precedents established by the human editor.

The Matrix constrains translation without turning lexical judgment into slot-filling.

---

# 2. Governing Principles

## 2.1 Context Determines Sense

A lemma does not carry one identical meaning into every occurrence. Syntax, discourse, genre, speaker, argument, metaphor, historical setting, and co-text must all be considered.

## 2.2 No Default English Word

An entry may state a **default posture** such as:

- render by meaning;
- retain and teach;
- sense-dependent.

It must not establish one English word as an automatic replacement for every occurrence.

## 2.3 Status Applies by Sense and Scope

One sense may be approved while another remains unresolved. A decision in Philippians does not automatically govern Romans, the Gospels, or the Pastoral Epistles.

## 2.4 Approved Does Not Mean Irreversible

An approved decision governs ordinary work within its stated scope. It may be reopened when:

- a new context falls outside the approved scope;
- new linguistic or historical evidence materially challenges it;
- a cross-book pattern exposes inconsistency;
- a related lemma creates a conflict;
- the human editor authorizes reconsideration.

## 2.5 Strong’s Numbers Are Compatibility Metadata

The Greek lemma and internal lemma identifier are primary. Strong’s numbers may be recorded for study-layer interoperability but do not govern lexical analysis.

## 2.6 The Matrix Does Not Decide Theology by Itself

Where a lexical decision carries major theological consequences, the Matrix records the dispute and escalation requirement. It does not allow worker agents to settle the issue silently.

---

# 3. Entry and Sense Status

## Entry status

- `stub` — registered as important but not yet developed;
- `working` — senses and posture are developed, but important decisions remain provisional;
- `approved` — approved for the scopes explicitly named;
- `reopened` — an earlier approved decision is under renewed review.

## Sense status

Each contextual sense independently uses the same four values:

- `stub`
- `working`
- `approved`
- `reopened`

A worker must read the sense status and approved scope before applying a precedent.

---

# 4. Standard Entry Template

Every full entry follows this structure. Unresolved fields read `— pending —` rather than being omitted.

```md
### [Greek lemma] · [transliteration]

**Internal lemma ID:**
**Strong’s:** optional
**Entry status:** stub | working | approved | reopened
**Last reviewed:**
**Human editor:**

**Semantic range.**
Source-side lexical range only.

**Historical / cultural considerations.**
Mark each claim as established, probable, possible, or disputed.

**Theological significance.**
Why the term requires special care.

**Default posture.**
Render-by-meaning | retain-and-teach | sense-dependent.

## Sense 1 — [name]

**Sense status:** stub | working | approved | reopened
**Definition:**
**Recognition cues:**
**Approved renderings:**
**Restricted renderings:**
**In-text clarification boundary:**
**Footnote triggers:**
**Literary / discourse links:**
**Evidence basis:**
- lexical:
- syntactic:
- discourse:
- historical:
- theological:
- precedent:

**Confidence:** high | moderate | provisional
**Approved scope:**
**Decision Log references:**
**Worked examples:**
**Exceptions / unresolved questions:**

**Cross-sense cautions.**

**Lemma-family links.**

**Global unresolved questions.**
```

---

# 5. How the Swarm Uses the Matrix

1. Retrieve the entry by lemma.
2. Read entry status.
3. Identify all contextually plausible senses from syntax and discourse.
4. Read the status and approved scope of each plausible sense.
5. Report the selected sense and the evidence for selecting it.
6. Apply only renderings approved for that sense and scope.
7. Check restricted renderings, literary links, and clarification boundaries.
8. Trigger required footnotes or escalation.
9. Never treat the Matrix as a replacement dictionary.

Escalation is required when:

- no listed sense fits;
- more than one significant sense remains live;
- the occurrence lies outside approved scope;
- the entry or selected sense is a stub;
- a disputed field is triggered;
- a lemma-family conflict appears;
- proposed clarification exceeds the entry boundary;
- new evidence challenges an approved precedent.

---

# 6. Pilot Entries

## εὐαγγέλιον · euangelion

**Internal lemma ID:** FLT-GRC-EUANGELION  
**Strong’s:** G2098  
**Entry status:** approved  
**Last reviewed:** Version 2.0 foundation  
**Human editor:** FLT editor

**Semantic range.** Good news, glad tidings, announcement of good news; in the New Testament, especially the message concerning Jesus and, by extension, the work or cause of announcing that message.

**Historical / cultural considerations.** Public announcements of victory or royal news form part of the wider cultural background: **possible to probable**, depending on passage. This is not the controlling lexical meaning of every occurrence.

**Theological significance.** Central Christian proclamation. The main target-reader risk is that *gospel* functions as unexplained church jargon.

**Default posture.** Render by meaning.

### Sense 1 — The message concerning Jesus

**Sense status:** approved  
**Definition:** The proclaimed good news about what God has done through Jesus Christ.  
**Recognition cues:** Object of believing, hearing, defending, proclaiming, receiving, or advancing.  
**Approved renderings:** `the good news`; `the good news about Jesus` where the referent needs clarification.  
**Restricted renderings:**
- `gospel` — reading text: normally avoid as opaque church vocabulary; note or study layer: permitted;
- `the Gospel` — avoid as an unexplained institutional title.

**In-text clarification boundary:** May identify Jesus as the subject of the message where context requires it. Do not insert a summary of the gospel’s content unless the source does so.  
**Footnote triggers:** Optional first-use note connecting *the good news* with the traditional term *gospel*.  
**Literary / discourse links:** Repetition across Philippians should remain visible.  
**Evidence basis:** lexical range; Philippians discourse pattern; prior FLT decisions.  
**Confidence:** high  
**Approved scope:** Philippians occurrences where the message itself is in view.  
**Decision Log references:** Philippians 1 precedents.  
**Worked examples:** Phil 1:5 — `the good news`; Phil 1:27 — `the good news`.  
**Exceptions / unresolved questions:** None within approved scope.

### Sense 2 — The work or cause of spreading the message

**Sense status:** working  
**Definition:** The mission, work, or shared cause connected with proclaiming the good news.  
**Recognition cues:** Partnership, advance, defense, labor, or suffering connected with the proclamation.  
**Approved renderings:** `the work of spreading the good news`; `the good-news mission`; another natural phrase preserving the mission sense.  
**Restricted renderings:** Do not expand to a mission phrase when the syntax refers only to the message itself.  
**In-text clarification boundary:** The activity may be named only when the discourse clearly shifts from message to mission.  
**Footnote triggers:** Normally none.  
**Literary / discourse links:** Preserve connection with sense 1 through the phrase *good news*.  
**Evidence basis:** discourse and collocation.  
**Confidence:** moderate  
**Approved scope:** Philippians, subject to verse-level review.  
**Decision Log references:** — pending —  
**Worked examples:** Phil 1:5 may carry a partnership-in-mission nuance.  
**Exceptions / unresolved questions:** Exact phrasing remains contextual.

**Cross-sense cautions.** Do not turn every occurrence into a mission phrase.  
**Lemma-family links.** εὐαγγελίζω and related proclamation terms.  
**Global unresolved questions.** None requiring current escalation.

---

## ἅγιος · hagios

**Internal lemma ID:** FLT-GRC-HAGIOS  
**Strong’s:** G40  
**Entry status:** approved  
**Last reviewed:** Version 2.0 foundation  
**Human editor:** FLT editor

**Semantic range.** Holy, set apart, consecrated; as a plural substantive, the people belonging to God.

**Historical / cultural considerations.** Holiness language grows from Israel’s Scriptures and covenant identity: established.  
**Theological significance.** The danger is that *saints* suggests canonized spiritual elites rather than ordinary believers belonging to God.

**Default posture.** Sense-dependent.

### Sense 1 — God’s people as a group

**Sense status:** approved  
**Definition:** Believers identified as people set apart for and belonging to God.  
**Recognition cues:** Substantival plural referring to a congregation or group of believers.  
**Approved renderings:** `God’s holy people`; `God’s people` only where the holiness connection remains visible nearby.  
**Restricted renderings:**
- `saints` — reading text: avoid as misleading to religion-naive readers;
- `the holy ones` — normally avoid as stiff and opaque.

**In-text clarification boundary:** May express belonging to God, but must not recast the phrase as moral perfection.  
**Footnote triggers:** Optional first-use note: “This word is often translated ‘saints.’”  
**Literary / discourse links:** Preserve links with holiness vocabulary when the author develops the theme.  
**Evidence basis:** lexical, Septuagintal, discourse, precedent.  
**Confidence:** high  
**Approved scope:** Congregational address such as Phil 1:1.  
**Decision Log references:** Philippians 1:1.  
**Worked examples:** Phil 1:1 — `God’s holy people`.  
**Exceptions / unresolved questions:** Shorter `God’s people` requires contextual justification.

### Sense 2 — Holy as an adjective

**Sense status:** working  
**Definition:** Belonging to God, morally pure, or set apart, according to context.  
**Recognition cues:** Modification of God, Spirit, conduct, place, object, or calling.  
**Approved renderings:** `holy`; `set apart for God` where *holy* alone would not communicate.  
**Restricted renderings:** Do not flatten every occurrence to `special` or `religious`.  
**In-text clarification boundary:** Explain only the contextual force already carried by the adjective.  
**Footnote triggers:** Weighted-term note when needed.  
**Literary / discourse links:** Coordinate with ἁγιάζω and ἁγιασμός.  
**Evidence basis:** lexical and contextual.  
**Confidence:** high  
**Approved scope:** Context-dependent.  
**Decision Log references:** — pending —  
**Worked examples:** — pending —  
**Exceptions / unresolved questions:** Moral-purity and consecration senses must not be collapsed mechanically.

**Cross-sense cautions.** Belonging and moral holiness overlap but are not identical.  
**Lemma-family links.** ἁγιάζω, ἁγιασμός.  
**Global unresolved questions.** None blocking current Philippians work.

---

## δοῦλος · doulos

**Internal lemma ID:** FLT-GRC-DOULOS  
**Strong’s:** G1401  
**Entry status:** working  
**Last reviewed:** Version 2.0 foundation  
**Human editor:** FLT editor

**Semantic range.** A slave or person bound to a master; by extension, a servant under obligation; metaphorically, one under the controlling power of a master, sin, law, or another force.

**Historical / cultural considerations.** First-century slavery differed in significant ways from modern race-based chattel slavery, while still involving ownership, coercion, and loss of autonomy: established.  
**Theological significance.** English *slave* may preserve ownership but import misleading modern associations; *servant* may communicate role but soften bondage.

**Default posture.** Sense-dependent.

### Sense 1 — Apostolic self-designation in relation to Christ

**Sense status:** approved  
**Definition:** A self-description of belonging to Christ and being bound to His service.  
**Recognition cues:** Authorial self-identification with Christ or God as master.  
**Approved renderings:** `servant`; `servants`, with a weighted-term note where needed.  
**Restricted renderings:**
- `bondservant` — avoid as opaque church language;
- `slave` — not automatic in self-designation; may distort the rhetorical effect for the target reader.

**In-text clarification boundary:** The body may communicate service and belonging. Do not automatically add *willing*, *total*, or *absolute* unless context supports those nuances.  
**Footnote triggers:** At first significant use, explain that the Greek term describes someone bound to a master’s service and belonging.  
**Literary / discourse links:** Preserve master–servant relations when κύριος is part of the argument.  
**Evidence basis:** lexical, social-historical, rhetorical, precedent.  
**Confidence:** high  
**Approved scope:** Phil 1:1 and comparable apostolic self-designation, subject to context.  
**Decision Log references:** Philippians 1:1.  
**Worked examples:** Phil 1:1 — `servants of Christ Jesus` with explanatory note.  
**Exceptions / unresolved questions:** Comparable passages outside Philippians require scope confirmation.

### Sense 2 — Literal enslaved person

**Sense status:** working  
**Definition:** A person legally or socially owned or controlled by another.  
**Recognition cues:** Household, economic, legal, narrative, or parabolic setting.  
**Approved renderings:** `slave`; `enslaved person`; `servant` only where household function rather than ownership is central and the context supports it.  
**Restricted renderings:** Do not soften ownership where it is important to the passage.  
**In-text clarification boundary:** Historical explanation belongs in a note.  
**Footnote triggers:** Cultural note when modern readers are likely to misread the institution.  
**Literary / discourse links:** Coordinate with κύριος and freedom/bondage imagery.  
**Evidence basis:** lexical and historical.  
**Confidence:** moderate  
**Approved scope:** Passage-specific.  
**Decision Log references:** — pending —  
**Worked examples:** — pending —  
**Exceptions / unresolved questions:** Household-code occurrences require human review until precedents develop.

### Sense 3 — Metaphorical bondage

**Sense status:** working  
**Definition:** Being controlled or dominated by sin, law, fear, corruption, or another power.  
**Recognition cues:** Abstract or moral master; contrast with freedom.  
**Approved renderings:** `enslaved to`; `a slave to`; another forceful bondage expression.  
**Restricted renderings:** `servant of` where the bondage force would be flattened.  
**In-text clarification boundary:** May name the controlling power when the syntax does so.  
**Footnote triggers:** Normally none.  
**Literary / discourse links:** Preserve bondage/freedom contrast.  
**Evidence basis:** metaphor and discourse.  
**Confidence:** high  
**Approved scope:** Context-dependent.  
**Decision Log references:** — pending —  
**Worked examples:** — pending —  
**Exceptions / unresolved questions:** None.

**Cross-sense cautions.** Never move automatically between *servant* and *slave* without classifying the sense.  
**Lemma-family links.** δουλεύω, δουλεία.  
**Global unresolved questions.** Household and slavery texts require further worked precedents.

---

## ἐπίσκοπος · episkopos

**Internal lemma ID:** FLT-GRC-EPISKOPOS  
**Strong’s:** G1985  
**Entry status:** working  
**Last reviewed:** Version 2.0 foundation  
**Human editor:** FLT editor

**Semantic range.** One who watches over, supervises, cares for, or leads; in some New Testament settings, a recognized community role.

**Historical / cultural considerations.** The exact development of later ecclesiastical offices should not be read backward automatically into every New Testament occurrence: established caution.  
**Theological significance.** Traditional terms such as *bishop* may import later institutional structures.

**Default posture.** Render by function.

### Sense 1 — Local congregation leadership in Philippians 1:1

**Sense status:** approved  
**Definition:** People with recognized leadership and oversight responsibility in the Philippian congregation.  
**Recognition cues:** Plural role designation paired with διάκονοι in the greeting.  
**Approved renderings:** `leaders`.  
**Restricted renderings:**
- `bishop` — avoid in this scope as anachronistically institutional;
- `overseer` — permitted only if the target reader can understand it naturally; not preferred in Phil 1:1.

**In-text clarification boundary:** Do not define the office in the body.  
**Footnote triggers:** Optional role note if needed.  
**Literary / discourse links:** Pair naturally with διάκονοι.  
**Evidence basis:** lexical function, local context, precedent.  
**Confidence:** high  
**Approved scope:** Phil 1:1 congregational greeting.  
**Decision Log references:** Philippians 1:1.  
**Worked examples:** Phil 1:1 — `leaders`.  
**Exceptions / unresolved questions:** Does not automatically govern the Pastoral Epistles.

### Sense 2 — Developed ministry-role contexts

**Sense status:** working  
**Definition:** A recognized church role involving oversight, care, and leadership.  
**Recognition cues:** Qualification lists, appointment, church order.  
**Approved renderings:** — pending —  
**Restricted renderings:** Do not import Phil 1:1 automatically.  
**In-text clarification boundary:** — pending —  
**Footnote triggers:** — pending —  
**Literary / discourse links:** Coordinate with πρεσβύτερος where relevant.  
**Evidence basis:** — pending —  
**Confidence:** provisional  
**Approved scope:** none yet.  
**Decision Log references:** — pending —  
**Worked examples:** — pending —  
**Exceptions / unresolved questions:** Pastoral Epistles require separate adjudication.

**Cross-sense cautions.** A functional label in one congregation may not equal a fully developed later office title.  
**Lemma-family links.** ἐπισκοπή, ἐπισκοπέω.  
**Global unresolved questions.** Relationship to elder terminology and office development.

---

## διάκονος · diakonos

**Internal lemma ID:** FLT-GRC-DIAKONOS  
**Strong’s:** G1249  
**Entry status:** working  
**Last reviewed:** Version 2.0 foundation  
**Human editor:** FLT editor

**Semantic range.** Servant, helper, assistant, minister, or one who carries out a service; in some contexts, a recognized church role.

**Historical / cultural considerations.** Later office terminology should not be imported automatically into all occurrences: established caution.  
**Theological significance.** *Deacon* may be opaque to religion-naive readers and may suggest a later office structure.

**Default posture.** Render by function.

### Sense 1 — Congregational role in Philippians 1:1

**Sense status:** approved  
**Definition:** People serving in a recognized assisting role alongside the congregation’s leaders.  
**Recognition cues:** Plural role designation paired with ἐπίσκοποι in the greeting.  
**Approved renderings:** `assistants`.  
**Restricted renderings:**
- `deacons` — avoid in this scope as opaque and tradition-loaded;
- `servants` — possible elsewhere, but may obscure the role contrast in Phil 1:1.

**In-text clarification boundary:** Do not add a job description.  
**Footnote triggers:** Optional first-use role note.  
**Literary / discourse links:** Pair naturally with `leaders`.  
**Evidence basis:** lexical function, context, precedent.  
**Confidence:** high  
**Approved scope:** Phil 1:1 congregational greeting.  
**Decision Log references:** Philippians 1:1.  
**Worked examples:** Phil 1:1 — `assistants`.  
**Exceptions / unresolved questions:** Does not automatically govern formal office contexts elsewhere.

### Sense 2 — General service or ministry

**Sense status:** working  
**Definition:** A person who serves, assists, or carries out a task.  
**Recognition cues:** Non-office context, personal service, mission work, practical help.  
**Approved renderings:** `servant`; `helper`; `assistant`; context-specific verbal rendering.  
**Restricted renderings:** Do not default to `deacon`.  
**In-text clarification boundary:** Express the service function without importing institutional status.  
**Footnote triggers:** Normally none.  
**Literary / discourse links:** Coordinate with διακονία and διακονέω.  
**Evidence basis:** lexical and contextual.  
**Confidence:** high  
**Approved scope:** Context-dependent.  
**Decision Log references:** — pending —  
**Worked examples:** — pending —  
**Exceptions / unresolved questions:** Office-context boundary remains open.

**Cross-sense cautions.** Do not assume a formal office where the context describes ordinary service.  
**Lemma-family links.** διακονία, διακονέω.  
**Global unresolved questions.** Developed office use in the Pastoral Epistles.

---

## χάρις · charis

**Internal lemma ID:** FLT-GRC-CHARIS  
**Strong’s:** G5485  
**Entry status:** working  
**Last reviewed:** Version 2.0 foundation  
**Human editor:** FLT editor

**Semantic range.** Favor, goodwill, kindness, gracious action, gift, benefit, privilege, gratitude, or thanks, depending on context.

**Historical / cultural considerations.** Patronage and gift-exchange backgrounds may illuminate some uses: probable in certain contexts, disputed as a universal controlling frame.  
**Theological significance.** Major Pauline term. Both *grace* and dynamic alternatives can mislead when used mechanically.

**Default posture.** Sense-dependent; retain and teach where useful, render by meaning where the contextual function is concrete.

### Sense 1 — Divine favor or generous kindness

**Sense status:** working  
**Definition:** God’s favor or gracious kindness toward people.  
**Recognition cues:** Soteriological, relational, or enabling contexts.  
**Approved renderings:** `grace`; `favor`; `generous kindness`; `God’s kindness`, according to context.  
**Restricted renderings:**
- `undeserved favor` — not automatic; *undeserved* must be warranted by context and theology, not inserted as part of the bare lexical gloss;
- `grace` — do not retain as an empty church token when the sentence provides no help.

**In-text clarification boundary:** May communicate favor or generous kindness. Do not add a mini-definition of grace or a patronage theory.  
**Footnote triggers:** Weighted-term note when retaining *grace* without sufficient contextual explanation, or when rendering by meaning where readers may expect the traditional term.  
**Literary / discourse links:** Preserve links with χαρίζομαι and related gift language when argumentatively important.  
**Evidence basis:** lexical, discourse, theological.  
**Confidence:** moderate  
**Approved scope:** Contextual only.  
**Decision Log references:** — pending —  
**Worked examples:** Phil 1:2 greeting remains under book-level review.  
**Exceptions / unresolved questions:** Book-level consistency and when *grace* should be retained.

### Sense 2 — Greeting formula

**Sense status:** working  
**Definition:** Epistolary blessing formula invoking divine favor.  
**Recognition cues:** Letter opening or closing formula.  
**Approved renderings:** `grace`; a natural rendered equivalent where book policy supports it.  
**Restricted renderings:** Do not force a paraphrase that destroys rhythm or formula recognition.  
**In-text clarification boundary:** No explanatory expansion in the greeting.  
**Footnote triggers:** Optional first-use note.  
**Literary / discourse links:** Maintain book-level consistency unless contextual reason requires variation.  
**Evidence basis:** epistolary convention and precedent.  
**Confidence:** high  
**Approved scope:** Letter greetings, pending human lock.  
**Decision Log references:** — pending —  
**Worked examples:** Phil 1:2.  
**Exceptions / unresolved questions:** Whether FLT retains *grace* in all greetings.

### Sense 3 — Concrete gift, benefit, or privilege

**Sense status:** working  
**Definition:** A particular gift, benefit, calling, or privilege granted.  
**Recognition cues:** Article, possessive, sharing language, ministry or suffering context.  
**Approved renderings:** `gift`; `privilege`; `benefit`; context-specific phrase.  
**Restricted renderings:** `grace` where it hides the concrete benefit.  
**In-text clarification boundary:** Name only the benefit supported by the context.  
**Footnote triggers:** Alternative-rendering or weighted-term note where the sense is disputed.  
**Literary / discourse links:** Coordinate with gift-language family.  
**Evidence basis:** syntax and discourse.  
**Confidence:** moderate  
**Approved scope:** Passage-specific.  
**Decision Log references:** — pending —  
**Worked examples:** Phil 1:7 remains under review as a possible shared privilege.  
**Exceptions / unresolved questions:** Exact sense in Phil 1:7.

### Sense 4 — Thanks or gratitude

**Sense status:** approved  
**Definition:** Gratitude or thanks directed toward another.  
**Recognition cues:** Expressions of thanksgiving.  
**Approved renderings:** `thanks`; `thank God`; context-specific gratitude language.  
**Restricted renderings:** `grace` — incorrect for this sense.  
**In-text clarification boundary:** None beyond natural English.  
**Footnote triggers:** None normally.  
**Literary / discourse links:** — none —  
**Evidence basis:** lexical and idiomatic.  
**Confidence:** high  
**Approved scope:** Clear gratitude contexts.  
**Decision Log references:** — pending —  
**Worked examples:** — pending —  
**Exceptions / unresolved questions:** None.

**Cross-sense cautions.** Do not assume all Pauline χάρις occurrences share one sense or one English rendering.  
**Lemma-family links.** χαρίζομαι, χάρισμα.  
**Global unresolved questions.** Greeting policy and Phil 1:7.

---

## πίστις · pistis

**Internal lemma ID:** FLT-GRC-PISTIS  
**Strong’s:** G4102  
**Entry status:** working  
**Last reviewed:** Version 2.0 foundation  
**Human editor:** FLT editor

**Semantic range.** Trust, faith, faithfulness, reliability, loyalty, or the content of what is believed.

**Historical / cultural considerations.** Loyalty and trust relationships may be important in some contexts: probable, but not a universal replacement for the term.  
**Theological significance.** High in Pauline soteriology and especially in disputed πίστις Χριστοῦ constructions.

**Default posture.** Sense-dependent, leaning toward concrete relational language where appropriate.

### Sense 1 — Personal trust or reliance

**Sense status:** working  
**Definition:** Relying on God, Christ, or another trustworthy person.  
**Recognition cues:** Object marked by εἰς or ἐπί, personal object, salvation or allegiance context.  
**Approved renderings:** `trust`; `trust in`; `faith` where context makes the relational sense clear and the term earns retention.  
**Restricted renderings:**
- `belief` where it reduces active reliance to mental assent;
- automatic `faith` in every occurrence.

**In-text clarification boundary:** May identify the object of trust. Do not add loyalty, obedience, or perseverance unless context supports it.  
**Footnote triggers:** Weighted-term note where `trust` replaces an expected `faith`; alternative note where a major interpretive option remains.  
**Literary / discourse links:** Preserve links with πιστεύω when the author develops a chain.  
**Evidence basis:** lexical, syntactic, discourse.  
**Confidence:** moderate  
**Approved scope:** Passage-specific.  
**Decision Log references:** Phil 1:29 verb precedent informs but does not control the noun globally.  
**Worked examples:** Phil 1:29 πιστεύειν — `trust in Him`.  
**Exceptions / unresolved questions:** Noun and verb must not be collapsed mechanically.

### Sense 2 — Faithfulness or reliability

**Sense status:** working  
**Definition:** The quality of being faithful, loyal, or reliable.  
**Recognition cues:** Predicate quality, human or divine character, conduct context.  
**Approved renderings:** `faithfulness`; `reliability`; `loyalty`, according to context.  
**Restricted renderings:** `faith` where a quality rather than an act of trust is meant.  
**In-text clarification boundary:** Do not infer covenant loyalty or obedience unless context supports it.  
**Footnote triggers:** Alternative note in disputed constructions.  
**Literary / discourse links:** Coordinate with πιστός.  
**Evidence basis:** lexical and contextual.  
**Confidence:** moderate  
**Approved scope:** Clear quality contexts.  
**Decision Log references:** — pending —  
**Worked examples:** — pending —  
**Exceptions / unresolved questions:** πίστις Χριστοῦ remains unresolved.

### Sense 3 — The content or cause of belief

**Sense status:** working  
**Definition:** The faith, message, or body of belief held by a community.  
**Recognition cues:** Definite article, communal confession, defense of “the faith.”  
**Approved renderings:** `the faith`; `what we believe`; `the message we hold to`, according to context.  
**Restricted renderings:** Capitalized institutional `the Faith` unless context clearly requires it.  
**In-text clarification boundary:** Do not summarize the whole doctrinal content.  
**Footnote triggers:** Weighted-term note as needed.  
**Literary / discourse links:** Preserve argument links across a passage.  
**Evidence basis:** lexical and discourse.  
**Confidence:** moderate  
**Approved scope:** Passage-specific.  
**Decision Log references:** — pending —  
**Worked examples:** — pending —  
**Exceptions / unresolved questions:** None beyond passage classification.

**Cross-sense cautions.** Do not let the familiar English word *faith* hide the difference between trust, faithfulness, and content of belief.  
**Lemma-family links.** πιστεύω, πιστός.  
**Global unresolved questions.** πίστις Χριστοῦ must be escalated and never silently resolved by the swarm.

---

# 7. High-Priority Stub Entries

The following terms are registered but not yet sufficiently worked. The swarm must classify provisionally from context, apply the general Style Guide, and escalate every significant occurrence until the relevant sense is approved.

## δικαιοσύνη · dikaiosynē

**Internal lemma ID:** FLT-GRC-DIKAIOSYNE  
**Strong’s:** G1343  
**Entry status:** stub

**Semantic range.** Righteousness, justice, right conduct, right standing, or God’s own rightness, depending on context.  
**Theological significance.** Critical in Pauline soteriology.  
**Default posture.** Render by meaning provisionally; mandatory human review.  
**Global unresolved questions.** Forensic status, ethical conduct, covenantal or divine-attribute senses; whether and when *righteousness* is retained.

## δικαιόω · dikaioō

**Internal lemma ID:** FLT-GRC-DIKAIOO  
**Strong’s:** G1344  
**Entry status:** stub

**Semantic range.** Declare right, vindicate, acquit, show to be right, or place in a right relation, depending on context.  
**Theological significance.** Critical. Must be coordinated with δικαιοσύνη and δίκαιος.  
**Default posture.** Do not resolve independently from the lemma family.  
**Global unresolved questions.** Declare-right versus make-right language, forensic and demonstrative uses.

## σάρξ · sarx

**Internal lemma ID:** FLT-GRC-SARX  
**Strong’s:** G4561  
**Entry status:** stub

**Semantic range.** Flesh, body, human descent, human limitation, merely human capability, or the sphere opposed to the Spirit.  
**Theological significance.** Critical in Pauline anthropology.  
**Default posture.** Render by context; mandatory review when the Spirit/flesh contrast or sinful-human-sphere sense is live.  
**Global unresolved questions.** Whether any single phrase can responsibly handle the Pauline theological sense.

## ἀπολύτρωσις / λύτρωσις · apolytrōsis / lytrōsis

**Internal lemma IDs:** FLT-GRC-APOLYTROSIS / FLT-GRC-LYTROSIS  
**Strong’s:** G629 / G3085  
**Entry status:** stub

**Semantic range.** Release, rescue, redemption, liberation, or ransoming, depending on context.  
**Theological significance.** High.  
**Default posture.** Render by meaning provisionally; preserve rescue-and-release force.  
**Global unresolved questions.** When buying-back imagery is active and when *redemption* should be retained and taught.

## ἱλαστήριον / ἱλασμός · hilastērion / hilasmos

**Internal lemma IDs:** FLT-GRC-HILASTERION / FLT-GRC-HILASMOS  
**Strong’s:** G2435 / G2434  
**Entry status:** stub

**Semantic range.** Mercy-seat language, atoning means, expiation, propitiation, or sacrifice dealing with sin, depending on form and context.  
**Theological significance.** Critical.  
**Default posture.** No worker-agent resolution. Mandatory human adjudication with full lexical, cultic, intertextual, and theological review.  
**Global unresolved questions.** Mercy seat, atoning sacrifice, means of reconciliation, expiation/propitiation balance.

---

# 8. Amendment and Growth

The Matrix grows passage by passage.

- Worker agents may read but may not edit the Matrix.
- New senses, renderings, restrictions, and precedents enter only through human adjudication.
- Decision Log entries supply the authority for approved scope.
- Working senses may become approved after sufficient evidence and human review.
- Approved senses may be reopened when new evidence or conflicting contexts require it.
- The architecture of the Matrix is stable; its lexical content remains living and expandable.

Consistency in FLT is not one Greek word matched to one English word. It is disciplined, retrievable accountability to what the word means and does in each context.

---

*End of Contextual Lexical Matrix v2.0.*