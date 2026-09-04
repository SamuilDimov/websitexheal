import type { CSSProperties, ReactNode } from "react";

/**
 * An app screen on a marketing surface: an aspect-ratio box that clips its
 * children to the screen's own corner radius.
 *
 * By default that is all it is. It used to draw a graphite bezel and an island
 * unconditionally, which doubled up on the screenshots that were device
 * renders to begin with; those are cropped to bare screens now. `chrome` puts
 * a titanium body back for content that is not a device — the Digital Twin
 * chat is live DOM and the bento phones are cropped screens, and beside the
 * real 3D devices a bare screen reads as a slab. `island` is separate because
 * the screenshots keep their own status bar and the chat does not have one.
 */
export default function PhoneFrame({
  children,
  className = "",
  style,
  aspectRatio = "730 / 1583",
  tilt = false,
  chrome = false,
  island = false,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  aspectRatio?: string;
  /** Turn toward the cursor with the rest of the mockups (see PointerTilt). */
  tilt?: boolean;
  /** Draw a titanium body around the screen; for content that is not a device render. */
  chrome?: boolean;
  /** Draw a dynamic island; only for DOM content, since screenshots have their own. */
  island?: boolean;
}) {
  return (
    <div
      className={`phone-frame${chrome ? " phone-frame--chrome" : ""} relative ${className}`}
      style={{ aspectRatio, ...style }}
      aria-hidden="true"
      data-tilt={tilt || undefined}
    >
      <div className={`phone-frame__screen${island ? " phone-frame__screen--inset" : ""}`}>
        {children}
      </div>
      {island && <span className="phone-frame__island" />}
    </div>
  );
}
