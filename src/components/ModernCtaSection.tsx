"use client";

import Link from "next/link";

interface ModernCtaSectionProps {
  title?: string;
  highlightText?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function ModernCtaSection({
  title = "PREDICTABLE POWER FOR A",
  highlightText = "SUSTAINABLE FUTURE",
  subtitle = "Join homeowners and businesses who have already transitioned to affordable, reliable clean energy solutions.",
  buttonText = "CONSULT THE EXPERTS",
  buttonHref = "/contact",
}: ModernCtaSectionProps) {
  return (
    <section className="py-14 sm:py-20 bg-white select-none">
      <div className="container-xl max-w-5xl mx-auto px-5 sm:px-8">
        <div className="bg-[#f8fafc] border border-gray-200/80 rounded-[32px] sm:rounded-[40px] p-10 sm:p-16 text-center shadow-xs">
          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#0a1628] uppercase leading-tight">
            {title}{" "}
            <span className="text-[#00c853]">{highlightText}</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-3 text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* Glowing Pill CTA Button (Matches Reference Image) */}
          <div className="mt-8 flex justify-center">
            <Link
              href={buttonHref}
              className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-[0_12px_28px_-6px_rgba(37,99,235,0.5),0_4px_12px_rgba(37,99,235,0.28)] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-6px_rgba(37,99,235,0.65),0_6px_16px_rgba(37,99,235,0.35)] active:translate-y-0 transition-all duration-200"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
