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
} from "lucide-react";

const processSteps = [
  {
    n: "01",
    title: "Discovery & Site Energy Audit",
    desc: "We begin by conducting comprehensive on-site energy audits, analyzing consumption curves, assessing available roof/ground real estate, grid stability, and budget parameters.",
  },
  {
    n: "02",
    title: "Engineering Simulation & ROI Analysis",
    desc: "Our technical team models solar yield simulation, battery degradation cycles, EV charger utilization profiles, and ROI payback models before final hardware selection.",
  },
  {
    n: "03",
    title: "Custom Recommendation & Single-Line Diagrams",
    desc: "We deliver full single-line diagrams, engineering bill of materials (BOM), certified tier-1 OEM specifications, and transparent commercial proposals.",
  },
  {
    n: "04",
    title: "Turnkey Implementation & Grid Sync",
    desc: "Certified electrical engineers manage complete civil foundation, cabling, switchgear installation, safety certifications, and net-metering grid synchronisation.",
  },
  {
    n: "05",
    title: "Lifecycle Support & Cloud NOC Monitoring",
    desc: "Continuous proactive monitoring through cloud dashboards, scheduled preventive maintenance checks, rapid spare replenishment, and OEM warranty claims management.",
  },
];

const ecosystemPillars = [
  {
    icon: Sun,
    title: "Generate: Rooftop & Ground Solar",
    desc: "High-efficiency Tier-1 monocrystalline PV arrays engineered for maximum kilowatt-hour yield, minimal transmission loss, and net-metering synchronization.",
  },
  {
    icon: Battery,
    title: "Store: Modular Lithium BESS",
    desc: "Containerized and modular LiFePO4 battery energy storage systems that eliminate diesel generator dependence and deliver tariff peak shaving.",
  },
  {
    icon: Power,
    title: "Power: Hybrid Inverters & UPS",
    desc: "Seamless microsecond power failover and active harmonic filtering ensuring sensitive commercial and industrial equipment runs without interruption.",
  },
  {
    icon: Zap,
    title: "Move: High-Power EV Charging Hubs",
    desc: "Intelligent AC wallboxes and ultra-fast dual-gun DC chargers with dynamic cloud load management and automated UPI billing integration.",
  },
];

const projects = [
  {
    title: "Commercial IT Park Microgrid (500 kW)",
    location: "Cyber City, Gurugram, Haryana",
    category: "Commercial Solar + BESS",
    desc: "Integrated 500 kW rooftop solar array with 200 kWh lithium peak shaving storage, cutting daytime diesel generator runtime and reducing grid load by 65%.",
    image: "/Industries/Commercial.png",
  },
  {
    title: "Highway Rapid DC Corridor (150 kW Dual Gun)",
    location: "Delhi – Jaipur Expressway (NH-48)",
    category: "High-Power EV Charging Hub",
    desc: "Dual-gun CCS2 high-power fast charging stations with dynamic grid load balancing, automated UPI billing, and 24/7 turnaround infrastructure for electric fleets.",
    image: "/Industries/Mobility.png",
  },
  {
    title: "Industrial Manufacturing Solar Plant (1.2 MW)",
    location: "Bhiwadi Industrial Corridor, Rajasthan",
    category: "Industrial Renewable EPC",
    desc: "MW-scale high-yield solar rooftop installation with real-time SCADA monitoring, zero-export protection, and high-voltage transformer stepping.",
    image: "/Industries/Industrial.png",
  },
  {
    title: "Hospitality Zero-Downtime Power Backup (50 kWh)",
    location: "South Delhi Hotel Complex",
    category: "Lithium LiFePO4 Storage",
    desc: "Modular lithium battery energy storage system coupled with solar hybrid inverters to eliminate voltage sags and guarantee clean power for sensitive electronics.",
    image: "/Industries/Institutional.png",
  },
];

