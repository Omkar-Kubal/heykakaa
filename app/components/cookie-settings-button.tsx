"use client";

import { ANALYTICS_SETTINGS_OPEN_EVENT } from "@/lib/analytics-consent";

export function CookieSettingsButton() {
  return (
    <button
      className="hk-cookie-settings-button"
      type="button"
      onClick={() => window.dispatchEvent(new Event(ANALYTICS_SETTINGS_OPEN_EVENT))}
    >
      Cookie settings
    </button>
  );
}
