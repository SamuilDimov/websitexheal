import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function AISection() {
  return (
    <section>
      <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col gap-[80px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
        <ScrollReveal>
          <div className="grid grid-cols-[1.65fr_1fr] gap-[80px] rounded-[12px] max-[991px]:gap-[40px] max-[767px]:grid-cols-1">
            {/* Left Column - Text */}
            <div className="grid grid-cols-1 gap-[40px]">
              <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] max-w-[18ch] max-[991px]:text-[3rem]">
                AI-enhanced experience{" "}
                <span className="text-xdark-blue">
                  based on real medical input
                </span>
              </h2>
              <p className="text-xblack-70 text-[1.125rem] max-w-[51ch] max-[767px]:text-[1rem]">
                The xHeal platform applies its own reasoning AI flow to unify
                and analyze your health data, interpreting it through trusted
                medical standards from leading global organizations such as WHO,
                ADA, and EASD - enabling deeper pattern detection and more
                relevant insights tailored to your wellbeing. It&apos;s like
                having the collective thinking of multiple medical specialists
                examining you at once - but simplified, connected, and delivered
                to you in real time.
              </p>
            </div>

            {/* Right Column - 360 SVG */}
            <Image
              src="/images/xheal-360.svg"
              alt="xHeal 360"
              width={600}
              height={600}
              className="w-full"
            />
          </div>
        </ScrollReveal>

        {/* App Store Badge */}
        <div className="flex justify-center">
          <a
            href="https://apps.apple.com/us/app/xheal/id6748074977"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/app-store-badge.svg"
              alt="Download on the App Store"
              width={200}
              height={67}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
