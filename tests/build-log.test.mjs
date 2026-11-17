import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildLogDirectory, parseEntry, listPublishedEntries, listTimelineEntries, findPublishedEntry, findPublishedEntryBySlug, getNextDayNumber } from "../lib/build-log.ts";
import { getBuildLogRedirects, getBuildLogRedirectsForDirectory } from "../next.config.ts";

const entry = (day, status = "published") => `---
day: ${day}
title: "Day ${day} title"
date: 2026-11-14
summary: "A short summary for day ${day}."
reel_url: "https://www.instagram.com/reel/example${day}/"
tags: [android, build-in-public]
status: ${status}
---
## Goal today
The goal.

## What I did
The work.

## Decisions + why
The decision.

## Docs / assets
The links.

## Learnings / blockers + Tomorrow
What comes next.
`;

const introduction = (status = "published") => `---
kind: introduction
series: "Documenting the process"
title: "Introduction: Not Day 1 Yet"
date: 2026-11-13
summary: "An introduction to the app build."
reel_url: "https://www.instagram.com/reel/DfsObcvKsK8/"
tags: []
status: ${status}
---
## Goal today
The goal.

## What I did
The work.

## Decisions + why
The decision.

## Docs / assets
The links.

## Learnings / blockers + Tomorrow
What comes next.
`;

