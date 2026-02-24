"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const faqKeys = [
  "faq1", "faq2", "faq3", "faq4", "faq5", "faq6", "faq7", "faq8", "faq9",
] as const;

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-b-xlight-blue-low">
      <button
        className="w-full text-left py-[20px] flex justify-between items-center gap-[20px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-[1.5rem] font-medium leading-[1] tracking-[-0.01em] text-xblack">
          {question}
        </h3>
        <span className="text-xdark-blue text-[1.5rem] font-medium flex-shrink-0 transition-transform duration-200" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] pb-[20px]" : "max-h-0"
        }`}
      >
        <p className="text-xblack-70 text-[1.125rem]">{answer}</p>
      </div>
    </div>
  );
}

export default function SupportPage() {
  const t = useTranslations("Support");

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
            {t("heroTitle")}
          </h1>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[40px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <div className="w-full max-w-[800px]">
            <h2 className="text-[2rem] font-medium leading-[1] tracking-[-0.02em] mb-[20px]">
              {t("faqTitle")}
            </h2>
            <p className="text-xblack-70 text-[1.125rem] mb-[40px]">
              {t("faqDescription")}{" "}
              <a
                href={`mailto:${t("faqEmail")}`}
                className="text-xlight-blue hover:underline"
              >
                {t("faqEmail")}
              </a>
            </p>

            <div className="flex flex-col">
              {faqKeys.map((key) => (
                <FAQItem
                  key={key}
                  question={t(`${key}Question`)}
                  answer={t(`${key}Answer`)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
