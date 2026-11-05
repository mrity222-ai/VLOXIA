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
    <section>
      <div>
        
        {/* ── HEADER BLOCK (Matches Reference Exactly) ── */}
        <div>
          <div>
            <h2>
              How it works
            </h2>
          </div>
          {/* Navigation Arrows (Top Right) */}
          <div>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous step"

            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next step"

            >
              <ArrowRight />
            </button>
          </div>
        </div>
        {/* ── STEP CARDS CAROUSEL (Matches Reference Layout) ── */}
        <div
          ref={scrollContainerRef}

        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === activeStep;
            return (
              <div
                key={step.number}
                onClick={() => scrollToStep(idx)}

              >
                {/* Title & Desc */}
                <div>
                  <h3>
                    {step.title}
                  </h3>
                  <p>
                    {step.description}
                  </p>
                </div>
                {/* Bottom Minimalist Icon Badge */}
                <div>
                  <div>
                    <Icon />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* ── BOTTOM TIMELINE PROGRESS (Matches Reference Stepper Pills) ── */}
        <div>
          {/* Subtle horizontal line */}
          <div />
          {/* Stepper Number Pills */}
          <div>
            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => scrollToStep(idx)}

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
