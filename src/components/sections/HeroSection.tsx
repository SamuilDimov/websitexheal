import Image from "next/image";
import { useTranslations } from "next-intl";
import { APP_STORE_URL } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import HeroSequence from "@/components/ui/HeroSequence";

/**
 * Hero (redesign phase 2).
 *
 * One headline, one phone, one ask. The copy sits on a full-bleed hero wash
 * over the page-wide `DotDome` layer (mounted in `page.tsx`); the phone
 * stands on the section's bottom edge. The proof strip carries parameters, standards and setup time; the
 * App Store rating is held until the count is worth showing.
 *
 * The 4-second play-once capture specified in the brief replaces the static
 * phone once it exists; `HeroVideo` stays in the tree for that.
 */
export default function HeroSection() {
  const t = useTranslations("Hero");

  const proof = [t("proof1"), t("proof2"), t("proof3")];

  return (
    <section id="hero" className="hero-panel relative overflow-hidden pt-[72px]">
      <div className="x-container relative">
        <div className="relative">
          <div className="grid gap-10 pt-14 md:grid-cols-12 md:gap-8 md:pt-24">
            <div className="flex flex-col items-start gap-6 pb-2 md:col-span-7 md:pb-24 lg:col-span-7">
              <span className="t-eyebrow text-xtertiary">{t("eyebrow")}</span>
              <h1 className="t-display1 text-xprimary max-w-[13ch]">{t("heading")}</h1>
              <p className="t-lead text-xsecondary max-w-[46ch]">{t("lead")}</p>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="x-store-badge"
                >
                  <Image
                    src="/images/app-store-badge.svg"
                    alt={t("downloadOnAppStore")}
                    width={168}
                    height={56}
                    priority
                  />
                </a>
                <a href="#how-it-works" className="x-link t-button-sm">
                  {t("secondaryCta")}
                  <Icon name="arrow_forward" size={16} />
                </a>
              </div>

              <p className="t-caption text-xtertiary max-w-[52ch]">{t("disclaimer")}</p>

              <ul
                role="list"
                className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t x-hairline pt-5"
              >
                {proof.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 t-data text-xsecondary">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-xbrand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative flex items-end justify-center md:col-span-5 md:justify-end">
              {/* Scroll-driven phone sequence from the AE render; see HeroSequence. */}
              <HeroSequence
                scrollScope="#hero"
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
