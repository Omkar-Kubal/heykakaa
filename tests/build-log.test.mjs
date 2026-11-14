import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parseEntry, listPublishedEntries, listTimelineEntries, findPublishedEntry } from "../lib/build-log.ts";

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
