export const ANALYTICS_CONSENT_STORAGE_KEY = "heykakaa.analytics-consent";
export const ANALYTICS_CONSENT_CHANGE_EVENT = "heykakaa:analytics-consent-change";
export const ANALYTICS_SETTINGS_OPEN_EVENT = "heykakaa:open-analytics-settings";

export type AnalyticsConsentChoice = "accepted" | "rejected";

type ConsentStorage = Pick<Storage, "getItem" | "setItem">;

function browserStorage(): ConsentStorage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

export function readAnalyticsConsent(storage?: ConsentStorage | null): AnalyticsConsentChoice | null {
  try {
    const value = (storage ?? browserStorage())?.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function writeAnalyticsConsent(
  consent: AnalyticsConsentChoice,
  storage?: ConsentStorage | null,
): boolean {
  const target = storage ?? browserStorage();
  if (!target) return false;

  try {
    target.setItem(ANALYTICS_CONSENT_STORAGE_KEY, consent);
  } catch {
    return false;
  }

  if (!storage && typeof window !== "undefined") {
    window.dispatchEvent(new Event(ANALYTICS_CONSENT_CHANGE_EVENT));
  }
  return true;
}

export function hasAnalyticsConsent(): boolean {
  return readAnalyticsConsent() === "accepted";
}
