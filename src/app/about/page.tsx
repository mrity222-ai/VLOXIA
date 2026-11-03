import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Sun,
  Battery,
  Building2,
  Award,
  Users,
  Compass,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "About Us | VLOXIA Systems LLP",
  description:
    "Learn about VLOXIA Systems LLP, an engineering pioneer in EV charging infrastructure, solar energy, lithium BESS, and turnkey power solutions across India.",
};

const STATS = [
  { value: "48+", label: "Turnkey Projects" },
  { value: "400+", label: "Trusted Partners" },
  { value: "99.8%", label: "Client Retention Rate" },
  { value: "150+", label: "EV Chargers Installed" },
];

const CATEGORY_TAGS = [
  { icon: Zap, label: "EV Mobility" },
  { icon: Sun, label: "Rooftop Solar" },
  { icon: Battery, label: "Lithium BESS" },
  { icon: Building2, label: "Commercial EPC" },
  { icon: ShieldCheck, label: "HT Substation" },
  { icon: Sparkles, label: "Smart Microgrids" },
];

const CORE_VALUES = [
  {
    icon: Sparkles,
    title: "Commercial Innovation",
    desc: "We engineer forward-thinking energy infrastructure using Tier-1 hardware, IoT cloud telemetry, and intelligent load-balancing algorithms.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Tier-1 Quality",
    desc: "Rigorous compliance with CEIG safety standards, IEC/IEEE norms, and BIS certifications ensures safe, resilient operation 24/7/365.",
  },
  {
    icon: Award,
    title: "Integrity & Transparency",
    desc: "Transparent commercial pricing, accurate ROI modeling, and zero hidden costs form the bedrock of our client relationships.",
  },
  {
    icon: Compass,
    title: "Environmental Stewardship",
    desc: "Every solar panel deployed and EV charger energized actively offsets carbon emissions, driving India toward net-zero targets.",
  },
];

