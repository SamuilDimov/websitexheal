import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import FeatureImageSlideshow, {
  type FeatureSlideshowImage,
} from "@/components/sections/FeatureImageSlideshow";
import FeatureShowcaseController from "@/components/sections/FeatureShowcaseController";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  featureVisuals,
  type FeatureVisualSlug,
} from "@/data/feature-visuals";
import { Link } from "@/i18n/navigation";

type FeatureHref =
  | "/workouts"
  | "/nutrition"
  | "/mindfulness"
  | "/chat-with-your-health"
  | "/flare-up-trigger-patterns"
  | "/health-awareness"
  | "/specialist-ready-reports"
  | "/health-timeline"
  | "/log-life-events";

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  activeHeading: string;
  activeSummary: string;
  icon: string;
  accent: string;
  href: FeatureHref;
  visual: {
    images: FeatureSlideshowImage[];
    deviceFrame: boolean;
  };
  capabilities?: string[];
  isNew?: boolean;
}

export default function FeatureScrollShowcase() {
  const t = useTranslations("WhatYouGet");
  const localizedVisual = (slug: FeatureVisualSlug) => {
    const visual = featureVisuals[slug];

    return {
      deviceFrame: visual.deviceFrame,
      images: visual.images.map((image) => ({
        src: image.src,
        alt: t(image.altKey),
        width: image.width,
        height: image.height,
      })),
    };
  };
  const features: FeatureItem[] = [
    {
      id: "workouts",
      title: t("workoutsTitle"),
      description: t("workoutsDescription"),
      activeHeading: t("workoutsActiveHeading"),
      activeSummary: t("workoutsActiveSummary"),
      icon: "fitness_center",
      accent: "#8c9dff",
      href: "/workouts",
      visual: localizedVisual("workouts"),
      capabilities: [
        t("workoutsCapability1"),
        t("workoutsCapability2"),
        t("workoutsCapability3"),
      ],
      isNew: true,
    },
    {
      id: "nutrition",
      title: t("nutritionTitle"),
      description: t("nutritionDescription"),
      activeHeading: t("nutritionActiveHeading"),
      activeSummary: t("nutritionActiveSummary"),
      icon: "nutrition",
      accent: "#f6a724",
      href: "/nutrition",
      visual: localizedVisual("nutrition"),
      capabilities: [
        t("nutritionCapability1"),
        t("nutritionCapability2"),
        t("nutritionCapability3"),
      ],
      isNew: true,
    },
    {
      id: "mindfulness",
      title: t("mindfulnessTitle"),
      description: t("mindfulnessDescription"),
      activeHeading: t("mindfulnessActiveHeading"),
      activeSummary: t("mindfulnessActiveSummary"),
      icon: "self_improvement",
      accent: "#10ddd0",
      href: "/mindfulness",
      visual: localizedVisual("mindfulness"),
      capabilities: [
        t("mindfulnessCapability1"),
        t("mindfulnessCapability2"),
        t("mindfulnessCapability3"),
      ],
      isNew: true,
    },
    {
      id: "chat",
      title: t("feature1Title"),
      description: t("feature1Description"),
      activeHeading: t("chatActiveHeading"),
      activeSummary: t("chatActiveSummary"),
      icon: "forum",
      accent: "#8c9dff",
      visual: localizedVisual("chat-with-your-health"),
      capabilities: [
        t("feature1Capability1"),
        t("feature1Capability2"),
        t("feature1Capability3"),
      ],
      href: "/chat-with-your-health",
    },
    {
      id: "flare-ups",
      title: t("feature2Title"),
      description: t("feature2Description"),
      activeHeading: t("flareUpsActiveHeading"),
      activeSummary: t("flareUpsActiveSummary"),
      icon: "warning",
      accent: "#e8447f",
      visual: localizedVisual("flare-up-trigger-patterns"),
      capabilities: [
        t("feature2Capability1"),
        t("feature2Capability2"),
        t("feature2Capability3"),
      ],
      href: "/flare-up-trigger-patterns",
    },
    {
      id: "awareness",
      title: t("feature3Title"),
      description: t("feature3Description"),
      activeHeading: t("awarenessActiveHeading"),
      activeSummary: t("awarenessActiveSummary"),
      icon: "health_metrics",
      accent: "#10ddd0",
      visual: localizedVisual("health-awareness"),
      capabilities: [
        t("feature3Capability1"),
        t("feature3Capability2"),
        t("feature3Capability3"),
      ],
      href: "/health-awareness",
    },
    {
      id: "reports",
      title: t("feature4Title"),
      description: t("feature4Description"),
      activeHeading: t("reportsActiveHeading"),
      activeSummary: t("reportsActiveSummary"),
      icon: "clinical_notes",
      accent: "#f6a724",
      visual: localizedVisual("specialist-ready-reports"),
      capabilities: [
        t("feature4Capability1"),
        t("feature4Capability2"),
        t("feature4Capability3"),
      ],
      href: "/specialist-ready-reports",
    },
    {
      id: "timeline",
      title: t("feature5Title"),
      description: t("feature5Description"),
      activeHeading: t("timelineActiveHeading"),
      activeSummary: t("timelineActiveSummary"),
      icon: "timeline",
      accent: "#8c9dff",
      visual: localizedVisual("health-timeline"),
      capabilities: [
        t("feature5Capability1"),
        t("feature5Capability2"),
        t("feature5Capability3"),
      ],
      href: "/health-timeline",
    },
    {
      id: "life-events",
      title: t("feature6Title"),
      description: t("feature6Description"),
      activeHeading: t("lifeEventsActiveHeading"),
      activeSummary: t("lifeEventsActiveSummary"),
      icon: "add_notes",
      accent: "#10ddd0",
      visual: localizedVisual("log-life-events"),
      capabilities: [
        t("feature6Capability1"),
        t("feature6Capability2"),
        t("feature6Capability3"),
      ],
      href: "/log-life-events",
    },
  ];
  const total = features.length;

  return (
    <div className="w-full flex flex-col gap-10">
      <FeatureShowcaseController
        itemCount={total}
        titles={features.map((feature) => feature.title)}
        accents={features.map((feature) => feature.accent)}
        slideLabels={features.map((feature, index) =>
          t("featurePosition", {
            title: feature.title,
            current: index + 1,
            total,
          }),
        )}
        announcements={features.map((feature, index) =>
          t("activeFeatureAnnouncement", {
            title: feature.title,
            current: index + 1,
            total,
          }),
        )}
        ariaLabel={t("showcaseAriaLabel")}
        carouselDescription={t("carouselDescription")}
        slideDescription={t("slideDescription")}
        scrollPrompt={t("scrollPrompt")}
        previousLabel={t("previousFeature")}
        nextLabel={t("nextFeature")}
        progressLabels={features.map((_, index) =>
          t("featureProgress", {
            current: String(index + 1).padStart(2, "0"),
            total: String(total).padStart(2, "0"),
          }),
        )}
        activeHeadings={features.map((feature) => (
          <ShowcaseHeading
            key={feature.id}
            eyebrow={feature.title}
            heading={feature.activeHeading}
            description={feature.activeSummary}
            accentColor={feature.accent}
          />
        ))}
      >
        <ol className="feature-showcase-track" data-feature-track>
          {features.map((feature, index) => (
            <li
              key={feature.id}
              id={`feature-slide-${feature.id}`}
              className="feature-showcase-slide"
              data-feature-slide
              data-feature-index={index}
              style={
                {
                  "--feature-card-accent": feature.accent,
                } as CSSProperties
              }
            >
              <FeatureCard
                feature={feature}
                newLabel={t("newLabel")}
                learnMore={t("learnMore")}
                linkLabel={t("learnMoreAbout", { title: feature.title })}
              />
            </li>
          ))}
        </ol>
      </FeatureShowcaseController>

      <ScrollReveal>
        <div
          className="relative overflow-hidden rounded-[24px] border border-xbrand/30 p-8 flex items-center gap-6 max-[767px]:items-start max-[767px]:p-6"
          style={{
            background:
              "linear-gradient(135deg, rgba(71,100,255,0.12) 0%, rgba(168,85,247,0.06) 50%, rgba(16,221,208,0.05) 100%), var(--surface-card)",
          }}
        >
          <div className="w-14 h-14 rounded-[16px] bg-xbrand/15 border border-xbrand/30 flex items-center justify-center flex-shrink-0">
            <span
              className="material-symbols-outlined text-xbrand"
              style={{ fontSize: 28 }}
              aria-hidden="true"
            >
              auto_awesome
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="t-overline text-xbrand">
              {t("continuousEyebrow")}
            </span>
            <h3 className="t-h3 text-xprimary">{t("continuousHeading")}</h3>
            <p className="t-body2 text-xsecondary max-w-[78ch]">
              {t("continuousDescription")}
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

function ShowcaseHeading({
  eyebrow,
  heading,
  description,
  accentColor,
}: {
  eyebrow: string;
  heading: string;
  description: string;
  accentColor: string;
}) {
  return (
    <div className="flex max-w-[820px] flex-col gap-3">
      <div
        className="flex w-fit items-center gap-2 rounded-full border px-3 py-1.5"
        style={{
          backgroundColor: `${accentColor}10`,
          borderColor: `${accentColor}38`,
        }}
      >
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: accentColor }}
          aria-hidden="true"
        />
        <span className="t-overline" style={{ color: accentColor }}>
          {eyebrow}
        </span>
      </div>
      <h3 className="t-h3 text-xprimary">{heading}</h3>
      <p className="t-body2 text-xsecondary max-w-[68ch]">{description}</p>
    </div>
  );
}

