export interface InsightItem {
  icon: string;
  label: string;
  text: string;
  color: string;
}

interface InsightPreviewProps {
  items: InsightItem[];
}

export default function InsightPreview({ items }: InsightPreviewProps) {
  return (
    <div className="flex flex-col gap-[8px]" aria-hidden="true">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-[12px] rounded-[10px]"
          style={{
            padding: "10px 12px",
            backgroundColor: "var(--surface-card-inner)",
            border: "1px solid var(--border-default)",
          }}
        >
          {/* Icon */}
          <div
            className="flex items-center justify-center rounded-[8px] flex-shrink-0"
            style={{
              width: "36px",
              height: "36px",
              backgroundColor: `${item.color}28`,
            }}
          >
            <span
              style={{
                fontFamily: "MaterialSymbolsRounded",
                fontSize: "18px",
                color: item.color,
              }}
            >
              {item.icon}
            </span>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-[2px] min-w-0">
            <span
              className="t-overline"
              style={{ color: item.color }}
            >
              {item.label}
            </span>
            <span
              className="leading-[1.4]"
              style={{
                fontSize: "15px",
                color: "var(--text-primary)",
              }}
            >
              {item.text}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
