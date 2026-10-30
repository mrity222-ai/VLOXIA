import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Decorative Ambient Curve (Tata Power Signature Graphic) */}
      <div  />
      <div  />

      {/* Main Footer Container */}
      <div >
        <div >
          
          {/* ── COL 1: Brand & Pure White Logo (3.5 cols) ── */}
          <div >
            <Link href="/" >
              <Image
                src="/vloxia-logo.png"
                alt="VLOXIA Systems LLP"
                width={170}
                height={52}
                
                priority
              />
            </Link>

            <p >
              Powering Mobility. Harnessing Energy. Enabling a Sustainable Future.
            </p>

            <div >
              {["EV Charging", "Solar Energy", "Lithium Storage", "Power Solutions"].map((tag) => (
                <span
                  key={tag}
                  
                >
                  {tag}
                </span>
              ))}
            </div>

            <div >
              {["in", "tw", "fb", "ig"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  
                >
                  <span >
                    {platform}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* ── COL 2: WHO WE ARE (2 cols) ── */}
          <div >
            <h4 >
              WHO WE ARE
            </h4>
            <ul >
              {[
                { label: "Company Overview", href: "/about" },
                { label: "Our Vision & Mission", href: "/about#vision" },
                { label: "Our Approach", href: "/approach" },
                { label: "Why VLOXIA", href: "/about#why-vloxia" },
                { label: "Marketplace / Shop", href: "/shop" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COL 3: WHAT WE DO (2.5 cols) ── */}
          <div >
            <h4 >
              WHAT WE DO
            </h4>
            <ul >
              {[
                { label: "EV Charging Infrastructure", href: "/solutions/ev-charging" },
                { label: "Solar Energy & Rooftop", href: "/solutions/solar-energy" },
                { label: "Energy Storage & Lithium", href: "/solutions/energy-storage" },
                { label: "Power & Hybrid Inverters", href: "/solutions/power-solutions" },
                { label: "Industries We Serve", href: "/industries" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COL 4: CONTACT & OFFICE (3 cols) ── */}
          <div >
            <h4 >
              CONTACT & PARTNERS
            </h4>
            <ul >
              <li >
                <MapPin  />
                <span >
                  A3/55, Sector 15, Rohini,<br />Delhi – 110089, India
                </span>
              </li>
              <li >
                <Phone  />
                <a
                  href="tel:+918178810456"
                  
                >
                  +91 8178810456
                </a>
              </li>
              <li >
                <Mail  />
                <a
                  href="mailto:vloxiasystems@gmail.com"
                  
                >
                  vloxiasystems@gmail.com
                </a>
              </li>
            </ul>

            <Link
              href="/partners#channel-partner"
              
            >
              <span>Become a Channel Partner</span>
              <ArrowRight  />
            </Link>
          </div>

        </div>
      </div>

      {/* ── Bottom Sub-Footer ── */}
      <div >
        <div >
          <p >
            © 2026 VLOXIA Systems LLP. All Rights Reserved.
          </p>
          <div >
            <Link href="#" >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="#" >
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="#" >
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
