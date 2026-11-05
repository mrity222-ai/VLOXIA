"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  ChevronDown,
} from "lucide-react";

const CHANNEL_TYPES = [
  "Dealers & Distributors",
  "Solar & EV Installers",
  "EPC Contractors",
  "Electrical System Integrators",
  "Commercial Business Development Partners",
];

const PARTNER_BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Stock Supply Guarantee",
    desc: "Ensure the availability of guaranteed hardware stocks prepared to provide prompt supply for your installations, dealers, and project sites.",
  },
  {
    icon: Award,
    title: "Direct OEM Commercial Pricing",
    desc: "Access Tier-1 wholesale volume pricing on EV chargers, solar modules, and lithium batteries to protect and maximize your project margins.",
  },
  {
    icon: Zap,
    title: "Field Engineering Assistance",
    desc: "Our senior electrical engineers assist your team with single-line diagrams, civil foundation guides, and DISCOM grid-clearance liaisoning.",
  },
  {
    icon: Users,
    title: "Qualified Regional Project Leads",
    desc: "We route incoming commercial and residential turnkey inquiries in your operating geography directly to certified channel network partners.",
  },
];

export default function PartnersPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white text-slate-900 font-sans antialiased">
      
      {/* ── 1. HERO SECTION (EDITORIAL REFERENCE STYLE) ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Subtitle & Action Buttons */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
              <span>Partners &amp; Alliances</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-slate-950 leading-[1.15]">
              Join the VLOXIA partner network &amp; OEM alliances
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              We collaborate with established OEM technology giants and certified hardware manufacturers to deliver reliable, certified, and performance-proven clean energy solutions across India.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#partner-application"
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-full transition-all shadow-md shadow-blue-500/25 text-sm active:scale-95"
              >
                <span>Apply as Partner</span>
                <span className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>

              <Link
                href="/solutions/ev-charging"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-gray-300 text-slate-800 font-semibold hover:border-gray-400 hover:bg-slate-50 transition-all text-sm"
              >
                Explore Tata EV Hardware
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic / Image */}
          <div className="lg:col-span-5">
            <div className="relative w-full h-[360px] sm:h-[420px] rounded-3xl overflow-hidden shadow-sm border border-gray-100">
              <Image
                src="/ev.jpg"
                alt="VLOXIA Channel Partner Network"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                  Nationwide Expansion
                </span>
                <p className="text-sm font-medium mt-1 text-slate-100">
                  Dealers · Installers · EPC Contractors · System Integrators
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. "WHY SHOULD YOU PARTNER?" / CHANNEL ADVANTAGES (2x2 GRID WITH BLUE BADGES) ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 border-t border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950">
              Why Should You <span className="text-blue-600 font-bold">Partner?</span>
            </h2>
          </div>
          <p className="text-slate-500 text-sm sm:text-base max-w-md leading-relaxed">
            Gain a deeper understanding of the features offered by partner services according to your business scale, inventory needs, and regional outreach.
          </p>
        </div>

        {/* 2x2 Grid with blue badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PARTNER_BENEFITS.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200/80 p-8 sm:p-10 hover:shadow-sm transition-all"
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
            );
          })}
        </div>
      </section>

      {/* ── 3. SHOWCASE: OEM TECHNOLOGY ALLIANCES (2-COLUMN WIDE CARDS) ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 border-t border-gray-100">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70 mb-4">
            <span>Hardware Portfolio</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 max-w-2xl">
              Backed by Proven <span className="text-blue-600 font-bold">OEM Engineering</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-md leading-relaxed">
              We collaborate with premier hardware pioneers to bring certified, reliable clean energy infrastructure across India.
            </p>
          </div>
        </div>

        {/* 2-Column Wide Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: TATA EZ POWER */}
          <div className="bg-slate-50/60 rounded-2xl border border-gray-200/80 p-8 flex flex-col justify-between hover:border-gray-300 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  Strategic OEM Partner
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Authorized Integrator</span>
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-950 tracking-tight">
                  TATA EZ POWER
                </h3>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  EV Charging Technology Partner
                </p>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                Tata EZ Power provides an extensive portfolio of high-efficiency AC wallboxes and ultra-fast DC charging infrastructure. Our partnership enables VLOXIA to deliver Tata-backed charging hardware with certified reliability and pan-India SLA support.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  "AC Wallboxes (3.3 kW – 22 kW)",
                  "DC Fast Chargers (30 kW – 120 kW+)",
                  "Fleet & Public Hub CMS",
                  "Smart Dynamic Load Balancing",
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
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors"
              >
                <span>Explore Tata Powered EV Solutions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Expanding Portfolio */}
          <div className="bg-slate-50/60 rounded-2xl border border-gray-200/80 p-8 flex flex-col justify-between hover:border-gray-300 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-white px-3 py-1 rounded-full border border-gray-200">
                  Expanding Alliances
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Pan-India Sourcing
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-950 tracking-tight">
                  Tier-1 Solar &amp; Storage Alliances
                </h3>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Active Vendor &amp; OEM Onboarding
                </p>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                We are actively onboarding Tier-1 solar module manufacturers, LiFePO4 battery pack producers, and industrial hybrid inverter developers across India and global supply chains to power our integrated turnkey projects.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  "Mono PERC & TOPCon Solar Modules",
                  "Modular LiFePO4 BESS Systems",
                  "Industrial Hybrid Inverters",
                  "HT Transformers & Switchgear",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-gray-200/60">
              <a
                href="#partner-application"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors"
              >
                <span>Become an OEM / Supply Partner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. CHANNEL PARTNER APPLICATION (APPLICATION FORM) ── */}
      <section id="partner-application" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Context & Partner Types */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
              <span>Channel Network</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 leading-tight">
              Join the <span className="text-blue-600 font-bold">VLOXIA Partner Network</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We are building a pan-India network of authorized dealers, installers, and EPC partners. Scale your clean energy business with guaranteed inventory, OEM pricing, and full technical training.
            </p>

            <div className="space-y-3 pt-2">
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

            <div className="pt-4 border-t border-gray-100 space-y-3">
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>Alliance Desk: +91 81788 104 56</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>vloxiasystems@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form Container */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-10 shadow-xs">
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950">
                  Channel Partner Application
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Submit your business details and our channel alliance team will get in touch within 24 hours.
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
                    Thank you for applying to the VLOXIA Partner Network. Our partnership manager will review your submission and contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contact person name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Registered business name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
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
                        <option value="installer">EV / Solar Installer</option>
                        <option value="epc">EPC Contractor</option>
                        <option value="integrator">Electrical System Integrator</option>
                        <option value="oem">Technology OEM Supplier</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Operating Region / State *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Delhi NCR, Maharashtra, Gujarat..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-full transition-all text-sm shadow-md shadow-blue-500/25 cursor-pointer active:scale-95"
                    >
                      <span>Submit Partner Application</span>
                      <span className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. BOTTOM DARK CTA BANNER ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="rounded-3xl bg-[#111827] text-white p-8 sm:p-14 lg:p-16 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Direct Inquiries
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
              Have an OEM or <span className="text-blue-400 font-bold">Bulk Distribution Requirement?</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Connect directly with our channel alliances lead for custom volume pricing, OEM integrations, and nationwide distribution SLAs.
            </p>
            <div className="pt-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-full transition-all text-sm shadow-lg shadow-blue-500/25 active:scale-95"
              >
                <span>Contact Alliance Desk</span>
                <span className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
