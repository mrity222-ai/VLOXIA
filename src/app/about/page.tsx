"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PartnerMarquee from "../../components/PartnerMarquee";
import ScrollReveal from "../../components/animations/ScrollReveal";
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
  Target,
  Eye,
  Rocket,
  Layers,
  HeartHandshake,
  Cpu,
} from "lucide-react";

// 03 | OUR MISSION (5 PILLARS)
const MISSION_PILLARS = [
  {
    n: "01",
    keyword: "ACCESSIBLE",
    title: "Accessible Through Strong Distribution",
    desc: "Making advanced clean energy accessible across India through an expansive distribution, channel partner, and installer network.",
  },
  {
    n: "02",
    keyword: "RELIABLE",
    title: "Reliable Through Quality Partnerships",
    desc: "Partnering with established OEM technology leaders like TATA EZ POWER to bring proven, certified products to market.",
  },
  {
    n: "03",
    keyword: "INTELLIGENT",
    title: "Intelligent Through Integrated Systems",
    desc: "Designing cohesive solutions combining solar generation, lithium storage, and smart inverters rather than treating each in isolation.",
  },
  {
    n: "04",
    keyword: "SCALABLE",
    title: "Scalable for Every Application",
    desc: "Engineered to scale effortlessly across residential homes, commercial complexes, fleets, and institutional campuses.",
  },
  {
    n: "05",
    keyword: "SUSTAINABLE",
    title: "Sustainable for India's Future",
    desc: "Accelerating the widespread adoption of clean energy, reducing carbon emissions and dependence on conventional power.",
  },
];

// 12 | OUR BUSINESS MODEL
const BUSINESS_MODEL = [
  {
    title: "Distribution",
    desc: "Operating as an authorized distributor for leading technology brands including TATA EZ POWER AC/DC EV chargers and integrated lithium inverters.",
    icon: Layers,
  },
  {
    title: "Channel Partners",
    desc: "Building a dependable network of dealers, distributors, installers, EPC contractors, and solution partners across key regions in India.",
    icon: HeartHandshake,
  },
  {
    title: "System Integration",
    desc: "Combining complementary products — solar, lithium batteries, hybrid inverters, and EV chargers — to create complete turnkey solutions.",
    icon: Cpu,
  },
  {
    title: "Project Solutions",
    desc: "Supporting commercial, industrial, mobility, and institutional clients with customized energy and power infrastructure projects.",
    icon: Award,
  },
  {
    title: "After-Sales Support",
    desc: "Ensuring long-term reliability and peace of mind through OEM warranty handling, technical support, and preventive maintenance.",
    icon: ShieldCheck,
  },
];

// 15 | OUR ROADMAP (4 PHASES)
const ROADMAP_PHASES = [
  {
    phase: "PHASE 01",
    title: "Build the Foundation",
    focus: "Establish core distribution, launch TATA EZ POWER EV charging & integrated lithium inverters, expand channel partner network.",
    status: "Active Execution",
    active: true,
  },
  {
    phase: "PHASE 02",
    title: "Expand the Portfolio",
    focus: "Introduce advanced commercial rooftop solar solutions, integrated solar + storage packages, and digital energy management tools.",
    status: "In Progress",
    active: false,
  },
  {
    phase: "PHASE 03",
    title: "Build the Ecosystem",
    focus: "Deliver large commercial & institutional turnkey projects, fleet charging depots, and integrated renewable power infrastructure.",
    status: "Upcoming",
    active: false,
  },
  {
    phase: "PHASE 04",
    title: "Sustainable Energy Platform",
    focus: "Become a unified platform connecting Solar + Storage + Power + EV + AI energy telemetry across residential, commercial & mobility sectors.",
    status: "Vision Target",
    active: false,
  },
];

