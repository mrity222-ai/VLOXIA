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
    title: "Intelligent Power Distribution",
    desc: "Smart load management balances dynamic power to prevent grid overload and ensure peak efficiency.",
  },
  {
    icon: Sliders,
    title: "Multi-Vehicle Compatibility",
    desc: "Seamless connectivity for every electric vehicle with Type 2, CCS2, and custom fleet configurations.",
  },
  {
    icon: Fuel,
    title: "Sustainable & Efficient Design",
    desc: "Built with eco-friendly components and robust thermal management for optimal durability.",
  },
];

export default function AcDcChargerShowcase() {
  const [activeTab, setActiveTab] = useState<"ac" | "dc">("ac");
  const current = models[activeTab];

  const handlePrev = () => setActiveTab((prev) => (prev === "ac" ? "dc" : "ac"));
  const handleNext = () => setActiveTab((prev) => (prev === "ac" ? "dc" : "ac"));

  return (
    <section className="py-20 lg:py-28 bg-[#ffffff] text-[#0a1628] select-none relative overflow-hidden border-b border-gray-150">
      <div className="container-xl max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* ── TOP SECTION: WATERMARK BACKGROUND & SPLIT CONTENT ── */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Huge Faint Watermark Text in Background (Matches Reference Exactly) */}
          <div
            aria-hidden="true"
            className="absolute -top-10 left-0 right-0 text-center font-black text-6xl sm:text-8xl md:text-9xl text-gray-100/70 tracking-tighter uppercase pointer-events-none select-none z-0"
          >
            {current.watermark}
          </div>

          {/* Left Column: Big Product Image & Visual Accents */}
          <div className="lg:col-span-6 relative z-10 flex flex-col items-center">
            {/* Ambient Backlight Glow */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-blue-500/10 blur-3xl -z-10 pointer-events-none" />

            <div className="relative w-full max-w-md sm:max-w-lg aspect-square flex items-center justify-center p-6">
              <Image
                src={current.image}
                alt={current.title}
                width={520}
                height={520}
                className="object-contain drop-shadow-[0_20px_35px_rgba(0,102,255,0.18)] transition-all duration-500 hover:scale-105"
                priority
              />

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md border border-gray-200 px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#0066ff] animate-ping" />
                <span className="text-xs font-bold text-[#0a1628] uppercase tracking-wider">
                  {current.powerRating}
                </span>
              </div>
            </div>

            {/* Quick 4-Grid Key Specs Strip */}
            <div className="w-full max-w-lg grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-2">
              {current.specs.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-[#fafbfb] border border-gray-150 rounded-xl p-2.5 text-center shadow-2xs"
                >
                  <div className="text-[10px] text-gray-600 font-semibold uppercase tracking-wider">
                    {s.label}
                  </div>
                  <div className="text-xs font-black text-[#0a1628] mt-0.5 truncate">
                    {s.val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Content & Description */}
          <div className="lg:col-span-6 relative z-10 space-y-6">
            
            {/* Category Subtitle Pill */}
            <div className="flex items-center gap-3">
              <span className="inline-block px-3.5 py-1 rounded-md bg-blue-50 text-[#0066ff] text-xs font-black uppercase tracking-wider border border-blue-100">
                Charging Infrastructure
              </span>
              <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                CEIG &amp; ARAI Certified
              </span>
            </div>

            {/* Main Header */}
            <div>
              <h2 className="text-3xl sm:text-5xl font-black text-[#0a1628] tracking-tight uppercase leading-none">
                {current.title}
              </h2>
              <p className="text-sm sm:text-base font-semibold text-[#0066ff] mt-2">
                {current.tagline}
              </p>
            </div>

            {/* Paragraph */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {current.description}
            </p>

            {/* Bullet Points */}
            <div className="space-y-2.5 pt-1">
              {current.bulletPoints.map((pt, index) => (
                <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#0066ff] flex-shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            {/* Carousel Control Arrows & Actions with Voltix Button */}
            <div className="flex items-center gap-4 pt-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Charger"
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-[#0a1628] flex items-center justify-center transition-all shadow-xs hover:scale-105 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Charger"
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-[#0a1628] flex items-center justify-center transition-all shadow-xs hover:scale-105 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Voltix Electric Blue Pill Button */}
              <Link
                href="/shop"
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-200 group"
              >
                <span>View Models in Shop</span>
                <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── BOTTOM 4 FEATURE CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16 sm:mt-20">
          {featureCards.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="group bg-[#fafbfb] hover:bg-white rounded-2xl border border-gray-150 hover:border-gray-300 p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/80 group-hover:border-[#0066ff] flex items-center justify-center text-gray-700 group-hover:text-[#0066ff] group-hover:bg-blue-50 transition-colors mb-5 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-sm font-bold text-[#0a1628] tracking-tight group-hover:text-[#0066ff] transition-colors leading-snug">
                    {feat.title}
                  </h3>

                  <p className="text-[11px] text-gray-600 leading-relaxed mt-2.5">
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
