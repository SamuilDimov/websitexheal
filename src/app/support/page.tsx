"use client";

import type { Metadata } from "next";
import { useState } from "react";

const faqs = [
  {
    question: "What is the xHeal Chat?",
    answer:
      "xHeal Chat is your AI-powered health companion. It can answer your questions, explain your scores and reports, help you track symptoms, and guide you with personalized recommendations, making your health journey easier and more interactive.",
  },
  {
    question: "What is Records?",
    answer:
      "Records is your secure digital space where all your personal health documents are stored. It centralizes medical records, test results, and other health-related information, making it easy for you to access and manage your data in one place.",
  },
  {
    question: "What is Routine?",
    answer:
      "Routines are daily or weekly actions like tracking your steps, logging meals, or practicing relaxation exercises that support your health goals. They help build lasting habits, boost your xHeal Score, and keep you on track toward better wellbeing.",
  },
  {
    question: "What is the xHeal Report?",
    answer:
      "The xHeal Report is a personalized health summary that pulls together your scores, vitals, and flare-up history. It transforms raw data into simple, actionable insights that you can share with healthcare professionals or use for self-improvement.",
  },
  {
    question: "What are Vitals?",
    answer:
      "Vitals are your key health measurements, such as heart rate, blood pressure, oxygen levels, weight, and more. Monitoring them regularly provides insights into your baseline health and makes it easier to notice changes or irregularities.",
  },
  {
    question: "What is Flare-Up Tracking?",
    answer:
      "Flare-Up Tracking allows you to log symptoms like headaches, fatigue, digestive issues, or other recurring conditions. Over time, the app identifies patterns and possible triggers, helping you and your care team better understand and manage your flare-ups.",
  },
  {
    question: "What does Indicator Tracking do?",
    answer:
      "Indicator Tracking helps you stay ahead of potential health issues. By analyzing your vitals, lifestyle inputs, and medical data, it highlights early warning signs and possible risks. This allows you to take proactive measures before problems become serious.",
  },
  {
    question: "What is the Health Awareness Score?",
    answer:
      "The Health Awareness Score reflects how engaged you are with your health journey. It increases as you track routines, complete reports, and stay consistent with your health check-ins. It's designed to motivate you to take small but meaningful steps every day.",
  },
  {
    question: "What is the xHeal Score?",
    answer:
      "The xHeal Score is your overall wellness index. It combines data from your vitals, medical records, routines, and flare-up tracking to give you a single, easy-to-understand view of your current health state. The higher the score, the more balanced your wellbeing.",
  },
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-b-xlight-blue-low">
      <button
        className="w-full text-left py-[20px] flex justify-between items-center gap-[20px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-[1.5rem] font-medium leading-[1] tracking-[-0.01em] text-xblack">
          {question}
        </h3>
        <span className="text-xdark-blue text-[1.5rem] font-medium flex-shrink-0 transition-transform duration-200" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] pb-[20px]" : "max-h-0"
        }`}
      >
        <p className="text-xblack-70 text-[1.125rem]">{answer}</p>
      </div>
    </div>
  );
}

export default function SupportPage() {
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
        <div className="w-full max-w-[100em] mx-auto px-[5em] pt-[200px] pb-[5em] flex flex-col items-center gap-[40px] text-xwhite max-[991px]:px-[40px] max-[991px]:pt-[140px] max-[479px]:px-[20px]">
          <h1 className="text-[4.5rem] font-medium leading-[1] tracking-[-0.04em] text-center max-[991px]:text-[3.5rem] max-[479px]:text-[3rem]">
            Support
          </h1>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[40px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <div className="w-full max-w-[800px]">
            <h2 className="text-[2rem] font-medium leading-[1] tracking-[-0.02em] mb-[20px]">
              FAQ
            </h2>
            <p className="text-xblack-70 text-[1.125rem] mb-[40px]">
              If you have any additional questions, please don&apos;t hesitate to
              email us at{" "}
              <a
                href="mailto:support@xheal.ai"
                className="text-xlight-blue hover:underline"
              >
                support@xheal.ai
              </a>
            </p>

            <div className="flex flex-col">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
