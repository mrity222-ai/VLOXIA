"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "../../components/animations/ScrollReveal";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Award,
  Zap,
  Users,
  Building2,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Layers,
  Battery,
  Sun,
  Power,
} from "lucide-react";

const CHANNEL_TYPES = [
  "Dealers & Distributors",
  "EV Charging Network Partners",
  "Solar EPC & Rooftop Installers",
  "Electrical System Integrators",
  "Channel Solution Partners",
];

const PARTNER_BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Strong OEM Ecosystem",
    desc: "We work with established technology partners like TATA EZ POWER to bring dependable products to market through a strong distribution and channel network.",
  },
  {
    icon: Award,
    title: "Multi-Vertical Portfolio",
    desc: "Empower your dealership with an integrated product basket across EV Charging, Inverters with integrated lithium batteries, and Solar systems.",
  },
  {
    icon: Zap,
    title: "Solution-Oriented Engineering",
    desc: "We support our partners beyond product supply with load analysis, charger selection, single-line diagrams, and DISCOM synchronization.",
  },
  {
    icon: Users,
    title: "Scalable Channel Enablement",
    desc: "Dedicated technical training, co-marketing collateral, guaranteed stock dispatch, and warranty lifecycle support across India.",
  },
];

export default function PartnersPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* ── 1. HERO SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>09 | TECHNOLOGY PARTNERS &amp; 12 | CHANNEL NETWORK</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-slate-950 leading-[1.15]">
                Building the right portfolio with <span className="text-shimmer font-bold">the right partners</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                VLOXIA Systems LLP operates as an authorized distributor for established technology leaders including <strong>TATA EZ POWER</strong> for AC &amp; DC EV charging solutions and inverters with integrated lithium battery storage across India.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#partner-application"
                  className="btn-hover-effect glow-hover-blue inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-full transition-all shadow-md shadow-blue-500/25 text-sm active:scale-95"
                >
                  <span>Apply as Channel Partner</span>
                  <span className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </a>

                <Link
                  href="/solutions/ev-charging"
                  className="btn-hover-effect inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-gray-300 text-slate-800 font-semibold hover:border-gray-400 hover:bg-slate-50 transition-all text-sm"
                >
                  Explore EV Portfolio
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal delay={0.2}>
              <div className="relative w-full h-[360px] sm:h-[420px] rounded-3xl overflow-hidden shadow-sm border border-gray-100 group">
                <Image
                  src="/ev.jpg"
                  alt="TATA EZ POWER & VLOXIA Channel Partner Network"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400 font-mono">
                    AUTHORIZED DISTRIBUTOR
                  </span>
                  <p className="text-base font-bold text-slate-100">
                    TATA EZ POWER
                  </p>
                  <p className="text-xs text-slate-300">
                    AC &amp; DC EV Chargers · Integrated Lithium Inverters
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ── 2. DIFFERENTIATORS / WHY PARTNER WITH VLOXIA ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 border-t border-gray-100">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950">
                Why Should You <span className="text-shimmer font-bold">Partner?</span>
              </h2>
            </div>
            <p className="text-slate-500 text-sm sm:text-base max-w-md leading-relaxed">
              We look beyond product distribution to empower channel partners with dependable technologies, transparent terms, and technical guidance.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PARTNER_BENEFITS.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div
                  className="card-hover-effect lift-effect bg-white rounded-2xl border border-gray-200/80 p-8 sm:p-10 hover:border-blue-400 hover:shadow-xl transition-all h-full"
                >
                  <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center mb-6 shrink-0 shadow-sm shadow-blue-500/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight mb-2.5">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ── 3. SHOWCASE: TATA EZ POWER & EXPANDING PORTFOLIO ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 border-t border-gray-100">
        <ScrollReveal>
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70 mb-4">
              <span>09 | Technology Partners</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 max-w-2xl">
                Anchor Technology Alliance: <span className="text-shimmer font-bold">TATA EZ POWER</span>
              </h2>
              <p className="text-slate-500 text-sm sm:text-base max-w-md leading-relaxed">
                VLOXIA operates as a distributor for Tata&apos;s leading clean mobility and intelligent storage solutions.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: TATA EZ POWER EV Charging */}
          <ScrollReveal delay={0.1}>
            <div className="card-hover-effect lift-effect bg-slate-50/60 rounded-2xl border border-gray-200/80 p-8 flex flex-col justify-between hover:border-blue-400 hover:bg-white hover:shadow-xl transition-all h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    EV CHARGING SOLUTIONS
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Official Distributor</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-950 tracking-tight">
                    TATA EZ POWER
                  </h3>
                  <p className="text-sm font-medium text-slate-500 mt-1">
                    AC &amp; DC EV Charging Infrastructure
                  </p>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  VLOXIA Systems LLP operates as a distributor for Tata&apos;s AC and DC EV charging solutions, supporting customers and channel partners with direct access to EV charging technologies for homes, societies, workplaces, fleets, and highway corridors.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {[
                    "AC Residential & Society Wallboxes",
                    "DC Fast Chargers for Highways",
                    "Fleet Depot High-Power Stations",
                    "Dynamic Load Balancing CMS",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-gray-200/60">
                <Link
                  href="/solutions/ev-charging"
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors group"
                >
                  <span className="underline-hover-effect">Explore Tata EV Charging Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Inverters with Integrated Lithium */}
          <ScrollReveal delay={0.2}>
            <div className="card-hover-effect lift-effect bg-slate-50/60 rounded-2xl border border-gray-200/80 p-8 flex flex-col justify-between hover:border-blue-400 hover:bg-white hover:shadow-xl transition-all h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-white px-3 py-1 rounded-full border border-gray-200">
                    INTEGRATED LITHIUM STORAGE
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Official Distributor</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-950 tracking-tight">
                    Inverters with Integrated Lithium
                  </h3>
                  <p className="text-sm font-medium text-slate-500 mt-1">
                    Compact &amp; Intelligent Energy Storage
                  </p>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  VLOXIA Systems LLP distributes inverter solutions with integrated lithium battery systems, addressing the rapidly growing demand for compact, reliable, and intelligent energy-storage across residential, commercial, and healthcare environments.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {[
                    "Integrated Lithium Battery Architecture",
                    "Compact Footprint for Homes & Offices",
                    "Sub-10ms Instant Transfer Latency",
                    "Solar & Renewable Synchronization",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-gray-200/60">
                <Link
                  href="/solutions/energy-storage"
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors group"
                >
                  <span className="underline-hover-effect">Explore Lithium Inverter Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Expanding Technologies Strip */}
        <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-gray-200">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block mb-3">
            OUR EXPANDING TECHNOLOGIES ECOSYSTEM
          </span>
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
            <span className="bg-white border border-gray-200 px-3.5 py-1.5 rounded-full">EV Charging</span>
            <span className="bg-white border border-gray-200 px-3.5 py-1.5 rounded-full">Solar Energy</span>
            <span className="bg-white border border-gray-200 px-3.5 py-1.5 rounded-full">Lithium Storage</span>
            <span className="bg-white border border-gray-200 px-3.5 py-1.5 rounded-full">Inverters</span>
            <span className="bg-white border border-gray-200 px-3.5 py-1.5 rounded-full">Power Electronics</span>
            <span className="bg-white border border-gray-200 px-3.5 py-1.5 rounded-full">Energy Management</span>
            <span className="bg-white border border-gray-200 px-3.5 py-1.5 rounded-full">Sustainable Energy</span>
          </div>
        </div>
      </section>

      {/* ── 4. CHANNEL PARTNER APPLICATION (APPLICATION FORM) ── */}
      <section id="partner-application" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
                <span>12 | Channel Partner Network</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 leading-tight">
                Join the <span className="text-shimmer font-bold">VLOXIA Partner Network</span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3">
                We are building a pan-India network of authorized dealers, installers, and channel partners. Scale your clean energy business with guaranteed OEM access, transparent wholesale pricing, and technical backing.
              </p>

              <div className="space-y-3 pt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Partner Categories We Welcome:
                </p>
                <div className="flex flex-wrap gap-2">
                  {CHANNEL_TYPES.map((type, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-medium border border-gray-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 space-y-3 mt-6">
                <div className="flex items-center gap-3 text-xs text-slate-700 font-medium">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Manu Bhatia (Partnerships): <a href="tel:+918178810456" className="text-blue-600 hover:underline">+91 8178810456</a></span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-700 font-medium">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <a href="mailto:vloxiasystems@gmail.com" className="hover:underline">vloxiasystems@gmail.com</a>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>A3/55, Sector 15, Rohini, Delhi 110089</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7">
            <ScrollReveal delay={0.15}>
              <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-10 shadow-xs">
                <div className="mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950">
                    Channel Partner Application
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Submit your business details and Manu Bhatia will get in touch within 24 hours.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-emerald-900">
                      Application Received!
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto">
                      Thank you for applying to the VLOXIA Partner Network. Manu Bhatia will review your details and contact you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Contact Person *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your full name"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Company / Business Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Registered entity name"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Phone Number / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 8178810456"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Business Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="partner@company.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Partner Category *
                        </label>
                        <select
                          required
                          defaultValue=""
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white text-slate-900"
                        >
                          <option value="" disabled>Select category</option>
                          <option value="dealer">Dealer / Distributor</option>
                          <option value="ev-installer">EV Charging Installer</option>
                          <option value="solar-installer">Solar Energy EPC</option>
                          <option value="storage">Inverter &amp; Storage Integrator</option>
                          <option value="solution-partner">Channel Solution Partner</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Operating Region / State *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Delhi NCR, Haryana, UP, Rajasthan..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="btn-hover-effect glow-hover-blue w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-full transition-all text-sm shadow-md shadow-blue-500/25 cursor-pointer active:scale-95"
                      >
                        <span>Submit Channel Application</span>
                        <span className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ── 5. BOTTOM CTA BANNER ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 lg:pb-24">
        <ScrollReveal>
          <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                18 | BUSINESS &amp; CHANNEL PARTNERSHIPS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Connect Directly with <span className="text-cyan-400">Manu Bhatia</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Connect directly for volume dealership terms, TATA EZ POWER distributor allocations, or turnkey commercial project partnerships.
              </p>
              <div className="pt-3">
                <a
                  href="tel:+918178810456"
                  className="btn-hover-effect glow-hover-cyan inline-flex items-center gap-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-8 py-4 rounded-full transition-all text-sm shadow-lg shadow-cyan-500/20 active:scale-95"
                >
                  <span>Call Alliance Desk: +91 8178810456</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}