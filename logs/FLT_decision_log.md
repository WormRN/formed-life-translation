# FLT — Decision Log

**Project:** Formed Life Translation (FLT)  
**Document type:** Decision Log — record of significant translation decisions  
**Status:** active  
**Created:** 2026-06-12  

> The Decision Log records why important wording choices were made. It is not the translation itself, not the glossary, and not the style guide. It preserves precedent so the same issue does not have to be re-decided from scratch every time it appears.

---

## How to Use This File

Create a new entry whenever a translation choice is significant enough that it may affect future verses, the glossary, the style guide, a footnote, or reader understanding.

Do **not** log every small wording change. Log decisions that create precedent.

Examples worth logging:

- A recurring Greek term receives a preferred rendering.
- FLT departs from a traditional rendering.
- A theological term is kept, unpacked, or footnoted.
- A textual variant affects the translation.
- A style rule is created or clarified.
- A reader-comprehension issue changes the body text.

---

## Entry Template

```md
## Book Chapter:Verse — Issue

**Date:**  
**Status:** provisional / confirmed / reopened  

**Issue:**  

**Options considered:**  

**Decision:**  

**Reason:**  

**Final wording:**  

**Footnotes needed:**  

**Glossary update needed:**  

**Style Guide update needed:**  

**Revisit trigger:**  
```

---

# Philippians

## Phil 1:1–2 — Greeting and Church Role Terms

**Original decision date:** 2026-06-12  
**Process-revalidation date:** 2026-07-24  
**Status:** confirmed for the Phase 4 benchmark; common-goal drafting and exact-candidate audit complete

**Issue:**  
How to render the opening sender line, δοῦλοι, ἅγιοι, ἐν Χριστῷ Ἰησοῦ, ἐπισκόποις καὶ διακόνοις, and χάρις καὶ εἰρήνη.

**Options considered:**  

- “From Paul and Timothy” vs “This letter is from Paul and Timothy”
- “servants,” “slaves,” “bondservants,” or “who serve” for δοῦλοι
- “God’s holy people” vs “saints” for ἅγιοι
- “who belong to Christ Jesus” vs “in Christ Jesus” vs “who are united with Christ Jesus”
- “overseers and deacons,” “leaders and assistants,” or “church leaders and those who serve with them”
- retaining “grace and peace” vs unpacking the greeting in the body text

**Decision:**  
Retain the current FLT unchanged after reviewing the valid common-goal A/B/C recovery drafts.

**Final wording:**  

> **1** This letter is from Paul and Timothy, servants of Christ Jesus. We are writing to all of God’s holy people in Philippi who are united with Christ Jesus, including your church leaders and those who serve with them.  
> **2** May God our Father and the Lord Jesus Christ give you grace and peace.

**Reason:**  
“This letter is from” immediately identifies the epistolary setting for a religion-naive reader. “Servants” remains clear in the body text while a note can preserve the allegiance and belonging force of δοῦλοι. “God’s holy people” avoids suggesting an elite class of saints. “United with Christ Jesus” communicates the defining relationship expressed by ἐν Χριστῷ Ἰησοῦ. “Church leaders and those who serve with them” gives ordinary readers a functional picture of the two recognized service groups without requiring later church vocabulary. Verse 2 naturally preserves the blessing and its shared source in God the Father and the Lord Jesus Christ.

The replacement drafting evidence used one identical constitutional mission for Claude, GPT-5.6 Sol, and Gemini, with the current FLT and comparison translations hidden. The human editor reaffirmed the current FLT. The exact sealed candidate then passed all three semantic-floor auditors with zero blocking defects.

**Process evidence:**  

- Common-goal recovery run: GitHub Actions 30073170869
- Exact-candidate audit: GitHub Actions 30113294398
- Audit result: three of three auditors eligible; zero blocking defects

**Footnotes needed:**  

- **servants** — The word means more than hired workers. Paul and Timothy are bound to Christ by loyal allegiance and belong fully to His service.
- **Christ** — Christ means “Anointed One,” the promised Messiah.
- **God’s holy people** — God’s people are “holy” because they have been set apart as His own.
- **church leaders and those who serve with them** — The words refer to two recognized groups serving the church: those who gave care and direction and those who served in practical ministry.

