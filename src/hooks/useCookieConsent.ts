"use client";

import { useState, useCallback } from "react";

export type CookieCategory = "essential" | "analytics" | "marketing";

export interface CookieConsent {
  essential: boolean; // always true
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const CONSENT_KEY = "xheal_cookie_consent";
const CONSENT_COOKIE = "xheal_consent";

function getStoredConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore parse errors
  }
  return null;
}

function setConsentCookie(consent: CookieConsent) {
  // Set a simple cookie so server-side can also check consent status
  const value = [
    "essential:1",
    `analytics:${consent.analytics ? "1" : "0"}`,
    `marketing:${consent.marketing ? "1" : "0"}`,
  ].join(",");
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(() =>
    getStoredConsent()
  );

  const acceptAll = useCallback(() => {
    const newConsent: CookieConsent = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
    setConsentCookie(newConsent);
    setConsent(newConsent);
  }, []);

  const rejectNonEssential = useCallback(() => {
    const newConsent: CookieConsent = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
    setConsentCookie(newConsent);
    setConsent(newConsent);
  }, []);

  const savePreferences = useCallback(
    (prefs: { analytics: boolean; marketing: boolean }) => {
      const newConsent: CookieConsent = {
        essential: true,
        analytics: prefs.analytics,
        marketing: prefs.marketing,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
      setConsentCookie(newConsent);
      setConsent(newConsent);
    },
    []
  );

  const resetConsent = useCallback(() => {
    localStorage.removeItem(CONSENT_KEY);
    document.cookie = `${CONSENT_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    setConsent(null);
  }, []);

  const showBanner = consent === null;

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
