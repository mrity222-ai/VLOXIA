import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | VLOXIA Systems LLP",
  description:
    "Learn how VLOXIA Systems LLP collects, encrypts, and protects your corporate data, site audits, and clean energy telemetry.",
};

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Effective Date: January 1, 2026 • Last Updated: November 2026.
            <br />
            VLOXIA Systems LLP is committed to safeguarding your privacy in compliance with the Digital Personal Data Protection (DPDP) Act, 2023 and the Information Technology Act, 2000.
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
              <span>Introduction &amp; Scope</span>
            </h2>
            <p>
              This Privacy Policy describes the policies and procedures of <strong>VLOXIA Systems LLP</strong> (&quot;VLOXIA&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), having its corporate office at <strong>A3/55, Sector 15, Rohini, Delhi 110089, India</strong>, regarding the collection, storage, usage, and disclosure of personal, engineering, and commercial data collected through our website (<a href="https://vloxia.com" className="text-blue-600 underline">vloxia.com</a>), web applications, IoT telemetry platforms, and offline client engagements.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">2</span>
              <span>Information We Collect</span>
            </h2>
            <p>We collect only the minimum necessary information required to engineer, quote, and deliver clean energy solutions:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Contact &amp; Identification Data:</strong> Full name, corporate email address, contact phone number, company name, billing and physical delivery addresses.</li>
              <li><strong>Site &amp; Technical Energy Data:</strong> Rooftop area, sanctioned electrical load, DISCOM consumer account numbers, electricity bill consumption history, and single-line architectural blueprints shared for feasibility studies.</li>
              <li><strong>IoT &amp; Hardware Telemetry Data:</strong> Operational performance data transmitted by energized VLOXIA EV chargers (OCPP 1.6J/2.0.1 logs, kWh delivered, charging duration, fault codes) and solar PV inverter telemetry (daily solar yield, grid voltage, battery state-of-charge).</li>
              <li><strong>Financial &amp; Transactional Data:</strong> Payment order references and transaction IDs processed securely through PCI-DSS Level-1 certified payment gateways (e.g., Razorpay). <em>Note: VLOXIA never stores credit/debit card numbers or CVV codes on our servers.</em></li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">3</span>
              <span>How We Use Your Data</span>
            </h2>
            <p>VLOXIA utilizes collected data strictly for lawful, performance-critical purposes:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Engineering &amp; EPC Execution
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Conducting solar irradiation simulations, calculating battery storage capacity, designing civil foundations, and synchronizing with regional DISCOMs for net-metering CEIG approvals.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Customer Support &amp; SLAs
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Fulfilling 25-year solar linear warranties, 10-year LiFePO4 battery warranties, proactive firmware updates, and sub-second fault detection for mission-critical infrastructure.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">4</span>
              <span>Database Field-Level Encryption &amp; Security</span>
            </h2>
            <p>
              Security is foundational to VLOXIA&apos;s infrastructure. All client databases employ <strong>AES-256-GCM authenticated encryption at rest</strong> for sensitive credentials, API keys, and configuration tokens.
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
              <li>All web traffic is strictly served over <strong>TLS 1.3 / HTTPS</strong> with modern SHA-256 cipher suites.</li>
              <li>Administrative access requires multi-factor authentication and tokenized session expiration.</li>
              <li>Zero-Sale Guarantee: We <strong>never sell, trade, or monetize</strong> your personal or commercial contact information to third-party data brokers.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">5</span>
              <span>Third-Party Sharing &amp; Disclosures</span>
            </h2>
            <p>We disclose information only to:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
              <li><strong>Governmental &amp; Regulatory Authorities:</strong> CEIG, state electrical inspectorates, and DISCOM engineers exclusively for statutory solar net-metering permits.</li>
              <li><strong>Certified Logistics &amp; Installation Partners:</strong> Authorized freight carriers and certified electrical contractors who must access installation sites to deliver hardware.</li>
              <li><strong>Payment Processors:</strong> Razorpay Software Private Limited for processing checkout invoices under strict PCI-DSS compliance.</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">6</span>
              <span>Your Statutory Rights under DPDP Act 2023</span>
            </h2>
            <p>
              As a data principal, you have the right to request access to your stored data, seek correction of outdated information, withdraw marketing consent, or request complete account erasure.
            </p>
            <p>
              To exercise any of these rights, please contact our designated Grievance Desk at <a href="mailto:vloxiasystems@gmail.com" className="text-blue-600 font-semibold underline">vloxiasystems@gmail.com</a>. Requests are verified and processed within 7 business days.
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-3 p-6 rounded-2xl bg-blue-50/70 border border-blue-200/80">
            <h3 className="text-lg font-bold text-blue-950 mb-1">
              Grievance Officer &amp; Corporate Contact
            </h3>
            <p className="text-xs sm:text-sm text-blue-900 leading-relaxed">
              <strong>VLOXIA Systems LLP</strong><br />
              Attention: Compliance &amp; Grievance Officer<br />
              A3/55, Sector 15, Rohini, Delhi 110089, India<br />
              Email: <a href="mailto:vloxiasystems@gmail.com" className="underline font-semibold">vloxiasystems@gmail.com</a><br />
              Central Helpline: +91 81788 104 56 (Monday – Saturday, 9:00 AM – 7:00 PM IST)
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
