import Image from "next/image";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function AISection() {
  const t = useTranslations("AI");

  return (
    <section>
      <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col gap-[80px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
        <ScrollReveal>
          <div className="grid grid-cols-[1.65fr_1fr] gap-[80px] rounded-[12px] max-[991px]:gap-[40px] max-[767px]:grid-cols-1">
            {/* Left Column - Text */}
            <div className="grid grid-cols-1 gap-[40px]">
              <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] max-w-[20ch] max-[991px]:text-[3rem]">
                {t("heading")}{" "}
                <span className="text-xdark-blue">
                  {t("headingAccent")}
                </span>
              </h2>
              <div className="flex flex-col gap-[20px] max-w-[51ch]">
                <p className="text-xblack-70 text-[1.125rem] max-[767px]:text-[1rem]">
                  {t("paragraph1")}
                </p>
                <p className="text-xblack-70 text-[1.125rem] max-[767px]:text-[1rem]">
                  {t("paragraph2")}
                </p>
                <p className="text-xblack-70 text-[1.125rem] max-[767px]:text-[1rem]">
                  {t("paragraph3")}
                </p>
              </div>
            </div>

            {/* Right Column - 360 SVG */}
            <Image
              src="/images/xheal-360.svg"
              alt="xHeal 360"
              width={600}
              height={600}
              className="w-full"
            />
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
