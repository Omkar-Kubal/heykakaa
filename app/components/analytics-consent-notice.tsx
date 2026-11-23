"use client";

import { useEffect, useState } from "react";
import {
  ANALYTICS_SETTINGS_OPEN_EVENT,
  readAnalyticsConsent,
  writeAnalyticsConsent,
  type AnalyticsConsentChoice,
} from "@/lib/analytics-consent";
import { applyAnalyticsConsent } from "@/lib/firebase-analytics";

export function AnalyticsConsentNotice() {
  const [choice, setChoice] = useState<AnalyticsConsentChoice | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsNotice, setSettingsNotice] = useState(false);

  useEffect(() => {
    setChoice(readAnalyticsConsent());

    const openSettings = () => {
      setSettingsNotice(readAnalyticsConsent() !== null);
      setSettingsOpen(true);
    };
    window.addEventListener(ANALYTICS_SETTINGS_OPEN_EVENT, openSettings);
    return () => window.removeEventListener(ANALYTICS_SETTINGS_OPEN_EVENT, openSettings);
  }, []);

  const choose = (nextChoice: AnalyticsConsentChoice) => {
    writeAnalyticsConsent(nextChoice);
    setChoice(nextChoice);
    setSettingsOpen(false);
    void applyAnalyticsConsent(nextChoice);
  };

  if (choice !== null && !settingsOpen) return null;

  return (
    <aside className="hk-consent-notice" aria-labelledby="hk-consent-title">
      <div className="hk-consent-copy">
        <h2 id="hk-consent-title">{settingsNotice ? "Change your analytics choice" : "Your analytics choice"}</h2>
        <p>
          Optional Google Analytics helps me understand page visits and Google Play clicks. It stays off unless you accept.
          You can change your choice at any time in the footer.
        </p>
        <a href="/privacy">Read the privacy policy</a>
      </div>
      <div className="hk-consent-actions">
        <button type="button" onClick={() => choose("accepted")}>Accept analytics</button>
        <button type="button" onClick={() => choose("rejected")}>Reject analytics</button>
      </div>
    </aside>
  );
}
