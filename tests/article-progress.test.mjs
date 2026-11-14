import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const articleProgress = await import("../lib/article-progress.ts").catch(() => ({}));

test("article section links get stable, readable anchors", () => {
  assert.equal(typeof articleProgress.getArticleSections, "function", "article section helper should be exported");
  assert.deepEqual(
    articleProgress.getArticleSections("# Day 01\n\n## Goal today\n\n## Decisions + why\n\n## Learnings / blockers + Tomorrow"),
    [
      { title: "Goal today", id: "goal-today" },
      { title: "Decisions + why", id: "decisions-why" },
      { title: "Learnings / blockers + Tomorrow", id: "learnings-blockers-tomorrow" },
    ],
  );
});

test("formatted Markdown headings share the same title and ID for links and rendered headings", () => {
  assert.equal(typeof articleProgress.getArticleSectionId, "function", "section ID resolver should be exported");
  const [section] = articleProgress.getArticleSections("## **Extra details**\n\n## What `I did`");
  assert.deepEqual(section, { title: "Extra details", id: "extra-details" });
  assert.equal(articleProgress.getArticleSectionId([section], 0), section.id);
  assert.equal(articleProgress.getArticleSectionId([], 0), "section-1");
});

test("reading progress tracks the article and stays between zero and one hundred", () => {
  assert.equal(typeof articleProgress.getArticleProgress, "function", "reading progress helper should be exported");
  assert.equal(articleProgress.getArticleProgress(0, 100, 1200, 800), 0);
  assert.equal(articleProgress.getArticleProgress(300, 100, 1200, 800), 50);
  assert.equal(articleProgress.getArticleProgress(500, 100, 1200, 800), 100);
  assert.equal(articleProgress.getArticleProgress(1000, 100, 1200, 800), 100);
  assert.equal(articleProgress.getArticleProgress(0, 100, 400, 800), 100);
});

test("article reveal styles print every section visibly", () => {
  const stylesheet = readFileSync(fileURLToPath(new URL("../app/heykakaa.css", import.meta.url)), "utf8");
  assert.match(stylesheet, /@media\s+print[\s\S]*\.hk-article-reveal[^{}]*\{[^}]*opacity:\s*1/s);
  assert.match(stylesheet, /@media\s+print[\s\S]*\.hk-article-reveal[^{}]*\{[^}]*transform:\s*none/s);
});
