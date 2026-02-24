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

function CellContent({ value, partialLabel, naLabel }: { value: CellValue; partialLabel: string; naLabel: string }) {
  if (value === "yes") {
    return (
      <span
        className="text-[1.25rem] text-green-600"
        style={{ fontFamily: "MaterialSymbolsRounded" }}
      >
        check_circle
      </span>
    );
  }
  if (value === "no") {
    return (
      <span
        className="text-[1.25rem] text-[#999]"
        style={{ fontFamily: "MaterialSymbolsRounded" }}
      >
        cancel
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="text-[0.875rem] text-amber-600 font-medium">
        {partialLabel}
      </span>
    );
  }
  if (value === "n/a") {
    return <span className="text-[0.875rem] text-[#999]">{naLabel}</span>;
  }
  // String value
  return (
    <span className="text-[0.875rem] leading-[1.4]">{value}</span>
  );
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
    <section>
      <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[60px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
        {/* Heading + Intro */}
        <ScrollReveal className="flex flex-col items-center gap-[24px] max-w-[52rem] text-center">
          <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] max-[991px]:text-[3rem]">
            {heading}{" "}
            <span className="text-xdark-blue">{headingAccent}</span>
          </h2>
          <p className="text-xblack-70 text-[1.125rem] leading-[1.5] max-[767px]:text-[1rem]">
            {intro}
          </p>
        </ScrollReveal>

        {/* Comparison Table (desktop) */}
        <ScrollReveal className="w-full hidden md:block">
          <div className="w-full overflow-x-auto rounded-[16px] border border-xlight-blue-low shadow-[0_4px_4px_#1419330d]">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className="p-[16px] text-[0.875rem] font-medium tracking-[0.04em] uppercase text-xblack-70 bg-[#f4f5fa] border-b border-xlight-blue-low w-[22%]">
                    {t("featureLabel")}
                  </th>
                  {columns.map((col, i) => (
                    <th
                      key={col}
                      className={`p-[16px] text-[0.875rem] font-medium tracking-[0.04em] uppercase border-b border-xlight-blue-low text-center ${
                        i === xHealCol
                          ? "bg-xdark-blue text-white"
                          : "bg-[#f4f5fa] text-xblack-70"
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
                    className={
                      ri % 2 === 0 ? "bg-xwhite" : "bg-[#f8f8fc]"
                    }
                  >
                    <td className="p-[16px] text-[1rem] font-medium text-xblack border-b border-[#f0f0f5]">
                      {row.feature}
                    </td>
                    {row.values.map((val, ci) => (
                      <td
                        key={ci}
                        className={`p-[16px] text-center border-b border-[#f0f0f5] ${
                          ci === xHealCol
                            ? "bg-[#4764ff08]"
                            : ""
                        }`}
                      >
                        <CellContent value={val} partialLabel={t("partial")} naLabel={t("na")} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* Comparison Cards (mobile) */}
        <div className="w-full flex flex-col gap-[16px] md:hidden">
          {rows.map((row, ri) => (
            <ScrollReveal key={row.feature} delay={ri * 80}>
              <div className="border border-xlight-blue-low bg-xwhite rounded-[16px] p-[20px] shadow-[0_4px_4px_#1419330d]">
                <h4 className="text-[1rem] font-medium text-xblack mb-[12px]">
                  {row.feature}
                </h4>
                <div className="flex flex-col gap-[8px]">
                  {columns.map((col, ci) => (
                    <div
                      key={col}
                      className={`flex items-center justify-between py-[6px] px-[12px] rounded-[8px] ${
                        ci === xHealCol
                          ? "bg-[#4764ff0d] border border-[#4764ff22]"
                          : ""
                      }`}
                    >
                      <span
                        className={`text-[0.875rem] ${
                          ci === xHealCol
                            ? "font-medium text-xdark-blue"
                            : "text-xblack-70"
                        }`}
                      >
                        {col}
                      </span>
                      <CellContent value={row.values[ci]} partialLabel={t("partial")} naLabel={t("na")} />
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Closing line */}
        <ScrollReveal className="text-center max-w-[48rem]">
          <p className="text-[1.5rem] font-medium leading-[1.3] tracking-[-0.01em] text-xblack max-[767px]:text-[1.25rem]">
            {closingLine}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
