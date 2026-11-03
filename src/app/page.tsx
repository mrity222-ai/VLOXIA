"use client";

import Link from "next/link";
import Image from "next/image";
import FeaturedProducts from "@/components/FeaturedProducts";
import HowItWorksProcess from "@/components/HowItWorksProcess";
import IndustryMarqueeSlider from "@/components/IndustryMarqueeSlider";
import {
  ArrowRight,
  Zap,
  Sun,
  Battery,
  Power,
  ChevronDown,
  House,
  Building2,
  Factory,
  CarFront,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const solutions = [
  {
    icon: Zap,
    title: "EV Charging",
    desc: "AC & DC fast chargers for home, commercial hubs, fleet depots, and highway corridors.",
    href: "/solutions/ev-charging",
    badge: "3.3 kW – 120 kW+",
  },
  {
    icon: Sun,
    title: "Solar Energy",
    desc: "Residential, commercial & industrial rooftop solar systems with high-efficiency net-metering.",
    href: "/solutions/solar-energy",
    badge: "1 kW – 1 MW+",
  },
  {
    icon: Battery,
    title: "Energy Storage",
    desc: "Long-life LiFePO4 battery systems for seamless backup power, load shifting, and energy autonomy.",
    href: "/solutions/energy-storage",
    badge: "5.12 kWh – MWh",
  },
  {
    icon: Power,
    title: "Power Solutions",
    desc: "Pure sine wave solar hybrid inverters, sub-10ms UPS, and cross-technology power management.",
    href: "/solutions/power-solutions",
    badge: "< 10ms Switchover",
  },
];

const INDUSTRIES_LIST = [
  { image: "/Industries/Residential.png", icon: House, label: "Residential", desc: "Homes & Housing Societies" },
  { image: "/Industries/Commercial.png", icon: Building2, label: "Commercial", desc: "Offices, Retail & Hospitality" },
  { image: "/Industries/Industrial.png", icon: Factory, label: "Industrial", desc: "Factories, Warehouses & Plants" },
  { image: "/Industries/Mobility.png", icon: CarFront, label: "Mobility", desc: "Fleets, Transport & Logistics" },
  { image: "/Industries/Institutional.png", icon: Landmark, label: "Institutional", desc: "Schools, Hospitals & Campuses" },
];

export default function HomePage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen selection:bg-[#d9f99d] selection:text-black">
      
      {/* ─── 1. HOMEPAGE HERO (MODERN CLEAN DARK THEME) ─── */}
      <section className="relative min-h-[620px] lg:min-h-[720px] bg-slate-950 text-white flex items-center overflow-hidden pt-28 pb-16">
        {/* Background Visual Image with Dark Radial Shading */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Industries/Mobility.png"
            alt="VLOXIA EV Charging & Clean Energy Infrastructure"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 lg:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl space-y-6">
            {/* Top Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wider uppercase backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>VLOXIA Clean Energy Systems</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Fueling the <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Next Electric Era.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Charging that fits seamlessly into your life. We engineer intelligent, high-speed power
              and solar infrastructure designed for India&apos;s clean energy future.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/solutions/ev-charging"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>Find Your Solution</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-sm backdrop-blur-md transition-all"
              >
                Schedule Consultation
              </Link>
            </div>

            {/* Key Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Fast Charging</div>
                  <div className="text-xs text-slate-400">Home, workplace, and highway hubs</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Certified &amp; Reliable</div>
                  <div className="text-xs text-slate-400">Tier-1 OEM backed with 5-year SLA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. FEATURE RAIL TICKER ─── */}
      <section aria-label="VLOXIA clean energy promise" className="bg-slate-900 border-y border-white/10 py-4 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs sm:text-sm font-semibold text-slate-300">
            Smarter, integrated clean energy for homes, enterprises, and electric mobility.
          </p>
          <Link
            href="/solutions/ev-charging"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>Explore All Solutions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ─── 3. COMPANY INTRODUCTION ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
              India&apos;s Integrated Clean Energy Partner
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              VLOXIA Systems LLP is a Delhi-based technology company operating across four clean energy
              verticals: EV Charging Infrastructure, Solar Energy Systems, Lithium Battery Storage, and Power Solutions.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              We combine OEM-grade technology partnerships with a consultative approach — helping
              residential, commercial, and industrial clients design, deploy, and manage their energy
              ecosystems for maximum efficiency, reliability, and sustainability.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right 4 Pillar Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Technology-Led", desc: "OEM-grade product portfolio with proven global technology standards." },
              { title: "Multi-Vertical", desc: "Four clean energy domains unified under one single integrated roof." },
              { title: "Customised EPC", desc: "Site assessment, electrical audits, and tailored engineering design." },
              { title: "Scalable Deployments", desc: "Modular architecture that grows seamlessly alongside your energy needs." },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/60 hover:bg-white hover:border-slate-300 hover:shadow-lg transition-all duration-300 space-y-2"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <h3 className="text-base font-bold text-slate-950">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. FOUR CORE SOLUTIONS ─── */}
      <section id="solutions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-100">
        <div className="text-center space-y-3 mb-14 max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
            Our Four Core Solutions
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            An integrated ecosystem that generates, stores, manages, and moves energy — all under one partner.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.title}
                href={s.href}
                className="group p-7 rounded-3xl border border-slate-200/90 bg-white hover:border-blue-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      {s.badge}
                    </span>
                    <h3 className="text-xl font-bold text-slate-950 group-hover:text-blue-600 transition-colors">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center gap-1.5 text-xs font-bold text-blue-600">
                  <span>Explore Solution</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─── 5. WHY CHOOSE VLOXIA (THE VLOXIA EDGE) ─── */}
      <section className="bg-slate-950 text-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#dcf836] uppercase tracking-wider block">
              Our Edge
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Why Choose VLOXIA?
            </h2>
            <p className="text-sm text-slate-400">
              Engineered for maximum reliability, lower lifecycle costs, and seamless operational uptime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { n: "01", title: "Technology-Led Approach", desc: "Direct OEM sourcing from established hardware developers to integrate proven Tier-1 technology into every deployment." },
              { n: "02", title: "Multiple Energy Verticals", desc: "EV Charging, Solar EPC, Lithium Storage, and Power Inverters — one single partner for your clean energy roadmap." },
              { n: "03", title: "Customised Recommendations", desc: "Rigorous site audits, electrical load analysis, and bespoke single-line engineering drawings for every customer." },
              { n: "04", title: "OEM Ecosystem & Warranties", desc: "Guaranteed hardware warranties, factory certifications, and full manufacturer technical backing on all components." },
              { n: "05", title: "Scalable System Architecture", desc: "Solutions engineered to scale from individual residential chargers to multi-megawatt industrial microgrids." },
              { n: "06", title: "Pan-India Channel Network", desc: "Fast-growing network of certified dealers, local installers, and service engineers covering all major metropolitan hubs." },
            ].map((item) => (
              <div
                key={item.n}
                className="p-8 rounded-3xl border border-white/10 bg-slate-900/60 hover:bg-slate-900 hover:border-white/20 transition-all duration-300 space-y-3"
              >
                <div className="text-2xl font-black text-[#dcf836]">
                  {item.n}
                </div>
                <h3 className="text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. INDUSTRIES WE SERVE PREVIEW ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
              Who We Serve
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Industries We Serve
            </h2>
          </div>
          <Link
            href="/industries"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-800"
          >
            <span>View All Industries</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {INDUSTRIES_LIST.map((ind) => {
            const Icon = ind.icon;
            return (
              <Link
                key={ind.label}
                href={`/industries#${ind.label.toLowerCase()}`}
                className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 block"
              >
                <Image
                  src={ind.image}
                  alt={ind.label}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 text-[#dcf836]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {ind.label}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {ind.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─── 7. FEATURED MARKETPLACE PRODUCTS ─── */}
      <FeaturedProducts
        title="Shop Clean Energy Products"
        description="Explore popular EV chargers, lithium storage, and power products from the VLOXIA marketplace."
        productIds={["ev-home-7kw", "ev-comm-22kw", "batt-lifepo4-5kwh", "inverter-hybrid-5kw"]}
      />

      {/* ─── 8. HOW IT WORKS PROCESS ─── */}
      <HowItWorksProcess />

      {/* ─── 9. INDUSTRY MARQUEE SLIDER ─── */}
      <IndustryMarqueeSlider />

      {/* ─── 10. CHANNEL PARTNER CALLOUT BANNER ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-blue-950 to-slate-950 p-8 sm:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="px-3 py-1 rounded-md bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
              Partner With Us
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Become a VLOXIA Channel Partner
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Dealers, distributors, installers, EPC contractors, and system integrators — join India&apos;s fast-growing clean energy network.
            </p>
          </div>

          <Link
            href="/partners#channel-partner"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#dcf836] text-black font-bold text-sm hover:bg-[#cdef2a] transition-all hover:scale-105 active:scale-95 shadow-md flex-shrink-0"
          >
            <span>Partner Enquiry</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─── 11. FREQUENTLY ASKED QUESTIONS (TAILWIND ACCORDIONS) ─── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-100">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Need to know
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600">
            Quick answers about choosing and planning your clean energy transition.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "Which VLOXIA solutions can I enquire about?",
              a: "We work across four core verticals: EV charging stations (AC wallboxes & DC fast chargers), rooftop solar systems, lithium LiFePO4 battery energy storage (BESS), and hybrid power backup inverters. You can enquire about an individual solution or a fully integrated package.",
            },
            {
              q: "Can solutions be planned for homes as well as commercial enterprises?",
              a: "Yes. We engineer customized configurations for independent homes, multi-storey housing societies, commercial IT parks, industrial factories, highway logistics depots, and institutional campuses.",
            },
            {
              q: "How do I get an engineering recommendation and quotation for my site?",
              a: "Simply share your facility location, sanctioned electrical load, and clean energy requirements via our enquiry form or call us directly. Our senior engineers conduct a preliminary audit and provide a transparent quotation within 24 hours.",
            },
            {
              q: "How can I become an authorized VLOXIA channel partner?",
              a: "Dealers, distributors, installers, and EPC contractors can register through our Channel Partner page to access wholesale OEM inventory, certified technical training, and priority project allocation.",
            },
          ].map((item, idx) => (
            <details
              key={idx}
              className="group p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50 open:bg-white open:shadow-md transition-all duration-200"
            >
              <summary className="flex items-center justify-between font-bold text-slate-900 cursor-pointer list-none gap-4">
                <span className="text-sm sm:text-base">{item.q}</span>
                <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 group-open:rotate-180 transition-transform">
                  <ChevronDown className="w-4 h-4 text-slate-700" />
                </span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ─── 12. SOLUTION GUIDES GRID ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Explore VLOXIA
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
              Find the Right Energy Solution
            </h2>
          </div>
          <Link
            href="/solutions/ev-charging"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800"
          >
            <span>View All Solutions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              href: "/solutions/ev-charging",
              tag: "EV CHARGING",
              title: "Charging for Homes, Workplaces & Fleets",
              desc: "Explore AC smart wallboxes and DC ultra-rapid charging options for all sites.",
            },
            {
              href: "/solutions/solar-energy",
              tag: "SOLAR ENERGY",
              title: "Generate Clean Power from Your Rooftop",
              desc: "Learn about grid-tied, hybrid, and industrial solar EPC systems with net-metering.",
            },
            {
              href: "/solutions/energy-storage",
              tag: "ENERGY STORAGE",
              title: "Store Energy for Whenever You Need It",
              desc: "See long-life LiFePO4 battery storage options for backup and demand management.",
            },
          ].map((g, idx) => (
            <Link
              key={idx}
              href={g.href}
              className="p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                  {g.tag}
                </span>
                <h3 className="text-lg font-bold text-slate-950 group-hover:text-blue-600 transition-colors">
                  {g.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {g.desc}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-slate-950 group-hover:text-blue-600 pt-2">
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
