"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, PhoneCall, ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";

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
  accent: string;
  accordions: AccordionItem[];
}

const industriesData: Industry[] = [
  {
    id: "residential",
    title: "Residential & Societies",
    tagline: "Smart Home Energy & Private Charging",
    summary:
      "Seamless, user-centric clean energy ecosystems designed for homeowners and modern residential complexes.",
    image: "/Industries/Residential.png",
    badge: "Homes & Condos",
    accent: "from-blue-500/20 to-cyan-500/10",
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
    accent: "from-emerald-500/20 to-teal-500/10",
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
    accent: "from-amber-500/20 to-orange-500/10",
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
    accent: "from-blue-600/20 to-indigo-600/10",
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
    accent: "from-purple-500/20 to-indigo-500/10",
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

export default function IndustriesPage() {
  // Active accordion index per industry section (default to item 1 or 0 open)
  const [openItems, setOpenItems] = useState<Record<string, number | null>>({
    residential: 1,
    commercial: 1,
    industrial: 1,
    mobility: 0,
    institutional: 0,
  });

  const toggleAccordion = (industryId: string, index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [industryId]: prev[industryId] === index ? null : index,
    }));
  };

  return (
    <main className="min-h-screen bg-[#070b14] text-slate-100 overflow-hidden relative selection:bg-blue-600 selection:text-white">
      {/* Background ambient radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-600/15 via-indigo-600/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-[800px] left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-[1800px] right-0 w-[600px] h-[600px] bg-indigo-500/10 blur-[160px] pointer-events-none" />
      <div className="absolute top-[2800px] left-1/4 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] pointer-events-none" />

      {/* Hero Header Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-medium tracking-wide uppercase mb-6 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-blue-400" />
          Industry-Specific Clean Power Solutions
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
          Our Industries
        </h1>

        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
          We engineer world-class clean energy and EV charging ecosystems tailored to your sector.
          From strategic planning to turnkey commissioning, we power India&apos;s premier enterprises,
          homes, and fleets with unmatched precision.
        </p>
      </section>

      {/* Alternating Zig-Zag Content Sections */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-24 sm:space-y-36">
        {industriesData.map((ind, idx) => {
          const isReversed = idx % 2 === 1;

          return (
            <div
              key={ind.id}
              id={ind.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                isReversed ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Text & Accordions Column */}
              <div
                className={`lg:col-span-6 space-y-6 ${
                  isReversed ? "lg:col-start-7" : ""
                }`}
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
                    {ind.badge}
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                    {ind.title}
                  </h2>
                  <p className="text-sm font-medium text-blue-400/90 mt-1">
                    {ind.tagline}
                  </p>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed mt-3">
                    {ind.summary}
                  </p>
                </div>

                {/* Accordion List */}
                <div className="space-y-3 pt-2">
                  {ind.accordions.map((item, accIdx) => {
                    const isOpen = openItems[ind.id] === accIdx;

                    return (
                      <div
                        key={accIdx}
                        className={`rounded-xl border transition-all duration-300 ${
                          isOpen
                            ? "bg-slate-900/80 border-blue-500/40 shadow-lg shadow-blue-950/40"
                            : "bg-slate-900/30 border-white/5 hover:border-white/15 hover:bg-slate-900/50"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleAccordion(ind.id, accIdx)}
                          className="w-full flex items-center justify-between text-left p-4 sm:p-5 gap-4"
                          aria-expanded={isOpen}
                        >
                          <span
                            className={`text-sm sm:text-base font-semibold tracking-wide transition-colors ${
                              isOpen ? "text-white" : "text-slate-300 hover:text-white"
                            }`}
                          >
                            {item.title}
                          </span>
                          <span
                            className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 ${
                              isOpen
                                ? "bg-blue-600/30 text-blue-400 rotate-180"
                                : "bg-white/5 text-slate-400"
                            }`}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </span>
                        </button>

                        {/* Accordion Body */}
                        {isOpen && (
                          <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-0 text-sm text-slate-400 border-t border-white/5 mt-1 space-y-3">
                            <p className="leading-relaxed text-slate-300">
                              {item.desc}
                            </p>
                            {item.highlights && item.highlights.length > 0 && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                                {item.highlights.map((h, hIdx) => (
                                  <div
                                    key={hIdx}
                                    className="flex items-center gap-2 text-xs text-slate-300"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
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

                <div className="pt-2">
                  <Link
                    href={`/contact?industry=${ind.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold text-xs tracking-wide shadow-md shadow-blue-500/20 active:scale-95 transition-all group"
                  >
                    <span>Consult with an Industry Specialist</span>
                    <span className="w-4 h-4 rounded-full bg-white/20 text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Multi-Panel Collage / Image Column */}
              <div
                className={`lg:col-span-6 relative ${
                  isReversed ? "lg:col-start-1" : ""
                }`}
              >
                <div className="relative mx-auto max-w-lg lg:max-w-none">
                  {/* Glowing background halo */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-indigo-600/10 to-cyan-500/20 rounded-3xl blur-2xl opacity-60 -z-10" />

                  {/* Outer Main Container */}
                  <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900/60 shadow-2xl p-3 sm:p-4 backdrop-blur-sm">
                    {/* Primary Large Image */}
                    <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-xl overflow-hidden border border-white/10 group">
                      <Image
                        src={ind.image}
                        alt={`${ind.title} energy solution by VLOXIA`}
                        fill
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={idx === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                      {/* Top Overlay Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs font-semibold text-white shadow-lg">
                        <Zap className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
                        <span>VLOXIA {ind.badge}</span>
                      </div>

                      {/* Bottom Image Info */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-blue-400 font-semibold">
                            Engineering Standard
                          </p>
                          <p className="text-sm font-bold text-white">
                            Tier-1 Verified &amp; MNRE Compliant
                          </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-medium text-slate-200">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>5-Year SLA</span>
                        </div>
                      </div>
                    </div>

                    {/* Secondary Inset Layer Panel (Matching Reference Collage Style) */}
                    <div className="mt-3 grid grid-cols-3 gap-2.5">
                      <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 text-center">
                        <div className="text-base sm:text-lg font-bold text-white">
                          99.8%
                        </div>
                        <div className="text-[11px] text-slate-400">
                          System Uptime
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 text-center">
                        <div className="text-base sm:text-lg font-bold text-blue-400">
                          3–5 Yrs
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Payback ROI
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 text-center">
                        <div className="text-base sm:text-lg font-bold text-emerald-400">
                          100%
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Turnkey EPC
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Bottom Call-To-Action Card (Matching Reference Design) */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-950/70 via-slate-900/90 to-blue-950/80 border border-blue-500/30 p-8 sm:p-14 overflow-hidden backdrop-blur-xl shadow-2xl">
          {/* Subtle ambient decorative gradient ball */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Let&apos;s Power Something Amazing Together!
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-300">
                Connect with our senior clean energy architects to design, engineer, and deploy your custom solution.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105 active:scale-95 transition-all duration-300 group"
              >
                <span>To Schedule a Call</span>
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="w-4 h-4 text-white" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
