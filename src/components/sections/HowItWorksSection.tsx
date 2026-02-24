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
    <section
      id="how-it-works"
      style={{
        backgroundImage: "url(/images/wave.svg)",
        backgroundPosition: "50% 65%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto 24em",
      }}
    >
      <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[80px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
        <ScrollReveal>
          <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-center max-[991px]:text-[3rem]">
            {t("heading")} <span className="text-xdark-blue">{t("headingAccent")}</span>
          </h2>
        </ScrollReveal>

        {/* Steps 1 & 2 */}
        <div className="grid grid-cols-2 gap-[20px] max-w-[1280px] w-full items-stretch max-[991px]:grid-cols-1">
          {/* Step 1: INPUT - Checklist */}
          <ScrollReveal delay={0} className="flex">
            <div className="border border-xlight-blue-low bg-xwhite text-xdark-blue rounded-[16px] flex flex-col gap-[20px] p-[28px] pt-[44px] shadow-[0_4px_4px_#1419330d] w-full">
              <div className="flex items-center gap-[14px]">
                <StepBadge number={1} />
                <h3
                  className="font-medium leading-[1] tracking-[-0.02em]"
                  style={{ fontSize: "28px" }}
                >
                  {t("step1Title")}
                </h3>
              </div>
              <p
                className="leading-[1.55]"
                style={{ fontSize: "18px", color: "rgba(20, 25, 51, 0.6)" }}
              >
                {t("step1Description")}
              </p>
              <OnboardingChecklist />
              <CardFooter
                icon="lock"
                text={t("step1Footer")}
              />
            </div>
          </ScrollReveal>

          {/* Step 2: INTELLIGENCE - Cycling insights */}
          <ScrollReveal delay={100} className="flex">
            <div className="border border-xlight-blue-low bg-xwhite text-xdark-blue rounded-[16px] flex flex-col gap-[20px] p-[28px] pt-[44px] shadow-[0_4px_4px_#1419330d] w-full">
              <div className="flex items-center gap-[14px]">
                <StepBadge number={2} />
                <h3
                  className="font-medium leading-[1] tracking-[-0.02em]"
                  style={{ fontSize: "28px" }}
                >
                  {t("step2Title")}
                </h3>
              </div>
              <p
                className="leading-[1.55]"
                style={{ fontSize: "18px", color: "rgba(20, 25, 51, 0.6)" }}
              >
                {t("step2Description")}
              </p>
              <InsightPreview items={step2Items} />
              <CardFooter
                icon="psychology"
                text={t("step2Footer")}
                pulse
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Step 3: OUTPUT - Outcome carousel (full width, highlighted) */}
        <ScrollReveal delay={200} className="w-full max-w-[1280px]">
          <div className="border border-xlight-blue-low bg-xwhite text-xdark-blue rounded-[16px] flex gap-[40px] p-[40px] shadow-[0_4px_4px_#1419330d] w-full max-[991px]:flex-col max-[991px]:gap-[20px] max-[991px]:p-[28px]">
            {/* Left: header + description */}
            <div className="flex flex-col gap-[16px] flex-shrink-0 max-[991px]:max-w-none" style={{ maxWidth: "380px" }}>
              <div className="flex items-center gap-[14px]">
                <StepBadge number={3} />
                <h3
                  className="font-medium leading-[1] tracking-[-0.02em]"
                  style={{ fontSize: "32px" }}
                >
                  {t("step3Title")}
                </h3>
              </div>
              <p
                className="leading-[1.55]"
                style={{ fontSize: "18px", color: "rgba(20, 25, 51, 0.6)" }}
              >
                {t("step3Description")}
              </p>
              <div className="mt-auto max-[991px]:hidden">
                <CardFooter
                  icon="trending_up"
                  text={t("step3Footer")}
                />
              </div>
            </div>

            {/* Right: carousel */}
            <div className="flex-1 min-w-0">
              <OutcomeCarousel />
            </div>

            {/* Footer on mobile only */}
            <div className="hidden max-[991px]:block">
              <CardFooter
                icon="trending_up"
                text={t("step3Footer")}
              />
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
      className="flex items-center justify-center rounded-full flex-shrink-0"
      style={{
        width: "42px",
        height: "42px",
        backgroundColor: "rgba(71, 100, 255, 0.1)",
        fontSize: "17px",
        fontWeight: 600,
        color: "#4764FF",
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
    <div className="flex items-center gap-[12px] pt-[8px] mt-auto">
      <div
        className="relative flex items-center justify-center rounded-full flex-shrink-0"
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: "rgba(71, 100, 255, 0.08)",
        }}
      >
        <span
          style={{
            fontFamily: "MaterialSymbolsRounded",
            fontSize: "20px",
            color: "#4764FF",
          }}
        >
          {icon}
        </span>
        {pulse && (
          <span
            className="absolute inset-0 rounded-full"
            style={{
              border: "2px solid rgba(71, 100, 255, 0.3)",
              animation: "pulseRing 2s ease-out infinite",
            }}
          />
        )}
      </div>
      <span
        className="leading-[1.35]"
        style={{
          fontSize: "14px",
          color: "rgba(20, 25, 51, 0.45)",
        }}
      >
        {text}
      </span>
    </div>
  );
}
