import FeatureLandingPage from "@/components/feature-landing/FeatureLandingPage";

export default function LogLifeEventsPage() {
  return (
    <FeatureLandingPage
      heroTitle={
        <>
          Log it. Understand it.{" "}
          <span className="text-xlight-blue">Connect it.</span>
        </>
      }
      heroSubtitle="Track medications, supplements, life events, and daily habits. xHeal connects what you log to what your body shows, so you can see what actually works."
      heroImage={{
        src: "/images/log-medication.png",
        alt: "xHeal Log Life Events - track medications, supplements, and daily habits with AI-powered correlation analysis",
        width: 1058,
        height: 2078,
      }}
      painHeading={
        <>
          You changed something. Did it{" "}
          <span className="text-xdark-blue">actually help?</span>
        </>
      }
      painPoints={[
        {
          icon: "change_history",
          title: "Small changes have big effects",
          detail:
            "Started a new supplement? Changed your diet? Moved to a new city? These moments shape your health, but they're invisible to your doctor and easy to forget.",
        },
        {
          icon: "link_off",
          title: "No way to connect cause and effect",
          detail:
            "You started magnesium three weeks ago. Is your sleep better because of that, or because of the weather change? Without data, you'll never know.",
        },
        {
          icon: "history_toggle_off",
          title: "Memory is unreliable",
          detail:
            "When did you start that medication? When did the side effect appear? Human memory is terrible at health timelines. Your phone shouldn't be.",
        },
      ]}
      howHeading={
        <>
          From scattered notes to{" "}
          <span className="text-xdark-blue">connected insights</span>
        </>
      }
      howItWorks={[
        {
          step: "01",
          title: "Log what matters",
          description:
            "Record medications, supplements, diet changes, life events, symptoms, and anything else that might affect your health. Quick, simple, flexible.",
        },
        {
          step: "02",
          title: "xHeal connects it to your data",
          description:
            "Every log entry joins your wearable data, lab results, medical records, and symptom history on one unified timeline.",
        },
        {
          step: "03",
          title: "See what actually changed",
          description:
            "xHeal shows you how logged events correlate with changes in your health markers. Started magnesium? See if your sleep actually improved.",
        },
      ]}
      useCasesHeading={
        <>
          Track the moments that{" "}
          <span className="text-xdark-blue">shape your health</span>
        </>
      }
      useCases={[
        {
          question: "Is this supplement actually working?",
          tag: "Supplements",
          description:
            "Log when you start, stop, or change a supplement. xHeal tracks whether your relevant health markers actually improve.",
        },
        {
          question: "When did I start this medication?",
          tag: "Medications",
          description:
            "Never forget a start date, dosage change, or side effect. Your medication history is always at your fingertips.",
        },
        {
          question: "Did moving cities affect my health?",
          tag: "Life events",
          description:
            "Log major life changes and see how they correlate with shifts in your sleep, mood, energy, and symptoms.",
        },
        {
          question: "What should I tell my doctor about the last 3 months?",
          tag: "Doctor prep",
          description:
            "Every logged event becomes part of your health timeline. Generate a report that shows exactly what changed and when.",
        },
        {
          question: "Which diet actually helped?",
          tag: "Nutrition",
          description:
            "Log dietary changes and track how your body responds over weeks and months. Data beats guesswork.",
        },
        {
          question: "What side effects appeared after my dosage change?",
          tag: "Monitoring",
          description:
            "Correlate medication changes with symptom logs to help your doctor fine-tune your treatment.",
        },
      ]}
      comparison={{
        heading: "Other apps track habits.",
        headingAccent: "xHeal connects them to outcomes.",
        intro: "Most health tools let you log food or workouts. But none of them let you log medications, supplements, and life events, then show you how those changes actually affect your health over time.",
        columns: ["WHOOP", "Bevel Health", "Olivia Health", "xHeal"],
        rows: [
          { feature: "Log medications", values: ["no", "no", "Basic", "yes"] },
          { feature: "Log supplements", values: ["no", "no", "no", "yes"] },
          { feature: "Log life events (moves, diet changes)", values: ["no", "Journaling only", "no", "yes"] },
          { feature: "Log food and nutrition", values: ["no", "AI food logging", "no", "yes"] },
          { feature: "Correlate logs with health data", values: ["no", "Basic (caffeine + HRV)", "no", "250+ parameters"] },
          { feature: "See impact over time", values: ["no", "no", "no", "yes"] },
          { feature: "AI explains what changed and why", values: ["no", "Basic AI chat", "Basic AI chat", "yes"] },
          { feature: "Works without proprietary hardware", values: ["no", "Apple Watch only", "yes", "yes"] },
        ],
        closingLine: "WHOOP tracks strain. Bevel logs your meals. Olivia tracks medications. Only xHeal lets you log everything and then shows you how it all connects.",
        highlightColumn: 3,
      }}
      testimonialsHeading={
        <>
          They logged the change.{" "}
          <span className="text-xlight-blue">xHeal showed the impact.</span>
        </>
      }
      testimonials={[
        {
          quote:
            "Started logging my supplements in xHeal. Three weeks later, it showed me that magnesium was actually improving my deep sleep by 22%. Now I know it works.",
          name: "Dana K.",
          age: 29,
          image: "/images/testimonials/t-108.png",
        },
        {
          quote:
            "Logged my medication change and within days xHeal flagged that my resting heart rate had shifted. My doctor said that was exactly what they'd expect.",
          name: "Wesley F.",
          age: 50,
          image: "/images/testimonials/t-110.png",
        },
        {
          quote:
            "I track everything: supplements, diet changes, stressful events. xHeal connects the dots in ways I never could on my own.",
          name: "Kelly N.",
          age: 34,
          image: "/images/testimonials/t-113.png",
        },
      ]}
      trustHeading={
        <>
          Your logs, your data.{" "}
          <span className="text-xdark-blue">Always private.</span>
        </>
      }
      trustItems={[
        {
          title: "Medication data stays secure",
          detail:
            "Your medication and supplement logs are encrypted and never shared with third parties, insurers, or employers.",
        },
        {
          title: "Clinical-grade correlations",
          detail:
            "xHeal uses WHO, ADA, and EASD guidelines to interpret how logged changes relate to your health data.",
        },
        {
          title: "Delete anything, anytime",
          detail:
            "Remove any log entry, medication record, or life event from your timeline. No questions asked.",
        },
        {
          title: "Your data is never sold",
          detail:
            "We don't monetize your health data. What you log stays between you and your Digital Twin.",
        },
      ]}
      faqHeading="About logging life events"
      faqs={[
        {
          q: "What can I log?",
          a: "Medications, supplements, dietary changes, exercise routines, life events (moves, job changes, relationship changes), symptoms, and anything else that might affect your health.",
        },
        {
          q: "How does xHeal connect my logs to health data?",
          a: "Every log entry is placed on your health timeline alongside wearable data, lab results, and symptom history. xHeal's AI looks for correlations between logged events and changes in your health markers.",
        },
        {
          q: "How long until I see correlations?",
          a: "It depends on what you're tracking. Some correlations (like sleep supplements) may show within days. Others (like dietary changes) may take weeks. The more consistently you log, the faster insights appear.",
        },
        {
          q: "Can I share my logs with my doctor?",
          a: "Yes. Your logged events become part of your health reports. Generate a timeline-based report for your next appointment.",
        },
        {
          q: "Is my medication data private?",
          a: "Absolutely. All medication and supplement data is encrypted and never shared with third parties. You control who sees it.",
        },
      ]}
      pageSlug="log-life-events"
      ctaHeading={
        <>
          Log the change.{" "}
          <span className="text-xlight-blue">See the impact.</span>
        </>
      }
      ctaSubtitle="Download xHeal and start connecting your daily choices to real health outcomes."
    />
  );
}
