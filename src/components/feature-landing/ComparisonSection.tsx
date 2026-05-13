"use client";

import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";

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
}

function CellContent({
  value,
  partialLabel,
  naLabel,
}: {
  value: CellValue;
  partialLabel: string;
  naLabel: string;
}) {
  if (value === "yes") {
    return (
      <span
        className="text-xsuccess text-[20px]"
        style={{ fontFamily: "MaterialSymbolsRounded" }}
      >
        check_circle
      </span>
    );
  }
  if (value === "no") {
    return (
      <span
        className="text-xtertiary text-[20px]"
        style={{ fontFamily: "MaterialSymbolsRounded" }}
      >
        cancel
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="t-caption text-xwarning font-bold uppercase">
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
}: ComparisonSectionProps) {
  const t = useTranslations("FeatureLanding");
  const xHealCol = highlightColumn ?? columns.length - 1;

  return (
    <section className="bg-xbg-2">
      <div className="w-full max-w-[1440px] mx-auto px-10 py-24 flex flex-col items-center gap-12 max-[991px]:px-8 max-[991px]:py-16 max-[479px]:px-5">
        {/* Heading + Intro */}
        <ScrollReveal className="flex flex-col items-center gap-6 max-w-[52rem] text-center">
          <h2 className="t-display2 text-xprimary">
            {heading} <span className="text-xbrand">{headingAccent}</span>
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
                      {col}
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
                <h4 className="t-h6 text-xprimary mb-3">{row.feature}</h4>
                <div className="flex flex-col gap-2">
                  {columns.map((col, ci) => (
                    <div
                      key={col}
                      className={`flex items-center justify-between py-1.5 px-3 rounded-lg ${
                        ci === xHealCol
                          ? "bg-[rgba(71,100,255,0.08)] border border-[rgba(71,100,255,0.2)]"
                          : ""
                      }`}
                    >
                      <span
                        className={`t-body3 ${
                          ci === xHealCol
                            ? "text-xbrand-light font-semibold"
                            : "text-xtertiary"
                        }`}
                      >
                        {col}
                      </span>
                      <CellContent
                        value={row.values[ci]}
                        partialLabel={t("partial")}
                        naLabel={t("na")}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Closing line */}
        <ScrollReveal className="text-center max-w-[48rem]">
          <p className="t-h3 text-xprimary">{closingLine}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
