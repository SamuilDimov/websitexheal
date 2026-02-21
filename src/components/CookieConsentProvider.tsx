"use client";

import CookieConsentBanner from "./CookieConsentBanner";
import GoogleAnalytics from "./GoogleAnalytics";

export default function CookieConsentProvider() {
  return (
    <>
      <GoogleAnalytics />
      <CookieConsentBanner />
    </>
  );
}