const PROJECTS_GALLERY = [
  {
    title: "Commercial Corporate EV Hub",
    location: "Gurugram, NCR",
    image: "/Industries/Commercial.png",
  },
  {
    title: "MW-Scale Industrial Solar EPC",
    location: "Bhiwadi, Rajasthan",
    image: "/Industries/Industrial.png",
  },
  {
    title: "Fleet Depot Fast Charging Station",
    location: "Delhi Logistics Hub",
    image: "/Industries/Mobility.png",
  },
  {
    title: "Smart Residential Housing Microgrid",
    location: "Noida Sector 150",
    image: "/Industries/Residential.png",
  },
  {
    title: "Healthcare Critical Power & BESS",
    location: "Rohini, New Delhi",
    image: "/Industries/Institutional.png",
  },
  {
    title: "Ultra-Fast Highway DC Charging Bay",
    location: "Delhi-Jaipur Expressway",
    image: "/Modern EV Charging.png",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Vikram Malhotra",
    role: "Lead Electrical Architect",
    specialty: "High-Tension Infrastructure",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Arjun Sharma",
    role: "Head of Solar EPC",
    specialty: "MW-Scale Solar & Net-Metering",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Aman Verma",
    role: "EV Infrastructure Director",
    specialty: "OCPP CMS & Fast Charging",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "David Hayes",
    role: "Operations & Quality Lead",
    specialty: "Site Audits & Commissioning",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-900 min-h-screen pt-28 pb-20 selection:bg-[#d9f99d] selection:text-black">
      {/* ─── 1. HERO SECTION (MATCHING REFERENCE DESIGN) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-16">
        {/* Top Eyebrow & Title Row */}
        <div className="space-y-4 mb-10">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
            About Our Company
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12]">
                Journey towards the excellence
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pl-6 space-y-2 border-l border-slate-200 pl-4 sm:pl-6">
              <span className="inline-block px-3 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-black tracking-wider uppercase">
                EST. 2024
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                VLOXIA is an engineering pioneer delivering high-grade clean energy infrastructure,
                rooftop solar systems, lithium storage, and smart EV charging installations with superior safety.
              </p>
            </div>
          </div>
        </div>

        {/* Dual-Image Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-10">
          {/* Left Image (Residential / Home Charging) */}
          <div className="md:col-span-5 relative h-72 sm:h-96 rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg bg-slate-50 group">
            <Image
              src="/Industries/Residential.png"
              alt="Residential clean energy by VLOXIA"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 text-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                Residential &amp; Societies
              </span>
              <span className="text-sm font-semibold">Home Energy Autonomy</span>
            </div>
          </div>

          {/* Right Image (Commercial / Modern Campus Plaza) */}
          <div className="md:col-span-7 relative h-72 sm:h-96 rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg bg-slate-50 group">
            <Image
              src="/about-hero-ev.png"
              alt="VLOXIA modern commercial engineering campus"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 text-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 block">
                Commercial &amp; Enterprise
              </span>
              <span className="text-sm font-semibold">Turnkey Clean Power Infrastructure</span>
            </div>
          </div>
        </div>

        {/* Narrative Paragraph */}
        <div className="max-w-4xl mx-auto text-center space-y-3 mb-14">
          <p className="text-base sm:text-xl font-medium text-slate-800 leading-relaxed">
            VLOXIA Systems LLP is dedicated to superior clean energy engineering and electrical infrastructure.
            With extensive field experience and certified OEM partnerships, we have become a trusted leader
            in innovative, sustainable power practices across India.
          </p>
        </div>

        {/* 4-Metric Statistics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-8 border-y border-slate-200">
          {STATS.map((stat, idx) => (
            <div key={idx} className="text-center space-y-1">
              <div className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Dark Category Tags Rolling/Pill Bar */}
        <div className="mt-8">
          <div className="bg-slate-950 text-white rounded-2xl p-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 shadow-md">
            {CATEGORY_TAGS.map((tag, idx) => {
              const Icon = tag.icon;
              return (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200">
                  <Icon className="w-4 h-4 text-[#dcf836]" />
                  <span>{tag.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 2. WE BUILD TO LAST (SUSTAINABILITY & MISSION) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-100">
        <div className="space-y-3 mb-12">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
            Our Mission
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 max-w-2xl">
            We Build to Last — For People, Communities, and the Planet
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Solar Installation Photo */}
          <div className="lg:col-span-5 relative h-80 sm:h-[420px] rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-50">
            <Image
              src="/Industries/Commercial.png"
              alt="High-yield commercial solar array"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>

          {/* Right 3-Pillar List */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center flex-shrink-0 text-slate-900 font-bold">
                  ✦
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-950">
                    Sustainable by Design
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mt-1">
                    Every solar array and EV charging bay is architected for maximum energy yield, minimum transmission loss, and decades of environmental offset.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center flex-shrink-0 text-slate-900 font-bold">
                  ✦
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-950">
                    Client-Centric Approach
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mt-1">
                    From preliminary site audits to customized financing models (CAPEX/OPEX), our engineers build solutions around your operational constraints.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center flex-shrink-0 text-slate-900 font-bold">
                  ✦
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-950">
                    Future-Ready Infrastructure
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mt-1">
                    Scalable modular battery energy storage (BESS) and OCPP 1.6J/2.0.1 smart charging hubs ready for India&apos;s accelerating EV transition.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/solutions/ev-charging"
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-md shadow-blue-500/20 active:scale-95 transition-all group"
              >
                <span>Discover Our Solutions</span>
                <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. FROM CONCEPT TO COMPLETION (PROJECT GALLERY) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-100">
        <div className="text-center space-y-3 mb-14 max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
            Gallery
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
            From Concept to Completion These are What We Made
          </h2>
        </div>

        {/* 6-Item Photo Collage Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_GALLERY.map((proj, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 h-72 sm:h-80"
            >
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent transition-opacity" />

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-xs font-bold text-[#dcf836] uppercase tracking-wider block">
                  {proj.location}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {proj.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 4. CORE VALUES SECTION ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-100">
        <div className="text-center space-y-3 mb-14 max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
            Our Purpose
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
            Core Values That Guide Every Project, Decision, and Partnership
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-lg transition-all duration-300 space-y-4"
              >
                <div className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center font-bold shadow-sm">
                  <Icon className="w-4 h-4 text-[#dcf836]" />
                </div>
                <h3 className="text-lg font-bold text-slate-950">
                  {val.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── 5. READY TO BUILD SOMETHING GREAT? (CTA HERO BANNER) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white p-8 sm:p-14 shadow-2xl">
          {/* Architectural Background Overlay Image */}
          <div className="absolute inset-0 opacity-25">
            <Image
              src="/Modern EV Charging.png"
              alt="Architectural EV installation backdrop"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />

          <div className="relative z-10 max-w-xl space-y-4">
            <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to Build Something Great?
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Partner with our senior clean energy architects for a custom site audit, turnkey EV charging,
              or high-yield solar EPC proposal tailored specifically for your facility.
            </p>
            <div className="pt-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold text-sm shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all group"
              >
                <span>Request a Consultation</span>
                <span className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. SKILLED PROFESSIONALS BEHIND EVERY BUILD (TEAM) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-100">
        <div className="text-center space-y-3 mb-14 max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
            Meet Our Team
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
            Skilled Professionals Behind Every Build
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 group"
            >
              <div className="relative h-64 sm:h-72 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 backdrop-blur-md text-white flex items-center justify-center text-xs font-bold shadow-md">
                  ✦
                </div>
              </div>

              <div className="p-5 space-y-1">
                <h3 className="text-base font-bold text-slate-950">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-blue-600">
                  {member.role}
                </p>
                <p className="text-xs text-slate-500">
                  {member.specialty}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 7. PRESERVED CORPORATE CREDENTIALS & REGISTRATION CARD ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-100">
        <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-8 sm:p-12 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Corporate Identification &amp; Compliance
              </p>
              <h3 className="text-2xl font-extrabold text-slate-950 mt-1">
                VLOXIA Systems LLP
              </h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Certified Clean Energy Entity</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>Registered Office</span>
              </div>
              <p className="text-slate-800 font-medium">
                A3/55, Sector 15, Rohini, Delhi – 110089
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-slate-500" />
                <span>Business Verticals</span>
              </div>
              <p className="text-slate-800 font-medium">
                EV Charging · Solar Energy · Energy Storage · Power Solutions
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                <span>Technology Partner</span>
              </div>
              <p className="text-slate-800 font-medium">
                TATA EZ POWER &amp; Certified Tier-1 OEMs
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>Direct Inquiries</span>
              </div>
              <p className="text-slate-800 font-medium">
                +91 8178810456 <br />
                <span className="text-xs text-slate-500">vloxiasystems@gmail.com</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
