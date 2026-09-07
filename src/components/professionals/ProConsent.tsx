import { getLocale, getTranslations } from "next-intl/server";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ConsentCard } from "@/components/professionals/WorkspaceVisuals";

/**
 * Consent.
 *
 * The differentiator, and the one section that has to be exactly true. Every
 * sentence here restates the workspace's own banner: readiness reflects the
 * client's latest choice, and private appointments remain private. The card
 * beside the copy is that banner, rebuilt.
 */
export default async function ProConsent() {
  const locale = await getLocale();
  const t = await getTranslations("Pro");

  const points = [1, 2, 3].map((n) => ({
    title: t(`consentPoint${n}Title`),
    body: t(`consentPoint${n}Body`),
  }));

  return (
    <section
      id="consent"
      aria-labelledby="pro-consent-heading"
      className="scroll-mt-[88px] bg-xbg"
    >
      <div className="x-container x-section grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-6">
          <ScrollReveal>
            <div className="flex flex-col gap-4">
              <p className="t-eyebrow text-xtertiary">{t("consentEyebrow")}</p>
              <h2
                id="pro-consent-heading"
                className="t-display2 text-xprimary max-w-[16ch]"
              >
                {t("consentHeading")}
              </h2>
              <p className="t-lead text-xsecondary max-w-[46ch]">
                {t("consentLead")}
              </p>
            </div>
          </ScrollReveal>

          <ul role="list" className="mt-10 flex flex-col">
            {points.map((point, index) => (
              <li key={point.title} className="border-t x-hairline py-5 last:border-b">
                <ScrollReveal delay={index * 70}>
                  <p className="t-h5 text-xprimary">{point.title}</p>
                  <p className="t-body2 text-xsecondary mt-2 max-w-[48ch]">
                    {point.body}
                  </p>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-6 md:pl-6">
          <ScrollReveal>
            <ConsentCard
              bannerTitle={t("consentBannerTitle")}
              bannerBody={t("consentBannerBody")}
              meterLabel={t("consentMeterLabel")}
              meterCaption={t("consentMeterCaption")}
              locale={locale}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
