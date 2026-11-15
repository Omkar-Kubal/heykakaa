# HeyKakaa site

Next.js creator site for `www.heykakaa.com`. It includes Home, Projects, Contact, an App #11 Build Log, a Roadmap placeholder, and Firebase Analytics page views.

## Run locally

```powershell
npm ci
npm run dev -- --port 3000
```

Open `http://localhost:3000/`.

## Firebase Analytics

The website uses Firebase project `heykakaa-web-2026` and web app
`1:210496759471:web:839e34a206dd61e08c165a`. Set these public Firebase values
in `.env.local` for local use and in the production deployment environment:

```text
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

The application logs one `page_view` for each page load or App Router path
change. It omits query strings and does not log email addresses. The public
site footer discloses visit measurement.

## Build Log publishing

Add `content/build-log/introduction.md` or `content/build-log/day-NN.md` using
the templates in `content/build-log/README.md`. Keep each entry as `draft`
until its text, date, links, and images are approved; change the status to
`published` to include it in the index, sitemap, metadata, and static article
route. `/day-1` and the old `/build-log/day-1` address redirect to
`/build-log/introduction`; other short `/day-N` redirects point to
`/build-log/day-N`.

## Source and assets

The project retains the App Router folder structure from `aushin19/appylab`. The visual reference is the AppyLab site shown in the supplied screenshots: its compiled stylesheet is kept in `app/globals.css` with local Figtree font URLs. HeyKakaa-specific layout and responsive rules are in `app/heykakaa.css`.

The SyncSpend and SyncTasks gallery banners came from the corresponding live AppyLab Projects cards. The app icons and HeyKakaa avatar are kept in `public/assets/`.

## Later work

The detailed Roadmap, Buttondown waitlist, and launch conversion flow are
deferred until their content and timing are supplied.
