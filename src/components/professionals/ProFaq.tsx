import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Icon from "@/components/ui/Icon";

/** The five things a practice asks first. Native disclosure, no JS. */
export default function ProFaq() {
  const t = useTranslations("Pro");
  const items = [1, 2, 3, 4, 5].map((n) => ({
    q: t(`faq${n}Q`),
    a: t(`faq${n}A`),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section
      id="faq"
      aria-labelledby="pro-faq-heading"
      className="scroll-mt-[88px] bg-xbg"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="x-container x-section grid gap-10 md:grid-cols-12 md:gap-8">
        <ScrollReveal className="md:col-span-4">
          <div className="flex flex-col gap-4 md:sticky md:top-[14vh]">
            <h2
              id="pro-faq-heading"
              className="t-display2 text-xprimary max-w-[12ch]"
            >
              {t("faqHeading")}
            </h2>
          </div>
        </ScrollReveal>
        <div className="md:col-span-8">
          {items.map((item, index) => (
            <ScrollReveal key={item.q} delay={index * 40}>
              <details className="faq group border-t x-hairline last:border-b">
                <summary className="faq__summary flex cursor-pointer list-none items-center justify-between gap-6 py-5 md:py-6">
                  <span className="t-h4 text-xprimary">{item.q}</span>
                  <span className="faq__icon inline-flex h-8 w-8 flex-none items-center justify-center rounded-full border x-hairline text-xtertiary">
                    <Icon name="expand_more" size={16} />
                  </span>
                </summary>
                <div className="faq__body">
                  <p className="t-body1 text-xsecondary max-w-[60ch] pb-6">
                    {item.a}
                  </p>
                </div>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
