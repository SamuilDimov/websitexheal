"use client";

import { useTranslations } from "next-intl";

export default function MedicalDisclaimer() {
  const t = useTranslations("Blog");

  return (
    <div
      className="rounded-[12px] p-[16px] mt-[32px] border border-xlight-blue-low/50"
      style={{ fontSize: "13px", color: "#141933b3", backgroundColor: "#f8f8fa" }}
    >
      <p className="leading-[1.5]">
        <strong style={{ color: "#141933" }}>{t("disclaimerLabel")}</strong>{" "}
        {t("disclaimerText")}
      </p>
    </div>
  );
}
