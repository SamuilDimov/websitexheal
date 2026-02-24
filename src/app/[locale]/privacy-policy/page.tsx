import { getLocale } from "next-intl/server";
import { getLegalContent } from "@/data/legal-content";

export async function generateMetadata() {
  const locale = await getLocale();
  const legal = getLegalContent(locale);
  return { title: legal.privacyPolicy.metaTitle };
}

export default async function PrivacyPolicyPage() {
  const locale = await getLocale();
  const legal = getLegalContent(locale);

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
            {legal.privacyPolicy.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section>
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[40px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <div
            className="rich-text w-full max-w-[800px]"
            dangerouslySetInnerHTML={{ __html: legal.privacyPolicy.content }}
          />
        </div>
      </section>
    </>
  );
}
