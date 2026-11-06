"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  ChevronDown,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-slate-800 border-t border-gray-100 font-sans antialiased selection:bg-[#0066FF] selection:text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 sm:py-14">
        
        {/* ── TOP ROW: LOGO & TAGLINE (MATCHES REFERENCE EXACTLY) ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
          <Link href="/" className="inline-block">
            <Image
              src="/vloxia-logo.png"
              alt="VLOXIA Systems LLP"
              width={210}
              height={62}
              className="h-11 sm:h-12 w-auto object-contain transition-all"
              priority
            />
          </Link>

          <p className="text-xs sm:text-sm text-slate-500 font-medium tracking-tight">
            Intelligent clean energy &amp; EV infrastructure that actually works.
          </p>
        </div>

        {/* Thin Divider Line */}
        <div className="border-t border-gray-100 my-6" />

        {/* ── MIDDLE GRID: COMPANY, NAVIGATION, CONTACT, REGION & SOCIALS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 py-4">
          
          {/* Column 1: Empresa / Company (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-sm font-bold text-slate-900 tracking-tight">
              Company
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Approach", href: "/approach" },
                { label: "Why VLOXIA", href: "/about#why-vloxia" },
                { label: "Channel Partners", href: "/partners" },
                { label: "Contact Us", href: "/contact" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-slate-500 hover:text-blue-600 transition-colors inline-block py-0.5 group"
                  >
                    <span className="underline-hover-effect">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Navegação / Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-sm font-bold text-slate-900 tracking-tight">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { label: "EV Fast Chargers", href: "/solutions/ev-charging" },
                { label: "Solar Energy Systems", href: "/solutions/solar-energy" },
                { label: "Lithium Energy Storage", href: "/solutions/energy-storage" },
                { label: "Hybrid Inverters & UPS", href: "/solutions/power-solutions" },
                { label: "Hardware Marketplace", href: "/shop" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-slate-500 hover:text-blue-600 transition-colors inline-block py-0.5 group"
                  >
                    <span className="underline-hover-effect">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contacto / Contact Details with Blue Outline Badges (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-sm font-bold text-slate-900 tracking-tight">
              Contact
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-500 border border-sky-100 flex items-center justify-center shrink-0 hover:scale-110 hover:bg-blue-600 hover:text-white transition-all cursor-pointer shadow-xs">
                  <Mail className="w-4 h-4" />
                </div>
                <a
                  href="mailto:vloxiasystems@gmail.com"
                  className="text-slate-600 hover:text-blue-600 transition-colors truncate font-medium underline-hover-effect"
                >
                  vloxiasystems@gmail.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-500 border border-sky-100 flex items-center justify-center shrink-0 hover:scale-110 hover:bg-blue-600 hover:text-white transition-all cursor-pointer shadow-xs">
                  <Phone className="w-4 h-4" />
                </div>
                <a
                  href="tel:+918178810456"
                  className="text-slate-600 hover:text-blue-600 transition-colors font-medium underline-hover-effect"
                >
                  +91 81788 104 56
                </a>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-500 border border-sky-100 flex items-center justify-center shrink-0 hover:scale-110 hover:bg-blue-600 hover:text-white transition-all cursor-pointer shadow-xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-slate-600 font-medium">
                  Rohini, Delhi, India
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Region Dropdown Pill & Social Icons (3 cols, Right-Aligned) */}
          <div className="lg:col-span-3 flex flex-col sm:items-start lg:items-end justify-between space-y-4">
            {/* Region / Language Dropdown Pill Matching Reference */}
            <div className="btn-hover-effect inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-slate-700 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer">
              <Globe className="w-4 h-4 text-slate-600" />
              <span>India (EN)</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Social Icons in Clean Rounded Boxes Matching Reference */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
                className="lift-effect w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-blue-50 flex items-center justify-center text-slate-700 hover:text-blue-600 hover:border-blue-400 hover:shadow-md transition-all shadow-xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                title="Instagram"
                className="lift-effect w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-pink-50 flex items-center justify-center text-slate-700 hover:text-pink-600 hover:border-pink-400 hover:shadow-md transition-all shadow-xs"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                title="Facebook"
                className="lift-effect w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-blue-50 flex items-center justify-center text-slate-700 hover:text-blue-600 hover:border-blue-400 hover:shadow-md transition-all shadow-xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                title="YouTube"
                className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 hover:text-red-600 hover:border-red-200 transition-all shadow-xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* ── BOTTOM SUB-FOOTER LEGAL BAR (MATCHES REFERENCE EXACTLY) ── */}
        <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 VLOXIA Systems LLP. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-slate-500 font-medium">
            <Link href="/about" className="hover:text-blue-600 transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">
              Cookies
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
