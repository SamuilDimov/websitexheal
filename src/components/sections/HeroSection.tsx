import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      className="relative"
      style={{
        backgroundImage:
          "url(/images/dot-matrix.svg), linear-gradient(180deg, var(--dark-blue), #f8f8fa00)",
        backgroundPosition: "50%, 0 0",
        backgroundRepeat: "no-repeat, repeat",
        backgroundSize: "contain, auto",
      }}
    >
      <div
        className="w-full max-w-[100em] mx-auto px-[5em] flex flex-col justify-center items-stretch min-h-screen max-h-[1080px] pt-[20em] pb-[10em] text-xwhite max-[991px]:px-[40px] max-[991px]:pt-[140px] max-[991px]:pb-[60px] max-[991px]:min-h-0 max-[991px]:max-h-none max-[479px]:px-[20px]"
        style={{
          backgroundImage: "url(/images/hero-bg.svg)",
          backgroundPosition: "0%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto",
        }}
      >
        <div className="grid grid-cols-[1.65fr_1fr] gap-[80px] rounded-[12px] max-[991px]:gap-[40px] max-[767px]:grid-cols-1">
          {/* Left Column */}
          <div className="grid grid-cols-1 gap-[40px]">
            {/* Heading */}
            <h1 className="text-[7em] font-medium leading-[1] tracking-[-0.05em] max-[991px]:text-[3.75rem]">
              Your health data is everywhere.{" "}
              <span className="text-xblack">Your answers are here.</span>
            </h1>

            {/* Subtitle */}
            <div className="text-[1.5rem] font-medium leading-[1.35] tracking-[-0.01em] max-w-[48ch]">
              xHeal builds a Digital Twin of your health, connecting your
              medical records, lab results, wearables, and daily habits into
              one AI that actually knows you. Ask it anything. Get answers
              you can act on.
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-[40px] max-[991px]:grid-cols-1 max-[991px]:gap-[20px]">
              <div className="border border-xlight-blue-low bg-xwhite text-xdark-blue rounded-[16px] p-[20px] leading-[1] flex flex-col gap-[10px] shadow-[0_4px_4px_#1419330d]">
                <div className="text-[1.5rem] font-medium text-xdark-blue">
                  250+ health parameters
                </div>
                <p className="text-xdark-blue text-[1.125rem] leading-[1.4]">
                  Sleep, stress, recovery, strain, nutrition, activity, mood, genome, vitals, and more
                </p>
              </div>
              <div className="border border-xlight-blue-low bg-xwhite text-xdark-blue rounded-[16px] p-[20px] leading-[1] flex flex-col gap-[10px] shadow-[0_4px_4px_#1419330d]">
                <div className="text-[1.5rem] font-medium text-xdark-blue">
                  All your sources, one platform
                </div>
                <p className="text-xdark-blue text-[1.125rem] leading-[1.4]">
                  Apple Health, wearables, lab PDFs, medical records, genomics, and daily logs
                </p>
              </div>
              <div className="border border-xlight-blue-low bg-xwhite text-xdark-blue rounded-[16px] p-[20px] leading-[1] flex flex-col gap-[10px] shadow-[0_4px_4px_#1419330d]">
                <div className="text-[1.5rem] font-medium text-xdark-blue">
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </div>
                <p className="text-xdark-blue text-[1.125rem]">
                  Rated 5.0 on the App Store
                </p>
              </div>
            </div>

            {/* App Store Badge */}
            <div className="flex flex-col gap-[12px]">
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
                  priority
                />
              </a>
              <span className="text-[1rem] opacity-70">
                Free to download. Your data stays yours.
              </span>
            </div>

            {/* QR Code - Desktop only */}
            <div className="hidden lg:flex">
              <div className="border border-xlight-blue-low bg-xwhite text-xdark-blue rounded-[16px] p-[20px] leading-[1] shadow-[0_4px_4px_#1419330d] w-[200px]">
                <Image
                  src="/images/qr-code.avif"
                  alt="Download App QR Code"
                  width={160}
                  height={160}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Phone */}
          <div className="relative h-full max-[767px]:flex max-[767px]:justify-center">
            <Image
              src="/images/dashboard.png"
              alt="Smartphone screen displaying a health app dashboard with xHeal Score of 25, flare ups, streak of 5 days, health awareness report score of 75 out of 100, and navigation icons for Home, Routine, Add, Records, and Chat."
              width={932}
              height={1600}
              className="w-[28em] max-w-[460px] object-cover object-top max-[767px]:w-full max-[767px]:max-w-[300px]"
              priority
            />
            <div
              className="absolute inset-0 hidden"
              style={{
                backgroundImage:
                  "linear-gradient(#4764ff00 69%, #7a8eff)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
