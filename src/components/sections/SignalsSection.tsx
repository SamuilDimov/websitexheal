import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Icon from "@/components/ui/Icon";

/**
 * Signals: three real insight cards from the app, rendered as components so
 * they stay crisp and translate. The category colour appears only as a dot.
 * On mobile the cards run as a horizontal snap row.
 */
export default function SignalsSection() {
  const t = useTranslations("Signals");
  const h = useTranslations("HowItWorks");

  const signals = [
    {
      icon: "bedtime",
      color: "var(--viz-purple)",
      label: h("insight1Label"),
      text: h("insight1Text"),
      meta: t("signal1Meta"),
    },
    {
      icon: "warning",
      color: "var(--viz-orange)",
      label: h("insight2Label"),
      text: h("insight2Text"),
      meta: t("signal2Meta"),
    },
    {
      icon: "science",
      color: "var(--status-error)",
      label: h("insight4Label"),
      text: h("insight4Text"),
      meta: t("signal3Meta"),
    },
  ];

  return (
    <section aria-labelledby="signals-heading" className="bg-xbg">
      <div className="x-container x-section flex flex-col gap-12 md:gap-16">
        <ScrollReveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
            <div className="flex flex-col gap-4">
              <h2 id="signals-heading" className="t-display2 text-xprimary max-w-[20ch]">
                {t("heading")}
              </h2>
            </div>
            <p className="t-body1 text-xsecondary max-w-[38ch]">{t("closing")}</p>
          </div>
        </ScrollReveal>

        <ul
          role="list"
          className="x-snap-row -mx-6 flex gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0"
        >
          {signals.map((signal, index) => (
            <li key={signal.label} className="x-snap-item w-[82%] flex-none md:w-auto">
              <ScrollReveal delay={index * 70} className="h-full">
                <article className="x-card flex h-full flex-col gap-6 p-6 md:p-7">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full"
                      style={{ backgroundColor: `color-mix(in srgb, ${signal.color} 14%, transparent)`, color: signal.color }}
                    >
                      <Icon name={signal.icon} size={18} />
                    </span>
                  </div>
                  <p className="t-h3 text-xprimary">{signal.text}</p>
                  <p className="t-data text-xtertiary mt-auto flex items-center gap-2">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: signal.color }} />
                    {signal.meta}
                  </p>
                </article>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
