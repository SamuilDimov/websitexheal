import ScrollReveal from "@/components/ui/ScrollReveal";

const steps = [
  {
    number: "1",
    title: "Connect your world",
    description:
      "Import medical PDFs, snap a photo of your results, sync Apple Health, or connect MyChart for your medical records. Add wearables, lab results, and more - with new integrations coming soon. All your data, securely in one place.",
  },
  {
    number: "2",
    title: "Let our AI Analyze",
    description:
      "Our AI studies your unique patterns - combining clinical data, lifestyle inputs, and daily trends to uncover clear, science-backed insights. The more you share, the smarter your Digital Twin becomes at understanding your health.",
  },
  {
    number: "3",
    title: "Request your specialist-ready reports",
    description:
      "Four reports to share with your care team: Why Finder uncovers root causes behind your symptoms, My Snapshot gives a quick wellness overview, Clinical Report provides detailed data for doctors, and Health Gaps reveals what's missing from your care.",
  },
  {
    number: "4",
    title: "Get your personal plan",
    description:
      "xHeal builds a care routine tailored to you - blending AI precision with your unique goals to make your wellness journey truly yours.",
  },
  {
    number: "5",
    title: "Take action & improve",
    description:
      "Turn insights into simple daily tasks. Build better habits, track your progress, and stay in control - because health is something you live, not just measure.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      style={{
        backgroundImage: "url(/images/wave.svg)",
        backgroundPosition: "50% 65%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto 24em",
      }}
    >
      <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[80px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
        <ScrollReveal>
          <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-center max-[991px]:text-[3rem]">
            How <span className="text-xdark-blue">xHeal works</span>
          </h2>
        </ScrollReveal>

        {/* Steps */}
        <div className="flex flex-wrap justify-center gap-[20px] max-w-[1280px]">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 100}>
              <div className="border border-xlight-blue-low bg-xwhite text-xdark-blue rounded-[16px] flex flex-col gap-[20px] p-[20px] pt-[40px] shadow-[0_4px_4px_#1419330d] max-w-[24rem] h-full">
                <h3 className="text-[2rem] font-medium leading-[1] tracking-[-0.02em]">
                  {step.number}. {step.title}
                </h3>
                <p className="text-xblack-70 text-[1.125rem] max-[767px]:text-[1rem]">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
