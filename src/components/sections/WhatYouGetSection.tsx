import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function WhatYouGetSection() {
  const t = useTranslations("WhatYouGet");

  const features = [
    {
      image: "/images/chat-landing-card.png",
      alt: t("feature1Alt"),
      title: t("feature1Title"),
      description: t("feature1Description"),
      href: "/chat-with-your-health" as const,
      featured: true,
    },
    {
      image: "/images/flare-up-card.png",
      alt: t("feature2Alt"),
      title: t("feature2Title"),
      description: t("feature2Description"),
      href: "/flare-up-trigger-patterns" as const,
      featured: true,
    },
    {
      image: "/images/reports-landing-card.png",
      alt: t("feature3Alt"),
      title: t("feature3Title"),
      description: t("feature3Description"),
      href: "/health-awareness" as const,
    },
    {
      image: "/images/get-reports-card.png",
      alt: t("feature4Alt"),
      title: t("feature4Title"),
      description: t("feature4Description"),
      href: "/specialist-ready-reports" as const,
    },
    {
      image: "/images/records-landing-card.png",
      alt: t("feature5Alt"),
      title: t("feature5Title"),
      description: t("feature5Description"),
      href: "/health-timeline" as const,
    },
    {
      image: "/images/log-medication-card.png",
      alt: t("feature6Alt"),
      title: t("feature6Title"),
      description: t("feature6Description"),
      href: "/log-life-events" as const,
    },
  ];

  return (
    <section id="what-you-get">
      <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[80px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
        <ScrollReveal>
          <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-center max-[991px]:text-[3rem]">
            {t("heading")}{" "}
            <span className="text-xdark-blue">{t("headingAccent")}</span>
          </h2>
        </ScrollReveal>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 gap-[40px] max-[767px]:grid-cols-1">
          {features.map((feature) => {
            const cardContent = (
              <>
                {/* Image */}
                <div className="overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    width={1788}
                    height={1200}
                    className="w-full object-cover"
                  />
                </div>

                {/* Text content */}
                <div className="flex flex-col gap-[20px] px-[20px] pb-[20px]">
                  <h3 className="text-[2rem] font-medium leading-[1] tracking-[-0.02em]">
                    {feature.title}
                  </h3>
                  <p className="text-xblack-70 text-[1.125rem] max-[767px]:text-[1rem]">
                    {feature.description}
                  </p>
                </div>
              </>
            );

            const cardClass =
              "border border-xlight-blue-low bg-xwhite text-xdark-blue rounded-[16px] flex flex-col gap-[20px] shadow-[0_4px_4px_#1419330d] max-w-[36rem] overflow-hidden transition-shadow duration-200";

            return (
              <Link
                key={feature.title}
                href={feature.href}
                className={`${cardClass} hover:shadow-[0_8px_24px_#1419331a]`}
              >
                {cardContent}
              </Link>
            );
          })}
        </div>

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
