import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Industries We Serve | VLOXIA Systems LLP",
  description: "VLOXIA serves residential, commercial, industrial, mobility and institutional sectors with integrated clean energy solutions.",
};

const industries = [
  {
    id: "residential",
    icon: "🏠",
    title: "Residential",
    subtitle: "Homes & Apartments",
    desc: "Energy independence for homeowners and housing societies. Reduce electricity bills, add backup power and prepare for EV ownership — all with a single integrated energy partner.",
    solutions: ["Rooftop Solar (1–10 kW)", "Lithium Home Battery", "EV Home Wallbox Charger", "Solar + Storage Systems", "Power Backup UPS"],
  },
  {
    id: "commercial",
    icon: "🏢",
    title: "Commercial",
    subtitle: "Offices, Retail & Hospitality",
    desc: "Optimise energy costs and demonstrate sustainability credentials. Commercial solar, EV charging amenities for customers/employees and intelligent power management.",
    solutions: ["Commercial Solar (10–500 kW)", "EV Charging Bays", "Battery Energy Storage", "Demand Management", "Energy Monitoring"],
  },
  {
    id: "industrial",
    icon: "🏭",
    title: "Industrial",
    subtitle: "Factories, Warehouses & Plants",
    desc: "Large-scale solar generation, peak shaving, power quality improvement and EV fleet charging for industrial operations seeking energy cost reduction and sustainability compliance.",
    solutions: ["Industrial Solar (100 kW – MW)", "Peak Shaving BESS", "EV Fleet Charging", "Power Quality Systems", "Microgrid Solutions"],
  },
  {
    id: "mobility",
    icon: "🚗",
    title: "Mobility",
    subtitle: "Fleets, Transport & Logistics",
    desc: "Transition your fleet to electric with the right charging infrastructure — depot charging, route charging and fleet management systems for smooth EV operations.",
    solutions: ["Fleet Depot AC Charging", "DC Fast Chargers", "Fleet Management Software", "Solar-Powered Depots", "Route Planning Support"],
  },
  {
    id: "institutional",
    icon: "🏛️",
    title: "Institutional",
    subtitle: "Schools, Hospitals & Government",
    desc: "Reliable, uninterrupted power for critical institutional operations. Solar + storage systems for energy security, CSR compliance and long-term operational cost savings.",
    solutions: ["Educational Institution Solar", "Hospital Critical Power", "Government CAPEX/OPEX", "EV Charging for Campuses", "Subsidy Navigation"],
  },
];

export default function IndustriesPage() {
  return (
    <main className="content-page industries-page">
      <section className="content-hero">
        <div className="content-hero-glow" />
        <div className="content-hero-inner">
          <p className="content-eyebrow">Industries</p>
          <h1>Industries We Serve</h1>
          <p>
            From individual homes to large industrial campuses — VLOXIA delivers clean energy solutions tailored to every sector.
          </p>
        </div>
      </section>

      <section className="content-section industries-section">
        <div className="content-container industry-list">
          {industries.map((ind) => (
            <div key={ind.id} id={ind.id} className="industry-card">
              <div className="industry-label">
                <div className="industry-icon">
                  {ind.icon}
                </div>
                <div className="industry-name">{ind.title}</div>
                <div className="industry-subtitle">{ind.subtitle}</div>
              </div>
              <div className="industry-content">
                <h2>{ind.title} Energy Solutions</h2>
                <p>{ind.desc}</p>
                <div className="industry-tags">
                  {ind.solutions.map((s) => (
                    <span key={s}>
                      {s}
                    </span>
                  ))}
                </div>
                <Link href="/contact" className="content-text-link">
                  Get a Solution for {ind.title} <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="content-cta-section">
        <div className="content-cta">
          <h2>Your Industry, Our Expertise</h2>
          <p>Don&apos;t see your specific use case? Talk to our experts — we design custom solutions for unique requirements.</p>
          <Link href="/contact" className="content-button">
            Discuss Your Requirements <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
