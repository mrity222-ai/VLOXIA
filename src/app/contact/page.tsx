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
  Globe,
  UserCheck,
} from "lucide-react";

// 18 | CONTACT US DATA
const CONTACT_CHANNELS = [
  {
    icon: MapPin,
    title: "Registered Corporate Office",
    desc: "A3/55, Sector 15, Rohini, Delhi 110089, India. Accessible via Delhi Metro Red Line (Rohini West) & Yellow Line (Samaypur Badli).",
    action: "View on Google Maps",
    href: "https://maps.google.com/?q=Sector+15+Rohini+Delhi+110089",
  },
  {
    icon: UserCheck,
    title: "Business & Channel Partnerships",
    desc: "Manu Bhatia — Direct channel desk for dealership appointments, TATA EZ POWER distributor allocations, and corporate inquiries.",
    action: "Call Manu Bhatia: +91 8178810456",
    href: "tel:+918178810456",
  },
  {
    icon: Phone,
    title: "Direct Phone & WhatsApp",
    desc: "+91 8178810456 / 8178810456. Technical assistance, hardware quotes, and dealer inquiries across India.",
    action: "Call +91 8178810456",
    href: "tel:+918178810456",
  },
  {
    icon: Mail,
    title: "Official Corporate Email",
    desc: "vloxiasystems@gmail.com. Verified channel for RFPs, tenders, single-line diagrams, and partnership proposals.",
    action: "Send Email Direct",
    href: "mailto:vloxiasystems@gmail.com",
  },
];

