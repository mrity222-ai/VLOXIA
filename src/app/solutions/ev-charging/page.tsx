import ServicePageTemplate, { ServicePageData } from "../../../components/ServicePageTemplate";

export const metadata = {
  title: "EV Charging Solutions (AC & DC) | TATA EZ POWER Distributor | VLOXIA Systems LLP",
  description:
    "VLOXIA Systems LLP provides AC and DC EV charging solutions across India. Distributor for TATA EZ POWER chargers for homes, societies, workplaces, fleets, and highway corridors.",
  keywords: [
    "EV charging solutions India",
    "Tata EZ Power EV charger distributor",
    "AC EV chargers Delhi",
    "DC fast charger distributor",
    "Apartment society EV charger Delhi NCR",
    "Fleet charging infrastructure",
  ],
};

const evChargingData: ServicePageData = {
  categoryEyebrow: "05 | EV CHARGING SOLUTIONS",
  heroTitle: "Driving India's Electric Mobility Revolution",
  heroSubtitle:
    "The transition towards electric mobility is creating a rapidly expanding requirement for dependable charging infrastructure. VLOXIA Systems LLP provides access to AC and DC EV charging solutions for diverse applications.",
  heroImage: "/Modern EV Charging.png",
  heroImageAlt: "VLOXIA & TATA EZ POWER AC and DC EV Charging Solutions",
  quoteLink: "/contact?service=ev-charging",
  whyPartnerTitle: "Our Comprehensive EV Charging Portfolio",
  whyPartnerSubtitle:
    "We look at the complete requirement — charger selection, application, power availability, installation requirements and future scalability — before recommending the appropriate solution.",
  whyPartnerCards: [
    {
      iconText: "🏠",
      title: "Residential & Society Charging",
      desc: "Compact, smart AC chargers engineered for independent homes, apartment societies, and residential complexes with automated user billing and safety protection.",
    },
    {
      iconText: "🏢",
      title: "Workplace & Hospitality",
      desc: "Dependable destination charging for corporate offices, hotels, restaurants, commercial establishments, and customer parking bays.",
    },
    {
      iconText: "🛣️",
      title: "DC Fast Public Corridors",
      desc: "High-power DC fast chargers for public charging stations, highway transit corridors, and high-utilisation destination hubs across India.",
    },
    {
      iconText: "🚚",
      title: "Fleets & Automotive Dealerships",
      desc: "Industrial-grade dual-gun fast chargers for commercial EV fleets, logistics delivery hubs, transit operators, and auto dealerships.",
    },
  ],
  productsTitle: "AC & DC Fast Charging Solutions (TATA EZ POWER Distributor)",
  productsSubtitle:
    "Explore our authorized distributor portfolio of TATA EZ POWER AC wallboxes and high-power DC fast charging systems.",
  products: [
    {
      title: "AC EV Chargers (7.4 kW – 22 kW)",
      desc: "Dependable, compact AC chargers for residential charging, apartment societies, workplace charging, hotels, and commercial establishments.",
      image: "/ev-wallbox-hd.png",
      tag: "Residential & Workplace AC",
      href: "/shop",
    },
    {
      title: "DC Fast Chargers (30 kW – 120 kW+)",
      desc: "Heavy-duty CCS2 DC fast chargers for public stations, highway charging corridors, EV fleet depots, and high-utilisation charging locations.",
      image: "/Industries/Mobility.png",
      tag: "Highway & Commercial DC",
      href: "/contact?service=dc-fast-chargers",
    },
  ],
  howToTitle: "Our 4-Step EV Infrastructure Engineering Approach",
  howToSubtitle:
    "We evaluate your electrical infrastructure, sanctioned load, and scalability before commissioning your EV charging points.",
  categoryTags: [
    "Residential & Housing Societies",
    "Commercial & Workplace",
    "Fleets & Highway Corridors",
  ],
  deploymentSteps: [
    {
      number: "01",
      title: "Application & Site Requirement Analysis",
      desc: "We analyze your specific application — residential, workplace, commercial, or fleet — and assess daily charging throughput needs.",
      points: [
        "Sanctioned power audit",
        "Transformer load assessment",
        "Vehicle footfall estimation",
      ],
    },
    {
      number: "02",
      title: "Charger Selection & Electrical Design",
      desc: "Recommending the ideal mix of AC or DC fast chargers from our TATA EZ POWER portfolio along with single-line diagram and protection gear.",
      points: [
        "AC vs DC sizing analysis",
        "Dynamic load management",
        "Protection switchgear BOM",
      ],
    },
    {
      number: "03",
      title: "Certified Installation & Commissioning",
      desc: "Turnkey cabling, civil bay marking, earthing pit verification, DISCOM compliance checks, and live test charging.",
      points: [
        "CEIG & DISCOM compliance",
        "Surge protection verification",
        "OCPP CMS connection",
      ],
    },
  ],
};

export default function EvChargingPage() {
  return <ServicePageTemplate data={evChargingData} />;
}