export default function ApproachPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* ── 1. HERO SECTION (EDITORIAL REFERENCE STYLE) ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Subtitle & Action Buttons */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Framework &amp; Methodology</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-slate-950 leading-[1.15]">
                We engineer effective <span className="text-shimmer font-bold">clean energy solutions</span> to power your future
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                We are a Delhi-based clean energy solutions provider, helping homes, businesses,
                and fleets transition to sustainable power through reliable engineering and OEM technology.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="btn-hover-effect glow-hover-blue inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-full transition-all shadow-md shadow-blue-500/25 text-sm active:scale-95"
                >
                  <span>Schedule Consultation</span>
                  <span className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>

                <Link
                  href="#landmark-projects"
                  className="btn-hover-effect inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-gray-300 text-slate-800 font-semibold hover:border-gray-400 hover:bg-slate-50 transition-all text-sm"
                >
                  Landmark Deployments
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Hero Visual Graphic / Image */}
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
                    Synchronized Architecture
                  </span>
                  <p className="text-sm font-medium mt-1 text-slate-100">
                    Solar Generation · Lithium BESS · Fleet Fast Charging
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ── 2. "WHY SHOULD YOU PARTNER?" / ECOSYSTEM PILLARS (2x2 GRID WITH BLUE BADGES) ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 border-t border-gray-100">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950">
                Generate → Store → <span className="text-shimmer font-bold">Power → Move</span>
              </h2>
            </div>
            <p className="text-slate-500 text-sm sm:text-base max-w-md leading-relaxed">
              VLOXIA harmonizes rooftop solar generation with lithium storage, hybrid inverters, and EV fast charging stations into one intelligent energy ecosystem.
            </p>
          </div>
        </ScrollReveal>

        {/* 2x2 Grid with blue badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {ecosystemPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div
                  className="card-hover-effect lift-effect bg-white rounded-2xl border border-gray-200/80 p-8 sm:p-10 hover:border-blue-400 hover:shadow-xl transition-all h-full"
                >
                  <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center mb-6 shrink-0 shadow-sm shadow-blue-500/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ── 3. SHOWCASE: LANDMARK PROJECTS (2-COLUMN CARDS) ── */}
      <section id="landmark-projects" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 border-t border-gray-100">
        <ScrollReveal>
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70 mb-4">
              <span>Case Studies</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 max-w-2xl">
                Our Landmark Deployments <span className="text-shimmer font-bold">Across India</span>
              </h2>
              <p className="text-slate-500 text-sm sm:text-base max-w-md leading-relaxed">
                Real-world deployments delivering measurable carbon reduction and electrical cost savings.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* 2-Column Cards Grid */}
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
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-slate-800 shadow-xs">
                      {proj.category}
                    </div>
                  </div>

                  <div className="text-xs text-blue-600 font-bold mb-1 font-mono">
                    {proj.location}
                  </div>
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
                    <span>View Project Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-xs text-slate-400 font-medium">Turnkey EPC</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── 4. OUR PROCESS: 5-STEP NUMBERED ACCORDION (01 TO 05) ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-5 space-y-4">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 leading-tight">
                Our 5-Step Engineering &amp; <span className="text-shimmer font-bold">Delivery Process</span>
              </h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed mt-3">
                From site feasibility audits to live grid synchronisation and continuous cloud telemetry, our workflow guarantees safety, compliance, and sustained efficiency.
              </p>

              <div className="pt-4">
                <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>SLA Guarantee</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Every installation is backed by standard SLA response times, spare parts inventory, and CEIG approvals.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Numbered Step Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {processSteps.map((step, idx) => {
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

      {/* ── 5. BOTTOM DARK CTA BANNER ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 lg:pb-24">
        <ScrollReveal>
          <div className="rounded-3xl bg-[#111827] text-white p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Take the next step
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Ready to Optimize Your <span className="text-blue-400">Site&apos;s Energy Infrastructure?</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Book a free preliminary site assessment with our senior electrical engineers. We model your consumption curves and provide transparent financial payback calculations.
              </p>
              <div className="pt-3">
                <Link
                  href="/contact"
                  className="btn-hover-effect glow-hover-blue inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-full transition-all text-sm shadow-lg shadow-blue-500/25 active:scale-95"
                >
                  <span>Schedule a Site Audit</span>
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
