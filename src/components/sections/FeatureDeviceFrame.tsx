import type { ReactNode, Ref } from "react";

export default function FeatureDeviceFrame({
  children,
  containerRef,
  variant = "showcase",
  aspectRatio = "810 / 1654",
  slideshowIntervalMs,
}: {
  children: ReactNode;
  containerRef?: Ref<HTMLDivElement>;
  variant?: "showcase" | "landing";
  aspectRatio?: string;
  slideshowIntervalMs?: number;
}) {
  const isLanding = variant === "landing";

  return (
    <div
      ref={containerRef}
      className={
        isLanding
          ? "relative flex-none w-[420px] max-w-full max-[767px]:w-[300px] max-[767px]:mx-auto"
          : "feature-showcase-device relative flex-none"
      }
      data-slideshow-interval={slideshowIntervalMs}
      data-slideshow-variant={variant}
      style={{
        width: isLanding ? undefined : "clamp(145px, 17vw, 230px)",
        aspectRatio,
        padding: isLanding ? 6 : 4,
        border: `${isLanding ? 5 : 4}px solid #202229`,
        borderRadius: isLanding ? 48 : 32,
        background: "#050609",
        boxShadow: isLanding
          ? "0 0 0 1px rgba(218, 222, 231, 0.42), inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 24px 56px rgba(0, 0, 0, 0.48)"
          : "0 0 0 1px rgba(218, 222, 231, 0.42), inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 18px 40px rgba(0, 0, 0, 0.42)",
      }}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute z-[1]"
        style={{
          top: isLanding ? 14 : 10,
          left: "50%",
          width: "31%",
          height: isLanding ? 20 : 15,
          borderRadius: 9999,
          background: "#020204",
          boxShadow: "inset 0 -1px 1px rgba(255, 255, 255, 0.08)",
          transform: "translateX(-50%)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute"
        style={{
          top: "20%",
          left: isLanding ? -9 : -8,
          width: 4,
          height: "11%",
          borderRadius: 3,
          background: "linear-gradient(90deg, #15161b, #5c5f68 55%, #17181d)",
          boxShadow: `0 ${isLanding ? 64 : 52}px 0 #34363e`,
        }}
      />
      <span
        aria-hidden="true"
        className="absolute"
        style={{
          top: "31%",
          right: isLanding ? -9 : -8,
          width: 4,
          height: "16%",
          borderRadius: 3,
          background: "linear-gradient(90deg, #15161b, #5c5f68 55%, #17181d)",
        }}
      />
    </div>
  );
}
