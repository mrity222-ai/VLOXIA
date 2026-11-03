"use client";

import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, FileText, BarChart3, Sliders, Settings, ShieldCheck } from "lucide-react";

interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: any;
}

const steps: StepItem[] = [
  {
    number: "01",
    title: "Submit a Request",
    description: "Fill out a short form with your property type, load requirements, and clean energy goals.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Site & Energy Audit",
    description: "Our technical team evaluates roof real estate, power curves, solar yields, and grid stability.",
    icon: BarChart3,
  },
  {
    number: "03",
    title: "Custom System Design",
    description: "We prepare certified single-line diagrams, engineering BOMs, and an exact ROI payback model.",
    icon: Sliders,
  },
  {
    number: "04",
    title: "Turnkey Installation",
    description: "Certified engineers manage civil works, switchgear cabling, safety compliance, and commissioning.",
    icon: Settings,
  },
  {
    number: "05",
    title: "Lifecycle Support & NOC",
    description: "24/7 cloud telemetry, scheduled preventive maintenance visits, and OEM warranty handling.",
    icon: ShieldCheck,
  },
];

export default function HowItWorksProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToStep = (index: number) => {
    setActiveStep(index);
    if (scrollContainerRef.current) {
      const cardWidth = 360;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    const nextIdx = activeStep > 0 ? activeStep - 1 : steps.length - 1;
    scrollToStep(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = activeStep < steps.length - 1 ? activeStep + 1 : 0;
    scrollToStep(nextIdx);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#f8f9fa] border-t border-b border-gray-100 overflow-hidden select-none">
      <div className="container-xl max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* ── HEADER BLOCK (Matches Reference Exactly) ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0a1628] tracking-tight leading-none">
              How it works
            </h2>
            <span className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-400 mt-1 block">
              (Step-by-step)
            </span>
          </div>

          {/* Navigation Arrows (Top Right) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous step"
              className="w-12 h-12 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-[#0a1628] transition-all shadow-xs hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next step"
              className="w-12 h-12 rounded-full bg-[#0a1628] hover:bg-[#14233c] flex items-center justify-center text-white transition-all shadow-sm hover:scale-105 active:scale-95"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── STEP CARDS CAROUSEL (Matches Reference Layout) ── */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-6 overflow-x-auto pb-8 pt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === activeStep;
            return (
              <div
                key={step.number}
                onClick={() => scrollToStep(idx)}
                className={`flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] min-h-[270px] rounded-3xl p-7 sm:p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-white border-2 border-[#0a1628] shadow-xl scale-[1.02]"
                    : "bg-white/80 hover:bg-white border border-gray-200/80 shadow-xs hover:shadow-md"
                }`}
              >
                {/* Title & Desc */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0a1628] tracking-tight leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mt-3">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Minimalist Icon Badge */}
                <div className="pt-6">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isActive ? "bg-[#0a1628] text-white" : "bg-gray-100 text-gray-600"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── BOTTOM TIMELINE PROGRESS (Matches Reference Stepper Pills) ── */}
        <div className="relative mt-8 sm:mt-12 flex items-center">
          {/* Subtle horizontal line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 z-0" />

          {/* Stepper Number Pills */}
          <div className="relative z-10 flex items-center gap-2 sm:gap-3 flex-wrap">
            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => scrollToStep(idx)}
                  className={`transition-all duration-200 flex items-center justify-center ${
                    isActive
                      ? "bg-[#0a1628] text-white px-6 py-2 rounded-full font-bold text-xs shadow-md scale-105"
                      : "bg-white border border-gray-200 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-full font-bold text-xs hover:bg-gray-50"
                  }`}
                >
                  {step.number}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