**Glossary or Matrix update needed:**  

- Preserve Phil 1:1 as a scoped example for “servants,” “God’s holy people,” and “united with Christ Jesus.”
- Record “church leaders and those who serve with them” as the confirmed functional rendering for ἐπισκόποις καὶ διακόνοις in this verse.

**Style Guide update needed:**  
Epistolary openings may use either “From...” or “This letter is from...” depending on flow and clarity.

**Revisit trigger:**  
Revisit only if the full Philippians 1 read-aloud or target-reader review exposes a concrete comprehension or oral-flow problem.


---

## Phil 2:5–11 — Christ’s Divine Status, Self-Emptying, and Humble Obedience

**Date:** 2026-07-21  
**Status:** confirmed for the Phase 4 benchmark

**Issue:**  
How to express Christ’s divine status, equality with God, self-emptying, servant nature, true humanity, and self-humbling in clear reader-facing English without implying that He ceased to be God.

**Options considered:**  

- “did not treat His equality with God as something to use for His own advantage” and the alternate interpretive tradition “did not cling to equality with God”
- “emptied Himself,” “gave up His divine privileges,” and “chose not to exercise His divine rights”
- “He lived in humble obedience” and “He humbled Himself in obedience”

**Decision:**  
Use “chose not to exercise His divine rights” as the contextual rendering of the kenosis language. Restore the explicit reflexive action in verse 8: “He humbled Himself in obedience.”

**Reason:**  
The three-reader reconstruction and three-agent semantic-floor audit consistently recovered voluntary nonuse of divine privilege without loss of deity. “Chose not to exercise” protects the continuing possession of divine status more clearly than language of surrendering or relinquishing it. The verse 8 revision more directly preserves “He humbled Himself” while remaining natural English.

**Final benchmark wording:**  

> Though He existed in the very nature of God, He did not treat His equality with God as something to use for His own advantage. Instead, He chose not to exercise His divine rights. He took on the true nature of a servant and was born as a human being. And as a man, He humbled Himself in obedience all the way to death—His death on a cross.

**Footnotes needed:**  
Yes. Explain the meaningful interpretive alternative in verse 6 and clarify that verse 7 describes voluntary nonexercise of divine rights, not loss of deity. Preserve the audit rationale for future reviewers.

**Glossary update needed:**  
Add contextual precedent entries for κενόω and μορφή after the benchmark corpus is reviewed as a whole.

**Style Guide update needed:**  
Add a general footnote-transparency policy: notes may be numerous when they document consequential interpretive choices, alternatives, precedent, or safeguards against misunderstanding. Notes should remain accessible to religion-naive readers and need not reproduce the technical scale of the NET Full Notes.

**Revisit trigger:**  
Revisit during whole-letter oral-flow review, theological review of the benchmark corpus, or if later κενόω/μορφή contexts expose a conflict.


---

## Phil 2:12–18 — Living Out Salvation and Displaying the Life-Giving Message

**Date:** 2026-07-23  
**Status:** confirmed for the Phase 4 benchmark

**Issue:**  
How to express the believers’ active response to salvation without implying that salvation is earned, and how to render ἐπέχοντες in the visible-witness context of verses 15–16.

**Options considered:**  

- “work out your salvation” and “keep living out your salvation”
- “holding firmly to,” “holding out,” and “display” for ἐπέχω
- preserving “I did not run or work for nothing” or consolidating the two images as “my hard work wasn’t wasted”

**Decision:**  
Use “keep living out your salvation” in verse 12 and “as your lives display the message that gives life” in verse 16. Consolidate Paul’s running and labor language as “my hard work wasn’t wasted.”

**Reason:**  
Verse 13 immediately grounds the believers’ obedience in God’s active work, so “living out” communicates salvation brought into practice rather than earned by effort. Mounce recognizes “present, exhibit, display” as a valid sense of ἐπέχω, and the surrounding imagery describes God’s children visibly shining within a corrupt generation. “Your lives display” therefore expresses embodied communal witness. The running image is not independently developed in the paragraph; “my hard work wasn’t wasted” preserves Paul’s meaning with less friction. Three reader reconstructions and three semantic-floor audits found no blocking defect and required no repair.

