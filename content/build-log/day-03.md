---
day: 3
series: "Documenting the process"
title: "From App Idea to PRD and SRS"
date: 2026-11-15
summary: >-
  I narrated my app idea to an AI assistant and turned it into working PRD and SRS drafts that I can review and refine as I build.
reel_url: "https://www.instagram.com/p/Dfzn24bqNIg/"
cover_image: "/assets/day-03-cover.webp"
cover_alt: "Day 03 PRD plus SRS cover, with @hey.kakaa speaking to camera."
cover_width: 1080
cover_height: 1920
tags: [android, prd, srs, documentation, build-in-public]
status: published
---

## Goal today

Before I get deeper into building App #11, I want the idea written down clearly. For me, that starts with two working documents: a **PRD** (Product Requirements Document) and an **SRS** (Software Requirements Specification). They give me something concrete to question, change, and build from.

The PRD describes the product: who it is for, the problem it addresses, what it should do, and what success would look like. The SRS describes the system requirements: how the proposed app should behave, what technical approach might support it, what data it uses, and how to check that it works. A proposed tech stack is one part of the SRS; writing it down does not make it final.

## What I did

I narrated my app idea to an AI assistant such as ChatGPT or Claude and used the output to organize the first PRD and SRS drafts. Speaking through the idea helped turn scattered thoughts into sections I could read and review. The documents are working drafts, so they include proposals and questions that still need validation.

Here are selected examples from my App #11 documents. I’m sharing examples to show what these documents contain, rather than publishing the full drafts:

- **PRD — user and job:** One user described in the PRD is privacy-sensitive and wants to understand short-form viewing without sharing detailed activity. The proposed response is local-first use, clear data controls, and an optional account. This connects a user need to product scope.
- **PRD — feature and acceptance:** `PR-01` calls for tracking supported short-form feeds with explicit Accessibility consent. Its acceptance note says app availability and permission recovery should be clear. The feature has a reason to exist and a condition to check.
- **SRS — testable behavior:** `FR-003` says that when someone returns from Android Settings, the app must check the actual permission state. It must not assume permission was granted just because the settings screen closed. Grant, decline, and revoke flows can test this requirement.
- **SRS — proposed stack:** The technical draft recommends Flutter/Dart for screens, a Kotlin Android module for platform services, and Room for local storage. That is a proposal to validate, with other technical decisions still open.

## Decisions + why

I’m using the PRD to keep the product direction visible and the SRS to make the technical expectations precise enough to test. The PRD helps me ask whether a feature serves the people I’m building for; the SRS helps me ask what the app must do and how I would know it works.

ChatGPT or Claude can help structure a narrated idea, but the output is not evidence by itself. I still need to review the wording, confirm which choices are mine, and test platform-dependent claims. I’m treating both documents as drafts that can change as I learn more.

## Docs / assets

