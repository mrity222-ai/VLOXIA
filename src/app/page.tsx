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
  Building2,
  Car,
  Home as HomeIcon,
  Factory,
  GraduationCap,
  Sparkles,
  Layers,
  Cpu,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

// 04 | WHAT WE DO — The 4 Complementary Business Verticals
const CORE_SERVICES = [
  {
    id: "ev-charging",
    title: "⚡ EV Charging Solutions",
    vertical: "01 / EV CHARGING",
    icon: Zap,
    desc: "AC & DC charging solutions for homes, workplaces, commercial establishments, fleets and public charging infrastructure.",
    highlight: "TATA EZ POWER Distributor",
    href: "/solutions/ev-charging",
  },
  {
    id: "solar-energy",
    title: "☀️ Solar Energy Solutions",
    vertical: "02 / SOLAR ENERGY",
    icon: Sun,
    desc: "Solar power solutions designed to reduce dependence on conventional electricity and improve long-term energy economics.",
    highlight: "Generate → Store → Manage → Consume",
    href: "/solutions/solar-energy",
  },
  {
    id: "energy-storage",
    title: "🔋 Energy Storage & Lithium",
    vertical: "03 / ENERGY STORAGE",
    icon: Battery,
    desc: "Lithium-based energy storage and inverter solutions for backup power, energy management and greater energy independence.",
    highlight: "Integrated Lithium Battery Systems",
    href: "/solutions/energy-storage",
  },
  {
    id: "power-solutions",
    title: "⚙️ Power Solutions",
    vertical: "04 / POWER SOLUTIONS",
    icon: Power,
    desc: "Integrated power and energy solutions addressing backup, reliability, efficiency and evolving electrical infrastructure requirements.",
    highlight: "End-to-End Continuity & Resilience",
    href: "/solutions/power-solutions",
  },
];

// 13 | OUR SOLUTION PHILOSOPHY (5 STEPS)
const SOLUTION_PHILOSOPHY = [
  {
    step: "01",
    phase: "UNDERSTAND",
    title: "Customer Energy Requirement",
    desc: "We look at the complete operational profile — power demand, usage schedules, charger requirements, and future scalability.",
    image: "/Industries/Commercial.png",
  },
  {
    step: "02",
    phase: "ANALYSE",
    title: "Site & Electrical Infrastructure",
    desc: "Technical evaluation of roof space, transformer capacity, grid power quality, and dynamic load compatibility.",
    image: "/ev.jpg",
  },
  {
    step: "03",
    phase: "RECOMMEND",
    title: "Right Technology & Configuration",
    desc: "Tailored recommendation of certified Tier-1 equipment, optimum system sizing, and transparent ROI economics.",
    image: "/Industries/Industrial.png",
  },
  {
    step: "04",
    phase: "IMPLEMENT",
    title: "Precision Execution & Quality",
    desc: "Certified installation, safety clearances, DISCOM synchronization, and rigorous commissioning standards.",
    image: "/Industries/Mobility.png",
  },
  {
    step: "05",
    phase: "SUPPORT",
    title: "Ongoing Lifecycle & Telemetry",
    desc: "Continuous after-sales support, OEM warranty management, proactive maintenance, and technical assistance.",
    image: "/Industries/Commercial.png",
  },
];

// 10 | OUR CUSTOMER SEGMENTS
const CUSTOMER_SEGMENTS = [
  {
    id: "residential",
    title: "Residential",
    icon: HomeIcon,
    desc: "Independent homes, premium residences, apartment communities, residential rooftop solar, society EV charging, and compact lithium backup.",
    badge: "Homes & Societies",
  },
  {
    id: "commercial",
    title: "Commercial",
    icon: Building2,
    desc: "Offices, retail outlets, hotels, restaurants, hospitals, educational institutions, warehouses, and commercial business complexes.",
    badge: "Enterprises & Retail",
  },
  {
    id: "industrial",
    title: "Industrial",
    icon: Factory,
    desc: "Manufacturing facilities, industrial units, logistics hubs, cold storage, and energy-intensive manufacturing operations.",
    badge: "Plants & Logistics",
  },
  {
    id: "mobility",
    title: "Mobility",
    icon: Car,
    desc: "EV fleets, fleet operators, automotive dealerships, charging-point operators (CPOs), and highway public charging infrastructure.",
    badge: "Fleets & Corridors",
  },
  {
    id: "institutional",
    title: "Institutional",
    icon: GraduationCap,
    desc: "Schools, colleges, government institutions, healthcare institutions, corporate campuses, and large residential communities.",
    badge: "Campuses & Public",
  },
];

