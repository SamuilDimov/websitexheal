import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { getBlogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://xheal.com"),
  title: "Trifon Getsov — Author & Co-founder | xHeal",
  description:
    "CEO & Co-founder of xHeal. After a 4-year personal health crisis, Trifon built xHeal to help people understand their health data before symptoms appear. xHeal AI validated against 5,000+ patients.",
};

export default async function TrifonBioPage() {
  const locale = await getLocale();
  const posts = getBlogPosts(locale);
  const trifonPosts = posts.filter(
    (p) =>
      p.author.name === "Trifon Getsov" &&
      !p.slug.includes("newsletter")
  );

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
        <div className="w-full max-w-[100em] mx-auto px-[5em] pt-[200px] pb-[5em] flex flex-col items-center gap-[20px] text-xwhite max-[991px]:px-[40px] max-[991px]:pt-[140px] max-[479px]:px-[20px]">
          <Image
            src="/images/trifon.png"
            alt="Trifon Getsov"
            width={120}
            height={120}
            className="rounded-full object-cover"
            style={{ width: 120, height: 120 }}
          />
          <h1 className="text-[4rem] font-medium leading-[1.05] tracking-[-0.04em] text-center max-[991px]:text-[3rem] max-[479px]:text-[2.5rem]">
            Trifon Getsov
          </h1>
          <p className="text-[1.25rem] opacity-80">CEO &amp; Co-founder, xHeal</p>
        </div>
      </section>

      {/* Bio content */}
      <section>
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <div className="max-w-[800px] mx-auto w-full flex flex-col gap-[48px]">

            {/* About */}
            <div className="flex flex-col gap-[20px]">
              <h2 className="text-[2rem] font-medium leading-[1] tracking-[-0.02em]">
                About Trifon
              </h2>
              <p className="text-[1.125rem] text-xblack-70 leading-[1.6]">
                Trifon Getsov is CEO and Co-founder of xHeal, a health intelligence platform that connects wearable data, lab results, and symptom patterns to detect health issues before symptoms appear. He brings experience as a 3x CEO across biotechnology, software, and product development.
              </p>
              <p className="text-[1.125rem] text-xblack-70 leading-[1.6]">
                In 2019, at age 27, Trifon experienced recurring prostatitis that resisted nine rounds of antibiotics and left his immune system severely compromised. After visiting specialists in Bulgaria and abroad without identifying a root cause, he spent four years investigating his own health data. He eventually identified gut dysbiosis driving chronic inflammation as the underlying issue — a finding that would have been visible much earlier with the right data connections.
              </p>
              <p className="text-[1.125rem] text-xblack-70 leading-[1.6]">
                That experience became the founding insight behind xHeal. During beta testing, xHeal&apos;s predictive engine detected elevated HOMA-IR (early-stage insulin resistance) in Trifon before he had any symptoms — the kind of early warning that standard annual bloodwork would have missed entirely. xHeal&apos;s AI has since been validated against more than 5,000 patient records.
              </p>
            </div>

            {/* Credentials */}
            <div className="p-[28px] rounded-[16px] border border-xlight-blue-low flex flex-col gap-[16px]">
              <h3 className="text-[1.25rem] font-medium">Credentials &amp; Experience</h3>
              <ul className="flex flex-col gap-[12px]">
                {[
                  "CEO & Co-founder, xHeal",
                  "3x CEO — biotechnology and product development",
                  "4-year personal chronic illness recovery: identified gut dysbiosis as root cause after 9 rounds of antibiotics failed",
                  "xHeal AI validated against 5,000+ patient records",
                  "Personal case study: early insulin resistance detected by xHeal before symptoms appeared",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-[12px] text-[1rem] text-xblack-70">
                    <span className="text-xdark-blue mt-[3px] flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Medical review */}
            <div className="p-[20px] rounded-[16px] bg-xlight-blue-low/30 border border-xlight-blue-low">
              <p className="text-[0.9rem] text-xblack-70 leading-[1.5]">
                All health content authored by Trifon Getsov on the xHeal blog is medically reviewed by{" "}
                <strong>Dr. Rayna Mihaylova, MD</strong> before publication, in line with E-E-A-T guidelines for health and medical content.
              </p>
            </div>

            {/* Published articles */}
            {trifonPosts.length > 0 && (
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[2rem] font-medium leading-[1] tracking-[-0.02em]">
                  Published Articles
                </h2>
                <div className="flex flex-col gap-[12px]">
                  {trifonPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="flex flex-col gap-[4px] p-[20px] rounded-[16px] border border-xlight-blue-low hover:border-xdark-blue transition-colors duration-200 group"
                    >
                      <span className="font-medium text-[1rem] text-xblack group-hover:text-xdark-blue transition-colors duration-200">
                        {post.title}
                      </span>
                      <span className="text-[0.8rem] text-xblack-70">
                        {post.date} · {post.readingTime} min read
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link
              href="/blog"
              className="text-xdark-blue hover:underline"
              style={{ fontSize: "16px" }}
            >
              &larr; Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
