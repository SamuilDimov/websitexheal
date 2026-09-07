import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * Who the workspace is for.
 *
 * The consumer page runs `WorksWithSection` here — the sources xHeal reads.
 * Its professional counterpart names the rooms the workspace belongs in.
 * These are practice types, not customers: nothing on this page claims a
 * logo we have not earned.
 */
export default function ProBuiltFor() {
  const t = useTranslations("Pro");
  const items = [1, 2, 3, 4, 5].map((n) => t(`builtFor${n}`));

  return (
    <section aria-labelledby="pro-built-for" className="border-y x-hairline bg-xbg">
      <div className="x-container flex flex-col gap-6 py-12 md:flex-row md:items-baseline md:gap-12 md:py-14">
        <h2
          id="pro-built-for"
          className="t-h4 text-xprimary max-w-[22ch] md:max-w-[26ch] md:flex-none"
        >
          {t("builtForHeading")}
        </h2>
        <ScrollReveal className="md:flex-1">
          <ul role="list" className="flex flex-wrap gap-x-3 gap-y-3">
            {items.map((item) => (
              <li key={item} className="pro-chip t-data">
                {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
