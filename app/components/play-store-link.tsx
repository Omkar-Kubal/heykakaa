"use client";

import type { ReactNode } from "react";
import { trackPlayClick } from "@/lib/firebase-analytics";
import { withPlayStoreAttribution } from "@/lib/android-apps";

export function PlayStoreLink({
  appName,
  placement,
  href,
  className,
  ariaLabel,
  tabIndex,
  children,
}: {
  appName: string;
  placement: string;
  href: string;
  className?: string;
  ariaLabel?: string;
  tabIndex?: number;
  children: ReactNode;
}) {
  return (
    <a
      className={className}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      href={withPlayStoreAttribution(href, placement)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackPlayClick(appName, placement, window.location.pathname)}
    >
      {children}
    </a>
  );
}
