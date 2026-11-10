"use client";

import React, { useState, useEffect } from "react";
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
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    twitter: "",
    whatsapp: "+918178810456",
  });

  useEffect(() => {
    fetch("/api/settings/public")
      .then((res) => res.json())
      .then((data) => {
        if (data?.socialLinks) {
          setSocialLinks((prev) => ({
            ...prev,
            ...data.socialLinks,
          }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="font-sans antialiased selection:bg-white selection:text-blue-600">
      
      {/* ── TOP ROW: LOGO & TAGLINE (PRESERVED ON CLEAN WHITE) ── */}
      <div className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
      </div>

      {/* ── LOWER FOOTER: ROYAL BLUE WITH CRISP WHITE TEXT & 3D ICONS ── */}
      <div className="bg-gradient-to-b from-[#0066FF] via-[#0057e7] to-[#0047cc] text-white py-12 sm:py-16 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Middle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Column 1: Company (3 cols) */}
            <div className="lg:col-span-3 space-y-3.5">
              <h4 className="text-sm font-bold text-white tracking-wider uppercase text-white/95">
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
                      className="text-blue-100 hover:text-white transition-colors inline-block py-0.5"
                    >
                      <span className="hover:underline underline-offset-4">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Navigation (3 cols) */}
            <div className="lg:col-span-3 space-y-3.5">
              <h4 className="text-sm font-bold text-white tracking-wider uppercase text-white/95">
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
                      className="text-blue-100 hover:text-white transition-colors inline-block py-0.5"
                    >
                      <span className="hover:underline underline-offset-4">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Details with 3D Frosted Glass Badges (3 cols) */}
            <div className="lg:col-span-3 space-y-3.5">
              <h4 className="text-sm font-bold text-white tracking-wider uppercase text-white/95">
                Contact
              </h4>
              <ul className="space-y-3.5 text-xs sm:text-sm">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/15 border-t border-white/50 border-x border-white/20 border-b border-black/20 shadow-[0_3px_8px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.6)] flex items-center justify-center shrink-0 hover:scale-110 hover:bg-white/25 transition-all cursor-pointer">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <a
                    href="mailto:vloxiasystems@gmail.com"
                    className="text-white hover:text-blue-200 transition-colors truncate font-medium hover:underline underline-offset-4"
                  >
                    vloxiasystems@gmail.com
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/15 border-t border-white/50 border-x border-white/20 border-b border-black/20 shadow-[0_3px_8px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.6)] flex items-center justify-center shrink-0 hover:scale-110 hover:bg-white/25 transition-all cursor-pointer">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <a
                    href={`tel:${(socialLinks.whatsapp || "+918178810456").replace(/\s+/g, "")}`}
                    className="text-white hover:text-blue-200 transition-colors font-medium hover:underline underline-offset-4"
                  >
                    {socialLinks.whatsapp || "+91 8178810456"}
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/15 border-t border-white/50 border-x border-white/20 border-b border-black/20 shadow-[0_3px_8px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.6)] flex items-center justify-center shrink-0 hover:scale-110 hover:bg-white/25 transition-all cursor-pointer">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-medium leading-relaxed">
                    A3/55, Sector 15, Rohini, Delhi 110089
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 4: Region Dropdown Pill & 3D Social Icons (3 cols, Right-Aligned) */}
            <div className="lg:col-span-3 flex flex-col sm:items-start lg:items-end justify-between space-y-5">
              
              {/* Region / Language Dropdown Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/15 backdrop-blur-md border-t border-white/40 border-x border-white/20 border-b border-black/20 text-xs font-semibold text-white shadow-[0_3px_8px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.5)] hover:bg-white/25 transition-all cursor-pointer">
                <Globe className="w-4 h-4 text-white" />
                <span>India (EN)</span>
                <ChevronDown className="w-3.5 h-3.5 text-white/70" />
              </div>

              {/* 3D Highlighted Social Icons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                
                {/* LinkedIn */}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    className="w-9 h-9 rounded-xl bg-gradient-to-b from-[#0a7ee3] via-[#0A66C2] to-[#004182] border-t border-white/60 border-x border-sky-400/30 border-b border-[#002244] shadow-[0_4px_10px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.7)] text-white hover:scale-110 hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 fill-current drop-shadow" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}

                {/* Instagram */}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] border-t border-white/60 border-x border-pink-400/30 border-b border-[#3b0f7a] shadow-[0_4px_10px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.7)] text-white hover:scale-110 hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 fill-none stroke-current stroke-2 drop-shadow" viewBox="0 0 24 24">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                )}

                {/* Facebook */}
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                    className="w-9 h-9 rounded-xl bg-gradient-to-b from-[#2b7cf6] via-[#1877F2] to-[#1053b3] border-t border-white/60 border-x border-blue-400/30 border-b border-[#08306e] shadow-[0_4px_10px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.7)] text-white hover:scale-110 hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 fill-current drop-shadow" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}

                {/* YouTube */}
                {socialLinks.youtube && (
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="YouTube"
                    className="w-9 h-9 rounded-xl bg-gradient-to-b from-[#ff3838] via-[#FF0000] to-[#b30000] border-t border-white/60 border-x border-red-400/30 border-b border-[#6e0000] shadow-[0_4px_10px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.7)] text-white hover:scale-110 hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 fill-current drop-shadow" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                )}

                {/* Twitter / X */}
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitter / X"
                    className="w-9 h-9 rounded-xl bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 border-t border-white/40 border-x border-slate-600/30 border-b border-black shadow-[0_4px_10px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.5)] text-white hover:scale-110 hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 fill-current drop-shadow" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}

                {/* WhatsApp */}
                {socialLinks.whatsapp && (
                  <a
                    href={`https://wa.me/${socialLinks.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp Chat Support"
                    className="w-9 h-9 rounded-xl bg-gradient-to-b from-[#2be673] via-[#25D366] to-[#128c46] border-t border-white/60 border-x border-emerald-400/30 border-b border-[#0b5c2d] shadow-[0_4px_10px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.7)] text-white hover:scale-110 hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 fill-current drop-shadow" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.053-.949.006-.499-.074-1.221-.365-2.051-1.077-.991-.851-1.637-2.008-1.745-2.155-.108-.147-.569-.757-.569-1.442 0-.686.357-1.025.484-1.165.127-.14.278-.175.371-.175.093 0 .185.001.266.005.085.004.198-.032.309.234.115.275.394.96.429 1.03.035.07.058.152.012.245-.046.094-.069.153-.139.234-.07.082-.147.182-.21.245-.07.07-.143.147-.061.288.081.14.36 1.027 1.353 1.905.772.684 1.423.896 1.624.996.202.1.32.083.438-.052.119-.136.509-.592.645-.795.136-.203.272-.169.458-.101.186.068 1.18.557 1.383.659.203.101.339.152.389.237.051.085.051.492-.093.897z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* ── BOTTOM LEGAL BAR (WITH 4 POLICY LINKS) ── */}
          <div className="border-t border-white/20 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-100">
            <p className="font-normal tracking-tight">
              © 2026 VLOXIA Systems LLP. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-xs text-white font-medium">
              <Link href="/terms" className="hover:text-blue-200 transition-colors hover:underline underline-offset-4">
                Terms &amp; Conditions
              </Link>
              <Link href="/privacy" className="hover:text-blue-200 transition-colors hover:underline underline-offset-4">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="hover:text-blue-200 transition-colors hover:underline underline-offset-4">
                Cookie Policy
              </Link>
              <Link href="/copyright" className="hover:text-blue-200 transition-colors hover:underline underline-offset-4">
                Copyright Policy
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
