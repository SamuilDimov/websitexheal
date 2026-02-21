/**
 * MedicalStandardsBadge
 *
 * Inline SVG trust badge showing WHO, ADA, EASD medical-standard compliance.
 * Renders as a compact horizontal badge intended to sit near App Store CTAs
 * to communicate clinical credibility at the moment of decision.
 *
 * Uses exact xHeal brand colors via CSS custom properties.
 */
export default function MedicalStandardsBadge({
  className = "text-xblack",
}: {
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-[10px] ${className}`}>
      {/* Shield icon */}
      <svg
        width="28"
        height="32"
        viewBox="0 0 28 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M14 0L0 5.33V14.67C0 22.8 5.97 30.43 14 32C22.03 30.43 28 22.8 28 14.67V5.33L14 0Z"
          fill="var(--color-xdark-blue)"
        />
        <path
          d="M14 2.5L2.5 6.83V14.67C2.5 21.63 7.57 28.26 14 29.9C20.43 28.26 25.5 21.63 25.5 14.67V6.83L14 2.5Z"
          fill="var(--color-xblack)"
        />
        {/* Checkmark */}
        <path
          d="M11.5 19.5L8 16L9.41 14.59L11.5 16.67L18.09 10.08L19.5 11.5L11.5 19.5Z"
          fill="var(--color-xdark-blue)"
        />
      </svg>

      {/* Text */}
      <div className="flex flex-col leading-[1.15]">
        <span className="text-[0.8125rem] font-medium tracking-[0.06em]">
          WHO &middot; ADA &middot; EASD
        </span>
        <span className="text-[0.6875rem] opacity-70">
          Medical-Standard Reasoning
        </span>
      </div>
    </div>
  );
}
