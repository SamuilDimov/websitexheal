"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getTestimonials, type Testimonial } from "@/data/testimonials";

const StarIcon = () => (
  <svg
    width="100%"
    viewBox="0 0 18 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.16379 0.551109C8.47316 -0.183704 9.52684 -0.183703 9.83621 0.551111L11.6621 4.88811C11.7926 5.19789 12.0875 5.40955 12.426 5.43636L17.1654 5.81173C17.9684 5.87533 18.294 6.86532 17.6822 7.38306L14.0713 10.4388C13.8134 10.6571 13.7007 10.9996 13.7795 11.3259L14.8827 15.8949C15.0696 16.669 14.2172 17.2809 13.5297 16.8661L9.47208 14.4176C9.18225 14.2427 8.81775 14.2427 8.52793 14.4176L4.47029 16.8661C3.7828 17.2809 2.93036 16.669 3.11727 15.8949L4.22048 11.3259C4.29928 10.9996 4.18664 10.6571 3.92873 10.4388L0.317756 7.38306C-0.294046 6.86532 0.0315611 5.87533 0.834562 5.81173L5.57402 5.43636C5.91255 5.40955 6.20744 5.19789 6.33786 4.88811L8.16379 0.551109Z"
      fill="currentColor"
    />
  </svg>
);

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex-none w-[22rem] p-[10px] max-[991px]:w-[18rem] max-[767px]:w-[16rem]">
      <div className="border border-xlight-blue-low bg-xwhite rounded-[16px] grid grid-cols-1 place-items-start gap-[1rem] p-[2rem] shadow-[0_4px_4px_#1419330d] h-full">
        <div className="flex flex-col gap-[1rem]">
          {/* Stars */}
          <div className="flex gap-[0.75rem] max-[767px]:gap-[0.5rem]">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="text-xdark-blue w-[1.25rem] flex items-center justify-center"
              >
                <StarIcon />
              </div>
            ))}
          </div>

          {/* Quote */}
          <p className="text-xblack-70 font-medium text-[1.125rem] max-[767px]:text-[1rem]">
            {testimonial.quote}
          </p>

          {/* Author */}
          <div className="flex items-center gap-[1rem]">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              width={48}
              height={48}
              className="w-[3rem] h-[3rem] rounded-full object-cover aspect-square"
              loading="lazy"
            />
            <div className="flex flex-col gap-[0.25rem]">
              <span className="text-xblack-70 text-[1.125rem] font-medium max-[767px]:text-[1rem]">
                {testimonial.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: Testimonial[];
  reverse?: boolean;
}) {
  const animationClass = reverse
    ? "animate-marquee-reverse"
    : "animate-marquee";

  return (
    <div className="w-full relative overflow-clip -mx-[0.5rem] min-h-[1rem]">
      {/* Left fade */}
      <div
        className="absolute left-[-0.5rem] top-0 w-[30px] h-full z-10 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(91deg, var(--white), #fff0)",
        }}
      />

      {/* Marquee track */}
      <div
        className={`flex ${animationClass} hover:[animation-play-state:paused]`}
      >
        {/* Original set */}
        {items.map((t, i) => (
          <TestimonialCard key={`a-${i}`} testimonial={t} />
        ))}
        {/* Duplicate set for seamless loop */}
        {items.map((t, i) => (
          <TestimonialCard key={`b-${i}`} testimonial={t} />
        ))}
      </div>

      {/* Right fade */}
      <div
        className="absolute right-[-0.5rem] top-0 w-[30px] h-full z-10 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(270deg, var(--white), #fff0)",
        }}
      />
    </div>
  );
}

export default function TestimonialsSection() {
  const t = useTranslations("Testimonials");
  const locale = useLocale();
  const items = getTestimonials(locale);

  // Split testimonials into two rows
  const mid = Math.ceil(items.length / 2);
  const topRow = items.slice(0, mid);
  const bottomRow = items.slice(mid);

  return (
    <section>
      <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[80px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
        <ScrollReveal>
          <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-center max-[991px]:text-[3rem]">
            {t("heading")}{" "}
            <span className="text-xdark-blue">{t("headingAccent")}</span>
          </h2>
        </ScrollReveal>

        {/* Two-row marquee */}
        <div className="w-full flex flex-col gap-[20px] mb-[-80px] max-[767px]:mb-[-40px]">
          <MarqueeRow items={topRow} />
          <MarqueeRow items={bottomRow} reverse />
        </div>
      </div>
    </section>
  );
}
