"use client";

import React from "react";
import Link from "next/link";
import {
  Zap,
  Sun,
  Battery,
  Power,
  Building2,
  Award,
  ShoppingBag,
  Cpu,
  ArrowRight,
} from "lucide-react";

interface MegaMenuProps {
  onClose: () => void;
}

const SERVICES_COLUMN_1 = [
  {
    title: "⚡ EV Charging (AC & DC Fast)",
    subtitle: "Homes, workplaces, fleets & highways",
    href: "/solutions/ev-charging",
    icon: Zap,
  },
  {
    title: "☀️ Solar Energy Systems",
    subtitle: "Rooftop, C&I, and solar + storage",
    href: "/solutions/solar-energy",
    icon: Sun,
  },
  {
    title: "🔋 Lithium Energy Storage",
    subtitle: "Inverters with integrated lithium battery",
    href: "/solutions/energy-storage",
    icon: Battery,
  },
  {
    title: "🏢 Commercial & Industrial Power",
    subtitle: "Offices, factories, clinics & institutions",
    href: "/industries#commercial",
    icon: Building2,
  },
];

const SERVICES_COLUMN_2 = [
  {
    title: "⚙️ Integrated Power Solutions",
    subtitle: "Backup, reliability & grid continuity",
    href: "/solutions/power-solutions",
    icon: Power,
  },
  {
    title: "🤝 TATA EZ POWER Portfolio",
    subtitle: "Authorized distributor for EV & Lithium Inverters",
    href: "/partners",
    icon: Award,
  },
  {
    title: "🛒 Clean Energy Marketplace",
    subtitle: "EV chargers, inverters & power hardware",
    href: "/shop",
    icon: ShoppingBag,
  },
  {
    title: "🔄 5-Step Solution Philosophy",
    subtitle: "Understand → Analyse → Recommend → Implement → Support",
    href: "/approach",
    icon: Cpu,
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
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              VLOXIA PLATFORM
            </span>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight mt-1">
              4 Core Business Verticals
            </h3>
            <div className="w-10 h-0.5 bg-blue-600 rounded-full mt-2 mb-4" />
          </div>

          <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
            A single platform for the evolving energy requirements of modern India: EV Charging, Solar Energy, Lithium Storage, and Power Solutions.
          </p>

          <div className="pt-3">
            <Link
              href="/approach"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 border border-gray-200 text-slate-800 hover:border-blue-600 hover:text-blue-600 rounded-full px-5 py-2 text-xs font-semibold transition-all shadow-2xs"
            >
              <span>Explore Ecosystem</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ── 2. MIDDLE SECTION: 2 COLUMNS OF SERVICES WITH ROUND BADGES (6 COLS) ── */}
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
                  className="flex items-start gap-3.5 group py-1"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-2xs mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors block leading-snug">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-slate-400 block leading-tight">
                      {item.subtitle}
                    </span>
                  </div>
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
                  className="flex items-start gap-3.5 group py-1"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-2xs mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors block leading-snug">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-slate-400 block leading-tight">
                      {item.subtitle}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>

        {/* ── 3. RIGHT COLUMN: STRATEGIC OEM PARTNERSHIP (3 COLS) ── */}
        <div className="lg:col-span-3 lg:border-l lg:border-gray-100 lg:pl-8 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
            OEM ALLIANCE
          </span>
          <h4 className="text-sm font-bold text-slate-900 tracking-tight">
            TATA EZ POWER Distributor
          </h4>

          <p className="text-xs text-slate-500 leading-relaxed">
            Distributing Tata&apos;s AC &amp; DC EV chargers and next-generation inverters with integrated lithium battery energy storage across India.
          </p>

          <div className="pt-2">
            <Link
              href="/partners"
              onClick={onClose}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1.5 hover:gap-2 transition-all"
            >
              <span>Channel Partner Inquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}