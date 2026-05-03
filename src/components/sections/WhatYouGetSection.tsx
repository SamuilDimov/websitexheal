import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function WhatYouGetSection() {
  const t = useTranslations("WhatYouGet");

  const features = [
    {
      image: "/images/screenshots/chat-flare-up.png",
      alt: t("feature1Alt"),
      title: t("feature1Title"),
      description: t("feature1Description"),
      href: "/chat-with-your-health" as const,
      accent: "purple" as const,
    },
    {
      image: "/images/screenshots/flare-up-insights.png",
      alt: t("feature2Alt"),
      title: t("feature2Title"),
      description: t("feature2Description"),
      href: "/flare-up-trigger-patterns" as const,
      accent: "pink" as const,
    },
    {
      image: "/images/screenshots/routine.png",
      alt: t("feature3Alt"),
      title: t("feature3Title"),
      description: t("feature3Description"),
      href: "/health-awareness" as const,
      accent: "teal" as const,
    },
    {
      image: "/images/screenshots/timeline.png",
      alt: t("feature4Alt"),
      title: t("feature4Title"),
      description: t("feature4Description"),
      href: "/specialist-ready-reports" as const,
      accent: "amber" as const,
    },
    {
      image: "/images/screenshots/timeline.png",
      alt: t("feature5Alt"),
      title: t("feature5Title"),
      description: t("feature5Description"),
      href: "/health-timeline" as const,
      accent: "purple" as const,
    },
    {
      image: "/images/screenshots/log-medication.png",
      alt: t("feature6Alt"),
      title: t("feature6Title"),
      description: t("feature6Description"),
      href: "/log-life-events" as const,
      accent: "teal" as const,
    },
  ];

  const accentClass: Record<string, string> = {
    purple: "bg-theme-purple",
    pink: "bg-theme-pink",
    teal: "bg-theme-teal",
    amber: "bg-theme-amber",
  };

  return (
    <section id="what-you-get" className="bg-xbg">
      <div className="w-full max-w-[1440px] mx-auto px-10 py-24 flex flex-col items-center gap-16 max-[991px]:px-8 max-[991px]:py-16 max-[479px]:px-5">
        <ScrollReveal>
          <h2 className="t-display2 text-xprimary text-center max-w-[20ch]">
            {t("heading")}{" "}
            <span className="text-xbrand">{t("headingAccent")}</span>
          </h2>
        </ScrollReveal>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 gap-6 w-full max-[767px]:grid-cols-1">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="surface-card-feature flex flex-col overflow-hidden group relative"
            >
              {/* Top accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-[3px] ${accentClass[feature.accent]}`} />

              {/* Image area with subtle gradient */}
              <div
                className="relative px-6 pt-12 pb-8 overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(71,100,255,0.05) 0%, transparent 100%)",
                }}
              >
                <div className="flex justify-center">
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    width={808}
                    height={1660}
                    className="w-[60%] max-w-[260px] transition-transform duration-300 group-hover:-translate-y-1"
                  />
                </div>
              </div>

              {/* Text content */}
              <div className="flex flex-col gap-3 p-7 pt-3">
                <h3 className="t-h3 text-xprimary">{feature.title}</h3>
                <p className="t-body2 text-xsecondary">{feature.description}</p>
              </div>
            </Link>
          ))}
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
