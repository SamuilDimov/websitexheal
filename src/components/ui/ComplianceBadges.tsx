/**
 * ComplianceBadges
 *
 * Reusable component displaying HIPAA and GDPR compliance badge images
 * with text labels, matching the style of MedicalStandardsBadge.
 *
 * Usage:
 *   <ComplianceBadges />                              // default (dark text)
 *   <ComplianceBadges className="text-xwhite" />      // light text for dark bgs
 *   <ComplianceBadges size="sm" />                     // smaller (footer)
 */

import Image from "next/image";

type BadgeSize = "sm" | "md";

export default function ComplianceBadges({
  size = "md",
  className = "text-xblack",
}: {
  size?: BadgeSize;
  className?: string;
}) {
  const isSm = size === "sm";
  const imgSize = isSm ? 28 : 32;
  const titleSize = isSm ? "text-[0.75rem]" : "text-[0.8125rem]";
  const subtitleSize = isSm ? "text-[0.625rem]" : "text-[0.6875rem]";

  return (
    <div className={`flex items-center gap-[24px] ${className}`}>
      {/* HIPAA Badge */}
      <div className="flex items-center gap-[10px]">
        <Image
          src="/images/hipaa-compliant.png"
          alt="HIPAA Compliant"
          width={imgSize}
          height={imgSize}
          className={isSm ? "w-[28px] h-[28px]" : "w-[32px] h-[32px]"}
        />
        <div className="flex flex-col leading-[1.15]">
          <span className={`${titleSize} font-medium tracking-[0.06em]`}>
            HIPAA
          </span>
          <span className={`${subtitleSize} opacity-70`}>
            Compliant
          </span>
        </div>
      </div>

      {/* GDPR Badge */}
      <div className="flex items-center gap-[10px]">
        <Image
          src="/images/gdpr-compliant.png"
          alt="GDPR Compliant"
          width={imgSize}
          height={imgSize}
          className={isSm ? "w-[28px] h-[28px]" : "w-[32px] h-[32px]"}
        />
        <div className="flex flex-col leading-[1.15]">
          <span className={`${titleSize} font-medium tracking-[0.06em]`}>
            GDPR
          </span>
          <span className={`${subtitleSize} opacity-70`}>
            Compliant
          </span>
        </div>
      </div>
    </div>
  );
}
