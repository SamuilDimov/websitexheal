import { getLocale, getTranslations } from "next-intl/server";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  CapacityPulse,
  KpiStrip,
  RevenueChart,
  type Kpi,
} from "@/components/professionals/WorkspaceVisuals";

/**
 * Analytics.
 *
 * The heading is the workspace's own subtitle, and the six tiles are six of
 * the seven headline figures it shows, carrying their real captions
 * ("Completed visits", "Booked capacity", "Upcoming with consent"). The
 * seventh, Returning, is left out only because six tiles grid evenly.
 *
 * The figures are the product's demonstration data and the page says so.
 */
export default async function ProAnalytics() {
  const locale = await getLocale();
  const t = await getTranslations("Pro");

  const kpis: Kpi[] = [
    { key: "revenue", value: 67860, prefix: "£" },
    { key: "appointments", value: 602 },
    { key: "utilisation", value: 69, suffix: "%" },
    { key: "clients", value: 188 },
    { key: "noshow", value: 6.9, decimals: 1, suffix: "%" },
    { key: "ready", value: 76, suffix: "%" },
  ].map((kpi, index) => ({
    ...kpi,
    label: t(`kpi${index + 1}Label`),
    note: t(`kpi${index + 1}Note`),
  }));

  return (
    <section aria-labelledby="pro-analytics-heading" className="bg-xbg-2">
      <div className="x-container x-section flex flex-col gap-12 md:gap-14">
        <ScrollReveal>
          <div className="flex flex-col gap-4">
            <h2
              id="pro-analytics-heading"
              className="t-display2 text-xprimary max-w-[18ch]"
            >
              {t("analyticsHeading")}
            </h2>
            <p className="t-lead text-xsecondary max-w-[56ch]">
              {t("analyticsLead")}
            </p>
          </div>
        </ScrollReveal>

        <KpiStrip items={kpis} locale={locale} />

        <div className="pro-analytics-grid">
          <RevenueChart
            title={t("chartTitle")}
            sub={t("chartSub")}
            range={t("chartRange")}
            legendRevenue={t("chartLegendRevenue")}
            legendVisits={t("chartLegendVisits")}
            alt={t("chartAlt")}
            weeks={t("chartWeeks").split(",")}
            locale={locale}
          />
          <CapacityPulse
            title={t("pulseTitle")}
            sub={t("pulseSub")}
            days={t("pulseDays").split(",")}
          />
        </div>

        <p className="t-caption text-xtertiary">{t("analyticsSample")}</p>
      </div>
    </section>
  );
}