const WHAT_TO_EXPECT = [
  {
    n: "01",
    title: "Understand & Site Feasibility Audit",
    desc: "Our senior engineers evaluate historical load profiles, roof space, transformer capacity, grid stability, and harmonic distortion within 24 hours.",
  },
  {
    n: "02",
    title: "Recommend Right Technology & Sizing",
    desc: "You receive an itemized proposal featuring Tier-1 OEM hardware (including TATA EZ POWER), transparent civil/electrical scope, and clear ROI calculations.",
  },
  {
    n: "03",
    title: "Certified Implementation & SLA Handover",
    desc: "From mounting to CEIG clearance and DISCOM grid-synchronization, our execution team handles end-to-end commissioning and ongoing warranty support.",
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
      
      {/* ── 1. HERO SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>18 | CONTACT VLOXIA SYSTEMS LLP</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-slate-950 leading-[1.15]">
                Powering Mobility. <br />
                Harnessing Energy. <br />
                <span className="text-shimmer font-bold">Enabling a Sustainable Future.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Ready to explore EV charging infrastructure, integrated lithium inverters, or commercial solar solutions? Reach out to our registered office in Rohini, Delhi or connect directly with our partnership desk.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="tel:+918178810456"
                  className="btn-hover-effect glow-hover-blue inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-full transition-all shadow-md shadow-blue-500/25 text-sm active:scale-95"
                >
                  <span>Call: +91 8178810456</span>
                  <span className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </a>

                <a
                  href="#enquiry-form"
                  className="btn-hover-effect inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-gray-300 text-slate-800 font-semibold hover:border-gray-400 hover:bg-slate-50 transition-all text-sm"
                >
                  Submit Inquiry
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
                  <span>Delhi Corporate Office</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-950">
                    VLOXIA SYSTEMS LLP
                  </h3>
                  <p className="text-xs text-blue-600 mt-1 uppercase font-mono font-bold tracking-wider">
                    Registered Office
                  </p>
                </div>

                <div className="space-y-3 text-sm text-slate-700">
                  <p className="leading-relaxed font-medium">
                    A3/55, Sector 15, Rohini, Delhi 110089, India
                  </p>
                  <div className="pt-2 border-t border-gray-200 space-y-1.5 text-xs text-slate-600">
                    <p><strong>Partnerships Lead:</strong> Manu Bhatia</p>
                    <p><strong>Phone:</strong> +91 8178810456 / 8178810456</p>
                    <p><strong>Email:</strong> vloxiasystems@gmail.com</p>
                    <p><strong>Website:</strong> www.vloxia.in</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <a
                    href="https://maps.google.com/?q=Sector+15+Rohini+Delhi+110089"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors group"
                  >
                    <span className="underline-hover-effect">Open Sector 15 Rohini in Google Maps</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ── 2. 18 | DIRECT CONTACT CHANNELS (2x2 GRID) ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 border-t border-gray-100">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block mb-2">
                18 | CONTACT CHANNELS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950">
                Direct Contact <span className="text-shimmer font-bold">Touchpoints</span>
              </h2>
            </div>
            <p className="text-slate-500 text-sm sm:text-base max-w-md leading-relaxed">
              Reach the right engineering or channel partner desk immediately for guidance on EV charging, storage, or solar installations.
            </p>
          </div>
        </ScrollReveal>

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
          
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
                <span>Direct Inquiry</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 leading-tight">
                Send a Message to <span className="text-shimmer font-bold">VLOXIA</span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3">
                Fill in your project requirements below. Manu Bhatia and our technical engineering desk will respond within 24 business hours.
              </p>

              <div className="space-y-3 pt-4 text-xs text-slate-600">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Authorized TATA EZ POWER EV &amp; Inverter Distributor</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct OEM Commercial Pricing &amp; Warranty</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Turnkey Technical Single-Line Engineering</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7">
            <ScrollReveal delay={0.15}>
              <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-10 shadow-xs">
                <div className="mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950">
                    Project &amp; Channel Inquiry Form
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Please provide your contact and energy requirements.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-emerald-900">
                      Inquiry Received!
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto">
                      Thank you for contacting VLOXIA Systems LLP. Manu Bhatia will review your details and contact you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Full name"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Company / Society Name
                        </label>
                        <input
                          type="text"
                          placeholder="Business or residential entity"
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
                          placeholder="+91 8178810456"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="yourname@domain.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Core Vertical of Interest *
                        </label>
                        <select
                          required
                          defaultValue=""
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white text-slate-900"
                        >
                          <option value="" disabled>Select vertical</option>
                          <option value="ev-charging">⚡ EV Charging (AC &amp; DC Fast)</option>
                          <option value="solar-energy">☀️ Solar Energy &amp; Rooftop EPC</option>
                          <option value="energy-storage">🔋 Lithium Energy Storage &amp; Inverters</option>
                          <option value="power-solutions">⚙️ Integrated Power Solutions</option>
                          <option value="channel-partner">🤝 Channel Partner / Dealership</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Project Location (City / State) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rohini Delhi, Gurugram, Noida..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white text-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Message / Project Scope
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your energy requirement, sanctioned load, or partnership expectations..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white text-slate-900"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="btn-hover-effect glow-hover-blue w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-full transition-all text-sm shadow-md shadow-blue-500/25 cursor-pointer active:scale-95"
                      >
                        <span>Send Project Message</span>
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

      {/* ── 4. INTERACTIVE GOOGLE MAPS SECTION (SECTOR 15, ROHINI, DELHI) ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12 border-t border-gray-100">
        <ScrollReveal>
          <div className="rounded-3xl overflow-hidden border border-gray-200 bg-slate-50 shadow-sm space-y-4 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600">
                  HEADQUARTERS LOCATION
                </span>
                <h3 className="text-lg font-bold text-slate-950">
                  Sector 15, Rohini, Delhi 110089
                </h3>
              </div>
              <a
                href="https://maps.google.com/?q=Sector+15+Rohini+Delhi+110089"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hover-effect inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-xs font-semibold text-slate-700 hover:bg-white hover:border-blue-400"
              >
                <span>Open in Google Maps App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border border-gray-200">
              <iframe
                title="VLOXIA Systems LLP Corporate Office - Rohini Sector 15 Delhi"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13998.48700201944!2d77.1207887754512!3d28.729729962386884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d015c7e7b6863%3A0xe5a285d83fbf50e4!2sSector%2015%2C%20Rohini%2C%20Delhi%2C%20110089!5e0!3m2!1sen!2sin!4v1714500000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── 5. WHAT TO EXPECT: NUMBERED ACCORDION ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
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
                    <span>Transparent Pricing &amp; Engineering</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    No hidden contractor markups. Every single transformer, panel, inverter, and charger is transparently specified.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

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

      {/* ── 6. BOTTOM DARK CTA BANNER ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 lg:pb-24">
        <ScrollReveal>
          <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                DIRECT CONTACT
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Connect Directly with <span className="text-cyan-400">Manu Bhatia</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Call or WhatsApp our partnership desk for dealership inquiries, EV charging infrastructure, or solar rooftop estimates across India.
              </p>
              <div className="pt-3">
                <a
                  href="tel:+918178810456"
                  className="btn-hover-effect glow-hover-cyan inline-flex items-center gap-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-8 py-4 rounded-full transition-all text-sm shadow-lg shadow-cyan-500/20 active:scale-95"
                >
                  <span>Call +91 8178810456</span>
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