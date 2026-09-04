import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { GuideCategoryInfo } from "@/data/guides";
import { getGuidesByCategory, type GuideCategory } from "@/data/guides";

import Icon from "@/components/ui/Icon";
interface GuideCategoryCardProps {
  category: GuideCategoryInfo;
  locale?: string;
}

export async function GuideCategoryCard({
  category,
  locale = "en",
}: GuideCategoryCardProps) {
  const t = await getTranslations({ locale, namespace: "Guides" });
  const guides = getGuidesByCategory(category.slug as GuideCategory, locale);
  const firstGuide = guides[0];

  return (
    <Link
      href={
        firstGuide
          ? `/guides/${category.slug}/${firstGuide.slug}`
          : `/guides/${category.slug}`
      }
      className="group flex flex-col gap-4 p-6 rounded-2xl bg-xcard border border-xborder hover:border-xbrand/50 transition-all duration-300"
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-xbrand/10 text-xbrand group-hover:bg-xbrand group-hover:text-white transition-colors">
        <Icon name={category.icon} size={24} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className="t-h5 text-xprimary group-hover:text-xbrand transition-colors">
          {category.label}
        </h3>
        <p className="t-body3 text-xtertiary line-clamp-2">
          {category.description}
        </p>
      </div>

      {/* Guide count */}
      <div className="flex items-center gap-1.5 mt-auto pt-2">
        <Icon name="article" size={16} className="text-xtertiary" />
        <span className="t-caption text-xtertiary">
          {t("guideCount", { count: guides.length })}
        </span>
      </div>
    </Link>
  );
}

interface GuideListCardProps {
  category: string;
  slug: string;
  title: string;
  description: string;
  readingTime: number;
  minReadLabel: string;
}

export function GuideListCard({
  category,
  slug,
  title,
  description,
  readingTime,
  minReadLabel,
}: GuideListCardProps) {
  return (
    <Link
      href={`/guides/${category}/${slug}`}
      className="group flex flex-col gap-3 p-5 rounded-xl bg-xcard border border-xborder hover:border-xbrand/50 transition-all duration-200"
    >
      <h3 className="t-h6 text-xprimary group-hover:text-xbrand transition-colors">
        {title}
      </h3>
      <p className="t-body3 text-xtertiary line-clamp-2">{description}</p>
      <div className="flex items-center gap-1.5 mt-auto">
        <Icon name="schedule" size={14} className="text-xtertiary" />
        <span className="t-caption text-xtertiary">
          {readingTime} {minReadLabel}
        </span>
      </div>
    </Link>
  );
}
