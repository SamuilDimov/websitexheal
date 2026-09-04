import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";

/** Problem: three short statements from the brand's audience segments. */
export default function ProblemSection() {
  const t = useTranslations("Problem");
  const items = [1, 2, 3].map((n) => ({
    lead: t(`item${n}Lead`),
    body: t(`item${n}Body`),
  }));

  return (
    <section aria-labelledby="problem-heading" className="bg-xbg-2">
      <div className="x-container x-section flex flex-col gap-12 md:gap-16">
        <ScrollReveal>
          <div className="flex flex-col gap-4">
            <span className="t-eyebrow text-xtertiary">{t("eyebrow")}</span>
            <h2 id="problem-heading" className="t-display2 text-xprimary max-w-[18ch]">
              {t("heading")}
            </h2>
          </div>
        </ScrollReveal>
        <ul role="list" className="grid gap-8 md:grid-cols-3 md:gap-0">
          {items.map((item, index) => (
            <li
              key={item.lead}
              className="flex flex-col gap-3 md:border-l md:border-xborder md:px-8 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
            >
              <ScrollReveal delay={index * 80}>
                <p className="t-h4 text-xprimary">{item.lead}</p>
                <p className="t-body2 text-xsecondary mt-2">{item.body}</p>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
