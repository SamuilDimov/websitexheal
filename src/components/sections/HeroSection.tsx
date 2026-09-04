import Image from "next/image";
import { useTranslations } from "next-intl";
import { APP_STORE_URL } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import RollText from "@/components/ui/RollText";
import DeviceCanvas from "@/components/ui/DeviceCanvas";

/**
 * Hero (redesign phase 2).
 *
 * One headline, one phone, one ask. The copy sits on a full-bleed hero wash
 * over the page-wide `DotDome` layer (mounted in `page.tsx`); the phone
 * stands on the section's bottom edge. Samuil cut the mono eyebrow and the
 * proof strip (parameters, standards, setup time) from here — the headline
 * now opens the page cold. The strings stay in the catalog: Proof still uses
 * the standards line, and `Hero.eyebrow`/`proof1-3` are one edit from coming
 * back.
 *
 * The phone is a live 3D model (`HeroModel`), not a render sequence.
 */
export default function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section id="hero" className="hero-panel relative overflow-hidden pt-[72px]">
      <div className="x-container relative">
        <div className="relative">
          <div className="grid gap-10 pt-14 md:grid-cols-12 md:gap-8 md:pt-24">
            <div className="flex flex-col items-start gap-6 pb-2 md:col-span-7 md:pb-24 lg:col-span-7">
              <h1 className="t-display1 text-xprimary max-w-[13ch]">{t("heading")}</h1>
              <p className="t-lead text-xsecondary max-w-[46ch]">{t("lead")}</p>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="x-store-badge"
                  data-magnetic
                >
                  <Image
                    src="/images/app-store-badge.svg"
                    alt={t("downloadOnAppStore")}
                    width={168}
                    height={56}
                    priority
                  />
                </a>
                <a href="#how-it-works" className="x-link t-button-sm" data-magnetic>
                  <span data-magnetic-inner>
                    <RollText>{t("secondaryCta")}</RollText>
                    <Icon name="arrow_forward" size={16} />
                  </span>
                </a>
              </div>

              <p className="t-caption text-xtertiary max-w-[52ch]">{t("disclaimer")}</p>
            </div>

            <div className="relative flex items-end justify-center md:col-span-5 md:justify-end">
              {/* Live GLB of the Blender phone, lit and animated in three.js. */}
              <DeviceCanvas
                screen="/images/screens-hero.webp"
                entrance="flip"
                scrollScope="#hero"
                parallax={0}
                className="w-[86%] max-w-[420px] md:w-full md:max-w-[480px]"
              />
              <span className="sr-only">{t("phoneAlt")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
