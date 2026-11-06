"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PartnerMarquee from "../../components/PartnerMarquee";
import ScrollReveal from "../../components/animations/ScrollReveal";
import RotatingHeadline from "../../components/animations/RotatingHeadline";
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Compass,
  CheckCircle2,
  Phone,
  MapPin,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const STATS = [
  { value: "48+", label: "Turnkey Projects" },
  { value: "400+", label: "Trusted Partners" },
  { value: "99.8%", label: "Client Retention Rate" },
  { value: "150+", label: "EV Chargers Installed" },
];

const CORE_VALUES = [
  {
    icon: Sparkles,
    title: "Commercial Innovation",
    desc: "We engineer forward-thinking energy infrastructure using Tier-1 hardware, IoT cloud telemetry, and intelligent load-balancing algorithms.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Tier-1 Quality",
    desc: "Rigorous compliance with CEIG safety standards, IEC/IEEE norms, and BIS certifications ensures safe, resilient operation 24/7/365.",
  },
  {
    icon: Award,
    title: "Integrity & Transparency",
    desc: "Transparent commercial pricing, accurate ROI modeling, and zero hidden costs form the bedrock of our client relationships.",
  },
  {
    icon: Compass,
    title: "Environmental Stewardship",
    desc: "Every solar panel deployed and EV charger energized actively offsets carbon emissions, driving India toward net-zero targets.",
  },
];

const PROJECTS_GALLERY = [
  {
    title: "Commercial Corporate EV Hub",
    location: "Gurugram, NCR",
    image: "/Industries/Commercial.png",
    desc: "High-throughput EV charging infrastructure integrated with corporate campus energy management.",
  },
  {
    title: "MW-Scale Industrial Solar EPC",
    location: "Bhiwadi, Rajasthan",
    image: "/Industries/Industrial.png",
    desc: "Multi-megawatt rooftop installation delivering substantial operational energy savings.",
  },
  {
    title: "Fleet Depot Fast Charging Station",
    location: "Delhi Logistics Hub",
    image: "/Industries/Mobility.png",
    desc: "Turnkey DC fast charging bays engineered for commercial transport and transit fleets.",
  },
  {
    title: "Smart Residential Housing Microgrid",
    location: "Noida Sector 150",
    image: "/Industries/Residential.png",
    desc: "Synchronized solar and energy storage providing reliable, silent backup for premium housing.",
  },
  {
    title: "Healthcare Critical Power & BESS",
    location: "Rohini, New Delhi",
    image: "/Industries/Institutional.png",
    desc: "Sub-second battery energy storage ensuring uninterrupted clean power for medical equipment.",
  },
  {
    title: "Ultra-Fast Highway DC Charging Bay",
    location: "Delhi-Jaipur Expressway",
    image: "/Modern EV Charging.png",
    desc: "Dual-gun CCS2 high-power corridor charging hub with automated dynamic load balancing.",
  },
];

const MISSION_PILLARS = [
  {
    n: "01",
    title: "Sustainable by Design",
    desc: "Every solar array and EV charging bay is architected for maximum energy yield, minimum transmission loss, and decades of environmental carbon offset.",
  },
  {
    n: "02",
    title: "Client-Centric Engineering",
    desc: "From preliminary site audits to customized financing models (CAPEX/OPEX), our engineers build turnkey solutions around your operational constraints.",
  },
  {
    n: "03",
    title: "Future-Ready Infrastructure",
    desc: "Scalable modular battery energy storage (BESS) and OCPP 1.6J/2.0.1 smart charging hubs ready for India's accelerating EV transition.",
  },
];

