import { Link } from "@/i18n/navigation";
import { getCategoryLabel, type GuideCategory } from "@/data/guides";

interface GuideBreadcrumbProps {
  category?: string;
  guideTitle?: string;
  locale?: string;
}

export default function GuideBreadcrumb({
  category,
  guideTitle,
  locale = "en",
}: GuideBreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-xtertiary t-body3 flex-wrap">
      <Link
        href="/guides"
        className="hover:text-xprimary transition-colors"
      >
        Guides
      </Link>

      {category && (
        <>
          <span className="font-icons text-[14px] opacity-50">
            chevron_right
          </span>
          <Link
            href={`/guides`}
            className="hover:text-xprimary transition-colors"
          >
            {getCategoryLabel(category as GuideCategory, locale)}
          </Link>
        </>
      )}

      {guideTitle && (
        <>
          <span className="font-icons text-[14px] opacity-50">
            chevron_right
          </span>
          <span className="text-xsecondary truncate max-w-[200px]">
            {guideTitle}
          </span>
        </>
      )}
    </nav>
  );
}
