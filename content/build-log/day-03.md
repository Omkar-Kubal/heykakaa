---
day: 3
series: "Documenting the process"
title: "Turning an Android App Idea into a PRD and SRS"
date: 2026-11-15
summary: >-
  I used a narrated Android app idea to draft a PRD and SRS, then kept the proposals and open questions visible for review.
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
- [Read Day 01](/build-log/day-1) for the product research prompt and suggested toolkit. That resource is separate from drafting requirements; product research has not been presented as completed here.

- **Reusable PRD and SRS outlines:** [Read the practical guide to writing a PRD and SRS for an Android app](/guides/app-prd-srs). It includes the editable outlines and prompts, keeping this day focused on the build story.
- **Drafting tools:** ChatGPT or Claude can help organize narration and find missing questions. Generated documents remain drafts to review, not evidence of research or platform behavior.

## Learnings / blockers + Tomorrow

Writing the idea as requirements makes gaps easier to see. A sentence that sounds clear in a video may need a user, a boundary, and a test before it is useful to build from. The PRD and SRS give me a starting blueprint, while the open questions tell me what to verify next.

Tomorrow I’ll work through the app’s visual direction: the color scheme, iconography, and typography.

For the complete process and reusable prompts, continue with [How to Write a PRD and SRS for an Android App](/guides/app-prd-srs).
