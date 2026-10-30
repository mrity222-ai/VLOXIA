"use client";
import Link from "next/link";
import Image from "next/image";
import FeaturedProducts from "@/components/FeaturedProducts";
import HowItWorksProcess from "@/components/HowItWorksProcess";
import { ArrowRight, Zap, Sun, Battery, Power, ChevronDown, House, Building2, Factory, CarFront, Landmark, Target, BarChart3, Lightbulb, Settings, ShieldCheck } from "lucide-react";

const solutions = [
  {
    icon: Zap,
    title: "EV Charging",
    desc: "AC & DC fast chargers for home, commercial, fleet and public infrastructure.",
    href: "/solutions/ev-charging",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Sun,
    title: "Solar Energy",
    desc: "Residential, commercial & industrial rooftop solar systems with grid integration.",
    href: "/solutions/solar-energy",
    color: "from-blue-400 to-blue-500",
  },
  {
    icon: Battery,
    title: "Energy Storage",
    desc: "Lithium battery systems for backup power, load shifting and energy independence.",
    href: "/solutions/energy-storage",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: Power,
    title: "Power Solutions",
    desc: "Inverters, power backup and integrated energy management for all sectors.",
    href: "/solutions/power-solutions",
    color: "from-blue-500 to-indigo-500",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Homepage hero */}
      <section>
        <div aria-hidden="true">
          <Image
            src="/Industries/Mobility.png"
            alt=""
            fill
            priority
            sizes="(max-width: 680px) 100vw, 62vw"
          />
          <div />
          <div />
          <div />
          <div><Zap aria-hidden="true" /> Built for electric mobility</div>
        </div>

        <div>
          <div><span /> VLOXIA EV CHARGING</div>
          <h1>Fueling the <span>Next Electric Era.</span></h1>
          <p>
            Charging that fits seamlessly into your life. We provide intelligent, high-speed power solutions designed for the mobility of tomorrow.
          </p>
          <Link href="/solutions/ev-charging">
            Find your charging solution <ArrowRight aria-hidden="true" />
          </Link>

          <div>
            <div><span><Zap aria-hidden="true" /></span><span><b>Fast Charging</b><small>Power up at home, work or on the move.</small></span></div>
            <div><span><ShieldCheck aria-hidden="true" /></span><span><b>Certified & Reliable</b><small>Trusted technology with dependable support.</small></span></div>
          </div>

          <div>
            <span aria-hidden="true"><i>V</i><i>EV</i><i>+</i></span>
            <span><b>Powering the transition</b><small>Clean energy solutions across India</small></span>
          </div>
        </div>

        <div><span /><b>Smart charging</b><small>Designed around your journey</small></div>
        <a href="#solutions" aria-label="Scroll to solutions"><span>SCROLL TO EXPLORE</span><ChevronDown aria-hidden="true" /></a>
      </section>

      <section aria-label="VLOXIA clean energy promise">
        <p>Smarter energy for homes, businesses and mobility.</p>
        <Link href="/solutions/ev-charging">Explore VLOXIA solutions <ArrowRight /></Link>
      </section>

      {/* â”€â”€ COMPANY INTRO â”€â”€ */}
      <section>
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
      <section id="solutions">
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
      <section>
        <div>
          <div>
            <p>Our Edge</p>
            <h2>Why Choose VLOXIA?</h2>
          </div>
          <div>
            <div>
            {[
              { n: "01", title: "Technology-Led Approach", desc: "We source from leading OEMs and integrate proven global technology into every solution." },
              { n: "02", title: "Multiple Energy Verticals", desc: "EV, Solar, Storage and Power â€” one partner for your entire clean energy journey." },
              { n: "03", title: "Customised Recommendations", desc: "Site assessment, load analysis and tailored system design for every client." },
            ].map((item) => (
              <article key={item.n}>
                <span>{item.n}</span>
                <div><h3>{item.title}</h3><p>{item.desc}</p></div>
              </article>
            ))}
            </div>

            <div aria-hidden="true">
              <div />
              <div>
                <div><span /></div>
                <div><Zap /></div>
                <div />
                <div><span /></div>
                <div>VLOXIA <small>EV CHARGE</small></div>
              </div>
              <div />
              <div><span /></div>
              <div />
              <div />
            </div>

            <div>
            {[
              { n: "04", title: "OEM Ecosystem", desc: "Direct technology partnerships ensuring product quality, warranty and support." },
              { n: "05", title: "Scalable Systems", desc: "Solutions designed to scale with your growth â€” from single home to large industrial campus." },
              { n: "06", title: "Channel Network", desc: "Expanding dealer, distributor and installer network across India." },
            ].map((item) => (
              <article key={item.n}>
                <span>{item.n}</span>
                <div><h3>{item.title}</h3><p>{item.desc}</p></div>
              </article>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ INDUSTRIES â”€â”€ */}
      <section>
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
              >
                <Image src={seg.image} alt={`${seg.label} energy solutions`} fill sizes="(max-width: 680px) 70vw, (max-width: 1100px) 32vw, 20vw" />
                <div />
                <div>
                  <span><Icon aria-hidden="true" /></span>
                  <h3>{seg.label}</h3>
                  <p>{seg.desc}</p>
                </div>
              </Link>;
            })}
          </div>
        </div>
      </section>

      <FeaturedProducts
        title="Shop Clean Energy Products"
        description="Explore popular EV chargers, lithium storage and power products from the VLOXIA marketplace."
        productIds={["ev-home-7kw", "ev-comm-22kw", "batt-lifepo4-5kwh", "inverter-hybrid-5kw"]}
      />

            {/* ── HOW IT WORKS PROCESS ── */}
      <HowItWorksProcess />


            {/* â”€â”€ CHANNEL PARTNER CTA â”€â”€ */}
      <section>
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

      <section>
        <div>
          <p>Need to know</p>
          <h2>Frequently asked questions</h2>
          <p>Some quick answers about choosing and planning a clean energy system.</p>
        </div>
        <div>
          <details><summary>Which VLOXIA solutions can I enquire about?</summary><p>We work across EV charging, solar energy, lithium storage and power solutions. You can enquire about one solution or a combination.</p></details>
          <details><summary>Can solutions be planned for homes and businesses?</summary><p>Yes. We work with residential, commercial, industrial and institutional customers, and tailor recommendations to each site.</p></details>
          <details><summary>How do I get a recommendation for my site?</summary><p>Share your location, customer type and energy requirement through the enquiry form. Our team can follow up to understand your needs.</p></details>
          <details><summary>Can I become a VLOXIA channel partner?</summary><p>Dealers, distributors, installers and EPC companies can reach us through the channel partner enquiry page.</p></details>
        </div>
      </section>

      <section>
        <div>
          <div><p>Explore VLOXIA</p><h2>Find the right energy solution</h2></div>
          <Link href="/solutions/ev-charging">View all solutions <ArrowRight /></Link>
        </div>
        <div>
          <Link href="/solutions/ev-charging"><span>EV CHARGING</span><h3>Charging for homes, workplaces and fleets</h3><p>Explore AC and DC charging options for different sites and use cases.</p><b>Explore EV charging <ArrowRight /></b></Link>
          <Link href="/solutions/solar-energy"><span>SOLAR ENERGY</span><h3>Generate power from your rooftop</h3><p>Learn about solar systems for residential, commercial and industrial needs.</p><b>Explore solar <ArrowRight /></b></Link>
          <Link href="/solutions/energy-storage"><span>ENERGY STORAGE</span><h3>Store energy for when you need it</h3><p>See lithium storage options for backup power and energy management.</p><b>Explore storage <ArrowRight /></b></Link>
        </div>
      </section>
    </div>
  );
}
