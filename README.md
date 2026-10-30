# HeyKakaa profile

A local Next.js creator portfolio with Home, Projects, and Contact pages. The Projects page showcases SyncSpend and SyncTasks and links to their Google Play listings.

## Run locally

```powershell
npm ci
npm run dev -- --port 3000
```

Open `http://localhost:3000/`.

## Source and assets

The project retains the App Router folder structure from `aushin19/appylab`. The visual reference is the AppyLab site shown in the supplied screenshots: its compiled stylesheet is kept in `app/globals.css` with local Figtree font URLs. HeyKakaa-specific layout and responsive rules are in `app/heykakaa.css`.

The SyncSpend and SyncTasks gallery banners came from the corresponding live AppyLab Projects cards. The app icons and HeyKakaa avatar are kept in `public/assets/`.

## Scope

This is a local preview. The blog section is disabled for now. Contact uses the known `@hey.kakaa` Instagram profile until another contact method is supplied. No site domain is configured.
