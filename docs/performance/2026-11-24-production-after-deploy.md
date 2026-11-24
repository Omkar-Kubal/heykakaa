# HeyKakaa production Lighthouse results — 24 November 2026

Measured against `https://www.heykakaa.com` after the GitHub `main` deployment, commit `8e2023a`. Each page was audited three times with Lighthouse CLI 13.6.0 and Chrome 157.0.8103.80 in mobile mode. The values below are medians.

| Page | Path | Performance | Accessibility | Best Practices | SEO | LCP (ms) | CLS | TBT (ms) |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | `/` | 99 | 100 | 100 | 92 | 947 | 0.000 | 99 |
| Projects | `/projects` | 99 | 96 | 100 | 92 | 921 | 0.000 | 100 |
| Build Log | `/build-log` | 99 | 96 | 100 | 100 | 1,777 | 0.000 | 137 |
| Day 04 | `/build-log/day-4` | 98 | 100 | 100 | 100 | 1,904 | 0.000 | 148 |
| Contact | `/contact` | 98 | 96 | 100 | 100 | 947 | 0.000 | 159 |

All five pages meet the LCP target of under 2.5 seconds, CLS under 0.1, and Accessibility and SEO scores of at least 90. Lighthouse lab runs do not measure field INP; TBT is included as a diagnostic. PageSpeed Insights field data was not captured in this run.

## Descriptive app link fix — 24 November 2026

After descriptive link text was deployed in commit `2831f04`, Home and Projects were each audited three times with Lighthouse CLI 13.6.0 and Chrome 157.0.8103.80 in mobile mode. The values below are medians.

| Page | Path | Performance | Accessibility | Best Practices | SEO | LCP (ms) | CLS | TBT (ms) |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | `/` | 99 | 100 | 100 | 100 | 921 | 0.000 | 91 |
| Projects | `/projects` | 100 | 96 | 100 | 100 | 920 | 0.000 | 67 |

Both pages now pass the SEO target. The PageSpeed Insights screenshot for Home showed no field data; Lighthouse lab TBT is included as a diagnostic because Lighthouse does not measure field INP. Raw JSON reports are kept locally under `.lighthouse-tmp/production-2026-11-24/seo-link-fix/` and are not tracked by Git.
