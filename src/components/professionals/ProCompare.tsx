import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * Where the health context comes from.
 *
 * Three approaches, three categories — not three named vendors. The claim
 * being made is about xHeal's own row; the other two describe what a booking
 * tool and a practice suite are, which is not a criticism of either.
 *
 * A real table on desktop, a stack of cards under it, because a four-column
 * table on a phone is a scroll bar with opinions.
 */
export default function ProCompare() {
  const t = useTranslations("Pro");

  const columns = [
    t("compareColSetup"),
    t("compareColContext"),
    t("compareColAfter"),
  ];
  const rows = [1, 2, 3].map((n) => ({
    path: t(`compareRow${n}Path`),
    cells: [
      t(`compareRow${n}Setup`),
      t(`compareRow${n}Context`),
      t(`compareRow${n}After`),
    ],
    ours: n === 3,
  }));

  return (
    <section aria-labelledby="pro-compare-heading" className="bg-xbg-2">
      <div className="x-container x-section flex flex-col gap-12 md:gap-14">
        <ScrollReveal>
          <div className="flex flex-col gap-4">
            <p className="t-eyebrow text-xtertiary">{t("compareEyebrow")}</p>
            <h2
              id="pro-compare-heading"
              className="t-display2 text-xprimary max-w-[18ch]"
            >
              {t("compareHeading")}
            </h2>
            <p className="t-lead text-xsecondary max-w-[52ch]">
              {t("compareLead")}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <table className="pro-table hidden md:table">
            <thead>
              <tr>
                <th scope="col" className="t-data">
                  {t("compareColPath")}
                </th>
                {columns.map((column) => (
                  <th key={column} scope="col" className="t-data">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.path} data-ours={row.ours ? "true" : "false"}>
                  <th scope="row" className="t-h5 text-xprimary">
                    {row.path}
                  </th>
                  {row.cells.map((cell, index) => (
                    <td key={index} className="t-body2 text-xsecondary">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollReveal>

        <ul role="list" className="flex flex-col gap-4 md:hidden">
          {rows.map((row, index) => (
            <li key={row.path}>
              <ScrollReveal delay={index * 70}>
                <div className="pro-compare-card" data-ours={row.ours ? "true" : "false"}>
                  <p className="t-h5 text-xprimary">{row.path}</p>
                  <dl className="mt-4 flex flex-col gap-3">
                    {row.cells.map((cell, cellIndex) => (
                      <div key={cellIndex} className="flex flex-col gap-1">
                        <dt className="t-data text-xtertiary">
                          {columns[cellIndex]}
                        </dt>
                        <dd className="t-body2 text-xsecondary">{cell}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
