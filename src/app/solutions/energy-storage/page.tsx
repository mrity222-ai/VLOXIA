import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FeaturedProducts from "@/components/FeaturedProducts";

export const metadata = {
  title: "Energy Storage & Lithium | VLOXIA Systems LLP",
  description: "Lithium battery systems, integrated inverters, backup power and energy storage solutions by VLOXIA Systems LLP.",
};

export default function EnergyStoragePage() {
  return (
    <main className="content-page solution-page">
      <section className="content-hero solution-hero">
        <div className="content-hero-glow" />
        <div className="solution-hero-orb" />
        <div className="content-hero-inner">
          <div>
            <p className="content-eyebrow">Solutions / Energy Storage</p>
            <h1>
              Energy Storage <span>& Lithium</span>
            </h1>
            <p className="solution-hero-copy">
              Advanced lithium battery systems for backup power, solar storage and energy independence — engineered for safety, longevity and intelligent energy management.
            </p>
            <Link href="/contact" className="content-button">
              Get a Storage Quote <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="content-container">
          <div className="content-section-heading">
            <p className="content-eyebrow">Product Range</p>
            <h2>Lithium Storage Systems</h2>
          </div>
          <div className="solution-card-grid">
            {[
              { icon: "🔋", title: "Home Battery Systems", desc: "2.5 kWh – 20 kWh lithium batteries for residential backup and solar storage with smart home integration." },
              { icon: "🏭", title: "Commercial BESS", desc: "Scalable Battery Energy Storage Systems (BESS) from 20 kWh to MWh scale for commercial and industrial load management." },
              { icon: "⚡", title: "Integrated Inverter+Battery", desc: "All-in-one hybrid inverter and lithium battery units for seamless solar, grid and backup power management." },
              { icon: "🌐", title: "Off-Grid Systems", desc: "Complete off-grid energy systems combining solar generation, lithium storage and inverter for remote locations." },
              { icon: "🏗️", title: "Peak Shaving", desc: "Industrial BESS for demand charge reduction, load shifting and grid independence during peak tariff hours." },
              { icon: "🛡️", title: "UPS & Critical Power", desc: "Lithium-based UPS systems for data centres, hospitals and critical infrastructure requiring zero downtime." },
            ].map((item) => (
              <div key={item.title} className="solution-card">
                <div >{item.icon}</div>
                <h3 >{item.title}</h3>
                <p >{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section solution-benefits">
        <div >
          <div >
            <h2 >Why Lithium Over Lead-Acid?</h2>
          </div>
          <div >
            {[
              ["5,000+ cycles", "vs ~500 cycles for lead-acid"],
              ["95%+ efficiency", "vs ~80% for lead-acid"],
              ["50% lighter", "for the same energy capacity"],
              ["Zero maintenance", "sealed, no acid checks needed"],
              ["10-year warranty", "with proven degradation curves"],
              ["Safe chemistry", "LiFePO4 — thermally stable"],
            ].map(([val, desc]) => (
              <div key={val} >
                <div >{val}</div>
                <div >{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProducts compact eyebrow="Lithium Storage Products" title="Explore Battery Options" description="Compare the lithium storage products currently available in the VLOXIA marketplace." productIds={["batt-lifepo4-5kwh", "batt-lifepo4-2kwh"]} />

      <section className="content-cta-section">
        <div className="content-cta">
          <div>
          <h2>Store More. Depend Less on the Grid.</h2>
          <p>Design your energy storage system with VLOXIA experts — we size, supply and commission your lithium battery solution.</p>
          <Link href="/contact" className="content-button">
            Plan My Storage System <ArrowRight aria-hidden="true" />
          </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
