export type BlogCategory =
  | "chronic-condition-management"
  | "fitness-recovery"
  | "lifestyle-wellness"
  | "lab-results-records"
  | "doctor-specialist-visits"
  | "product-updates"
  | "product-stories"
  | "newsletter";

export interface BlogSummary {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  category: BlogCategory;
  author: {
    name: string;
    image: string;
  };
  readingTime: number;
  featured?: boolean;
}

export interface GuideNavigationCategory {
  slug: string;
  label: string;
  icon: string;
  guides: Array<{
    slug: string;
    title: string;
  }>;
}