// 11 | WHY VLOXIA? (THE 6 DIFFERENTIATORS)
const DIFFERENTIATORS = [
  {
    number: "01",
    title: "Technology-Led",
    desc: "We focus on emerging technologies that are shaping the future of clean energy and intelligent mobility.",
  },
  {
    number: "02",
    title: "Multi-Vertical Portfolio",
    desc: "Customers access EV charging, solar, storage and power solutions under one single unified platform.",
  },
  {
    number: "03",
    title: "Strong OEM Ecosystem",
    desc: "We work with established technology partners like TATA EZ POWER to bring dependable products to market.",
  },
  {
    number: "04",
    title: "Solution-Oriented",
    desc: "We focus on the customer's specific energy requirements rather than simply selling an off-the-shelf product.",
  },
  {
    number: "05",
    title: "Scalability",
    desc: "Our solutions are engineered to support customers as their energy, storage, and charging needs expand.",
  },
  {
    number: "06",
    title: "Channel-Focused",
    desc: "Building a dependable distribution and partner network across India for long-term collaborative growth.",
  },
];

// Official FAQs
const FAQS = [
  {
    q: "What makes VLOXIA Systems LLP different from ordinary equipment sellers?",
    a: "Our approach goes beyond product distribution. We aim to understand the customer's energy requirement, recommend the right technology, and create a dependable solution around it across EV Charging, Solar Energy, Lithium Storage, and Power Systems.",
  },
  {
    q: "What is VLOXIA's partnership with TATA EZ POWER?",
    a: "VLOXIA Systems LLP operates as a distributor for Tata EZ Power AC and DC EV charging solutions as well as inverter solutions with integrated lithium battery systems, supporting customers and channel partners across India.",
  },
  {
    q: "How does the Solar + Storage solution work?",
    a: "The combination of solar generation and battery storage creates a more resilient energy ecosystem by enabling customers to Generate (Solar) → Store (Lithium) → Manage (Intelligent Inverter) → Consume on-demand, reducing dependence on conventional grid electricity.",
  },
  {
    q: "Can VLOXIA support EV charging for residential apartment societies?",
    a: "Yes. We provide complete AC EV charging solutions for independent homes, apartments, and residential societies, including charger selection, power availability audit, installation, and scalable infrastructure.",
  },
  {
    q: "How can businesses or dealers become VLOXIA Channel Partners?",
    a: "We welcome dealers, distributors, installers, EPC contractors, and solution partners. Contact Manu Bhatia (Business & Channel Partnerships) at +91 8178810456 or email vloxiasystems@gmail.com to apply.",
  },
];

// 3 Exact Slides matching Master Deck
const HERO_CAROUSEL_SLIDES = [
  {
    id: 1,
    number: "01",
    breadcrumb: "ENERGY × TECHNOLOGY × MOBILITY",
    title: (
      <>
        Powering Mobility. <br />
        <span className="text-cyan-400 font-bold">Harnessing Energy.</span>
      </>
    ),
    tagline: "Enabling a Sustainable Future.",
    desc: "A technology-driven sustainable energy and power solutions company focused on enabling businesses, institutions and consumers to transition towards cleaner, smarter and more efficient energy ecosystems.",
    image: "/Industries/Commercial.png",
    btnText: "Explore EV Charging",
    btnHref: "/solutions/ev-charging",
  },
  {
    id: 2,
    number: "02",
    breadcrumb: "INTELLIGENT ENERGY / RELIABLE POWER",
    title: (
      <>
        Advanced Inverters &amp; <br />
        <span className="text-blue-400 font-bold">Integrated Lithium Storage</span>
      </>
    ),
    tagline: "Store Energy. Secure Power. Improve Efficiency.",
    desc: "Inverters with integrated lithium battery systems addressing the growing demand for compact, reliable, and intelligent energy-storage across India.",
    image: "/ev.jpg",
    btnText: "Explore Energy Storage",
    btnHref: "/solutions/energy-storage",
  },
  {
    id: 3,
    number: "03",
    breadcrumb: "TATA EZ POWER DISTRIBUTOR / MULTI-VERTICAL",
    title: (
      <>
        Enabling India&apos;s <br />
        <span className="text-cyan-400 font-bold">Clean Energy Transition</span>
      </>
    ),
    tagline: "One Partner. Multiple Energy Possibilities.",
    desc: "Bringing together EV Charging, Solar Energy, Lithium Energy Storage, and Power Solutions under a single, unified technology platform.",
    image: "/Industries/Industrial.png",
    btnText: "Explore Our Ecosystem",
    btnHref: "/approach",
  },
];

