import { Link } from "@/i18n/navigation";
import type { Guide } from "@/data/guides";

interface GuideNavProps {
  previousGuide?: Guide;
  nextGuide?: Guide;
}

export default function GuideNav({ previousGuide, nextGuide }: GuideNavProps) {
  if (!previousGuide && !nextGuide) return null;

  return (
    <nav className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-xborder">
      {/* Previous */}
      {previousGuide ? (
        <Link
          href={`/guides/${previousGuide.category}/${previousGuide.slug}`}
          className="group flex-1 flex flex-col gap-1 p-4 rounded-xl border border-xborder hover:border-xbrand/50 hover:bg-xcard/50 transition-all"
        >
          <div className="flex items-center gap-1.5 text-xtertiary">
            <span className="font-icons text-[16px]">arrow_back</span>
            <span className="t-caption">Previous</span>
          </div>
          <span className="t-body2 font-semibold text-xsecondary group-hover:text-xbrand transition-colors">
            {previousGuide.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {/* Next */}
      {nextGuide ? (
        <Link
          href={`/guides/${nextGuide.category}/${nextGuide.slug}`}
          className="group flex-1 flex flex-col gap-1 p-4 rounded-xl border border-xborder hover:border-xbrand/50 hover:bg-xcard/50 transition-all text-right"
        >
          <div className="flex items-center justify-end gap-1.5 text-xtertiary">
            <span className="t-caption">Next</span>
            <span className="font-icons text-[16px]">arrow_forward</span>
          </div>
          <span className="t-body2 font-semibold text-xsecondary group-hover:text-xbrand transition-colors">
            {nextGuide.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