**Final wording:**  

> **12** Because of this, my dear friends, continue to obey as you always have. Now that I am away from you, it is even more important that you do so. Keep living out your salvation with deep reverence and awe.  
> **13** For God is at work in all of you. He gives you both the desire and the power to do what pleases Him.  
> **14** Do everything without complaining or arguing with one another,  
> **15** so that no one can find fault with you. As God’s pure and innocent children, you will stand out in a crooked and corrupt generation, shining among them like stars in the dark sky  
> **16** as your lives display the message that gives life. Then, when Christ returns, I will have reason to rejoice that my hard work wasn’t wasted.  
> **17** Your faithful service is like a holy sacrifice offered to God. But even if my life is poured out like an offering over your sacrifice, I am full of joy, and I share this joy with all of you.  
> **18** In the same way, you too should be glad and share your joy with me.

**Footnotes needed:**  
Consider a note on “living out your salvation” clarifying that God produces both desire and power, and a note identifying “hold firmly to” or “hold out” as meaningful alternatives for verse 16.

**Glossary update needed:**  
Add contextual precedent entries for κατεργάζομαι and ἐπέχω after the benchmark corpus is reviewed as a whole.

**Style Guide update needed:**  
None at this stage.

**Revisit trigger:**  
Revisit during whole-chapter oral-flow review, chapter-level theological review, or if a later occurrence exposes a conflict.

---

## Phil 2:19–24 — Timothy’s Shared Concern and Proven Character

**Date:** 2026-07-24  
**Status:** process-revalidated and approved as a unit

**Issue:**  
How to express Paul’s hope and confidence in the Lord, Timothy’s uniquely shared concern, the contrast with self-interest, and the father–son service image in clear natural English.

**Decision:**  
Begin verse 19 with “Trusting in the Lord Jesus” and verse 24 with “And because I trust in the Lord.” Retain “shares my heart,” “what matters to Jesus Christ,” and the father–son service image.

**Reason:**  
The revised wording makes Paul’s dependence on the Lord explicit in natural English at both ends of the paragraph. Timothy’s shared heart and genuine care embody the concern for others commanded earlier in the chapter. The complete human-selected unit passed three independent semantic-floor auditors with zero blocking defects.

**Final wording:**

> **19** Trusting in the Lord Jesus, I hope to send Timothy to you soon. Then I will be deeply encouraged when I hear how you are doing.  
> **20** He is the only one I have who shares my heart and genuinely cares about your well-being.  
> **21** Everyone else is looking out for their own interests instead of what matters to Jesus Christ.  
> **22** But you already know Timothy’s proven character. Like a son working at his father’s side, he has served with me to spread the good news.  
> **23** So I hope to send him as soon as I see how my own situation turns out.  
> **24** And because I trust in the Lord, I am confident that I myself will come soon too.

**Audit:**  
GitHub run 30123491843; three of three auditors eligible; zero blocking defects.

**Footnotes needed:**  
None presently required.

**Glossary update needed:**  
Consider a contextual precedent for ἰσόψυχος after the benchmark corpus is reviewed as a whole.

**Style Guide update needed:**  
None.

**Revisit trigger:**  
Whole-chapter oral-flow review or a later contextual conflict.

---

## Phil 2:25–30 — Epaphroditus’s Service, Illness, and Return

**Date:** 2026-07-24  
**Status:** confirmed and frozen for the Phase 4 benchmark

**Issue:**  
How to describe Epaphroditus’s relationship to Paul and the Philippian church, his near-fatal illness, God’s mercy, Paul’s sorrow, and the honor due faithful servants.

**Decision:**  
Accept the six-verse unit with the human-authorized chapter-level oral-flow repair in verse 27. Use “but on me too” rather than the doubled “but also on me too.” In verse 28, use “lessen my own sorrow” rather than “relieve my own anxiety.”

