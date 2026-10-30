import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Contact Us | VLOXIA Systems LLP",
  description: "Contact VLOXIA Systems LLP for EV Charging, Solar Energy, Energy Storage and Power Solution enquiries. Delhi-based, serving pan-India.",
};

export default function ContactPage() {
  return (
    <main className="content-page contact-page">
      <section className="content-hero">
        <div className="content-hero-glow" />
        <div className="content-hero-inner">
          <p className="content-eyebrow">Get In Touch</p>
          <h1>Contact Us</h1>
          <p>
            Ready to start your energy journey? Our experts are here to help — reach out for a consultation, quotation or partnership enquiry.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="content-container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div>
              <h2 className="content-card-title">Get in Touch</h2>
              <div className="contact-details">
                {[
                  { Icon: MapPin, label: "Registered Office", value: "A3/55, Sector 15, Rohini, Delhi – 110089" },
                  { Icon: Phone, label: "Phone / WhatsApp", value: "+91 8178810456", href: "tel:+918178810456" },
                  { Icon: Mail, label: "Email", value: "vloxiasystems@gmail.com", href: "mailto:vloxiasystems@gmail.com" },
                  { Icon: Clock, label: "Business Hours", value: "Mon – Sat: 9:00 AM – 7:00 PM IST" },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="contact-detail">
                    <div className="contact-icon">
                      <Icon aria-hidden="true" />
                    </div>
                    <div>
                      <div className="contact-label">{label}</div>
                      {href ? (
                        <a href={href}>{value}</a>
                      ) : (
                        <div className="contact-value">{value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="contact-map">
                <div>
                  <MapPin aria-hidden="true" />
                  <p>Sector 15, Rohini, Delhi – 110089</p>
                  <a
                    href="https://maps.google.com/?q=Sector+15+Rohini+Delhi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-text-link"
                  >
                    View on Google Maps ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Enquiry Form */}
            <div>
              <h2 className="content-card-title">Send an Enquiry</h2>
              <form className="contact-form">
                <div className="contact-form-row">
                  <div>
                    <label>Full Name *</label>
                    <input type="text" placeholder="Your full name" />
                  </div>
                  <div>
                    <label>Phone Number *</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
                <div>
                  <label>Business Email</label>
                  <input type="email" placeholder="you@company.com" />
                </div>
                <div >
                  <div>
                    <label >Interested Solution *</label>
                    <select >
                      <option value="">Select a solution</option>
                      <option>EV Charging</option>
                      <option>Solar Energy</option>
                      <option>Energy Storage & Lithium</option>
                      <option>Power Solutions</option>
                      <option>Multiple Solutions</option>
                    </select>
                  </div>
                  <div>
                    <label >Customer Type *</label>
                    <select >
                      <option value="">Select type</option>
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Industrial</option>
                      <option>Dealer / Channel Partner</option>
                      <option>Institutional</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label >City / Location</label>
                  <input type="text" placeholder="Your city"  />
                </div>
                <div>
                  <label >Your Requirement</label>
                  <textarea rows={4} placeholder="Describe your energy requirement or any specific questions..."  />
                </div>
                <button type="submit" >
                  Submit Enquiry <ArrowRight  />
                </button>
                <p >We respond within 24 business hours.</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
