"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { initializeAnalytics, isSupported, logEvent, type Analytics } from "firebase/analytics";
import { createAnalyticsEventTracker } from "./page-views";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let analyticsPromise: Promise<Analytics | null> | undefined;

export function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (!config.apiKey || !config.authDomain || !config.projectId || !config.appId || !config.measurementId) {
    return Promise.resolve(null);
  }
  analyticsPromise ??= (async () => {
    if (!(await isSupported())) return null;
    const app = getApps().length ? getApp() : initializeApp(config);
    return initializeAnalytics(app, {
      config: {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      },
    });
  })();
  return analyticsPromise;
}

const trackAnalyticsEvent = createAnalyticsEventTracker(
  getFirebaseAnalytics,
  (analytics, name, parameters) => logEvent(analytics, name, parameters),
  (error) => {
    if (process.env.NODE_ENV === "development") console.error("Firebase Analytics could not start", error);
  },
);

export function trackGooglePlayClick(appName: string, pagePath: string): void {
  void trackAnalyticsEvent("google_play_click", {
    app_name: appName,
    page_path: pagePath,
  });
}
