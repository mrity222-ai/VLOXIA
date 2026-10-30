"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Zap, Cpu, Sliders, Fuel, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

interface ChargerModel {
  id: "ac" | "dc";
  watermark: string;
  title: string;
  powerRating: string;
  tagline: string;
  description: string;
  image: string;
  specs: { label: string; val: string }[];
  bulletPoints: string[];
}

const models: Record<"ac" | "dc", ChargerModel> = {
  ac: {
    id: "ac",
    watermark: "VLOXIA EV CHARGE",
    title: "AC EV CHARGE",
    powerRating: "3.3 kW – 22 kW Smart Wallbox",
    tagline: "Efficient, Compact & Reliable Home & Workplace Charging",
    description:
      "Our AC EV charging solutions are designed to provide efficient, fast, and convenient charging for all types of electric vehicles, ensuring that you stay powered up and ready to go.",
    image: "/ev-wallbox-hd.png",
    specs: [
      { label: "Output Power", val: "7.4 kW / 11 kW / 22 kW" },
      { label: "Connector", val: "Type 2 Gun (IEC 62196)" },
      { label: "Connectivity", val: "WiFi / Bluetooth / 4G / RFID" },
      { label: "Protection", val: "IP65 Weatherproof & IK10" },
    ],
    bulletPoints: [
      "Compatible with all Indian & International 4-wheelers & 2-wheelers",
      "Dynamic load balancing with scheduled overnight charging",
      "Compact wall-mount or freestanding pedestal options",
    ],
  },
  dc: {
    id: "dc",
    watermark: "VLOXIA DC FAST",
    title: "DC FAST CHARGE",
    powerRating: "30 kW – 120 kW+ High Power",
    tagline: "Commercial Highway Corridors & Fleet Rapid Turnaround",
    description:
      "Our DC fast charging solutions deliver ultra-rapid energy transfer for commercial fleets, highways, and public hubs, charging electric vehicles to 80% in under 30 minutes with dynamic multi-gun load sharing.",
    image: "/ev-wallbox-hd.png",
    specs: [
      { label: "Output Power", val: "30 kW / 60 kW / 120 kW+" },
      { label: "Connectors", val: "Dual CCS2 / CHAdeMO / GB/T" },
      { label: "Efficiency", val: "≥ 95.5% Peak Efficiency" },
      { label: "Smart Billing", val: "OCPP 1.6J / 2.0.1 Cloud CMS" },
    ],
    bulletPoints: [
      "Ultra-fast charging: 20% to 80% state-of-charge in ~25 minutes",
      "Dynamic power sharing between dual guns for simultaneous charging",
      "Integrated emergency shutdown, surge protection & surge arrestor",
    ],
  },
};

const featureCards = [
  {
    icon: Zap,
    title: "Fast Charging Performance",
    desc: "Deliver rapid energy transfer designed to minimize charging time and maximize convenience.",
  },
  {
    icon: Cpu,
    title: "Smart Energy Management",
    desc: "Optimized power distribution ensures efficient charging performance while maintaining system stability.",
  },
  {
    icon: Sliders,
    title: "Universal Compatibility",
    desc: "Supports multiple EV connector standards for broader vehicle compatibility and easier accessibility.",
  },
  {
    icon: Fuel,
    title: "Safe & Certified Protection",
    desc: "Comprehensive safety mechanisms including surge protection, thermal monitoring, and IP-rated weatherproofing.",
  },
];

export default function AcDcChargerShowcase() {
  const [activeTab, setActiveTab] = useState<"ac" | "dc">("ac");
  const model = models[activeTab];

  const handlePrev = () => {
    setActiveTab(activeTab === "ac" ? "dc" : "ac");
  };

  const handleNext = () => {
    setActiveTab(activeTab === "ac" ? "dc" : "ac");
  };

  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-20 border-b border-gray-100 select-none">
      {/* ── BACKGROUND GHOST WATERMARK (Matches Reference Screenshot) ── */}
      <div className="absolute top-6 left-0 right-0 flex justify-center pointer-events-none z-0 overflow-hidden opacity-40 select-none">
        <span className="text-[60px] sm:text-[105px] md:text-[145px] lg:text-[175px] font-black tracking-widest text-gray-200/60 uppercase leading-none whitespace-nowrap">
          {model.watermark}
        </span>
      </div>

      <div className="container-xl max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        {/* ── TOP TOGGLE TABS ── */}
        <div className="flex items-center justify-center gap-3 mb-8 sm:mb-12">
          <button
            type="button"
            onClick={() => setActiveTab("ac")}
            className={`px-5 py-2 rounded-full text-xs font-black tracking-wider uppercase transition-all ${
              activeTab === "ac"
                ? "bg-[#0a1628] text-white shadow-md"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            AC EV Chargers
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("dc")}
            className={`px-5 py-2 rounded-full text-xs font-black tracking-wider uppercase transition-all ${
              activeTab === "dc"
                ? "bg-[#0a1628] text-white shadow-md"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            DC Fast Chargers
          </button>
        </div>

        {/* ── CENTER PRODUCT SHOWCASE & DETAILS (Matches Reference Layout) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[380px]">
          {/* Center-Left: Charger Visual with Cable & Gun */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            <div className="relative w-[280px] sm:w-[360px] md:w-[420px] aspect-[3/4] flex items-center justify-center">
              {/* Soft Radial Backlight */}
              <div className="absolute inset-0 bg-radial from-blue-100/40 via-transparent to-transparent rounded-full filter blur-xl pointer-events-none" />

              {/* Realistic Wallbox Charger */}
              <Image
                src={model.image}
                alt={model.title}
                fill
                priority
                className="object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Sub-badge below image */}
            <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-600 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#2563eb]" />
              <span>{model.powerRating}</span>
            </div>
          </div>

          {/* Right Column: Title, Description & Carousel Arrows */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#2563eb] bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                {activeTab === "ac" ? "Home & Commercial" : "Corridor & Fleet Hub"}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0a1628] tracking-tight uppercase mt-3">
                {model.title}
              </h2>
            </div>

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-lg">
              {model.description}
            </p>

            {/* Mini Specs Pill Grid */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              {model.specs.map((s, i) => (
                <div key={i} className="bg-gray-50/80 border border-gray-150 rounded-lg p-2.5">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                    {s.label}
                  </div>
                  <div className="text-xs font-extrabold text-[#0a1628] mt-0.5">
                    {s.val}
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Control Arrows & Actions (Matches Reference Circle Buttons) */}
            <div className="flex items-center gap-4 pt-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Charger"
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-[#0a1628] flex items-center justify-center transition-all shadow-xs hover:scale-105"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Charger"
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-[#0a1628] flex items-center justify-center transition-all shadow-xs hover:scale-105"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs shadow-md shadow-[#2563eb]/20 transition-all"
              >
                <span>View Models in Shop</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── BOTTOM 4 FEATURE CARDS (Matches Reference Screenshot Exactly) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16 sm:mt-20">
          {featureCards.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="group bg-[#fafbfb] hover:bg-white rounded-2xl border border-gray-150 hover:border-gray-300 p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Square icon box */}
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/80 group-hover:border-[#2563eb] flex items-center justify-center text-gray-700 group-hover:text-[#2563eb] group-hover:bg-blue-50 transition-colors mb-5 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-sm font-bold text-[#0a1628] tracking-tight group-hover:text-[#2563eb] transition-colors leading-snug">
                    {feat.title}
                  </h3>

                  <p className="text-[11px] text-gray-500 leading-relaxed mt-2.5">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
