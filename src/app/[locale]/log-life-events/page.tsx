"use client";

import { useTranslations } from "next-intl";
import FeatureLandingPage from "@/components/feature-landing/FeatureLandingPage";

export default function LogLifeEventsPage() {
  const t = useTranslations("Feature_LogLifeEvents");

  /* Helper: wrap <accent>…</accent> in a coloured span via next-intl rich text */
  function accent(key: string, color = "text-xlight-blue") {
    return t.rich(key, {
      accent: (chunks) => <span className={color}>{chunks}</span>,
    });
  }

  return (
    <FeatureLandingPage
      heroTitle={accent("heroTitle")}
      heroSubtitle={t("heroSubtitle")}
      heroImage={{
        src: "/images/log-medication.png",
        alt: t("heroImageAlt"),
        width: 1058,
        height: 2078,
      }}
      painHeading={accent("painHeading", "text-xdark-blue")}
      painPoints={[
        { icon: "change_history", title: t("pain1Title"), detail: t("pain1Detail") },
        { icon: "link_off", title: t("pain2Title"), detail: t("pain2Detail") },
        { icon: "history_toggle_off", title: t("pain3Title"), detail: t("pain3Detail") },
      ]}
      howHeading={accent("howHeading", "text-xdark-blue")}
      howItWorks={[
        { step: "01", title: t("how1Title"), description: t("how1Description") },
        { step: "02", title: t("how2Title"), description: t("how2Description") },
        { step: "03", title: t("how3Title"), description: t("how3Description") },
      ]}
      useCasesHeading={accent("useCasesHeading", "text-xdark-blue")}
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
        rows: [
          { feature: t("compRow1Feature"), values: ["no", "no", t("compRow1Val3"), "yes"] },
          { feature: t("compRow2Feature"), values: ["no", "no", "no", "yes"] },
          { feature: t("compRow3Feature"), values: ["no", t("compRow3Val2"), "no", "yes"] },
          { feature: t("compRow4Feature"), values: ["no", t("compRow4Val2"), "no", "yes"] },
          { feature: t("compRow5Feature"), values: ["no", t("compRow5Val2"), "no", t("compRow5Val4")] },
          { feature: t("compRow6Feature"), values: ["no", "no", "no", "yes"] },
          { feature: t("compRow7Feature"), values: ["no", t("compRow7Val2"), t("compRow7Val3"), "yes"] },
          { feature: t("compRow8Feature"), values: ["no", t("compRow8Val2"), "yes", "yes"] },
        ],
        closingLine: t("compClosingLine"),
        highlightColumn: 3,
      }}
      testimonialsHeading={accent("testimonialsHeading")}
      testimonials={[
        { quote: t("test1Quote"), name: t("test1Name"), age: Number(t("test1Age")), image: "/images/testimonials/t-108.png" },
        { quote: t("test2Quote"), name: t("test2Name"), age: Number(t("test2Age")), image: "/images/testimonials/t-110.png" },
        { quote: t("test3Quote"), name: t("test3Name"), age: Number(t("test3Age")), image: "/images/testimonials/t-113.png" },
      ]}
      trustHeading={accent("trustHeading", "text-xdark-blue")}
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
      pageSlug="log-life-events"
      ctaHeading={accent("ctaHeading")}
      ctaSubtitle={t("ctaSubtitle")}
    />
  );
}
