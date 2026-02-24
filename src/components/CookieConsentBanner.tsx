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
    <div className="fixed bottom-0 left-0 right-0 z-[1100] p-[20px] max-[479px]:p-[12px]" style={{ fontSize: "16px", color: "#f8f8fa" }}>
      <div className="w-full max-w-[540px] mx-auto bg-xblack rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden" style={{ color: "#f8f8fa" }}>
        {/* Main banner */}
        {!showPreferences ? (
          <div className="p-[24px] flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[8px]">
              <h3
                className="font-medium leading-[1.1]"
                style={{ fontSize: "18px", color: "#f8f8fa" }}
              >
                {t("title")}
              </h3>
              <p className="leading-[1.5]" style={{ fontSize: "14px", color: "rgba(248,248,250,0.7)" }}>
                {t("description")}{" "}
                <Link
                  href="/cookie-policy"
                  className="underline hover:opacity-80"
                  style={{ fontSize: "14px", color: "rgba(248,248,250,0.9)" }}
                >
                  {t("cookiePolicy")}
                </Link>
              </p>
            </div>
            <div className="flex items-center gap-[12px] flex-wrap">
              <button
                onClick={acceptAll}
                className="bg-xdark-blue rounded-full px-[24px] py-[10px] transition-all duration-200 hover:opacity-90"
                style={{ fontSize: "14px", color: "#f8f8fa" }}
              >
                {t("acceptAll")}
              </button>
              <button
                onClick={rejectNonEssential}
                className="bg-transparent border border-white/30 rounded-full px-[24px] py-[10px] transition-all duration-200 hover:border-white/60"
                style={{ fontSize: "14px", color: "#f8f8fa" }}
              >
                {t("rejectNonEssential")}
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="hover:opacity-100 transition-opacity duration-200 underline"
                style={{ fontSize: "14px", color: "rgba(248,248,250,0.7)" }}
              >
                {t("customize")}
              </button>
            </div>
          </div>
        ) : (
          /* Preferences panel */
          <div className="p-[24px] flex flex-col gap-[20px]">
            <div className="flex items-center justify-between">
              <h3
                className="font-medium leading-[1.1]"
                style={{ fontSize: "18px", color: "#f8f8fa" }}
              >
                {t("preferencesTitle")}
              </h3>
              <button
                onClick={() => setShowPreferences(false)}
                className="hover:opacity-100 transition-opacity"
                style={{ fontSize: "14px", color: "rgba(248,248,250,0.7)" }}
              >
                {t("back")}
              </button>
            </div>

            {/* Essential - always on */}
            <div className="flex items-center justify-between gap-[16px] pb-[16px] border-b border-white/10">
              <div>
                <p className="font-medium" style={{ fontSize: "14px", color: "#f8f8fa" }}>
                  {t("essentialTitle")}
                </p>
                <p
                  className="leading-[1.4]"
                  style={{ fontSize: "13px", color: "rgba(248,248,250,0.6)" }}
                >
                  {t("essentialDescription")}
                </p>
              </div>
              <div
                className="w-[44px] h-[24px] bg-xdark-blue rounded-full relative flex-shrink-0 opacity-60 cursor-not-allowed"
              >
                <div className="absolute top-[2px] right-[2px] w-[20px] h-[20px] bg-white rounded-full" />
              </div>
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between gap-[16px] pb-[16px] border-b border-white/10">
              <div>
                <p className="font-medium" style={{ fontSize: "14px", color: "#f8f8fa" }}>
                  {t("analyticsTitle")}
                </p>
                <p
                  className="leading-[1.4]"
                  style={{ fontSize: "13px", color: "rgba(248,248,250,0.6)" }}
                >
                  {t("analyticsDescription")}
                </p>
              </div>
              <button
                onClick={() => setAnalyticsOn(!analyticsOn)}
                className={`w-[44px] h-[24px] rounded-full relative flex-shrink-0 transition-colors duration-200 ${
                  analyticsOn ? "bg-xdark-blue" : "bg-white/20"
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
            <div className="flex items-center justify-between gap-[16px] pb-[16px] border-b border-white/10">
              <div>
                <p className="font-medium" style={{ fontSize: "14px", color: "#f8f8fa" }}>
                  {t("marketingTitle")}
                </p>
                <p
                  className="leading-[1.4]"
                  style={{ fontSize: "13px", color: "rgba(248,248,250,0.6)" }}
                >
                  {t("marketingDescription")}
                </p>
              </div>
              <button
                onClick={() => setMarketingOn(!marketingOn)}
                className={`w-[44px] h-[24px] rounded-full relative flex-shrink-0 transition-colors duration-200 ${
                  marketingOn ? "bg-xdark-blue" : "bg-white/20"
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
              onClick={() =>
                savePreferences({
                  analytics: analyticsOn,
                  marketing: marketingOn,
                })
              }
              className="bg-xdark-blue rounded-full px-[24px] py-[10px] transition-all duration-200 hover:opacity-90 self-start"
                style={{ fontSize: "14px", color: "#f8f8fa" }}
            >
              {t("savePreferences")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
