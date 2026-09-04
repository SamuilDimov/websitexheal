import type { CSSProperties, ReactNode } from "react";

/**
 * Flat device frame for product screenshots on marketing surfaces.
 * Graphite bezel, no drop shadow (phase 1 rule), a hairline ring so the
 * device separates from a light ground. Children fill the screen area.
 */
export default function PhoneFrame({
  children,
  className = "",
  style,
  aspectRatio = "810 / 1654",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  aspectRatio?: string;
}) {
  return (
    <div
      className={`phone-frame relative ${className}`}
      style={{ aspectRatio, ...style }}
      aria-hidden="true"
    >
      <div className="phone-frame__screen">{children}</div>
      <span className="phone-frame__island" />
    </div>
  );
}
