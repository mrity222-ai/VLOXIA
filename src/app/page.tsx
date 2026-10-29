"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Sun, Battery, Power, ChevronDown, House, Building2, Factory, CarFront, Landmark, Target, BarChart3, Lightbulb, Settings, ShieldCheck } from "lucide-react";

const solutions = [
  {
    icon: Zap,
    title: "EV Charging",
    desc: "AC & DC fast chargers for home, commercial, fleet and public infrastructure.",
    href: "/solutions/ev-charging",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Sun,
    title: "Solar Energy",
    desc: "Residential, commercial & industrial rooftop solar systems with grid integration.",
    href: "/solutions/solar-energy",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Battery,
    title: "Energy Storage",
    desc: "Lithium battery systems for backup power, load shifting and energy independence.",
    href: "/solutions/energy-storage",
    color: "from-green-400 to-emerald-600",
  },
  {
    icon: Power,
    title: "Power Solutions",
    desc: "Inverters, power backup and integrated energy management for all sectors.",
    href: "/solutions/power-solutions",
    color: "from-purple-500 to-pink-500",
  },
];

export default function HomePage() {
  return (
    <div className="home-page">
      {/* Homepage hero */}
      <section className="home-hero ev-promo-hero">
        <div className="ev-promo-visual" aria-hidden="true">
          <Image
            src="/Industries/Mobility.png"
            alt=""
            fill
            priority
            sizes="(max-width: 680px) 100vw, 62vw"
            className="ev-promo-image"
          />
          <div className="ev-promo-visual-shade" />
          <div className="ev-promo-ring ev-promo-ring-one" />
          <div className="ev-promo-ring ev-promo-ring-two" />
          <div className="ev-promo-image-caption"><Zap aria-hidden="true" /> Built for electric mobility</div>
        </div>

        <div className="ev-promo-content">
          <div className="ev-promo-eyebrow"><span /> VLOXIA EV CHARGING</div>
          <h1>Fueling the <span>Next Electric Era.</span></h1>
          <p className="ev-promo-description">
            Charging that fits seamlessly into your life. We provide intelligent, high-speed power solutions designed for the mobility of tomorrow.
          </p>
          <Link href="/solutions/ev-charging" className="ev-promo-cta">
            Find your charging solution <ArrowRight aria-hidden="true" />
          </Link>

          <div className="ev-promo-features">
            <div><span className="ev-feature-mark"><Zap aria-hidden="true" /></span><span><b>Fast Charging</b><small>Power up at home, work or on the move.</small></span></div>
            <div><span className="ev-feature-mark"><ShieldCheck aria-hidden="true" /></span><span><b>Certified & Reliable</b><small>Trusted technology with dependable support.</small></span></div>
          </div>

          <div className="ev-promo-proof">
            <span className="ev-proof-avatars" aria-hidden="true"><i>V</i><i>EV</i><i>+</i></span>
            <span><b>Powering the transition</b><small>Clean energy solutions across India</small></span>
          </div>
        </div>

        <div className="ev-promo-stat"><span className="ev-stat-pulse" /><b>Smart charging</b><small>Designed around your journey</small></div>
        <a href="#solutions" className="ev-promo-scroll" aria-label="Scroll to solutions"><span>SCROLL TO EXPLORE</span><ChevronDown aria-hidden="true" /></a>
      </section>

      <section aria-label="VLOXIA clean energy promise" className="feature-rail">
        <p>Smarter energy for homes, businesses and mobility.</p>
        <Link href="/solutions/ev-charging">Explore VLOXIA solutions <ArrowRight /></Link>
      </section>

      {/* â”€â”€ COMPANY INTRO â”€â”€ */}
      <section className="home-intro">
        <div >
          <div >
            <div>
              <p >
                Who We Are
              </p>
              <h2 >
                India&apos;s Integrated Clean Energy Partner
              </h2>
              <p >
                VLOXIA Systems LLP is a Delhi-based technology-driven company operating across four
                clean energy verticals: EV Charging Infrastructure, Solar Energy Systems, Lithium
                Battery Storage and Power Solutions.
              </p>
              <p >
                We combine OEM-grade technology partnerships with a consultative approach â€” helping
                residential, commercial and industrial clients design, deploy and manage their energy
                ecosystems for maximum efficiency, reliability and sustainability.
              </p>
              <Link
                href="/about"
                
              >
                Learn More About Us <ArrowRight  />
              </Link>
            </div>
            <div >
              {[
                { title: "Technology-Led", desc: "OEM-grade product portfolio with proven global technology" },
                { title: "Multi-Vertical", desc: "Four energy domains under one integrated roof" },
                { title: "Customised", desc: "Tailored recommendations for every site and use case" },
                { title: "Scalable", desc: "Solutions that grow with your energy needs" },
              ].map((item) => (
                <div key={item.title} >
                  <div >
                    <div  />
                  </div>
                  <h3 >{item.title}</h3>
                  <p >{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ FOUR SOLUTIONS â”€â”€ */}
      <section id="solutions"  className="home-solutions">
        <div >
          <div >
            <p >
              What We Offer
            </p>
            <h2 >Our Four Core Solutions</h2>
            <p >
              An integrated ecosystem that generates, stores, manages and moves energy â€” all under one partner.
            </p>
          </div>
          <div >
            {solutions.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                
              >
                <div >
                  <s.icon  />
                </div>
                <h3 >{s.title}</h3>
                <p >{s.desc}</p>
                <span >
                  Learn More <ArrowRight  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ WHY VLOXIA â”€â”€ */}
      <section className="home-advantages">
        <div className="home-advantages-inner">
          <div className="home-advantages-heading">
            <p>Our Edge</p>
            <h2>Why Choose VLOXIA?</h2>
          </div>
          <div className="home-advantage-layout">
            <div className="home-advantage-column">
            {[
              { n: "01", title: "Technology-Led Approach", desc: "We source from leading OEMs and integrate proven global technology into every solution." },
              { n: "02", title: "Multiple Energy Verticals", desc: "EV, Solar, Storage and Power â€” one partner for your entire clean energy journey." },
              { n: "03", title: "Customised Recommendations", desc: "Site assessment, load analysis and tailored system design for every client." },
            ].map((item) => (
              <article key={item.n} className="home-advantage-card">
                <span className="home-advantage-number">{item.n}</span>
                <div><h3>{item.title}</h3><p>{item.desc}</p></div>
              </article>
            ))}
            </div>

            <div className="home-charger-art" aria-hidden="true">
              <div className="home-charger-halo" />
              <div className="home-charger-device">
                <div className="home-charger-top"><span /></div>
                <div className="home-charger-screen"><Zap /></div>
                <div className="home-charger-light" />
                <div className="home-charger-port"><span /></div>
                <div className="home-charger-brand">VLOXIA <small>EV CHARGE</small></div>
              </div>
              <div className="home-charger-cable" />
              <div className="home-charger-connector"><span /></div>
              <div className="home-charger-base" />
              <div className="home-charger-ground-glow" />
            </div>

            <div className="home-advantage-column">
            {[
              { n: "04", title: "OEM Ecosystem", desc: "Direct technology partnerships ensuring product quality, warranty and support." },
              { n: "05", title: "Scalable Systems", desc: "Solutions designed to scale with your growth â€” from single home to large industrial campus." },
              { n: "06", title: "Channel Network", desc: "Expanding dealer, distributor and installer network across India." },
            ].map((item) => (
              <article key={item.n} className="home-advantage-card">
                <span className="home-advantage-number">{item.n}</span>
                <div><h3>{item.title}</h3><p>{item.desc}</p></div>
              </article>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ PARTNERS â”€â”€ */}
      <section className="home-partners">
        <div >
          <p >Technology Partners</p>
          <h2 >Our Technology Partners</h2>
          <p >
            We collaborate with established OEM brands to deliver reliable, certified products.
          </p>
          <div >
            <div >
              <div >TATA EZ POWER</div>
              <div >EV Charging Technology</div>
            </div>
            <div >
              <div >+ More Partners</div>
              <div >Expanding Portfolio</div>
            </div>
          </div>
          <Link href="/partners" >
            View All Partners <ArrowRight  />
          </Link>
        </div>
      </section>

      {/* â”€â”€ INDUSTRIES â”€â”€ */}
      <section className="home-industries">
        <div >
          <div >
            <p >Who We Serve</p>
            <h2 >Industries We Serve</h2>
          </div>
          <div >
            {[
                { image: "/Industries/Residential.png", icon: House, label: "Residential", desc: "Homes & Apartments" },
                { image: "/Industries/Commercial.png", icon: Building2, label: "Commercial", desc: "Offices & Retail" },
                { image: "/Industries/Industrial.png", icon: Factory, label: "Industrial", desc: "Factories & Plants" },
                { image: "/Industries/Mobility.png", icon: CarFront, label: "Mobility", desc: "Fleets & Transport" },
                { image: "/Industries/Institutional.png", icon: Landmark, label: "Institutional", desc: "Schools & Hospitals" },
            ].map((seg) => {
              const Icon = seg.icon;
              return <Link
                key={seg.label}
                href={`/industries#${seg.label.toLowerCase()}`}
                className="home-industry-card"
              >
                <Image src={seg.image} alt={`${seg.label} energy solutions`} fill sizes="(max-width: 680px) 70vw, (max-width: 1100px) 32vw, 20vw" className="home-industry-image" />
                <div className="home-industry-shade" />
                <div className="home-industry-copy">
                  <span className="home-industry-icon"><Icon aria-hidden="true" /></span>
                  <h3>{seg.label}</h3>
                  <p>{seg.desc}</p>
                </div>
              </Link>;
            })}
          </div>
        </div>
      </section>

      {/* â”€â”€ PROCESS â”€â”€ */}
      <section className="home-process">
        <div >
          <div >
            <p >How We Work</p>
            <h2 >Our Solution Process</h2>
          </div>
          <div >
            {[
              { step: "01", label: "Understand", icon: Target, desc: "We listen to your energy needs and site requirements." },
              { step: "02", label: "Analyse", icon: BarChart3, desc: "Load analysis, site assessment and feasibility study." },
              { step: "03", label: "Recommend", icon: Lightbulb, desc: "Customised system design and product selection." },
              { step: "04", label: "Implement", icon: Settings, desc: "Professional installation and commissioning." },
              { step: "05", label: "Support", icon: ShieldCheck, desc: "Ongoing monitoring, maintenance and after-sales care." },
            ].map((item, i, arr) => (
              <div key={item.step} >
                <div >
                  <div >
                    <item.icon aria-hidden="true" />
                  </div>
                  <div >{item.step}</div>
                  <div >{item.label}</div>
                  <div >{item.desc}</div>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ ECOSYSTEM â”€â”€ */}
      <section className="home-ecosystem">
        <div >
          <div >
            <p >The Ecosystem</p>
            <h2 >Generate â†’ Store â†’ Power â†’ Move</h2>
            <p >
              A connected clean energy loop â€” solar panels generate power, batteries store it, inverters distribute it, and EV chargers use it.
            </p>
          </div>
          <div >
            {[
              { icon: Sun, label: "Generate", sub: "Solar Energy", color: "from-yellow-400 to-orange-400" },
              { icon: Battery, label: "Store", sub: "Lithium Storage", color: "from-green-400 to-emerald-500" },
              { icon: Power, label: "Power", sub: "Inverters & Backup", color: "from-purple-400 to-violet-500" },
              { icon: Zap, label: "Move", sub: "EV Charging", color: "from-blue-400 to-cyan-400" },
            ].map((item, i, arr) => (
              <div key={item.label} >
                <div >
                  <item.icon  />
                </div>
                <div >{item.label}</div>
                <div >{item.sub}</div>
                {i < arr.length - 1 && (
                  <ArrowRight  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ CHANNEL PARTNER CTA â”€â”€ */}
      <section className="home-channel">
        <div >
          <div >
            <div>
              <p >Partner With Us</p>
              <h2 >Become a Channel Partner</h2>
              <p >
                Dealers, distributors, installers, EPC companies and business partners â€” join the VLOXIA energy network and grow together.
              </p>
            </div>
            <Link
              href="/partners#channel-partner"
              
            >
              Partner Enquiry <ArrowRight  />
            </Link>
          </div>
        </div>
      </section>

      <section className="home-faq">
        <div className="section-heading">
          <p className="eyebrow">Need to know</p>
          <h2>Frequently asked questions</h2>
          <p>Some quick answers about choosing and planning a clean energy system.</p>
        </div>
        <div className="faq-list">
          <details><summary>Which VLOXIA solutions can I enquire about?</summary><p>We work across EV charging, solar energy, lithium storage and power solutions. You can enquire about one solution or a combination.</p></details>
          <details><summary>Can solutions be planned for homes and businesses?</summary><p>Yes. We work with residential, commercial, industrial and institutional customers, and tailor recommendations to each site.</p></details>
          <details><summary>How do I get a recommendation for my site?</summary><p>Share your location, customer type and energy requirement through the enquiry form. Our team can follow up to understand your needs.</p></details>
          <details><summary>Can I become a VLOXIA channel partner?</summary><p>Dealers, distributors, installers and EPC companies can reach us through the channel partner enquiry page.</p></details>
        </div>
      </section>

      <section className="home-guides">
        <div className="section-heading section-heading-row">
          <div><p className="eyebrow">Explore VLOXIA</p><h2>Find the right energy solution</h2></div>
          <Link href="/solutions/ev-charging">View all solutions <ArrowRight /></Link>
        </div>
        <div className="guide-grid">
          <Link href="/solutions/ev-charging"><span>EV CHARGING</span><h3>Charging for homes, workplaces and fleets</h3><p>Explore AC and DC charging options for different sites and use cases.</p><b>Explore EV charging <ArrowRight /></b></Link>
          <Link href="/solutions/solar-energy"><span>SOLAR ENERGY</span><h3>Generate power from your rooftop</h3><p>Learn about solar systems for residential, commercial and industrial needs.</p><b>Explore solar <ArrowRight /></b></Link>
          <Link href="/solutions/energy-storage"><span>ENERGY STORAGE</span><h3>Store energy for when you need it</h3><p>See lithium storage options for backup power and energy management.</p><b>Explore storage <ArrowRight /></b></Link>
        </div>
      </section>
    </div>
  );
}
