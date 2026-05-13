"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ArticleCTA() {
  const t = useTranslations("Blog");

  return (
    <div className="cta-surface p-8 flex flex-col items-center gap-4 text-center my-10">
      <p className="t-h3 text-xprimary">{t("ctaHeadline")}</p>
      <p className="t-body2 text-xsecondary max-w-[480px]">
        {t("ctaDescription")}
      </p>
      <a
        href="https://apps.apple.com/us/app/xheal/id6748074977"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2"
      >
        <Image
          src="/images/app-store-badge.svg"
          alt={t("ctaAppStoreAlt")}
          width={160}
          height={53}
          className="hover:opacity-90 transition-opacity"
        />
      </a>
      <div className="flex items-center gap-4 mt-1 text-xtertiary">
        <div className="flex items-center gap-1.5">
          <Image
            src="/images/hipaa-compliant.png"
            alt={t("ctaHipaaAlt")}
            width={24}
            height={24}
          />
          <span className="t-caption">HIPAA</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Image
            src="/images/gdpr-compliant.png"
            alt={t("ctaGdprAlt")}
            width={24}
            height={24}
          />
          <span className="t-caption">GDPR</span>
        </div>
      </div>
    </div>
  );
}