function FeatureCard({
  feature,
  newLabel,
  learnMore,
  linkLabel,
}: {
  feature: FeatureItem;
  newLabel: string;
  learnMore: string;
  linkLabel: string;
}) {
  return (
    <article className="feature-showcase-card h-full">
      <Link
        href={feature.href}
        className="feature-showcase-card-link group relative block h-full overflow-hidden rounded-[24px] border no-underline"
        style={{
          background: `linear-gradient(135deg, ${feature.accent}18 0%, var(--surface-card) 58%, ${feature.accent}08 100%)`,
          borderColor: `${feature.accent}45`,
        }}
        aria-label={linkLabel}
      >
        <div className="feature-showcase-card-layout grid h-full">
          <div
            className="feature-showcase-visual relative flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: `${feature.accent}09` }}
          >
            <div
              className="absolute w-64 h-64 rounded-full blur-[70px] opacity-25"
              style={{ backgroundColor: feature.accent }}
              aria-hidden="true"
            />

            <FeatureImageSlideshow
              images={feature.visual.images}
              deviceFrame={feature.visual.deviceFrame}
              intervalMs={1200}
            />
          </div>

          <div className="feature-showcase-content flex flex-col justify-center gap-5">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-[12px] flex items-center justify-center"
                style={{
                  color: feature.accent,
                  backgroundColor: `${feature.accent}16`,
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 22 }}
                  aria-hidden="true"
                >
                  {feature.icon}
                </span>
              </div>
              {feature.isNew && (
                <span
                  className="t-overline rounded-full border px-3 py-1"
                  style={{
                    color: feature.accent,
                    backgroundColor: `${feature.accent}10`,
                    borderColor: `${feature.accent}35`,
                  }}
                >
                  {newLabel}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="t-h3 text-xprimary">{feature.title}</h4>
              <p className="t-body2 text-xsecondary">{feature.description}</p>
            </div>

            {feature.capabilities?.length ? (
              <ul className="flex flex-col gap-2">
                {feature.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="feature-showcase-capability flex items-start gap-2.5 t-body3 text-xsecondary"
                  >
                    <span
                      className="material-symbols-outlined mt-0.5 flex-shrink-0"
                      style={{ color: feature.accent, fontSize: 18 }}
                      aria-hidden="true"
                    >
                      check_circle
                    </span>
                    {capability}
                  </li>
                ))}
              </ul>
            ) : null}

            <span className="mt-auto flex items-center gap-2 text-xbrand t-button-sm group-hover:gap-3 transition-[gap] duration-300">
              {learnMore}
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_forward
              </span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
