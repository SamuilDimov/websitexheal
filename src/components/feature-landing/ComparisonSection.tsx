"use client";

import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";

import Icon from "@/components/ui/Icon";
type CellValue = "yes" | "no" | "partial" | "n/a" | string;

interface ComparisonRow {
  feature: string;
  values: CellValue[];
}

interface ComparisonSectionProps {
  heading: string;
  headingAccent: string;
  intro: string;
  columns: string[];
  rows: ComparisonRow[];
  closingLine: string;
  highlightColumn?: number; // index of the xHeal column (default: last)
  highlightLabel?: string;
  methodology?: string;
  sources?: { label: string; url: string }[];
  disclaimer?: string;
}

function CellContent({
  value,
  yesLabel,
  noLabel,
  partialLabel,
  naLabel,
}: {
  value: CellValue;
  yesLabel: string;
  noLabel: string;
  partialLabel: string;
  naLabel: string;
}) {
  if (value === "yes") {
    return (
      <span className="inline-flex text-xsuccess" role="img" aria-label={yesLabel}>
        <Icon name="check_circle" size={20} />
      </span>
    );
  }
  if (value === "no") {
    return (
      <span className="inline-flex text-xtertiary" role="img" aria-label={noLabel}>
        <Icon name="cancel" size={20} />
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="t-data text-xwarning">
        {partialLabel}
      </span>
    );
  }
  if (value === "n/a") {
    return <span className="t-caption text-xtertiary uppercase">{naLabel}</span>;
  }
  // String value
  return <span className="t-body3 text-xsecondary leading-[1.4]">{value}</span>;
}

export default function ComparisonSection({
  heading,
  headingAccent,
  intro,
  columns,
  rows,
  closingLine,
  highlightColumn,
  highlightLabel,
  methodology,
  sources,
  disclaimer,
}: ComparisonSectionProps) {
  const t = useTranslations("FeatureLanding");
  const xHealCol = highlightColumn ?? columns.length - 1;

  return (
    <section className="bg-xbg-2">
      <div className="x-container x-section flex flex-col gap-12">
        {/* Heading + Intro */}
        <ScrollReveal className="flex flex-col gap-6 max-w-[52rem]">
          <h2 className="t-display2 text-xprimary">
            {heading} {headingAccent}
          </h2>
          <p className="t-body1 text-xsecondary">{intro}</p>
        </ScrollReveal>

        {/* Comparison Table (desktop) */}
        <ScrollReveal className="w-full hidden md:block">
          <div className="w-full overflow-x-auto rounded-[20px] border border-xborder bg-xcard">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className="p-4 t-overline text-xtertiary bg-xbg-3 border-b border-xborder w-[22%]">
                    {t("featureLabel")}
                  </th>
                  {columns.map((col, i) => (
                    <th
                      key={col}
                      className={`p-4 t-overline border-b border-xborder text-center ${
                        i === xHealCol
                          ? "bg-xbrand text-white"
                          : "bg-xbg-3 text-xtertiary"
                      }`}
                    >
                      <span className="flex flex-col items-center gap-1">
                        <span>{col}</span>
                        {i === xHealCol && highlightLabel && (
                          <span className="rounded-full bg-white/20 px-2 py-0.5 t-data text-[10px] text-white">
                            {highlightLabel}
                          </span>
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr
                    key={row.feature}
                    className={ri % 2 === 0 ? "bg-xcard" : "bg-xbg-2"}
                  >
                    <td className="p-4 t-h6 text-xprimary border-b border-xborder">
                      {row.feature}
                    </td>
                    {row.values.map((val, ci) => (
                      <td
                        key={ci}
                        className={`p-4 text-center border-b border-xborder ${
                          ci === xHealCol ? "bg-[rgba(71,100,255,0.06)]" : ""
                        }`}
                      >
                        <CellContent
                          value={val}
                          yesLabel={t("yes")}
                          noLabel={t("no")}
                          partialLabel={t("partial")}
                          naLabel={t("na")}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* Comparison Cards (mobile) */}
        <div className="w-full flex flex-col gap-4 md:hidden">
          {rows.map((row, ri) => (
            <ScrollReveal key={row.feature} delay={ri * 80}>
              <div className="border border-xborder bg-xcard rounded-[16px] p-5">
                <h3 className="t-h6 text-xprimary mb-3">{row.feature}</h3>
                <div className="flex flex-col gap-2">
                  {columns.map((col, ci) => (
                    <div
                      key={col}
                      className={`flex items-start justify-between gap-3 py-1.5 px-3 rounded-lg ${
                        ci === xHealCol
                          ? "bg-[rgba(71,100,255,0.08)] border border-[rgba(71,100,255,0.2)]"
                          : ""
                      }`}
                    >
                      <span
                        className={`t-body3 flex min-w-0 flex-wrap items-center gap-2 ${
                          ci === xHealCol
                            ? "text-xbrand font-semibold"
                            : "text-xtertiary"
                        }`}
                      >
                        <span>{col}</span>
                        {ci === xHealCol && highlightLabel && (
                          <span className="rounded-full bg-[rgba(71,100,255,0.14)] px-2 py-0.5 t-data text-[10px] text-xbrand">
                            {highlightLabel}
                          </span>
                        )}
                      </span>
                      <span className="max-w-[52%] text-right">
                        <CellContent
                          value={row.values[ci]}
                          yesLabel={t("yes")}
                          noLabel={t("no")}
                          partialLabel={t("partial")}
                          naLabel={t("na")}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Closing line */}
        <ScrollReveal className="max-w-[48rem]">
          <p className="t-h3 text-xprimary">{closingLine}</p>
        </ScrollReveal>

        {(methodology || sources?.length || disclaimer) && (
          <ScrollReveal className="w-full max-w-[64rem] border-t border-xborder pt-6">
            <div className="flex flex-col items-center gap-2 text-center">
              {methodology && (
                <p className="t-body3 text-xtertiary">{methodology}</p>
              )}
              {sources && sources.length > 0 && (
                <p className="t-body3 text-xtertiary">
                  {t("sourcesLabel")}{" "}
                  {sources.map((source, index) => (
                    <span key={source.url}>
                      {index > 0 && ", "}
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xbrand underline underline-offset-2 hover:text-xprimary"
                      >
                        {source.label}
                      </a>
                    </span>
                  ))}
                  .
                </p>
              )}
              {disclaimer && (
                <p className="t-caption text-xtertiary">{disclaimer}</p>
              )}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
