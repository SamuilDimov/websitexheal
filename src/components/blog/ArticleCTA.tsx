"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ArticleCTA() {
  const t = useTranslations("Blog");

  return (
    <div
      className="rounded-[16px] p-[32px] flex flex-col items-center gap-[16px] text-center my-[40px]"
      style={{
        background: "linear-gradient(135deg, #141933 0%, #2a3a7d 100%)",
        color: "#f8f8fa",
        fontSize: "16px",
      }}
    >
      <p
        className="font-medium leading-[1.2]"
        style={{ fontSize: "22px", color: "#f8f8fa" }}
      >
        {t("ctaHeadline")}
      </p>
      <p
        className="leading-[1.5] max-w-[480px]"
        style={{ fontSize: "15px", color: "rgba(248,248,250,0.7)" }}
      >
        {t("ctaDescription")}
      </p>
      <a
        href="https://apps.apple.com/us/app/xheal/id6748074977"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-[8px]"
      >
        <Image
          src="/images/app-store-badge.svg"
          alt={t("ctaAppStoreAlt")}
          width={160}
          height={53}
          className="hover:opacity-90 transition-opacity"
        />
      </a>
      <div className="flex items-center gap-[16px] mt-[4px]">
        <div className="flex items-center gap-[4px]">
          <Image
            src="/images/hipaa-compliant.png"
            alt={t("ctaHipaaAlt")}
            width={24}
            height={24}
          />
          <span style={{ fontSize: "12px", color: "rgba(248,248,250,0.6)" }}>
            HIPAA
          </span>
        </div>
        <div className="flex items-center gap-[4px]">
          <Image
            src="/images/gdpr-compliant.png"
            alt={t("ctaGdprAlt")}
            width={24}
            height={24}
          />
          <span style={{ fontSize: "12px", color: "rgba(248,248,250,0.6)" }}>
            GDPR
          </span>
        </div>
      </div>
    </div>
  );
}
