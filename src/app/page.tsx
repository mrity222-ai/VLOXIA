"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import FeaturedProducts from "@/components/FeaturedProducts";
import PartnerMarquee from "@/components/PartnerMarquee";
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
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";

const CORE_SERVICES = [
  {
    id: "solar",
    title: "Solar Panel",
    icon: Sun,
    desc: "High-efficiency Tier-1 monocrystalline & TOPCon solar arrays engineered for commercial roofs and ground mounts.",
    href: "/solutions/solar-energy",
  },
  {
    id: "agrivoltaics",
    title: "Agrivoltaics & EV Hubs",
    icon: Zap,
    desc: "Landowners, campuses, and fleets who want to combine land utilization while earning power revenue: we specialize in agrivoltaic arrays and high-speed EV charging bays.",
    href: "/solutions/ev-charging",
  },
  {
    id: "storage",
    title: "Energy Storage",
    icon: Battery,
    desc: "Modular LiFePO4 battery energy storage systems (BESS) delivering zero-emission critical backup and peak shaving.",
    href: "/solutions/energy-storage",
  },
  {
    id: "power",
    title: "Wind & Power Solutions",
    icon: Power,
    desc: "Industrial-grade hybrid inverters, sub-10ms UPS switchgear, and active harmonic filtering for clean power continuity.",
    href: "/solutions/power-solutions",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Site Planning & Energy Audit",
    desc: "Our technical team evaluates roof real estate, historical load curves, transformer capacity, and financial ROI parameters.",
    image: "/Industries/Commercial.png",
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
    image: "/Industries/Industrial.png",
  },
];

const INNOVATOR_SECTORS = [
  {
    title: "Communities & Societies",
    desc: "Shared residential housing EV charging bays with automated billing per apartment and common area rooftop solar.",
    badge: "Residential",
  },
  {
    title: "Businesses & Startups",
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
    q: "How does the turnkey clean energy development process work?",
    a: "We manage the entire lifecycle: preliminary site audit, custom single-line engineering, Tier-1 OEM procurement, civil & electrical installation, CEIG approvals, DISCOM net-metering, and continuous 24/7 cloud NOC monitoring.",
  },
  {
    q: "Do I need to pay anything upfront for the initial site assessment?",
    a: "No. Our preliminary engineering audit and feasibility assessment are conducted with zero obligation. We model your consumption curves and provide a transparent financial payback proposal.",
  },
  {
    q: "How much land or roof space is required for a commercial solar system?",
    a: "As a general guideline, 1 kW of rooftop solar requires approximately 80 to 100 square feet of shadow-free area. For ground-mount or canopy setups, we engineer bespoke elevated structures.",
  },
  {
    q: "Can I monetize my empty parking lot with EV charging infrastructure?",
    a: "Yes. We offer complete turnkey EV charging solutions including OCPP 1.6J/2.0.1 cloud software, dynamic load management, and UPI payment gateways allowing you to generate recurring charging revenue.",
  },
  {
    q: "What happens after installation is complete?",
    a: "Every project is backed by our SLA guarantee, scheduled preventive maintenance visits, fast-response spare parts replenishment, and direct OEM manufacturer warranty coverage.",
  },
];

