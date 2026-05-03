import Image from "next/image";
import { useTranslations } from "next-intl";
import MedicalStandardsBadge from "@/components/ui/MedicalStandardsBadge";
import ComplianceBadges from "@/components/ui/ComplianceBadges";
import IntegrationLogosStrip from "@/components/ui/IntegrationLogosStrip";

export default function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="relative overflow-clip bg-xbg">
      {/* Subtle radial glow backdrop */}
      <div className="absolute inset-0 pointer-events-none bg-radial-glow" aria-hidden />
      {/* Optional dot matrix overlay for texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage: "url(/images/dot-matrix.svg)",
          backgroundPosition: "50% 0%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />

      <div className="relative w-full max-w-[1440px] mx-auto px-10 pt-[160px] pb-[100px] max-[991px]:px-8 max-[991px]:pt-[120px] max-[991px]:pb-[60px] max-[479px]:px-5">
        <div className="grid grid-cols-[1.4fr_1fr] gap-[80px] max-[991px]:gap-[40px] max-[767px]:grid-cols-1">
          {/* Left Column */}
          <div className="grid grid-cols-1 gap-10">
            {/* Heading */}
            <h1 className="t-display1 text-xprimary">
              {t("heading")}{" "}
              <span className="text-xbrand">{t("headingAccent")}</span>
            </h1>

            {/* Subtitle */}
            <p className="t-h4 text-xsecondary max-w-[52ch] font-normal">
              {t("subtitle")}
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 max-[991px]:grid-cols-1">
              {/* Stat 1 — purple/brand accent */}
              <div className="surface-card-feature p-5 flex flex-col gap-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-xbrand" />
                <div className="t-h3 text-xprimary">{t("stat1Title")}</div>
                <p className="t-body3 text-xsecondary">{t("stat1Text")}</p>
              </div>

              {/* Stat 2 — teal accent */}
              <div className="surface-card-feature p-5 flex flex-col gap-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-theme-teal" />
                <div className="t-h3 text-xprimary">{t("stat2Title")}</div>
                <p className="t-body3 text-xsecondary">{t("stat2Text")}</p>
              </div>

              {/* Stat 3 — amber accent (rating + avatars) */}
              <div className="surface-card-feature p-5 flex flex-col gap-3 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-theme-amber" />
                <div className="t-h3 text-xprimary">{t("stat3Title")}</div>
                <div className="flex items-center gap-[2px]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#F6A724" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                {/* Overlapping avatar bubbles */}
                <div className="flex items-center -space-x-2">
                  {[
                    "/images/testimonials/kristiyan.png",
                    "/images/testimonials/james.jpeg",
                    "/images/testimonials/jessica.jpeg",
                    "/images/testimonials/t-015.png",
                    "/images/testimonials/t-016.png",
                  ].map((src, i) => (
                    <Image
                      key={i}
                      src={src}
                      alt=""
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-xcard object-cover"
                      style={{ width: 32, height: 32, zIndex: 5 - i }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* App Store Badge + Trust Signals */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-6 flex-wrap">
                <a
                  href="https://apps.apple.com/us/app/xheal/id6748074977"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/images/app-store-badge.svg"
                    alt={t("downloadOnAppStore")}
                    width={180}
                    height={60}
                    priority
                  />
                </a>
                <MedicalStandardsBadge />
                <ComplianceBadges />
              </div>
              <span className="t-body3 text-xtertiary">{t("freeToDownload")}</span>
              <IntegrationLogosStrip />
            </div>
          </div>

          {/* Right Column - Phone (new device-framed mockup) */}
          <div className="flex justify-end self-start max-[767px]:justify-center">
            <div className="relative">
              {/* Subtle blue glow behind phone */}
              <div
                className="absolute inset-0 -z-10 blur-[60px] opacity-50"
                aria-hidden
                style={{
                  background:
                    "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(71, 100, 255, 0.4) 0%, transparent 70%)",
                }}
              />
              <Image
                src="/images/screenshots/routine.png"
                alt={t("dashboardAlt")}
                width={808}
                height={1660}
                className="w-[420px] max-w-full max-[767px]:max-w-[320px] animate-[floatPhone_6s_ease-in-out_infinite]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
