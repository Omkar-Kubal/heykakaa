import test from "node:test";
import assert from "node:assert/strict";
import { createAnalyticsEventTracker, createPageViewTracker } from "../lib/page-views.ts";

test("page views survive Strict Mode replay and route changes during initialization", async () => {
  let initializeAnalytics;
  const analyticsReady = new Promise((resolve) => {
    initializeAnalytics = resolve;
  });
  const analytics = { app: "test" };
  const events = [];
  const trackPageView = createPageViewTracker(
    () => analyticsReady,
    (client, pathname) => events.push({ client, pathname }),
  );

  const firstLoad = trackPageView("/");
  const strictModeReplay = trackPageView("/");
  const nextRoute = trackPageView("/build-log");
  initializeAnalytics(analytics);

  await Promise.all([firstLoad, strictModeReplay, nextRoute]);

  assert.deepEqual(events, [
    { client: analytics, pathname: "/" },
    { client: analytics, pathname: "/build-log" },
  ]);
});

test("analytics event tracker records app and page for a Play Store click", async () => {
  const analytics = { app: "test" };
  const events = [];
  const trackEvent = createAnalyticsEventTracker(
    async () => analytics,
    (client, name, parameters) => events.push({ client, name, parameters }),
  );

  await trackEvent("google_play_click", { app_name: "SyncSpend", page_path: "/projects/syncspend" });

  assert.deepEqual(events, [{
    client: analytics,
    name: "google_play_click",
    parameters: { app_name: "SyncSpend", page_path: "/projects/syncspend" },
  }]);
});
