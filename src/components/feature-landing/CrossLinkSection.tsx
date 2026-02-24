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
    <section>
      <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[80px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
        <ScrollReveal>
          <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-center max-[991px]:text-[3rem]">
            {tLanding("crossLinksHeading")}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-3 gap-[24px] w-full max-[991px]:grid-cols-1">
          {features.map((feature, i) => {
            const titleKey = titleKeyMap[feature.slug];
            const title = titleKey ? tCross(titleKey) : feature.title;
            const oneLinerKey = crossLinkKeyMap[pageSlug]?.[feature.slug];
            const oneLiner = oneLinerKey ? tCross(oneLinerKey) : feature.oneLiner;

            return (
              <ScrollReveal key={feature.slug} delay={i * 120}>
                <Link
                  href={`/${feature.slug}`}
                  className="group border border-xlight-blue-low bg-xwhite rounded-[16px] p-[32px] shadow-[0_4px_4px_#1419330d] flex flex-col gap-[20px] h-full transition-all duration-300 hover:shadow-[0_12px_40px_#14193318] hover:-translate-y-[4px] no-underline"
                >
                  {/* Feature image */}
                  <div className="w-full aspect-[4/3] rounded-[12px] overflow-hidden bg-[#f0f2ff] flex items-center justify-center">
                    <Image
                      src={feature.image}
                      alt={title}
                      width={400}
                      height={300}
                      className="w-[60%] h-auto object-contain"
                    />
                  </div>

                  {/* Icon + Title */}
                  <div className="flex items-center gap-[12px]">
                    <span
                      className="text-xdark-blue text-[1.5rem]"
                      style={{ fontFamily: "MaterialSymbolsRounded" }}
                    >
                      {feature.icon}
                    </span>
                    <h3 className="text-[1.5rem] font-medium leading-[1.1] tracking-[-0.01em] text-xblack">
                      {title}
                    </h3>
                  </div>

                  {/* One-liner */}
                  <p className="text-xblack-70 text-[1.125rem] leading-[1.5] max-[767px]:text-[1rem]">
                    {oneLiner}
                  </p>

                  {/* Learn more link */}
                  <div className="mt-auto flex items-center gap-[6px] text-xdark-blue text-[1rem] font-medium group-hover:gap-[10px] transition-all duration-300">
                    {tLanding("learnMore")}
                    <span
                      className="text-[1.25rem]"
                      style={{ fontFamily: "MaterialSymbolsRounded" }}
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
