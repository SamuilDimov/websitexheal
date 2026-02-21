/**
 * IntegrationLogosStrip
 *
 * Horizontal strip showing integration partners: Apple Health, Apple Watch, MyChart, and file imports.
 * All icons rendered as inline SVGs. Uses text-xdark-blue for high contrast on light backgrounds.
 * Intended for hero sections or just below hero on homepage and feature pages.
 */
export default function IntegrationLogosStrip({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-[10px] text-xdark-blue ${className}`}>
      <div className="flex items-center gap-[24px] flex-wrap max-[479px]:gap-[16px]">
        {/* Apple Health */}
        <div className="flex items-center gap-[6px]">
          <svg
            width="20"
            height="20"
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
          <span className="text-[0.8125rem] font-medium">
            Apple Health
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-[14px] bg-xdark-blue/30" />

        {/* Apple Watch */}
        <div className="flex items-center gap-[6px]">
          <svg
            width="16"
            height="20"
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
          <span className="text-[0.8125rem] font-medium">
            Apple Watch
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-[14px] bg-xdark-blue/30" />

        {/* MyChart */}
        <div className="flex items-center gap-[6px]">
          <svg
            width="20"
            height="20"
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
          <span className="text-[0.8125rem] font-medium">
            MyChart by Epic
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-[14px] bg-xdark-blue/30" />

        {/* PDFs & Photos */}
        <div className="flex items-center gap-[6px]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinejoin="round"
            />
            <path
              d="M14 2V8H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M12 18V12M12 12L9 15M12 12L15 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[0.8125rem] font-medium">
            PDFs &amp; Photos
          </span>
        </div>
      </div>
      <span className="text-[0.75rem] text-xdark-blue/60 font-medium">
        Import from your entire health ecosystem
      </span>
    </div>
  );
}
