import FeatureLandingPage from "@/components/feature-landing/FeatureLandingPage";

export default function HealthTimelinePage() {
  return (
    <FeatureLandingPage
      heroTitle={
        <>
          Every record. Every result.{" "}
          <span className="text-xlight-blue">One timeline.</span>
        </>
      }
      heroSubtitle="Import your medical records, lab results, and clinical documents into one searchable, AI-analyzed health timeline. Never lose a record again."
      heroImage={{
        src: "/images/records-landing.png",
        alt: "xHeal Health Timeline - unified medical records, lab results, and health history in one searchable view",
        width: 1058,
        height: 2078,
      }}
      painHeading={
        <>
          Your health history shouldn&apos;t be scattered across{" "}
          <span className="text-xdark-blue">a dozen places.</span>
        </>
      }
      painPoints={[
        {
          icon: "folder_off",
          title: "Records scattered across clinics",
          detail:
            "Your GP has some files. The specialist has others. That ER visit from 2022? Good luck finding it. Every provider holds a piece, but nobody holds the whole picture.",
        },
        {
          icon: "search_off",
          title: "Can't find what you need",
          detail:
            "You know you had a blood test six months ago, but which clinic? Which portal? Searching across systems is exhausting and often impossible.",
        },
        {
          icon: "trending_flat",
          title: "No way to see trends",
          detail:
            "Individual test results are snapshots. Without a timeline, you can't see how your markers have changed over months or years, and neither can your doctor.",
        },
      ]}
      howHeading={
        <>
          From scattered files to{" "}
          <span className="text-xdark-blue">your complete health story</span>
        </>
      }
      howItWorks={[
        {
          step: "01",
          title: "Import your records",
          description:
            "Upload PDFs, photos of lab results, or connect directly to health systems. xHeal reads, organizes, and stores everything securely.",
        },
        {
          step: "02",
          title: "xHeal builds your timeline",
          description:
            "Every record, result, and data point gets placed on a chronological timeline. Combined with your wearable and lifestyle data, you get the full picture.",
        },
        {
          step: "03",
          title: "Search, explore, and understand",
          description:
            "Find any record instantly. See how your lab markers trend over time. Ask your Digital Twin to explain what it all means.",
        },
      ]}
      useCasesHeading={
        <>
          Your entire health history,{" "}
          <span className="text-xdark-blue">searchable and connected</span>
        </>
      }
      useCases={[
        {
          question: "Where are my records from last year?",
          tag: "Search",
          description:
            "Find any record, lab result, or clinical document instantly. No more digging through portals or filing cabinets.",
        },
        {
          question: "How have my labs changed over time?",
          tag: "Trends",
          description:
            "See your lab markers plotted on a timeline. Track cholesterol, thyroid, iron, glucose, and more across months or years.",
        },
        {
          question: "What happened around my diagnosis?",
          tag: "Context",
          description:
            "Go back to any point in your timeline and see everything that was happening: symptoms, meds, lifestyle changes, lab results.",
        },
        {
          question: "Can I share my full history with a new doctor?",
          tag: "Sharing",
          description:
            "Generate a comprehensive health summary from your timeline. Perfect for new providers who need your complete history.",
        },
        {
          question: "What tests am I overdue for?",
          tag: "Gaps",
          description:
            "xHeal tracks when your last screenings and tests occurred and highlights what's overdue based on your age and profile.",
        },
        {
          question: "How does my clinical data connect to my daily health?",
          tag: "Connections",
          description:
            "See how lab results, wearable data, symptom logs, and lifestyle inputs connect on one unified timeline.",
        },
      ]}
      comparison={{
        heading: "Other apps hold a piece.",
        headingAccent: "xHeal holds everything.",
        intro: "Your GP has some files. Your specialist has others. Your wearable has its own data. No single app brings it all together into a searchable, unified timeline. xHeal does.",
        columns: ["WHOOP", "Bevel Health", "Olivia Health", "xHeal"],
        rows: [
          { feature: "Import medical records", values: ["no", "no", "yes", "yes"] },
          { feature: "Import lab results", values: ["no", "no", "no", "yes"] },
          { feature: "Unified health timeline", values: ["Biometrics only", "Lifestyle only", "Records only", "All data types combined"] },
          { feature: "Search across your history", values: ["no", "no", "Basic", "yes"] },
          { feature: "Correlate events across time", values: ["no", "no", "no", "yes"] },
          { feature: "Pattern detection over months/years", values: ["no", "no", "no", "yes"] },
          { feature: "Includes wearable + lifestyle data", values: ["Fitness only", "yes", "no", "yes"] },
          { feature: "Clinical AI reasoning (WHO, ADA, EASD)", values: ["no", "no", "no", "yes"] },
          { feature: "Works without proprietary hardware", values: ["no", "Apple Watch only", "yes", "yes"] },
        ],
        closingLine: "WHOOP tracks your workouts. Bevel tracks your lifestyle. Olivia stores your records. Only xHeal combines clinical, wearable, and lifestyle data into one complete health timeline.",
        highlightColumn: 3,
      }}
      testimonialsHeading={
        <>
          Finally, one place for{" "}
          <span className="text-xlight-blue">everything.</span>
        </>
      }
      testimonials={[
        {
          quote:
            "Imported 3 years of scattered medical records in 10 minutes. My new doctor could see my entire history before I even walked in.",
          name: "Brian D.",
          age: 47,
          image: "/images/testimonials/t-078.png",
        },
        {
          quote:
            "I can finally see how my thyroid levels have changed over 2 years alongside my energy and sleep data. That context is invaluable.",
          name: "Harold N.",
          age: 55,
          image: "/images/testimonials/t-080.png",
        },
        {
          quote:
            "Switching doctors used to mean starting from scratch. With xHeal I just share my timeline and they have everything.",
          name: "Dorothy A.",
          age: 61,
          image: "/images/testimonials/t-083.png",
        },
      ]}
      trustHeading={
        <>
          Your records, your control.{" "}
          <span className="text-xdark-blue">Always.</span>
        </>
      }
      trustItems={[
        {
          title: "Bank-level encryption",
          detail:
            "All medical records and lab results are encrypted at rest and in transit. Your clinical data gets the highest level of protection.",
        },
        {
          title: "You own your records",
          detail:
            "Export or delete any record at any time. Your health history belongs to you, not us.",
        },
        {
          title: "No third-party access",
          detail:
            "Your medical records are never shared with advertisers, insurers, or any third party. Period.",
        },
        {
          title: "Clinically informed analysis",
          detail:
            "Lab results and records are interpreted through WHO, ADA, and EASD guidelines for accurate, meaningful insights.",
        },
      ]}
      faqHeading="About your Health Timeline"
      faqs={[
        {
          q: "What types of records can I import?",
          a: "PDFs of lab results, medical records, discharge summaries, imaging reports, and clinical documents. You can upload photos or connect directly to supported health systems.",
        },
        {
          q: "How does xHeal read my lab results?",
          a: "xHeal uses AI to extract markers, values, and dates from your uploaded documents. It then organizes them chronologically and interprets them using clinical guidelines.",
        },
        {
          q: "Can I import records from multiple providers?",
          a: "Yes. That's the whole point. Import from as many providers as you have, and xHeal unifies everything into one timeline.",
        },
        {
          q: "Is my medical data safe?",
          a: "Yes. All records are encrypted and stored securely. We follow HIPAA and GDPR compliance standards. You control who sees your data and can delete it at any time.",
        },
        {
          q: "Can I share my timeline with my doctor?",
          a: "Yes. Generate a report from your timeline or share specific records directly from the app before your appointment.",
        },
      ]}
      pageSlug="health-timeline"
      ctaHeading={
        <>
          Your complete health story.{" "}
          <span className="text-xlight-blue">In one place.</span>
        </>
      }
      ctaSubtitle="Download xHeal and bring all your records, results, and data together."
    />
  );
}
