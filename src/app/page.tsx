"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import FeaturedProducts from "../components/FeaturedProducts";
import PartnerMarquee from "../components/PartnerMarquee";
import RotatingHeadline from "../components/animations/RotatingHeadline";
import ScrollReveal from "../components/animations/ScrollReveal";
import {
  ArrowRight,
  Zap,
  Sun,
  Battery,
  Power,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const CORE_SERVICES = [
  {
    id: "solar",
    title: "Solar Panel & Captive EPC",
    icon: Sun,
    desc: "High-efficiency Tier-1 monocrystalline & TOPCon solar arrays engineered for commercial rooftops and ground-mount captive parks.",
    href: "/solutions/solar-energy",
  },
  {
    id: "agrivoltaics",
    title: "Agrivoltaics & EV Hubs",
    icon: Zap,
    desc: "Dual land utilization combining high-yield agrivoltaic arrays with automated commercial EV ultra-fast charging corridors.",
    href: "/solutions/ev-charging",
  },
  {
    id: "storage",
    title: "Lithium Energy Storage (BESS)",
    icon: Battery,
    desc: "Automotive-grade LiFePO4 battery energy storage systems (BESS) delivering zero-emission critical backup and peak shaving.",
    href: "/solutions/energy-storage",
  },
  {
    id: "power",
    title: "Hybrid Inverters & Microgrids",
    icon: Power,
    desc: "Industrial-grade hybrid dual-MPPT inverters, sub-10ms UPS switchgear, and active harmonic filtering for clean power continuity.",
    href: "/solutions/power-solutions",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Site Planning & Energy Audit",
    desc: "Our technical team evaluates roof real estate, historical load curves, transformer capacity, and financial ROI parameters.",
    image: "/hero/slide-1.jpg",
  },
  {
    step: "02",
    title: "System Design & Single-Line BOM",
    desc: "Certified electrical engineers prepare custom CAD drawings, single-line diagrams, and certified Tier-1 hardware BOM.",
    image: "/ev.jpg",
  },
  {
    step: "03",
    title: "Construction & Commissioning",
    desc: "Turnkey civil foundation, HT switchgear cabling, CEIG safety clearances, and net-metering synchronization with DISCOM.",
    image: "/hero/slide-3.png",
  },
];

const INNOVATOR_SECTORS = [
  {
    title: "Communities & Societies",
    desc: "Shared residential housing EV charging bays with automated billing per apartment and common area rooftop solar.",
    badge: "Residential",
  },
  {
    title: "Businesses & Commercial Hubs",
    desc: "Commercial solar rooftop EPC, workplace employee charging, and accelerated depreciation tax savings.",
    badge: "Commercial",
  },
  {
    title: "Fleets & Industrial Plants",
    desc: "Megawatt industrial solar parks, containerized BESS backup, and dual-gun DC ultra-fast fleet depots.",
    badge: "Industrial & Fleet",
  },
];

const FAQS = [
  {
    q: "How does the VLOXIA turnkey clean energy development process work?",
    a: "We manage the entire lifecycle: preliminary site audit, custom single-line engineering, Tier-1 OEM procurement, civil & electrical installation, CEIG approvals, DISCOM net-metering, and continuous 24/7 cloud NOC monitoring.",
  },
  {
    q: "Can EV chargers and solar rooftop systems operate on the same dynamic load?",
    a: "Yes. Our intelligent dynamic load balancing (DLB) prioritizes captive solar generation directly into connected EV charging stations, cutting expensive grid peak demand surcharges.",
  },
  {
    q: "What warranties and guarantees come with VLOXIA hardware installations?",
    a: "All solar PV modules carry 25-30 year linear output warranties. Lithium battery storage systems come with 10-year / 6,000 cycle performance warranties, and EV chargers carry up to 5-year commercial onsite replacement support.",
  },
  {
    q: "How can I purchase hardware or become a channel partner?",
    a: "Browse our live Hardware Marketplace to order certified units online with Razorpay checkout, or contact our commercial desk for dealer wholesale distribution terms.",
  },
  {
    q: "What happens after installation is complete?",
    a: "Every project is backed by our SLA guarantee, scheduled preventive maintenance visits, fast-response spare parts replenishment, and direct OEM manufacturer warranty coverage.",
  },
];

// 3 Exact Slides matching Reference Imagery
const HERO_CAROUSEL_SLIDES = [
  {
    id: 1,
    number: "01",
    breadcrumb: "SOLUTIONS / SOLAR ENERGY",
    title: (
      <>
        Powering tomorrow with <br />
        <span className="text-blue-500 font-bold">clean solar energy</span>
      </>
    ),
    desc: "Industrial rooftop solar EPC, ground-mount captive parks, and hybrid storage engineered for zero emission operations.",
    image: "/hero/slide-1.jpg",
    btnText: "Explore Solar Solutions",
    btnHref: "/solutions/solar-energy",
  },
  {
    id: 2,
    number: "02",
    breadcrumb: "SOLUTIONS / EV CHARGING",
    title: (
      <>
        Next-gen commercial <br />
        <span className="text-blue-500 font-bold">EV charging hubs</span>
      </>
    ),
    desc: "Turnkey DC fast charging infrastructure with dynamic load management, OCPP 2.0.1 compliance, and automated cloud revenue billing.",
    image: "/hero/slide-2.jpg",
    btnText: "Explore EV Charging",
    btnHref: "/solutions/ev-charging",
  },
  {
    id: 3,
    number: "03",
    breadcrumb: "SOLUTIONS / ENERGY STORAGE",
    title: (
      <>
        Utility-grade lithium <br />
        <span className="text-blue-500 font-bold">battery storage (BESS)</span>
      </>
    ),
    desc: "Modular LiFePO4 battery storage systems engineered for continuous mission-critical backup, peak shaving, and sub-10ms UPS switchover.",
    image: "/hero/slide-3.png",
    btnText: "Explore Energy Storage",
    btnHref: "/solutions/energy-storage",
  },
];

export default function HomePage() {
  const [selectedService, setSelectedService] = useState<string>("solar");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // 3-Slide Carousel State
  const [heroSlide, setHeroSlide] = useState<number>(0);
  const [isHeroPaused, setIsHeroPaused] = useState<boolean>(false);
  const [slideProgress, setSlideProgress] = useState<number>(0);

  // 6-second auto-rotate timer with smooth segmented line filling
  useEffect(() => {
    if (isHeroPaused) return;

    const intervalTime = 60; // ms ticks
    const step = (intervalTime / 6000) * 100;

    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setHeroSlide((curr) => (curr + 1) % HERO_CAROUSEL_SLIDES.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isHeroPaused, heroSlide]);

  const handleNextSlide = () => {
    setHeroSlide((curr) => (curr + 1) % HERO_CAROUSEL_SLIDES.length);
    setSlideProgress(0);
  };

  const handlePrevSlide = () => {
    setHeroSlide((curr) =>
      curr === 0 ? HERO_CAROUSEL_SLIDES.length - 1 : curr - 1
    );
    setSlideProgress(0);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* ─── 1. HERO SECTION (3-SLIDE CAROUSEL MATCHING REFERENCE) ─── */}
      <section
        className="relative overflow-hidden min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] flex items-center bg-slate-950 text-white select-none"
        onMouseEnter={() => setIsHeroPaused(true)}
        onMouseLeave={() => setIsHeroPaused(false)}
      >
        {HERO_CAROUSEL_SLIDES.map((slide, idx) => {
          const isActive = idx === heroSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                isActive
                  ? "opacity-100 pointer-events-auto z-10"
                  : "opacity-0 pointer-events-none z-0"
              }`}
            >
              {/* Full-bleed background image with right/ambient alignment */}
              <Image
                src={slide.image}
                alt={`VLOXIA Slide ${slide.number}`}
                fill
                priority={idx === 0}
                className="object-cover object-center sm:object-right"
              />
              
              {/* Dark left-to-right gradient vignette ensuring text legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent sm:to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35" />

              {/* Slide Foreground Content */}
              <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full h-full flex flex-col justify-center relative z-20 pt-10 sm:pt-14 pb-20 sm:pb-24">
                {/* Top Breadcrumb with Dynamic Rotating Headline */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300/80 font-sans">
                    {slide.breadcrumb}
                  </div>
                  <span className="hidden sm:inline-block text-white/30">•</span>
                  <div className="hidden sm:inline-block">
                    <RotatingHeadline />
                  </div>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-2xl leading-[1.14] drop-shadow-md">
                  {slide.title}
                </h1>

                {/* Subtitle Description */}
                <p className="text-sm sm:text-base text-slate-200/90 max-w-xl leading-relaxed mt-3 mb-6 drop-shadow">
                  {slide.desc}
                </p>

                {/* Outlined Action Button matching Reference */}
                <div>
                  <Link
                    href={slide.btnHref}
                    className="btn-hover-effect glow-hover-blue inline-flex items-center gap-2.5 border border-white/60 hover:border-white hover:bg-white/15 text-white font-bold text-xs sm:text-sm tracking-wider uppercase px-6 py-3 sm:py-3.5 transition-all duration-300 group shadow-md"
                  >
                    <span>{slide.btnText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5 text-blue-500 group-hover:text-blue-400" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Bottom Navigation Controls Matching Reference Screenshots */}
        <div className="absolute bottom-8 sm:bottom-12 left-6 lg:left-12 z-30 flex items-end gap-8 sm:gap-12 text-white">
          {/* Left Block: Slide counter on top, segmented progress line below */}
          <div className="flex flex-col gap-2.5">
            <div className="text-xs sm:text-sm font-mono tracking-wider font-semibold">
              <span>{HERO_CAROUSEL_SLIDES[heroSlide].number}</span>
              <span className="text-white/40 mx-1">/</span>
              <span className="text-white/60">03</span>
            </div>

            {/* Segmented indicators: active slide has extended filling bar, other slides have compact dots */}
            <div className="flex items-center gap-2">
              {HERO_CAROUSEL_SLIDES.map((_, i) => {
                const isActive = i === heroSlide;
                return isActive ? (
                  <div
                    key={i}
                    className="w-28 sm:w-44 h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                    onClick={() => {
                      setHeroSlide(i);
                      setSlideProgress(0);
                    }}
                    title={`Slide ${i + 1} (Active)`}
                  >
                    <div
                      className="h-full bg-white transition-all duration-75 ease-linear rounded-full"
                      style={{ width: `${slideProgress}%` }}
                    />
                  </div>
                ) : (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setHeroSlide(i);
                      setSlideProgress(0);
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                    className="w-2.5 h-1 bg-white/40 hover:bg-white/90 hover:scale-125 rounded-full transition-all cursor-pointer"
                    title={`Go to slide ${i + 1}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Arrow Buttons [ < ] [ > ] with brand blue icons matching reference */}
          <div className="flex items-center gap-2 mb-0.5">
            <button
              type="button"
              onClick={handlePrevSlide}
              className="btn-hover-effect w-8 h-8 sm:w-9 sm:h-9 border border-white/40 bg-black/40 hover:border-white text-white flex items-center justify-center transition-all hover:scale-105 active:scale-90"
              title="Previous Slide"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4 text-blue-500" />
            </button>
            <button
              type="button"
              onClick={handleNextSlide}
              className="btn-hover-effect w-8 h-8 sm:w-9 sm:h-9 border border-white/40 bg-black/40 hover:border-white text-white flex items-center justify-center transition-all hover:scale-105 active:scale-90"
              title="Next Slide"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4 text-blue-500" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── 2. TIER-1 PARTNER ALLIANCES & OEM LOGO MARQUEE (POSITION 2) ─── */}
      <PartnerMarquee
        eyebrow={
          <>
            <span className="text-slate-900">Tier-1 Equipment &amp;</span>{" "}
            <span className="text-blue-600 font-bold">Authorized OEM Alliances</span>
          </>
        }
      />

      {/* ─── 3. ABOUT & SUSTAINABILITY VALUE SECTION (LIGHT THEME) ─── */}
      <section className="py-20 lg:py-28 border-t border-gray-100 bg-slate-50/60 text-slate-900 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Left Label: About */}
            <div className="lg:col-span-2">
              <span className="text-xs font-bold tracking-widest text-blue-600 uppercase font-mono">
                About VLOXIA
              </span>
            </div>

            {/* Right Column: Statement, Metrics & Details */}
            <div className="lg:col-span-10 space-y-12">
              <ScrollReveal>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-950 leading-snug tracking-tight max-w-3xl">
                  We create sustainable value by engineering clean power systems with{" "}
                  <span className="text-blue-600 font-bold">green innovation and responsible implementation</span>.
                </h2>
              </ScrollReveal>

              {/* Two Big Stats Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <ScrollReveal delay={0.1}>
                  <div className="space-y-2 border-l-2 border-blue-600 pl-6 bg-white p-4 rounded-r-2xl border-y border-r border-gray-200 shadow-xs">
                    <div className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
                      90%
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      Organizations reduce environmental impact and grid energy costs after implementing VLOXIA sustainability strategies.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <div className="space-y-2 border-l-2 border-cyan-500 pl-6 bg-white p-4 rounded-r-2xl border-y border-r border-gray-200 shadow-xs">
                    <div className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
                      75K+
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      Green initiatives, kW capacity, and sustainability projects successfully supported across India today.
                    </p>
                  </div>
                </ScrollReveal>
              </div>

              {/* Bottom Details Grid with EV Visual Card */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-6">
                
                {/* Left Card: Hardware Visual */}
                <div className="md:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm">
                  <Image
                    src="/ev.jpg"
                    alt="VLOXIA EV Charging & Clean Infrastructure"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white text-xs font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>Tier-1 Hardware Integration</span>
                  </div>
                </div>

                {/* Right Content & Actions */}
                <div className="md:col-span-7 space-y-6">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    We help organizations transition toward sustainable operations by providing expert guidance in climate strategy, environmental planning, and long-term impact solutions.
                  </p>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span>Proven sustainability solutions across multiple industries</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span>Expertise in both emerging startups and global enterprises</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span>Advanced solutions for climate action and carbon reduction</span>
                    </li>
                  </ul>

                  <div className="pt-2">
                    <Link
                      href="/about"
                      className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-full text-xs transition-all shadow-md shadow-blue-500/20"
                    >
                      Explore Our Impact
                    </Link>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── 4. "THE BRIGHT CHOICE FOR A SUSTAINABLE WORLD" (4 VERTICALS) ─── */}
      <section className="py-20 lg:py-28 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight mb-16">
              The bright choice <br />
              for an <span className="text-blue-600 font-bold">intelligent clean future</span>
            </h2>
          </ScrollReveal>

          {/* 4-Column Cards Row Matching Reference Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {CORE_SERVICES.map((srv, idx) => {
              const Icon = srv.icon;
              const isSelected = selectedService === srv.id;

              return (
                <ScrollReveal key={srv.id} delay={idx * 0.08}>
                  <div
                    onClick={() => setSelectedService(srv.id)}
                    className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 min-h-[320px] cursor-pointer group ${
                      isSelected
                        ? "bg-white border-2 border-blue-600 shadow-xl -translate-y-1"
                        : "bg-slate-50/70 border border-gray-200/80 hover:border-blue-400 hover:bg-white hover:shadow-xl hover:-translate-y-1"
                    }`}
                  >
                    <div>
                      {/* Icon Badge */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 shrink-0 transition-all duration-300 ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105"
                            : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                        {srv.title}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed">
                        {srv.desc}
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-gray-100">
                      <Link
                        href={srv.href}
                        onClick={(e) => e.stopPropagation()}
                        className={`text-xs font-bold inline-flex items-center gap-1.5 transition-colors ${
                          isSelected
                            ? "text-blue-600 hover:text-blue-800"
                            : "text-slate-700 group-hover:text-blue-600"
                        }`}
                      >
                        <span className="underline-hover-effect">Explore Scope</span>
                        <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1.5" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─── 5. "POWERING THE SUSTAINABLE INNOVATION" (BIG STATS & SCALE) ─── */}
      <section className="py-20 lg:py-28 border-t border-gray-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Heading, Text & Aerial Road Image */}
            <div className="lg:col-span-6 space-y-6">
              <ScrollReveal>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight leading-tight">
                  Powering <br />
                  <span className="text-blue-600 font-bold">clean energy innovation</span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mt-4">
                  Through advanced clean energy solutions and environmental initiatives, VLOXIA helps organizations accelerate their transition toward a more sustainable and responsible future.
                </p>

                <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm mt-6">
                  <Image
                    src="/Industries/Mobility.png"
                    alt="Curved Aerial Green Energy Route"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Massive Metric & Sub-stats Grid */}
            <div className="lg:col-span-6 space-y-10">
              <ScrollReveal delay={0.1}>
                <div className="space-y-2 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
                  <div className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-tight">
                    100% Uptime
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-blue-600">
                    Engineered for continuous industrial &amp; commercial duty cycles
                  </p>
                </div>
              </ScrollReveal>

              {/* 4-Item Sub-Stats Grid */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200/80">
                <ScrollReveal delay={0.15}>
                  <div className="space-y-1 bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
                    <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                      18k+
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      kW Solar EPC Installed
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <div className="space-y-1 bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
                    <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                      12k+
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      Daily EV Kilometers Powered
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.25}>
                  <div className="space-y-1 bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
                    <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                      6,000+
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      LiFePO4 Battery Cycles
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <div className="space-y-1 bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
                    <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                      &lt;10ms
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      Hybrid Inverter Transfer Latency
                    </div>
                  </div>
                </ScrollReveal>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── 6. "THE PROCESS BEHIND THE POWER" ─── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl">
            
            {/* Header Block with Blue Accent Bar */}
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-12">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                  The process behind the <span className="text-blue-400 font-bold">power</span>
                </h2>
              </div>
            </ScrollReveal>

            {/* 3 Vertical Step Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PROCESS_STEPS.map((step, idx) => (
                <ScrollReveal key={step.step} delay={idx * 0.1}>
                  <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 flex flex-col justify-between hover:border-blue-400 hover:bg-slate-900 hover:shadow-2xl transition-all duration-300 group cursor-pointer h-full">
                    <div className="space-y-4">
                      <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-cyan-400 border border-white/20 shadow-sm">
                          STEP {step.step}
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors duration-200">
                        {step.title}
                      </h3>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-800 text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
                      <span>Verified Milestone</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ─── 7. "INNOVATORS FOR VLOXIA" (AUDIENCE VERTICALS) ─── */}
      <section className="py-20 lg:py-28 border-t border-gray-100 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-4 space-y-3">
              <ScrollReveal>
                <span className="text-xs font-bold tracking-widest text-blue-600 uppercase font-mono">
                  TAILORED ECOSYSTEMS
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight">
                  Innovators for <br />
                  <span className="text-blue-600 font-bold">VLOXIA</span>
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed max-w-sm mt-3">
                  Tailored clean-tech power packages designed for specific operational architectures.
                </p>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {INNOVATOR_SECTORS.map((sec, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.08}>
                  <div className="rounded-2xl border border-gray-200/80 bg-white p-6 flex flex-col justify-between hover:border-blue-400 hover:shadow-xl transition-all duration-300 group cursor-pointer h-full">
                    <div className="space-y-3">
                      <span className="text-xs font-mono font-bold text-blue-600 tracking-wider uppercase block">
                        {sec.badge}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                        {sec.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {sec.desc}
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-gray-100">
                      <Link
                        href="/industries"
                        className="text-xs font-bold text-blue-600 group-hover:text-blue-800 flex items-center gap-1.5 transition-colors"
                      >
                        <span className="underline-hover-effect">Explore Scope</span>
                        <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1.5" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ─── 8. FEATURED HARDWARE MARKETPLACE ─── */}
      <FeaturedProducts
        title="Hardware Marketplace"
        eyebrow="Popular Equipment"
        description="Explore popular Tier-1 EV chargers, solar packages, and lithium batteries."
      />

      {/* ─── 9. "GET CLARITY — HOW WORKS FOR YOU" (FAQ ACCORDIONS) ─── */}
      <section className="py-20 lg:py-28 border-t border-gray-100 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Heading & Button */}
            <div className="lg:col-span-5 space-y-4">
              <ScrollReveal>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight leading-tight">
                  Get Clarity — <br />
                  <span className="text-blue-600 font-bold">How Works For You</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Have specific site questions? Our senior clean energy architects provide tailored answers within 24 hours.
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="btn-hover-effect glow-hover-blue inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-full text-xs shadow-lg shadow-blue-500/20 active:scale-95"
                  >
                    Ask a Technical Question
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Accordion Rows */}
            <div className="lg:col-span-7 space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <ScrollReveal key={idx} delay={idx * 0.05}>
                    <div
                      onClick={() => toggleFaq(idx)}
                      className={`rounded-2xl p-5 sm:p-6 transition-all duration-200 cursor-pointer ${
                        isOpen
                          ? "bg-blue-600 text-white shadow-xl border border-blue-500"
                          : "bg-white border border-gray-200 text-slate-800 hover:border-blue-300 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm sm:text-base font-bold">{faq.q}</span>
                        <span className={isOpen ? "text-white" : "text-blue-600"}>
                          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </span>
                      </div>

                      {isOpen && (
                        <p className={`mt-3 text-xs sm:text-sm leading-relaxed border-t pt-3 ${
                          isOpen ? "text-blue-50 border-white/20" : "text-slate-600 border-gray-100"
                        }`}>
                          {faq.a}
                        </p>
                      )}
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ─── 10. BOTTOM PANORAMIC CTA BANNER ─── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20 lg:pb-28">
        <ScrollReveal>
          <div className="relative rounded-3xl overflow-hidden aspect-[16/7] sm:aspect-[21/7] bg-slate-950 flex items-center justify-center text-center p-8 border border-gray-100 shadow-sm group">
            <Image
              src="/Industries/Commercial.png"
              alt="Let's Plan Your Green Future"
              fill
              className="object-cover opacity-35 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            <div className="relative z-10 max-w-xl space-y-5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                Let&apos;s plan your <span className="text-blue-400 font-bold">green future</span>
              </h2>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="btn-hover-effect glow-hover-blue inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3.5 rounded-full text-xs sm:text-sm shadow-lg shadow-blue-500/25 active:scale-95 group/btn"
                >
                  <span>Get Started with VLOXIA</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1.5" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
