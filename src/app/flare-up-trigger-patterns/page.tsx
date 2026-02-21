import FeatureLandingPage from "@/components/feature-landing/FeatureLandingPage";

export default function FlareUpTriggerPatternsPage() {
  return (
    <FeatureLandingPage
      heroTitle={
        <>
          Stop reacting to flare-ups.{" "}
          <span className="text-xlight-blue">Start predicting them.</span>
        </>
      }
      heroSubtitle="xHeal cross-references your symptoms, sleep, stress, nutrition, and activity data to find what triggers your flare-ups, then warns you before the next one hits."
      heroImage={{
        src: "/images/flare-up.png",
        alt: "xHeal Flare-Up Detection - predictive pattern analysis across symptoms, sleep, stress, and activity",
        width: 1058,
        height: 2078,
      }}
      painHeading={
        <>
          You know something triggers it. You just can&apos;t{" "}
          <span className="text-xdark-blue">figure out what.</span>
        </>
      }
      painPoints={[
        {
          icon: "question_mark",
          title: "Triggers hide in plain sight",
          detail:
            "Was it the food? The stress? The bad sleep? When a flare-up hits, you retrace your steps but never find the real cause because the pattern spans days, not hours.",
        },
        {
          icon: "repeat",
          title: "The same cycle, over and over",
          detail:
            "Good week, bad week, good week, bad week. You can feel the rhythm but you can't break it because you don't know which variable to change.",
        },
        {
          icon: "emergency",
          title: "By the time you notice, it's too late",
          detail:
            "Flare-ups don't announce themselves. By the time symptoms hit, you're already in it. What if you could catch the warning signs 24 to 48 hours earlier?",
        },
      ]}
      howHeading={
        <>
          From guessing to{" "}
          <span className="text-xdark-blue">knowing what&apos;s coming</span>
        </>
      }
      howItWorks={[
        {
          step: "01",
          title: "Track what matters",
          description:
            "Log symptoms, meals, sleep, stress, medications, and activity. xHeal also pulls data from Apple Health and your wearables automatically.",
        },
        {
          step: "02",
          title: "xHeal finds the patterns",
          description:
            "Our AI cross-references 250+ parameters over time to identify triggers and early warning signals unique to your body.",
        },
        {
          step: "03",
          title: "Get warnings before it hits",
          description:
            "When xHeal detects a familiar pattern forming, it alerts you with enough time to intervene, change course, and potentially prevent the flare-up entirely.",
        },
      ]}
      useCasesHeading={
        <>
          Patterns your Digital Twin{" "}
          <span className="text-xdark-blue">can uncover for you</span>
        </>
      }
      useCases={[
        {
          question: "Why do I always crash on Wednesdays?",
          tag: "Cycles",
          description:
            "xHeal maps your weekly patterns and shows how Monday's choices ripple into Wednesday's symptoms.",
        },
        {
          question: "Is gluten actually a trigger for me?",
          tag: "Food",
          description:
            "Stop guessing. xHeal correlates your food logs with symptom timing to confirm or rule out suspected triggers.",
        },
        {
          question: "Does poor sleep make my symptoms worse?",
          tag: "Sleep",
          description:
            "See exactly how sleep quality, duration, and timing affect your symptom severity the next day.",
        },
        {
          question: "What combination of factors sets me off?",
          tag: "Multi-trigger",
          description:
            "Most flare-ups have multiple triggers. xHeal identifies the specific combinations that precede your worst days.",
        },
        {
          question: "Am I improving or just having a good week?",
          tag: "Trends",
          description:
            "Track your flare-up frequency and severity over months. See real progress, not just random variation.",
        },
        {
          question: "What should I avoid this week?",
          tag: "Prevention",
          description:
            "Based on your current data trends, xHeal highlights the highest-risk factors for this week and suggests what to watch.",
        },
      ]}
      comparison={{
        heading: "Other apps track symptoms.",
        headingAccent: "xHeal predicts what's coming.",
        intro: "Wellness trackers help you record how you feel. That's useful. But recording isn't preventing. xHeal goes further: it cross-references your symptoms with your sleep, stress, nutrition, activity, and clinical data to find patterns and warns you before a flare-up develops.",
        columns: ["WHOOP", "Bevel Health", "Olivia Health", "xHeal"],
        rows: [
          { feature: "Log symptoms", values: ["no", "no", "yes", "yes"] },
          { feature: "Track daily habits", values: ["yes", "yes", "Limited", "yes"] },
          { feature: "Import medical records", values: ["no", "no", "yes", "yes"] },
          { feature: "Lab result analysis", values: ["no", "no", "no", "yes"] },
          { feature: "AI pattern detection", values: ["no", "no", "no", "yes"] },
          { feature: "Early flare-up warnings", values: ["no", "no", "no", "yes"] },
          { feature: "Correlate across data types", values: ["Fitness only", "Lifestyle only", "Records only", "250+ parameters"] },
          { feature: "Works without proprietary hardware", values: ["no", "Apple Watch only", "yes", "yes"] },
          { feature: "Clinical AI reasoning (WHO, ADA, EASD)", values: ["no", "no", "no", "yes"] },
          { feature: "Generate specialist reports", values: ["no", "no", "no", "4 report types"] },
        ],
        closingLine: "WHOOP tracks your strain. Bevel tracks your recovery. Olivia organizes your records. Only xHeal connects it all to predict what's coming.",
        highlightColumn: 3,
      }}
      testimonialsHeading={
        <>
          They stopped guessing.{" "}
          <span className="text-xlight-blue">xHeal showed them why.</span>
        </>
      }
      testimonials={[
        {
          quote:
            "I've had IBS for years. xHeal showed me that my flare-ups spike 48 hours after combining dairy and poor sleep. Not one or the other, both together.",
          name: "Larry K.",
          age: 38,
          image: "/images/testimonials/t-100.png",
        },
        {
          quote:
            "xHeal caught a pattern I missed for 3 years: my migraines correlate with low HRV plus skipped meals. My neurologist confirmed it makes sense.",
          name: "Deborah W.",
          age: 52,
          image: "/images/testimonials/t-101.png",
        },
        {
          quote:
            "Got a warning on Tuesday that my pattern looked like a flare-up was building. Changed my routine, slept more, and Thursday was fine. That never happens.",
          name: "Howard J.",
          age: 44,
          image: "/images/testimonials/t-104.png",
        },
      ]}
      trustHeading={
        <>
          How xHeal protects{" "}
          <span className="text-xdark-blue">your health data</span>
        </>
      }
      trustItems={[
        {
          title: "Your patterns stay private",
          detail:
            "Flare-up data, triggers, and symptom logs are encrypted and visible only to you. We never share health patterns with third parties.",
        },
        {
          title: "Clinical-grade pattern analysis",
          detail:
            "xHeal uses WHO, ADA, and EASD guidelines to interpret patterns, not generic wellness algorithms.",
        },
        {
          title: "You control the data",
          detail:
            "Delete any symptom log, trigger, or pattern analysis at any time. Your data, your rules.",
        },
        {
          title: "No data sold, ever",
          detail:
            "We don't monetize your health data. Our business model is the product, not your personal information.",
        },
      ]}
      faqHeading="About flare-up detection"
      faqs={[
        {
          q: "How does flare-up detection work?",
          a: "xHeal analyzes patterns across your symptoms, sleep, stress, nutrition, activity, and clinical data over time. When it detects a combination of factors that preceded previous flare-ups, it alerts you early.",
        },
        {
          q: "How early can it warn me?",
          a: "It depends on your patterns. Some users see warnings 24 to 48 hours before a flare-up. The more data xHeal has, the earlier and more accurate the warnings become.",
        },
        {
          q: "What conditions does it work for?",
          a: "Flare-up detection works for any condition with recurring episodes: IBS, migraines, eczema, fibromyalgia, autoimmune conditions, and more. If it has a pattern, xHeal can find it.",
        },
        {
          q: "Does it replace medical diagnosis?",
          a: "No. xHeal identifies patterns and correlations in your data to help you and your care team understand triggers. It does not diagnose conditions or replace clinical care.",
        },
        {
          q: "How much data does it need?",
          a: "Pattern detection improves with more data. Most users start seeing initial insights within 2 to 4 weeks of consistent tracking.",
        },
      ]}
      pageSlug="flare-up-trigger-patterns"
      ctaHeading={
        <>
          Know what&apos;s coming.{" "}
          <span className="text-xlight-blue">Before it hits.</span>
        </>
      }
      ctaSubtitle="Download xHeal and start uncovering the patterns behind your flare-ups."
    />
  );
}
