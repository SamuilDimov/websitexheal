/**
 * IntegrationLogosStrip
 *
 * Horizontal strip showing integration partners: Apple Health, Apple Watch, MyChart.
 * All icons rendered as inline SVGs in monochrome navy for visual harmony.
 * Intended for hero sections or just below hero on homepage and feature pages.
 */
export default function IntegrationLogosStrip({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-[10px] ${className}`}>
      <div className="flex items-center gap-[28px] max-[479px]:gap-[20px]">
        {/* Apple Health */}
        <div className="flex items-center gap-[8px] opacity-70">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M16.5 3C14.76 3 13.09 3.81 12 5.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5C2 12.28 5.4 15.36 10.55 20.04L12 21.35L13.45 20.03C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-[0.8125rem] font-medium tracking-[0.01em]">
            Apple Health
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-[16px] bg-current opacity-20" />

        {/* Apple Watch */}
        <div className="flex items-center gap-[8px] opacity-70">
          <svg
            width="18"
            height="22"
            viewBox="0 0 18 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect
              x="2"
              y="5"
              width="14"
              height="14"
              rx="3"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path d="M5 5V2.5C5 1.67 5.67 1 6.5 1H11.5C12.33 1 13 1.67 13 2.5V5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M5 19V21.5C5 22.33 5.67 23 6.5 23H11.5C12.33 23 13 22.33 13 21.5V19" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="9" cy="12" r="1.5" fill="currentColor" />
          </svg>
          <span className="text-[0.8125rem] font-medium tracking-[0.01em]">
            Apple Watch
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-[16px] bg-current opacity-20" />

        {/* MyChart */}
        <div className="flex items-center gap-[8px] opacity-70">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="3"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M8 16V13M12 16V8M16 16V11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[0.8125rem] font-medium tracking-[0.01em]">
            MyChart
          </span>
        </div>
      </div>
      <span className="text-[0.6875rem] opacity-50">
        Integrates with your health ecosystem
      </span>
    </div>
  );
}
