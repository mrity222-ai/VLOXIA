import { ArrowRight, Eye, Target, Heart, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "About Us | VLOXIA Systems LLP",
  description:
    "Learn about VLOXIA Systems LLP — our vision, mission, values and approach to delivering integrated clean energy solutions across India.",
};

export default function AboutPage() {
  return (
    <main className="content-page about-page">
      {/* ── FUTURE CHARGED HERO SECTION (MATCHING REFERENCE) ── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#179c96] via-[#2dc4a5] to-[#c7f4ea] min-h-[500px] lg:min-h-[560px] flex items-center pt-10 pb-12">
        {/* Ambient subtle glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.25),transparent_60%)] pointer-events-none" />

        <div className="container-xl relative z-10 w-full mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Headline, Speed Badge, Subtitle & Button */}
            <div className="lg:col-span-6 text-white space-y-6">
              {/* Dynamic Title with Speed-Charge Graphic */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase drop-shadow-sm font-sans">
                  Future
                </span>
                {/* Speed Charge Icon */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00e676] text-[#032421] shadow-lg shadow-[#00e676]/30 animate-pulse">
                  <span className="w-2.5 h-0.5 bg-[#032421] rounded-full" />
                  <span className="w-3.5 h-0.5 bg-[#032421] rounded-full" />
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <span className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase drop-shadow-sm block w-full font-sans">
                  Charged
                </span>
              </div>

              {/* Subtitle */}
              <p className="text-white/95 text-base sm:text-lg max-w-md font-medium leading-relaxed drop-shadow-xs">
                Seamless charging for the electric era.
                <br />
                Built for speed, reliability, and ease.
              </p>

              {/* Action Button */}
              <div>
                <Link
                  href="/solutions/ev-charging"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-[#00e676] hover:bg-[#00c853] text-[#032421] font-black text-sm rounded-md shadow-lg shadow-[#00e676]/25 hover:shadow-xl transition-all duration-200"
                >
                  Start Charging
                </Link>
              </div>
            </div>

            {/* Right Column / Visual: EV Charger Pedestal + White Electric Vehicle */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full aspect-[16/9] lg:aspect-[16/10] max-w-[620px] rounded-2xl overflow-hidden shadow-2xl border border-white/40">
                <Image
                  src="/about-hero-ev.png"
                  alt="Future Charged EV Infrastructure"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="content-section about-overview">
        <div className="content-container">
          <div className="about-overview-grid">
            <div>
              <p className="content-eyebrow">Company Overview</p>
              <h2>VLOXIA Systems LLP</h2>
              <p>
                VLOXIA Systems LLP is a Delhi-based clean energy solutions company operating across four verticals: EV Charging Infrastructure, Solar Energy Systems, Lithium Battery Storage and Power Solutions.
              </p>
              <p>
                Founded with a mission to accelerate India&apos;s transition to clean, reliable and affordable energy, VLOXIA combines OEM-grade technology with a deeply consultative approach to deliver end-to-end energy systems tailored to each client&apos;s unique requirements.
              </p>
              <p>
                From individual residences seeking energy independence to large industrial campuses optimising energy costs, VLOXIA serves the full spectrum of India&apos;s energy transition.
              </p>
            </div>
            <div className="about-facts">
              {[
                { label: "Registered Office", value: "A3/55, Sector 15, Rohini, Delhi – 110089" },
                { label: "Business Verticals", value: "EV Charging · Solar Energy · Energy Storage · Power Solutions" },
                { label: "Service Area", value: "Pan-India with growing channel network" },
                { label: "Contact", value: "+91 8178810456 | vloxiasystems@gmail.com" },
              ].map((item) => (
                <div key={item.label}>
                  <div>{item.label}</div>
                  <div>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Commitment */}
      <section className="content-section content-soft">
        <div className="content-container">
          <div className="content-section-heading">
            <p className="content-eyebrow">What Guides Us</p><h2>Our Purpose</h2>
          </div>
          <div className="purpose-grid">
            {[
              {
                Icon: Eye,
                label: "Our Vision",
                text: "To be India&apos;s most trusted integrated clean energy partner — enabling every home, business and institution to generate, store and use energy efficiently and sustainably.",
              },
              {
                Icon: Target,
                label: "Our Mission",
                text: "To deliver technology-led, customised energy solutions across EV Charging, Solar, Storage and Power — making clean energy accessible, reliable and economically compelling for every customer segment.",
              },
              {
                Icon: Heart,
                label: "Our Commitment",
                text: "Honest recommendations, quality products, professional installation and dependable after-sales support — because your energy system should work as hard as you do.",
              },
            ].map(({ Icon, label, text }) => (
              <div key={label}>
                <div className="purpose-icon">
                  <Icon aria-hidden="true" />
                </div>
                <h3>{label}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Promise */}
      <section className="content-cta-section">
        <div className="content-cta">
          <div>
            <p className="content-eyebrow">Brand Promise</p>
            <h2>
              &ldquo;We don&apos;t just sell energy products — we build energy solutions.&rdquo;
            </h2>
            <p >
              Every engagement begins with understanding your unique energy context. We analyse your requirements, recommend the right combination of technologies, implement with precision and support you long after installation.
            </p>
            <Link href="/approach" className="content-button">
              Our Solution Approach <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="content-cta-section">
        <div className="content-cta">
          <div>
            <h2>Ready to Start Your Energy Journey?</h2>
            <p>Talk to our experts and get a customised energy solution designed for your needs.</p>
            <Link href="/contact" className="content-button">
              Contact Us <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
