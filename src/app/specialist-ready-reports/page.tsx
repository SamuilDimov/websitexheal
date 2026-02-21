import ScrollReveal from "@/components/ui/ScrollReveal";
import FeatureLandingPage from "@/components/feature-landing/FeatureLandingPage";

const fourReports = [
  {
    title: "Why Finder",
    description:
      "Uncovers root causes behind your symptoms. xHeal traces connections across your data to help you and your doctor understand why you feel the way you do.",
  },
  {
    title: "My Snapshot",
    description:
      "A quick wellness overview for any appointment. Covers your current status across all six health domains in a format any provider can understand in minutes.",
  },
  {
    title: "Clinical Report",
    description:
      "Detailed, data-rich report designed for doctors and specialists. Includes lab trends, vital sign patterns, medication history, and relevant correlations.",
  },
  {
    title: "Health Gaps",
    description:
      "Identifies what's missing from your care. Highlights tests you haven't had, screenings that are overdue, and areas where your data is incomplete.",
  },
];

export default function SpecialistReadyReportsPage() {
  return (
    <FeatureLandingPage
      heroTitle={
        <>
          Walk into every appointment{" "}
          <span className="text-xlight-blue">prepared</span>
        </>
      }
      heroSubtitle="Four specialist-ready reports that give your doctors, nutritionists, and trainers the complete picture - so no detail gets lost in a 15-minute visit."
      heroImage={{
        src: "/images/get-reports.png",
        alt: "xHeal Specialist-Ready Reports - generate detailed health reports for your doctors, nutritionists, and trainers",
        width: 978,
        height: 1998,
      }}
      painHeading={
        <>
          15 minutes. That&apos;s all you get.{" "}
          <span className="text-xdark-blue">Make them count.</span>
        </>
      }
      painPoints={[
        {
          icon: "timer",
          title: "Appointments feel rushed",
          detail:
            "Fifteen minutes to cover months of symptoms, test results, and concerns. Important details get skipped because there's simply not enough time.",
        },
        {
          icon: "blur_on",
          title: "Doctors don't have context",
          detail:
            "Your specialist sees their slice. Your GP sees another. Nobody has the unified view of your sleep, stress, symptoms, and lab results all together.",
        },
        {
          icon: "psychology_alt",
          title: "You forget what to ask",
          detail:
            "You walk in with questions. You walk out realizing you forgot half of them. Without preparation, the most important conversations don't happen.",
        },
      ]}
      howHeading={
        <>
          From your data to{" "}
          <span className="text-xdark-blue">your doctor&apos;s hands</span>
        </>
      }
      howItWorks={[
        {
          step: "01",
          title: "xHeal analyzes your full profile",
          description:
            "Your medical records, lab results, wearable data, symptom logs, and lifestyle inputs are all analyzed to build a comprehensive health picture.",
        },
        {
          step: "02",
          title: "Choose a report type",
          description:
            "Pick the report that fits your need - whether you're seeing a GP, a specialist, a nutritionist, or a personal trainer.",
        },
        {
          step: "03",
          title: "Share with your care team",
          description:
            "Download or share your report directly. Your doctor gets the context they need before the appointment even starts.",
        },
      ]}
      extraSection={
        <section>
          <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col gap-[80px] max-[991px]:px-[40px] max-[479px]:px-[20px]">
            <ScrollReveal>
              <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-xblack max-w-[52rem] max-[991px]:text-[3rem]">
                Four reports.{" "}
                <span className="text-xdark-blue">Every angle covered.</span>
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-[24px] max-[767px]:grid-cols-1">
              {fourReports.map((r, i) => (
                <ScrollReveal key={r.title} delay={i * 120}>
                  <div className="border border-xlight-blue-low bg-xwhite rounded-[16px] p-[32px] shadow-[0_4px_4px_#1419330d] flex flex-col gap-[16px] h-full transition-all duration-300 hover:shadow-[0_12px_40px_#14193318] hover:-translate-y-[4px]">
                    <h3 className="text-[1.5rem] font-bold leading-[1.1] tracking-[-0.01em] text-xdark-blue">
                      {r.title}
                    </h3>
                    <p className="text-xblack-70 text-[1.125rem] leading-[1.5] max-[767px]:text-[1rem]">
                      {r.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      }
      useCasesHeading={
        <>
          The right report for{" "}
          <span className="text-xdark-blue">every appointment</span>
        </>
      }
      useCases={[
        {
          question: "What should my doctor know before my appointment?",
          tag: "GP visit",
          description:
            "Generate a My Snapshot report that summarizes your current health status across all domains.",
        },
        {
          question: "How do I explain my symptoms to a specialist?",
          tag: "Specialist",
          description:
            "The Why Finder report traces root causes and connections, giving specialists the context they need.",
        },
        {
          question: "How have my labs changed over time?",
          tag: "Lab trends",
          description:
            "The Clinical Report includes historical lab trends so your doctor can see the trajectory, not just today's numbers.",
        },
        {
          question: "Am I missing any important tests?",
          tag: "Prevention",
          description:
            "Health Gaps identifies screenings and tests you're overdue for, based on your age, history, and health profile.",
        },
        {
          question: "What should my nutritionist know?",
          tag: "Nutrition",
          description:
            "Share relevant data about your diet, supplements, lab markers, and symptom patterns with your nutrition team.",
        },
        {
          question: "How do I brief my trainer on my limits?",
          tag: "Fitness",
          description:
            "Share activity data, recovery patterns, and any medical constraints so your trainer can design safe, effective programs.",
        },
      ]}
      comparison={{
        heading: "Other apps track your health.",
        headingAccent: "xHeal helps you share it.",
        intro: "You track everything. But when you sit down with your doctor, none of that data comes with you. Most health apps have no way to generate reports. xHeal creates specialist-ready documents that turn months of data into something your doctor can read in minutes.",
        columns: ["WHOOP", "Bevel Health", "Olivia Health", "xHeal"],
        rows: [
          { feature: "Generate reports for your doctor", values: ["no", "no", "no", "4 report types"] },
          { feature: "Include lab results in reports", values: ["no", "no", "no", "yes"] },
          { feature: "Include wearable data in reports", values: ["Data export only", "no", "no", "yes"] },
          { feature: "Include symptom + lifestyle context", values: ["no", "no", "no", "yes"] },
          { feature: "Formatted for clinical review", values: ["no", "no", "no", "yes"] },
          { feature: "Clinical AI reasoning (WHO, ADA, EASD)", values: ["no", "no", "no", "yes"] },
          { feature: "Cross-references 250+ parameters", values: ["no", "no", "no", "yes"] },
          { feature: "Share via PDF or in-app", values: ["no", "no", "no", "yes"] },
        ],
        closingLine: "WHOOP lets you export raw data. Bevel and Olivia have no report features at all. xHeal is the only app that generates clinical-grade reports your doctor can actually use.",
        highlightColumn: 3,
      }}
      testimonialsHeading={
        <>
          My doctor said: &lsquo;I wish all patients{" "}
          <span className="text-xlight-blue">
            came this prepared.&rsquo;
          </span>
        </>
      }
      testimonials={[
        {
          quote:
            "Walked into my gastro appointment with a 6-month report from xHeal. He spent less time asking questions and more time actually helping.",
          name: "Allen S.",
          age: 40,
          image: "/images/testimonials/t-086.png",
        },
        {
          quote:
            "My new doctor said my xHeal report was the best new patient summary she'd ever received. Cut our first appointment time in half.",
          name: "Cheryl B.",
          age: 45,
          image: "/images/testimonials/t-087.png",
        },
        {
          quote:
            "My functional medicine doctor said my xHeal report saved us two months of intake assessments. We jumped straight to treatment.",
          name: "Claire V.",
          age: 41,
          image: "/images/testimonials/t-091.png",
        },
      ]}
      trustHeading={
        <>
          Reports you control.{" "}
          <span className="text-xdark-blue">Data that stays private.</span>
        </>
      }
      trustItems={[
        {
          title: "Designed with clinicians in mind",
          detail:
            "Report formats follow clinical communication standards. Doctors, nutritionists, and trainers can read them without training.",
        },
        {
          title: "Guideline-aligned analysis",
          detail:
            "Every report references WHO, ADA, and EASD standards, giving your care team confidence in the data behind it.",
        },
        {
          title: "You decide who sees what",
          detail:
            "Download as PDF, share from the app, or keep reports private. No report is shared without your explicit action.",
        },
        {
          title: "No data leaves without you",
          detail:
            "Reports are generated on-demand. Your full health profile never leaves the xHeal ecosystem unless you export it.",
        },
      ]}
      faqHeading="About specialist-ready reports"
      faqs={[
        {
          q: "Who are these reports designed for?",
          a: "They're designed for any healthcare provider: GPs, specialists, nutritionists, personal trainers, or therapists. Each report is formatted to be clear and actionable for professionals.",
        },
        {
          q: "Can my doctor access my reports directly?",
          a: "You control sharing. You can download reports as PDFs or share them directly from the app before or during appointments.",
        },
        {
          q: "How often should I generate reports?",
          a: "Before any appointment or health check-up. Reports are generated from your latest data, so they're always current.",
        },
        {
          q: "Are the reports clinically accurate?",
          a: "Reports are based on your actual data and interpreted through WHO, ADA, EASD, and other clinical guidelines. They're designed to support - not replace - clinical judgment.",
        },
        {
          q: "Can I customize what's included?",
          a: "xHeal automatically selects the most relevant data for each report type. You can also add personal notes or context before sharing.",
        },
      ]}
      pageSlug="specialist-ready-reports"
      ctaHeading={
        <>
          Walk in prepared.{" "}
          <span className="text-xlight-blue">Walk out with answers.</span>
        </>
      }
      ctaSubtitle="Download xHeal and walk into every appointment with the context your doctors need."
    />
  );
}
