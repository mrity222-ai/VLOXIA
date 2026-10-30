import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FeaturedProducts from "@/components/FeaturedProducts";
import AcDcChargerShowcase from "@/components/AcDcChargerShowcase";

export const metadata = {
  title: "EV Charging Solutions | VLOXIA Systems LLP",
  description: "AC & DC fast chargers, home charging, commercial charging, fleet and public EV charging infrastructure by VLOXIA Systems LLP.",
};

export default function EVChargingPage() {
  return (
    <main className="content-page solution-page">
      {/* Hero */}
      <section className="content-hero solution-hero">
        <div className="content-hero-glow" />
        <div className="solution-hero-orb" />
        <div className="content-hero-inner">
          <div>
            <p className="content-eyebrow">Solutions / EV Charging</p>
            <h1>
              EV Charging <span>Infrastructure</span>
            </h1>
            <p className="solution-hero-copy">
              Complete electric vehicle charging solutions — from home wallboxes to commercial hubs and public networks — powered by certified technology and designed for India&apos;s EV ecosystem.
            </p>
            <Link href="/contact" className="content-button">
              Get a Charging Quote <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── AC & DC CHARGER SHOWCASE SECTION (MATCHES REFERENCE SCREENSHOT) ── */}
      <AcDcChargerShowcase />

      {/* Charger Types Detailed Comparison */}
      <section className="content-section">
        <div className="content-container">
          <div className="content-section-heading">
            <p className="content-eyebrow">Product Range</p>
            <h2>Charging Solutions for Every Need</h2>
          </div>
          <div className="solution-card-grid">
            {[
              {
                title: "AC Chargers (Level 2)",
                badge: "3.3 kW – 22 kW",
                points: ["Home & residential charging", "Office & workplace charging", "Overnight fleet charging", "Retail & hospitality locations", "Single & three-phase variants"],
                color: "border-blue-200 hover:border-blue-400",
                badgeColor: "bg-blue-50 text-blue-600",
              },
              {
                title: "DC Fast Chargers",
                badge: "30 kW – 120 kW+",
                points: ["Commercial & highway charging", "Fleet depot rapid charging", "Public charging stations", "Multi-connector: CCS2, CHAdeMO, Type 2", "Smart load management"],
                color: "border-blue-200 hover:border-blue-400",
                badgeColor: "bg-blue-50 text-blue-600",
              },
            ].map((item) => (
              <div key={item.title} className="solution-card">
                <div className="solution-card-heading">
                  <h3>{item.title}</h3>
                  <span>{item.badge}</span>
                </div>
                <ul>
                  {item.points.map((p) => (
                    <li key={p}>
                      <span aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="content-section solution-applications">
        <div>
          <div>
            <p>Applications</p>
            <h2>Where We Deploy</h2>
          </div>
          <div>
            {[
              { icon: "🏠", label: "Home Charging", desc: "Private wallbox installation" },
              { icon: "🏢", label: "Commercial", desc: "Offices, malls & hotels" },
              { icon: "🚌", label: "Fleet Charging", desc: "Corporate & logistics fleets" },
              { icon: "🛣️", label: "Public Stations", desc: "Highway & city hubs" },
              { icon: "🏭", label: "Industrial", desc: "Factory & warehouse EVs" },
            ].map((app) => (
              <div key={app.label}>
                <div>{app.icon}</div>
                <div>{app.label}</div>
                <div>{app.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProducts compact eyebrow="EV Charging Products" title="Find Your EV Charger" description="Compare home and commercial chargers listed in the VLOXIA marketplace." productIds={["ev-home-7kw", "ev-comm-22kw", "ev-dc-30kw"]} />

      {/* Partner */}
      <section className="content-section solution-partner">
        <div>
          <div>
            <div>
              <div>TATA EZ POWER</div>
              <div>Technology Partner</div>
            </div>
            <div>
              <h3>Powered by Tata EZ Power Technology</h3>
              <p>Our EV charging portfolio leverages Tata EZ Power&apos;s proven technology — bringing reliability, certification and after-sales confidence to every installation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="content-cta-section">
        <div className="content-cta">
          <div>
            <p className="content-eyebrow">Ready to Deploy?</p>
            <h2>Power Your Location with EV Charging</h2>
            <p>Get in touch for a site assessment, technical recommendation and custom commercial proposal.</p>
            <Link href="/contact" className="content-button">
              Request a Consultation <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