export default function AboutPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* ── 1. HERO SECTION (EDITORIAL REFERENCE STYLE) ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Subtitle & Action Pills */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>About VLOXIA Systems LLP</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-slate-950 leading-[1.15]">
                Journey towards <span className="text-shimmer font-bold">excellence in clean energy</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                VLOXIA is an engineering pioneer delivering high-grade clean energy infrastructure,
                rooftop solar systems, lithium storage, and smart EV charging installations with superior safety.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/solutions/ev-charging"
                  className="btn-hover-effect glow-hover-blue inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-full transition-all shadow-md shadow-blue-500/25 text-sm active:scale-95"
                >
                  <span>Explore Solutions</span>
                  <span className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="btn-hover-effect inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-gray-300 text-slate-800 font-semibold hover:border-gray-400 hover:bg-slate-50 transition-all text-sm"
                >
                  Contact Us
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Hero Visual Image */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.2}>
              <div className="relative w-full h-[360px] sm:h-[420px] rounded-3xl overflow-hidden shadow-sm border border-gray-100 group">
                <Image
                  src="/ev.jpg"
                  alt="VLOXIA modern commercial engineering campus"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
                    EST. 2024 · Turnkey EPC
                  </span>
                  <p className="text-sm font-medium mt-1 text-slate-100">
                    Commercial &amp; Enterprise Clean Power Infrastructure
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* 4-Metric Statistics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-16 border-t border-gray-100 mt-16">
          {STATS.map((stat, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.08}>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── 2. TIER-1 PARTNER ALLIANCES & OEM LOGO MARQUEE (POSITION 2) ── */}
      <PartnerMarquee
        eyebrow={
          <>
            <span className="text-slate-900">Trusted Tier-1 Technology Partners &amp;</span>{" "}
            <span className="text-blue-600 font-bold">Supply Chain</span>
          </>
        }
      />

      {/* ── 3. "WHY SHOULD YOU PARTNER?" / CORE VALUES (2x2 GRID WITH BLUE BADGES) ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 border-t border-gray-100">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950">
                Why Should You <span className="text-shimmer font-bold">Partner?</span>
              </h2>
            </div>
            <p className="text-slate-500 text-sm sm:text-base max-w-md leading-relaxed">
              Gain a deeper understanding of our engineering standards, safety certifications, and client-first delivery model.
            </p>
          </div>
        </ScrollReveal>

        {/* 2x2 Grid matching reference image cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CORE_VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div
                  className="card-hover-effect lift-effect bg-white rounded-2xl border border-gray-200/80 p-8 sm:p-10 hover:border-blue-400 hover:shadow-xl transition-all h-full"
                >
                  <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center mb-6 shrink-0 shadow-sm shadow-blue-500/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight mb-2.5">
                    {val.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ── 4. SHOWCASE: LANDMARK PROJECTS (2-COLUMN CARDS MATCHING REFERENCE) ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 border-t border-gray-100">
        <ScrollReveal>
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70 mb-4">
              <span>Our Portfolio</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 max-w-2xl">
                Landmark Deployments <span className="text-shimmer font-bold">Engineered by VLOXIA</span>
              </h2>
              <p className="text-slate-500 text-sm sm:text-base max-w-md leading-relaxed">
                Explore our proven turnkey executions across commercial complexes, industrial plants, and EV transit hubs.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* 2-Column Wide Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS_GALLERY.map((proj, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.08}>
              <div
                className="card-hover-effect lift-effect bg-slate-50/60 rounded-2xl border border-gray-200/80 p-6 flex flex-col justify-between hover:border-blue-400 hover:bg-white hover:shadow-xl transition-all group h-full cursor-pointer"
              >
                <div>
                  <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden mb-5 bg-gray-100 border border-gray-200">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-slate-800 shadow-xs">
                      {proj.location}
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {proj.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-200/60 flex items-center justify-between">
                  <Link
                    href="/contact"
                    className="text-xs font-bold text-blue-600 flex items-center gap-2 hover:text-blue-700 transition-colors"
                  >
                    <span>Request Project Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-xs text-slate-400 font-medium">Turnkey Tier-1</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── 5. HOW WE OPERATE: NUMBERED ACCORDIONS (01, 02, 03) ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Heading & Subtitle */}
          <div className="lg:col-span-5 space-y-4">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 leading-tight">
                We Build to Last — <span className="text-shimmer font-bold">For People, Communities, and Planet</span>
              </h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed mt-3">
                Every solar array and EV charging bay is architected for maximum energy yield, minimum transmission loss, and decades of environmental offset.
              </p>

              <div className="pt-4">
                <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Compliance &amp; Quality</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Fully aligned with MNRE, CEIG, and DISCOM grid-interconnection standards across all Indian states.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Numbered Step Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {MISSION_PILLARS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <ScrollReveal key={step.n} delay={idx * 0.08}>
                  <div
                    onClick={() => setActiveStep(idx)}
                    className={`cursor-pointer transition-all duration-200 rounded-2xl p-6 sm:p-7 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md border border-blue-600"
                        : "bg-white hover:bg-slate-50 border border-gray-200 text-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
                          isActive ? "bg-white/20 text-white" : "bg-black/5 text-slate-800"
                        }`}>
                          {step.n}
                        </span>
                        <h4 className={`text-base sm:text-lg font-bold ${
                          isActive ? "text-white" : "text-slate-950"
                        }`}>
                          {step.title}
                        </h4>
                      </div>
                      <div>
                        {isActive ? (
                          <ChevronUp className="w-5 h-5 text-white" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {isActive && (
                      <p className="mt-4 text-sm text-blue-50 leading-relaxed pl-11 pt-3 border-t border-white/20">
                        {step.desc}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 6. CORPORATE CREDENTIALS & REGISTRATION CARD ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12 border-t border-gray-100">
        <ScrollReveal>
          <div className="rounded-3xl border border-gray-200 bg-slate-50/70 p-8 sm:p-12 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-gray-200">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Corporate Identification &amp; Compliance
                </p>
                <h3 className="text-2xl font-bold text-slate-950 tracking-tight mt-1">
                  VLOXIA Systems LLP
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Certified Clean Energy Entity</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <MapPin className="w-4 h-4 text-slate-600" />
                  <span>Registered Office</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  A3/55, Sector 15, Rohini, Delhi – 110089
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 text-slate-600" />
                  <span>Business Verticals</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  EV Charging · Solar Energy · Energy Storage · Power Solutions
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4 text-slate-600" />
                  <span>Technology Partner</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  TATA EZ POWER &amp; Certified Tier-1 OEMs
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <Phone className="w-4 h-4 text-slate-600" />
                  <span>Direct Inquiries</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  +91 81788 104 56 <br />
                  <span className="text-slate-500">vloxiasystems@gmail.com</span>
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── 7. BOTTOM DARK CTA BANNER ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 lg:pb-24">
        <ScrollReveal>
          <div className="rounded-3xl bg-[#111827] text-white p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Take the next step
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Ready to Build <span className="text-blue-400">Something Great?</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Partner with our senior clean energy architects for a custom site audit, turnkey EV charging,
                or high-yield solar EPC proposal tailored specifically for your facility.
              </p>
              <div className="pt-3">
                <Link
                  href="/contact"
                  className="btn-hover-effect glow-hover-blue inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-full transition-all text-sm shadow-lg shadow-blue-500/25 active:scale-95"
                >
                  <span>Request a Consultation</span>
                  <span className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
