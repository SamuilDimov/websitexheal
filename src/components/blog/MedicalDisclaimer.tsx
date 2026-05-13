"use client";

import { useTranslations } from "next-intl";

export default function MedicalDisclaimer() {
  const t = useTranslations("Blog");

  return (
    <div className="rounded-[12px] p-4 mt-8 border border-xborder bg-xbg-3 text-xsecondary">
      <p className="t-body3 leading-[1.5]">
        <strong className="text-xprimary">{t("disclaimerLabel")}</strong>{" "}
        {t("disclaimerText")}
      </p>
    </div>
  );
}
