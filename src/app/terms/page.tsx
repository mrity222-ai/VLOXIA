import React from "react";
import Link from "next/link";
import { Scale, FileText, CheckCircle2, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | VLOXIA Systems LLP",
  description:
    "Standard terms of service, engineering contracts, and commercial hardware purchase terms for VLOXIA Systems LLP.",
};

export default function TermsAndConditionsPage() {
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
            Terms &amp; Conditions
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Effective Date: January 1, 2026 • Last Updated: November 2026.
            <br />
            These Terms govern your use of the VLOXIA platform, hardware marketplace purchases, and engineering turnkey turnkey contracts.
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
              <span>Acceptance of Terms</span>
            </h2>
            <p>
              By accessing this website (<a href="https://vloxia.com" className="text-blue-600 underline">vloxia.com</a>), engaging VLOXIA for engineering site audits, or purchasing clean energy hardware, you agree to be bound by these Terms and Conditions and all applicable laws and regulations of the Republic of India. If you do not agree with any of these terms, you are prohibited from using this site.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">2</span>
              <span>Turnkey EPC &amp; Engineering Scope</span>
            </h2>
            <p>For all Solar EPC, Battery Storage (BESS), and Commercial EV Fast Charging contracts:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Site Feasibility &amp; Approvals:</strong> Turnkey execution timelines are subject to site handover readiness, civil structure load-bearing integrity, and regional DISCOM net-metering approvals. VLOXIA assists with all regulatory statutory documentation (CEIG, State Electricity Boards).</li>
              <li><strong>Client Obligations:</strong> The client is responsible for granting safe, unobstructed physical access to rooftops, transformer yards, and electrical panels during audit, construction, and commissioning phases.</li>
              <li><strong>Force Majeure:</strong> VLOXIA is not liable for installation delays caused by extreme natural events, grid curtailment, or statutory governmental delays beyond reasonable commercial control.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">3</span>
              <span>Hardware Orders, Invoicing &amp; Pricing</span>
            </h2>
            <p>All hardware listed in our catalog or quoted via customized bill of materials (BOM):</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Prices &amp; Taxes:</strong> Listed prices are denominated in Indian Rupees (INR) and are subject to statutory Goods and Services Tax (GST at standard 18% or applicable rates). Commercial tax invoices with valid GSTIN are issued upon dispatch.</li>
              <li><strong>Payment Processing:</strong> Online transactions are handled through authorized payment aggregators (e.g., Razorpay). Orders are processed upon confirmed payment clearance.</li>
              <li><strong>Delivery &amp; Physical Inspection:</strong> Hardware shipments must be inspected upon physical arrival. Any transit damage must be documented on the consignment note (LR) and reported to VLOXIA within 48 hours.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">4</span>
              <span>Tier-1 OEM Warranties &amp; Performance Guarantees</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-950 mb-1">Solar PV Modules</div>
                <div className="text-xs text-blue-600 font-semibold mb-2">25–30 Years Linear Output</div>
                <p className="text-xs text-slate-600">Tier-1 bifacial mono-PERC panels guaranteeing ≥80% generation output at year 25.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-950 mb-1">LiFePO4 Batteries</div>
                <div className="text-xs text-blue-600 font-semibold mb-2">10 Years / 6,000 Cycles</div>
                <p className="text-xs text-slate-600">Comprehensive cycle life warranty with smart BMS thermal safety shutdown.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-950 mb-1">EV Fast Chargers</div>
                <div className="text-xs text-blue-600 font-semibold mb-2">3–5 Years Commercial Warranty</div>
                <p className="text-xs text-slate-600">OCPP 2.0.1 compliant AC/DC chargers with rapid spare module replacement.</p>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">5</span>
              <span>Limitation of Liability</span>
            </h2>
            <p>
              To the maximum extent permitted by applicable Indian law, VLOXIA Systems LLP shall not be liable for any indirect, incidental, punitive, or consequential damages resulting from unauthorized electrical modifications by third-party technicians, improper utility grid voltage fluctuations exceeding CEIG tolerances, or failure of local internet telemetry on customer sites.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">6</span>
              <span>Governing Law &amp; Dispute Resolution</span>
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Republic of India. Any legal dispute, controversy, or claim arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the competent courts in <strong>New Delhi, India</strong>.
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-3 p-6 rounded-2xl bg-blue-50/70 border border-blue-200/80">
            <h3 className="text-lg font-bold text-blue-950 mb-1">
              Contact for Legal &amp; Commercial Enquiries
            </h3>
            <p className="text-xs sm:text-sm text-blue-900 leading-relaxed">
              <strong>VLOXIA Systems LLP</strong><br />
              Commercial Contracts Desk<br />
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
