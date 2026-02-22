import HeroSection from "@/components/sections/HeroSection";
import StickyTabSection from "@/components/sections/StickyTabSection";
import WhatYouGetSection from "@/components/sections/WhatYouGetSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import AISection from "@/components/sections/AISection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "xHeal",
  applicationCategory: "HealthApplication",
  operatingSystem: "iOS",
  description:
    "xHeal is a comprehensive mobile health platform that unifies medical records, lab results, and lifestyle data into one secure space. Using specialized AI models, it provides personalized health insights, actionable recommendations, and flare-up detection to help users take control of their wellbeing.",
  inLanguage: "en",
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
    "Unified health data from medical records, lab results, and lifestyle tracking",
    "AI-powered health pattern analysis and insights",
    "Personalized nutrition plans and fitness routines",
    "Flare-up detection and early warning system",
    "Specialist-ready health reports for healthcare providers",
    "Apple Health integration",
    "Gamified daily health actions and habit building",
    "Secure medical document storage",
  ],
  image: "/images/logo.svg",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <StickyTabSection />
      <HowItWorksSection />
      <WhatYouGetSection />
      <AISection />
      <TestimonialsSection />
    </>
  );
}
