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
    <div className="border-b border-xborder">
      <button
        type="button"
        className="w-full text-left py-6 flex justify-between items-start gap-5 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="t-h4 text-xprimary group-hover:text-xbrand transition-colors duration-200">
          {question}
        </h3>
        <span
          className="text-xbrand text-[24px] font-light leading-none flex-shrink-0 mt-1 transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] pb-6" : "max-h-0"
        }`}
      >
        <p className="t-body1 text-xsecondary">{answer}</p>
      </div>
    </div>
  );
}

export default function SupportPage() {
  const t = useTranslations("Support");

  return (
    <>
      {/* Hero */}
      <section className="relative bg-xbg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-radial-glow" aria-hidden />
        <div className="relative w-full max-w-[1440px] mx-auto px-10 pt-[160px] pb-16 flex flex-col items-center gap-10 max-[991px]:px-8 max-[991px]:pt-[120px] max-[479px]:px-5">
          <h1 className="t-display1 text-xprimary text-center">
            {t("heroTitle")}
          </h1>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-xbg">
        <div className="w-full max-w-[1440px] mx-auto px-10 py-24 flex flex-col items-center gap-10 max-[991px]:px-8 max-[991px]:py-16 max-[479px]:px-5">
          <div className="w-full max-w-[800px]">
            <h2 className="t-h1 text-xprimary mb-5">{t("faqTitle")}</h2>
            <p className="t-body1 text-xsecondary mb-10">
              {t("faqDescription")}{" "}
              <a
                href={`mailto:${t("faqEmail")}`}
                className="text-xbrand hover:underline"
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
