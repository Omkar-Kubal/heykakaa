"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { createPageViewTracker } from "@/lib/page-views";
import { getFirebaseAnalytics } from "@/lib/firebase-analytics";
import { ANALYTICS_CONSENT_CHANGE_EVENT, hasAnalyticsConsent } from "@/lib/analytics-consent";

export function FirebasePageViews() {
  const pathname = usePathname();
  const trackPageView = useRef<((path: string) => Promise<void>) | null>(null);

  if (!trackPageView.current) {
    trackPageView.current = createPageViewTracker(
      getFirebaseAnalytics,
      (analytics, path) => {
        void import("firebase/analytics").then(({ logEvent }) => {
          if (!hasAnalyticsConsent()) return;
          logEvent(analytics, "page_view", {
            page_location: `${window.location.origin}${path}`,
            page_path: path,
          });
        });
      },
      (error) => {
        if (process.env.NODE_ENV === "development") console.error("Firebase Analytics could not start", error);
      },
    );
  }

  useEffect(() => {
    const sendPageView = () => {
      if (pathname && hasAnalyticsConsent()) void trackPageView.current?.(pathname);
    };

    sendPageView();
    window.addEventListener(ANALYTICS_CONSENT_CHANGE_EVENT, sendPageView);
    return () => window.removeEventListener(ANALYTICS_CONSENT_CHANGE_EVENT, sendPageView);
  }, [pathname]);

  return null;
}