**Reason:**  
The wording presents Epaphroditus as brother, coworker, fellow soldier, and the church’s messenger in natural language. Removing the doubled additive in verse 27 improves oral English without changing the source relationship. “Lessen my own sorrow” preserves Paul’s grief rather than changing it into anxiety. The final repaired exact candidate passed three independent semantic-floor auditors with zero blocking defects, and the human editor explicitly accepted it.

**Final wording:**

> **25** But I felt it was necessary to send Epaphroditus back to you. He is my brother, my coworker, and my fellow soldier, as well as the messenger you sent to take care of my needs.  
> **26** He has been longing to see all of you, and he has been deeply troubled because he knows that news of his illness worried you.  
> **27** He really was sick and nearly died. But God showed mercy to him, and not only on him but on me too, so that I would not have one heartbreak on top of another.  
> **28** So I am eagerly sending him back to you. Seeing him again will bring you joy, and it will lessen my own sorrow.  
> **29** So welcome him with great joy in the Lord, and show high honor to people like him.  
> **30** He risked his life and came close to death for the work of Christ, stepping in to give me in person the help that you were too far away to give.

**Audit:**  
Initial corrected-unit audit: GitHub run 30065182431. Final verse 27 repaired-candidate audit: GitHub run 30126332658. Three of three auditors eligible; zero blocking defects.

**Footnotes needed:**  
Consider a note explaining Epaphroditus’s role as the Philippians’ authorized messenger and servant.

**Glossary update needed:**  
Consider contextual precedents for ἀπόστολος in a non-Twelve messenger sense and λειτουργός as practical ministry after benchmark review.

**Style Guide update needed:**  
None.

**Revisit trigger:**  
Reopen only if the whole-letter review or later contextual evidence exposes a concrete problem.


---

## Phil 1:12–18 — Imprisonment Advances the Good News

**Date:** 2026-07-24  
**Status:** process-revalidated and approved as a unit

**Issue:**  
How to state the result of Paul’s circumstances in verse 13 while clearly identifying both the palace guard and everyone else who learned why he was imprisoned.

**Decision:**  
Replace the earlier verse 13 with: “As a result, it has become obvious to the entire palace guard and to everyone else that I am in prison because of Christ.” Retain the existing FLT wording in verses 12 and 14–18.

**Reason:**  
“As a result” preserves the explicit consequence flowing from verse 12. “It has become obvious” communicates the public disclosure, and “the entire palace guard and everyone else” preserves the full scope of the Greek. The complete human-selected unit passed three independent semantic-floor audits with zero blocking defects.

**Final wording:**

> **12** I want you to know, brothers and sisters, that what has happened to me has actually helped spread the good news.  
> **13** As a result, it has become obvious to the entire palace guard and to everyone else that I am in prison because of Christ.  
> **14** And my imprisonment has given most of the brothers and sisters new confidence in the Lord, so that they now dare to speak God’s message even more boldly, without fear.  
> **15** Some preach about Christ because they are jealous and want to compete. Others preach with good intentions.  
> **16** Those who preach out of love know I have been given the task of defending the good news.  
> **17** The others preach about Christ only to advance themselves. Their motives are not sincere, and they think they can make my suffering in prison worse.  
> **18** But what does that matter? The important thing is that Christ is being preached, whether the motives are false or sincere. And in that I take great joy. Yes, I will continue to be full of joy.

**Audit:**  
GitHub run 30115635072; three of three auditors eligible; zero blocking defects.

**Footnotes needed:**  
Consider a study-layer note on the possible institutional or location nuance of πραιτώριον if the chapter notes require it.

**Glossary update needed:**  
None.

**Style Guide update needed:**  
None.

**Revisit trigger:**  
Whole-chapter oral-flow review or a later contextual conflict.



---

## Phil 1:19–26 — Life, Death, and Fruitful Service

**Date:** 2026-07-24  
**Status:** process-revalidated and approved as a unit

**Issue:**  
How to express Paul’s complete courage, the Christ-centered meaning of both life and death, and his strong pull toward departing to be with Christ while retaining natural sixth-grade-adult English.

