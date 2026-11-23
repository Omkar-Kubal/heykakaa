"use client";

import { hasAnalyticsConsent, type AnalyticsConsentChoice } from "./analytics-consent";
import type { Analytics } from "firebase/analytics";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let analyticsPromise: Promise<Analytics | null> | undefined;
let analyticsInstance: Analytics | null = null;

const deniedConsent = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;

const acceptedConsent = {
  analytics_storage: "granted",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;

export function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (!hasAnalyticsConsent()) return Promise.resolve(null);
  if (!config.apiKey || !config.authDomain || !config.projectId || !config.appId || !config.measurementId) {
    return Promise.resolve(null);
  }
  analyticsPromise ??= (async () => {
    const analyticsSdk = await import("firebase/analytics");
    analyticsSdk.setConsent(deniedConsent);
    if (!(await analyticsSdk.isSupported()) || !hasAnalyticsConsent()) return null;

    const { getApp, getApps, initializeApp } = await import("firebase/app");
    const app = getApps().length ? getApp() : initializeApp(config);
    const analytics = analyticsSdk.initializeAnalytics(app, {
      config: {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      },
    });
    analyticsInstance = analytics;
    if (hasAnalyticsConsent()) {
      analyticsSdk.setConsent(acceptedConsent);
      analyticsSdk.setAnalyticsCollectionEnabled(analytics, true);
    } else {
      analyticsSdk.setConsent(deniedConsent);
      analyticsSdk.setAnalyticsCollectionEnabled(analytics, false);
    }
    return analytics;
  })();
  return analyticsPromise;
}

export async function applyAnalyticsConsent(consent: AnalyticsConsentChoice): Promise<void> {
  try {
    if (consent === "accepted") {
      const analytics = await getFirebaseAnalytics();
      if (!analytics) return;
      const analyticsSdk = await import("firebase/analytics");
      if (!hasAnalyticsConsent()) {
        analyticsSdk.setConsent(deniedConsent);
        analyticsSdk.setAnalyticsCollectionEnabled(analytics, false);
        return;
      }
      analyticsSdk.setConsent(acceptedConsent);
      analyticsSdk.setAnalyticsCollectionEnabled(analytics, true);
      return;
    }

    if (!analyticsInstance) return;
    const analyticsSdk = await import("firebase/analytics");
    analyticsSdk.setConsent(deniedConsent);
    analyticsSdk.setAnalyticsCollectionEnabled(analyticsInstance, false);
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error("Firebase Analytics consent could not be updated", error);
  }
}

async function trackEvent(name: string, parameters: Record<string, string>): Promise<void> {
  try {
    if (!hasAnalyticsConsent()) return;
    const analytics = await getFirebaseAnalytics();
    if (!analytics || !hasAnalyticsConsent()) return;
    const { logEvent } = await import("firebase/analytics");
    if (hasAnalyticsConsent()) logEvent(analytics, name, parameters);
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error("Firebase Analytics could not start", error);
  }
}

export function trackPlayClick(appName: string, placement: string, pagePath: string): void {
  void trackEvent("play_click", {
    app_name: appName,
    placement,
    page_path: pagePath,
  });
}

export function trackContactLead(): void {
  void trackEvent("generate_lead", { form: "contact" });
}
