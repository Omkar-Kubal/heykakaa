"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getApp, getApps, initializeApp } from "firebase/app";
import { initializeAnalytics, isSupported, logEvent, type Analytics } from "firebase/analytics";
import { createPageViewTracker } from "@/lib/page-views";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let analyticsPromise: Promise<Analytics | null> | undefined;

function getAnalyticsClient(): Promise<Analytics | null> {
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

export function FirebasePageViews() {
  const pathname = usePathname();
  const trackPageView = useRef<((path: string) => Promise<void>) | null>(null);

  if (!trackPageView.current) {
    trackPageView.current = createPageViewTracker(
      getAnalyticsClient,
      (analytics, path) => {
        logEvent(analytics, "page_view", {
          page_location: `${window.location.origin}${path}`,
          page_path: path,
        });
      },
      (error) => {
        if (process.env.NODE_ENV === "development") console.error("Firebase Analytics could not start", error);
      },
    );
  }

  useEffect(() => {
    if (pathname) void trackPageView.current?.(pathname);
  }, [pathname]);

  return null;
}
