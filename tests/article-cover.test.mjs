import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

test("the Introduction includes the supplied Reel cover with descriptive alt text", () => {
  const imagePath = join(process.cwd(), "public", "assets", "instagram-intro-reel-cover.png");
  const pageSource = readFileSync(join(process.cwd(), "app", "build-log", "[daySlug]", "page.tsx"), "utf8");

  assert.ok(existsSync(imagePath), "the introduction Reel cover should be in public assets");
  assert.match(pageSource, /entry\.kind === "introduction"/);
  assert.match(pageSource, /Instagram introduction Reel cover: @hey\.kakaa and the words/);
});

test("the introduction Reel cover links to the supplied Instagram permalink", () => {
  const pageSource = readFileSync(join(process.cwd(), "app", "build-log", "[daySlug]", "page.tsx"), "utf8");
  const contentSource = readFileSync(join(process.cwd(), "content", "build-log", "introduction.md"), "utf8");

  assert.match(contentSource, /reel_url: "https:\/\/www\.instagram\.com\/reel\/DfsObcvKsK8\/"/);
  assert.match(pageSource, /href=\{entry\.reelUrl\}/);
});