- [Watch the Day 03 Instagram video](https://www.instagram.com/p/Dfzn24bqNIg/). Its “PRD + SRS” cover appears at the top of this page.
- [Read Day 01](https://www.heykakaa.com/build-log/day-1) for the separate product research prompt and **suggested** research toolkit. The tools below are for drafting requirements from an idea; they are not a claim that product research has been completed.

### Generic PRD template

Copy this outline and replace the bracketed guidance with your own facts. Keep unanswered questions visible instead of filling them with guesses.

```text
# Product Requirements Document (PRD)
Status and date: [Draft or approved; last updated date]
Working product name: [Name, if chosen]

1. Product overview
   [One or two sentences describing the idea and its purpose.]
2. Problem and evidence
   [What problem exists? What observation, interview, or source
    supports it? Mark an untested belief as an assumption.]
3. Users and jobs
   [Who is this for? What are they trying to accomplish?
    A job is the outcome they want, not a screen or feature.]
4. Goals and non-goals
   [Goals are intended outcomes. Non-goals state what this
    version deliberately will not attempt.]
5. Scope and priorities
   [What is in the first usable release (MVP)? What comes later?
    Define P0 as essential, P1 as important, P2 as later if used.]
6. User journey
   [The steps a person takes from first opening the product
    to getting the intended result.]
7. Feature requirements
   [For each feature: ID, user need, behavior, priority, and
    acceptance criteria. Acceptance criteria are observable
    conditions that show the feature works.]
8. Success measures
   [What signals will tell you whether the product helps?
    Label targets as targets, not measured results.]
9. Risks, assumptions, and open decisions
   [Risk: what could go wrong. Assumption: what is unproven.
    Open decision: a choice that has not yet been made.]
```

### PRD prompt for a narrated idea

```text
I am going to narrate an app idea in rough notes. Capture my words
until I say "done". Then draft a PRD using the template above.

Preserve what I actually said. Separate confirmed decisions, my
assumptions, and your proposals. Do not invent user interviews,
market data, features, or evidence. If I have not given enough
information for a section, write "TBD" and explain what is missing.

Give each proposed feature an ID, priority, user need, and observable
acceptance criteria. Finish with the five questions that would most
improve this draft. Do not present the draft as validated research.
```

### Generic SRS template

The SRS starts from the current PRD, even if that PRD is still a draft. Its requirements should be specific enough that someone can test them.

```text
# Software Requirements Specification (SRS)
Status and date: [Draft or approved; last updated date]
Companion PRD: [Title and version of the product draft]

1. Purpose, scope, and terms
   [What system is specified? Define words that could be read
    differently by a developer, tester, or reader.]
2. System context and platform
   [Devices, operating systems, users, and external systems.
    State what is outside this system's scope.]
3. Proposed architecture and tech stack
   [Major parts of the system and their responsibilities.
    Name languages, frameworks, and storage only as choices
    to confirm until feasibility and tradeoffs are checked.]
4. Functional requirements
   [Give each behavior an ID such as FR-001. Use "shall" for
    required behavior. Include inputs, result, failure case,
    and a verification method for each requirement.]
5. Data and privacy
   [What data is collected or created? Where is it stored?
    Who can access it, how long is it kept, and how is it deleted?]
6. Interfaces and dependencies
   [How system parts exchange information; external APIs,
    platform permissions, services, and libraries relied on.]
7. Nonfunctional requirements
   [Measurable qualities such as speed, reliability, security,
    accessibility, battery use, and offline behavior.]
8. Verification and release gates
   [Tests or reviews that prove requirements are met. A release
    gate is a condition that must pass before shipping.]
9. Traceability and open technical decisions
   [Link each technical requirement to its PRD need. Record
    unresolved technical choices and the evidence needed.]
```

**A functional requirement** says what the system must do. **A nonfunctional requirement** says how well it must do it or what constraint it must meet. **Traceability** lets you follow a technical requirement back to the product reason for it. A **verification method** is the test, review, or measurement that would show the requirement is satisfied.

### SRS prompt from the current PRD

```text
Using the PRD draft below and any additional technical preferences I
narrate, create a working SRS using the template above. Do not treat
an unresolved PRD choice as approved.

Give each functional requirement an ID, precise required behavior,
failure or permission case where relevant, and a verification method.
Cover proposed architecture and stack, data, interfaces, privacy,
performance, accessibility, reliability, and release checks. Map
requirements back to PRD goals or features.

Label technical choices as proposed until tested. Flag platform
capabilities, permissions, APIs, and policy assumptions that need
current official documentation or real-device validation. Do not
invent implementation facts. End with open technical questions.

[Paste current PRD and narrated technical notes here.]
```

**Drafting tool:** ChatGPT or Claude can organize the narration and help find missing questions. The product research tools linked from Day 01 are suggestions for checking claims, not tools I’m claiming to have used for these drafts.

## Learnings / blockers + Tomorrow

Writing the idea as requirements makes gaps easier to see. A sentence that sounds clear in a video may need a user, a boundary, and a test before it is useful to build from. The PRD and SRS give me a starting blueprint, while the open questions tell me what to verify next.

Tomorrow I’ll work through the app’s visual direction: the color scheme, iconography, and typography.
