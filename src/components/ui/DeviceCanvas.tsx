"use client";

import dynamic from "next/dynamic";
import type { DeviceName, EntranceName } from "@/components/ui/DeviceModel";

/**
 * Lazy boundary for every 3D device on the site.
 *
 * three.js plus GLTFLoader is 296 KB gzipped — more than the rest of the
 * site's JavaScript put together, and none of it is needed to read the page.
 * Loading `DeviceModel` dynamically keeps it out of the entry chunk and off
 * the hydration path; until it arrives, the screenshot itself stands in, so
 * the slot is never empty and the layout never jumps. `ssr: false` because
 * there is nothing to server-render — the first markup is a canvas the client
 * fills. One shared chunk however many devices a page has.
 */
const DeviceModel = dynamic(() => import("@/components/ui/DeviceModel"), {
  ssr: false,
});

export default function DeviceCanvas({
  screen,
  poster,
  device = "phone",
  entrance = "settle",
  fill = 0.9,
  fitBy,
  envIntensity,
  parallax,
  tilt,
  scrollScope,
  className = "",
  aspect = "1494 / 2364",
}: {
  screen: string;
  poster?: string;
  device?: DeviceName;
  entrance?: EntranceName;
  fill?: number;
  fitBy?: "height" | "width";
  envIntensity?: number;
  parallax?: number;
  tilt?: number;
  scrollScope?: string;
  className?: string;
  /** The canvas box. Wider than the device, which needs room to turn. */
  aspect?: string;
}) {
  return (
    <div className={className} style={{ aspectRatio: aspect }}>
      <DeviceModel
        screen={screen}
        poster={poster}
        device={device}
        entrance={entrance}
        fill={fill}
        fitBy={fitBy ?? (device === "laptop" ? "width" : "height")}
        envIntensity={envIntensity}
        parallax={parallax}
        tilt={tilt}
        scrollScope={scrollScope}
        className="h-full w-full"
      />
    </div>
  );
}
