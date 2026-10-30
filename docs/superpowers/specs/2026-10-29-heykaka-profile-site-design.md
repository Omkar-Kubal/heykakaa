# HeyKaka Profile Site Design

**Status:** Approved  
**Date:** 2026-10-29

## Intent

Turn `D:\instagram\heykaka-profile` into a mobile-first creator profile site for HeyKaka. People arriving from Instagram should quickly understand the creator, see SyncSpend and SyncTasks, and reach their Google Play listings. Installs are the main goal; follows and feedback are secondary.

## Current state and constraints

- The folder currently contains the earlier static two-app page in `dist/` and its assets.
- The user asked to use `aushin19/appylab` as source code and confirmed they have permission to adapt it.
- The source is a Next.js 15 / React 19 / Tailwind project. Its current agency copy and BrainRot Calculator privacy page do not describe HeyKaka or these apps.
- Reuse the HeyKaka avatar and app icons already in the static page, plus any accurate SyncSpend / SyncTasks artwork from `D:\appylab`.
- Keep the result local for review. Do not deploy it, add analytics, invent a contact address, or publish unsupported privacy claims.

## Approaches

1. **Use the Next.js repository as the site foundation — selected.** Bring its app structure and dependencies into `heykaka-profile`, replace the generic agency page and metadata, and preserve the existing static draft under `legacy-static/` as a fallback. This matches the user's request to use the source code while keeping the current draft recoverable.
2. **Keep the existing static page and use the repository only as inspiration.** This would be simpler to maintain, but would not use the source code as requested.

## Proposed site

- A HeyKaka header with the existing avatar and `@hey.kakaa` identity.
- A short creator-style introduction focused on practical Android apps for everyday spending and planning.
- Two clear app sections with accurate descriptions, existing app artwork, and separate Google Play buttons for SyncSpend and SyncTasks.
- A small Instagram follow link; omit placeholder social links, agency service sections, and unverified contact details.
- Keep the existing warm paper / ink / sage palette as the starting brand direction, adapting the imported Tailwind styles to it rather than retaining the source's generic agency blue.
- Replace APPYLAB titles, descriptions, metadata, structured data, and sample links with HeyKaka-specific content. Remove the unrelated BrainRot Calculator privacy route; only add real app-policy links if their canonical URLs are confirmed.

## Success criteria

- The site reads as a creator profile and app portfolio, not a software agency.
- On a phone, both app choices and their Play buttons are clear and easy to tap.
- No APPYLAB, BrainRot Calculator, placeholder emails/social URLs, or unrelated claims remain in the user-facing site.
- The existing static draft remains recoverable, and the new site runs as a local preview only.

## Out of scope

- Hosting, domain setup, or adding a public URL to Instagram.
- Analytics, install attribution, new account content, or public privacy/legal claims.

