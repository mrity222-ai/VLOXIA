"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "../../components/animations/ScrollReveal";
import {
  ArrowRight,
  Sun,
  Battery,
  Power,
  Zap,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Sparkles,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

// 13 | OUR SOLUTION PHILOSOPHY (THE 5 STEPS)
const processSteps = [
  {
    n: "01",
    keyword: "UNDERSTAND",
    title: "Understand Customer Energy Requirement",
    desc: "We look at the complete operational requirement — charger selection, application, power availability, installation requirements, and future scalability — before recommending any technology.",
  },
  {
    n: "02",
    keyword: "ANALYSE",
    title: "Analyse Site & Electrical Infrastructure",
    desc: "Our engineers evaluate historical load profiles, roof space, transformer capacity, grid stability, and harmonic distortion to establish an accurate technical baseline.",
  },
  {
    n: "03",
    keyword: "RECOMMEND",
    title: "Recommend Right Technology & Configuration",
    desc: "We recommend the appropriate Tier-1 technology, optimum system sizing, single-line engineering diagrams (SLD), and transparent ROI economic models.",
  },
  {
    n: "04",
    keyword: "IMPLEMENT",
    title: "Implement with Certified Execution Standards",
    desc: "Turnkey installation, civil mounting, HT switchgear integration, DISCOM net-metering synchronization, and CEIG statutory safety clearances.",
  },
  {
    n: "05",
    keyword: "SUPPORT",
    title: "Support Through Dedicated Lifecycle Assistance",
    desc: "Long-term dependability through OEM manufacturer warranty management, preventive maintenance checks, telemetry monitoring, and prompt technical support.",
  },
];

// 14 | THE VLOXIA ECOSYSTEM (4 PILLARS)
const ecosystemPillars = [
  {
    icon: Sun,
    stage: "GENERATE",
    title: "Generate: Clean Solar Energy",
    desc: "Rooftop, commercial, and industrial solar power systems designed to turn sunlight into sustainable electricity and reduce grid dependence.",
  },
  {
    icon: Battery,
    stage: "STORE",
    title: "Store: Integrated Lithium Storage",
    desc: "Advanced inverters with integrated lithium battery systems storing energy securely for zero-emission backup and peak management.",
  },
  {
    icon: Power,
    stage: "POWER",
    title: "Power: Intelligent Power Solutions",
    desc: "Multi-technology inverter and power management solutions delivering continuity, efficiency, and reliability for critical operations.",
  },
  {
    icon: Zap,
    stage: "MOVE",
    title: "Move: EV Charging Infrastructure",
    desc: "AC and DC fast charging solutions powering electric mobility across residential societies, commercial workplaces, and highway corridors.",
  },
];

const projects = [
  {
    title: "Commercial IT Park Microgrid (500 kW)",
    location: "Cyber City, Gurugram, NCR",
    category: "Commercial Solar + BESS",
    desc: "Integrated rooftop solar array with lithium peak shaving storage, cutting daytime diesel generator runtime and reducing grid load by 65%.",
    image: "/Industries/Commercial.png",
  },
  {
    title: "Highway Rapid DC Corridor (120 kW Fast Charger)",
    location: "Delhi – Jaipur Expressway (NH-48)",
    category: "TATA EZ POWER Fast Charging Hub",
    desc: "Dual-gun CCS2 DC fast charging station delivering high-turnaround charging for electric fleets and commercial passenger vehicles.",
    image: "/Industries/Mobility.png",
  },
  {
    title: "Industrial Manufacturing Solar Plant (1.2 MW)",
    location: "Bhiwadi Industrial Corridor",
    category: "Industrial Renewable EPC",
    desc: "MW-scale high-yield solar rooftop installation with real-time SCADA monitoring, zero-export protection, and high-voltage transformer stepping.",
    image: "/Industries/Industrial.png",
  },
  {
    title: "Hospitality Zero-Downtime Power Backup",
    location: "Rohini, New Delhi",
    category: "Lithium LiFePO4 Inverter System",
    desc: "Modular lithium battery energy storage system coupled with pure sine wave hybrid inverters to eliminate voltage sags and guarantee clean power.",
    image: "/Industries/Institutional.png",
  },
];

export default function ApproachPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* ── 1. HERO SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>13 | SOLUTION PHILOSOPHY &amp; 14 | ECOSYSTEM</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-slate-950 leading-[1.15]">
                Our approach goes beyond <span className="text-shimmer font-bold">product distribution</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                We aim to understand the customer&apos;s energy requirement, recommend the right technology and create a dependable solution around it across EV Charging, Solar Energy, Lithium Storage, and Power Systems.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="btn-hover-effect glow-hover-blue inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-full transition-all shadow-md shadow-blue-500/25 text-sm active:scale-95"
                >
                  <span>Request Engineering Audit</span>
                  <span className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>

                <Link
                  href="/partners"
                  className="btn-hover-effect inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-gray-300 text-slate-800 font-semibold hover:border-gray-400 hover:bg-slate-50 transition-all text-sm"
                >
                  Channel Partners
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal delay={0.2}>
              <div className="relative w-full h-[360px] sm:h-[420px] rounded-3xl overflow-hidden shadow-sm border border-gray-100 group">
                <Image
                  src="/Industries/Commercial.png"
                  alt="Integrated Clean Energy Microgrid Engineering"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400 font-mono">
                    THE VLOXIA ECOSYSTEM
                  </span>
                  <p className="text-sm font-bold text-slate-100">
                    Generate → Store → Power → Move
                  </p>
                  <p className="text-xs text-slate-300">
                    ENERGY × TECHNOLOGY × MOBILITY × SUSTAINABILITY
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ── 2. 14 | THE VLOXIA ECOSYSTEM (4 CONNECTED PILLARS) ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 border-t border-gray-100">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block mb-2">
                14 | THE VLOXIA ECOSYSTEM
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950">
                Generate → Store → <span className="text-shimmer font-bold">Power → Move</span>
              </h2>
            </div>
            <p className="text-slate-500 text-sm sm:text-base max-w-md leading-relaxed">
              VLOXIA harmonizes solar generation with lithium storage, intelligent inverters, and EV charging into a single connected energy journey.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {ecosystemPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div
                  className="card-hover-effect lift-effect bg-white rounded-2xl border border-gray-200/80 p-8 sm:p-10 hover:border-blue-400 hover:shadow-xl transition-all h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                        {pillar.stage}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight mb-2.5">
                      {pillar.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ── 3. 13 | OUR SOLUTION PHILOSOPHY (THE 5 STEPS ACCORDION) ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 border-t border-gray-100 bg-slate-50/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-4">
            <ScrollReveal>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block mb-2">
                13 | SOLUTION PHILOSOPHY
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 leading-tight">
                Understand → Analyse → <br />
                Recommend → <br />
                <span className="text-shimmer font-bold">Implement → Support</span>
              </h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed mt-4">
                We believe that every energy requirement is unique. Our structured 5-step methodology ensures that the right technology is selected and implemented seamlessly.
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {processSteps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <ScrollReveal key={step.n} delay={idx * 0.08}>
                  <div
                    onClick={() => setActiveStep(idx)}
                    className={`cursor-pointer transition-all duration-200 rounded-2xl p-5 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md border border-blue-600"
                        : "bg-white hover:bg-slate-50 border border-gray-200 text-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          isActive ? "bg-white/20 text-white" : "bg-blue-50 text-blue-700"
                        }`}>
                          {step.keyword}
                        </span>
                        <h4 className={`text-sm sm:text-base font-bold ${
                          isActive ? "text-white" : "text-slate-950"
                        }`}>
                          {step.title}
                        </h4>
                      </div>
                      <div>
                        {isActive ? (
                          <ChevronUp className="w-4 h-4 text-white" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {isActive && (
                      <p className="mt-3 text-xs sm:text-sm text-blue-50 leading-relaxed pt-3 border-t border-white/20">
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

      {/* ── 4. SHOWCASE: LANDMARK PROJECTS ── */}
      <section id="landmark-projects" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 border-t border-gray-100">
        <ScrollReveal>
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block mb-2">
                  PROVEN EXECUTION
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 max-w-2xl">
                  Landmark Deployments <span className="text-shimmer font-bold">Across India</span>
                </h2>
              </div>
              <p className="text-slate-500 text-sm sm:text-base max-w-md leading-relaxed">
                Real-world deployments delivering measurable carbon reduction and electrical cost savings.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.08}>
              <div
                className="card-hover-effect lift-effect bg-slate-50/60 rounded-2xl border border-gray-200/80 p-6 flex flex-col justify-between hover:border-blue-400 hover:bg-white hover:shadow-xl transition-all h-full cursor-pointer"
              >
                <div>
                  <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden mb-5 bg-gray-100 border border-gray-200">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-slate-800 shadow-xs">
                      {proj.location}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider block mb-1">
                    {proj.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight mb-2">
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
                    <span>Request Technical Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-xs text-slate-400 font-medium">Turnkey Tier-1</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── 5. BOTTOM REGISTERED OFFICE & CONTACT BANNER ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 lg:pb-24">
        <ScrollReveal>
          <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                18 | REGISTERED OFFICE &amp; PARTNERSHIPS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                VLOXIA SYSTEMS LLP <br />
                <span className="text-cyan-400">Sector 15, Rohini, Delhi</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Connect with our Business &amp; Channel Partnerships Lead, Manu Bhatia, to discuss distribution opportunities, turnkey solar EPC, or commercial EV charging.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>A3/55, Sector 15, Rohini, Delhi 110089</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>Manu Bhatia: +91 8178810456</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>vloxiasystems@gmail.com</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="btn-hover-effect glow-hover-cyan inline-flex items-center gap-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-8 py-4 rounded-full transition-all text-sm shadow-lg shadow-cyan-500/20 active:scale-95"
                >
                  <span>Connect with Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}