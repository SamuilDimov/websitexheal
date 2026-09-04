import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { APP_STORE_URL } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import ScrollReveal from "@/components/ui/ScrollReveal";

type Tile = {
  id: string;
  href:
    | "/flare-up-trigger-patterns"
    | "/chat-with-your-health"
    | "/health-awareness"
    | "/health-timeline"
    | "/specialist-ready-reports"
    | "/log-life-events"
    | "/workouts"
    | "/nutrition"
    | "/mindfulness";
  icon: string;
  title: string;
  line: string;
  large?: { src: string; width: number; height: number; alt: string };
};

/**
 * Feature bento: nine features in one screen instead of nine panels.
 * Two large tiles carry a phone crop and a one-sentence lead; seven compact
 * tiles carry an icon, the title and one line. Every tile links to its
 * feature page. A dark App Store tile closes the grid.
 */
export default function FeatureBentoSection() {
  const t = useTranslations("WhatYouGet");
  const b = useTranslations("Bento");

  const tiles: Tile[] = [
    {
      id: "flare-ups",
      href: "/flare-up-trigger-patterns",
      icon: "warning",
      title: t("feature2Title"),
      line: b("flareUps"),
      large: {
        src: "/images/screenshots/flare-up-insights.png",
        width: 810,
        height: 1654,
        alt: t("feature2Alt"),
      },
    },
    { id: "score", href: "/health-awareness", icon: "health_metrics", title: t("feature3Title"), line: b("score") },
    { id: "timeline", href: "/health-timeline", icon: "timeline", title: t("feature5Title"), line: b("timeline") },
    { id: "reports", href: "/specialist-ready-reports", icon: "clinical_notes", title: t("feature4Title"), line: b("reports") },
    { id: "log", href: "/log-life-events", icon: "add_notes", title: t("feature6Title"), line: b("log") },
    {
      id: "chat",
      href: "/chat-with-your-health",
      icon: "forum",
      title: t("feature1Title"),
      line: b("chat"),
      large: {
        src: "/images/screenshots/chat-flare-up.png",
        width: 810,
        height: 1654,
        alt: t("feature1Alt"),
      },
    },
    { id: "workouts", href: "/workouts", icon: "fitness_center", title: t("workoutsTitle"), line: b("workouts") },
    { id: "nutrition", href: "/nutrition", icon: "nutrition", title: t("nutritionTitle"), line: b("nutrition") },
    { id: "mindfulness", href: "/mindfulness", icon: "self_improvement", title: t("mindfulnessTitle"), line: b("mindfulness") },
  ];

  return (
    <section aria-labelledby="features-heading" className="bg-xbg-2">
      <div className="x-container x-section flex flex-col gap-12 md:gap-16">
        <ScrollReveal>
          <div className="flex flex-col gap-4">
            <span className="t-eyebrow text-xtertiary">{b("eyebrow")}</span>
            <h2 id="features-heading" className="t-display2 text-xprimary max-w-[18ch]">
              {t("heading")} {t("headingAccent")}
            </h2>
          </div>
        </ScrollReveal>

        <ul role="list" className="bento grid gap-4 md:grid-cols-12 md:gap-5">
          {tiles.map((tile, index) => (
            <li
              key={tile.id}
              className={
                tile.large
                  ? "bento__item md:col-span-6 md:row-span-2"
                  : "bento__item md:col-span-3"
              }
            >
              <ScrollReveal delay={Math.min(index, 7) * 60} className="h-full">
                <Link
                  href={tile.href}
                  className={`bento__tile x-card group flex h-full flex-col gap-4 p-5 md:p-6 ${
                    tile.large ? "bento__tile--large overflow-hidden" : ""
                  }`}
                >
                  <div className={`relative z-[1] flex flex-col gap-4 ${tile.large ? "md:h-full md:w-[54%]" : "h-full"}`}>
                    <div className={`flex gap-3 ${tile.large ? "flex-col items-start" : "items-center"}`}>
                      <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-xbrand/10 text-xbrand">
                        <Icon name={tile.icon} size={18} />
                      </span>
                      <h3 className={`text-xprimary ${tile.large ? "t-h3" : "t-h5"}`}>{tile.title}</h3>
                    </div>
                    <p className={`text-xsecondary ${tile.large ? "t-body1" : "t-body3"}`}>{tile.line}</p>
                    <span className="x-link t-button-sm mt-auto">
                      {t("learnMore")}
                      <Icon name="arrow_forward" size={16} />
                    </span>
                  </div>
                  {tile.large && (
                    <div className="bento__phone pointer-events-none relative -mx-1 -mb-5 mt-2 h-[200px] overflow-hidden md:absolute md:-bottom-[38%] md:right-8 md:mx-0 md:mb-0 md:mt-0 md:h-auto md:w-[40%] md:max-w-[240px] md:overflow-visible">
                      <div className="phone-frame relative mx-auto w-[56%] md:w-full" style={{ aspectRatio: `${tile.large.width} / ${tile.large.height}` }} aria-hidden="true">
                        <div className="phone-frame__screen">
                          <Image
                            src={tile.large.src}
                            alt=""
                            width={tile.large.width}
                            height={tile.large.height}
                            sizes="(max-width: 767px) 46vw, 260px"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="phone-frame__island" />
                      </div>
                    </div>
                  )}
                </Link>
              </ScrollReveal>
            </li>
          ))}

          <li className="bento__item md:col-span-3">
            <ScrollReveal delay={8 * 60} className="h-full">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-surface="dark"
                className="bento__tile x-card flex h-full min-h-[180px] flex-col justify-between gap-6 bg-xbg p-5 text-xprimary md:p-6"
              >
                <div className="flex flex-col gap-2">
                  <span className="t-eyebrow text-xtertiary">{b("ctaEyebrow")}</span>
                  <p className="t-h5 text-xprimary">{b("ctaTitle")}</p>
                </div>
                <Image
                  src="/images/app-store-badge.svg"
                  alt={t("downloadOnAppStore")}
                  width={140}
                  height={47}
                  className="x-store-badge"
                />
              </a>
            </ScrollReveal>
          </li>
        </ul>
      </div>
    </section>
  );
}
