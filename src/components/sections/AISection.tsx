import Image from "next/image";
import { useTranslations } from "next-intl";
import { APP_STORE_URL } from "@/lib/site";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Icon from "@/components/ui/Icon";
import PhoneFrame from "@/components/ui/PhoneFrame";
import ChatTranscript from "@/components/ui/ChatTranscript";

/**
 * Digital Twin chapter: the one dark section on the page. The full v2 dark
 * token set is in force via `data-surface="dark"`. The phone is pinned while
 * three cards scroll past; the chat transcript is rendered as UI and types in
 * once when it enters the viewport.
 */
export default function AISection() {
  const t = useTranslations("AI");

  const cards = [
    { icon: "hub", title: t("card1Title"), text: t("card1Text") },
    { icon: "schedule", title: t("card2Title"), text: t("card2Text") },
    { icon: "clinical_notes", title: t("card3Title"), text: t("card3Text") },
  ];

  return (
    <section
      id="digital-twin"
      data-surface="dark"
      aria-labelledby="ai-heading"
      className="relative bg-xbg text-xprimary"
    >
      <div className="x-container py-24 md:py-32 lg:py-40">
        <ScrollReveal>
          <div className="flex flex-col gap-5">
            <span className="t-eyebrow text-xtertiary">{t("eyebrow")}</span>
            <h2 id="ai-heading" className="t-display2 text-xprimary max-w-[22ch]">
              {t("heading")} {t("headingAccent")}
            </h2>
            <p className="t-lead text-xsecondary max-w-[56ch]">{t("lead")}</p>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-8">
          {/* Pinned phone with the real chat as UI */}
          <div className="order-first md:order-last md:col-span-5 md:col-start-8 md:self-start md:sticky md:top-[12vh]">
            <div>
              <PhoneFrame className="mx-auto w-[min(320px,78%)]" aspectRatio="810 / 1654">
                <ChatTranscript />
              </PhoneFrame>
            </div>
          </div>

          <ol role="list" className="flex flex-col md:col-span-6">
            {cards.map((card, index) => (
              <li
                key={card.title}
                className="flex flex-col gap-4 border-t x-hairline py-10 md:min-h-[48vh] md:justify-center"
              >
                <ScrollReveal delay={index * 60}>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-xbrand/15 text-xbrand-light">
                    <Icon name={card.icon} size={20} />
                  </span>
                  <h3 className="t-h2 text-xprimary mt-5 max-w-[18ch]">{card.title}</h3>
                  <p className="t-body1 text-xsecondary mt-3 max-w-[44ch]">{card.text}</p>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </div>

        <ScrollReveal className="mt-16 flex flex-col items-start gap-4 border-t x-hairline pt-10 md:mt-20 md:flex-row md:items-center md:justify-between">
          <p className="t-body2 text-xtertiary max-w-[60ch]">{t("standards")}</p>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="x-store-badge"
          >
            <Image src="/images/app-store-badge.svg" alt={t("downloadOnAppStore")} width={150} height={50} />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
