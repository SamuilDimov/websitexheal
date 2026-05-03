"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

export type CookieCategory = "essential" | "analytics" | "marketing";

export interface CookieConsent {
  essential: boolean; // always true
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const CONSENT_KEY = "xheal_cookie_consent";
const CONSENT_COOKIE = "xheal_consent";
const CONSENT_EVENT = "xheal:consent-changed";

function getStoredConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (
      parsed &&
      typeof parsed === "object" &&
      typeof parsed.essential === "boolean" &&
      typeof parsed.analytics === "boolean" &&
      typeof parsed.marketing === "boolean" &&
      typeof parsed.timestamp === "string"
    ) {
      return parsed as CookieConsent;
    }
    return null;
  } catch {
    return null;
  }
}

function setConsentCookie(consent: CookieConsent) {
  if (typeof document === "undefined") return;
  const value = [
    "essential:1",
    `analytics:${consent.analytics ? "1" : "0"}`,
    `marketing:${consent.marketing ? "1" : "0"}`,
  ].join(",");
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
}

function persistConsent(consent: CookieConsent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    // ignore quota / privacy mode errors
  }
  setConsentCookie(consent);
  try {
    window.dispatchEvent(
      new CustomEvent<CookieConsent>(CONSENT_EVENT, { detail: consent })
    );
  } catch {
    // ignore
  }
}

/* External store for useSyncExternalStore. We cache a stable snapshot reference
   so React only re-renders when the value actually changes. */
let cachedSnapshot: CookieConsent | null = null;
let lastRawJSON: string | null = null;

function getClientSnapshot(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(CONSENT_KEY);
  } catch {
    raw = null;
  }
  if (raw === lastRawJSON) {
    return cachedSnapshot;
  }
  lastRawJSON = raw;
  cachedSnapshot = getStoredConsent();
  return cachedSnapshot;
}

function getServerSnapshot(): CookieConsent | null {
  return null;
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  const handleCustom = () => {
    // Invalidate cache so next getClientSnapshot re-reads
    lastRawJSON = "__invalid__";
    callback();
  };

  const handleStorage = (e: StorageEvent) => {
    if (e.key === CONSENT_KEY) {
      lastRawJSON = "__invalid__";
      callback();
    }
  };

  window.addEventListener(CONSENT_EVENT, handleCustom);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(CONSENT_EVENT, handleCustom);
    window.removeEventListener("storage", handleStorage);
  };
}

export function useCookieConsent() {
  const consent = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  // Track post-mount to avoid SSR/CSR hydration mismatch on `showBanner`.
  // We render nothing on the server and on the very first client render,
  // then flip on after mount. The setState-in-effect pattern is intentional
  // here: it's a one-time mount marker, not derived state.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const acceptAll = useCallback(() => {
    persistConsent({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    });
  }, []);

  const rejectNonEssential = useCallback(() => {
    persistConsent({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    });
  }, []);

  const savePreferences = useCallback(
    (prefs: { analytics: boolean; marketing: boolean }) => {
      persistConsent({
        essential: true,
        analytics: prefs.analytics,
        marketing: prefs.marketing,
        timestamp: new Date().toISOString(),
      });
    },
    []
  );

  const resetConsent = useCallback(() => {
    try {
      window.localStorage.removeItem(CONSENT_KEY);
    } catch {
      // ignore
    }
    document.cookie = `${CONSENT_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    try {
      window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
    } catch {
      // ignore
    }
  }, []);

  const showBanner = mounted && consent === null;

  return {
    consent,
    showBanner,
    acceptAll,
    rejectNonEssential,
    savePreferences,
    resetConsent,
    hasConsented: consent !== null,
    analyticsAllowed: consent?.analytics ?? false,
    marketingAllowed: consent?.marketing ?? false,
  };
}
