import React from "react";
import Link from "next/link";
import { Copyright, ShieldAlert, CheckCircle2, ArrowLeft, FileCode2 } from "lucide-react";

export const metadata = {
  title: "Copyright Policy | VLOXIA Systems LLP",
  description:
    "Copyright notice, intellectual property protection, and authorized usage guidelines for VLOXIA Systems LLP.",
};

export default function CopyrightPolicyPage() {
  return (
    <div className="bg-white text-slate-900 font-sans antialiased selection:bg-[#0066FF] selection:text-white">
      {/* Hero Header */}
      <section className="bg-slate-50 border-b border-gray-100 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 mb-4">
            Copyright Policy
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Effective Date: January 1, 2026 • Last Updated: November 2026.
            <br />
            © 2026 VLOXIA Systems LLP. All rights reserved across all media and engineering documentation.
          </p>
        </div>
      </section>

      {/* Main Body */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8 py-12 sm:py-16">
        <div className="prose prose-slate max-w-none space-y-10 text-sm sm:text-base leading-relaxed text-slate-700">
          
          {/* Section 1 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">1</span>
              <span>Ownership of Intellectual Property</span>
            </h2>
            <p>
              All materials, design layouts, graphical interfaces, single-line engineering schematics, technical data sheets, firmware algorithms, software source code, brand logos, photographic assets, and copy published on this website (<a href="https://vloxia.com" className="text-blue-600 underline">vloxia.com</a>) are the exclusive intellectual property of <strong>VLOXIA Systems LLP</strong> or its authorized Tier-1 hardware licensors.
            </p>
            <p>
              These works are protected under the <strong>Indian Copyright Act, 1957</strong>, the <strong>Trade Marks Act, 1999</strong>, and international copyright treaties.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">2</span>
              <span>Permitted Use vs. Prohibited Actions</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                <div className="font-bold text-emerald-950 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Permitted Uses</span>
                </div>
                <ul className="text-xs sm:text-sm text-emerald-900 list-disc pl-5 space-y-1.5">
                  <li>Downloading official product specification sheets for commercial evaluation.</li>
                  <li>Referencing VLOXIA case studies or technical parameters with proper attribution in academic research.</li>
                  <li>Authorized channel partners distributing official VLOXIA co-branded marketing brochures under valid partner agreements.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200">
                <div className="font-bold text-rose-950 mb-2 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Strictly Prohibited Actions</span>
                </div>
                <ul className="text-xs sm:text-sm text-rose-900 list-disc pl-5 space-y-1.5">
                  <li>Systematic scraping, harvesting, or automated data extraction of catalog pricing and schematics.</li>
                  <li>Reproducing or republishing VLOXIA brand marks, logos, or UI designs without prior written consent.</li>
                  <li>Reverse-engineering VLOXIA firmware, OCPP load-balancing algorithms, or proprietary telemetry endpoints.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">3</span>
              <span>Trademarks &amp; Brand Marks</span>
            </h2>
            <p>
              &quot;VLOXIA&quot;, &quot;VLOXIA Systems&quot;, the stylized geometric &quot;V&quot; emblem, and associated product line names are proprietary trademarks and service marks of VLOXIA Systems LLP. Third-party brand names (such as Tata Power, Waaree, Emmvee, Delta, Havells) appearing in partner marquees are the registered trademarks of their respective owners and used strictly for factual compatibility references.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">4</span>
              <span>Notice of Infringement &amp; Takedown Procedure</span>
            </h2>
            <p>
              If you believe in good faith that any content hosted on this website infringes your copyright or trademark under the Indian Copyright Act or DMCA provisions, please forward a formal written notice to our designated Legal Counsel:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
              <li>Identification of the copyrighted work claimed to have been infringed.</li>
              <li>Exact URL or screenshot locating the allegedly infringing material on our site.</li>
              <li>Your contact information (name, postal address, telephone number, and corporate email).</li>
              <li>A statement of good faith belief that the disputed use is unauthorized by the copyright owner.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="space-y-3 p-6 rounded-2xl bg-blue-50/70 border border-blue-200/80">
            <h3 className="text-lg font-bold text-blue-950 mb-1">
              Legal &amp; Copyright Compliance Officer
            </h3>
            <p className="text-xs sm:text-sm text-blue-900 leading-relaxed">
              <strong>VLOXIA Systems LLP</strong><br />
              Legal &amp; IP Protection Desk<br />
              A3/55, Sector 15, Rohini, Delhi 110089, India<br />
              Email: <a href="mailto:vloxiasystems@gmail.com" className="underline font-semibold">vloxiasystems@gmail.com</a><br />
              Phone: +91 81788 104 56
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
