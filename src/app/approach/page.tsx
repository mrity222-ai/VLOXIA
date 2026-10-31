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
    <div className="bg-[#ffffff] text-[#0a1628] min-h-screen">
      
      {/* ── SECTION 01: HERO (MATCHING REFERENCE IMAGE 1) ── */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden bg-white border-b border-gray-100">
        {/* Decorative Concentric Rings in Top-Right */}
        <div className="absolute top-12 right-12 w-64 h-64 pointer-events-none hidden md:flex items-center justify-center opacity-30">
          <div className="w-40 h-40 rounded-full border border-gray-300" />
          <div className="w-40 h-40 rounded-full border border-gray-300 -ml-16" />
        </div>

        <div className="container-xl relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12] text-[#0a1628] mb-8">
              We engineer effective{" "}
              <span className="inline-flex items-center gap-2">
                <Sparkles className="w-7 h-7 sm:w-10 sm:h-10 text-[#2563eb] inline -mt-2 animate-pulse" />
                <span className="text-[#2563eb]">clean energy</span>
              </span>{" "}
              solutions to power your future
            </h1>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-4">
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-9 py-3.5 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-[0_12px_28px_-6px_rgba(37,99,235,0.5),0_4px_12px_rgba(37,99,235,0.28)] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-6px_rgba(37,99,235,0.65),0_6px_16px_rgba(37,99,235,0.35)] active:translate-y-0 transition-all duration-200"
              >
                <span>Schedule Consultation</span>
                <span className="w-6 h-6 rounded-full bg-white text-[#2563eb] flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>

            <p className="text-gray-500 text-sm md:text-base max-w-md leading-relaxed">
              We are a Delhi-based clean energy solutions provider, helping homes, businesses, and fleets transition to sustainable power through reliable engineering and OEM technology.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 02: OUR PROCESS (MATCHING REFERENCE IMAGE 2) ── */}
      <section className="section-pad bg-[#fbfcfd]">
        <div className="container-xl">
          <div className="mb-14">
            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 bg-gray-100 px-3 py-1 rounded-md">
              Framework
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0a1628] mt-3 tracking-tight">
              OUR PROCESS
            </h2>
          </div>

          {/* Stacked Rows with Circular Number Badges & Dividers */}
          <div className="border-t border-gray-200/80">
            {processSteps.map((step) => (
              <div
                key={step.n}
                className="py-10 border-b border-gray-200/80 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:bg-white transition-colors px-4 rounded-xl"
              >
                {/* Left: Circular Number Pill + Title */}
                <div className="lg:col-span-4 flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-black text-[#0a1628] flex-shrink-0">
                    {step.n}
                  </div>
                  <h3 className="text-xl font-bold text-[#0a1628] tracking-tight">
                    {step.title}
                  </h3>
                </div>

                {/* Right: Clean Description */}
                <div className="lg:col-span-8">
                  <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed max-w-2xl">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 03: THE ECOSYSTEM LOOP ── */}
      <section className="py-20 gradient-navy text-white relative overflow-hidden">
        <div className="container-xl relative z-10 text-center">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#2563eb] bg-[#2563eb]/15 px-3 py-1 rounded-full border border-[#2563eb]/30">
            Connected Architecture
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-4">
            Generate → Store → Power → Move
          </h2>
          <p className="text-white/60 text-sm max-w-xl mx-auto mb-12">
            VLOXIA harmonizes rooftop solar generation with lithium storage, hybrid inverters, and EV fast charging stations into one intelligent energy ecosystem.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Sun, label: "Generate", sub: "Solar Power", color: "from-blue-400 to-blue-500" },
              { icon: Battery, label: "Store", sub: "Lithium BESS", color: "from-blue-400 to-blue-600" },
              { icon: Power, label: "Power", sub: "Hybrid Backup", color: "from-blue-500 to-indigo-500" },
              { icon: Zap, label: "Move", sub: "EV Fast Hubs", color: "from-blue-500 to-indigo-500" },
            ].map((node) => {
              const Icon = node.icon;
              return (
                <div key={node.label} className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${node.color} flex items-center justify-center mb-3 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="font-bold text-white text-base">{node.label}</div>
                  <div className="text-xs text-white/50 mt-0.5">{node.sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 04: OUR LANDMARK DEPLOYMENTS (MATCHING REFERENCE IMAGE 3) ── */}
      <section className="section-pad bg-white">
        <div className="container-xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 bg-gray-100 px-3 py-1 rounded-md">
                Deployments
              </span>
              <div className="flex items-center gap-3 mt-3">
                <h2 className="text-3xl md:text-5xl font-black text-[#0a1628] tracking-tight">
                  OUR LANDMARK PROJECTS
                </h2>
                <Sparkles className="w-6 h-6 text-[#2563eb] hidden sm:block" />
              </div>
            </div>

            <Link
              href="/industries"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs rounded-full shadow-md shadow-[#2563eb]/25 transition-all"
            >
              <span>All Projects</span>
              <span className="w-5 h-5 rounded-full bg-white text-[#2563eb] flex items-center justify-center">
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>

          {/* 2-Column Clean Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="group flex flex-col justify-between bg-white rounded-3xl border border-gray-100 hover:border-gray-300 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden p-6"
              >
                {/* Image Container */}
                <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-gray-100 mb-6">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#0a1628]/85 backdrop-blur-md text-[#2563eb] text-[11px] font-bold rounded-lg border border-white/10 uppercase">
                    {proj.category}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-[#0a1628] group-hover:text-[#2563eb] transition-colors leading-tight">
                        {proj.title}
                      </h3>
                      <div className="text-xs text-gray-400 mt-1">{proj.location}</div>
                    </div>

                    <Link
                      href="/contact"
                      className="w-10 h-10 rounded-full bg-[#2563eb] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md shadow-[#2563eb]/20"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed mt-3">
                    {proj.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
</div>
  );
}
