"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Partner {
  id: string;
  name: string;
  logo: string;
  category: string;
}

const DEFAULT_PARTNERS: Partner[] = [
  {
    id: "tatapower",
    name: "Tata Power Solaroof",
    logo: "/partners/tatapower.png",
    category: "Tier-1 Rooftop Solar & EV",
  },
  {
    id: "waaree",
    name: "Waaree Energies",
    logo: "/partners/waaree.png",
    category: "India's #1 Solar PV Modules",
  },
  {
    id: "emmvee",
    name: "Emmvee Solar",
    logo: "/partners/emmvee.png",
    category: "High-Efficiency PV Systems",
  },
  {
    id: "rayzon",
    name: "Rayzon Solar",
    logo: "/partners/rayzon.png",
    category: "TOPCon & Mono PERC Panels",
  },
  {
    id: "websol",
    name: "Websol Energy System",
    logo: "/partners/websol.png",
    category: "PV Crystalline Cells & Modules",
  },
  {
    id: "havells",
    name: "Havells Solar",
    logo: "/partners/havells.svg",
    category: "Inverters & HT Switchgear",
  },
  {
    id: "delta",
    name: "Delta Electronics",
    logo: "/partners/delta.svg",
    category: "EV Chargers & Power Electronics",
  },
];

type PartnerMarqueeProps = {
  eyebrow?: React.ReactNode;
  className?: string;
};

export default function PartnerMarquee({
  eyebrow = (
    <>
      <span className="text-white">Authorized OEM Alliances &amp;</span>{" "}
      <span className="text-cyan-400 font-bold">Tier-1 Clean Energy Partners</span>
    </>
  ),
  className = "",
}: PartnerMarqueeProps) {
  const [partnerList, setPartnerList] = useState<Partner[]>(DEFAULT_PARTNERS);

  useEffect(() => {
    fetch("/api/partners")
      .then((res) => res.json())
      .then((data) => {
        if (data?.partners && data.partners.length > 0) {
          const mapped: Partner[] = data.partners.map((p: any) => ({
            id: p.id,
            name: p.name,
            logo: p.logoUrl,
            category: p.category || "Technology Partner",
          }));
          setPartnerList(mapped);
        }
      })
      .catch(() => {});
  }, []);

  // Duplicate for seamless infinite marquee loop (minimum 12 items for smooth loop)
  const marqueeList =
    partnerList.length >= 6
      ? [...partnerList, ...partnerList]
      : [...partnerList, ...partnerList, ...partnerList, ...partnerList];

  return (
    <section className={`py-10 bg-[#060D1E] border-y border-blue-900/30 overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            {eyebrow}
          </span>
        </div>
        <span className="text-xs text-slate-400 font-medium hidden md:inline-block font-mono">
          Certified Hardware &amp; Turnkey Supply Chain
        </span>
      </div>

      {/* Marquee Track Container with subtle fade edges */}
      <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="animate-marquee flex items-center gap-6 py-2">
          {marqueeList.map((partner, idx) => (
            <div
              key={`${partner.id}-${idx}`}
              className="card-hover-effect lift-effect shadow-hover-effect flex items-center justify-center h-20 px-8 py-3 rounded-2xl bg-[#091533]/80 border border-blue-900/40 shadow-lg hover:border-cyan-400/50 hover:shadow-cyan-950/40 shrink-0 group cursor-pointer"
              title={`${partner.name} - ${partner.category}`}
            >
              <div className="relative h-10 w-36 flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="160px"
                  className="object-contain filter brightness-95 opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
