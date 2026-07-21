import { getTranslations, setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import StickyTabSection from "@/components/sections/StickyTabSection";
import WhatYouGetSection from "@/components/sections/WhatYouGetSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import AISection from "@/components/sections/AISection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ClientMessagesProvider from "@/components/ClientMessagesProvider";

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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "8",
      reviewCount: "8",
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
      <ClientMessagesProvider
        locale={locale}
        namespaces={["StickyTab", "HowItWorks"]}
      >
        <HeroSection />
        <StickyTabSection />
        <HowItWorksSection />
        <WhatYouGetSection />
        <AISection />
        <TestimonialsSection />
      </ClientMessagesProvider>
    </>
  );
}
