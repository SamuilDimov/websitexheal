"use client";

import { useTranslations } from "next-intl";
import { blogCategories, type BlogCategory } from "@/data/blog-posts";

interface CategoryFilterProps {
  onCategoryChange: (category: BlogCategory | "all") => void;
  activeCategory: BlogCategory | "all";
}

export default function CategoryFilter({
  onCategoryChange,
  activeCategory,
}: CategoryFilterProps) {
  const t = useTranslations("Blog");

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        type="button"
        onClick={() => onCategoryChange("all")}
        className="chip"
        data-active={activeCategory === "all"}
      >
        {t("allCategory")}
      </button>
      {blogCategories.map((cat) => (
        <button
          key={cat.slug}
          type="button"
          onClick={() => onCategoryChange(cat.slug)}
          className="chip"
          data-active={activeCategory === cat.slug}
        >
          {t(`categories.${cat.slug}`)}
        </button>
      ))}
    </div>
  );
}
