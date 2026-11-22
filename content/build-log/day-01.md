---
day: 1
series: "Documenting the process"
title: "Starting an Android Screen Time App: Defining the Problem"
date: 2026-11-13
summary: >-
  I’m exploring an Android app idea for noticing short-form video habits without guilt, and listing the questions to research before deciding what to build.
reel_url: "https://www.instagram.com/p/DfuWSB5qeSn/"
cover_image: "/assets/day-01-cover.webp"
cover_alt: "Day 01 Building App #11 cover, with @hey.kakaa speaking to camera."
cover_width: 1080
cover_height: 1920
tags: [android, product-research, build-in-public, screen-time]
status: published
---

## Goal today

I’m starting my 11th Android app and documenting the build from the beginning. The idea is a minimal app that helps people notice how much time they spend on short-form video. I want that awareness to feel useful, rather than like another reason to feel guilty about using a phone.

Day 01 is about giving the idea a clear direction: what problem am I trying to solve, who might find this useful, and what should I research before deciding what to build? I also want to document the process so you can follow the decisions from the first idea through to the finished app.

## What I did

I introduced App #11 and the build series. My earlier apps have aimed to be minimal, direct, and easy to use, and I want to carry that approach into this project.

The starting idea is to make scrolling time easier to notice across short-form video experiences such as Instagram Reels, YouTube Shorts, Snapchat, Facebook, and TikTok. These are areas I want to investigate, not a list of feeds the app can already measure. I’ll share the research, design, and development decisions as the idea takes shape.

## Decisions + why

The first product direction is **awareness without guilt**. I want the app to show a useful picture of a habit while leaving people room to decide what to do with that information. A simple interface should make the information easy to understand at a glance.

I haven’t chosen the tech stack yet. Although I said in the video that I planned to finalize it on Day 01, I’m moving that decision to the next update. Before promising feed-level insights, I also need to check what Android can reliably measure and what permissions would be required.

## Docs / assets

- [Watch the Day 01 Instagram video](https://www.instagram.com/p/DfuWSB5qeSn/). The cover at the top of this page comes from that video.
- The prompt and toolkit below are **resources for researching an app idea**. They are not a record of tools I personally used on Day 01.

### Product research prompt

Copy this prompt and replace the idea with your own:

```text
Act as a product researcher helping me evaluate an Android app idea.

Idea: A minimal, non-judgmental app that helps people notice time spent
on short-form video, especially Instagram Reels, YouTube Shorts,
Snapchat, Facebook, and TikTok. Its purpose is awareness, not guilt.

Research:
1. Who experiences this problem, when, and what do they do today?
2. Find comparable products. Compare features, pricing, strengths,
   and recurring complaints. Link every source.
3. Separate evidence from assumptions. Do not invent user feedback,
   market numbers, or product capabilities.
4. Check current official Android and Google Play documentation for
   measurement capabilities, permissions, and policy limits. Clearly
   distinguish app-level usage from individual Reel/Short viewing.
5. Suggest five neutral user interview questions and one small way
   to validate the problem before building.
6. Propose a narrow MVP, explicit exclusions, and three ways to
   judge whether it helps users.

Return a concise research brief, competitor comparison, open
questions, and a source list with access dates.
```

### Suggested product research toolkit

- **[Google Play](https://play.google.com/store/apps)** and **[App Store](https://apps.apple.com/)** listings and reviews: compare existing products and look for repeated complaints.
- **[Reddit](https://www.reddit.com/)** and other relevant communities: learn how people describe the problem in their own words. Treat posts as leads for further research, not representative survey data.
- **[Google Trends](https://trends.google.com/)**: explore interest in related search terms over time.
- **User interviews** or **[Google Forms](https://www.google.com/forms/about/)**: ask people about their current habits and needs without pitching the solution first.
- **[Google Sheets](https://www.google.com/sheets/about/)** or **[Notion](https://www.notion.com/)**: keep competitors, source links, assumptions, and decisions together.
- **[Android Developers documentation](https://developer.android.com/)** and **[Google Play developer help](https://support.google.com/googleplay/android-developer/)**: verify what the app can measure and what publishing rules apply.

## Learnings / blockers + Tomorrow

The main open question is how much detail the app can accurately show. “Time spent on Instagram” and “time spent watching Reels” are different measurements. The first version’s promise needs to match what Android allows and what the app can verify.

In the next video, I’ll cover the tech-stack decision and share the first mockups so the idea starts to take a visual shape.
