"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Sun,
  Battery,
  Power,
  Building2,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface MenuItem {
  title: string;
  badge?: string;
  description: string;
  href: string;
  icon: any;
}

interface CategoryGroup {
  id: string;
  name: string;
  tagline: string;
  items: MenuItem[];
}

const CATEGORIES: CategoryGroup[] = [
  {
    id: "ev-charging",
    name: "EV Charging Solutions",
    tagline: "AC & DC Fast Charging Infrastructure for all mobility applications",
    items: [
      {
        title: "AC EV Chargers",
        badge: "3.3 kW – 22 kW",
        description: "Residential, apartments, workplaces, hotels & commercial destination parking.",
        href: "/solutions/ev-charging",
        icon: Zap,
      },
      {
        title: "DC Fast Chargers",
        badge: "30 kW – 120 kW+",
        description: "Public highway corridors, fleet hubs, auto dealerships & rapid transit.",
        href: "/solutions/ev-charging",
        icon: Zap,
      },
      {
        title: "Fleet & Commercial Depots",
        badge: "Dual Gun & CMS",
        description: "High-utilisation logistics fleet charging, OCPP cloud billing & dynamic load balancing.",
        href: "/solutions/ev-charging",
        icon: Building2,
      },
      {
        title: "Buy Chargers Online",
        badge: "E-Commerce",
        description: "Order certified EV smart wallbox chargers with instant Razorpay checkout.",
        href: "/shop",
        icon: Sparkles,
      },
    ],
  },
  {
    id: "solar-energy",
    name: "Solar Energy Solutions",
    tagline: "Turn sunlight into sustainable, cost-effective power",
    items: [
      {
        title: "Residential Rooftop Solar",
        badge: "1 kW – 10 kW",
        description: "Grid-tied solar systems for independent homes and housing societies.",
        href: "/solutions/solar-energy",
        icon: Sun,
      },
      {
        title: "Commercial & Industrial Solar",
        badge: "10 kW – 1 MW+",
        description: "Substantial electricity bill reduction with CAPEX / OPEX solar setups.",
        href: "/solutions/solar-energy",
        icon: Building2,
      },
      {
        title: "Solar + Storage Solutions",
        badge: "Zero-Export Ready",
        description: "Generate ➔ Store ➔ Manage ➔ Consume for 24/7 solar independence.",
        href: "/solutions/solar-energy",
        icon: Battery,
      },
      {
        title: "Solar Energy Management",
        badge: "Smart Metering",
        description: "Real-time energy tracking, net-metering approvals and yield optimization.",
        href: "/solutions/solar-energy",
        icon: Sun,
      },
    ],
  },
  {
    id: "energy-storage",
    name: "Energy Storage & Lithium",
    tagline: "Compact, long-life LiFePO4 battery storage for power security",
    items: [
      {
        title: "Integrated Inverters with Lithium",
        badge: "All-in-One",
        description: "Hybrid inverter combined with lithium battery system in a compact wall unit.",
        href: "/solutions/energy-storage",
        icon: Battery,
      },
      {
        title: "Wall-Mount LiFePO4 Packs",
        badge: "5.12 kWh / 100Ah",
        description: "6,000+ cycle life, zero maintenance drop-in tubular battery replacement.",
        href: "/solutions/energy-storage",
        icon: Battery,
      },
      {
        title: "Commercial & Industrial BESS",
        badge: "20 kWh – MWh",
        description: "Peak shaving, demand charge reduction and critical industrial backup.",
        href: "/solutions/energy-storage",
        icon: Building2,
      },
      {
        title: "Buy Lithium Batteries",
        badge: "Marketplace",
        description: "Purchase 2.56 kWh and 5.12 kWh lithium storage packs online.",
        href: "/shop",
        icon: Sparkles,
      },
    ],
  },
  {
    id: "power-solutions",
    name: "Power Solutions",
    tagline: "Continuous, efficient and intelligent power continuity systems",
    items: [
      {
        title: "Inverter Solutions",
        badge: "Pure Sine Wave",
        description: "Advanced single and three-phase solar hybrid inverters with dual MPPT.",
        href: "/solutions/power-solutions",
        icon: Power,
      },
      {
        title: "Power Backup & UPS",
        badge: "< 10ms Switch",
        description: "Zero downtime power backup for clinics, retail and server hardware.",
        href: "/solutions/power-solutions",
        icon: Power,
      },
      {
        title: "Integrated Energy Solutions",
        badge: "Cross-Technology",
        description: "Combining solar, storage, and EV charging into one harmonised ecosystem.",
        href: "/solutions/power-solutions",
        icon: Zap,
      },
      {
        title: "Energy Audit & Management",
        badge: "Consultative",
        description: "Power factor correction, load profiling and customized energy planning.",
        href: "/approach",
        icon: CheckCircle2,
      },
    ],
  },
  {
    id: "industries",
    name: "Industries & Applications",
    tagline: "Specialised clean energy engineering tailored for every customer segment",
    items: [
      {
        title: "Residential Segments",
        badge: "Homes & Villas",
        description: "Energy independence for residential homeowners and apartments.",
        href: "/industries#residential",
        icon: Building2,
      },
      {
        title: "Commercial & Retail",
        badge: "Offices & Malls",
        description: "EV charging bays and solar systems for hotels, tech parks and corporate buildings.",
        href: "/industries#commercial",
        icon: Building2,
      },
      {
        title: "Industrial & Manufacturing",
        badge: "Plants & Corridors",
        description: "High-capacity solar, peak shaving BESS and factory EV fleet depots.",
        href: "/industries#industrial",
        icon: Building2,
      },
      {
        title: "Mobility & Institutional",
        badge: "Fleets & Hospitals",
        description: "Depot chargers for bus/transport fleets and critical institutional power.",
        href: "/industries#mobility",
        icon: Zap,
      },
    ],
  },
];

