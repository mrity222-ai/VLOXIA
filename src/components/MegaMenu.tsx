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
      
      onMouseLeave={onClose}
    >
      <div >
        <div >
          
          {/* ── LEFT VERTICAL CATEGORY TABS (4 Cols) ── */}
          <div >
            <div >
              Solution Verticals
            </div>

            {CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCategoryId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                  onMouseEnter={() => setActiveCategoryId(cat.id)}
                  
                >
                  <span>{cat.name}</span>
                  <ArrowRight
                    
                  />
                </button>
              );
            })}

            <div >
              <Link
                href="/shop"
                onClick={onClose}
                
              >
                <span>Browse Clean Energy Marketplace</span>
                <ArrowUpRight  />
              </Link>
            </div>
          </div>

          {/* ── RIGHT DYNAMIC VISUAL CARDS GRID (8 Cols) ── */}
          <div >
            <div>
              {/* Category Subheading */}
              <div >
                <span >
                  {activeCategory.name}
                </span>
                <h3 >
                  {activeCategory.tagline}
                </h3>
              </div>

              {/* 4 Cards Grid */}
              <div >
                {activeCategory.items.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={onClose}
                      
                    >
                      <div>
                        <div >
                          <div >
                            <Icon  />
                          </div>
                          {item.badge && (
                            <span >
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <h4 >
                          {item.title}
                        </h4>
                        <p >
                          {item.description}
                        </p>
                      </div>

                      <div >
                        <span>Explore Solution</span>
                        <ArrowRight  />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Bottom Strip */}
            <div >
              <span>Backed by Tata EZ Power & certified OEM technology</span>
              <Link
                href="/contact"
                onClick={onClose}
                
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
