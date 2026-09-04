"use client";

import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FeatureLandingPage from "@/components/feature-landing/FeatureLandingPage";

export default function SpecialistReadyReportsPage() {
  const t = useTranslations("Feature_SpecialistReadyReports");

  /* Helper: wrap <accent>…</accent> in a coloured span via next-intl rich text */
  function accent(key: string, color = "text-xbrand") {
    return t.rich(key, {
      accent: (chunks) => <span className={color}>{chunks}</span>,
    });
  }

  const fourReports = [
    { title: t("report1Title"), description: t("report1Description") },
    { title: t("report2Title"), description: t("report2Description") },
    { title: t("report3Title"), description: t("report3Description") },
    { title: t("report4Title"), description: t("report4Description") },
  ];

  /* Section headings keep their <accent> markup in the catalog but render plain: accent is reserved for the hero. */
  const plain = (key: string) => t.rich(key, { accent: (chunks) => <>{chunks}</> });

  return (
    <FeatureLandingPage
      heroTitle={accent("heroTitle")}
      heroSubtitle={t("heroSubtitle")}
      painHeading={plain("painHeading")}
      painPoints={[
        { icon: "timer", title: t("pain1Title"), detail: t("pain1Detail") },
        { icon: "blur_on", title: t("pain2Title"), detail: t("pain2Detail") },
        { icon: "psychology_alt", title: t("pain3Title"), detail: t("pain3Detail") },
      ]}
      howHeading={plain("howHeading")}
      howItWorks={[
        { step: "01", title: t("how1Title"), description: t("how1Description") },
        { step: "02", title: t("how2Title"), description: t("how2Description") },
        { step: "03", title: t("how3Title"), description: t("how3Description") },
      ]}
      extraSection={
        <section className="bg-xbg">
          <div className="x-container x-section flex flex-col gap-12">
            <ScrollReveal>
              <h2 className="t-display2 text-xprimary max-w-[52rem]">
                {plain("extraSectionHeading")}
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-6 max-[767px]:grid-cols-1">
              {fourReports.map((r, i) => (
                <ScrollReveal key={r.title} delay={i * 120}>
                  <div className="surface-card-feature p-8 flex flex-col gap-4 h-full">
                    <h3 className="t-h3 text-xprimary">{r.title}</h3>
                    <p className="t-body1 text-xsecondary">{r.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      }
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
        rows: [
          { feature: t("compRow1Feature"), values: ["no", "no", "no", t("compRow1Val4")] },
          { feature: t("compRow2Feature"), values: ["no", "no", "no", "yes"] },
          { feature: t("compRow3Feature"), values: [t("compRow3Val1"), "no", "no", "yes"] },
          { feature: t("compRow4Feature"), values: ["no", "no", "no", "yes"] },
          { feature: t("compRow5Feature"), values: ["no", "no", "no", "yes"] },
          { feature: t("compRow6Feature"), values: ["no", "no", "no", "yes"] },
          { feature: t("compRow7Feature"), values: ["no", "no", "no", "yes"] },
          { feature: t("compRow8Feature"), values: ["no", "no", "no", "yes"] },
        ],
        closingLine: t("compClosingLine"),
        highlightColumn: 3,
      }}
      testimonialsHeading={plain("testimonialsHeading")}
      testimonials={[
        { quote: t("test1Quote"), name: t("test1Name"), age: Number(t("test1Age")), image: "/images/testimonials/t-086.png" },
        { quote: t("test2Quote"), name: t("test2Name"), age: Number(t("test2Age")), image: "/images/testimonials/t-087.png" },
        { quote: t("test3Quote"), name: t("test3Name"), age: Number(t("test3Age")), image: "/images/testimonials/t-091.png" },
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
      pageSlug="specialist-ready-reports"
      ctaHeading={plain("ctaHeading")}
      ctaSubtitle={t("ctaSubtitle")}
    />
  );
}
