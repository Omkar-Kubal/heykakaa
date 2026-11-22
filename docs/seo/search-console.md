# Search Console setup and review

The site publishes its sitemap at `https://www.heykakaa.com/sitemap.xml` and allows crawling in `https://www.heykakaa.com/robots.txt`.

## Initial setup

1. Add a **Domain** property for `heykakaa.com` in Google Search Console and verify it with the DNS record Google provides. Domain verification includes both the apex and `www` host.
2. Open **Sitemaps**, submit `sitemap.xml`, and confirm Google reports it as successfully read.
3. Use **URL Inspection** on `/`, `/projects/syncspend`, `/projects/synctasks`, `/guides/app-prd-srs`, `/build-log`, and a published build-log article. Request indexing for newly published pages when the tool offers that action.
4. Check the **Pages** report for indexing exclusions and the **Manual actions** and **Security issues** reports for site-level problems.

## Baseline and follow-up

On setup day, save the date range, indexing state, and query/page performance totals visible in Search Console. Record impressions, clicks, click-through rate, average position, leading queries, countries, and landing pages. Note that brand-new URLs may have little or no data at first.

Review the Search results performance report after a few weeks and compare the same date ranges. Use queries with impressions but few clicks to improve page titles and descriptions. Use queries and pages with clicks to decide which useful guide to expand. Review the Discover report if Search Console shows enough Discover activity to provide one.

Track visits to the two app pages and the guide in the existing analytics system as well. Compare those page visits and `google_play_click` events with the Search Console trends. Search Console setup, verification, URL inspection, and requests for indexing require an account with access to the property.
