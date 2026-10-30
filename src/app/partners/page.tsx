import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Partners | VLOXIA Systems LLP",
  description: "Technology partnerships, authorised distribution and channel partner opportunities at VLOXIA Systems LLP.",
};

export default function PartnersPage() {
  return (
    <main >
      <section >
        <div  />
        <div >
          <p >Partners</p>
          <h1>Our Technology Partners</h1>
          <p>
            We collaborate with established OEM technology companies to bring certified, reliable and performance-proven clean energy products to our customers.
          </p>
        </div>
      </section>

      {/* Technology Partners */}
      <section >
        <div >
          <div >
            <p >Technology Portfolio</p>
            <h2>Backed by Proven Technology</h2>
          </div>
          <div >
            <div >
              <div >TATA EZ POWER</div>
              <div >EV Charging Technology Partner</div>
              <p>
                Tata EZ Power provides a comprehensive range of AC and DC EV charging solutions. Our partnership enables VLOXIA to deliver Tata-backed charging infrastructure with product reliability, certification and nationwide service support.
              </p>
              <div >
                {["AC Wallbox Chargers (3.3 kW – 22 kW)", "DC Fast Chargers (30 kW – 120 kW+)", "Fleet & public charging solutions", "Smart charging management"].map((p) => (
                  <div key={p}>
                    <span aria-hidden="true" />{p}
                  </div>
                ))}
              </div>
            </div>
            <div >
              <div >🤝</div>
              <h3>More Partners Coming</h3>
              <p>We are actively expanding our technology partner portfolio across Solar, Storage and Power solution categories.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Channel Partner */}
      <section id="channel-partner" >
        <div >
          <div >
            <div>
              <p >Partner With Us</p>
              <h2>Become a Channel Partner</h2>
              <p >
                We are building a pan-India network of dealers, distributors, installers and EPC companies. Join the VLOXIA ecosystem and grow your clean energy business with our product portfolio, technical support and marketing resources.
              </p>
              <div >
                {[
                  "Dealers & Distributors",
                  "Solar & EV Installers",
                  "EPC Companies",
                  "System Integrators",
                  "Business Development Partners",
                ].map((type) => (
                  <div key={type}>
                    <span aria-hidden="true" />
                    <span>{type}</span>
                  </div>
                ))}
              </div>
            </div>
            <div >
              <h3>Channel Partner Enquiry</h3>
              <form >
                <div>
                  <label >Full Name *</label>
                  <input type="text" placeholder="Your name"  />
                </div>
                <div>
                  <label >Company Name</label>
                  <input type="text" placeholder="Your company"  />
                </div>
                <div>
                  <label >Phone Number *</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX"  />
                </div>
                <div>
                  <label >Partner Type</label>
                  <select >
                    <option value="">Select type</option>
                    <option>Dealer / Distributor</option>
                    <option>EV / Solar Installer</option>
                    <option>EPC Company</option>
                    <option>System Integrator</option>
                    <option>Business Partner</option>
                  </select>
                </div>
                <div>
                  <label >City / Region</label>
                  <input type="text" placeholder="Your city or operating region"  />
                </div>
                <button type="submit" >
                  Submit Partner Enquiry <ArrowRight  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
