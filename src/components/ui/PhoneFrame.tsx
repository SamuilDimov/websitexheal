import type { CSSProperties, ReactNode } from "react";

/**
 * An app screen on a marketing surface: an aspect-ratio box that clips its
 * children to the screen's own corner radius. It used to draw a graphite
 * bezel and a dynamic island, which doubled up on screenshots that were
 * device renders to begin with; the screenshots are cropped to their screens
 * and the device is gone. Children fill the screen area.
 */
export default function PhoneFrame({
  children,
  className = "",
  style,
  aspectRatio = "730 / 1583",
  tilt = false,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  aspectRatio?: string;
  /** Turn toward the cursor with the rest of the mockups (see PointerTilt). */
  tilt?: boolean;
}) {
  return (
    <div
      className={`phone-frame relative ${className}`}
      style={{ aspectRatio, ...style }}
      aria-hidden="true"
      data-tilt={tilt || undefined}
    >
      <div className="phone-frame__screen">{children}</div>
    </div>
  );
}