export default function MegaMenu({ onClose }: { onClose: () => void }) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("ev-charging");

  const activeCategory =
    CATEGORIES.find((c) => c.id === activeCategoryId) || CATEGORIES[0];

  return (
    <div
      className="site-mega-menu absolute top-full left-0 right-0 bg-[#040e1d]/98 backdrop-blur-2xl border-t border-b border-white/10 shadow-2xl transition-all duration-200 z-50 text-white"
      onMouseLeave={onClose}
    >
      <div className="container-xl py-8">
        <div className="grid grid-cols-12 gap-8">
          
          {/* ── LEFT VERTICAL CATEGORY TABS (4 Cols) ── */}
          <div className="col-span-12 lg:col-span-4 border-r border-white/10 pr-0 lg:pr-6 space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3 px-3">
              Solution Verticals
            </div>

            {CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCategoryId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                  onMouseEnter={() => setActiveCategoryId(cat.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? "bg-white/[0.08] text-[#2563eb] border-l-4 border-[#2563eb] shadow-md pl-3.5"
                      : "text-white/70 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span>{cat.name}</span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isActive ? "text-[#2563eb] translate-x-1" : "text-white/20"
                    }`}
                  />
                </button>
              );
            })}

            <div className="pt-6 px-3">
              <Link
                href="/shop"
                onClick={onClose}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#2563eb] hover:underline"
              >
                <span>Browse Clean Energy Marketplace</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* ── RIGHT DYNAMIC VISUAL CARDS GRID (8 Cols) ── */}
          <div className="col-span-12 lg:col-span-8 flex flex-col justify-between pl-0 lg:pl-2">
            <div>
              {/* Category Subheading */}
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563eb]">
                  {activeCategory.name}
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {activeCategory.tagline}
                </h3>
              </div>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeCategory.items.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={onClose}
                      className="group p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-[#2563eb]/40 transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-8 h-8 rounded-lg bg-[#2563eb]/15 border border-[#2563eb]/30 flex items-center justify-center text-[#2563eb] group-hover:scale-105 transition-transform">
                            <Icon className="w-4 h-4" />
                          </div>
                          {item.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/[0.06] text-[#2563eb] border border-white/10 uppercase">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-sm text-white group-hover:text-[#2563eb] transition-colors leading-tight mb-1.5">
                          {item.title}
                        </h4>
                        <p className="text-white/50 text-xs leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#2563eb] mt-4 opacity-75 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        <span>Explore Solution</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Bottom Strip */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
              <span>Backed by Tata EZ Power & certified OEM technology</span>
              <Link
                href="/contact"
                onClick={onClose}
                className="text-white hover:text-[#2563eb] font-semibold transition-colors"
              >
                Request Custom Site Assessment ↗
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
