"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative bg-white pt-8 sm:pt-12 pb-10 select-none text-gray-700 font-sans antialiased border-t border-gray-100">
      {/* ── [1] FLOATING BLUE NEWSLETTER BANNER (MATCHES USER REFERENCE) ── */}
      <div className="container-xl max-w-6xl mx-auto px-4 sm:px-6 relative z-10 mb-14 sm:mb-20">
        <div className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-700 rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 text-white shadow-2xl shadow-blue-500/25 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Subtle decorative glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />
          <div className="absolute left-1/4 -top-20 w-60 h-60 rounded-full bg-indigo-400/20 blur-2xl pointer-events-none" />

          {/* Left: 3D Visual Asset matching reference */}
          <div className="relative w-48 h-48 sm:w-60 sm:h-60 shrink-0 flex items-center justify-center">
            <Image
              src="/Modern EV Charging.png"
              alt="Clean Energy Systems"
              fill
              sizes="(max-width: 768px) 200px, 240px"
              className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right: Newsletter Content & Glass Pill Input */}
          <div className="relative z-10 max-w-xl text-center md:text-left flex-1">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              Subscribe to our newsletter to get updates to our latest collections
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 mt-2.5 leading-relaxed">
              Get 20% off on your first order just by subscribing to our clean energy updates.
            </p>

            {/* Newsletter Glass Input Pill */}
            {isSubscribed ? (
              <div className="mt-5 p-3.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs sm:text-sm font-bold flex items-center gap-2 justify-center md:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Thank you! You are now subscribed to VLOXIA updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-5">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-1.5 flex items-center max-w-md mx-auto md:mx-0 shadow-inner">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent text-white placeholder-white/80 px-4 py-2 text-xs sm:text-sm focus:outline-none flex-1 min-w-0"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 text-[#0066ff] font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md transition-all shrink-0 hover:scale-105 active:scale-95 group cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <span className="w-4 h-4 rounded-full bg-[#0066ff]/10 text-[#0066ff] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </button>
                </div>
                <p className="text-[11px] text-white/70 mt-2.5">
                  You will be able to unsubscribe at any time. Read our{" "}
                  <Link href="/about" className="underline hover:text-white">
                    privacy policy here
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── [2] MAIN WHITE FOOTER CONTENT (MATCHES USER REFERENCE) ── */}
      <div className="container-xl max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Column 1: Brand & Logo */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <div className="p-1 inline-block">
                <Image
                  src="/vloxia-logo.png"
                  alt="VLOXIA Systems LLP"
                  width={140}
                  height={45}
                  className="h-8 w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
              VLOXIA Systems LLP delivers certified EV charging infrastructure, solar rooftop setups, and lithium energy storage systems across India.
            </p>

            {/* Social Icons matching reference */}
            <div className="flex items-center gap-2 pt-1 text-gray-700">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors"
                title="Twitter / X"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-colors"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-colors"
                title="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="/"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-colors"
                title="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/solutions/ev-charging" className="hover:text-blue-600 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/approach" className="hover:text-blue-600 transition-colors">
                  Our Approach
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-blue-600 transition-colors">
                  Channel Partners
                </Link>
              </li>
              <li>
                <Link href="/about#why-vloxia" className="hover:text-blue-600 transition-colors">
                  Why VLOXIA
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors">
                  Site Assessment
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-blue-600 transition-colors">
                  Warranty & Delivery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Links / Solutions */}
          <div>
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-4">
              Links
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
              <li>
                <Link href="/solutions/ev-charging" className="hover:text-blue-600 transition-colors">
                  EV Fast Chargers
                </Link>
              </li>
              <li>
                <Link href="/solutions/energy-storage" className="hover:text-blue-600 transition-colors">
                  Lithium Battery Storage
                </Link>
              </li>
              <li>
                <Link href="/solutions/solar-energy" className="hover:text-blue-600 transition-colors">
                  Solar Rooftops
                </Link>
              </li>
              <li>
                <Link href="/solutions/power-solutions" className="hover:text-blue-600 transition-colors">
                  Hybrid Inverters
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-blue-600 transition-colors">
                  Hardware Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Us */}
          <div>
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-xs text-gray-600">
              <li className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <a href="tel:+918178810456" className="font-bold hover:text-blue-600 transition-colors">
                  (91) 81788 104 56
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <a href="mailto:vloxiasystems@gmail.com" className="font-medium hover:text-blue-600 transition-colors truncate">
                  vloxiasystems@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="text-gray-500 leading-relaxed">
                  A3/55, Sector 15, Rohini, Delhi – 110089, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── [3] SUB-FOOTER LEGAL BAR (MATCHES USER REFERENCE) ── */}
        <div className="border-t border-gray-100 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© Copyright by VLOXIA Systems LLP. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-gray-500 font-medium">
            <Link href="/about" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">
              Terms of Use
            </Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">
              Legal
            </Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">
              Site Map
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
