import test from "node:test";
import assert from "node:assert/strict";
import { readAnalyticsConsent, writeAnalyticsConsent } from "../lib/analytics-consent.ts";

function memoryStorage(initial = null) {
  let value = initial;
  return {
    getItem: () => value,
    setItem: (_key, next) => { value = next; },
  };
}

test("analytics consent is absent until the visitor makes a choice", () => {
  assert.equal(readAnalyticsConsent(memoryStorage()), null);
});

test("only an accepted analytics choice grants consent", () => {
  assert.equal(readAnalyticsConsent(memoryStorage("accepted")), "accepted");
  assert.equal(readAnalyticsConsent(memoryStorage("rejected")), "rejected");
  assert.equal(readAnalyticsConsent(memoryStorage("unknown")), null);
});

test("the visitor's analytics choice is persisted", () => {
  const storage = memoryStorage();

  writeAnalyticsConsent("accepted", storage);

  assert.equal(readAnalyticsConsent(storage), "accepted");
});
