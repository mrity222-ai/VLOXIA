import React from "react";
import Link from "next/link";
import { Cookie, Settings, CheckCircle2, ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Cookie Policy | VLOXIA Systems LLP",
  description:
    "Understand how VLOXIA Systems LLP uses essential, functional, and performance cookies to power our clean energy platform.",
};

export default function CookiePolicyPage() {
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
            Cookie Policy
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Effective Date: January 1, 2026 • Last Updated: November 2026.
            <br />
            This Cookie Policy explains how VLOXIA Systems LLP uses cookies, session tokens, and local web storage to deliver high-performance user experiences.
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
              <span>What Are Cookies &amp; Local Storage?</span>
            </h2>
            <p>
              Cookies are small alphanumeric text files placed on your computer, smartphone, or device when you browse websites. Local storage provides similar functionality, allowing web applications to store small bits of session state locally in your browser.
            </p>
            <p>
              VLOXIA uses cookies and local storage to keep your session secure, remember hardware selected in your shopping cart, and ensure our floating AI energy assistant responds without lag.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">2</span>
              <span>Categories of Cookies We Use</span>
            </h2>
            
            <div className="space-y-4 pt-2">
              {/* Category A */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1.5">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>1. Strictly Necessary / Essential Cookies</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-2">
                  These cookies are vital for the technical operation of our platform. They cannot be switched off in our systems.
                </p>
                <ul className="text-xs text-slate-500 list-disc pl-5 space-y-1">
                  <li><code>admin_token</code>: Authenticated JSON Web Token (JWT) securing admin panel operations with HTTP-only security flags.</li>
                  <li><code>csrf_token</code>: Cross-Site Request Forgery security tokens preventing unauthorized API submissions.</li>
                  <li><code>vloxia_cart</code>: Client-side local storage maintaining selected hardware units and quantities during checkout.</li>
                </ul>
              </div>

              {/* Category B */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1.5">
                  <Settings className="w-4 h-4 text-blue-600" />
                  <span>2. Functional &amp; Preference Cookies</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-2">
                  These allow the website to remember user preferences and interactive UI choices.
                </p>
                <ul className="text-xs text-slate-500 list-disc pl-5 space-y-1">
                  <li>Region &amp; Language selection (defaulting to India - EN).</li>
                  <li>Floating AI Assistant state: Remembering user greeting history and minimizing modal transitions.</li>
                </ul>
              </div>

              {/* Category C */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  <span>3. Performance &amp; Telemetry Cookies</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-2">
                  Collect aggregated, non-personally identifiable metrics on page response times, server latency, and hardware catalog search efficiency.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">3</span>
              <span>Third-Party Cookies &amp; Tracking</span>
            </h2>
            <p>
              VLOXIA does <strong>NOT</strong> host third-party behavioral advertising tracking cookies (such as invasive cross-site ad networks).
            </p>
            <p>
              When completing an online order, our payment gateway partner (Razorpay) may utilize secure fraud-prevention cookies compliant with Reserve Bank of India (RBI) mandates.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">4</span>
              <span>How You Can Control &amp; Clear Cookies</span>
            </h2>
            <p>
              You can control and delete cookies through your web browser settings. Most modern browsers allow you to:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-600">
              <li>View cookies currently stored on your computer and delete them individually.</li>
              <li>Block third-party cookies or block cookies from specific sites.</li>
              <li>Clear all cookies when closing the browser window.</li>
            </ul>
            <p className="text-xs sm:text-sm text-slate-500 italic">
              Note: Blocking essential cookies may prevent shopping cart checkout and secure administrative features from operating correctly.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-3 p-6 rounded-2xl bg-blue-50/70 border border-blue-200/80">
            <h3 className="text-lg font-bold text-blue-950 mb-1">
              Questions Regarding Cookie Management?
            </h3>
            <p className="text-xs sm:text-sm text-blue-900 leading-relaxed">
              If you have any questions regarding our use of cookies or session security, please contact our web engineering desk:<br />
              <strong>VLOXIA Systems LLP</strong><br />
              Email: <a href="mailto:vloxiasystems@gmail.com" className="underline font-semibold">vloxiasystems@gmail.com</a><br />
              Helpline: +91 81788 104 56
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
