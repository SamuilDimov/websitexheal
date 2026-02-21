import Image from "next/image";
import MedicalStandardsBadge from "@/components/ui/MedicalStandardsBadge";
import ComplianceBadges from "@/components/ui/ComplianceBadges";
import IntegrationLogosStrip from "@/components/ui/IntegrationLogosStrip";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-clip"
      style={{
        backgroundImage:
          "url(/images/dot-matrix.svg), linear-gradient(180deg, var(--dark-blue), #f8f8fa00)",
        backgroundPosition: "50%, 0 0",
        backgroundRepeat: "no-repeat, repeat",
        backgroundSize: "contain, auto",
      }}
    >
      <div
        className="w-full max-w-[100em] mx-auto px-[5em] flex flex-col justify-center items-stretch min-h-screen pt-[20em] pb-[10em] text-xwhite max-[991px]:px-[40px] max-[991px]:pt-[140px] max-[991px]:pb-[60px] max-[991px]:min-h-0 max-[479px]:px-[20px]"
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
              <div className="bg-white/90 backdrop-blur-sm text-xdark-blue rounded-[16px] p-[20px] leading-[1] flex flex-col gap-[10px]">
                <div className="text-[1.5rem] font-medium text-xdark-blue">
                  250+ health parameters
                </div>
                <p className="text-xdark-blue text-[1.125rem] leading-[1.4]">
                  Sleep, stress, recovery, strain, nutrition, activity, mood, genome, vitals, and more
                </p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm text-xdark-blue rounded-[16px] p-[20px] leading-[1] flex flex-col gap-[10px]">
                <div className="text-[1.5rem] font-medium text-xdark-blue">
                  All your sources, one platform
                </div>
                <p className="text-xdark-blue text-[1.125rem] leading-[1.4]">
                  Apple Health, wearables, lab PDFs, medical records, genomics, and daily logs
                </p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm text-xdark-blue rounded-[16px] p-[20px] leading-[1] flex flex-col gap-[10px]">
                <div className="text-[1.5rem] font-medium text-xdark-blue flex items-center gap-[8px]">
                  <svg width="20" height="24" viewBox="0 0 814 1000" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="flex-shrink-0"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.3-81.4-105.3-209-105.3-329.7 0-193.6 125.8-296.3 249.6-296.3 65.8 0 120.6 43.2 161.9 43.2 39.3 0 100.6-45.8 175.5-45.8 28.4 0 130.3 2.6 197.9 97z" /><path d="M554.1 159.4c31.1-36.9 53.1-88.1 53.1-139.4 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.4 32.4-55.1 83.6-55.1 135.5 0 7.8.6 15.6 1.3 18.2 2.6.6 6.4 1.3 10.2 1.3 45.2 0 103.3-30.4 139.5-71.3z" /></svg>
                  Rated 5.0 on the App Store
                </div>
                <div className="flex items-center justify-center gap-[6px]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="28" height="28" viewBox="0 0 24 24" fill="#FF9500" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* App Store Badge + Trust Signals */}
            <div className="flex flex-col gap-[16px]">
              <div className="flex items-center gap-[24px] flex-wrap">
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
                <MedicalStandardsBadge />
                <ComplianceBadges />
              </div>
              <span className="text-[1rem] text-xdark-blue">
                Free to download. Your data stays yours.
              </span>
              <IntegrationLogosStrip />
            </div>

            {/* QR Code - Desktop only */}
            <div className="hidden lg:flex">
              <div className="bg-white/90 backdrop-blur-sm rounded-[16px] p-[20px] leading-[1] w-[200px]">
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
          <div className="flex justify-end self-start max-[767px]:justify-center">
            <Image
              src="/images/dashboard.png"
              alt="Smartphone screen displaying a health app dashboard with xHeal Score of 25, flare ups, streak of 5 days, health awareness report score of 75 out of 100, and navigation icons for Home, Routine, Add, Records, and Chat."
              width={932}
              height={1600}
              className="w-[28em] max-w-[460px] max-[767px]:w-full max-[767px]:max-w-[300px]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
