import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FeaturedProducts from "@/components/FeaturedProducts";

export const metadata = {
  title: "Solar Energy Solutions | VLOXIA Systems LLP",
  description: "Residential, commercial and industrial solar energy systems, rooftop installations and solar-plus-storage solutions by VLOXIA Systems LLP.",
};

export default function SolarEnergyPage() {
  return (
    <main >
      <section >
        <div  />
        <div  />
        <div >
          <div>
            <p >Solutions / Solar Energy</p>
            <h1>
              Solar Energy <span>Systems</span>
            </h1>
            <p >
              Harness the power of the sun with high-efficiency rooftop and ground-mounted solar systems designed for residential, commercial and industrial applications.
            </p>
            <Link href="/contact" >
              Get a Solar Quote <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section >
        <div >
          <div >
            <p >Solar Solutions</p>
            <h2>The Right Solar System for Every Scale</h2>
          </div>
          <div >
            {[
              {
                icon: "🏠",
                title: "Residential Solar",
                desc: "1 kW – 10 kW rooftop systems for homes and apartments. Reduce electricity bills and achieve energy independence.",
                points: ["Grid-tied & off-grid options", "Net metering compatible", "Battery storage add-on", "Subsidy assistance"],
              },
              {
                icon: "🏢",
                title: "Commercial & Industrial",
                desc: "10 kW – 1 MW+ rooftop and ground-mounted systems for businesses, factories and campuses.",
                points: ["Peak shaving & demand management", "OPEX & CAPEX models", "PPA financing available", "Remote monitoring"],
              },
              {
                icon: "🔋",
                title: "Solar + Storage",
                desc: "Combine solar generation with lithium battery storage for uninterrupted clean energy — day and night.",
                points: ["Zero-export configurations", "Backup during grid outages", "Maximise self-consumption", "Intelligent energy management"],
              },
            ].map((item) => (
              <div key={item.title} >
                <div >{item.icon}</div>
                <h3 >{item.title}</h3>
                <p >{item.desc}</p>
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

      <section >
        <div >
          <div >
            <h2 >Why Solar Makes Financial Sense</h2>
          </div>
          <div >
            {[
              { value: "25+", label: "Year system lifespan" },
              { value: "30-50%", label: "Electricity bill reduction" },
              { value: "5-7 Yrs", label: "Typical payback period" },
              { value: "₹0", label: "Fuel cost — sun is free" },
            ].map((s) => (
              <div key={s.label} >
                <div >{s.value}</div>
                <div >{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProducts compact eyebrow="Solar & Power Product" title="Explore Solar-Ready Power" description="The current marketplace listing for solar setups is a hybrid inverter with dual MPPT and lithium battery support." productIds={["inverter-hybrid-5kw"]} />

      <section >
        <div >
          <div>
          <h2>Ready to Go Solar?</h2>
          <p>Our solar experts will assess your site, design the optimal system and handle everything from permits to commissioning.</p>
          <Link href="/contact" >
            Get Free Solar Assessment <ArrowRight aria-hidden="true" />
          </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
