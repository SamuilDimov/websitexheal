import Image from "next/image";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function AISection() {
  const t = useTranslations("AI");

  return (
    <section className="bg-xbg relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 70% 50%, rgba(232, 68, 127, 0.08) 0%, transparent 70%)",
        }}
      />
      <div className="relative w-full max-w-[1440px] mx-auto px-10 py-24 flex flex-col gap-16 max-[991px]:px-8 max-[991px]:py-16 max-[479px]:px-5">
        <ScrollReveal>
          <div className="grid grid-cols-[1.4fr_1fr] gap-16 items-center max-[991px]:gap-10 max-[767px]:grid-cols-1">
            {/* Left Column - Text */}
            <div className="grid grid-cols-1 gap-8">
              <span className="badge badge-ai self-start">{t("headingAccent")}</span>
              <h2 className="t-display2 text-xprimary max-w-[20ch]">
                {t("heading")}{" "}
                <span className="text-xbrand">{t("headingAccent")}</span>
              </h2>
              <div className="flex flex-col gap-4 max-w-[58ch]">
                <p className="t-body1 text-xsecondary">{t("paragraph1")}</p>
                <p className="t-body1 text-xsecondary">{t("paragraph2")}</p>
                <p className="t-body1 text-xsecondary">{t("paragraph3")}</p>
              </div>
            </div>

            {/* Right Column - chat-flare-up screenshot */}
            <div className="flex justify-center max-[767px]:mt-6">
              <div className="relative">
                <div
                  className="absolute inset-0 -z-10 blur-[60px] opacity-50"
                  aria-hidden
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(232, 68, 127, 0.4) 0%, transparent 70%)",
                  }}
                />
                <Image
                  src="/images/screenshots/chat-flare-up.png"
                  alt={t("downloadOnAppStore")}
                  width={808}
                  height={1660}
                  className="w-[360px] max-w-full max-[767px]:max-w-[300px]"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* App Store Badge */}
        <div className="flex justify-center">
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
