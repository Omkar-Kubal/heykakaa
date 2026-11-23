import test from "node:test";
import assert from "node:assert/strict";
import { createSoftwareApplicationSchema } from "../lib/app-schema.ts";
import { androidApps, withPlayStoreAttribution } from "../lib/android-apps.ts";

test("app structured data describes the real app without invented ratings", () => {
  const schema = createSoftwareApplicationSchema(androidApps.syncspend);

  assert.equal(schema["@type"], "SoftwareApplication");
  assert.equal(schema.name, "SyncSpend");
  assert.equal(schema.operatingSystem, "Android");
  assert.equal(schema.applicationCategory, "FinanceApplication");
  assert.equal(schema.downloadUrl, androidApps.syncspend.playUrl);
  assert.equal("aggregateRating" in schema, false);
  assert.equal("review" in schema, false);
});

test("Play Store links preserve existing parameters and add encoded attribution", () => {
  const url = new URL(withPlayStoreAttribution(
    androidApps.syncfocus.playUrl,
    "home_hero",
  ));

  assert.equal(url.searchParams.get("pcampaignid"), "web_share");
  assert.equal(url.searchParams.get("id"), "com.focusfirst");
  assert.equal(url.searchParams.get("referrer"),
    "utm_source=heykakaa&utm_medium=website&utm_campaign=android_apps&utm_content=home_hero");
});
