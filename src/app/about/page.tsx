import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | xHeal",
  description: "The story behind xHeal - from personal crisis to 360° healthcare platform.",
};

const timelineEvents = [
  {
    date: "January 19, 2026",
    title: "xHeal v2 launches in EU and USA.",
    description:
      "Enhanced AI-native interface. Available for users across Europe and the United States. 160 features in the backlog waiting to be enabled. We go real!",
  },
  {
    date: "January 1, 2026",
    title: "New Year's resolution. Prove it works.",
    description:
      "Trifon and the team launched 12-week personal validation programs with xHeal - putting themselves on the line to prove that a digital healthcare twin can be successful and genuinely helpful.",
  },
  {
    date: "December 1, 2025",
    title: "First 1,000 users. Time for v2.",
    description:
      "xHeal hit its first 1,000 users outside of alpha and beta testing. The feedback was in - and it was invaluable. The team had everything they needed to craft a top-notch UX and build v2 of the AI-native interface.",
  },
  {
    date: "October 15, 2025",
    title: "AWS Partnership.",
    description:
      "xHeal became an AWS Partner and joined their startup credits program.",
  },
  {
    date: "September 29, 2025",
    title: "xHeal v1 released in the USA.",
    description: "The first version goes live for American users.",
  },
  {
    date: "August 22, 2025",
    title: "The moment it got real.",
    description:
      "The first predictive suggestion - not based on historical data. During beta testing, xHeal suggested Trifon check his HOMA-IR levels. The result: elevated - early-stage insulin resistance. The technology had caught something he didn't know he had. This wasn't just an idea anymore. It worked.",
  },
  {
    date: "July 31, 2025",
    title: "Alpha testing. 95% accuracy.",
    description:
      "The team launched predictive models and AI-generated diagnostics against ~5,000 real patients who volunteered to check their diagnosis against xHeal's algorithms. The result: 95% accuracy. Unfortunately, their diagnoses were confirmed. The technology could see what doctors already knew. But could it see what they didn't?",
  },
  {
    date: "June 6, 2025",
    title: "xHeal Corp. founded in Miami.",
    description:
      "The company was officially incorporated in Florida, USA. Headquarters: Miami baby.",
  },
  {
    date: "May 15, 2025",
    title: "Going global. Enter Nikolay Miami.",
    description:
      "The team knew this technology belonged in the American market. But they needed local presence - and someone who could define the marketing strategy and sales narrative. That's when they contacted Nikolay Nedyalkov. He joined as Co-Founder and CSO - their top-notch salesman in Miami. He was in.",
  },
  {
    date: "April 3, 2025",
    title: "Enter Nikolay. The missing piece.",
    description:
      "Nikolay joined as Co-Founder and Head of AI. His deep ML expertise was exactly what xHeal needed. His family - with extensive medical backgrounds - became trusted advisors. The founding team was now complete.",
  },
  {
    date: "February 6, 2025",
    title: "The first commit.",
    description:
      "The first line of code was written. Kris made the initial commit to the xHeal v2 repository. The team wasn't chasing the AI hype - they were convinced they could build something real: a healthcare companion that learns from you, like a digital twin. They took the challenge head-on, aiming for a 100% AI-powered backend.",
  },
  {
    date: "December 30, 2024",
    title: "The team comes together.",
    description:
      "Trifon shared his vision with Kris and Kalin. Both had gone through their own health struggles and instantly resonated with the idea. The founding team was born. A promise was made: No one should have to go through this alone.",
  },
  {
    date: "March 15, 2023",
    title: "Four years of searching. The answer.",
    description:
      "After four years of reading mountains of medical literature and trying unorthodox methods, Trifon finally discovered the underlying issue: dysbiosis - his gut bacteria were completely out of balance. A disrupted gut microbiome was fueling the chronic inflammation. Once he understood the pattern, he found his way back to health.",
  },
  {
    date: "September 19, 2019",
    title: "It started with a personal crisis.",
    description:
      "In 2019, at just 27 years old, Trifon faced recurring prostatitis inflammation that turned his life upside down. Nine rounds of antibiotics, one after the other, left his immune system shattered. He felt miserable - exhausted, lost, and desperate for answers. He visited countless doctors and specialists, both in Bulgaria and abroad. No one could pinpoint the root cause. So he took matters into his own hands.",
  },
];

const team = [
  {
    name: "Trifon Getsov",
    role: "CEO",
    bio: "3x CEO, entrepreneur, solutions architect, and engineer with successful ventures in biotechnology and product development. Passionate about motivating people, building exceptional teams, and solving ridiculously complex problems.",
    image: "/images/trifon.png",
  },
  {
    name: "Kristiyan Nikolov",
    role: "CTO",
    bio: "Exceptional systems engineer, cloud architect, and DevOps specialist with deep expertise in distributed systems and large-scale platform automation serving millions of users.",
    image: "/images/kristiyan.png",
  },
  {
    name: "Kalin Stoev",
    role: "Head of Engineering",
    bio: "Specializes in React Native, full-stack engineering, and mobile-first architecture. Deep expertise in real-time sync, health data integrations, and scalable cross-platform solutions.",
    image: "/images/kalin.png",
  },
  {
    name: "Nikolay Kolibarov",
    role: "Head of AI",
    bio: "Specializes in AI architectures, ML pipelines, computer vision, and DevOps. Brings hands-on experience building scalable, cloud-native AI solutions and real-time analytics platforms.",
    image: "/images/nikolay-k.png",
  },
];

