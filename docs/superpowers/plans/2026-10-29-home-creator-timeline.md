# Home Creator Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Home a Hey Kakaa creator profile with the approved four-milestone timeline.

**Architecture:** Keep the imported Next.js App Router, Tailwind styles, and Geist fonts. Replace the Home product cards with a responsive timeline, and remove AppyLab placeholder metadata while preserving the source's file locations.

**Tech Stack:** Next.js 15.1.11, React 19, Tailwind CSS 3.4.

**Spec:** `docs/superpowers/specs/2026-10-29-home-creator-timeline-design.md`

## Global Constraints

- Keep local only; do not deploy.
- Use the approved intro exactly: “Hey, I’m Kaka. I build for Android and share what I learn along the way.”
- Keep Home focused on creator profile and story; leave detailed product presentation for the Apps page.
- Keep source CSS, Geist fonts, and App Router folder structure.
- Do not invent biographical events, blog posts, contact details, or app capabilities.

## Review Focus

- Mobile width: timeline remains readable without horizontal overflow.
- Release dates and milestones match the in-app notes.
- Home no longer shows app cards or Play buttons.
- Source styles and fonts remain in place.
- AppyLab metadata and fake domain are gone from rendered Home.

---

### Task 1: Creator Home timeline

**Files:** Modify `app/page.tsx`.

**Interfaces:** The page renders the approved hero and four milestone entries from static content; no new dependency or network request.

- [x] Replace the existing app card and generic About sections with the approved timeline.
- [x] Retain the existing Instagram destination and add the existing avatar to the hero.
- [x] Verify the route compiles with `npm run build`.
- [x] Inspect the local preview at desktop and phone width.

### Task 2: Accurate site identity

**Files:** Modify `app/layout.tsx`.

**Interfaces:** Keep Geist font setup and global CSS import; provide only verified Hey Kakaa metadata with no unconfirmed domain or contact details.

- [x] Remove AppyLab metadata and placeholder structured data.
- [x] Verify `npm run build` completes and inspect rendered title/description.
