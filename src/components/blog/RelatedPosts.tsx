import { getRelatedPosts } from "@/data/blog-posts";
import BlogCard from "./BlogCard";

interface RelatedPostsProps {
  currentSlug: string;
}

export default function RelatedPosts({ currentSlug }: RelatedPostsProps) {
  const related = getRelatedPosts(currentSlug, 3);
  if (related.length === 0) return null;

  return (
    <div className="mt-[60px] pt-[40px] border-t border-xlight-blue-low">
      <h2
        className="font-medium leading-[1] tracking-[-0.02em] text-xblack mb-[24px]"
        style={{ fontSize: "24px" }}
      >
        Keep reading
      </h2>
      <div className="grid grid-cols-3 gap-[20px] max-[991px]:grid-cols-2 max-[767px]:grid-cols-1">
        {related.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