test("parseEntry exposes valid metadata and article body", () => {
  const parsed = parseEntry(entry(1), "day-01.md");
  assert.equal(parsed.day, 1);
  assert.equal(parsed.slug, "day-1");
  assert.equal(parsed.title, "Day 1 title");
  assert.equal(parsed.date, "2026-11-14");
  assert.equal(parsed.reelUrl, "https://www.instagram.com/reel/example1/");
  assert.deepEqual(parsed.tags, ["android", "build-in-public"]);
  assert.match(parsed.body, /## Decisions \+ why/);
});

test("parseEntry exposes a cover image and alt text for a numbered day", () => {
  const withCover = entry(1).replace("status: published", 'cover_image: "/assets/day-01-cover.webp"\ncover_alt: "Day 01 Building App #11 Reel cover"\ncover_width: 1080\ncover_height: 1920\nstatus: published');
  const parsed = parseEntry(withCover, "day-01.md");

  assert.equal(parsed.coverImage, "/assets/day-01-cover.webp");
  assert.equal(parsed.coverAlt, "Day 01 Building App #11 Reel cover");
  assert.equal(parsed.coverWidth, 1080);
  assert.equal(parsed.coverHeight, 1920);
});

test("parseEntry rejects a cover image without descriptive alt text", () => {
  const missingAlt = entry(1).replace("status: published", 'cover_image: "/assets/day-01-cover.webp"\nstatus: published');

  assert.throws(() => parseEntry(missingAlt, "day-01.md"), /cover_alt/i);
});

test("parseEntry supports a non-numbered introduction permalink", () => {
  const parsed = parseEntry(introduction(), "introduction.md");

  assert.equal(parsed.kind, "introduction");
  assert.equal(parsed.day, undefined);
  assert.equal(parsed.slug, "introduction");
  assert.equal(parsed.title, "Introduction: Not Day 1 Yet");
});

test("an introduction cannot claim a numbered day", () => {
  assert.throws(() => parseEntry(introduction().replace("kind: introduction", "kind: introduction\nday: 1"), "introduction.md"), /cannot have a day number/i);
});

test("parseEntry rejects mismatched day numbers", () => {
  assert.throws(() => parseEntry(entry(2), "day-01.md"), /day number/i);
});

test("parseEntry requires the five article sections", () => {
  const missingGoal = entry(1).replace("## Goal today", "## Something else");
  assert.throws(() => parseEntry(missingGoal, "day-01.md"), /Goal today/);
});

test("parseEntry requires article sections in the publishing order", () => {
  const reversed = entry(1).replace("## Goal today\nThe goal.\n\n## What I did", "## What I did\nThe goal.\n\n## Goal today");
  assert.throws(() => parseEntry(reversed, "day-01.md"), /sections must follow the template order/i);
});

test("parseEntry rejects impossible publication dates", () => {
  const impossibleDate = entry(1).replace("2026-11-14", "2026-02-31");
  assert.throws(() => parseEntry(impossibleDate, "day-01.md"), /date must be YYYY-MM-DD/);
});

test("published entries sort newest first and drafts stay private", () => {
  const dir = mkdtempSync(join(tmpdir(), "heykakaa-log-"));
  try {
    writeFileSync(join(dir, "day-01.md"), entry(1));
    writeFileSync(join(dir, "day-02.md"), entry(2, "draft"));
    writeFileSync(join(dir, "day-03.md"), entry(3));
    assert.deepEqual(listPublishedEntries(dir).map((item) => item.day), [3, 1]);
    assert.equal(findPublishedEntry(dir, 2), undefined);
    assert.equal(findPublishedEntry(dir, 3)?.title, "Day 3 title");
    assert.equal(findPublishedEntry(dir, 99), undefined);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("introductions lead the timeline while Day 01 remains the next numbered entry", () => {
  const dir = mkdtempSync(join(tmpdir(), "heykakaa-log-"));
  try {
    writeFileSync(join(dir, "introduction.md"), introduction());
    writeFileSync(join(dir, "day-01.md"), entry(1));
    writeFileSync(join(dir, "day-02.md"), entry(2, "draft"));
    writeFileSync(join(dir, "day-03.md"), entry(3));

    assert.deepEqual(listPublishedEntries(dir).map((item) => item.slug), ["day-3", "day-1", "introduction"]);
    assert.deepEqual(listTimelineEntries(dir).map((item) => item.slug), ["introduction", "day-1", "day-3"]);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("timeline entries sort from the first published day to the latest", () => {
  const dir = mkdtempSync(join(tmpdir(), "heykakaa-log-"));
  try {
    writeFileSync(join(dir, "day-01.md"), entry(1));
    writeFileSync(join(dir, "day-02.md"), entry(2, "draft"));
    writeFileSync(join(dir, "day-03.md"), entry(3));
    assert.deepEqual(listTimelineEntries(dir).map((item) => item.day), [1, 3]);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("duplicate day numbers fail instead of creating duplicate public URLs", () => {
  const dir = mkdtempSync(join(tmpdir(), "heykakaa-log-"));
  try {
    writeFileSync(join(dir, "day-01.md"), entry(1));
    writeFileSync(join(dir, "day-1.md"), entry(1));
    assert.throws(() => listPublishedEntries(dir), /duplicate day number/i);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("a missing content directory behaves as an empty unpublished log", () => {
  const parent = mkdtempSync(join(tmpdir(), "heykakaa-log-"));
  try {
    const missing = join(parent, "missing-build-log");
    assert.deepEqual(listPublishedEntries(missing), []);
    assert.equal(findPublishedEntry(missing, 1), undefined);
  } finally {
    rmSync(parent, { recursive: true, force: true });
  }
});

test("published entries resolve by slug and drafts stay unavailable", () => {
  const dir = mkdtempSync(join(tmpdir(), "heykakaa-log-"));
  try {
    writeFileSync(join(dir, "introduction.md"), introduction());
    writeFileSync(join(dir, "day-02.md"), entry(2, "draft"));

    assert.equal(findPublishedEntryBySlug(dir, "introduction")?.kind, "introduction");
    assert.equal(findPublishedEntryBySlug(dir, "day-2"), undefined);
    assert.equal(findPublishedEntryBySlug(dir, "missing"), undefined);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("legacy introduction URLs redirect temporarily until Day 01 content exists", () => {
  const redirects = getBuildLogRedirects(false);

  assert.ok(redirects.some((redirect) => redirect.source === "/build-log/day-1" && redirect.destination === "/build-log/introduction" && !redirect.permanent));
  assert.ok(redirects.some((redirect) => redirect.source === "/day-1" && redirect.destination === "/build-log/introduction" && !redirect.permanent));

  const whenDayOneExists = getBuildLogRedirects(true);
  assert.equal(whenDayOneExists.some((redirect) => redirect.source === "/build-log/day-1"), false);
  assert.ok(whenDayOneExists.some((redirect) => redirect.source === "/day-:day(\\d+)" && redirect.destination === "/build-log/day-:day"));
});

test("a drafted Day 01 keeps the short URL on the published Introduction", () => {
  const dir = mkdtempSync(join(tmpdir(), "heykakaa-log-"));
  try {
    writeFileSync(join(dir, "introduction.md"), introduction());
    writeFileSync(join(dir, "day-01.md"), entry(1, "draft"));

    const redirects = getBuildLogRedirectsForDirectory(dir);
    assert.ok(redirects.some((redirect) => redirect.source === "/day-1" && redirect.destination === "/build-log/introduction"));

    writeFileSync(join(dir, "day-01.md"), entry(1));
    const publishedRedirects = getBuildLogRedirectsForDirectory(dir);
    assert.equal(publishedRedirects.some((redirect) => redirect.source === "/day-1" && redirect.destination === "/build-log/introduction"), false);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("the introduction remains identifiable without assuming it is the only published entry", () => {
  const introductionEntry = findPublishedEntryBySlug(buildLogDirectory, "introduction");

  assert.ok(introductionEntry);
  assert.equal(introductionEntry.kind, "introduction");
  assert.equal(introductionEntry.day, undefined);
  assert.equal(introductionEntry.series, "Documenting the process");
  assert.equal(introductionEntry.title, "Introduction: Not Day 1 Yet");
  assert.equal(introductionEntry.date, "2026-11-13");
  assert.equal(introductionEntry.reelUrl, "https://www.instagram.com/reel/DfsObcvKsK8/");
  assert.deepEqual(introductionEntry.tags, []);
  assert.match(introductionEntry.body, /## Goal today/);
  assert.match(introductionEntry.body, /## Learnings \/ blockers \+ Tomorrow/);
});

test("an Introduction-only timeline leaves Day 01 marked as next", () => {
  const dir = mkdtempSync(join(tmpdir(), "heykakaa-log-"));
  try {
    writeFileSync(join(dir, "introduction.md"), introduction());
    const timeline = listTimelineEntries(dir);

    assert.deepEqual(timeline.map((item) => item.slug), ["introduction"]);
    assert.equal(getNextDayNumber(timeline), 1);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
