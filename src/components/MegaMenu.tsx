"use client";

import React from "react";
import Link from "next/link";
import {
  Zap,
  Sun,
  Battery,
  Power,
  Building2,
  CarFront,
  ShoppingBag,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

interface MegaMenuProps {
  onClose: () => void;
}

const SERVICES_COLUMN_1 = [
  {
    title: "EV Fast Charging",
    href: "/solutions/ev-charging",
    icon: Zap,
  },
  {
    title: "Solar Rooftop EPC",
    href: "/solutions/solar-energy",
    icon: Sun,
  },
  {
    title: "Lithium Energy Storage",
    href: "/solutions/energy-storage",
    icon: Battery,
  },
  {
    title: "Commercial Microgrids",
    href: "/industries#commercial",
    icon: Building2,
  },
];

const SERVICES_COLUMN_2 = [
  {
    title: "Hybrid Inverters & UPS",
    href: "/solutions/power-solutions",
    icon: Power,
  },
  {
    title: "Fleet Charging Depots",
    href: "/industries#mobility",
    icon: CarFront,
  },
  {
    title: "Hardware Marketplace",
    href: "/shop",
    icon: ShoppingBag,
  },
  {
    title: "Operations & NOC",
    href: "/approach",
    icon: ShieldCheck,
  },
];

export default function MegaMenu({ onClose }: MegaMenuProps) {
  return (
    <div
      className="absolute top-full left-0 right-0 w-full bg-white/98 backdrop-blur-md border-b border-gray-100 shadow-xl py-10 px-6 sm:px-12 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* ── 1. LEFT COLUMN: CORE CAPABILITIES (3 COLS) ── */}
        <div className="lg:col-span-3 space-y-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Core Capabilities
            </h3>
            <div className="w-10 h-0.5 bg-blue-600 rounded-full mt-2 mb-4" />
          </div>

          <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
            Explore our full suite of enterprise clean energy solutions, EV fast charging, rooftop solar, and lithium storage.
          </p>

          <div className="pt-3">
            <Link
              href="/solutions/ev-charging"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 border border-gray-200 text-slate-800 hover:border-blue-600 hover:text-blue-600 rounded-full px-5 py-2 text-xs font-semibold transition-all shadow-2xs"
            >
              <span>View All Services</span>
            </Link>
          </div>
        </div>

        {/* ── 2. MIDDLE SECTION: 2 COLUMNS OF SERVICES WITH BLUE ROUND BADGES (6 COLS) ── */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          
          {/* Sub-column 1 */}
          <div className="space-y-4">
            {SERVICES_COLUMN_1.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3.5 group py-1"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-2xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Sub-column 2 */}
          <div className="space-y-4">
            {SERVICES_COLUMN_2.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3.5 group py-1"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-2xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>

        </div>

        {/* ── 3. RIGHT COLUMN: HARDWARE & TECHNOLOGY INNOVATIONS (3 COLS) ── */}
        <div className="lg:col-span-3 lg:border-l lg:border-gray-100 lg:pl-8 space-y-3">
          <h4 className="text-sm font-bold text-slate-900 tracking-tight">
            Hardware &amp; Technology
          </h4>

          <p className="text-xs text-slate-500 leading-relaxed">
            Discover our certified Tier-1 OEM hardware, high-power DC fast charging kiosks, and cloud CMS telemetry suite.
          </p>

          <div className="pt-2">
            <Link
              href="/shop"
              onClick={onClose}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1.5 hover:gap-2 transition-all"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
