# HeyKaka Profile Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adapt the authorized AppyLab Next.js source into a local HeyKaka creator profile site that directs Instagram visitors to SyncSpend and SyncTasks on Google Play.

**Architecture:** Use the App Router project as the application root in `heykaka-profile`. Preserve the existing static page and assets under `legacy-static/` while keeping the current `dist/` path available for its open file preview. Build the new page from a small app-data list, existing brand assets, and the current HeyKaka paper / ink / sage palette.

**Tech Stack:** Next.js 15.1.11, React 19, Tailwind CSS 3.4, existing project dependencies; no new runtime dependencies.

**Spec:** `docs/superpowers/specs/2026-10-29-heykaka-profile-site-design.md`

## Global Constraints

- Keep the result local for review; do not deploy it or add a public URL to Instagram.
- Installs are the main goal; followers and feedback are secondary.
- Use the verified SyncSpend and SyncTasks Google Play package links.
- Reuse the HeyKaka avatar and app icons; do not invent product claims or contact details.
- Remove the unrelated BrainRot Calculator policy and agency placeholders; do not invent privacy or legal claims.
- Keep the existing static draft recoverable.
- No automated tests are added or run; review the local preview manually.

## Review Focus

- **Phone width (320–390 px):** the hero and both app actions remain readable, stacked, and free of horizontal overflow. Inspect the local preview at 390 px.
- **Play destination:** SyncSpend and SyncTasks buttons retain their exact application IDs. Inspect the rendered link destinations.
- **Old-template residue:** APPYLAB, BrainRot Calculator, appylab.org, placeholder emails, and fake social links do not appear in the new site, metadata, robots file, or sitemap. Search the imported site files.
- **No domain yet:** metadata and crawl files do not claim a canonical domain or sitemap URL. Inspect layout metadata, `robots.txt`, and sitemap handling.
- **Artwork loading:** HeyKaka avatar and both app icons load with descriptive alt text. Inspect the local preview and asset references.

---

### Task 1: Import the authorized Next.js project and preserve the static draft

**Files:**
- Copy: `appylab-source-review/app/` → `heykaka-profile/app/`
- Copy: `appylab-source-review/lib/` → `heykaka-profile/lib/`
- Copy: `appylab-source-review/public/` → `heykaka-profile/public/`
- Copy: `components.json`, `eslint.config.mjs`, `next.config.ts`, `package.json`, `package-lock.json`, `postcss.config.mjs`, `tailwind.config.ts`, `tsconfig.json`
- Create: `heykaka-profile/legacy-static/README.md`
- Copy: `heykaka-profile/README.md`, `heykaka-profile/dist/` → `heykaka-profile/legacy-static/`
- Modify: `heykaka-profile/package.json`, `heykaka-profile/package-lock.json`

**Interfaces:**
- Consumes: authorized source snapshot at `D:\instagram\appylab-source-review`.
- Produces: Next.js project files at `D:\instagram\heykaka-profile`; legacy preview copy at `legacy-static/`; package name `heykaka-profile`.

- [ ] Copy the source project files, excluding `.git/` and `node_modules/`; keep the current `dist/` folder in place so the user's existing file tab still opens.
- [ ] Copy the current README and `dist/` into `legacy-static/` as a recoverable snapshot.
- [ ] Rename the root package metadata to `heykaka-profile` without changing dependency package names.
- [ ] Confirm the App Router files and legacy snapshot exist in their planned locations.

### Task 2: Build the HeyKaka creator profile page

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Create: `public/assets/heykaka-avatar.png`
- Create: `public/assets/syncspend-icon.png`
- Create: `public/assets/synctasks-icon.png`
- Create: `app/icon.png`

**Interfaces:**
- Consumes: verified Play Store URLs, existing app copy, and existing avatar / app icon assets.
- Produces: one responsive App Router home page with HeyKaka identity, a short creator introduction, two app cards, Play buttons, and an Instagram follow link.

- [ ] Copy the three approved brand images from `legacy-static/dist/assets/` into `public/assets/`; use the avatar for `app/icon.png`.
- [ ] Replace the agency services page with the creator-profile layout: HeyKaka header, concise Android-app introduction, SyncSpend and SyncTasks cards, and `@hey.kakaa` follow link.
- [ ] Point each Play button to its exact store listing: `com.appylab.syncspend` and `com.appylab.synctasks`.
- [ ] Restyle `globals.css` with the paper / ink / sage palette, mobile-first spacing, visible focus states, and the existing two-column desktop / stacked phone layout.

### Task 3: Replace template metadata, routes, and project documentation

**Files:**
- Modify: `app/layout.tsx`
- Delete: `app/privacy-policy/page.tsx`
- Delete: `public/app/gfx/privacy-policy.html`
- Delete: `app/sitemap.ts`
- Modify: `public/robots.txt`
- Delete: unused starter assets `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`
- Modify: `README.md`

**Interfaces:**
- Consumes: HeyKaka site name, content, and local-only status from the spec.
- Produces: accurate page metadata and local run instructions, with no unrelated legal page or fake domain references.

- [ ] Set the page title and description to HeyKaka and its two everyday Android apps; remove placeholder canonical, OG, Twitter, verification, and JSON-LD data.
- [ ] Remove the BrainRot Calculator policy route and static copy; do not replace them with unverified SyncSpend / SyncTasks legal claims.
- [ ] Remove the AppyLab sitemap route and replace `robots.txt` with local/domain-neutral crawler rules without a fake sitemap URL.
- [ ] Replace the starter README with HeyKaka project setup and preview instructions; keep source provenance in the design notes, not in user-facing page copy.
- [ ] Search the imported project files for APPYLAB, BrainRot Calculator, appylab.org, placeholder email/social URLs, and fake domain metadata; remove any remaining user-facing residue.

### Task 4: Prepare and inspect the local preview

**Files:**
- Modify: `README.md` only if the actual run command differs from the plan.

**Interfaces:**
- Consumes: completed Next.js project and assets.
- Produces: local preview URL on port 3000; current legacy preview remains on port 4173.

- [ ] Install the locked dependencies with `npm ci` from `D:\instagram\heykaka-profile`.
- [ ] Start the development server with `npm run dev -- --port 3000` and open `http://localhost:3000/`.
- [ ] Inspect at a 390 px phone viewport and the default desktop viewport; check card order, tap targets, focus visibility, and loaded images.
- [ ] Confirm the visible title, both app descriptions, and exact Google Play destinations in the rendered page.
