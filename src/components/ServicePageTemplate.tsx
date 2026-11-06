"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Check, Sparkles } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import RotatingHeadline from "./animations/RotatingHeadline";

export interface WhyPartnerCard {
  iconText?: string;
  title: string;
  desc: string;
}

export interface ProductShowcase {
  title: string;
  desc: string;
  image?: string;
  tag?: string;
  stats?: { label: string; value: string }[];
  href: string;
}

export interface DeploymentStep {
  number: string;
  title: string;
  desc: string;
  points?: string[];
}

export interface ServicePageData {
  categoryEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroImageAlt: string;
  quoteLink: string;
  whyPartnerTitle?: string;
  whyPartnerSubtitle?: string;
  whyPartnerCards: WhyPartnerCard[];
  productsTitle: string;
  productsSubtitle: string;
  products: ProductShowcase[];
  howToTitle?: string;
  howToSubtitle?: string;
  categoryTags?: string[];
  deploymentSteps: DeploymentStep[];
}

export default function ServicePageTemplate({ data }: { data: ServicePageData }) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedTag, setSelectedTag] = useState<number>(0);

  const tags = data.categoryTags || [
    "Commercial & Enterprise",
    "Residential Societies",
    "Fleet Operators",
  ];

  return (
    <div className="bg-white text-slate-900 min-h-screen pt-28 pb-24 selection:bg-blue-600 selection:text-white font-sans antialiased">
      {/* --- 1. HERO SECTION WITH SCROLL ANIMATION & TYPOGRAPHY --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>{data.categoryEyebrow}</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-semibold text-slate-500">Tier-1 EPC Infrastructure</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-slate-950 leading-[1.15]">
                {data.heroTitle.split(" ").slice(0, 3).join(" ")}{" "}
                <span className="text-shimmer font-bold">
                  {data.heroTitle.split(" ").slice(3).join(" ")}
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                {data.heroSubtitle}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href={data.quoteLink}
                  className="btn-hover-effect glow-hover-blue inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-all duration-200 shadow-md shadow-blue-500/25 active:scale-95 group"
                >
                  <span>Get a Quote</span>
                  <span className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center transition-transform group-hover:translate-x-0.5 shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="btn-hover-effect inline-flex items-center px-6 py-3.5 rounded-full border border-slate-300 text-slate-800 font-semibold text-sm hover:border-slate-900 hover:text-black transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.2}>
              <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-50 group">
                <Image
                  src={data.heroImage}
                  alt={data.heroImageAlt}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* --- 2. WHY SHOULD YOU PARTNER? --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-100">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            <div className="lg:col-span-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950">
                Why Should You <span className="text-shimmer font-bold">Partner?</span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:pl-8">
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {data.whyPartnerSubtitle ||
                  "Get a detailed understanding of the features we offer in our clean energy services, according to your key requirements so we can provide assistance adapted to your needs."}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* 2x2 Feature Grid with Scroll Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.whyPartnerCards.map((card, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div
                className="card-hover-effect lift-effect p-7 rounded-2xl border border-slate-200/80 bg-white hover:border-blue-400 hover:shadow-xl transition-all duration-300 space-y-4 h-full"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-sm shadow-blue-500/20">
                  {card.iconText || "✓"}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* --- 3. VARIOUS SOLUTIONS / PRODUCTS AVAILABLE --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-100">
        <ScrollReveal>
          <div className="space-y-4 mb-12">
            <div className="inline-block px-3 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-bold uppercase tracking-wider">
              {data.categoryEyebrow}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-7">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950">
                  {data.productsTitle}
                </h2>
              </div>
              <div className="lg:col-span-5 lg:pl-6">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {data.productsSubtitle}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Product Cards Grid with Staggered Scroll Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.products.map((prod, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.12}>
              <div
                className="card-hover-effect lift-effect rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col h-full group"
              >
                {/* Product Preview / Mockup Area */}
                <div className="relative bg-slate-50 border-b border-slate-100 h-64 sm:h-72 w-full p-6 flex items-center justify-center overflow-hidden">
                  {prod.image ? (
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-200/60 bg-white">
                      <Image
                        src={prod.image}
                        alt={prod.title}
                        fill
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full rounded-2xl bg-white border border-slate-200/70 p-6 flex flex-col justify-between shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Hardware &amp; CMS
                        </span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-xl font-bold text-slate-900">
                          {prod.tag || "Enterprise Grade"}
                        </div>
                        <div className="text-xs text-slate-500">
                          Fully Certified &amp; Automated
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                        <div className="text-xs text-slate-600 font-medium">
                          Uptime: 99.8%
                        </div>
                        <div className="text-xs text-slate-600 font-medium">
                          Standard: BIS / IEC
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Details Area */}
                <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-950 tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
                      {prod.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {prod.desc}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={prod.href}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group/link"
                    >
                      <span className="underline-hover-effect">Learn More</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* --- 4. HOW TO REGISTER / DEPLOYMENT WORKFLOW --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Title & Category Tags */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950">
                {data.howToTitle || "How to Deploy"} <span className="text-shimmer font-bold">VLOXIA Solutions</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-3">
                {data.howToSubtitle ||
                  "Accelerate your clean energy transition by registering for our turnkey deployment workflow."}
              </p>

              {/* Category Tags */}
              <div className="space-y-2 pt-4">
                {tags.map((tag, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedTag(idx)}
                    className={`block text-left text-sm font-semibold transition-colors py-1 cursor-pointer ${
                      selectedTag === idx
                        ? "text-blue-600 font-bold"
                        : "text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Numbered Step Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {data.deploymentSteps.map((step, idx) => {
              const isActive = activeStep === idx;

              return (
                <ScrollReveal key={idx} delay={idx * 0.08}>
                  <div
                    className={`rounded-2xl transition-all duration-300 overflow-hidden border cursor-pointer ${
                      isActive
                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                        : "bg-white border-slate-200/80 hover:border-slate-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveStep(idx)}
                      className="w-full flex items-center justify-between p-5 text-left gap-4"
                      aria-expanded={isActive}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-sm sm:text-base font-extrabold ${
                            isActive ? "text-blue-200" : "text-blue-600"
                          }`}
                        >
                          {step.number}
                        </span>
                        <span
                          className={`text-sm sm:text-base font-bold ${
                            isActive ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {step.title}
                        </span>
                      </div>

                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${
                          isActive
                            ? "rotate-180 text-white"
                            : "text-slate-400"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>

                    {/* Expanded Step Body */}
                    {isActive && (
                      <div className="px-5 pb-5 pt-3 text-sm border-t border-white/20 mt-1 space-y-3 text-blue-50">
                        <p className="leading-relaxed font-normal">
                          {step.desc}
                        </p>
                        {step.points && step.points.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {step.points.map((pt, pIdx) => (
                              <div key={pIdx} className="flex items-center gap-2 text-xs font-semibold text-white">
                                <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                                <span>{pt}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- 5. BOTTOM CTA STRIP WITH SCROLL REVEAL --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <ScrollReveal>
          <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Ready to Upgrade Your <span className="text-blue-400">Energy Infrastructure?</span>
              </h3>
              <p className="text-sm text-slate-400 max-w-xl">
                Connect with our certified clean energy engineers to conduct a detailed site audit and custom deployment plan.
              </p>
            </div>
            <Link
              href="/contact"
              className="btn-hover-effect glow-hover-blue inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25 flex-shrink-0"
            >
              <span>Talk to an Expert</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
