"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export default function CookieConsentBanner() {
  const t = useTranslations("CookieConsent");
  const { showBanner, acceptAll, rejectNonEssential, savePreferences } =
    useCookieConsent();
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsOn, setAnalyticsOn] = useState(true);
  const [marketingOn, setMarketingOn] = useState(false);

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1100] p-5 max-[479px]:p-3 pointer-events-none">
      <div
        className="w-full max-w-[540px] mx-auto bg-xcard border border-xborder rounded-[20px] overflow-hidden pointer-events-auto"
        style={{
          boxShadow: "0 16px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(71, 100, 255, 0.05)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Main banner */}
        {!showPreferences ? (
          <div className="p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="t-h5 text-xprimary">{t("title")}</h3>
              <p className="t-body3 text-xsecondary">
                {t("description")}{" "}
                <Link
                  href="/cookie-policy"
                  className="underline text-xprimary hover:text-xbrand transition-colors"
                >
                  {t("cookiePolicy")}
                </Link>
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={acceptAll}
                className="bg-xbrand text-white t-button-sm h-[40px] px-5 rounded-full transition-all duration-200 hover:bg-[#5a73ff] hover:shadow-[0_8px_24px_rgba(71,100,255,0.4)] active:scale-[0.97]"
              >
                {t("acceptAll")}
              </button>
              <button
                type="button"
                onClick={rejectNonEssential}
                className="bg-transparent border border-xborder-medium text-xprimary t-button-sm h-[40px] px-5 rounded-full transition-all duration-200 hover:border-xtertiary hover:bg-xn-800 active:scale-[0.97]"
              >
                {t("rejectNonEssential")}
              </button>
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="t-button-sm text-xtertiary hover:text-xprimary transition-colors duration-200 underline px-2 py-2"
              >
                {t("customize")}
              </button>
            </div>
          </div>
        ) : (
          /* Preferences panel */
          <div className="p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h3 className="t-h5 text-xprimary">{t("preferencesTitle")}</h3>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="t-body3 text-xtertiary hover:text-xprimary transition-colors duration-200"
              >
                {t("back")}
              </button>
            </div>

            {/* Essential - always on */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-xborder">
              <div>
                <p className="t-h6 text-xprimary">{t("essentialTitle")}</p>
                <p className="t-body3 text-xtertiary mt-1">
                  {t("essentialDescription")}
                </p>
              </div>
              <div
                className="w-[44px] h-[24px] bg-xbrand rounded-full relative flex-shrink-0 opacity-60 cursor-not-allowed"
                aria-label="Always on"
              >
                <div className="absolute top-[2px] right-[2px] w-[20px] h-[20px] bg-white rounded-full" />
              </div>
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-xborder">
              <div>
                <p className="t-h6 text-xprimary">{t("analyticsTitle")}</p>
                <p className="t-body3 text-xtertiary mt-1">
                  {t("analyticsDescription")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAnalyticsOn(!analyticsOn)}
                aria-pressed={analyticsOn}
                className={`w-[44px] h-[24px] rounded-full relative flex-shrink-0 transition-colors duration-200 ${
                  analyticsOn ? "bg-xbrand" : "bg-xn-700"
                }`}
              >
                <div
                  className={`absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full transition-all duration-200 ${
                    analyticsOn ? "right-[2px]" : "left-[2px]"
                  }`}
                />
              </button>
            </div>

            {/* Marketing */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-xborder">
              <div>
                <p className="t-h6 text-xprimary">{t("marketingTitle")}</p>
                <p className="t-body3 text-xtertiary mt-1">
                  {t("marketingDescription")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMarketingOn(!marketingOn)}
                aria-pressed={marketingOn}
                className={`w-[44px] h-[24px] rounded-full relative flex-shrink-0 transition-colors duration-200 ${
                  marketingOn ? "bg-xbrand" : "bg-xn-700"
                }`}
              >
                <div
                  className={`absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full transition-all duration-200 ${
                    marketingOn ? "right-[2px]" : "left-[2px]"
                  }`}
                />
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                savePreferences({
                  analytics: analyticsOn,
                  marketing: marketingOn,
                })
              }
              className="bg-xbrand text-white t-button-sm h-[40px] px-5 rounded-full transition-all duration-200 hover:bg-[#5a73ff] hover:shadow-[0_8px_24px_rgba(71,100,255,0.4)] active:scale-[0.97] self-start"
            >
              {t("savePreferences")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
