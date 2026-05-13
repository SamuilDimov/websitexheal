"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getCrossLinks } from "@/data/cross-links";

/* Map page slug pairs to CrossLinks translation keys */
const crossLinkKeyMap: Record<string, Record<string, string>> = {
  "chat-with-your-health": {
    "flare-up-trigger-patterns": "crossLink_chat_flare",
    "specialist-ready-reports": "crossLink_chat_reports",
    "log-life-events": "crossLink_chat_log",
  },
  "flare-up-trigger-patterns": {
    "chat-with-your-health": "crossLink_flare_chat",
    "log-life-events": "crossLink_flare_log",
    "health-awareness": "crossLink_flare_awareness",
  },
  "health-awareness": {
    "chat-with-your-health": "crossLink_awareness_chat",
    "specialist-ready-reports": "crossLink_awareness_reports",
    "flare-up-trigger-patterns": "crossLink_awareness_flare",
  },
  "specialist-ready-reports": {
    "health-awareness": "crossLink_reports_awareness",
    "health-timeline": "crossLink_reports_timeline",
    "chat-with-your-health": "crossLink_reports_chat",
  },
  "health-timeline": {
    "log-life-events": "crossLink_timeline_log",
    "specialist-ready-reports": "crossLink_timeline_reports",
    "chat-with-your-health": "crossLink_timeline_chat",
  },
  "log-life-events": {
    "health-timeline": "crossLink_log_timeline",
    "flare-up-trigger-patterns": "crossLink_log_flare",
    "chat-with-your-health": "crossLink_log_chat",
  },
};

/* Map feature slugs to CrossLinks title keys */
const titleKeyMap: Record<string, string> = {
  "chat-with-your-health": "chatWithYourHealth",
  "flare-up-trigger-patterns": "flareUpTriggerPatterns",
  "health-awareness": "healthAwareness",
  "specialist-ready-reports": "specialistReadyReports",
  "health-timeline": "healthTimeline",
  "log-life-events": "logLifeEvents",
};

interface CrossLinkSectionProps {
  pageSlug: string;
}

export default function CrossLinkSection({
  pageSlug,
}: CrossLinkSectionProps) {
  const tCross = useTranslations("CrossLinks");
  const tLanding = useTranslations("FeatureLanding");

  const features = getCrossLinks(pageSlug);
  if (features.length === 0) return null;

  return (
    <section className="bg-xbg">
      <div className="w-full max-w-[1440px] mx-auto px-10 py-24 flex flex-col items-center gap-12 max-[991px]:px-8 max-[991px]:py-16 max-[479px]:px-5">
        <ScrollReveal>
          <h2 className="t-display2 text-xprimary text-center">
            {tLanding("crossLinksHeading")}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-3 gap-6 w-full max-[991px]:grid-cols-1">
          {features.map((feature, i) => {
            const titleKey = titleKeyMap[feature.slug];
            const title = titleKey ? tCross(titleKey) : feature.title;
            const oneLinerKey = crossLinkKeyMap[pageSlug]?.[feature.slug];
            const oneLiner = oneLinerKey ? tCross(oneLinerKey) : feature.oneLiner;

            return (
              <ScrollReveal key={feature.slug} delay={i * 120}>
                <Link
                  href={`/${feature.slug}`}
                  className="group surface-card-feature p-7 flex flex-col gap-5 h-full no-underline"
                >
                  {/* Feature image */}
                  <div
                    className="w-full aspect-[4/3] rounded-[12px] overflow-hidden flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(71,100,255,0.08) 0%, transparent 100%)",
                    }}
                  >
                    <Image
                      src={feature.image}
                      alt={title}
                      width={400}
                      height={300}
                      className="w-[60%] h-auto object-contain"
                    />
                  </div>

                  {/* Icon + Title */}
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xbrand"
                      style={{ fontFamily: "MaterialSymbolsRounded", fontSize: 24 }}
                    >
                      {feature.icon}
                    </span>
                    <h3 className="t-h4 text-xprimary">{title}</h3>
                  </div>

                  {/* One-liner */}
                  <p className="t-body2 text-xsecondary">{oneLiner}</p>

                  {/* Learn more link */}
                  <div className="mt-auto flex items-center gap-1.5 text-xbrand t-button-sm group-hover:gap-2.5 transition-all duration-300">
                    {tLanding("learnMore")}
                    <span
                      style={{ fontFamily: "MaterialSymbolsRounded", fontSize: 20 }}
                    >
                      arrow_forward
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
