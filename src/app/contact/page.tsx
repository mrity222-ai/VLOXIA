import { Phone, Mail, MapPin, Clock, ArrowRight, Send, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Contact Us | VLOXIA Systems LLP",
  description:
    "Contact VLOXIA Systems LLP for EV Charging, Solar Energy, Energy Storage and Power Solution enquiries. Delhi-based, serving pan-India.",
};

const CONTACT_DETAILS = [
  {
    Icon: MapPin,
    label: "Registered Office",
    value: "A3/55, Sector 15, Rohini, Delhi – 110089",
    href: "https://maps.google.com/?q=Sector+15+Rohini+Delhi",
    isExternal: true,
  },
  {
    Icon: Phone,
    label: "Phone / WhatsApp",
    value: "+91 8178810456",
    href: "tel:+918178810456",
  },
  {
    Icon: Mail,
    label: "Email",
    value: "vloxiasystems@gmail.com",
    href: "mailto:vloxiasystems@gmail.com",
  },
  {
    Icon: Clock,
    label: "Business Hours",
    value: "Mon – Sat: 9:00 AM – 7:00 PM IST",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-white text-slate-900 min-h-screen pt-28 pb-20 selection:bg-[#d9f99d] selection:text-black">
      {/* ─── HERO SECTION ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 border-b border-slate-100">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
            Get In Touch
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12]">
            Contact VLOXIA Systems
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Ready to start your clean energy journey? Our senior engineers and consultants are here to help — reach out for site audits, commercial quotations, or partnership enquiries.
          </p>
        </div>
      </section>

      {/* ─── CONTACT INFO & ENQUIRY FORM GRID ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Details & Map Card */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 mb-2">
                Corporate Headquarters
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Connect with our team directly via phone, email or visit our registered Delhi headquarters.
              </p>
            </div>

            {/* Contact Detail Cards */}
            <div className="space-y-4">
              {CONTACT_DETAILS.map(({ Icon, label, value, href, isExternal }) => (
                <div
                  key={label}
                  className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/60 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all duration-200 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="text-sm sm:text-base font-semibold text-slate-900 hover:text-blue-600 transition-colors mt-0.5 block"
                      >
                        {value}
                      </a>
                    ) : (
                      <div className="text-sm sm:text-base font-semibold text-slate-900 mt-0.5">
                        {value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map & Direction Card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-950 text-white p-6 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#dcf836]" />
                <span className="text-sm font-bold tracking-wide">
                  Location on Map
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                A3/55, Sector 15, Rohini, New Delhi, Delhi 110089. Easily accessible via Delhi Metro (Rohini West / Sector 18).
              </p>
              <div>
                <a
                  href="https://maps.google.com/?q=Sector+15+Rohini+Delhi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#dcf836] hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 shadow-xl space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                  Send an Enquiry
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Fill in your project requirements below. Our technical engineering desk typically responds within 24 business hours.
                </p>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Business Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Interested Solution *
                    </label>
                    <select
                      required
                      defaultValue=""
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white"
                    >
                      <option value="" disabled>Select a solution</option>
                      <option value="ev-charging">EV Charging Infrastructure</option>
                      <option value="solar-energy">Solar Energy EPC</option>
                      <option value="energy-storage">Energy Storage &amp; Lithium BESS</option>
                      <option value="power-solutions">Power Solutions &amp; Backup</option>
                      <option value="multiple">Integrated Multi-Technology Solution</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Customer / Sector Type *
                    </label>
                    <select
                      required
                      defaultValue=""
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white"
                    >
                      <option value="" disabled>Select sector</option>
                      <option value="residential">Residential &amp; Housing Society</option>
                      <option value="commercial">Commercial Real Estate &amp; Retail</option>
                      <option value="industrial">Industrial &amp; Manufacturing</option>
                      <option value="mobility">Fleet &amp; Logistics Operator</option>
                      <option value="institutional">Institutional &amp; Healthcare</option>
                      <option value="channel-partner">Dealer / Channel Partner</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    City / Operating Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. New Delhi, Gurugram, Noida, Mumbai..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Project Requirement &amp; Scope
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your site details, required power capacity, timeline, or any specific engineering requirements..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-y"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Submit Enquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 pt-2 text-xs text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Your information is protected under standard non-disclosure policy.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
