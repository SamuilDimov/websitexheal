import { Link } from "@/i18n/navigation";
import type { GuideCategoryInfo } from "@/data/guides";
import { getGuidesByCategory, type GuideCategory } from "@/data/guides";

interface GuideCategoryCardProps {
  category: GuideCategoryInfo;
}

export function GuideCategoryCard({ category }: GuideCategoryCardProps) {
  const guides = getGuidesByCategory(category.slug as GuideCategory);
  const firstGuide = guides[0];

  return (
    <Link
      href={
        firstGuide
          ? `/guides/${category.slug}/${firstGuide.slug}`
          : `/guides/${category.slug}`
      }
      className="group flex flex-col gap-4 p-6 rounded-2xl bg-xcard border border-xborder hover:border-xbrand/50 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(71,100,255,0.15)]"
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-xbrand/10 text-xbrand group-hover:bg-xbrand group-hover:text-white transition-colors">
        <span
          className="font-icons text-[24px]"
          style={{ fontVariationSettings: "'FILL' 0" }}
        >
          {category.icon}
        </span>
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
        <span className="font-icons text-[16px] text-xtertiary">article</span>
        <span className="t-caption text-xtertiary">
          {guides.length} {guides.length === 1 ? "guide" : "guides"}
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
}

export function GuideListCard({
  category,
  slug,
  title,
  description,
  readingTime,
}: GuideListCardProps) {
  return (
    <Link
      href={`/guides/${category}/${slug}`}
      className="group flex flex-col gap-3 p-5 rounded-xl bg-xcard border border-xborder hover:border-xbrand/50 transition-all duration-200"
    >
      <h4 className="t-h6 text-xprimary group-hover:text-xbrand transition-colors">
        {title}
      </h4>
      <p className="t-body3 text-xtertiary line-clamp-2">{description}</p>
      <div className="flex items-center gap-1.5 mt-auto">
        <span className="font-icons text-[14px] text-xtertiary">schedule</span>
        <span className="t-caption text-xtertiary">{readingTime} min read</span>
      </div>
    </Link>
  );
}
