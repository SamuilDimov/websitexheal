import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCategoryLabel, type GuideCategory } from "@/data/guides";

import Icon from "@/components/ui/Icon";
interface GuideBreadcrumbProps {
  category?: string;
  guideTitle?: string;
  locale?: string;
}

export default async function GuideBreadcrumb({
  category,
  guideTitle,
  locale = "en",
}: GuideBreadcrumbProps) {
  const t = await getTranslations({ locale, namespace: "Guides" });

  return (
    <nav className="flex items-center gap-2 text-xtertiary t-body3 flex-wrap">
      <Link
        href="/guides"
        className="hover:text-xprimary transition-colors"
      >
        {t("breadcrumbRoot")}
      </Link>

      {category && (
        <>
          <Icon name="chevron_right" size={14} className="opacity-50" />
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
          <Icon name="chevron_right" size={14} className="opacity-50" />
          <span className="text-xsecondary truncate max-w-[200px]">
            {guideTitle}
          </span>
        </>
      )}
    </nav>
  );
}
