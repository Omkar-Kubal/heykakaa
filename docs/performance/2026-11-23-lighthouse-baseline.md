# HeyKakaa Lighthouse baseline — 23 November 2026

Three mobile Lighthouse 13.6 CLI runs were made per URL against the live site, using a fresh headless Chrome profile with extensions disabled. Values below are medians. The live site still serves the older version of the redesign branch. Its current Day 04 URL is `/build-log/day-4`.

| Page | Performance | Accessibility | Best Practices | SEO | LCP (ms) | CLS | TBT (ms) |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 95 | 100 | 100 | 92 | 1,868 | 0.000 | 233 |
| Projects | 99 | 96 | 100 | 92 | 1,018 | 0.000 | 147 |
| Build Log | 92 | 96 | 100 | 100 | 1,877 | 0.000 | 329 |
| Day 04 | 92 | 100 | 100 | 100 | 2,085 | 0.000 | 276 |
| Contact | 98 | 96 | 100 | 100 | 1,006 | 0.000 | 178 |

All measured LCP values were below 2.5 seconds and CLS values below 0.1. Lighthouse lab runs do not report field INP; TBT is included as a diagnostic. Accessibility and SEO scores met the 90 point target on these live pages.

PageSpeed Insights was also queried by CLI for lab and field data, but Google's API reported a daily quota limit of zero. The report therefore has no PSI field-data values. After the redesign is deployed, run each URL at [PageSpeed Insights](https://pagespeed.web.dev/) and record available field data alongside the new Lighthouse medians.

These are a baseline for the current live deployment only. Re-run after the redesigned pages are deployed; local results are not a substitute for the production score table.

## Local redesign candidate — 23 November 2026

Three mobile Lighthouse CLI runs per route were also made against the optimized local build at `127.0.0.1:3001`. Medians are useful for checking this code before deployment; Firebase and Formspree production configuration was not present in the isolated worktree.

| Page | Performance | Accessibility | Best Practices | SEO | LCP (ms) | CLS | TBT (ms) |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 100 | 100 | 100 | 92 | 915 | 0.000 | 32 |
| Projects | 100 | 96 | 100 | 92 | 912 | 0.000 | 34 |
| Build Log | 98 | 96 | 100 | 100 | 2,187 | 0.000 | 50 |
| Day 04 | 99 | 100 | 100 | 100 | 2,142 | 0.000 | 29 |
| Contact | 100 | 100 | 100 | 100 | 910 | 0.000 | 59 |

The local scores meet the stated LCP, CLS, Accessibility, and SEO targets. Performance values remain candidate-build results; repeat on the production deployment after Formspree and analytics are configured.
