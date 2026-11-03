"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Zap,
  Sun,
  Battery,
  ShieldCheck,
  Eye,
  Target,
  Heart,
  Cpu,
  Radio,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Award,
} from "lucide-react";

interface ShowcaseItem {
  id: string;
  category: string;
  title: string;
  watermark: string;
  tagline: string;
  image: string;
  specs: {
    label: string;
    value: string;
  }[];
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "ev-charging",
    category: "EV CHARGERS",
    title: "VLOXIA AC & DC Rapid Chargers",
    watermark: "VLOXIA EV",
    tagline: "High-capacity Type-2 wallboxes and ultra-fast dual-gun DC chargers.",
    image: "/Modern EV Charging.png",
    specs: [
      { label: "Output Range", value: "3.3 kW – 120 kW+" },
      { label: "Protocol Standard", value: "OCPP 1.6J Cloud" },
      { label: "Charging Speed", value: "10–80% in 35 min" },
      { label: "Uptime SLA", value: "99.8% Guaranteed" },
    ],
  },
  {
    id: "solar-epc",
    category: "SOLAR EPC",
    title: "Commercial & Industrial Solar Parks",
    watermark: "SOLAR EPC",
    tagline: "Tier-1 monocrystalline bifacial panels with 25-year linear generation.",
    image: "/Industries/Commercial.png",
    specs: [
      { label: "System Sizing", value: "10 kW – 1 MW+" },
      { label: "Cell Technology", value: "Bifacial Mono PERC" },
      { label: "Bill Reduction", value: "Up to 80% Tariff" },
      { label: "Performance Life", value: "25-Year Warranty" },
    ],
  },
  {
    id: "lithium-bess",
    category: "LITHIUM BESS",
    title: "LiFePO4 Modular Energy Storage",
    watermark: "BESS 5KWH",
    tagline: "Prismatic LiFePO4 chemistry with zero thermal runaway and 6,000+ cycle life.",
    image: "/Industries/Industrial.png",
    specs: [
      { label: "Module Capacity", value: "5.12 kWh / 100Ah" },
      { label: "Chemistry Safety", value: "Zero Runaway LiFePO4" },
      { label: "Cycle Longevity", value: "6,000+ Deep Cycles" },
      { label: "DOD Rating", value: "90% Usable Energy" },
    ],
  },
  {
    id: "power-backup",
    category: "POWER BACKUP",
    title: "Sub-10ms Critical Power UPS & Inverters",
    watermark: "UPS POWER",
    tagline: "Pure sine wave solar hybrid inverters ensuring zero downtime for critical loads.",
    image: "/Industries/Institutional.png",
    specs: [
      { label: "Switchover Speed", value: "< 10ms Seamless" },
      { label: "Waveform Quality", value: "Pure Sine Wave" },
      { label: "Harmonic Distortion", value: "THD < 2.5%" },
      { label: "Inverter Topology", value: "Dual MPPT Hybrid" },
    ],
  },
];

const CATEGORIES = ["ALL", "EV CHARGERS", "SOLAR EPC", "LITHIUM BESS", "POWER BACKUP"];

