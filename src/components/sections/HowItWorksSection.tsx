import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import InsightPreview, {
  type InsightItem,
} from "@/components/ui/InsightPreview";
import OnboardingChecklist from "@/components/ui/OnboardingChecklist";
import OutcomeCarousel from "@/components/ui/OutcomeCarousel";

export default function HowItWorksSection() {
  const t = useTranslations("HowItWorks");

  const step2Items: InsightItem[] = [
    {
      icon: "bedtime",
      label: t("insight1Label"),
      text: t("insight1Text"),
      color: "#6366f1",
    },
    {
      icon: "warning",
      label: t("insight2Label"),
      text: t("insight2Text"),
      color: "#f59e0b",
    },
    {
      icon: "link",
      label: t("insight3Label"),
      text: t("insight3Text"),
      color: "#10b981",
    },
    {
      icon: "science",
      label: t("insight4Label"),
      text: t("insight4Text"),
      color: "#ef4444",
    },
  ];

  return (
    <section id="how-it-works" className="bg-xbg relative overflow-hidden">
      {/* Subtle gradient backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(71, 100, 255, 0.08) 0%, transparent 70%)",
        }}
      />
      <div className="relative w-full max-w-[1440px] mx-auto px-10 py-24 flex flex-col items-center gap-16 max-[991px]:px-8 max-[991px]:py-16 max-[479px]:px-5">
        <ScrollReveal>
          <h2 className="t-display2 text-xprimary text-center">
            {t("heading")} <span className="text-xbrand">{t("headingAccent")}</span>
          </h2>
        </ScrollReveal>

        {/* Steps 1 & 2 */}
        <div className="grid grid-cols-2 gap-5 w-full items-stretch max-[991px]:grid-cols-1">
          {/* Step 1: INPUT - Checklist */}
          <ScrollReveal delay={0} className="flex">
            <div className="surface-card-feature flex flex-col gap-5 p-8 pt-10 w-full relative overflow-hidden">
              <div className="flex items-center gap-3">
                <StepBadge number={1} />
                <h3 className="t-h3 text-xprimary">{t("step1Title")}</h3>
              </div>
              <p className="t-body1 text-xsecondary">{t("step1Description")}</p>
              <OnboardingChecklist />
              <CardFooter icon="lock" text={t("step1Footer")} />
            </div>
          </ScrollReveal>

          {/* Step 2: INTELLIGENCE - Cycling insights */}
          <ScrollReveal delay={100} className="flex">
            <div className="surface-card-feature flex flex-col gap-5 p-8 pt-10 w-full relative overflow-hidden">
              <div className="flex items-center gap-3">
                <StepBadge number={2} />
                <h3 className="t-h3 text-xprimary">{t("step2Title")}</h3>
              </div>
              <p className="t-body1 text-xsecondary">{t("step2Description")}</p>
              <InsightPreview items={step2Items} />
              <CardFooter icon="psychology" text={t("step2Footer")} pulse />
            </div>
          </ScrollReveal>
        </div>

        {/* Step 3: OUTPUT - Outcome carousel (full width) */}
        <ScrollReveal delay={200} className="w-full">
          <div className="surface-card-feature flex gap-10 p-10 w-full max-[991px]:flex-col max-[991px]:gap-5 max-[991px]:p-7 relative overflow-hidden">
            {/* Left: header + description */}
            <div className="flex flex-col gap-4 flex-shrink-0 max-[991px]:max-w-none" style={{ maxWidth: "380px" }}>
              <div className="flex items-center gap-3">
                <StepBadge number={3} />
                <h3 className="t-h2 text-xprimary">{t("step3Title")}</h3>
              </div>
              <p className="t-body1 text-xsecondary">{t("step3Description")}</p>
              <div className="mt-auto max-[991px]:hidden">
                <CardFooter icon="trending_up" text={t("step3Footer")} />
              </div>
            </div>

            {/* Right: carousel */}
            <div className="flex-1 min-w-0">
              <OutcomeCarousel />
            </div>

            {/* Footer on mobile only */}
            <div className="hidden max-[991px]:block">
              <CardFooter icon="trending_up" text={t("step3Footer")} />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function StepBadge({ number }: { number: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full flex-shrink-0 t-h6 text-xbrand"
      style={{
        width: 42,
        height: 42,
        backgroundColor: "rgba(71, 100, 255, 0.15)",
        border: "1px solid rgba(71, 100, 255, 0.3)",
      }}
    >
      {number}
    </div>
  );
}

function CardFooter({
  icon,
  text,
  pulse,
}: {
  icon: string;
  text: string;
  pulse?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 pt-2 mt-auto">
      <div
        className="relative flex items-center justify-center rounded-full flex-shrink-0"
        style={{
          width: 40,
          height: 40,
          backgroundColor: "rgba(71, 100, 255, 0.12)",
        }}
      >
        <span
          style={{
            fontFamily: "MaterialSymbolsRounded",
            fontSize: 20,
            color: "var(--brand-600)",
          }}
        >
          {icon}
        </span>
        {pulse && (
          <span
            className="absolute inset-0 rounded-full"
            style={{
              border: "2px solid rgba(71, 100, 255, 0.4)",
              animation: "pulseRing 2s ease-out infinite",
            }}
          />
        )}
      </div>
      <span className="t-body3 text-xtertiary">{text}</span>
    </div>
  );
}
