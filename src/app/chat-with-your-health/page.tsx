import FeatureLandingPage from "@/components/feature-landing/FeatureLandingPage";

export default function ChatWithYourHealthPage() {
  return (
    <FeatureLandingPage
      heroTitle={
        <>
          Chat with{" "}
          <span className="text-xlight-blue">your own health</span>
        </>
      }
      heroSubtitle="Your Digital Twin knows your vitals, lab results, symptoms, and daily habits. Ask it anything - and get answers you can actually use."
      heroImage={{
        src: "/images/chat-landing.png",
        alt: "xHeal Chat - ask your Digital Twin about your health data and get personalised answers",
        width: 1058,
        height: 2078,
      }}
      painHeading={
        <>
          You have the data. You just can&apos;t get{" "}
          <span className="text-xdark-blue">answers from it.</span>
        </>
      }
      painPoints={[
        {
          icon: "hub",
          title: "Scattered everywhere",
          detail:
            "Your vitals live in Apple Health. Labs in a PDF. Medications in a note. Diet in a third app. When something feels off, you're the one stitching it all together.",
        },
        {
          icon: "help",
          title: "Numbers without meaning",
          detail:
            "A resting heart rate of 72, HRV of 38, ferritin of 15. What do they mean together? Without context, health data is just noise you can't act on.",
        },
        {
          icon: "schedule",
          title: "Weeks between answers",
          detail:
            "You notice a pattern - fatigue after meals, worse sleep on stressful days - but your next appointment is weeks away. The question just sits there.",
        },
      ]}
      howHeading={
        <>
          Ask anything.{" "}
          <span className="text-xdark-blue">Here&apos;s how.</span>
        </>
      }
      howItWorks={[
        {
          step: "01",
          title: "Ask anything",
          description:
            'Type a question in plain language. "Why am I so tired?" "What were my vitals last month?" "Should I change my routine?" No medical jargon needed.',
        },
        {
          step: "02",
          title: "Your Digital Twin reads your full picture",
          description:
            "xHeal instantly scans your medical records, lab results, wearable data, symptom logs, and lifestyle inputs to find the context that matters for your question.",
        },
        {
          step: "03",
          title: "Get a clear, honest answer",
          description:
            "No jargon. No vague suggestions. xHeal responds with plain-language explanations, specific next steps, and direct references to your data so you know exactly what it's based on.",
        },
      ]}
      useCasesHeading={
        <>
          Questions your Digital Twin{" "}
          <span className="text-xdark-blue">can answer right now</span>
        </>
      }
      useCases={[
        {
          question: "What were my vitals last month?",
          tag: "History",
          description:
            "Pull any metric from any point in your health timeline. No scrolling, no searching for old files.",
        },
        {
          question: "What's driving my flare-ups?",
          tag: "Patterns",
          description:
            "xHeal cross-references symptoms, sleep, stress, nutrition, and activity to surface triggers you'd never spot alone.",
        },
        {
          question: "Which labs should I ask for next?",
          tag: "Planning",
          description:
            "Based on your profile and results, xHeal identifies gaps and recommends specific tests to bring to your doctor.",
        },
        {
          question: "What should I focus on this week?",
          tag: "Action",
          description:
            "Get a weekly priority based on your current trends and goals - so you always know what matters most right now.",
        },
        {
          question: "How has my sleep affected my energy?",
          tag: "Connections",
          description:
            "See how changes in one area ripple across others. Sleep to energy, mood to activity, stress to symptoms.",
        },
        {
          question: "Explain my latest blood work",
          tag: "Labs",
          description:
            "Upload a PDF or photo. xHeal reads, stores, and explains each marker in the context of your full health picture.",
        },
      ]}
      comparison={{
        heading: "Health apps give you data.",
        headingAccent: "xHeal gives you answers.",
        intro: "Most health tools stop at tracking. They show you numbers but never explain what they mean together. Your Digital Twin doesn't just store your data. It reads it, connects it, and talks to you about it.",
        columns: ["WHOOP", "Bevel Health", "Olivia Health", "xHeal"],
        rows: [
          { feature: "Tracks health data", values: ["Fitness + sleep", "Lifestyle + recovery", "Medical records", "250+ parameters across all sources"] },
          { feature: "Explains what data means", values: ["no", "Basic AI chat", "Basic AI chat", "yes"] },
          { feature: "Knows your full health history", values: ["no", "no", "Medical records only", "yes"] },
          { feature: "You can ask it questions", values: ["no", "yes", "yes", "yes"] },
          { feature: "Cross-references clinical + lifestyle data", values: ["no", "no", "no", "yes"] },
          { feature: "Follows medical guidelines (WHO, ADA, EASD)", values: ["no", "no", "no", "yes"] },
          { feature: "Predictive health insights", values: ["no", "no", "no", "yes"] },
          { feature: "Works without proprietary hardware", values: ["no", "Apple Watch only", "yes", "yes"] },
          { feature: "Generates reports for your doctor", values: ["no", "no", "no", "4 report types"] },
        ],
        closingLine: "WHOOP shows you numbers. Bevel and Olivia give you basic answers. xHeal connects 250+ parameters to tell you what your health actually means.",
        highlightColumn: 3,
      }}
      testimonialsHeading={
        <>
          They asked. Their Digital Twin{" "}
          <span className="text-xlight-blue">answered.</span>
        </>
      }
      testimonials={[
        {
          quote:
            "I asked my Digital Twin why I felt tired after 8 hours of sleep. It connected my HRV data to my late dinner timing. Mind blown.",
          name: "Chloe L.",
          age: 27,
          image: "/images/testimonials/t-126.png",
        },
        {
          quote:
            "My Digital Twin knows me better than any single doctor because it has all my data in one place. That's not an exaggeration.",
          name: "Fiona C.",
          age: 35,
          image: "/images/testimonials/t-128.png",
        },
        {
          quote:
            "The AI chat doesn't just answer, it explains the reasoning. WHO guidelines, my personal data, everything cited. It's like having a medical advisor.",
          name: "Irene J.",
          age: 46,
          image: "/images/testimonials/t-130.png",
        },
      ]}
      trustHeading={
        <>
          How we protect{" "}
          <span className="text-xdark-blue">your conversations</span>
        </>
      }
      trustItems={[
        {
          title: "Zero-retention conversations",
          detail:
            "Our AI partner does not store your messages and never uses them for training. Your conversation exists only while you're in it.",
        },
        {
          title: "Medical-standard reasoning",
          detail:
            "Every answer references WHO, ADA, and EASD clinical guidelines, the same frameworks your doctor uses.",
        },
        {
          title: "You control your history",
          detail:
            "Delete any conversation or your entire chat history from the app. No questions asked, no hidden copies.",
        },
        {
          title: "Minimal data in, maximum context out",
          detail:
            "We send only de-identified signals needed to answer your question. Your name, identity, and full records never leave your device.",
        },
      ]}
      faqHeading="About xHeal Chat"
      faqs={[
        {
          q: "Is this a replacement for my doctor?",
          a: "No. xHeal Chat is a health companion, not a medical provider. It helps you understand your data, spot patterns, and prepare better questions for your doctor. It does not diagnose, treat, or prescribe.",
        },
        {
          q: "What data does it have access to?",
          a: "Everything in your xHeal profile: vitals from Apple Health, uploaded lab results, medical records, logged symptoms, medications, supplements, routines, and life events. The more you share, the more complete the picture.",
        },
        {
          q: "Are my conversations private?",
          a: "Yes. Our LLM partner follows a zero-retention, zero-training policy. They do not store your personal data or use it to train models. You can delete your chat history at any time.",
        },
        {
          q: "What medical standards does xHeal use?",
          a: "xHeal interprets health data through guidelines from the World Health Organization (WHO), American Diabetes Association (ADA), European Association for the Study of Diabetes (EASD), and others.",
        },
        {
          q: "Can I share insights with my doctor?",
          a: "Yes. xHeal generates specialist-ready reports - Why Finder, My Snapshot, Clinical Report, and Health Gaps - designed specifically for sharing with your care team.",
        },
      ]}
      pageSlug="chat-with-your-health"
      ctaHeading={
        <>
          Your health has answers.{" "}
          <span className="text-xlight-blue">Start asking.</span>
        </>
      }
      ctaSubtitle="Download xHeal and meet your Digital Twin. The more you share, the smarter it gets."
    />
  );
}
