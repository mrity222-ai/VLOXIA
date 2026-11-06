"use client";

import React, { useState } from "react";
import Link from "next/link";
import ScrollReveal from "../../components/animations/ScrollReveal";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";

const CONTACT_CHANNELS = [
  {
    icon: MapPin,
    title: "Registered Corporate Office",
    desc: "A3/55, Sector 15, Rohini, Delhi 110089. Accessible via Delhi Metro (Rohini West / Sector 18).",
    action: "View on Google Maps",
    href: "https://maps.google.com/?q=Sector+15+Rohini+Delhi",
  },
  {
    icon: Phone,
    title: "Phone & WhatsApp Desk",
    desc: "+91 8178810456. Direct technical desk for site audits, hardware inquiries, and vendor alliances.",
    action: "Call +91 8178810456",
    href: "tel:+918178810456",
  },
  {
    icon: Mail,
    title: "Official Email Inquiries",
    desc: "vloxiasystems@gmail.com. Verified official email for RFPs, tenders, single-line diagrams, and quotes.",
    action: "Send Email Direct",
    href: "mailto:vloxiasystems@gmail.com",
  },
  {
    icon: Clock,
    title: "Operating Hours & NOC",
    desc: "Mon – Sat: 9:00 AM – 7:00 PM IST. 24/7 emergency telemetry and NOC monitoring for SLA contract holders.",
    action: "Schedule Meeting",
    href: "#enquiry-form",
  },
];

const WHAT_TO_EXPECT = [
  {
    n: "01",
    title: "Site Audit & Technical Feasibility Assessment",
    desc: "Our senior electrical engineers review your consumption bills, roof or ground dimensions, existing transformer capacity, and grid interconnection limits within 24 hours.",
  },
  {
    n: "02",
    title: "Custom Single-Line Diagram & Commercial BOM",
    desc: "You receive an itemized bill of materials (BOM) featuring Tier-1 OEM hardware, transparent civil/electrical scope, and detailed IRR/payback financial calculations.",
  },
  {
    n: "03",
    title: "Turnkey Commissioning & Net-Metering NOC",
    desc: "From foundation pouring to CEIG clearance and DISCOM grid-synchronization, our certified execution team handles end-to-end commissioning.",
  },
];

