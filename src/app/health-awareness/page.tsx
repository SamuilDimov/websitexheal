import FeatureLandingPage from "@/components/feature-landing/FeatureLandingPage";

export default function HealthAwarenessPage() {
  return (
    <FeatureLandingPage
      heroTitle={
        <>
          See the{" "}
          <span className="text-xlight-blue">full picture</span> of your
          health
        </>
      }
      heroSubtitle={
        <>
          xHeal connects your sleep, mood, nutrition, activity, medical
          records, and lab results into one clear Health Awareness score
          &ndash; so you always know where you stand.
        </>
      }
      heroImage={{
        src: "/images/dashboard.png",
        alt: "xHeal Health Awareness - see your complete health score across all domains",
        width: 932,
        height: 1830,
      }}
      painHeading={
        <>
          Six health domains. Zero places that connect them,{" "}
          <span className="text-xdark-blue">until now.</span>
        </>
      }
      painPoints={[
        {
          icon: "pie_chart",
          title: "Health is more than one number",
          detail:
            "Your doctor checks cholesterol. Your watch tracks steps. Your app counts calories. But no one connects them. Real health awareness means seeing how everything fits together.",
        },
        {
          icon: "content_cut",
          title: "Doctors see fragments",
          detail:
            "Each specialist sees their slice. Your GP gets 15 minutes. Nobody has the time or tools to connect your sleep patterns with your lab results and your stress levels.",
        },
        {
          icon: "visibility_off",
          title: "You can\u2019t improve what you can\u2019t see",
          detail:
            "Without a unified view, you\u2019re guessing which area of your health needs attention most. Small issues go unnoticed until they become big problems.",
        },
      ]}
      howHeading={
        <>
          From scattered data to{" "}
          <span className="text-xdark-blue">a single score</span>
        </>
      }
      howItWorks={[
        {
          step: "01",
          title: "Connect your data sources",
          description:
            "Import medical records, sync Apple Health, connect wearables, log symptoms and lifestyle data. xHeal brings it all into one secure place.",
        },
        {
          step: "02",
          title: "xHeal builds your health profile",
          description:
            "Our AI analyzes data across six domains \u2013 mental, physical, nutrition, medical, sleep, and activity \u2013 to create a comprehensive picture of your wellbeing.",
        },
        {
          step: "03",
          title: "Get your Health Awareness score",
          description:
            "See a clear 0\u2013100 score that reflects your overall health awareness, with breakdowns by domain and specific recommendations to improve.",
        },
      ]}
      useCasesHeading={
        <>
          See where you stand.{" "}
          <span className="text-xdark-blue">Know where to focus.</span>
        </>
      }
      useCases={[
        {
          question: "How is my overall health trending?",
          tag: "Overview",
          description:
            "See your Health Awareness score over time and understand whether you\u2019re moving in the right direction.",
        },
        {
          question: "What area needs the most attention?",
          tag: "Priority",
          description:
            "xHeal highlights which health domain is lagging and suggests where to focus your energy for the biggest impact.",
        },
        {
          question: "Am I actually improving?",
          tag: "Progress",
          description:
            "Track changes week over week and month over month. See concrete evidence of your progress, not just feelings.",
        },
        {
          question: "How does my sleep affect everything else?",
          tag: "Connections",
          description:
            "Understand how one area of your health ripples across others. Sleep, stress, nutrition, and activity are more connected than you think.",
        },
        {
          question: "What am I missing?",
          tag: "Gaps",
          description:
            "xHeal identifies blind spots in your health data and suggests what to track or test next for a more complete picture.",
        },
        {
          question: "Can I share this with my doctor?",
          tag: "Sharing",
          description:
            "Generate a Health Awareness report to bring to your next appointment. Give your doctor context they\u2019ve never had before.",
        },
      ]}
      comparison={{
        heading: "Other apps give you a score.",
        headingAccent: "xHeal shows the full picture.",
        intro: "Most health tools score one dimension: your fitness, your sleep, or your body composition. None of them combine clinical data, wearable metrics, lab results, and daily habits into a single picture. xHeal does.",
        columns: ["WHOOP", "Bevel Health", "Olivia Health", "xHeal"],
        rows: [
          { feature: "Holistic health score", values: ["Recovery + strain only", "4 lifestyle pillars", "no", "250+ parameters combined"] },
          { feature: "Includes clinical data (labs, records)", values: ["no", "no", "Medical records only", "yes"] },
          { feature: "Includes wearable + lifestyle data", values: ["Fitness metrics only", "yes", "no", "yes"] },
          { feature: "Explains why your score changed", values: ["no", "Basic AI chat", "no", "yes"] },
          { feature: "Predictive health insights", values: ["Basic recovery prediction", "no", "no", "yes"] },
          { feature: "Cross-references all data types", values: ["no", "no", "no", "yes"] },
          { feature: "Clinical AI reasoning (WHO, ADA, EASD)", values: ["no", "no", "no", "yes"] },
          { feature: "Works without proprietary hardware", values: ["no", "Apple Watch only", "yes", "yes"] },
        ],
        closingLine: "WHOOP scores your recovery. Bevel scores your lifestyle. Olivia stores your records. xHeal is the only platform that combines all of it into one health awareness score you can actually act on.",
        highlightColumn: 3,
      }}
      testimonialsHeading={
        <>
          The full picture{" "}
          <span className="text-xlight-blue">changed everything</span>
        </>
      }
      testimonials={[
        {
          quote:
            "My health awareness score dropped from 78 to 62 and I had no idea why. xHeal pinpointed it to my sleep quality declining over two weeks.",
          name: "Adrian V.",
          age: 36,
          image: "/images/testimonials/t-118.png",
        },
        {
          quote:
            "Going from a 55 to an 82 health score in 4 months felt incredible. Having a single number to track kept me motivated every day.",
          name: "Tamara S.",
          age: 30,
          image: "/images/testimonials/t-119.png",
        },
        {
          quote:
            "My score revealed that I was strong in fitness but terrible in stress management. That targeted insight was worth more than a gym membership.",
          name: "Vincent P.",
          age: 33,
          image: "/images/testimonials/t-122.png",
        },
      ]}
      trustHeading={
        <>
          How we calculate your score, and{" "}
          <span className="text-xdark-blue">protect your data</span>
        </>
      }
      trustItems={[
        {
          title: "Six-domain framework",
          detail:
            "Your score reflects mental wellness, physical activity, nutrition, medical records, sleep quality, and lifestyle, not a single metric.",
        },
        {
          title: "Clinically referenced scoring",
          detail:
            "Domain weights and thresholds follow WHO, ADA, and EASD guidelines. This isn't a gamified fitness score.",
        },
        {
          title: "Score improves with data, not purchases",
          detail:
            "Your Health Awareness score reflects your actual health profile completeness. There's no pay-to-improve mechanic.",
        },
        {
          title: "Private by default",
          detail:
            "Your score and domain breakdowns are visible only to you. Share them with your care team when and if you choose.",
        },
      ]}
      faqHeading="About your Health Awareness score"
      faqs={[
        {
          q: "What is the Health Awareness score?",
          a: "It\u2019s a 0\u2013100 score that reflects how well you understand and track your health across six key domains: mental wellness, physical activity, nutrition, medical records, sleep quality, and overall lifestyle.",
        },
        {
          q: "How is the score calculated?",
          a: "xHeal analyzes the breadth and depth of your health data, your tracking consistency, and the patterns it finds across domains. The more complete your profile, the more accurate your score.",
        },
        {
          q: "Can the score replace a medical diagnosis?",
          a: "No. The Health Awareness score is a personal wellness metric, not a clinical assessment. It helps you understand your health better and prepare more informed conversations with your doctor.",
        },
        {
          q: "How often does the score update?",
          a: "Your score updates as new data comes in \u2013 after syncing wearable data, logging symptoms, or uploading new records. You\u2019ll see trends over days, weeks, and months.",
        },
        {
          q: "What if my score is low?",
          a: "A low score usually means there are gaps in your health data or areas that need attention. xHeal will highlight specific actions you can take to improve.",
        },
      ]}
      pageSlug="health-awareness"
      ctaHeading={
        <>
          Understand your health.{" "}
          <span className="text-xlight-blue">All of it.</span>
        </>
      }
      ctaSubtitle="Download xHeal and get a complete picture of your wellbeing, not just pieces."
    />
  );
}
