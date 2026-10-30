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
    <section >
      {/* ── BACKGROUND GHOST WATERMARK (Matches Reference Screenshot) ── */}
      <div >
        <span >
          {model.watermark}
        </span>
      </div>

      <div >
        {/* ── TOP TOGGLE TABS ── */}
        <div >
          <button
            type="button"
            onClick={() => setActiveTab("ac")}
            
          >
            AC EV Chargers
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("dc")}
            
          >
            DC Fast Chargers
          </button>
        </div>

        {/* ── CENTER PRODUCT SHOWCASE & DETAILS (Matches Reference Layout) ── */}
        <div >
          {/* Center-Left: Charger Visual with Cable & Gun */}
          <div >
            <div >
              {/* Soft Radial Backlight */}
              <div  />

              {/* Realistic Wallbox Charger */}
              <Image
                src={model.image}
                alt={model.title}
                fill
                priority
                
              />
            </div>

            {/* Sub-badge below image */}
            <div >
              <span  />
              <span>{model.powerRating}</span>
            </div>
          </div>

          {/* Right Column: Title, Description & Carousel Arrows */}
          <div >
            <div>
              <span >
                {activeTab === "ac" ? "Home & Commercial" : "Corridor & Fleet Hub"}
              </span>
              <h2 >
                {model.title}
              </h2>
            </div>

            <p >
              {model.description}
            </p>

            {/* Mini Specs Pill Grid */}
            <div >
              {model.specs.map((s, i) => (
                <div key={i} >
                  <div >
                    {s.label}
                  </div>
                  <div >
                    {s.val}
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Control Arrows & Actions (Matches Reference Circle Buttons) */}
            <div >
              <div >
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Charger"
                  
                >
                  <ArrowLeft  />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Charger"
                  
                >
                  <ArrowRight  />
                </button>
              </div>

              <Link
                href="/shop"
                
              >
                <span>View Models in Shop</span>
                <ArrowRight  />
              </Link>
            </div>
          </div>
        </div>

        {/* ── BOTTOM 4 FEATURE CARDS (Matches Reference Screenshot Exactly) ── */}
        <div >
          {featureCards.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                
              >
                <div>
                  {/* Square icon box */}
                  <div >
                    <Icon  />
                  </div>

                  <h3 >
                    {feat.title}
                  </h3>

                  <p >
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
