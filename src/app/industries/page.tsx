"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Zap,
  Building2,
  Factory,
  Car,
  HeartPulse,
} from "lucide-react";

interface AccordionItem {
  title: string;
  desc: string;
  highlights?: string[];
}

interface Industry {
  id: string;
  title: string;
  tagline: string;
  summary: string;
  image: string;
  badge: string;
  icon: any;
  accordions: AccordionItem[];
}

const industriesData: Industry[] = [
  {
    id: "residential",
    title: "Residential & Societies",
    tagline: "Smart Home Energy & Private Charging",
    summary:
      "Seamless, user-centric clean energy ecosystems designed for homeowners, apartment communities, and modern residential societies.",
    image: "/Industries/Residential.png",
    badge: "Homes & Condos",
    icon: Building2,
    accordions: [
      {
        title: "Rooftop Solar & Hybrid Inverters",
        desc: "High-efficiency Tier-1 monocrystalline panels paired with hybrid smart inverters for maximum rooftop solar yield and net-metering benefits.",
        highlights: ["1 kW to 10 kW residential setups", "Up to 80% grid bill reduction", "MNRE subsidy compliant"],
      },
      {
        title: "Smart Home EV Wallbox Charging",
        desc: "Type-2 smart wallbox AC chargers with automated night-time load balancing, RFID access control, and smartphone app scheduling.",
        highlights: ["7.4 kW / 11 kW fast home charging", "Dynamic phase balancing", "Weatherproof IP65 enclosure"],
      },
      {
        title: "Lithium Energy Storage (BESS) Backup",
        desc: "Compact modular LiFePO4 battery storage delivering seamless instant switchover during power outages without diesel genset pollution.",
        highlights: ["Modular 5 kWh to 20 kWh stacks", "6,000+ cycle life warranty", "Zero maintenance & zero noise"],
      },
      {
        title: "Housing Society Microgrids & Shared Bays",
        desc: "Turnkey multi-tenant EV charging bays with automated billing per apartment and shared rooftop solar for common area lighting.",
        highlights: ["OCPP 1.6J compliant backend", "Individual tenant sub-metering", "Automated revenue settlement"],
      },
    ],
  },
  {
    id: "commercial",
    title: "Commercial & Corporate",
    tagline: "Workplaces, Retail & Hospitality",
    summary:
      "Transform your commercial real estate into a high-efficiency green hub with integrated solar and destination EV amenities.",
    image: "/Industries/Commercial.png",
    badge: "Office & Retail",
    icon: Building2,
    accordions: [
      {
        title: "Commercial Solar EPC (10 kW – 500 kW)",
        desc: "Turnkey solar rooftop and carport canopy installations engineered to drastically reduce daytime commercial grid tariffs and improve ESG metrics.",
        highlights: ["Accelerated depreciation benefits", "Custom elevated canopy structures", "25-year performance warranty"],
      },
      {
        title: "Workplace & Retail EV Charging Bays",
        desc: "Dual-gun AC chargers and rapid DC chargers designed for corporate parking, shopping malls, hotels, and public-facing amenities.",
        highlights: ["Dual 22 kW AC fast charging", "Credit card / UPI payment gateway", "Custom tenant & visitor tariffs"],
      },
      {
        title: "Peak Shaving & Demand Management",
        desc: "Strategic battery storage integration that mitigates peak commercial demand surcharges (kVAh billing) and stabilizes campus power factor.",
        highlights: ["Automated peak-shaving algorithms", "Power factor correction to 0.99", "Grid stabilization"],
      },
      {
        title: "Real-time IoT Energy Management & Analytics",
        desc: "Cloud-connected dashboard providing granular visibility into building consumption, solar generation, EV revenue, and carbon offsets.",
        highlights: ["Live power quality monitoring", "Automated compliance reporting", "Predictive maintenance alerts"],
      },
    ],
  },
  {
    id: "industrial",
    title: "Industrial & Manufacturing",
    tagline: "Factories, Warehouses & Heavy Plants",
    summary:
      "Heavy-duty power engineering built for demanding manufacturing operations, high inductive loads, and 24/7 uptime.",
    image: "/Industries/Industrial.png",
    badge: "Manufacturing & Warehouses",
    icon: Factory,
    accordions: [
      {
        title: "MW-Scale Industrial Solar Parks",
        desc: "Megawatt-scale ground-mount and shed rooftop solar engineered to offset massive industrial power tariffs with robust HT grid synchronization.",
        highlights: ["100 kW to Multi-MW scale", "Bespoke shed roof mounting systems", "Zero export safety controllers"],
      },
      {
        title: "High-Capacity BESS for Peak Shaving & UPS",
        desc: "Containerized utility-scale battery energy storage systems (BESS) designed for microsecond critical load pickup and tariff arbitrage.",
        highlights: ["Containerized LiFePO4 architecture", "Sub-second grid failover", "Demand charge reduction"],
      },
      {
        title: "Industrial EV Fleet & Material Handling Charging",
        desc: "Heavy-duty charging bays engineered for electric forklifts, automated guided vehicles (AGVs), and industrial factory transport fleets.",
        highlights: ["Heavy-duty continuous duty cycle", "Fast turnaround charging", "Robust surge protection"],
      },
      {
        title: "Power Quality, Harmonics & Voltage Stabilization",
        desc: "Active harmonic filters and dynamic voltage regulation systems ensuring sensitive manufacturing machinery operates without downtime.",
        highlights: ["Active harmonic filtering (IEEE 519)", "Dynamic reactive power compensation", "Transient surge suppression"],
      },
    ],
  },
  {
    id: "mobility",
    title: "Mobility & Fleet Logistics",
    tagline: "Depots, Logistics Hubs & Public Fleets",
    summary:
      "Turnkey charging and power infrastructure tailored for electric delivery fleets, buses, taxi networks, and logistics operators.",
    image: "/Industries/Mobility.png",
    badge: "Fleets & Transit",
    icon: Car,
    accordions: [
      {
        title: "Fleet Depot DC Fast Charging (60 kW – 240 kW)",
        desc: "Ultra-fast dual-gun DC chargers with CCS2 connectors engineered for overnight depot charging and rapid turnaround daytime top-ups.",
        highlights: ["Dual-gun simultaneous fast charging", "Dynamic smart load distribution", "High efficiency > 95%"],
      },
      {
        title: "Automated Fleet Telematics & Scheduling",
        desc: "Smart fleet management integration connecting battery status, dispatch schedules, and depot charging queues to eliminate bottlenecks.",
        highlights: ["Automated off-peak charge scheduling", "SOC threshold monitoring", "Driver authentication"],
      },
      {
        title: "Dedicated High-Tension Substation Infrastructure",
        desc: "End-to-end electrical substation planning, step-down transformers, switchgear, and safety clearances for high-capacity fleet depots.",
        highlights: ["11kV / 33kV substation engineering", "HT panel & breaker synchronization", "DISCOM liaisoning support"],
      },
      {
        title: "Solar-Powered Fleet Hubs & Zero-Emission Depots",
        desc: "Integrated solar canopy charging hubs that combine clean energy generation directly with electric fleet depot charging operations.",
        highlights: ["100% green fleet verification", "Shaded solar fleet parking", "Lowest levelized cost of energy"],
      },
    ],
  },
  {
    id: "institutional",
    title: "Institutional & Healthcare",
    tagline: "Hospitals, Campuses & Government Facilities",
    summary:
      "Mission-critical resilience and zero-failure clean power engineered for life safety, public facilities, and educational institutes.",
    image: "/Industries/Institutional.png",
    badge: "Critical Infrastructure",
    icon: HeartPulse,
    accordions: [
      {
        title: "Critical Healthcare Uninterrupted Power (UPS + BESS)",
        desc: "True zero-transfer time power continuity for surgical suites, ICUs, diagnostic labs, and life-support medical electronics.",
        highlights: ["Zero-millisecond switchover", "Redundant dual-inverter topology", "Clean medical-grade sine wave output"],
      },
      {
        title: "Green Campus Solar EPC (Universities & Schools)",
        desc: "Large-scale educational campus solar installations generating long-term electricity savings while serving as active clean energy learning labs.",
        highlights: ["Campus rooftop & ground-mount solar", "Educational display dashboards", "Substantial operational cost savings"],
      },
      {
        title: "Public Sector & Government CAPEX/OPEX Deployments",
        desc: "Fully compliant public sector procurement with flexible CAPEX, RESCO / OPEX, and hybrid government financing models.",
        highlights: ["GeM portal compliance", "MNRE tender specifications", "Dedicated SLA & O&M coverage"],
      },
      {
        title: "Central & State Subsidy Policy Navigation",
        desc: "Comprehensive regulatory liaisoning, net-metering approvals, CEIG safety clearances, and institutional subsidy processing.",
        highlights: ["End-to-end CEIG approvals", "DISCOM net-metering execution", "Government subsidy claim management"],
      },
    ],
  },
];