export default function AboutPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems =
    activeCategory === "ALL"
      ? SHOWCASE_ITEMS
      : SHOWCASE_ITEMS.filter((item) => item.category === activeCategory);

  const activeItem = filteredItems[currentIndex % filteredItems.length] || SHOWCASE_ITEMS[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
  };

  return (
    <main className="bg-white text-slate-900 overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* ─── 1. CINEMATIC DARK HERO WITH CURVED BOTTOM SCOOP ─── */}
      <section className="relative bg-[#070b14] text-white pt-28 sm:pt-36 pb-20 sm:pb-32 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-blue-600/20 via-indigo-600/10 to-transparent blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-blue-400 tracking-wider uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            VLOXIA Systems LLP
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase drop-shadow-md font-sans">
            POWERING THE <br className="hidden sm:inline" />
            FUTURE TODAY
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Delivering next-generation EV charging infrastructure, high-efficiency solar,
            and lithium storage systems engineered for India&apos;s clean energy future.
          </p>

          {/* Centered Hero Visual Frame */}
          <div className="relative mx-auto mt-8 sm:mt-12 max-w-3xl aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-slate-900/60 shadow-2xl">
            <Image
              src="/Modern EV Charging.png"
              alt="VLOXIA Next-Gen Clean Energy & EV Charging"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent opacity-80" />
          </div>
        </div>

        {/* Bottom Curved Scoop Cutout Mask */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-12 sm:h-20 text-white fill-current"
          >
            <path d="M0,0 C300,90 900,90 1200,0 L1200,120 L0,120 Z" />
          </svg>
        </div>

        {/* Floating Down Arrow Circular Pill */}
        <a
          href="#showcase"
          className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#070b14] border-2 border-slate-700 text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 z-20 group"
          aria-label="Scroll to showcase"
        >
          <ChevronDown className="w-5 h-5 text-slate-200 group-hover:translate-y-0.5 transition-transform" />
        </a>
      </section>

      {/* ─── 2. INTERACTIVE SYSTEMS SHOWCASE & SPECS STRIP ─── */}
      <section id="showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 sm:pb-24">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              The Future of Energy &amp; Mobility
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Engineered to deliver high-yield performance, intelligent energy management, and seamless reliability across every home, business, and fleet.
            </p>
          </div>
          <div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-950 text-white text-xs sm:text-sm font-bold hover:bg-slate-800 transition-all shadow-md group"
            >
              <span>See Our Products</span>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-3 h-3 text-white" />
              </span>
            </Link>
          </div>
        </div>

        {/* Pill Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-slate-950 text-white shadow-md scale-105"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Big Showcase Frame with Monogram Watermark & Carousel Arrows */}
        <div className="relative rounded-3xl bg-slate-50 border border-slate-200/80 p-6 sm:p-12 overflow-hidden shadow-sm">
          {/* Faint Large Monogram Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="text-[12vw] sm:text-[14vw] font-black text-slate-200/50 uppercase tracking-tighter">
              {activeItem.watermark}
            </span>
          </div>

          {/* Carousel Arrows */}
          <div className="absolute inset-y-0 left-3 sm:left-6 flex items-center z-10">
            <button
              type="button"
              onClick={handlePrev}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 border border-slate-200 text-slate-800 flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all"
              aria-label="Previous item"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-3 sm:right-6 flex items-center z-10">
            <button
              type="button"
              onClick={handleNext}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 border border-slate-200 text-slate-800 flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all"
              aria-label="Next item"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Centered Image */}
          <div className="relative z-1 max-w-2xl mx-auto aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 bg-white">
            <Image
              src={activeItem.image}
              alt={activeItem.title}
              fill
              className="object-cover object-center transition-all duration-700"
              sizes="(max-width: 1024px) 100vw, 800px"
            />
          </div>

          <div className="relative z-1 text-center mt-6 space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-950">
              {activeItem.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {activeItem.tagline}
            </p>
          </div>

          {/* 4-Column Key Engineering Specs Bar */}
          <div className="mt-8 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {activeItem.specs.map((spec, sIdx) => (
              <div
                key={sIdx}
                className={`space-y-1 ${
                  sIdx < 3 ? "md:border-r md:border-slate-200/80" : ""
                }`}
              >
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {spec.label}
                </div>
                <div className="text-base sm:text-lg font-extrabold text-slate-900">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. SMART TELEMATICS & IOT BENTO GRID ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950 leading-snug">
            Your Energy Infrastructure Adapts And Evolves. Advanced IoT Telematics Learns Your Consumption Patterns While Intelligent CMS Creates A Seamless Connection Between You And Your Power.
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Bento Card 1: Left Large HUD Card (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#070b14] text-white p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative shadow-xl border border-slate-800">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Status Strip */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 relative z-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Live OCPP Telematics
                </span>
              </div>
              <div className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                Hub ID: VLX-2026-IND
              </div>
            </div>

            {/* Central HUD Metrics */}
            <div className="py-8 relative z-1 space-y-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                    22.4 <span className="text-lg font-bold text-blue-400">kW</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Active Charging Throughput
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                    99.8%
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Facility Grid Efficiency
                  </div>
                </div>
              </div>

              {/* Graphic Gauge Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>Solar Generation Offset</span>
                  <span className="text-white font-bold">78% Green Powered</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full w-[78%]" />
                </div>
              </div>
            </div>

            {/* Bottom HUD Metadata */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 relative z-1 text-center">
              <div>
                <div className="text-xs text-slate-400">Peak Voltage</div>
                <div className="text-sm font-bold text-white font-mono">415 V (3-Ph)</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Cell Temp</div>
                <div className="text-sm font-bold text-emerald-400 font-mono">27.4°C Safe</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">BMS Protocol</div>
                <div className="text-sm font-bold text-blue-400 font-mono">CAN 2.0B</div>
              </div>
            </div>
          </div>

          {/* Right Column: Inset Bento Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Bento Card 2: Modular LiFePO4 Inset */}
            <div className="rounded-3xl bg-slate-50 border border-slate-200/80 p-6 flex flex-col justify-between shadow-sm flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center">
                  <Battery className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Hardware Level
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-950 mb-1">
                  Modular LiFePO4 Prismatic Cells
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Heavy-duty aluminium cell casings with individual thermal sensors to eliminate hot-spots and ensure zero thermal runaway risk.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Cycle Life: 6000+</span>
                <span className="text-emerald-600 font-bold">100% Tested</span>
              </div>
            </div>

            {/* Bento Card 3: Cloud Telematics & App */}
            <div className="rounded-3xl bg-slate-50 border border-slate-200/80 p-6 flex flex-col justify-between shadow-sm flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-full bg-emerald-600/10 text-emerald-600 flex items-center justify-center">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Cloud Software
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-950 mb-1">
                  Automated Cloud Settlement &amp; CMS
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Real-time tariff allocation, UPI driver billing, and scheduled off-peak charging through our enterprise dashboard.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Latency: &lt; 50ms</span>
                <span className="text-blue-600 font-bold">OCPP 1.6J</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bento Caption */}
        <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-950">
              Where Engineering Meets Innovation
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Every VLOXIA charging station, solar park, and lithium storage pack is integrated with cloud telematics, remote diagnostics, and intelligent load-balancing algorithms.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 whitespace-nowrap"
          >
            <span>Learn about our IoT stack</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ─── 4. FOUR CORE STRATEGIC PILLARS ("BEYOND POWER") ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-100">
        <div className="max-w-2xl mx-auto text-center space-y-2 mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Beyond Power—Engineering The Future Forward
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Four foundational pillars driving VLOXIA Systems LLP towards India&apos;s net-zero clean energy transition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 01 */}
          <div className="p-7 rounded-3xl border border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-slate-400">01</span>
              <h3 className="text-lg font-bold text-slate-950">
                Cutting-Edge Technology
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Tier-1 ALMM monocrystalline bifacial panels, certified OCPP 1.6J smart EV chargers, and pure sine wave hybrid inverters engineered for Indian grid conditions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Certified Tier-1</span>
            </div>
          </div>

          {/* Card 02 (Featured Dark Card with Glowing Icon Badge) */}
          <div className="p-7 rounded-3xl bg-[#070b14] text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-blue-500/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4 relative z-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-400">02</span>
                <span className="w-8 h-8 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center">
                  <Radio className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Intelligent CMS &amp; Telematics
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Automated driver RFID billing, real-time telemetry, remote cloud control, and dynamic multi-phase load balancing across charging bays.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 relative z-1 flex items-center gap-1.5 text-xs font-semibold text-blue-400">
              <Sparkles className="w-4 h-4" />
              <span>24/7 Remote Telemetry</span>
            </div>
          </div>

          {/* Card 03 */}
          <div className="p-7 rounded-3xl border border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-slate-400">03</span>
              <h3 className="text-lg font-bold text-slate-950">
                Sustainable Innovation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                High-density modular LiFePO4 battery storage systems eliminating diesel genset carbon emissions, coupled with certified zero-export solar synchronization.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Zero-Carbon Ready</span>
            </div>
          </div>

          {/* Card 04 */}
          <div className="p-7 rounded-3xl border border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-slate-400">04</span>
              <h3 className="text-lg font-bold text-slate-950">
                Turnkey Ownership Experience
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Site audit, DISCOM load sanctioning, CEIG safety clearances, and pan-India 24/7 dedicated field technical support under long-term SLA.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <Award className="w-4 h-4 text-blue-600" />
              <span>5-Year SLA Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. PRESERVED COMPANY OVERVIEW, FACTS & PURPOSE ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Detailed Overview */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-block px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
              Company Overview
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              VLOXIA Systems LLP
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              VLOXIA Systems LLP is a Delhi-based clean energy enterprise operating across EV charging infrastructure, solar energy systems, lithium energy storage (BESS), and power continuity solutions for clients across India.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              For electric mobility, VLOXIA helps residences, corporate parks, commercial complexes, and fleets plan and execute suitable charging bays—from smart AC wallboxes to high-capacity DC fast chargers. Our team handles electrical load audits, charger selection, civil installation, and ongoing cloud support.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              We also integrate solar generation, lithium battery backup, and power conditioning into unified, high-reliability microgrid systems.
            </p>

            {/* Technology Partners Callout */}
            <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Technology Partnerships
                </span>
                <span className="text-xs font-bold text-blue-600">OEM Network</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 shadow-xs">
                  TATA EZ POWER
                </div>
                <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 shadow-xs">
                  Tier-1 Solar Inverter OEMs
                </div>
                <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 shadow-xs">
                  LiFePO4 Cell Manufacturers
                </div>
              </div>
            </div>
          </div>

          {/* Right: Key Facts Card */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-50 border border-slate-200/90 p-7 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-950 pb-4 border-b border-slate-200/70">
              Corporate Credentials
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Registered Office
                  </div>
                  <div className="font-semibold text-slate-900 mt-0.5">
                    A3/55, Sector 15, Rohini, Delhi – 110089
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Business Verticals
                  </div>
                  <div className="font-semibold text-slate-900 mt-0.5">
                    EV Charging · Solar Energy · Energy Storage · Power Solutions
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Direct Contact
                  </div>
                  <div className="font-semibold text-slate-900 mt-0.5">
                    +91 8178810456
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Official Email
                  </div>
                  <div className="font-semibold text-slate-900 mt-0.5">
                    vloxiasystems@gmail.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision, Mission & Commitment Grid */}
        <div className="mt-16 pt-16 border-t border-slate-100">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              What Guides Us
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
              Our Purpose &amp; Guiding Principles
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-950">Our Vision</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                To be India&apos;s most trusted integrated clean energy partner — enabling every home, enterprise, and institution to generate, store, and utilize energy sustainably.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-950">Our Mission</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                To deliver technology-led, tailored clean energy solutions across EV Charging, Solar, Storage, and Power — making renewable power dependable and economically compelling.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-950">Our Commitment</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Transparent recommendations, Tier-1 verified equipment, certified engineering installation, and proactive after-sales support for long-term operational peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. CINEMATIC DARK COMMUNITY CTA BANNER ─── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32">
        <div className="relative rounded-3xl bg-[#070b14] text-white p-8 sm:p-14 overflow-hidden border border-slate-800 shadow-2xl text-center">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-1 max-w-2xl mx-auto space-y-5">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Be Part of the Clean Energy Revolution
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Join thousands of homeowners, commercial enterprises, and fleet operators across India who trust VLOXIA to power their transition to sustainable clean energy.
            </p>
            <div className="pt-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white text-slate-950 font-bold text-sm hover:bg-slate-200 transition-all shadow-xl hover:scale-105 active:scale-95 group"
              >
                <span>Partner With VLOXIA</span>
                <span className="w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
