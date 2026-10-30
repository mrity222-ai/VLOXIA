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
    <section >
      {/* ── HEADER BLOCK (Matches Reference) ── */}
      <div >
        <div >
          <span >
            Domain Expertise
          </span>
        </div>

        <h2 >
          Solutions Built for{" "}
          <span >
            Every Industry
          </span>
        </h2>

        <p >
          We engineer solar microgrids, rapid EV fast-charging corridors, high-density lithium storage, and resilient backup power tailored for every business sector.
        </p>
      </div>

      {/* ── CONTINUOUS MARQUEE SLIDER (Left-to-Right) ── */}
      <div >
        {/* Soft edge fade masks */}
        <div  />
        <div  />

        {/* Sliding Track */}
        <div >
          {marqueeItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={`${item.id}-${index}`}
                href="/industries"
                
              >
                {/* Image */}
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, 340px"
                  
                />

                {/* Dark Gradient Overlay */}
                <div  />

                {/* Top Tiny Category Tag */}
                <div >
                  <span >
                    {item.category}
                  </span>
                </div>

                {/* Bottom Title Bar matching reference screenshot */}
                <div >
                  <div >
                    <div >
                      <Icon  />
                    </div>
                    <span >
                      {item.name}
                    </span>
                  </div>

                  <span >
                    <ArrowRight  />
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