export default function AboutPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* ── 1. HERO SECTION (EDITORIAL MASTHEAD) ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>01 | WHO WE ARE · VLOXIA SYSTEMS LLP</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-slate-950 leading-[1.15]">
                Intelligent Energy. <br />
                Reliable Power. <br />
                <span className="text-shimmer font-bold">Sustainable Solutions.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                VLOXIA Systems LLP is a technology-driven sustainable energy and power solutions company focused on enabling businesses, institutions and consumers to transition towards cleaner, smarter and more efficient energy ecosystems.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/solutions/ev-charging"
                  className="btn-hover-effect glow-hover-blue inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-full transition-all shadow-md shadow-blue-500/25 text-sm active:scale-95"
                >
                  <span>Explore 4 Business Verticals</span>
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
              <div className="relative w-full h-[380px] sm:h-[440px] rounded-3xl overflow-hidden shadow-sm border border-gray-100 group">
                <Image
                  src="/ev.jpg"
                  alt="VLOXIA Systems LLP Clean Energy Infrastructure"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400 font-mono">
                    TATA EZ POWER DISTRIBUTOR
                  </span>
                  <p className="text-sm font-bold text-slate-100">
                    EV Charging &amp; Integrated Lithium Inverter Systems
                  </p>
                  <p className="text-xs text-slate-300">
                    Registered Office: Rohini, Delhi 110089
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* 4 Brand Equation Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-16 border-t border-gray-100 mt-16 text-center sm:text-left">
          <div className="space-y-1 border-l-2 border-blue-600 pl-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              ENERGY
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Solar &amp; Distributed Generation
            </div>
          </div>
          <div className="space-y-1 border-l-2 border-cyan-500 pl-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              TECHNOLOGY
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Integrated Lithium &amp; Smart Inverters
            </div>
          </div>
          <div className="space-y-1 border-l-2 border-indigo-500 pl-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              MOBILITY
            </div>
            <div className="text-xs text-slate-500 font-medium">
              AC &amp; DC Fast Charging Infrastructure
            </div>
          </div>
          <div className="space-y-1 border-l-2 border-emerald-500 pl-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              SUSTAINABILITY
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Accelerating India&apos;s Clean Transition
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PARTNERS MARQUEE ── */}
      <PartnerMarquee
        eyebrow={
          <>
            <span className="text-slate-900">Anchor OEM Alliances &amp;</span>{" "}
            <span className="text-blue-600 font-bold">Technology Partnerships</span>
          </>
        }
      />

      {/* ── 3. 02 | VISION & 03 | MISSION (DUAL HERO SECTION) ── */}
      <section id="vision-mission" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* 02 | VISION */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal>
              <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 text-white space-y-4 relative overflow-hidden shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                  02 | OUR VISION
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
                  To become a trusted technology platform for India&apos;s transition towards sustainable energy and intelligent power.
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We envision a future where mobility is electric, energy is increasingly renewable, storage is intelligent and power is available whenever and wherever it is needed. VLOXIA Systems LLP aspires to be a key enabler of this transition.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* 03 | MISSION */}
          <div className="lg:col-span-7 space-y-4">
            <ScrollReveal>
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
                  03 | OUR MISSION
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950 mb-6">
                Making Advanced Energy Technologies <span className="text-blue-600">Accessible &amp; Dependable</span>
              </h2>
            </ScrollReveal>

            {/* 5 Mission Accordions */}
            <div className="space-y-3">
              {MISSION_PILLARS.map((pillar, idx) => {
                const isActive = activeStep === idx;
                return (
                  <ScrollReveal key={pillar.n} delay={idx * 0.06}>
                    <div
                      onClick={() => setActiveStep(idx)}
                      className={`cursor-pointer transition-all duration-200 rounded-2xl p-5 ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md border border-blue-600"
                          : "bg-slate-50/70 hover:bg-white border border-gray-200 text-slate-800 hover:shadow-xs"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            isActive ? "bg-white/20 text-white" : "bg-blue-50 text-blue-700"
                          }`}>
                            {pillar.keyword}
                          </span>
                          <h4 className={`text-sm sm:text-base font-bold ${
                            isActive ? "text-white" : "text-slate-900"
                          }`}>
                            {pillar.title}
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
                          {pillar.desc}
                        </p>
                      )}
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. 12 | OUR BUSINESS MODEL (5 WINGS) ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 border-t border-gray-100 bg-slate-50/50">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase font-mono block mb-2">
            12 | OUR BUSINESS MODEL
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-3">
            Five Wings of <span className="text-blue-600">Value Creation</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            From national OEM distribution to regional channel partner enablement, turnkey integration, and dependable lifecycle support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {BUSINESS_MODEL.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={idx * 0.08}>
                <div className="rounded-2xl bg-white border border-gray-200/80 p-6 flex flex-col justify-between hover:border-blue-400 hover:shadow-lg transition-all h-full">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-gray-100 text-[10px] font-mono text-blue-600 font-bold uppercase">
                    WING 0{idx + 1}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ── 5. 15 | OUR ROADMAP (4 PHASES) ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 border-t border-gray-100 bg-white">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase font-mono block mb-2">
            15 | OUR ROADMAP
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 mb-3">
            Strategic Growth <span className="text-blue-600">Trajectory</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            A disciplined, milestone-driven roadmap guiding VLOXIA toward becoming India&apos;s leading sustainable energy platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROADMAP_PHASES.map((phase, idx) => (
            <ScrollReveal key={phase.phase} delay={idx * 0.1}>
              <div
                className={`rounded-2xl p-6 border transition-all h-full flex flex-col justify-between ${
                  phase.active
                    ? "bg-blue-600 text-white border-blue-600 shadow-xl"
                    : "bg-slate-50/70 text-slate-900 border-gray-200/80 hover:bg-white hover:border-blue-300"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      phase.active ? "bg-white/20 text-white" : "bg-blue-50 text-blue-700"
                    }`}>
                      {phase.phase}
                    </span>
                    <span className={`text-[10px] font-semibold ${
                      phase.active ? "text-cyan-300" : "text-slate-400"
                    }`}>
                      {phase.status}
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold ${phase.active ? "text-white" : "text-slate-900"}`}>
                    {phase.title}
                  </h3>

                  <p className={`text-xs leading-relaxed ${phase.active ? "text-blue-50" : "text-slate-500"}`}>
                    {phase.focus}
                  </p>
                </div>

                <div className={`pt-4 mt-6 border-t text-[11px] font-medium flex items-center gap-1.5 ${
                  phase.active ? "border-white/20 text-cyan-300" : "border-gray-200 text-slate-400"
                }`}>
                  <Rocket className="w-3.5 h-3.5" />
                  <span>Milestone 0{idx + 1}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── 6. 16 | COMMITMENT & 17 | BRAND PROMISE ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 border-t border-gray-100 bg-slate-950 text-white rounded-3xl mb-16 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              16 | OUR COMMITMENT
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Technology with <span className="text-cyan-400">Responsibility</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We are committed to delivering clean energy and intelligent power solutions with the highest engineering rigor, environmental responsibility, and long-term customer dependability.
            </p>
          </div>

          <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-center sm:text-left">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
              17 | OUR BRAND PROMISE
            </span>
            <div className="text-xl sm:text-2xl font-mono font-bold text-white tracking-wide">
              ENERGY × TECHNOLOGY × MOBILITY × SUSTAINABILITY
            </div>
            <p className="text-xs text-slate-400 pt-1">
              The foundational formula behind every product, partnership, and power project delivered by VLOXIA Systems LLP.
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. CORPORATE CREDENTIALS & REGISTRATION CARD (SECTION 18) ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 lg:pb-24">
        <ScrollReveal>
          <div className="rounded-3xl border border-gray-200 bg-slate-50/70 p-8 sm:p-12 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-gray-200">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                  18 | CORPORATE IDENTIFICATION &amp; REGISTERED OFFICE
                </p>
                <h3 className="text-2xl font-bold text-slate-950 tracking-tight mt-1">
                  VLOXIA SYSTEMS LLP
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Authorized Clean Energy LLP</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <MapPin className="w-4 h-4 text-slate-600" />
                  <span>Registered Office</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  A3/55, Sector 15, Rohini,<br />Delhi 110089, India
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 text-slate-600" />
                  <span>4 Core Verticals</span>
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
                  TATA EZ POWER Distributor &amp; Tier-1 OEMs
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <Phone className="w-4 h-4 text-slate-600" />
                  <span>Partnerships Lead</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  Manu Bhatia: <a href="tel:+918178810456" className="text-blue-600 hover:underline">+91 8178810456</a> <br />
                  <span className="text-slate-500">vloxiasystems@gmail.com</span>
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}