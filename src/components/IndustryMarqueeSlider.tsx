"use client";

import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Sun,
  Building,
  Briefcase,
  Truck,
  Factory,
  HeartPulse,
  Home,
  Plane,
  ArrowRight,
} from "lucide-react";

interface IndustryItem {
  id: string;
  name: string;
  icon: any;
  image: string;
  category: string;
}

const industries: IndustryItem[] = [
  {
    id: "education",
    name: "Education",
    icon: GraduationCap,
    image: "/Industries/Institutional.png",
    category: "Campus Solar & EV",
  },
  {
    id: "energy-solar",
    name: "Energy & Solar",
    icon: Sun,
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    category: "Rooftop & Ground Solar",
  },
  {
    id: "finance-banking",
    name: "Finance & Banking",
    icon: Building,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    category: "Zero Downtime Power",
  },
  {
    id: "corporate-it",
    name: "Startups & Tech",
    icon: Briefcase,
    image: "/Industries/Commercial.png",
    category: "EV Hubs & Smart Office",
  },
  {
    id: "travel-aviation",
    name: "Travel & Aviation",
    icon: Plane,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    category: "Highways & Airports",
  },
  {
    id: "fleet-mobility",
    name: "Fleet & Mobility",
    icon: Truck,
    image: "/Industries/Mobility.png",
    category: "Rapid DC EV Depots",
  },
  {
    id: "manufacturing",
    name: "Heavy Industry",
    icon: Factory,
    image: "/Industries/Industrial.png",
    category: "Industrial Power Quality",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: HeartPulse,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    category: "Critical Hospital BESS",
  },
  {
    id: "residential",
    name: "Residential",
    icon: Home,
    image: "/Industries/Residential.png",
    category: "Housing Societies & Villas",
  },
];

export default function IndustryMarqueeSlider() {
  // Duplicate array for seamless infinite looping
  const marqueeItems = [...industries, ...industries];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gray-100 overflow-hidden relative select-none">
      {/* ── HEADER BLOCK (Matches Reference) ── */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/80 mb-3 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-700">
            Domain Expertise
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0a1628] tracking-tight leading-tight">
          Solutions Built for{" "}
          <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Every Industry
          </span>
        </h2>

        <p className="mt-3 text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
          We engineer solar microgrids, rapid EV fast-charging corridors, high-density lithium storage, and resilient backup power tailored for every business sector.
        </p>
      </div>

      {/* ── CONTINUOUS MARQUEE SLIDER (Left-to-Right) ── */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {/* Sliding Track */}
        <div className="animate-slide-ltr flex items-center gap-4 sm:gap-6 py-2">
          {marqueeItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={`${item.id}-${index}`}
                href="/industries"
                className="group relative flex-shrink-0 w-[240px] sm:w-[300px] md:w-[340px] h-[160px] sm:h-[185px] md:h-[200px] rounded-2xl overflow-hidden border border-gray-200/70 shadow-sm hover:shadow-xl transition-all duration-300 block"
              >
                {/* Image */}
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, 340px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.92]"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 group-hover:via-black/25 transition-colors" />

                {/* Top Tiny Category Tag */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>

                {/* Bottom Title Bar matching reference screenshot */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center text-white group-hover:bg-[#00c853] group-hover:border-[#00c853] transition-all">
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="text-white font-bold text-xs sm:text-sm tracking-tight drop-shadow-sm group-hover:text-emerald-300 transition-colors">
                      {item.name}
                    </span>
                  </div>

                  <span className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#00c853] transition-all opacity-0 group-hover:opacity-100">
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