export default function ContactPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
                <span>Get In Touch</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-slate-950 leading-[1.15]">
                Contact VLOXIA systems for <span className="text-shimmer font-bold">engineering consultation</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Ready to start your clean energy journey? Our senior engineers and consultants are here to help — reach out for site audits, commercial quotations, or partnership enquiries.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="tel:+918178810456"
                  className="btn-hover-effect glow-hover-blue inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-full transition-all shadow-md shadow-blue-500/25 text-sm active:scale-95"
                >
                  <span>Call Us Now</span>
                  <span className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </a>

                <a
                  href="#enquiry-form"
                  className="btn-hover-effect inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-gray-300 text-slate-800 font-semibold hover:border-gray-400 hover:bg-slate-50 transition-all text-sm"
                >
                  Submit Project RFP
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Delhi Headquarters Card */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.2}>
              <div className="relative rounded-3xl border border-gray-200 bg-slate-50/80 p-8 sm:p-10 shadow-xs space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Delhi NCR Central Desk</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-950">
                    Corporate Headquarters
                  </h3>
                  <p className="text-xs text-blue-600 mt-1 uppercase font-mono font-bold tracking-wider">
                    VLOXIA Systems LLP
                  </p>
                </div>

                <div className="space-y-3 text-sm text-slate-700">
                  <p className="leading-relaxed">
                    A3/55, Sector 15, Rohini, Delhi 110089.
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Easily accessible via Delhi Metro Red Line (Rohini West) &amp; Yellow Line (Samaypur Badli).
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <a
                    href="https://maps.google.com/?q=Sector+15+Rohini+Delhi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors group"
                  >
                    <span className="underline-hover-effect">Open Directions in Google Maps</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ── 2. "WHY SHOULD YOU PARTNER?" / TOUCHPOINTS (2x2 GRID WITH BLUE BADGES) ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 border-t border-gray-100">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950">
                Direct Contact <span className="text-shimmer font-bold">Channels</span>
              </h2>
            </div>
            <p className="text-slate-500 text-sm sm:text-base max-w-md leading-relaxed">
              Gain a deeper understanding of our touchpoints and reach the right engineering desk immediately.
            </p>
          </div>
        </ScrollReveal>

        {/* 2x2 Grid with blue badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CONTACT_CHANNELS.map((channel, idx) => {
            const Icon = channel.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div
                  className="card-hover-effect lift-effect bg-white rounded-2xl border border-gray-200/80 p-8 sm:p-10 hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center mb-6 shrink-0 shadow-sm shadow-blue-500/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight mb-2.5">
                      {channel.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {channel.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <a
                      href={channel.href}
                      className="text-xs font-bold text-blue-600 flex items-center gap-1.5 hover:text-blue-700 transition-colors"
                    >
                      <span>{channel.action}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ── 3. SEND AN ENQUIRY FORM SECTION ── */}
      <section id="enquiry-form" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Context & Assurances */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
                <span>Project Consultation</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 leading-tight">
                Send an Engineering <span className="text-shimmer font-bold">Enquiry</span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3">
                Fill in your project requirements below. Our technical engineering desk typically responds within 24 business hours with initial single-line feasibility.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  { title: "NDA & Commercial Privacy", desc: "All client drawings and load profiles are kept confidential." },
                  { title: "No Obligation Site Audit", desc: "Initial rooftop and EV feasibility review without consulting fees." },
                  { title: "Turnkey Single-Point SLA", desc: "Single warranty for solar modules, inverters, chargers, and switchgear." },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-950 tracking-tight">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Clean Form Container */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.15}>
              <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-10 shadow-xs">
                <div className="mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                    Project Scope &amp; Site Details
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Provide your technical requirements so we can assign the specialized vertical engineer.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-emerald-900">
                      Enquiry Successfully Submitted!
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto">
                      Thank you for reaching out to VLOXIA Systems. A senior project engineer will analyze your requirements and connect with you shortly.
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
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white text-slate-900"
                        />
                      </div>

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
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Business Email
                        </label>
                        <input
                          type="email"
                          placeholder="you@company.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          City / Operating Location
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. New Delhi, Gurugram, Noida..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Interested Solution *
                        </label>
                        <select
                          required
                          defaultValue=""
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white text-slate-900"
                        >
                          <option value="" disabled>Select a solution</option>
                          <option value="ev-charging">EV Charging Infrastructure</option>
                          <option value="solar-energy">Solar Energy EPC</option>
                          <option value="energy-storage">Energy Storage &amp; Lithium BESS</option>
                          <option value="power-solutions">Power Solutions &amp; Backup</option>
                          <option value="multiple">Integrated Multi-Technology Solution</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Customer / Sector Type *
                        </label>
                        <select
                          required
                          defaultValue=""
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white text-slate-900"
                        >
                          <option value="" disabled>Select sector</option>
                          <option value="residential">Residential &amp; Housing Society</option>
                          <option value="commercial">Commercial Real Estate &amp; Retail</option>
                          <option value="industrial">Industrial &amp; Manufacturing</option>
                          <option value="mobility">Fleet &amp; Logistics Operator</option>
                          <option value="institutional">Institutional &amp; Healthcare</option>
                          <option value="channel-partner">Dealer / Channel Partner</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Project Requirement &amp; Scope
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Describe your site details, required power capacity, timeline, or any specific engineering requirements..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white text-slate-900"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="btn-hover-effect glow-hover-blue w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-full transition-all text-sm shadow-md shadow-blue-500/25 cursor-pointer active:scale-95"
                      >
                        <span>Submit Project Enquiry</span>
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

      {/* ── 4. WHAT TO EXPECT: NUMBERED ACCORDION (01, 02, 03) ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Heading & Subtitle */}
          <div className="lg:col-span-5 space-y-4">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 leading-tight">
                What Happens After You Inquire?
              </h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed mt-3">
                We follow a structured 3-stage milestone procedure to take your site from concept audit to live grid power.
              </p>

              <div className="pt-4">
                <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Transparent Pricing</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    No hidden contractor markups. Every single transformer, panel, and cable is transparently specified.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Numbered Step Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {WHAT_TO_EXPECT.map((step, idx) => {
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
                Instant Connect
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Need Urgent Technical Assistance?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Our direct customer engineering line is active Monday through Saturday. You can also chat directly with our project leads via WhatsApp.
              </p>
              <div className="pt-3">
                <a
                  href="tel:+918178810456"
                  className="btn-hover-effect glow-hover-blue inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-full transition-all text-sm shadow-lg shadow-blue-500/25 active:scale-95"
                >
                  <span>Call +91 81788 104 56</span>
                  <span className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
