import Image from "next/image";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FeatureScrollShowcase from "@/components/sections/FeatureScrollShowcase";

export default function WhatYouGetSection() {
  const t = useTranslations("WhatYouGet");

  return (
    <section id="what-you-get" className="bg-xbg">
      <div className="w-full max-w-[1440px] mx-auto px-10 py-24 flex flex-col items-center gap-16 max-[991px]:px-8 max-[991px]:py-16 max-[479px]:px-5">
        <ScrollReveal>
          <h2 className="t-display2 text-xprimary text-center max-w-[20ch]">
            {t("heading")}{" "}
            <span className="text-xbrand">{t("headingAccent")}</span>
          </h2>
        </ScrollReveal>

        <FeatureScrollShowcase />

        {/* App Store Badge */}
        <div>
          <a
            href="https://apps.apple.com/us/app/xheal/id6748074977"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/app-store-badge.svg"
              alt={t("downloadOnAppStore")}
              width={200}
              height={67}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
