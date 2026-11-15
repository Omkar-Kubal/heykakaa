import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

test("Day 01 includes the supplied introduction Reel cover with descriptive alt text", () => {
  const imagePath = join(process.cwd(), "public", "assets", "instagram-intro-reel-cover.png");
  const pageSource = readFileSync(join(process.cwd(), "app", "build-log", "[daySlug]", "page.tsx"), "utf8");

  assert.ok(existsSync(imagePath), "the introduction Reel cover should be in public assets");
  assert.match(pageSource, /Instagram introduction Reel cover: @hey\.kakaa and the words/);
});
