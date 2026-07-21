import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getTestimonials, type Testimonial } from "@/data/testimonials";

const CURATED_TESTIMONIAL_INDEXES = [
  0, 12, 22, 32, 42, 52, 62, 72, 82, 92, 102, 112, 122, 132, 142, 158,
];

function RatingStars() {
  return (
    <svg
      viewBox="0 0 122 17"
      className="h-[17px] w-[122px] text-[#F6A724]"
      aria-hidden="true"
    >
      {[0, 26, 52, 78, 104].map((x) => (
        <use key={x} href="#testimonial-star" x={x} />
      ))}
    </svg>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex-none w-[22rem] p-[10px] max-[991px]:w-[18rem] max-[767px]:w-[16rem]">
      <div className="surface-card grid grid-cols-1 place-items-start gap-4 p-7 h-full">
        <div className="flex flex-col gap-4">
          <RatingStars />

          {/* Quote */}
          <p className="t-body1 text-xprimary">{testimonial.quote}</p>

          {/* Author */}
          <div className="flex items-center gap-4">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              width={48}
              height={48}
              className="w-[44px] h-[44px] rounded-full object-cover aspect-square ring-1 ring-xborder"
              loading="lazy"
            />
            <span className="t-h6 text-xprimary">{testimonial.name}</span>
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
        className="absolute left-[-0.5rem] top-0 w-[80px] h-full z-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--bg-primary) 0%, rgba(0,14,27,0) 100%)",
        }}
      />

      {/* Marquee track */}
      <div
        className={`testimonial-marquee-track flex ${animationClass} hover:[animation-play-state:paused]`}
      >
        <div className="flex shrink-0">
          {items.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
        <div className="flex shrink-0" aria-hidden="true">
          {items.map((testimonial) => (
            <TestimonialCard
              key={`duplicate-${testimonial.name}`}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>

      {/* Right fade */}
      <div
        className="absolute right-[-0.5rem] top-0 w-[80px] h-full z-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(270deg, var(--bg-primary) 0%, rgba(0,14,27,0) 100%)",
        }}
      />
    </div>
  );
}

export default async function TestimonialsSection() {
  const [t, locale] = await Promise.all([
    getTranslations("Testimonials"),
    getLocale(),
  ]);
  const allTestimonials = getTestimonials(locale);
  const items = CURATED_TESTIMONIAL_INDEXES.map(
    (index) => allTestimonials[index]
  ).filter((testimonial): testimonial is Testimonial => Boolean(testimonial));

  // Split testimonials into two rows
  const mid = Math.ceil(items.length / 2);
  const topRow = items.slice(0, mid);
  const bottomRow = items.slice(mid);

  return (
    <section className="bg-xbg">
      <svg className="hidden" aria-hidden="true">
        <defs>
          <path
            id="testimonial-star"
            d="M8.16379 0.551109C8.47316 -0.183704 9.52684 -0.183703 9.83621 0.551111L11.6621 4.88811C11.7926 5.19789 12.0875 5.40955 12.426 5.43636L17.1654 5.81173C17.9684 5.87533 18.294 6.86532 17.6822 7.38306L14.0713 10.4388C13.8134 10.6571 13.7007 10.9996 13.7795 11.3259L14.8827 15.8949C15.0696 16.669 14.2172 17.2809 13.5297 16.8661L9.47208 14.4176C9.18225 14.2427 8.81775 14.2427 8.52793 14.4176L4.47029 16.8661C3.7828 17.2809 2.93036 16.669 3.11727 15.8949L4.22048 11.3259C4.29928 10.9996 4.18664 10.6571 3.92873 10.4388L0.317756 7.38306C-0.294046 6.86532 0.0315611 5.87533 0.834562 5.81173L5.57402 5.43636C5.91255 5.40955 6.20744 5.19789 6.33786 4.88811L8.16379 0.551109Z"
            fill="currentColor"
          />
        </defs>
      </svg>
      <div className="w-full max-w-[1440px] mx-auto px-10 py-24 flex flex-col items-center gap-16 max-[991px]:px-8 max-[991px]:py-16 max-[479px]:px-5">
        <ScrollReveal>
          <h2 className="t-display2 text-xprimary text-center">
            {t("heading")}{" "}
            <span className="text-xbrand">{t("headingAccent")}</span>
          </h2>
        </ScrollReveal>

        {/* Two-row marquee */}
        <div className="w-full flex flex-col gap-3">
          <MarqueeRow items={topRow} />
          <MarqueeRow items={bottomRow} reverse />
        </div>
      </div>
    </section>
  );
}
