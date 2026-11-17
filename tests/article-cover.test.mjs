import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parseEntry } from "../lib/build-log.ts";

test("published Introduction points to its supplied cover with descriptive alt text", () => {
  const source = readFileSync(join(process.cwd(), "content", "build-log", "introduction.md"), "utf8");
  const entry = parseEntry(source, "introduction.md");

  assert.ok(entry.coverImage);
  assert.ok(entry.coverAlt);
  assert.ok(existsSync(join(process.cwd(), "public", entry.coverImage.slice(1))));
});

test("published Day 01 points to its supplied cover and Instagram post", () => {
  const source = readFileSync(join(process.cwd(), "content", "build-log", "day-01.md"), "utf8");
  const entry = parseEntry(source, "day-01.md");

  assert.equal(entry.status, "published");
  assert.equal(entry.date, "2026-11-13");
  assert.equal(entry.reelUrl, "https://www.instagram.com/p/DfuWSB5qeSn/");
  assert.ok(entry.coverImage);
  assert.ok(entry.coverAlt);
  assert.ok(existsSync(join(process.cwd(), "public", entry.coverImage.slice(1))));
});
