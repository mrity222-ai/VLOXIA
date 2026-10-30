import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Sun, Battery, Power, Zap, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Our Approach & Process | VLOXIA Systems LLP",
  description:
    "How VLOXIA engineers, implements and supports integrated clean energy ecosystems across India.",
};

const processSteps = [
  {
    n: "01",
    title: "Discovery & Audit",
    desc: "We begin by conducting comprehensive on-site energy audits, analyzing consumption curves, assessing available roof/ground real estate, grid stability, and budget parameters.",
  },
  {
    n: "02",
    title: "Engineering Analysis",
    desc: "Our technical team models solar yield simulation, battery degradation cycles, EV charger utilization profiles, and ROI payback models before final hardware selection.",
  },
  {
    n: "03",
    title: "Custom Recommendation",
    desc: "We deliver full single-line diagrams, engineering bill of materials (BOM), certified tier-1 OEM specifications, and transparent commercial proposals.",
  },
  {
    n: "04",
    title: "Turnkey Implementation",
    desc: "Certified electrical engineers manage complete civil foundation, cabling, switchgear installation, safety certifications, and net-metering grid synchronisation.",
  },
  {
    n: "05",
    title: "Lifecycle Support & NOC",
    desc: "Continuous proactive monitoring through cloud dashboards, scheduled preventive maintenance checks, rapid spare replenishment, and OEM warranty claims management.",
  },
];

const projects = [
  {
    title: "Commercial IT Park Microgrid (500 kW)",
    location: "Cyber City, Gurugram, Haryana",
    category: "Commercial Solar + BESS",
    desc: "Integrated 500 kW rooftop solar array with 200 kWh lithium peak shaving storage, cutting daytime diesel generator runtime and reducing grid load by 65%.",
    image: "/Industries/Commercial.png",
  },
  {
    title: "Highway Rapid DC Corridor (150 kW Dual Gun)",
    location: "Delhi – Jaipur Expressway (NH-48)",
    category: "High-Power EV Charging Hub",
    desc: "Dual-gun CCS2 high-power fast charging stations with dynamic grid load balancing, automated UPI billing, and 24/7 turnaround infrastructure for electric fleets.",
    image: "/Industries/Mobility.png",
  },
  {
    title: "Industrial Manufacturing Solar Plant (1.2 MW)",
    location: "Bhiwadi Industrial Corridor, Rajasthan",
    category: "Industrial Renewable EPC",
    desc: "MW-scale high-yield solar rooftop installation with real-time SCADA monitoring, zero-export protection, and high-voltage transformer stepping.",
    image: "/Industries/Industrial.png",
  },
  {
    title: "Hospitality Zero-Downtime Power Backup (50 kWh)",
    location: "South Delhi Hotel Complex",
    category: "Lithium LiFePO4 Storage",
    desc: "Modular lithium battery energy storage system coupled with solar hybrid inverters to eliminate voltage sags and guarantee clean power for sensitive electronics.",
    image: "/Industries/Institutional.png",
  },
];

export default function ApproachPage() {
  return (
    <div >
      
      {/* ── SECTION 01: HERO (MATCHING REFERENCE IMAGE 1) ── */}
      <section >
        {/* Decorative Concentric Rings in Top-Right */}
        <div >
          <div  />
          <div  />
        </div>

        <div >
          <div >
            <h1 >
              We engineer effective{" "}
              <span >
                <Sparkles  />
                <span >clean energy</span>
              </span>{" "}
              solutions to power your future
            </h1>
          </div>

          <div >
            <div>
              <Link
                href="/contact"
                
              >
                <span>Schedule Consultation</span>
                <span >
                  <ArrowRight  />
                </span>
              </Link>
            </div>

            <p >
              We are a Delhi-based clean energy solutions provider, helping homes, businesses, and fleets transition to sustainable power through reliable engineering and OEM technology.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 02: OUR PROCESS (MATCHING REFERENCE IMAGE 2) ── */}
      <section >
        <div >
          <div >
            <span >
              Framework
            </span>
            <h2 >
              OUR PROCESS
            </h2>
          </div>

          {/* Stacked Rows with Circular Number Badges & Dividers */}
          <div >
            {processSteps.map((step) => (
              <div
                key={step.n}
                
              >
                {/* Left: Circular Number Pill + Title */}
                <div >
                  <div >
                    {step.n}
                  </div>
                  <h3 >
                    {step.title}
                  </h3>
                </div>

                {/* Right: Clean Description */}
                <div >
                  <p >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 03: THE ECOSYSTEM LOOP ── */}
      <section >
        <div >
          <span >
            Connected Architecture
          </span>
          <h2 >
            Generate → Store → Power → Move
          </h2>
          <p >
            VLOXIA harmonizes rooftop solar generation with lithium storage, hybrid inverters, and EV fast charging stations into one intelligent energy ecosystem.
          </p>

          <div >
            {[
              { icon: Sun, label: "Generate", sub: "Solar Power", color: "from-yellow-400 to-orange-500" },
              { icon: Battery, label: "Store", sub: "Lithium BESS", color: "from-green-400 to-emerald-600" },
              { icon: Power, label: "Power", sub: "Hybrid Backup", color: "from-purple-500 to-pink-500" },
              { icon: Zap, label: "Move", sub: "EV Fast Hubs", color: "from-blue-500 to-cyan-500" },
            ].map((node) => {
              const Icon = node.icon;
              return (
                <div key={node.label} >
                  <div >
                    <Icon  />
                  </div>
                  <div >{node.label}</div>
                  <div >{node.sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 04: OUR LANDMARK DEPLOYMENTS (MATCHING REFERENCE IMAGE 3) ── */}
      <section >
        <div >
          {/* Header */}
          <div >
            <div>
              <span >
                Deployments
              </span>
              <div >
                <h2 >
                  OUR LANDMARK PROJECTS
                </h2>
                <Sparkles  />
              </div>
            </div>

            <Link
              href="/industries"
              
            >
              <span>All Projects</span>
              <span >
                <ArrowRight  />
              </span>
            </Link>
          </div>

          {/* 2-Column Clean Cards Grid */}
          <div >
            {projects.map((proj, idx) => (
              <div
                key={idx}
                
              >
                {/* Image Container */}
                <div >
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    
                  />
                  <div >
                    {proj.category}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div >
                    <div>
                      <h3 >
                        {proj.title}
                      </h3>
                      <div >{proj.location}</div>
                    </div>

                    <Link
                      href="/contact"
                      
                    >
                      <ArrowRight  />
                    </Link>
                  </div>

                  <p >
                    {proj.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section >
        <div >
          <h2 >
            Ready to Plan Your Clean Energy Transition?
          </h2>
          <p >
            Connect with VLOXIA energy consultants for a no-obligation site evaluation and feasibility assessment.
          </p>
          <Link
            href="/contact"
            
          >
            <span>Begin Your Energy Journey</span>
            <ArrowRight  />
          </Link>
        </div>
      </section>

    </div>
  );
}