const HERO_CAROUSEL_SLIDES = [
  {
    id: "slide-1",
    breadcrumb: "Home / EZ CHARGE",
    title: "Your parking lot is ready for an electric promotion",
    desc: "From power capacity to charging policies, understand everything needed to make your office EV-ready",
    btnText: "POWER YOUR OFFICE FOR EVs",
    btnHref: "/solutions/ev-charging",
    image: "/hero/slide-1.jpg",
    number: "01",
  },
  {
    id: "slide-2",
    breadcrumb: "Home / EZ CHARGE",
    title: "India’s largest public EV charging network",
    desc: "With a vast network spanning highways and byways, Tata Power EZ CHARGE offers over 5,500 EV charging stations to support your journeys and your fleet's operations",
    btnText: "CHARGE UP",
    btnHref: "/solutions/solar-energy",
    image: "/hero/slide-2.jpg",
    number: "02",
  },
  {
    id: "slide-3",
    breadcrumb: "Home / EZ CHARGE",
    title: "Tap charge and go with real-time tracking and more",
    desc: "No more waiting or wondering. Get on with your day with the EZ CHARGE self-care portal",
    btnText: "KNOW MORE",
    btnHref: "/contact",
    image: "/hero/slide-3.png",
    number: "03",
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedService, setSelectedService] = useState<string | null>("agrivoltaics");

  // 3-Slide Hero Carousel State & Auto-play
  const [heroSlide, setHeroSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);

  useEffect(() => {
    if (isHeroPaused) return;

    const interval = 60; // 60ms * 100 ticks = 6000ms (6s per slide)
    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setHeroSlide((curr) => (curr + 1) % HERO_CAROUSEL_SLIDES.length);
          return 0;
        }
        return prev + 1;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isHeroPaused]);

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
                alt={slide.title}
                fill
                priority={idx === 0}
                className="object-cover object-center sm:object-right"
              />
              
              {/* Dark left-to-right gradient vignette ensuring text legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent sm:to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35" />

              {/* Slide Foreground Content */}
              <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full h-full flex flex-col justify-center relative z-20 pt-10 sm:pt-14 pb-20 sm:pb-24">
                {/* Top Breadcrumb */}
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300/80 mb-3 font-sans">
                  {slide.breadcrumb}
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
                    className="btn-hover-effect glow-hover-cyan inline-flex items-center gap-2.5 border border-white/60 hover:border-white hover:bg-white/15 text-white font-bold text-xs sm:text-sm tracking-wider uppercase px-6 py-3 sm:py-3.5 transition-all duration-300 group shadow-md"
                  >
                    <span>{slide.btnText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5 text-cyan-400 group-hover:text-cyan-300" />
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

          {/* Arrow Buttons [ < ] [ > ] with cyan icons matching reference */}
          <div className="flex items-center gap-2 mb-0.5">
            <button
              type="button"
              onClick={handlePrevSlide}
              className="btn-hover-effect w-8 h-8 sm:w-9 sm:h-9 border border-white/40 hover:border-white hover:bg-white/10 text-cyan-400 flex items-center justify-center transition-all hover:scale-105 active:scale-90"
              title="Previous Slide"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              type="button"
              onClick={handleNextSlide}
              className="btn-hover-effect w-8 h-8 sm:w-9 sm:h-9 border border-white/40 hover:border-white hover:bg-white/10 text-cyan-400 flex items-center justify-center transition-all hover:scale-105 active:scale-90"
              title="Next Slide"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4 text-cyan-400" />
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

      {/* ─── 3. ABOUT & SUSTAINABILITY VALUE SECTION (MATCHES REFERENCE) ─── */}
      <section className="py-20 lg:py-28 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Left Label: About */}
            <div className="lg:col-span-2">
              <span className="text-xs font-bold tracking-widest text-slate-400 uppercase font-mono">
                About
              </span>
            </div>

            {/* Right Column: Statement, Metrics & Details */}
            <div className="lg:col-span-10 space-y-12">
              
              {/* Large Editorial Statement */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-950 leading-snug tracking-tight max-w-3xl">
                We create sustainable value by understanding your environmental goals and applying our expertise in{" "}
                <span className="text-blue-600 font-semibold">green innovation and responsible implementation</span>.
              </h2>

              {/* Two Big Stats Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div className="space-y-2 border-l-2 border-slate-900 pl-6">
                  <div className="text-4xl sm:text-5xl font-normal text-slate-950 tracking-tight">
                    90%
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Organizations reduce environmental impact and grid energy costs after implementing VLOXIA sustainability strategies.
                  </p>
                </div>

                <div className="space-y-2 border-l-2 border-slate-900 pl-6">
                  <div className="text-4xl sm:text-5xl font-normal text-slate-950 tracking-tight">
                    75K+
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Green initiatives, kW capacity, and sustainability projects successfully supported across India today.
                  </p>
                </div>
              </div>

              {/* Bottom Details Grid with EV Visual Card */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-6">
                
                {/* Left Card: Hardware Visual */}
                <div className="md:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-100 shadow-xs">
                  <Image
                    src="/ev.jpg"
                    alt="VLOXIA EV Charging & Clean Infrastructure"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white text-xs font-semibold">
                    Tier-1 Hardware Integration
                  </div>
                </div>

                {/* Right Content & Actions */}
                <div className="md:col-span-7 space-y-6">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    We help organizations transition toward sustainable operations by providing expert guidance in climate strategy, environmental planning, and long-term impact solutions.
                  </p>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      <span>Proven sustainability solutions across multiple industries</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      <span>Expertise in both emerging startups and global enterprises</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      <span>Advanced solutions for climate action and carbon reduction</span>
                    </li>
                  </ul>

                  <div className="pt-2">
                    <Link
                      href="/about"
                      className="inline-flex items-center justify-center bg-black hover:bg-slate-800 text-white font-medium px-6 py-2.5 rounded-full text-xs transition-all shadow-xs"
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

      {/* ─── 3. "THE BRIGHT CHOICE FOR A SUSTAINABLE WORLD" (4 VERTICALS) ─── */}
      <section className="py-20 lg:py-28 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-950 tracking-tight mb-16">
            The bright choice <br />
            for a <span className="text-blue-600 font-bold">sustainable world</span>
          </h2>

          {/* 4-Column Cards Row Matching Reference Layout (Interactive Blue Selection) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {CORE_SERVICES.map((srv) => {
              const Icon = srv.icon;
              const isSelected = selectedService === srv.id;

              return (
                <div
                  key={srv.id}
                  onClick={() => setSelectedService(srv.id)}
                  className={`card-hover-effect lift-effect shadow-hover-effect rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 min-h-[320px] cursor-pointer group ${
                    isSelected
                      ? "bg-blue-50/40 border-2 border-blue-600 shadow-xl ring-4 ring-blue-500/10 scale-[1.02] -translate-y-1 relative overflow-hidden"
                      : "bg-slate-50/70 border border-gray-200/80 hover:border-blue-400 hover:bg-white hover:shadow-xl hover:-translate-y-2"
                  }`}
                >
                  <div>
                    {/* Icon Badge: Vibrant Blue when selected, Soft Neutral when idle */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 shrink-0 transition-all duration-300 ${
                        isSelected
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105"
                          : "bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:scale-110"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-950 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                      {srv.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-gray-200/60">
                    <Link
                      href={srv.href}
                      onClick={(e) => e.stopPropagation()}
                      className={`text-xs font-bold inline-flex items-center gap-1.5 transition-colors ${
                        isSelected
                          ? "text-blue-600 hover:text-blue-700"
                          : "text-slate-900 group-hover:text-blue-600"
                      }`}
                    >
                      <span className="underline-hover-effect">Explore</span>
                      <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─── 4. "POWERING THE SUSTAINABLE INNOVATION" (BIG STATS & SCALE) ─── */}
      <section className="py-20 lg:py-28 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Heading, Text & Aerial Road Image */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-950 tracking-tight leading-tight">
                Powering the <br />
                <span className="text-blue-600 font-bold">sustainable innovation</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
                Through advanced clean energy solutions and environmental initiatives, VLOXIA helps organizations accelerate their transition toward a more sustainable and responsible future.
              </p>

              <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-slate-100 border border-gray-100 shadow-xs mt-6">
                <Image
                  src="/Industries/Mobility.png"
                  alt="Curved Aerial Green Energy Route"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right Column: Massive Metric ($210B+ / 150+ Bays) & Sub-stats Grid */}
            <div className="lg:col-span-6 space-y-10">
              <div className="space-y-2">
                <div className="text-6xl sm:text-7xl lg:text-8xl font-normal text-slate-950 tracking-tight">
                  $210B+
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-500">
                  Investment in renewable energy &amp; clean infrastructure
                </p>
              </div>

              {/* 4-Item Sub-Stats Grid with Thin Dividers */}
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold text-slate-950">
                    18k+
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    kW Solar EPC Installed
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold text-slate-950">
                    12k+
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Daily EV Kilometers Powered
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold text-slate-950">
                    60k+
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Community Initiatives
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold text-slate-950">
                    $5B
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Annual Energy Cost Savings
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── 5. "THE PROCESS BEHIND THE POWER" (DARK 3-STEP SECTION MATCHING REFERENCE) ─── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="rounded-3xl bg-[#0A0F1D] text-white p-8 sm:p-14 lg:p-16 relative overflow-hidden">
            
            {/* Header Block with Blue Accent Bar */}
            <div className="flex items-center gap-3 mb-12">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-white">
                The process behind the <span className="text-blue-400 font-bold">power</span>
              </h2>
            </div>

            {/* 3 Vertical Step Cards with Engineering Imagery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="card-hover-effect lift-effect shadow-hover-effect rounded-2xl bg-white/5 border border-white/10 p-5 flex flex-col justify-between hover:border-blue-400/50 hover:bg-white/[0.08] hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="img-zoom-container relative w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-slate-900">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="img-zoom-target object-cover group-hover:scale-108 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      {/* Image Overlay */}
                      <div className="img-overlay-effect absolute inset-0 bg-gradient-to-t from-blue-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-blue-400 shadow-sm">
                        STEP {step.step}
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors duration-200">
                      {step.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 text-xs font-semibold text-blue-400 flex items-center gap-1.5 group-hover:text-blue-300 transition-colors">
                    <span>Verified Milestone</span>
                    <CheckCircle2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ─── 6. "INNOVATORS FOR GREENAXIS / VLOXIA" (AUDIENCE VERTICALS) ─── */}
      <section className="py-20 lg:py-28 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-bold tracking-widest text-slate-400 uppercase font-mono">
                TAILORED ECOSYSTEMS
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal text-slate-950 tracking-tight">
                Innovators for <br />
                <span className="text-blue-600 font-bold">VLOXIA</span>
              </h2>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {INNOVATOR_SECTORS.map((sec, idx) => (
                <div
                  key={idx}
                  className="card-hover-effect lift-effect shadow-hover-effect rounded-2xl border border-gray-200/80 bg-slate-50/50 p-6 flex flex-col justify-between hover:border-blue-400 hover:bg-white hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white px-2.5 py-1 rounded-full border border-blue-200/70 inline-block transition-colors duration-200">
                      {sec.badge}
                    </span>
                    <h3 className="text-base font-bold text-slate-950 group-hover:text-blue-600 transition-colors duration-200">
                      {sec.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {sec.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-gray-200/60">
                    <Link
                      href="/industries"
                      className="text-xs font-bold text-slate-900 group-hover:text-blue-600 flex items-center gap-1.5 transition-colors"
                    >
                      <span className="underline-hover-effect">Explore Scope</span>
                      <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ─── 7. "PROVEN IMPACT, REAL RESULTS" (CASE STUDY FEATURE) ─── */}
      <section className="pb-20 lg:pb-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="lift-effect shadow-hover-effect relative rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] border border-gray-100 shadow-sm bg-slate-900 group">
            <Image
              src="/Industries/Residential.png"
              alt="Proven Impact Real Results Clean Architecture"
              fill
              className="img-zoom-target object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="100vw"
            />
            <div className="img-overlay-effect absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/30 transition-colors duration-300" />

            <div className="absolute top-6 left-6 text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Case Study
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mt-1">
                Proven impact, <span className="text-blue-400 font-bold">real results</span>
              </h3>
            </div>

            {/* Floating 70% Card */}
            <div className="lift-effect shadow-hover-effect absolute bottom-6 right-6 sm:bottom-10 sm:right-10 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-xs text-left hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-950">
                70%
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Energy bill reduction achieved for smart residential microgrid with integrated rooftop solar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. FEATURED HARDWARE MARKETPLACE ─── */}
      <FeaturedProducts
        title={
          <>
            <span className="text-slate-950">Hardware</span>{" "}
            <span className="text-blue-600 font-bold">Marketplace</span>
          </>
        }
        eyebrow="Popular Equipment"
        description="Explore popular Tier-1 EV chargers, solar packages, and lithium batteries."
        productIds={["ev-home-7kw", "ev-comm-22kw", "batt-lifepo4-5kwh", "inverter-hybrid-5kw"]}
      />

      {/* ─── 9. "GET CLARITY — HOW WORKS FOR YOU" (FAQ ACCORDIONS) ─── */}
      <section className="py-20 lg:py-28 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Heading & Yellow Button */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-normal text-slate-950 tracking-tight leading-tight">
                Get Clarity — <br />
                <span className="text-blue-600 font-bold">How Works For You</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Have specific site questions? Our senior clean energy architects provide tailored answers within 24 hours.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="btn-hover-effect glow-hover-blue inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-full text-xs shadow-md shadow-blue-500/20 active:scale-95"
                >
                  Ask a Question
                </Link>
              </div>
            </div>

            {/* Right Column: Accordion Rows (Dark Active Card + Clean Rows) */}
            <div className="lg:col-span-7 space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => toggleFaq(idx)}
                    className={`card-hover-effect rounded-2xl p-5 sm:p-6 transition-all duration-200 cursor-pointer hover:translate-x-1.5 ${
                      isOpen
                        ? "bg-blue-600 text-white shadow-md border border-blue-600"
                        : "bg-slate-50/70 border border-gray-200/80 text-slate-900 hover:bg-white hover:border-blue-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm sm:text-base font-bold">{faq.q}</span>
                      <span className={isOpen ? "text-white" : "text-slate-400"}>
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </div>

                    {isOpen && (
                      <p className={`mt-3 text-xs sm:text-sm leading-relaxed border-t pt-3 ${
                        isOpen ? "text-blue-50 border-white/20" : "text-slate-600 border-gray-200"
                      }`}>
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ─── 10. BOTTOM PANORAMIC CTA BANNER ("LET'S PLAN YOUR GREEN FUTURE") ─── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20 lg:pb-28">
        <div className="relative rounded-3xl overflow-hidden aspect-[16/7] sm:aspect-[21/7] bg-slate-950 flex items-center justify-center text-center p-8 border border-gray-100 shadow-sm group">
          <Image
            src="/Industries/Commercial.png"
            alt="Let's Plan Your Green Future"
            fill
            className="img-zoom-target object-cover opacity-35 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="relative z-10 max-w-xl space-y-5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight">
              Let&apos;s plan your <span className="text-blue-400 font-bold">green future</span>
            </h2>
            <div className="pt-2">
              <Link
                href="/contact"
                className="btn-hover-effect glow-hover-blue inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3.5 rounded-full text-xs sm:text-sm shadow-lg shadow-blue-500/25 active:scale-95 group/btn"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
