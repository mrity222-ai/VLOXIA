import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FeaturedProducts from "@/components/FeaturedProducts";

export const metadata = {
  title: "Power Solutions | VLOXIA Systems LLP",
  description: "Inverters, power backup, power management and integrated energy solutions by VLOXIA Systems LLP.",
};

export default function PowerSolutionsPage() {
  return (
    <main className="content-page solution-page">
      <section className="content-hero solution-hero">
        <div className="content-hero-glow" />
        <div className="solution-hero-orb" />
        <div className="content-hero-inner">
          <div>
            <p className="content-eyebrow">Solutions / Power Solutions</p>
            <h1>
              Power <span>Solutions</span>
            </h1>
            <p className="solution-hero-copy">
              Reliable inverters, power backup systems and integrated energy management solutions — ensuring uninterrupted power for every application.
            </p>
            <Link href="/contact" className="content-button">
              Get a Power Quote <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="content-container">
          <div className="content-section-heading">
            <p className="content-eyebrow">Our Range</p>
            <h2>Power Products & Solutions</h2>
          </div>
          <div className="solution-card-grid">
            {[
              {
                icon: "⚡",
                title: "Inverters & Hybrid Inverters",
                points: ["Solar hybrid inverters — grid, solar & battery management", "String inverters for commercial & industrial solar", "Micro-inverters for shaded or complex rooftops", "Single-phase & three-phase variants"],
              },
              {
                icon: "🔌",
                title: "Power Backup Systems",
                points: ["Home & office UPS with lithium battery", "Online and offline UPS configurations", "Generator integration & ATS switching", "Critical power for servers, medical and security systems"],
              },
              {
                icon: "📊",
                title: "Power Management",
                points: ["Energy monitoring & analytics dashboards", "Load scheduling & demand management", "Smart metering integration", "Remote monitoring & alerts"],
              },
              {
                icon: "🔗",
                title: "Integrated Energy Solutions",
                points: ["Solar + Storage + EV Charging — one integrated system", "Microgrid design and deployment", "Energy audit and optimisation", "SCADA & building management integration"],
              },
            ].map((item) => (
              <div key={item.title} className="solution-card">
                <div >{item.icon}</div>
                <h3 >{item.title}</h3>
                <ul>
                  {item.points.map((p) => (
                    <li key={p}>
                      <span aria-hidden="true" />{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProducts compact eyebrow="Power Products" title="Explore Power Equipment" description="Browse marketplace equipment for hybrid solar, battery backup and integrated power." productIds={["inverter-hybrid-5kw", "batt-lifepo4-5kwh", "batt-lifepo4-2kwh"]} />

      <section className="content-cta-section">
        <div className="content-cta">
          <h2>Reliable Power, Always.</h2>
          <p>From a single-phase home inverter to a multi-MW industrial power system — VLOXIA delivers the right power solution.</p>
          <Link href="/contact" className="content-button">
            Discuss Your Power Needs <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
