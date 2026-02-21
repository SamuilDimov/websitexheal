"use client";

import Script from "next/script";
import { useCookieConsent } from "@/hooks/useCookieConsent";

const GA_MEASUREMENT_ID = "G-CN6T27C1YF";

export default function GoogleAnalytics() {
  const { analyticsAllowed } = useCookieConsent();

  if (!analyticsAllowed) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
          });
        `}
      </Script>
    </>
  );
}
