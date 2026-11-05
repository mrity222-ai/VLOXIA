import ServicePageTemplate, { ServicePageData } from "../../../components/ServicePageTemplate";

export const metadata = {
  title: "EV Charging Infrastructure Services | VLOXIA Systems LLP",
  description:
    "End-to-end AC and DC fast EV charging solutions, CMS cloud billing, and turnkey commercial depot infrastructure by VLOXIA Systems LLP.",
};

const evChargingData: ServicePageData = {
  categoryEyebrow: "SOLUTIONS",
  heroTitle: "Services to Support Clean EV Mobility Activities",
  heroSubtitle:
    "We present innovative turnkey solutions to increase the efficiency of electric vehicle charging infrastructure that support the development of India's forward-looking green mobility.",
  heroImage: "/Modern EV Charging.png",
  heroImageAlt: "Modern VLOXIA EV Charging Station and Wallbox",
  quoteLink: "/contact?service=ev-charging",
  whyPartnerTitle: "Why Should You Partner?",
  whyPartnerSubtitle:
    "Get a detailed understanding of the features we offer in our clean EV charging services, according to your key requirements so we can provide assistance adapted to your needs.",
  whyPartnerCards: [
    {
      iconText: "⚡",
      title: "Intensive Verification",
      desc: "End-to-end technical site audit, DISCOM transformer capacity verification, and IEEE / IEC compliance checks to ensure zero system downtime.",
    },
    {
      iconText: "📦",
      title: "Stock Supply Guarantee",
      desc: "Guaranteed hardware availability of certified AC wallboxes (7.4–22kW) and DC fast chargers (30–120kW+) dispatched from local inventory hubs.",
    },
    {
      iconText: "💼",
      title: "CAPEX & OPEX Assistance",
      desc: "Flexible commercial models including revenue-sharing host models, outright CAPEX procurement, and assisted government subsidy approvals.",
    },
    {
      iconText: "🛠️",
      title: "Field Technical Assistance",
      desc: "We deploy field specialists in every key metropolitan cluster to support electrical commissioning, safety earthing, and 24/7 CMS uptime.",
    },
  ],
  productsTitle: "Various Products Available at VLOXIA EV Partner Services",
  productsSubtitle:
    "Learn more about the charging hardware, cloud CMS software, and mobile driver apps available across our commercial and residential charging network.",
  products: [
    {
      title: "VLOXIA Smart AC Wallbox Series (7.4 kW – 22 kW)",
      desc: "Compact Type-2 smart chargers equipped with dynamic phase balancing, RFID authentication, and automated overnight off-peak scheduling.",
      image: "/ev-wallbox-hd.png",
      tag: "Residential & Workplace",
      href: "/shop",
    },
    {
      title: "VLOXIA DC Ultra-Fast Commercial Charging Hub (30 kW – 120 kW+)",
      desc: "High-power liquid/air-cooled dual-gun CCS2 rapid charging station engineered for highway corridors, logistics depots, and commercial malls.",
      image: "/Industries/Mobility.png",
      tag: "Commercial & Highway",
      href: "/contact?service=dc-fast-chargers",
    },
  ],
  howToTitle: "How to Register for VLOXIA EV Partner Services",
  howToSubtitle:
    "Accelerate your campus or fleet electrification by registering for our turnkey charging station deployment workflow.",
  categoryTags: [
    "Commercial Real Estate & Malls",
    "Residential Housing Societies",
    "EV Fleet & Logistics Depots",
  ],
  deploymentSteps: [
    {
      number: "01",
      title: "Prepare Parking & Connected Load Information",
      desc: "Provide your site location details, available sanctioned transformer load, parking bay layout, and anticipated daily vehicle footfall.",
      points: [
        "DISCOM sanction letter check",
        "Dedicated bay allocation",
        "Cable run distance estimate",
      ],
    },
    {
      number: "02",
      title: "Site Audit & Engineering Feasibility",
      desc: "Our senior electrical engineers visit your premises to assess cable routing, earthing pit resistance, and network connectivity for the OCPP CMS.",
      points: [
        "Earthing & surge protection design",
        "Load balancing strategy",
        "Bespoke commercial quotation",
      ],
    },
    {
      number: "03",
      title: "Turnkey Installation & CMS Activation",
      desc: "Complete civil mounting, cabling, circuit breaker installation, live vehicle test charging, and handover of your cloud management dashboard.",
      points: [
        "OCPP 1.6J live onboarding",
        "UPI payment gateway activation",
        "5-Year warranty & SLA coverage",
      ],
    },
  ],
};

export default function EVChargingPage() {
  return <ServicePageTemplate data={evChargingData} />;
}