export default function HomePage() {
  const [selectedService, setSelectedService] = useState<string>("ev-charging");
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
      
      {/* ─── 1. HERO SECTION (3-SLIDE CAROUSEL MATCHING MASTER DECK) ─── */}
      <section
        className="relative overflow-hidden min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center bg-slate-950 text-white select-none"
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
              {/* Full-bleed background image */}
              <Image
                src={slide.image}
                alt={`VLOXIA Slide ${slide.number}`}
                fill
                priority={idx === 0}
                className="object-cover object-center sm:object-right"
              />
              
              {/* Dark left-to-right gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-transparent sm:to-black/35" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

              {/* Slide Foreground Content */}
              <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full h-full flex flex-col justify-center relative z-20 pt-10 sm:pt-14 pb-20 sm:pb-24">
                {/* Top Breadcrumb with Dynamic Headline */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-400 font-mono">
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

                {/* Brand Tagline Badge */}
                <div className="inline-flex items-center gap-2 mt-3 text-cyan-300 font-medium text-xs sm:text-sm">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{slide.tagline}</span>
                </div>

                {/* Subtitle Description */}
                <p className="text-xs sm:text-sm text-slate-200/90 max-w-xl leading-relaxed mt-3 mb-6 drop-shadow">
                  {slide.desc}
                </p>

                {/* Outlined Action Button */}
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

        {/* Bottom Navigation Controls */}
        <div className="absolute bottom-8 sm:bottom-12 left-6 lg:left-12 z-30 flex items-end gap-8 sm:gap-12 text-white">
          <div className="flex flex-col gap-2.5">
            <div className="text-xs sm:text-sm font-mono tracking-wider font-semibold">
              <span>{HERO_CAROUSEL_SLIDES[heroSlide].number}</span>
              <span className="text-white/40 mx-1">/</span>
              <span className="text-white/60">03</span>
            </div>

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

          <div className="flex items-center gap-2 mb-0.5">
            <button
              type="button"
              onClick={handlePrevSlide}
              className="btn-hover-effect w-8 h-8 sm:w-9 sm:h-9 border border-white/40 bg-black/40 hover:border-white text-white flex items-center justify-center transition-all hover:scale-105 active:scale-90"
              title="Previous Slide"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              type="button"
              onClick={handleNextSlide}
              className="btn-hover-effect w-8 h-8 sm:w-9 sm:h-9 border border-white/40 bg-black/40 hover:border-white text-white flex items-center justify-center transition-all hover:scale-105 active:scale-90"
              title="Next Slide"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── 2. TIER-1 PARTNER ALLIANCES & OEM LOGO MARQUEE (FEATURING TATA EZ POWER) ─── */}
      <PartnerMarquee
        eyebrow={
          <>
            <span className="text-slate-900">Official Distributor &amp;</span>{" "}
            <span className="text-blue-600 font-bold">Technology Partnerships</span>
          </>
        }
      />

      {/* ─── 3. 01 | WHO WE ARE — INTELLIGENT ENERGY. RELIABLE POWER. SUSTAINABLE SOLUTIONS. ─── */}
      <section className="py-20 lg:py-28 border-t border-gray-100 bg-slate-50/60 text-slate-900 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            <div className="lg:col-span-3">
              <span className="text-xs font-bold tracking-widest text-blue-600 uppercase font-mono block">
                01 | WHO WE ARE
              </span>
              <span className="text-xs text-slate-400 font-mono mt-1 block">
                VLOXIA SYSTEMS LLP
              </span>
            </div>

            <div className="lg:col-span-9 space-y-10">
              <ScrollReveal>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-950 leading-snug tracking-tight max-w-3xl">
                  Intelligent Energy. Reliable Power.{" "}
                  <span className="text-blue-600 font-bold">Sustainable Solutions.</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mt-4">
                  VLOXIA Systems LLP is a technology-driven sustainable energy and power solutions company focused on enabling businesses, institutions and consumers to transition towards cleaner, smarter and more efficient energy ecosystems.
                </p>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-3xl mt-2">
                  Our portfolio brings together solutions across Electric Vehicle Charging, Solar Energy, Lithium Energy Storage, Inverters and Power Management, creating a single platform for the evolving energy requirements of modern India.
                </p>
              </ScrollReveal>

              {/* Approach Beyond Distribution Callout */}
              <div className="p-6 bg-white rounded-2xl border border-gray-200/80 shadow-xs space-y-2">
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider font-mono">
                  OUR PHILOSOPHY
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Our approach goes beyond product distribution.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We aim to understand the customer&apos;s energy requirement, recommend the right technology and create a dependable solution around it.
                </p>
              </div>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                <div className="space-y-2 border-l-2 border-blue-600 pl-4 bg-white p-4 rounded-r-xl border-y border-r border-gray-100 shadow-2xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
                    PARTNER ECOSYSTEM
                  </div>
                  <div className="text-base font-extrabold text-slate-900">
                    Tier-1 Technology
                  </div>
                  <p className="text-xs text-slate-500">
                    Working with established manufacturers including TATA EZ POWER.
                  </p>
                </div>

                <div className="space-y-2 border-l-2 border-cyan-500 pl-4 bg-white p-4 rounded-r-xl border-y border-r border-gray-100 shadow-2xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-cyan-600 font-mono">
                    NATIONWIDE NETWORK
                  </div>
                  <div className="text-base font-extrabold text-slate-900">
                    Channel &amp; Distribution
                  </div>
                  <p className="text-xs text-slate-500">
                    Strong channel partners, installers, and project solution networks across India.
                  </p>
                </div>

                <div className="space-y-2 border-l-2 border-emerald-500 pl-4 bg-white p-4 rounded-r-xl border-y border-r border-gray-100 shadow-2xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-mono">
                    END-TO-END
                  </div>
                  <div className="text-base font-extrabold text-slate-900">
                    Dependable Solutions
                  </div>
                  <p className="text-xs text-slate-500">
                    From load analysis to certified hardware, integration and lifecycle support.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── 4. 04 | WHAT WE DO — THE 4 COMPLEMENTARY BUSINESS VERTICALS ─── */}
      <section className="py-20 lg:py-28 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          
          <ScrollReveal>
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase font-mono block mb-2">
              04 | WHAT WE DO
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight mb-4">
              Four Complementary <br />
              <span className="text-blue-600 font-bold">Business Verticals</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto mb-16">
              VLOXIA operates across four integrated pillars that address India&apos;s evolving energy, mobility, and storage landscape.
            </p>
          </ScrollReveal>

          {/* 4-Column Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {CORE_SERVICES.map((srv, idx) => {
              const Icon = srv.icon;
              const isSelected = selectedService === srv.id;

              return (
                <ScrollReveal key={srv.id} delay={idx * 0.08}>
                  <div
                    onClick={() => setSelectedService(srv.id)}
                    className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 min-h-[340px] cursor-pointer group ${
                      isSelected
                        ? "bg-white border-2 border-blue-600 shadow-xl -translate-y-1"
                        : "bg-slate-50/70 border border-gray-200/80 hover:border-blue-400 hover:bg-white hover:shadow-xl hover:-translate-y-1"
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-4">
                        {srv.vertical}
                      </div>

                      {/* Icon Badge */}
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-5 shrink-0 transition-all duration-300 ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105"
                            : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                        {srv.title}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        {srv.desc}
                      </p>

                      <div className="inline-block text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                        {srv.highlight}
                      </div>
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
                        <span className="underline-hover-effect">Explore Vertical</span>
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

      {/* ─── 5. 14 | THE VLOXIA ECOSYSTEM — GENERATE → STORE → POWER → MOVE ─── */}
      <section className="py-20 lg:py-28 border-t border-gray-100 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase font-mono block mb-2">
              14 | THE VLOXIA ECOSYSTEM
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              One Connected Energy Journey
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Connecting power generation, battery storage, intelligent inverters, and clean mobility into a unified cycle.
            </p>
          </div>

          {/* 4 Connected Stages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Stage 1: GENERATE */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 hover:border-cyan-400 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
                  SOLAR ENERGY
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  GENERATE
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rooftop &amp; commercial solar power systems generating clean electricity right at the point of consumption.
              </p>
            </div>

            {/* Stage 2: STORE */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 hover:border-blue-400 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/30 text-blue-400 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <div>
                <span className="text-[11px] font-mono text-blue-400 uppercase tracking-widest">
                  LITHIUM STORAGE
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  STORE
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                High-cycle lithium battery systems storing excess solar and off-peak grid energy for when it is needed most.
              </p>
            </div>

            {/* Stage 3: POWER */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 hover:border-indigo-400 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-400 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <div>
                <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest">
                  INVERTERS &amp; POWER
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  POWER
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Intelligent inverters delivering continuous power backup, sub-10ms transfer, and intelligent energy management.
              </p>
            </div>

            {/* Stage 4: MOVE */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 hover:border-emerald-400 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 flex items-center justify-center font-bold text-sm">
                04
              </div>
              <div>
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest">
                  EV CHARGING
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  MOVE
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                AC and DC fast charging infrastructure driving electric vehicles with clean, dependable, and scalable power.
              </p>
            </div>

          </div>

          {/* Equation Banner */}
          <div className="mt-12 text-center p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs font-mono tracking-widest text-slate-400 uppercase block mb-1">
              THE VLOXIA FORMULA
            </span>
            <div className="text-base sm:text-xl font-mono font-bold text-cyan-300 tracking-wider">
              ENERGY × TECHNOLOGY × MOBILITY × SUSTAINABILITY
            </div>
          </div>

        </div>
      </section>

      {/* ─── 6. 09 | TECHNOLOGY PARTNER SHOWCASE (TATA EZ POWER DISTRIBUTOR) ─── */}
      <section className="py-20 lg:py-28 border-t border-gray-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <ScrollReveal>
                <span className="text-xs font-bold tracking-widest text-blue-600 uppercase font-mono block">
                  09 | TECHNOLOGY PARTNERS
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight leading-tight">
                  Building the Right Portfolio <br />
                  <span className="text-blue-600 font-bold">with the Right Partners</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  VLOXIA believes that strong technology partnerships are fundamental to building a reliable energy business. Our current portfolio includes anchor distributor operations for:
                </p>

                <div className="space-y-4 pt-2">
                  <div className="p-5 bg-white rounded-2xl border border-gray-200/80 shadow-xs space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <h4 className="text-sm font-bold text-slate-900">
                        TATA EZ POWER — EV Charging Solutions
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed pl-4">
                      VLOXIA Systems LLP operates as a distributor for Tata&apos;s AC and DC EV charging solutions, supporting customers and channel partners with direct access to EV charging technologies.
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-gray-200/80 shadow-xs space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <h4 className="text-sm font-bold text-slate-900">
                        Inverters &amp; Integrated Lithium Energy Storage
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed pl-4">
                      Distributing advanced inverter solutions with integrated lithium battery systems, addressing the growing demand for compact and intelligent energy-storage.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/partners"
                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    <span>Explore Channel Partner Opportunities</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm">
                <Image
                  src="/ev.jpg"
                  alt="TATA EZ POWER EV Charging & Lithium Inverters"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                    AUTHORIZED DISTRIBUTOR
                  </span>
                  <div className="text-lg font-bold">TATA EZ POWER</div>
                  <p className="text-xs text-slate-300">
                    EV Charging Solutions &amp; Integrated Lithium Inverter Systems
                  </p>
                </div>
              </div>

              {/* Expanding Portfolio Tags */}
              <div className="p-5 bg-white rounded-2xl border border-gray-200/80">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  OUR EXPANDING TECHNOLOGIES
                </span>
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                  <span className="bg-slate-100 px-3 py-1 rounded-full">EV Charging</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full">Solar</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full">Lithium Storage</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full">Inverters</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full">Power Electronics</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full">Energy Management</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 7. 10 | OUR CUSTOMER SEGMENTS ─── */}
      <section className="py-20 lg:py-28 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase font-mono block mb-2">
              10 | OUR CUSTOMER SEGMENTS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight mb-4">
              Solutions Designed for <br />
              <span className="text-blue-600 font-bold">Every Segment</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              From independent homes to large-scale industrial plants, mobility fleets, and educational institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {CUSTOMER_SEGMENTS.map((seg, idx) => {
              const Icon = seg.icon;
              return (
                <ScrollReveal key={seg.id} delay={idx * 0.08}>
                  <div className="rounded-2xl border border-gray-200/80 bg-slate-50/60 p-6 flex flex-col justify-between hover:bg-white hover:border-blue-400 hover:shadow-xl transition-all duration-300 group cursor-pointer h-full">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-gray-200 inline-block">
                        {seg.badge}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {seg.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {seg.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gray-200/60">
                      <Link
                        href={`/industries#${seg.id}`}
                        className="text-xs font-bold text-blue-600 group-hover:text-blue-800 flex items-center gap-1.5 transition-colors"
                      >
                        <span>View Segment</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─── 8. 11 | WHY VLOXIA? (THE 6 DIFFERENTIATORS) ─── */}
      <section className="py-20 lg:py-28 border-t border-gray-100 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase font-mono block mb-2">
              11 | WHY VLOXIA?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight mb-4">
              One Partner. <br />
              <span className="text-blue-600 font-bold">Multiple Energy Possibilities.</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              The energy ecosystem is rapidly converging. Solar is becoming more accessible. EV adoption is accelerating. Lithium storage is transforming backup power. VLOXIA brings these technologies together under one platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIFFERENTIATORS.map((diff, idx) => (
              <ScrollReveal key={diff.number} delay={idx * 0.08}>
                <div className="rounded-2xl bg-white border border-gray-200/80 p-6 space-y-3 hover:border-blue-400 hover:shadow-lg transition-all">
                  <div className="text-xs font-mono font-bold text-blue-600">
                    {diff.number} | DIFFERENTIATOR
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {diff.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {diff.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 9. 13 | OUR SOLUTION PHILOSOPHY (THE 5 STEPS) ─── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl">
            
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                  13 | SOLUTION PHILOSOPHY
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2">
                Understand → Analyse → Recommend → <span className="text-blue-400 font-bold">Implement → Support</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mb-12">
                We believe that every energy requirement is unique. Our structured approach ensures the right technology is selected and implemented seamlessly.
              </p>
            </ScrollReveal>

            {/* 5 Step Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {SOLUTION_PHILOSOPHY.map((step, idx) => (
                <ScrollReveal key={step.step} delay={idx * 0.08}>
                  <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between hover:border-cyan-400 transition-all group h-full">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-cyan-400">
                          STEP {step.step}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase">
                          {step.phase}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-800 text-[11px] font-semibold text-cyan-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{step.phase}</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ─── 10. HARDWARE MARKETPLACE PREVIEW ─── */}
      <FeaturedProducts
        title="Hardware Marketplace"
        eyebrow="Certified Equipment"
        description="Browse certified EV chargers, integrated lithium inverters, and clean energy hardware."
      />

      {/* ─── 11. FAQ ACCORDIONS ─── */}
      <section className="py-20 lg:py-28 border-t border-gray-100 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-5 space-y-4">
              <ScrollReveal>
                <span className="text-xs font-bold tracking-widest text-blue-600 uppercase font-mono block">
                  CLARITY &amp; INSIGHTS
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight leading-tight">
                  Frequently Asked <br />
                  <span className="text-blue-600 font-bold">Questions</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Have questions about EV charging, inverters, solar, or channel partnerships? We are here to guide you.
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="btn-hover-effect glow-hover-blue inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-full text-xs shadow-lg shadow-blue-500/20 active:scale-95"
                  >
                    Contact Our Energy Team
                  </Link>
                </div>
              </ScrollReveal>
            </div>

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

      {/* ─── 12. 18 | REGISTERED OFFICE & PARTNERSHIP CTA BANNER ─── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20 lg:pb-28">
        <ScrollReveal>
          <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 lg:p-14 border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                18 | CONNECT WITH VLOXIA
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                Partner with <span className="text-cyan-400">VLOXIA SYSTEMS LLP</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Ready to explore EV charging, solar energy, lithium storage, or channel distribution? Contact our corporate desk or visit our registered office.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Registered Office</span>
                    <span>A3/55, Sector 15, Rohini, Delhi 110089</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Manu Bhatia (Partnerships)</span>
                    <a href="tel:+918178810456" className="text-cyan-300 hover:underline">
                      +91 8178810456
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center items-stretch lg:items-end">
              <Link
                href="/partners"
                className="btn-hover-effect glow-hover-cyan inline-flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-8 py-3.5 rounded-full text-xs sm:text-sm shadow-lg shadow-cyan-500/20 active:scale-95 text-center"
              >
                <span>Become a Channel Partner</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 text-white font-semibold px-8 py-3.5 rounded-full text-xs sm:text-sm transition-all text-center"
              >
                <span>Contact Corporate Desk</span>
              </Link>
            </div>

          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}