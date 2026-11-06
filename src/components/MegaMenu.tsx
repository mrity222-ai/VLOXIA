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
      className="absolute top-full left-0 right-0 w-full bg-[#071126]/98 backdrop-blur-md border-b border-blue-900/40 shadow-2xl py-10 px-6 sm:px-12 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-white font-sans"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* ── 1. LEFT COLUMN: CORE CAPABILITIES (3 COLS) ── */}
        <div className="lg:col-span-3 space-y-3">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Core Capabilities
            </h3>
            <div className="w-10 h-0.5 bg-blue-500 rounded-full mt-2 mb-4" />
          </div>

          <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
            Explore our full suite of enterprise clean energy solutions, EV fast charging, rooftop solar, and lithium storage.
          </p>

          <div className="pt-3">
            <Link
              href="/solutions/ev-charging"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 border border-blue-800/40 bg-[#091533] text-slate-200 hover:border-cyan-400 hover:text-cyan-300 rounded-full px-5 py-2 text-xs font-semibold transition-all shadow-sm"
            >
              <span>View All Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
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
                  <div className="w-9 h-9 rounded-full bg-[#0b1a3d] text-cyan-400 border border-blue-800/40 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
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
                  <div className="w-9 h-9 rounded-full bg-[#0b1a3d] text-cyan-400 border border-blue-800/40 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>

        </div>

        {/* ── 3. RIGHT COLUMN: HARDWARE & TECHNOLOGY INNOVATIONS (3 COLS) ── */}
        <div className="lg:col-span-3 lg:border-l lg:border-blue-900/30 lg:pl-8 space-y-3">
          <h4 className="text-sm font-bold text-white tracking-tight">
            Clean Tech Hardware
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Direct access to commercial DC fast chargers, battery storage racks, and dual-MPPT inverters.
          </p>

          <div className="pt-2">
            <Link
              href="/shop"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              <span>Explore Hardware Marketplace</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
