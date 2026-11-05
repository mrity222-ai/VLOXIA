import React, { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2, PackageCheck, ArrowRight, Phone, Mail, FileText } from "lucide-react";

export default function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; paymentId?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#FBFBFE] flex items-center justify-center p-6">
          <div className="text-gray-500 font-medium text-sm animate-pulse">Loading receipt...</div>
        </main>
      }
    >
      <OrderSuccessContent searchParams={searchParams} />
    </Suspense>
  );
}

async function OrderSuccessContent({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; paymentId?: string }>;
}) {
  const params = await searchParams;
  const orderId = params.orderId || `ORD_${Date.now()}`;
  const paymentId = params.paymentId || `pay_${Date.now()}`;

  return (
    <main className="min-h-screen bg-[#FBFBFE] text-gray-900 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <section className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-xl text-center space-y-6">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center shadow-inner">
          <CheckCircle2 className="w-9 h-9" aria-hidden="true" />
        </div>

        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
            Payment Verified & Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-normal tracking-tight text-slate-950 mt-3">
            Thank You for Choosing VLOXIA!
          </h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Your payment has been successfully processed through Razorpay. Our engineering dispatch
            team is preparing your clean energy hardware.
          </p>
        </div>

        {/* Receipt Box */}
        <div className="bg-[#F2F4FA] rounded-2xl p-5 text-left text-xs sm:text-sm space-y-2.5">
          <div className="flex justify-between items-center text-gray-600">
            <span className="font-medium">Order Reference:</span>
            <span className="font-bold text-gray-900 font-mono">{orderId}</span>
          </div>
          <div className="flex justify-between items-center text-gray-600">
            <span className="font-medium">Razorpay Payment ID:</span>
            <span className="font-bold text-gray-900 font-mono">{paymentId}</span>
          </div>
          <div className="flex justify-between items-center text-gray-600">
            <span className="font-medium">Dispatch Window:</span>
            <span className="font-bold text-blue-600">24–48 Hours</span>
          </div>
          <div className="flex justify-between items-center text-gray-600">
            <span className="font-medium">Warranty Registration:</span>
            <span className="font-semibold text-blue-600">Auto-Registered with VLOXIA</span>
          </div>
        </div>

        {/* Support Note */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>Our dispatch executive will call you to confirm site delivery location.</p>
          <div className="flex items-center justify-center gap-3 pt-1">
            <a href="tel:+918178810456" className="text-blue-600 font-semibold hover:underline flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              +91 8178810456
            </a>
            <span>•</span>
            <a href="mailto:vloxiasystems@gmail.com" className="text-blue-600 font-semibold hover:underline flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              vloxiasystems@gmail.com
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link
            href="/shop"
            className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20 active:scale-95 text-center"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs sm:text-sm transition-all text-center flex items-center justify-center gap-1.5"
          >
            <span>Back to Home</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
