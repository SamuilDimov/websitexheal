"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { type BlogPost } from "@/data/blog-posts";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured }: BlogCardProps) {
  const t = useTranslations("Blog");

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`surface-card-feature flex flex-col overflow-hidden no-underline ${
        featured ? "col-span-full max-[767px]:col-span-1" : ""
      }`}
    >
      {/* Cover image */}
      <div className="overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          width={featured ? 1200 : 600}
          height={featured ? 500 : 400}
          className={`w-full object-cover ${
            featured ? "h-[24rem] max-[767px]:h-[16rem]" : "h-[18rem]"
          }`}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-6 flex-1">
        {/* Category + Reading time */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="badge badge-new">
            {t(`categories.${post.category}`)}
          </span>
          <span className="t-body3 text-xtertiary">
            {post.readingTime} {t("minRead")}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`text-xprimary font-bold leading-[1.2] tracking-[-0.5px] ${
            featured
              ? "text-[32px] max-[991px]:text-[24px]"
              : "text-[22px] max-[991px]:text-[20px]"
          }`}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="t-body2 text-xsecondary flex-1">{post.excerpt}</p>

        {/* Date + Author */}
        <div className="flex items-center gap-2.5 pt-3 mt-1 border-t border-xborder">
          <Image
            src={post.author.image}
            alt={post.author.name}
            width={28}
            height={28}
            className="rounded-full object-cover ring-1 ring-xborder"
            style={{ width: 28, height: 28 }}
          />
          <span className="t-body3 text-xsecondary">{post.author.name}</span>
          <span className="text-xtertiary">&middot;</span>
          <span className="t-body3 text-xtertiary">{post.date}</span>
        </div>
      </div>
    </Link>
  );
}
