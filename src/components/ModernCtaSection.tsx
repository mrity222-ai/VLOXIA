"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
  buttonText = "Consult the Experts",
  buttonHref = "/contact",
}: ModernCtaSectionProps) {
  return (
    <section className="py-14 sm:py-20 bg-white select-none">
      <div className="container-xl max-w-5xl mx-auto px-5 sm:px-8">
        <div className="bg-[#f8fafc] border border-gray-200/80 rounded-[32px] sm:rounded-[40px] p-10 sm:p-16 text-center shadow-xs">
          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#0a1628] uppercase leading-tight">
            {title}{" "}
            <span className="text-[#0066ff]">{highlightText}</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-3 text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* Voltix Electric Blue Pill Button */}
          <div className="mt-8 flex justify-center">
            <Link
              href={buttonHref}
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold text-sm rounded-full shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-200 group"
            >
              <span>{buttonText}</span>
              <span className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
