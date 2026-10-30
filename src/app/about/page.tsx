import { ArrowRight, Eye, Target, Heart, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "About Us | VLOXIA Systems LLP",
  description:
    "Learn about VLOXIA Systems LLP, its EV charging infrastructure, solar, lithium storage and power solutions for homes, businesses and fleets across India.",
};

export default function AboutPage() {
  return (
    <main className="content-page about-page">
      {/* ── FUTURE CHARGED HERO SECTION (MATCHING REFERENCE) ── */}
      <section className="about-ev-hero">
        <Image
          src="/Modern EV Charging.png"
          alt="Electric vehicle connected to a modern charging station"
          fill
          priority
          sizes="100vw"
          className="about-ev-background"
        />
        <div className="about-ev-overlay" aria-hidden="true" />

        <div className="about-ev-content">
            <div className="about-ev-copy">
              {/* Dynamic Title with Speed-Charge Graphic */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase drop-shadow-sm font-sans">
                  Future
                </span>
                {/* Speed Charge Icon */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#2563eb] text-[#ffffff] shadow-lg shadow-[#2563eb]/30 animate-pulse">
                  <span className="w-2.5 h-0.5 bg-[#ffffff] rounded-full" />
                  <span className="w-3.5 h-0.5 bg-[#ffffff] rounded-full" />
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
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-[#2563eb] hover:bg-[#2563eb] text-[#ffffff] font-black text-sm rounded-md shadow-lg shadow-[#2563eb]/25 hover:shadow-xl transition-all duration-200"
                >
                  Start Charging
                </Link>
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
                VLOXIA Systems LLP is a Delhi-based clean energy company working across EV charging infrastructure, solar energy, lithium storage and power solutions for customers across India.
              </p>
              <p>
                For electric mobility, VLOXIA helps homes, workplaces, commercial sites and fleets plan suitable charging infrastructure—from AC wallboxes to commercial and fast-charging setups. The team considers site needs, charger selection, installation planning and ongoing support.
              </p>
              <p>
                VLOXIA also brings solar, storage and power systems together where they fit the customer&apos;s needs. Its consultative approach and OEM technology partnerships support practical, tailored clean-energy projects.
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

      {/* Technology Partners */}
      <section className="content-section about-partners">
        <div className="content-container">
          <div className="about-partners-heading">
            <p className="content-eyebrow">Technology Partners</p>
            <h2>Our Technology Partners</h2>
            <p>We collaborate with established OEM brands to deliver reliable, certified products.</p>
          </div>
          <div className="about-partner-cards">
            <div>
              <strong>TATA EZ POWER</strong>
              <span>EV Charging Technology</span>
            </div>
            <div>
              <strong>+ More Partners</strong>
              <span>Expanding Portfolio</span>
            </div>
          </div>
          <Link href="/partners" className="about-partners-link">
            View All Partners <ArrowRight aria-hidden="true" />
          </Link>
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
