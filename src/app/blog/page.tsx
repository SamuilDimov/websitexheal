import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "xHeal Blog: AI-Powered Wellness & Chronic Care Insights",
  description:
    "Discover stories, expert advice, and strategies for wellness and chronic care management.",
};

const blogPosts = [
  {
    slug: "2026-02-15-flareup-awareness-10-helpful-updates-for-daytoday-health",
    title: "Flare-up Awareness: 10 Helpful Updates for Day-to-Day Health",
    date: "Feb 15, 2026",
    excerpt:
      "Ten practical updates to help spot, prevent, and manage health flare-ups, covering virus trends, treatments, vaccines, and wearable signals.",
    image: "/images/blog-default-cover.avif",
  },
  {
    slug: "2026-02-01-10-new-insights-to-predict-and-prevent-health-flare-ups",
    title: "10 new insights to predict and prevent health flare-ups",
    date: "Feb 01, 2026",
    excerpt:
      "Ten practical, evidence-based insights on predicting and preventing health flare-ups across conditions, with actionable steps to discuss with your care team.",
    image: "/images/blog-default-cover.avif",
  },
  {
    slug: "2026-01-15-flareup-awareness-10-encouraging-health-updates",
    title: "Flare-up awareness: 10 encouraging health updates",
    date: "Jan 15, 2026",
    excerpt:
      "Ten practical, evidence-based updates on predicting, preventing, and calming health flare-ups - from new medicines and vaccines to monitoring tools and therapies.",
    image: "/images/blog-default-cover.avif",
  },
  {
    slug: "2026-01-01-flareup-awareness-10-new-insights-to-support-your-day-to-day-health",
    title:
      "Flare-up awareness: 10 new insights to support your day-to-day health",
    date: "Jan 01, 2026",
    excerpt:
      "Ten practical research-backed updates on predicting, preventing, and managing flare-ups across conditions, with actionable tips and source links.",
    image: "/images/blog-default-cover.avif",
  },
  {
    slug: "2025-12-15-flareup-awareness-10-new-insights-to-help-you-stay-ahead",
    title: "Flare-up awareness: 10 new insights to help you stay ahead",
    date: "Dec 15, 2025",
    excerpt:
      "A practical roundup of 10 research-backed insights to help predict, prevent, and better manage health flare-ups, with practical tips to discuss with your care team.",
    image: "/images/blog-default-cover.avif",
  },
  {
    slug: "2025-12-01-flareup-awareness-prevention-10-helpful-new-insights",
    title: "Flare-up Awareness & Prevention: 10 Helpful New Insights",
    date: "Dec 01, 2025",
    excerpt:
      "Ten practical research updates to help spot warning signs, prevent flare-ups, and plan care for infections, heat, respiratory viruses, and chronic conditions.",
    image: "/images/blog-default-cover.avif",
  },
  {
    slug: "2025-11-15-top-10-new-insights-to-prevent-and-spot-health-flareups-earlier",
    title:
      "Top 10 new insights to prevent and spot health flare-ups earlier",
    date: "Nov 15, 2025",
    excerpt:
      "Ten recent studies and guidelines provide practical steps to help prevent, spot, and manage health flare-ups earlier and discuss options with your care team.",
    image: "/images/blog-default-cover.avif",
  },
  {
    slug: "how-xheal-improved-my-health-awareness-and-guided-me-to-the-right-lab-tests",
    title:
      "How xHeal Improved My Health Awareness and Guided Me to the Right Lab Tests",
    date: "Nov 02, 2025",
    excerpt:
      "xHeal taught me exactly which labs matter, helping me understand my health better and make smarter decisions early.",
    image: "/images/blog-health-awareness.jpg",
  },
  {
    slug: "case-study-how-xheal-helped-me-reduce-early-insulin-resistance",
    title: "How xHeal Helped Me Reduce Early Insulin Resistance",
    date: "Nov 02, 2025",
    excerpt:
      "xHeal helped me lower my HOMA-IR from 3.83 to 2.0 using simple personalized daily routines before it became a real problem.",
    image: "/images/blog-insulin-resistance.jpg",
  },
  {
    slug: "2025-10-31-10-fresh-insights-to-predict-and-calm-health-flareups",
    title: "10 fresh insights to predict and calm health flare-ups",
    date: "Oct 31, 2025",
    excerpt:
      "Ten concise, evidence-based insights to spot, prevent, and ease health flare-ups across conditions, with practical next steps and linked sources.",
    image: "/images/blog-default-cover.avif",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative"
        style={{
          backgroundImage:
            "linear-gradient(180deg, var(--dark-blue), #f8f8fa00)",
        }}
      >
        <div className="w-full max-w-[100em] mx-auto px-[5em] pt-[200px] pb-[5em] flex flex-col items-center gap-[40px] text-xwhite max-[991px]:px-[40px] max-[991px]:pt-[140px] max-[479px]:px-[20px]">
          <h1 className="text-[4.5rem] font-medium leading-[1] tracking-[-0.04em] text-center max-[991px]:text-[3.5rem] max-[479px]:text-[3rem]">
            xHeal blog
          </h1>
        </div>
      </section>

      {/* Blog listing */}
      <section>
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[80px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <div className="grid grid-cols-3 gap-[20px] max-[991px]:grid-cols-2 max-[767px]:grid-cols-1">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="border border-xlight-blue-low bg-xwhite text-xdark-blue rounded-[16px] flex flex-col gap-[20px] shadow-[0_4px_4px_#1419330d] transition-all duration-200 hover:-mt-[5px] hover:mb-[5px] hover:shadow-[0_8px_4px_#1419330d] overflow-hidden"
              >
                {/* Cover image */}
                <div className="-mx-0 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-[20rem] object-cover rounded-t-[16px]"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-[20px] px-[20px] pb-[20px]">
                  <h3 className="text-[2rem] font-medium leading-[1] tracking-[-0.02em] max-[991px]:text-[1.5rem]">
                    {post.title}
                  </h3>

                  <div className="flex items-center gap-[6px] -mt-[10px]">
                    <span className="font-icons text-xblack-70 -mt-[10px]">
                      calendar_today
                    </span>
                    <span className="text-xblack-70 text-[1rem] max-[991px]:text-[0.85rem]">
                      {post.date}
                    </span>
                  </div>

                  <p className="text-xblack-70 text-[1.125rem] max-[767px]:text-[1rem]">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
