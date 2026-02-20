import ScrollReveal from "@/components/ui/ScrollReveal";

const steps = [
  {
    number: "1",
    title: "Connect your health",
    description:
      "Import medical records, sync Apple Health and wearables, upload lab PDFs. All your data in one secure place. Takes about 5 minutes.",
  },
  {
    number: "2",
    title: "Meet your Digital Twin",
    description:
      "xHeal's AI analyzes your patterns across clinical data, lifestyle inputs, and daily trends. It learns what's normal for you, and what isn't.",
  },
  {
    number: "3",
    title: "Get clarity and take action",
    description:
      "Ask questions, get daily health actions, receive early warnings, and generate reports for your doctor. Your Digital Twin gets smarter every day.",
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
