import ServicePageTemplate, { ServicePageData } from "../../../components/ServicePageTemplate";

export const metadata = {
  title: "Energy Storage & Lithium Solutions | TATA EZ POWER Distributor | VLOXIA Systems LLP",
  description:
    "Store Energy. Secure Power. Improve Efficiency. Inverters with integrated lithium battery systems for homes, offices, clinics, and commercial backup by VLOXIA Systems LLP.",
  keywords: [
    "Inverter with integrated lithium battery India",
    "Lithium energy storage Delhi",
    "Tata EZ Power inverter distributor",
    "Commercial energy storage systems",
    "Residential lithium battery backup",
  ],
};

const energyStorageData: ServicePageData = {
  categoryEyebrow: "07 | ENERGY STORAGE & LITHIUM SOLUTIONS",
  heroTitle: "Store Energy. Secure Power. Improve Efficiency.",
  heroSubtitle:
    "Energy storage is becoming an essential component of the modern power ecosystem. VLOXIA Systems LLP offers advanced inverter and energy-storage solutions, including next-generation inverters with integrated lithium battery systems.",
  heroImage: "/Industries/Industrial.png",
  heroImageAlt: "VLOXIA & TATA EZ POWER Integrated Lithium Energy Storage",
  quoteLink: "/contact?service=energy-storage",
  whyPartnerTitle: "Key Benefits of Integrated Lithium Storage",
  whyPartnerSubtitle:
    "Replacing cumbersome lead-acid batteries with compact, high-efficiency lithium architectures engineered for modern Indian conditions.",
  whyPartnerCards: [
    {
      iconText: "🔋",
      title: "Integrated Lithium Battery Technology",
      desc: "Inverters with integrated lithium battery systems engineered for higher energy density, zero maintenance, and thousands of deep discharge cycles.",
    },
    {
      iconText: "📦",
      title: "Compact System Architecture",
      desc: "Sleek, compact footprint that fits seamlessly inside modern homes, offices, clinics, retail shops, and educational institutions without bulky battery racks.",
    },
    {
      iconText: "⚡",
      title: "Intelligent Energy Management",
      desc: "Smart BMS and inverter firmware delivering instant power continuity, optimal charging cycles, and sub-10ms automatic transfer during grid outages.",
    },
    {
      iconText: "🌱",
      title: "Clean Replacement for DG Sets",
      desc: "Reduced dependence on noisy, polluting conventional diesel generators and acid fumes, delivering silent, zero-emission power security.",
    },
  ],
  productsTitle: "Inverters with Integrated Lithium Systems (TATA EZ POWER Distributor)",
  productsSubtitle:
    "Explore our authorized distributor portfolio of intelligent inverters with integrated lithium battery systems for residential and commercial backup.",
  products: [
    {
      title: "Integrated Lithium Inverter & Storage Systems",
      desc: "All-in-one inverter with integrated lithium battery system. Compact architecture, high cycle life, and intelligent power management for homes, clinics, and offices.",
      image: "/ev-wallbox-clean.png",
      tag: "Residential & Small Business",
      href: "/shop",
    },
    {
      title: "Commercial & Institutional Energy Storage",
      desc: "Higher-capacity lithium energy storage systems engineered for commercial establishments, schools, retail chains, and critical backup power applications.",
      image: "/Industries/Institutional.png",
      tag: "Commercial & Healthcare",
      href: "/contact?service=commercial-bess",
    },
  ],
  howToTitle: "Diverse Real-World Applications",
  howToSubtitle:
    "Engineered for diverse residential, commercial, healthcare, and educational environments.",
  categoryTags: [
    "Homes & Premium Residences",
    "Offices & Retail Outlets",
    "Clinics & Healthcare Facilities",
  ],
  deploymentSteps: [
    {
      number: "01",
      title: "HOMES & SMALL BUSINESSES",
      desc: "Silent, compact power backup for lighting, IT devices, refrigeration, and home appliances with zero maintenance and long lifespan.",
      points: [
        "Independent homes & apartments",
        "Retail stores & showrooms",
        "Clinics & healthcare facilities",
      ],
    },
    {
      number: "02",
      title: "COMMERCIAL & INSTITUTIONAL",
      desc: "Continuous power security for offices, schools, colleges, and commercial establishments where downtime directly impacts operations.",
      points: [
        "Corporate offices & banks",
        "Educational institutions",
        "Hospitality & restaurants",
      ],
    },
    {
      number: "03",
      title: "RENEWABLE-ENERGY COMPATIBILITY",
      desc: "Seamless synchronization with rooftop solar installations to store daytime surplus and provide uninterrupted night-time power.",
      points: [
        "Solar + lithium hybrid coupling",
        "Peak-shaving tariff economics",
        "TATA EZ POWER warranty support",
      ],
    },
  ],
};

export default function EnergyStoragePage() {
  return <ServicePageTemplate data={energyStorageData} />;
}