const SECTOR_BENEFITS = [
  {
    icon: ShieldCheck,
    title: "High Inductive Load Engineering",
    desc: "Engineered specifically for heavy factories and machinery, eliminating voltage dips and equipment tripping.",
  },
  {
    icon: Zap,
    title: "OCPP 1.6J/2.0.1 Cloud CMS",
    desc: "Complete remote telemetry, tenant billing, dynamic load balancing, and real-time charger status monitoring.",
  },
  {
    icon: HeartPulse,
    title: "Sub-Second Critical Power & BESS",
    desc: "Microsecond transfer systems providing zero-downtime backup for hospitals, data rooms, and surgical suites.",
  },
  {
    icon: CheckCircle2,
    title: "CEIG & DISCOM Compliance",
    desc: "End-to-end liaisoning for electrical safety clearance, high-tension synchronization, and net-metering approvals.",
  },
];

export default function IndustriesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState(0);

  const currentIndustry = industriesData[activeTab];

  return (
    <div className="bg-white text-slate-900 font-sans antialiased">
      
      {/* ── 1. HERO SECTION (EDITORIAL REFERENCE STYLE) ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Subtitle & Action Buttons */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
              <span>Industry-Specific Solutions</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-slate-950 leading-[1.15]">
              Clean energy ecosystems engineered for your industry
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              From strategic planning to turnkey commissioning, we power India&apos;s premier enterprises, homes, and fleets with unmatched precision and safety.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#sector-navigator"
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-full transition-all shadow-md shadow-blue-500/25 text-sm active:scale-95"
              >
                <span>Explore Sectors</span>
                <span className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-gray-300 text-slate-800 font-semibold hover:border-gray-400 hover:bg-slate-50 transition-all text-sm"
              >
                Request Sector Audit
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic / Image */}
          <div className="lg:col-span-5">
            <div className="relative w-full h-[360px] sm:h-[420px] rounded-3xl overflow-hidden shadow-sm border border-gray-100">
              <Image
                src="/Industries/Industrial.png"
                alt="Industrial & Commercial Clean Energy Infrastructure"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                  5 Specialized Verticals
                </span>
                <p className="text-sm font-medium mt-1 text-slate-100">
                  Residential · Commercial · Industrial · Mobility · Institutional
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. "WHY SHOULD YOU PARTNER?" / SECTOR ADVANTAGES (2x2 GRID WITH BLUE BADGES) ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 border-t border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950">
              Why Choose <span className="text-blue-600 font-bold">Sector-Specific Engineering?</span>
            </h2>
          </div>
          <p className="text-slate-500 text-sm sm:text-base max-w-md leading-relaxed">
            Gain a deeper understanding of features customized according to your site&apos;s load characteristics, regulatory guidelines, and duty cycle.
          </p>
        </div>

        {/* 2x2 Grid with blue badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SECTOR_BENEFITS.map((benefit, idx) => {
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

      {/* ── 3. INTERACTIVE SECTOR NAVIGATOR & ACCORDIONS SECTION ── */}
      <section id="sector-navigator" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 border-t border-gray-100">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70 mb-4">
            <span>Sector Navigator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950">
            Select Your <span className="text-blue-600 font-bold">Industry Vertical</span>
          </h2>
        </div>

        {/* Horizontal Industry Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-gray-200 scrollbar-none">
          {industriesData.map((ind, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={ind.id}
                onClick={() => {
                  setActiveTab(idx);
                  setActiveAccordion(0);
                }}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {ind.title}
              </button>
            );
          })}
        </div>

        {/* Active Industry Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Active Industry Overview & Image */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <Image
                src={currentIndustry.image}
                alt={currentIndustry.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-xs">
                {currentIndustry.badge}
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {currentIndustry.tagline}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-950">
                {currentIndustry.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {currentIndustry.summary}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors"
              >
                <span>Request Custom {currentIndustry.title} Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Numbered 01-04 Accordions for Active Industry */}
          <div className="lg:col-span-7 space-y-4">
            {currentIndustry.accordions.map((acc, idx) => {
              const isActive = activeAccordion === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveAccordion(idx)}
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
                        0{idx + 1}
                      </span>
                      <h4 className={`text-base sm:text-lg font-bold ${
                        isActive ? "text-white" : "text-slate-950"
                      }`}>
                        {acc.title}
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
                    <div className="mt-4 pl-11 pt-3 border-t border-white/20 space-y-3">
                      <p className="text-sm text-blue-50 leading-relaxed">
                        {acc.desc}
                      </p>

                      {acc.highlights && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                          {acc.highlights.map((h, hIdx) => (
                            <div key={hIdx} className="flex items-center gap-2 text-xs font-medium text-white">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-200 shrink-0" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 4. BOTTOM DARK CTA BANNER ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="rounded-3xl bg-[#111827] text-white p-8 sm:p-14 lg:p-16 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Sector Consulting
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
              Speak with Our <span className="text-blue-400 font-bold">Industry Engineering Desk</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Whether you are architecting a multi-tenant residential EV microgrid or an industrial megawatt solar installation, our senior engineers provide complete feasibility and single-line design.
            </p>
            <div className="pt-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-full transition-all text-sm shadow-lg shadow-blue-500/25 active:scale-95"
              >
                <span>Book a Sector Consultation</span>
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
