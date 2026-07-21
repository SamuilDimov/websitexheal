"use client";

import type { BlogCategory } from "@/types/content";

interface CategoryFilterProps {
  onCategoryChange: (category: BlogCategory | "all") => void;
  activeCategory: BlogCategory | "all";
  categories: Array<{ slug: BlogCategory; label: string }>;
  allLabel: string;
}

export default function CategoryFilter({
  onCategoryChange,
  activeCategory,
  categories,
  allLabel,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        type="button"
        onClick={() => onCategoryChange("all")}
        className="chip"
        data-active={activeCategory === "all"}
      >
        {allLabel}
      </button>
      {categories.map((category) => (
        <button
          key={category.slug}
          type="button"
          onClick={() => onCategoryChange(category.slug)}
          className="chip"
          data-active={activeCategory === category.slug}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
