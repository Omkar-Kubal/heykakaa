import test from "node:test";
import assert from "node:assert/strict";
import { shouldStartNavigationTransition } from "../lib/navigation-motion.ts";

const click = (overrides = {}) => ({
  href: "https://www.heykakaa.com/projects",
  currentHref: "https://www.heykakaa.com/",
  target: "",
  hasDownload: false,
  button: 0,
  defaultPrevented: false,
  metaKey: false,
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
  ...overrides,
});

test("internal page links start a route transition", () => {
  assert.equal(shouldStartNavigationTransition(click()), true);
});

test("external, hash, download, modified, and non-primary clicks keep native behavior", () => {
  const cases = [
    click({ href: "https://play.google.com/store/apps/details?id=example" }),
    click({ href: "https://www.heykakaa.com/#story" }),
    click({ currentHref: "https://www.heykakaa.com/projects", href: "https://www.heykakaa.com/projects#apps" }),
    click({ currentHref: "https://www.heykakaa.com/projects?search=a", href: "https://www.heykakaa.com/projects?search=b" }),
    click({ hasDownload: true }),
    click({ target: "_blank" }),
    click({ button: 1 }),
    click({ ctrlKey: true }),
    click({ metaKey: true }),
    click({ shiftKey: true }),
    click({ altKey: true }),
    click({ defaultPrevented: true }),
  ];

  for (const input of cases) {
    assert.equal(shouldStartNavigationTransition(input), false, JSON.stringify(input));
  }
});

test("same-page links and invalid URLs do not start a route transition", () => {
  assert.equal(shouldStartNavigationTransition(click({ href: "https://www.heykakaa.com/" })), false);
  assert.equal(shouldStartNavigationTransition(click({ href: "http://[invalid" })), false);
});
