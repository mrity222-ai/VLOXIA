"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Check, Sparkles } from "lucide-react";

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
    <div className="bg-white text-slate-900 min-h-screen pt-28 pb-24 selection:bg-[#d9f99d] selection:text-black">
      {/* ─── 1. HERO SECTION ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.15]">
              {data.heroTitle}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              {data.heroSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href={data.quoteLink}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#dcf836] text-black font-bold text-sm hover:bg-[#cdef2a] transition-all duration-200 shadow-sm hover:shadow-md group"
              >
                <span>Get a Quote</span>
                <span className="w-6 h-6 rounded-full bg-black text-[#dcf836] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3.5 rounded-full border border-slate-300 text-slate-800 font-semibold text-sm hover:border-slate-900 hover:text-black transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5">
            <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-50">
              <Image
                src={data.heroImage}
                alt={data.heroImageAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. WHY SHOULD YOU PARTNER? ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              {data.whyPartnerTitle || "Why Should You Partner?"}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pl-8">
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {data.whyPartnerSubtitle ||
                "Get a detailed understanding of the features we offer in our clean energy services, according to your key requirements so we can provide assistance adapted to your needs."}
            </p>
          </div>
        </div>

        {/* 2x2 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.whyPartnerCards.map((card, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-lg transition-all duration-300 space-y-4"
            >
              <div className="w-9 h-9 rounded-full bg-[#1b4332] text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-sm">
                {card.iconText || "✦"}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-950">
                {card.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 3. VARIOUS SOLUTIONS / PRODUCTS AVAILABLE ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-100">
        <div className="space-y-4 mb-12">
          <div className="inline-block px-3 py-1 rounded-md bg-[#dcf836] text-black text-xs font-bold uppercase tracking-wider">
            {data.categoryEyebrow}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
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

        {/* Product Cards Grid (2-column layout matching reference) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.products.map((prod, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col"
            >
              {/* Product Preview / Mockup Area */}
              <div className="relative bg-slate-50 border-b border-slate-100 h-64 sm:h-72 w-full p-6 flex items-center justify-center overflow-hidden">
                {prod.image ? (
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-200/60 bg-white">
                    <Image
                      src={prod.image}
                      alt={prod.title}
                      fill
                      className="object-cover object-center transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-2xl bg-white border border-slate-200/70 p-6 flex flex-col justify-between shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Hardware &amp; CMS
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
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
                  <h3 className="text-xl font-bold text-slate-950 mb-2">
                    {prod.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {prod.desc}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href={prod.href}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-950 hover:text-blue-600 transition-colors group"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 4. HOW TO REGISTER / DEPLOYMENT WORKFLOW ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Title & Category Tags */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              {data.howToTitle || "How to Deploy VLOXIA Solutions"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
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
                  className={`block text-left text-sm font-semibold transition-colors py-1 ${
                    selectedTag === idx
                      ? "text-slate-950 font-bold"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Numbered Step Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {data.deploymentSteps.map((step, idx) => {
              const isActive = activeStep === idx;

              return (
                <div
                  key={idx}
                  className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                    isActive
                      ? "bg-[#dcf836] border-[#dcf836] shadow-md"
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
                          isActive ? "text-black" : "text-slate-400"
                        }`}
                      >
                        {step.number}
                      </span>
                      <span
                        className={`text-sm sm:text-base font-bold ${
                          isActive ? "text-black" : "text-slate-900"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>

                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${
                        isActive
                          ? "rotate-180 text-black"
                          : "text-slate-400"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {/* Expanded Step Body */}
                  {isActive && (
                    <div className="px-5 pb-5 pt-0 text-sm text-slate-800 border-t border-black/10 mt-1 space-y-3">
                      <p className="leading-relaxed font-normal">
                        {step.desc}
                      </p>
                      {step.points && step.points.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {step.points.map((pt, pIdx) => (
                            <div key={pIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                              <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 5. BOTTOM CTA STRIP ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Upgrade Your Energy Infrastructure?
            </h3>
            <p className="text-sm text-slate-400 max-w-xl">
              Connect with our certified clean energy engineers to conduct a detailed site audit and custom deployment plan.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#dcf836] text-black font-bold text-sm hover:bg-[#cdef2a] transition-all hover:scale-105 active:scale-95 shadow-md flex-shrink-0"
          >
            <span>Talk to an Expert</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
