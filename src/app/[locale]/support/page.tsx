"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import PageHeader from "@/components/ui/PageHeader";
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
      <PageHeader title={t("heroTitle")} />

      {/* FAQ Section */}
      <section className="bg-xbg">
        <div className="x-container pb-24 pt-4">
          <div className="w-full max-w-[760px]">
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
