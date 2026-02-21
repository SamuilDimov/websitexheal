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
              <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] max-w-[20ch] max-[991px]:text-[3rem]">
                AI that reasons like a care team{" "}
                <span className="text-xdark-blue">
                  but knows your full story
                </span>
              </h2>
              <div className="flex flex-col gap-[20px] max-w-[51ch]">
                <p className="text-xblack-70 text-[1.125rem] max-[767px]:text-[1rem]">
                  Most health apps track a single metric. xHeal connects all of
                  them.
                </p>
                <p className="text-xblack-70 text-[1.125rem] max-[767px]:text-[1rem]">
                  Our AI interprets your data through clinical guidelines from
                  the WHO, ADA, and EASD, the same standards your care team uses.
                  But unlike any single specialist, your Digital Twin sees
                  everything at once: your labs, your sleep, your symptoms, your
                  habits, your history.
                </p>
                <p className="text-xblack-70 text-[1.125rem] max-[767px]:text-[1rem]">
                  The result? Patterns spotted earlier. Connections made faster.
                  Answers grounded in your data, not generic advice.
                </p>
              </div>
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
