import test from "node:test";
import assert from "node:assert/strict";
import { createSitemap } from "../lib/sitemap.ts";

test("the sitemap includes app detail pages and the practical guide", () => {
  const entries = createSitemap([{ slug: "day-3" }]);
  const urls = entries.map((entry) => entry.url);

  assert.ok(urls.includes("https://www.heykakaa.com/projects/syncspend"));
  assert.ok(urls.includes("https://www.heykakaa.com/projects/synctasks"));
  assert.ok(urls.includes("https://www.heykakaa.com/guides/app-prd-srs"));
  assert.ok(urls.includes("https://www.heykakaa.com/build-log/day-3"));
  assert.equal(entries.every((entry) => entry.lastModified === undefined), true);
});

test("the unfinished roadmap page is excluded from the sitemap", () => {
  const urls = createSitemap().map((entry) => entry.url);

  assert.ok(!urls.includes("https://www.heykakaa.com/roadmap"));
});
