"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { logEvent } from "firebase/analytics";
import { createPageViewTracker } from "@/lib/page-views";
import { getFirebaseAnalytics } from "@/lib/firebase-analytics";

export function FirebasePageViews() {
  const pathname = usePathname();
  const trackPageView = useRef<((path: string) => Promise<void>) | null>(null);

  if (!trackPageView.current) {
    trackPageView.current = createPageViewTracker(
      getFirebaseAnalytics,
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
