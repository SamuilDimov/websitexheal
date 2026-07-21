import Image from "next/image";

type ApplauseLabBadgeProps = {
  className?: string;
};

export default function ApplauseLabBadge({
  className = "",
}: ApplauseLabBadgeProps) {
  return (
    <a
      href="https://applauselab.ai/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Developed by ApplauseLab"
      className={`inline-flex min-h-10 w-fit shrink-0 items-center gap-2 border border-white/20 bg-[#080b0e] px-3 py-2 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-white/70 transition-colors duration-200 hover:border-[#00ff4e]/50 hover:bg-[#11161a] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ff4e] ${className}`}
    >
      <span>Developed by</span>
      <Image
        src="https://applauselab.ai/images/Logo-Custom-Dark.svg"
        alt=""
        width={568}
        height={123}
        unoptimized
        className="h-auto w-32"
      />
    </a>
  );
}
