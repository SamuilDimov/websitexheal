import { getLocale, getTranslations } from "next-intl/server";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Marquee from "@/components/ui/Marquee";
import { getTestimonials } from "@/data/testimonials";

const CURATED = [0, 12, 22, 32, 42, 52, 62, 72, 82, 92, 102, 112];

/**
 * Proof: numerals first, standards second, voices third. Initials replace
 * portraits until real photos with consent exist. The marquee pauses when
 * off-screen and on hover.
 */
export default async function ProofSection() {
  const locale = await getLocale();
  const t = await getTranslations("Proof");
  const testimonials = getTestimonials(locale);
  const picks = CURATED.map((i) => testimonials[i]).filter(Boolean);

  const numerals = [1, 2, 3].map((n) => ({
    value: t(`numeral${n}`),
    label: t(`numeral${n}Label`),
    note: t(`numeral${n}Note`),
  }));

  return (
    <section aria-labelledby="proof-heading" className="bg-xbg">
      <div className="x-container x-section flex flex-col gap-14 md:gap-20">
        <ScrollReveal>
          <div className="flex flex-col gap-4">
            <h2 id="proof-heading" className="t-display2 text-xprimary max-w-[20ch]">
              {t("heading")}
            </h2>
          </div>
        </ScrollReveal>

        <ul role="list" className="grid gap-10 border-y x-hairline py-10 md:grid-cols-3 md:gap-8 md:py-12">
          {numerals.map((item, index) => (
            <li key={item.label} className="flex flex-col gap-3 md:border-l md:border-xborder md:pl-8 md:first:border-l-0 md:first:pl-0">
              <ScrollReveal delay={index * 80}>
                <p className="t-numeral text-xprimary">{item.value}</p>
                <p className="t-h5 text-xprimary mt-3">{item.label}</p>
                <p className="t-data text-xtertiary mt-2">{item.note}</p>
              </ScrollReveal>
            </li>
          ))}
        </ul>

        <ScrollReveal>
          <p className="t-data text-xtertiary">{t("standards")}</p>
        </ScrollReveal>
      </div>

      <Marquee ariaLabel={t("voicesLabel")}>
        {picks.map((item) => (
          <figure key={item.name} className="x-card mx-2.5 flex w-[320px] flex-none flex-col gap-5 p-6 md:w-[360px]">
            <blockquote className="t-body2 text-xprimary m-0 border-0 p-0">{item.quote}</blockquote>
            <figcaption className="mt-auto flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-xbrand/10 t-data text-xbrand"
              >
                {initials(item.name)}
              </span>
              <span className="t-data text-xsecondary">{item.name}</span>
            </figcaption>
          </figure>
        ))}
      </Marquee>
    </section>
  );
}

function initials(name: string) {
  return name
    .split(",")[0]
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