**Decision:**  
Revise verses 20, 21, and 23 as directed by the human editor. Retain the existing FLT wording in verses 19, 22, and 24–26.

**Reason:**  
“I will have complete courage” expresses Paul’s confident expectation rather than merely repeating that he hopes for courage. “Because for me” carries the explanatory force connecting verse 21 to Christ being honored whether Paul lives or dies. “I am pulled in both directions” makes the real pressure of Paul’s alternatives immediately understandable, while “which is far better” clearly identifies being with Christ as the preferred outcome. The complete sealed unit passed three independent semantic-floor auditors with zero blocking defects.

**Final wording:**

> **19** I know that my distress will become my deliverance through your prayers and the help of the Spirit of Jesus Christ.  
> **20** My eager hope and expectation is that I will not be ashamed in any way. Instead, I will have complete courage so that now, as always, Christ will be honored in my body, whether I live or die.  
> **21** Because for me, living means living for Christ, and dying means gaining something even better.  
> **22** But if living on in this body means more fruitful work for me, then I honestly don’t know which one to choose!  
> **23** I am pulled in both directions. I long to leave this life and be with Christ, which is far better.  
> **24** But for your sake, it is more necessary that I remain in this body.  
> **25** Since I am convinced of this, I know I will stay. I will remain with all of you so that you can grow and experience joy in your faith.  
> **26** Then, when I return to you, you will have even more reason to be proud of what Christ Jesus has done in me.

**Audit:**  
GitHub run 30117320796; three of three auditors eligible; zero blocking defects.

**Footnotes needed:**  
Consider a note on the possible scope of “deliverance” in verse 19 during chapter-level notes review.

**Glossary update needed:**  
None presently required.

**Style Guide update needed:**  
None.

**Revisit trigger:**  
Whole-chapter oral-flow review, target-reader review, or a later contextual conflict.


---

## Phil 1:27–30 — A Community Worthy of the Good News

**Date:** 2026-07-24  
**Status:** process-revalidated and approved as a unit

**Issue:**  
How to communicate Paul’s civic-community command, the church’s united struggle, the opponents’ intimidation, and suffering as a gracious gift in natural sixth-grade-adult English.

**Decision:**  
Revise verses 27, 28, and 29 exactly as directed by the human editor. Retain verse 30 unchanged.

**Reason:**  
“Live together as a community” communicates that Paul is addressing the church’s shared way of life, while “worthy of the good news” preserves the gospel as the standard shaping that life. “Fighting side by side with a single purpose” recreates the united struggle expressed by one spirit, one soul, and the athletic image without requiring readers to reconstruct Greek idiom. Separating “This sign comes from God” makes the divine source unmistakable. “You have been given a gift” preserves the gracious-gift force of the verb and places both trusting and suffering for Christ within that gift. The complete sealed unit passed three independent semantic-floor auditors with zero blocking defects.

**Final wording:**

> **27** Above all, live together as a community in a way that is worthy of the good news of Christ. Then, whether I come and visit you or only hear about you from far away, I will know that you are standing firm, united in one spirit. I will know that you are fighting side by side with a single purpose to stay faithful to the good news.  
> **28** Do not let your opponents intimidate you in any way. Your courage will be a clear sign to them that they are headed for destruction, but that you are headed for deliverance. This sign comes from God.  
> **29** For you have been given a gift for the sake of Christ: not only to trust in Him, but also to suffer for Him.  
> **30** You are facing the same struggle you once saw me face, and that you now hear I am still facing today.

**Audit:**  
GitHub run 30119484697; three of three auditors eligible; zero blocking defects.

**Footnotes needed:**  
Consider a note explaining that “live together as a community” reflects civic or citizenship language and a note clarifying the gracious-gift language surrounding trust and suffering in verse 29.

**Glossary update needed:**  
Consider scoped contextual precedents for πολιτεύομαι and συναθλέω after the benchmark corpus is reviewed as a whole.

**Style Guide update needed:**  
None presently required.

**Revisit trigger:**  
Whole-chapter oral-flow and literary review, target-reader review, or a later contextual conflict.
