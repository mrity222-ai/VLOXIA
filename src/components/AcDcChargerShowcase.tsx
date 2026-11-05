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
    <section>
      <div>
        
        {/* ── TOP SECTION: WATERMARK BACKGROUND & SPLIT CONTENT ── */}
        <div>
          
          {/* Huge Faint Watermark Text in Background (Matches Reference Exactly) */}
          <div
            aria-hidden="true"

          >
            {current.watermark}
          </div>

          {/* Left Column: Big Product Image & Visual Accents */}
          <div>
            {/* Ambient Backlight Glow */}
            <div />

            <div>
              <Image
                src={current.image}
                alt={current.title}
                width={520}
                height={520}

                priority
              />

              {/* Badges Overlay */}
              <div>
                <span />
                <span>
                  {current.powerRating}
                </span>
              </div>
            </div>

            {/* Quick 4-Grid Key Specs Strip */}
            <div>
              {current.specs.map((s, idx) => (
                <div
                  key={idx}

                >
                  <div>
                    {s.label}
                  </div>
                  <div>
                    {s.val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Content & Description */}
          <div>
            
            {/* Category Subtitle Pill */}
            <div>
              <span>
                Charging Infrastructure
              </span>
              <span>
                <ShieldCheck />
                CEIG &amp; ARAI Certified
              </span>
            </div>

            {/* Main Header */}
            <div>
              <h2>
                {current.title}
              </h2>
              <p>
                {current.tagline}
              </p>
            </div>

            {/* Paragraph */}
            <p>
              {current.description}
            </p>

            {/* Bullet Points */}
            <div>
              {current.bulletPoints.map((pt, index) => (
                <div key={index}>
                  <CheckCircle2 />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            {/* Carousel Control Arrows & Actions with Voltix Button */}
            <div>
              <div>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Charger"

                >
                  <ArrowLeft />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Charger"

                >
                  <ArrowRight />
                </button>
              </div>

              {/* Voltix Electric Blue Pill Button */}
              <Link
                href="/shop"

              >
                <span>View Models in Shop</span>
                <span>
                  <ArrowRight />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── BOTTOM 4 FEATURE CARDS ── */}
        <div>
          {featureCards.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}

              >
                <div>
                  <div>
                    <Icon />
                  </div>

                  <h3>
                    {feat.title}
                  </h3>

                  <p>
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
