import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";

/**
 * Works-with strip: where the data comes from. Sits directly under the hero
 * (Bevel's pattern). Monochrome marks, one line of copy, hairlines above and
 * below, no marquee.
 */
export default function WorksWithSection() {
  const t = useTranslations("Integrations");

  const sources = [
    { icon: "apple_health", label: t("appleHealth") },
    { icon: "apple_watch", label: t("appleWatch") },
    { icon: "my_chart", label: t("myChart") },
    { icon: "lab_pdf", label: t("labPdfs") },
    { icon: "photos", label: t("photos") },
    { icon: "manual_logs", label: t("manualLogs") },
  ] as const;

  return (
    <section
      aria-labelledby="works-with-heading"
      className="border-y x-hairline bg-xbg"
    >
      <div className="x-container flex flex-col gap-5 py-8 md:flex-row md:items-center md:gap-10 md:py-7">
        <div className="flex flex-col gap-1 md:min-w-[220px]">
          <span className="t-eyebrow text-xtertiary">{t("eyebrow")}</span>
          <h2 id="works-with-heading" className="t-body2 text-xsecondary">
            {t("importText")}
          </h2>
        </div>
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-6 gap-y-3 text-xsecondary sm:grid-cols-3 md:flex md:flex-wrap md:items-center md:gap-x-8"
        >
          {sources.map((source) => (
            <li key={source.icon} className="flex items-center gap-2.5">
              <SourceMark kind={source.icon} />
              <span className="text-[15px] font-medium text-xprimary">
                {source.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SourceMark({
  kind,
}: {
  kind:
    | "apple_health"
    | "apple_watch"
    | "my_chart"
    | "lab_pdf"
    | "photos"
    | "manual_logs";
}) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "text-xtertiary",
  };
  switch (kind) {
    case "apple_health":
      return (
        <svg {...common}>
          <path d="M19.5 12.6 12 20l-7.5-7.4A4.6 4.6 0 0 1 12 6.3a4.6 4.6 0 0 1 7.5 6.3Z" />
        </svg>
      );
    case "apple_watch":
      return (
        <svg {...common}>
          <rect x="6" y="6" width="12" height="12" rx="3" />
          <path d="M9 6V3.5h6V6M9 18v2.5h6V18" />
        </svg>
      );
    case "my_chart":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 16v-3M12 16V8M16 16v-5" />
        </svg>
      );
    case "lab_pdf":
      return <Icon name="description" size={20} className="text-xtertiary" />;
    case "photos":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <circle cx="12" cy="12" r="3.2" />
          <path d="M8 5l1-2h6l1 2" />
        </svg>
      );
    case "manual_logs":
      return <Icon name="edit_note" size={20} className="text-xtertiary" />;
  }
}
