"use client";

import type { ReactNode } from "react";
import { trackGooglePlayClick } from "@/lib/firebase-analytics";

export function PlayStoreLink({
  appName,
  href,
  className,
  ariaLabel,
  children,
}: {
  appName: string;
  href: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}) {
  return (
    <a
      className={className}
      aria-label={ariaLabel}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackGooglePlayClick(appName, window.location.pathname)}
    >
      {children}
    </a>
  );
}
