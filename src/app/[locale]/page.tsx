import { getTranslations, setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import WorksWithSection from "@/components/sections/WorksWithSection";
import ProblemSection from "@/components/sections/ProblemSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import SignalsSection from "@/components/sections/SignalsSection";
import FeatureBentoSection from "@/components/sections/FeatureBentoSection";
import AISection from "@/components/sections/AISection";
import ProofSection from "@/components/sections/ProofSection";
import FaqSection from "@/components/sections/FaqSection";
import ClientMessagesProvider from "@/components/ClientMessagesProvider";
import DotDome from "@/components/ui/DotDome";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const metadata = await getTranslations({ locale, namespace: "Metadata" });
  const features = await getTranslations({ locale, namespace: "WhatYouGet" });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name:
      locale === "bg"
        ? "xHeal Дигитален здравен двойник"
        : "xHeal Digital Health Twin",
    applicationCategory: "HealthApplication",
    operatingSystem: "iOS",
    description: metadata("home.description"),
    inLanguage: locale,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      features("feature1Title"),
      features("feature2Title"),
      features("feature3Title"),
      features("feature4Title"),
      features("feature5Title"),
      features("feature6Title"),
      features("workoutsTitle"),
      features("nutritionTitle"),
      features("mindfulnessTitle"),
    ],
    image: "/images/logo.svg",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* The dome is a fixed layer behind the whole page; `.home-dome` lets
          the light sections show it through (see globals.css). */}
      <div className="home-dome relative isolate">
        <DotDome className="fixed inset-0 -z-10 h-full w-full" />
        <ClientMessagesProvider
          locale={locale}
          namespaces={["HowItWorks", "AI"]}
        >
          <HeroSection />
          <WorksWithSection />
          <ProblemSection />
          <div id="how-it-works" className="scroll-mt-[88px]">
            <HowItWorksSection />
        </div>
        <SignalsSection />
        <div id="features" className="scroll-mt-[88px]">
          <FeatureBentoSection />
        </div>
        <AISection />
        <ProofSection />
        <FaqSection />
      </ClientMessagesProvider>
      </div>
    </>
  );
}