const advisors = [
  {
    name: "Rayna Mihaylova, MD",
    role: "Medical Advisor",
    bio: "Dr. Rayna Mihaylova is a pediatrician who graduated from Medical University Varna. She currently cares for over 3,000 patients in Bulgaria, treating children from infancy through adolescence. Her background includes international experience in Greece and ongoing training through conferences and specialized pediatric programs.",
    image: "/images/rayna.jpg",
  },
  {
    name: "Nikolay M. Kolibarov, MD",
    role: "Medical Advisor",
    bio: "Dr. Nikolay M. Kolibarov is an obstetrician-gynecologist specializing in obstetrics, gynecology, and reproductive medicine. He graduated from Medical University of Varna and has expanded his expertise through international conferences, specialized training, and clinical work in South Africa. He currently serves as Managing Director of Municipal Hospital Karnobat in Bulgaria.",
    image: "/images/nikolay-m.png",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative"
        style={{
          backgroundImage:
            "linear-gradient(180deg, var(--dark-blue), #f8f8fa00)",
        }}
      >
        <div className="w-full max-w-[100em] mx-auto px-[5em] pt-[200px] pb-[5em] flex flex-col items-center gap-[80px] text-xwhite max-[991px]:px-[40px] max-[991px]:pt-[140px] max-[479px]:px-[20px]">
          <h1 className="text-[4.5rem] font-medium leading-[1] tracking-[-0.04em] text-center max-[991px]:text-[3.5rem] max-[479px]:text-[3rem]">
            About xHeal
          </h1>
        </div>
      </section>

      {/* Timeline */}
      <section>
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[80px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <div className="timeline relative w-full">
            {/* Vertical divider line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[0.125rem] -ml-[0.0625rem] bg-xlight-blue-low max-[767px]:hidden" />

            {timelineEvents.map((event, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={index}
                  className="timeline-item grid grid-cols-[1fr_1fr] gap-[60px] py-[20px] relative max-[767px]:grid-cols-1 max-[767px]:gap-[20px]"
                >
                  {isLeft ? (
                    <>
                      {/* Left card */}
                      <div className="border border-xlight-blue-low bg-xwhite rounded-[16px] p-[20px] shadow-[0_4px_4px_#1419330d] text-right flex flex-col gap-[10px] leading-[1] relative max-[767px]:text-left">
                        <p className="text-xdark-blue text-[1rem]">{event.date}</p>
                        <h3 className="text-[1.5rem] font-medium leading-[1] tracking-[-0.01em] max-w-[42ch] ml-auto max-[767px]:ml-0">
                          {event.title}
                        </h3>
                        <p className="text-xblack-70 text-[1.125rem] max-[767px]:text-[1rem]">
                          {event.description}
                        </p>
                        {/* Dot */}
                        <div className="absolute top-1/2 -mt-[4px] -right-[35px] w-[8px] h-[8px] bg-xdark-blue rounded-full max-[767px]:hidden" />
                      </div>
                      {/* Empty right column */}
                      <div className="max-[767px]:hidden" />
                    </>
                  ) : (
                    <>
                      {/* Empty left column */}
                      <div className="max-[767px]:hidden" />
                      {/* Right card */}
                      <div className="border border-xlight-blue-low bg-xwhite rounded-[16px] p-[20px] shadow-[0_4px_4px_#1419330d] text-left flex flex-col gap-[10px] leading-[1] relative">
                        <p className="text-xdark-blue text-[1rem]">{event.date}</p>
                        <h3 className="text-[1.5rem] font-medium leading-[1] tracking-[-0.01em] max-w-[42ch]">
                          {event.title}
                        </h3>
                        <p className="text-xblack-70 text-[1.125rem] max-[767px]:text-[1rem]">
                          {event.description}
                        </p>
                        {/* Dot */}
                        <div className="absolute top-1/2 -mt-[4px] -left-[35px] w-[8px] h-[8px] bg-xdark-blue rounded-full max-[767px]:hidden" />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section>
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[80px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-center max-[991px]:text-[3rem]">
            Built by technical and healthcare experts
          </h2>

          <div className="grid grid-cols-2 gap-[40px] max-[767px]:grid-cols-1">
            {team.map((member) => (
              <div
                key={member.name}
                className="grid grid-cols-[auto_1fr] gap-[40px] max-[767px]:grid-cols-1"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={280}
                  className="w-[10em] h-[14em] object-cover rounded-[16px] max-[767px]:w-[20em] max-[767px]:h-[26em]"
                />
                <div className="flex flex-col gap-[10px]">
                  <h3 className="text-[2rem] font-medium leading-[1] tracking-[-0.02em]">
                    {member.name}
                  </h3>
                  <p className="text-xdark-blue font-medium text-[1.125rem]">
                    {member.role}
                  </p>
                  <p className="text-xblack-70 text-[1.125rem] max-[767px]:text-[1rem]">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section>
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[80px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <h2 className="text-[4rem] font-medium leading-[1] tracking-[-0.04em] text-center max-[991px]:text-[3rem]">
            xHeal Advisors
          </h2>

          <div className="grid grid-cols-2 gap-[40px] max-[767px]:grid-cols-1">
            {advisors.map((advisor) => (
              <div
                key={advisor.name}
                className="grid grid-cols-[auto_1fr] gap-[40px] max-[767px]:grid-cols-1"
              >
                <Image
                  src={advisor.image}
                  alt={advisor.name}
                  width={200}
                  height={280}
                  className="w-[10em] h-[14em] object-cover rounded-[16px] max-[767px]:w-[20em] max-[767px]:h-[26em]"
                />
                <div className="flex flex-col gap-[10px]">
                  <h3 className="text-[2rem] font-medium leading-[1] tracking-[-0.02em]">
                    {advisor.name}
                  </h3>
                  <p className="text-xdark-blue font-medium text-[1.125rem]">
                    {advisor.role}
                  </p>
                  <p className="text-xblack-70 text-[1.125rem] max-[767px]:text-[1rem]">
                    {advisor.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
