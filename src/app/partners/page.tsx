import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2, Zap, Handshake, Users, Sparkles, Send } from "lucide-react";

export const metadata = {
  title: "Our Partners & Channel Network | VLOXIA Systems LLP",
  description:
    "Technology partnerships, authorised OEM distribution, and nationwide channel partner opportunities at VLOXIA Systems LLP.",
};

const CHANNEL_TYPES = [
  "Dealers & Distributors",
  "Solar & EV Installers",
  "EPC Contractors",
  "Electrical System Integrators",
  "Commercial Business Development Partners",
];

export default function PartnersPage() {
  return (
    <main className="bg-white text-slate-900 min-h-screen pt-28 pb-20 selection:bg-[#d9f99d] selection:text-black">
      {/* ─── HERO SECTION ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 border-b border-slate-100">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
            Partners &amp; Alliances
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12]">
            Our Technology Partners
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            We collaborate with established OEM technology giants and certified hardware manufacturers to deliver reliable, certified, and performance-proven clean energy solutions across India.
          </p>
        </div>
      </section>

      {/* ─── TECHNOLOGY PARTNERS SECTION ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Technology Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Backed by Proven OEM Engineering
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Featured OEM Partner Card (TATA EZ POWER) */}
          <div className="lg:col-span-7 rounded-3xl border border-blue-200/90 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 p-8 sm:p-10 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full bg-blue-600 text-white text-xs font-extrabold uppercase tracking-wider shadow-sm">
                  Strategic OEM Partner
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Authorized Integrator</span>
                </span>
              </div>

              <div>
                <h3 className="text-3xl font-black text-slate-950 tracking-tight">
                  TATA EZ POWER
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-blue-600 mt-1 uppercase tracking-wider">
                  EV Charging Technology Partner
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Tata EZ Power provides an extensive portfolio of high-efficiency AC wallboxes and ultra-fast DC charging infrastructure. Our partnership enables VLOXIA to deliver Tata-backed charging hardware with certified reliability and pan-India SLA support.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "AC Wallbox Chargers (3.3 kW – 22 kW)",
                  "DC Fast Chargers (30 kW – 120 kW+)",
                  "Fleet & Public Hub CMS Solutions",
                  "Smart Dynamic Load Management",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/solutions/ev-charging"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group"
              >
                <span>Explore Tata Powered EV Solutions</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Prospective / Expanding Partners Card */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-200/90 bg-slate-950 text-white p-8 sm:p-10 shadow-lg flex flex-col justify-between">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
                🤝
              </div>
              <div>
                <span className="text-xs font-bold text-[#dcf836] uppercase tracking-wider block mb-1">
                  Expanding Portfolio
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  More OEM Alliances Coming Soon
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                We are actively onboarding Tier-1 solar module manufacturers, LiFePO4 battery pack producers, and industrial hybrid inverter developers across India and global supply chains.
              </p>
            </div>

            <div className="pt-8 border-t border-white/10">
              <Link
                href="#channel-partner"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-950 font-bold text-xs hover:bg-[#dcf836] transition-colors"
              >
                <span>Become an OEM / Tech Partner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CHANNEL PARTNER REGISTRATION SECTION ─── */}
      <section id="channel-partner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Why Join Network */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block px-3 py-1 rounded-md bg-[#dcf836] text-black text-xs font-bold uppercase tracking-wider">
              Channel Network
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Join the VLOXIA Partner Network
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We are building a pan-India network of authorized dealers, installers, and EPC partners. Scale your clean energy business with guaranteed inventory, OEM pricing, and full technical training.
            </p>

            <div className="space-y-3 pt-2">
              {CHANNEL_TYPES.map((type, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 text-sm font-semibold text-slate-800"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                  <span>{type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Clean Registration Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-xl space-y-6">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                  Channel Partner Application
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Submit your business details and our channel alliance manager will get in touch.
                </p>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contact person name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Registered business name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="partner@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Partner Category *
                    </label>
                    <select
                      required
                      defaultValue=""
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white"
                    >
                      <option value="" disabled>Select category</option>
                      <option value="dealer">Dealer / Distributor</option>
                      <option value="installer">EV / Solar Installer</option>
                      <option value="epc">EPC Contractor</option>
                      <option value="integrator">Electrical System Integrator</option>
                      <option value="oem">Technology OEM Supplier</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Operating Region / State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Delhi NCR, Maharashtra, Gujarat..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Submit Partner Application</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
