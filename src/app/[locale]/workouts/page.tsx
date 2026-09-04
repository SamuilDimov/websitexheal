"use client";

import { useTranslations } from "next-intl";
import FeatureLandingPage from "@/components/feature-landing/FeatureLandingPage";

export default function WorkoutsPage() {
  const t = useTranslations("Feature_Workouts");

  function accent(key: string, color = "text-xbrand") {
    return t.rich(key, {
      accent: (chunks) => <span className={color}>{chunks}</span>,
    });
  }

  /* Section headings keep their <accent> markup in the catalog but render plain: accent is reserved for the hero. */
  const plain = (key: string) => t.rich(key, { accent: (chunks) => <>{chunks}</> });

  return (
    <FeatureLandingPage
      heroTitle={accent("heroTitle")}
      heroSubtitle={t("heroSubtitle")}
      painHeading={plain("painHeading")}
      painPoints={[
        { icon: "event_repeat", title: t("pain1Title"), detail: t("pain1Detail") },
        { icon: "speed", title: t("pain2Title"), detail: t("pain2Detail") },
        { icon: "medical_information", title: t("pain3Title"), detail: t("pain3Detail") },
      ]}
      howHeading={plain("howHeading")}
      howItWorks={[
        { step: "01", title: t("how1Title"), description: t("how1Description") },
        { step: "02", title: t("how2Title"), description: t("how2Description") },
        { step: "03", title: t("how3Title"), description: t("how3Description") },
      ]}
      useCasesHeading={plain("useCasesHeading")}
      useCases={[
        { question: t("uc1Question"), tag: t("uc1Tag"), description: t("uc1Description") },
        { question: t("uc2Question"), tag: t("uc2Tag"), description: t("uc2Description") },
        { question: t("uc3Question"), tag: t("uc3Tag"), description: t("uc3Description") },
        { question: t("uc4Question"), tag: t("uc4Tag"), description: t("uc4Description") },
        { question: t("uc5Question"), tag: t("uc5Tag"), description: t("uc5Description") },
        { question: t("uc6Question"), tag: t("uc6Tag"), description: t("uc6Description") },
      ]}
      comparison={{
        heading: t("compHeading"),
        headingAccent: t("compHeadingAccent"),
        intro: t("compIntro"),
        columns: [t("compCol1"), t("compCol2"), t("compCol3"), t("compCol4")],
        rows: Array.from({ length: 8 }, (_, index) => ({
          feature: t(`compRow${index + 1}Feature`),
          values: Array.from({ length: 4 }, (__, valueIndex) =>
            t(`compRow${index + 1}Val${valueIndex + 1}`)
          ),
        })),
        closingLine: t("compClosingLine"),
        highlightColumn: 3,
        highlightLabel: t("compWinnerLabel"),
        methodology: t("compMethodology"),
        sources: [
          { label: "WHOOP", url: "https://www.whoop.com/" },
          { label: "Fitbod", url: "https://fitbod.me/" },
          { label: "Hevy", url: "https://www.hevyapp.com/features/workout-plan-generator/" },
        ],
        disclaimer: t("compDisclaimer"),
      }}
      testimonialsHeading={plain("testimonialsHeading")}
      testimonials={[
        { quote: t("test1Quote"), name: t("test1Name"), age: Number(t("test1Age")), image: "/images/testimonials/t-053.png" },
        { quote: t("test2Quote"), name: t("test2Name"), age: Number(t("test2Age")), image: "/images/testimonials/t-054.png" },
        { quote: t("test3Quote"), name: t("test3Name"), age: Number(t("test3Age")), image: "/images/testimonials/t-055.png" },
      ]}
      trustHeading={plain("trustHeading")}
      trustItems={[
        { title: t("trust1Title"), detail: t("trust1Detail") },
        { title: t("trust2Title"), detail: t("trust2Detail") },
        { title: t("trust3Title"), detail: t("trust3Detail") },
        { title: t("trust4Title"), detail: t("trust4Detail") },
      ]}
      faqHeading={t("faqHeading")}
      faqs={[
        { q: t("faq1Q"), a: t("faq1A") },
        { q: t("faq2Q"), a: t("faq2A") },
        { q: t("faq3Q"), a: t("faq3A") },
        { q: t("faq4Q"), a: t("faq4A") },
        { q: t("faq5Q"), a: t("faq5A") },
      ]}
      pageSlug="workouts"
      ctaHeading={plain("ctaHeading")}
      ctaSubtitle={t("ctaSubtitle")}
    />
  );
}
