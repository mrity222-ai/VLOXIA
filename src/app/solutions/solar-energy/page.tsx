import ServicePageTemplate, { ServicePageData } from "@/components/ServicePageTemplate";

export const metadata = {
  title: "Solar Energy EPC Solutions | VLOXIA Systems LLP",
  description:
    "Turnkey rooftop solar, commercial ground mounts, and high-efficiency bifacial solar engineering by VLOXIA Systems LLP.",
};

const solarEnergyData: ServicePageData = {
  categoryEyebrow: "SOLUTIONS",
  heroTitle: "Services to Support Solar Energy Independence",
  heroSubtitle:
    "We present innovative turnkey solar engineering solutions to drastically lower grid tariffs and empower India's homes, commercial campuses, and industries with clean renewable power.",
  heroImage: "/Industries/Commercial.png",
  heroImageAlt: "Commercial Solar Rooftop EPC by VLOXIA",
  quoteLink: "/contact?service=solar-energy",
  whyPartnerTitle: "Why Should You Partner?",
  whyPartnerSubtitle:
    "Get a detailed understanding of the features we offer in our solar energy EPC services, tailored to your site specifications and energy consumption patterns.",
  whyPartnerCards: [
    {
      iconText: "☀️",
      title: "Tier-1 Module Verification",
      desc: "Top-tier ALMM-listed monocrystalline bifacial solar modules ensuring maximum generation even during low irradiance or cloudy monsoon conditions.",
    },
    {
      iconText: "📦",
      title: "Stock Supply Guarantee",
      desc: "Direct procurement partnerships with leading Tier-1 panel and string inverter manufacturers ensuring on-time project execution without supply delays.",
    },
    {
      iconText: "📑",
      title: "MNRE Subsidy & Policy Guidance",
      desc: "Comprehensive documentation handling for PM Surya Ghar Muft Bijli Yojana, state net-metering approvals, CEIG electrical clearances, and DISCOM grid sync.",
    },
    {
      iconText: "🛠️",
      title: "Field Engineering Assistance",
      desc: "Licensed solar structural engineers deploy hot-dip galvanized mounting structures engineered to withstand 150+ km/h cyclone wind speeds.",
    },
  ],
  productsTitle: "Various Solutions Available at VLOXIA Solar Services",
  productsSubtitle:
    "Learn more about our residential rooftop systems, commercial carport structures, and megawatt-scale industrial solar parks.",
  products: [
    {
      title: "Residential Rooftop Solar & Hybrid Systems (1 kW – 10 kW)",
      desc: "High-efficiency rooftop solar installations paired with smart hybrid inverters and net-metering synchronization to cut home electricity bills by up to 80%.",
      image: "/Industries/Residential.png",
      tag: "Residential & Societies",
      href: "/contact?service=residential-solar",
    },
    {
      title: "Commercial & Industrial Solar Parks (10 kW – 1 MW+)",
      desc: "Turnkey MW-scale solar EPC for manufacturing units, educational institutions, and logistics warehouses with accelerated depreciation and ESG compliance.",
      image: "/Industries/Industrial.png",
      tag: "Commercial & MW Industrial",
      href: "/contact?service=commercial-solar",
    },
  ],
  howToTitle: "How to Deploy VLOXIA Solar Energy Services",
  howToSubtitle:
    "Accelerate your transition to solar energy by registering for our comprehensive 3-step turnkey deployment process.",
  categoryTags: [
    "Commercial & Industrial Plants",
    "Independent Homes & Villas",
    "Educational & Healthcare Campuses",
  ],
  deploymentSteps: [
    {
      number: "01",
      title: "Prepare Electricity Bills & Rooftop Layout",
      desc: "Share your past 6-12 months electricity bills, sanctioned load details, and high-level rooftop or ground terrace dimensions.",
      points: [
        "Monthly kWh consumption check",
        "Sanctioned load vs. solar ratio",
        "Rooftop shadow-free area measurement",
      ],
    },
    {
      number: "02",
      title: "3D Shadow Analysis & Engineering Proposal",
      desc: "Our solar architects generate 3D shadow simulation models, tilt-angle calculations, and guaranteed generation estimates with detailed ROI projections.",
      points: [
        "PVSyst generation modeling",
        "Structural wind load certification",
        "3 to 4-year payback projection",
      ],
    },
    {
      number: "03",
      title: "Turnkey EPC & Bi-Directional Grid Sync",
      desc: "Complete civil and electrical mounting, string inverter synchronization, DISCOM bi-directional net-meter testing, and live commissioning.",
      points: [
        "DISCOM net-meter installation",
        "CEIG safety certificate filing",
        "25-Year performance warranty handover",
      ],
    },
  ],
};

export default function SolarEnergyPage() {
  return <ServicePageTemplate data={solarEnergyData} />;
}
