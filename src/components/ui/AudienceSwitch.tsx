"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

/**
 * Audience switch — the site has two views of the same company: the consumer
 * app a person uses (`/`) and the workspace a practice uses
 * (`/professionals`).
 *
 * It is two links dressed as a segmented control, not a form control: each
 * side is a real page with its own URL, so the browser's back button, a
 * middle-click and a shared link all behave the way people expect.
 *
 * The thumb is measured rather than assumed. "Consumer" and "Professionals"
 * are different lengths in English and further apart in Bulgarian, so the
 * thumb reads the active anchor's box and animates both `translateX` and
 * `width`. Transition is withheld until after the first measurement,
 * otherwise the thumb slides in from the left edge on every page load.
 */

/* `useLayoutEffect` warns when it runs during server rendering, and the nav
   is prerendered on every page. There is no layout to read on the server, so
   the effect variant is the right no-op there. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const PROFESSIONAL_PATH = "/professionals";

export function isProfessionalPath(pathname: string | null | undefined) {
  return Boolean(
    pathname &&
      (pathname === PROFESSIONAL_PATH ||
        pathname.startsWith(`${PROFESSIONAL_PATH}/`)),
  );
}

type Props = {
  /** `sheet` is the full-width variant inside the mobile menu. */
  variant?: "capsule" | "sheet";
  onNavigate?: () => void;
  className?: string;
};

export default function AudienceSwitch({
  variant = "capsule",
  onNavigate,
  className = "",
}: Props) {
  const t = useTranslations("AudienceSwitch");
  const pathname = usePathname();
  const isPro = isProfessionalPath(pathname);

  const trackRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [thumb, setThumb] = useState<{ x: number; w: number } | null>(null);
  const [ready, setReady] = useState(false);

  const measure = useCallback(() => {
    const active = optionRefs.current[isPro ? 1 : 0];
    // Zero width means the control is not laid out yet — display:none below
    // the breakpoint, or fonts still loading. Publishing that would paint a
    // collapsed thumb; the ResizeObserver below brings us back when it has a
    // box worth measuring.
    if (!active || !active.offsetWidth) return;
    setThumb({ x: active.offsetLeft, w: active.offsetWidth });
  }, [isPro]);

  useIsomorphicLayoutEffect(() => {
    measure();
  }, [measure]);

  // Fonts land after first paint and change the label widths under the thumb.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer =
      "ResizeObserver" in window ? new ResizeObserver(measure) : null;
    observer?.observe(track);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});

    const frame = window.requestAnimationFrame(() => setReady(true));
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
      window.cancelAnimationFrame(frame);
    };
  }, [measure]);

  const options = [
    { href: "/", label: t("consumer"), hint: t("consumerHint"), active: !isPro },
    {
      href: PROFESSIONAL_PATH,
      label: t("professional"),
      hint: t("professionalHint"),
      active: isPro,
    },
  ] as const;

  return (
    <div
      ref={trackRef}
      className={`aud-switch ${className}`}
      data-variant={variant}
      data-ready={ready ? "true" : "false"}
      role="group"
      aria-label={t("label")}
    >
      <span
        aria-hidden="true"
        className="aud-switch__thumb"
        style={
          thumb
            ? { transform: `translateX(${thumb.x}px)`, width: `${thumb.w}px` }
            : { opacity: 0 }
        }
      />
      {options.map((option, index) => (
        <Link
          key={option.href}
          href={option.href}
          ref={(node) => {
            optionRefs.current[index] = node;
          }}
          className="aud-switch__opt"
          data-active={option.active ? "true" : "false"}
          aria-current={option.active ? "page" : undefined}
          title={option.hint}
          onClick={onNavigate}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}
