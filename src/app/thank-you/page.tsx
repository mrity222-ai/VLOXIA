import Link from "next/link";
import { CheckCircle, ArrowRight, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Thank You | VLOXIA Systems LLP",
  description: "Your enquiry has been received. VLOXIA Systems LLP will be in touch within 24 hours.",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#FBFBFE] flex items-center justify-center p-6 text-slate-900 font-sans antialiased">
      <section className="max-w-lg w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
          <CheckCircle className="w-8 h-8" aria-hidden="true" />
        </div>
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wider mb-2">
            Inquiry Dispatched
          </span>
          <h1 className="text-2xl sm:text-3xl font-normal tracking-tight text-slate-950">
            Thank You for Your Enquiry!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            We have received your message and our energy experts will get back to you within{" "}
            <strong className="text-slate-900">24 business hours</strong>.
          </p>
        </div>

        <div className="bg-[#F2F4FA] rounded-2xl p-4 text-xs text-slate-600 space-y-2">
          <p className="font-semibold text-slate-900">For urgent queries, call or write to us directly:</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <a
              href="tel:+918178810456"
              className="text-blue-600 font-bold hover:underline flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" /> +91 8178810456
            </a>
            <span className="hidden sm:inline text-slate-300">•</span>
            <a
              href="mailto:vloxiasystems@gmail.com"
              className="text-blue-600 font-bold hover:underline flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" aria-hidden="true" /> vloxiasystems@gmail.com
            </a>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm tracking-tight transition-all shadow-sm"
          >
            <span>Back to Home</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
