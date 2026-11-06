import ServicePageTemplate, { ServicePageData } from "../../../components/ServicePageTemplate";

export const metadata = {
  title: "Solar Energy Solutions & Rooftop Systems | VLOXIA Systems LLP",
  description:
    "Turning Sunlight into Sustainable Power. VLOXIA Systems LLP delivers commercial & industrial solar, residential rooftop, and integrated solar + storage solutions across India.",
  keywords: [
    "Solar energy solutions Delhi",
    "Commercial rooftop solar installer",
    "Industrial solar power systems India",
    "Residential rooftop solar",
    "Solar plus storage systems",
    "Generate Store Manage Consume",
  ],
};

const solarEnergyData: ServicePageData = {
  categoryEyebrow: "06 | SOLAR ENERGY SOLUTIONS",
  heroTitle: "Turning Sunlight into Sustainable Power",
  heroSubtitle:
    "Solar energy is at the heart of India's transition towards cleaner and more economical electricity. VLOXIA is building a comprehensive portfolio of solar solutions designed to reduce dependence on conventional electricity and improve long-term energy economics.",
  heroImage: "/Industries/Commercial.png",
  heroImageAlt: "VLOXIA Solar Energy & Rooftop EPC Solutions",
  quoteLink: "/contact?service=solar-energy",
  whyPartnerTitle: "From Electricity Consumer to Energy Producer",
  whyPartnerSubtitle:
    "Our objective is to help customers move from simply consuming electricity to increasingly producing and managing their own energy.",
  whyPartnerCards: [
    {
      iconText: "☀️",
      title: "Rooftop Solar Solutions",
      desc: "Engineered for residential homes, apartment complexes, commercial establishments, and institutions looking to reduce electricity bills and carbon footprints.",
    },
    {
      iconText: "🏭",
      title: "Commercial & Industrial Solar",
      desc: "High-yield solar power systems for manufacturing facilities, logistics warehouses, and energy-intensive operations with compelling ROI payback.",
    },
    {
      iconText: "🔋",
      title: "Solar + Storage Systems",
      desc: "Pairing rooftop solar arrays with advanced lithium battery systems to create a resilient energy ecosystem: Generate → Store → Manage → Consume.",
    },
    {
      iconText: "⚙️",
      title: "Customized Renewable Solutions",
      desc: "Tailored engineering, shadow analysis, structural certifications, and DISCOM synchronization aligned to site-specific constraints.",
    },
  ],
  productsTitle: "Solar Solutions Across Diverse Scales",
  productsSubtitle:
    "Explore our residential, commercial, industrial, and integrated solar + battery storage systems.",
  products: [
    {
      title: "Residential & Housing Society Rooftop Solar",
      desc: "High-efficiency rooftop solar installations engineered to drastically reduce grid reliance, synchronized with bi-directional net metering.",
      image: "/Industries/Residential.png",
      tag: "Residential & Society",
      href: "/contact?service=residential-solar",
    },
    {
      title: "Commercial & Industrial Solar + Storage Systems",
      desc: "Turnkey C&I solar power systems paired with lithium storage for daytime consumption, peak-load shaving, and critical backup continuity.",
      image: "/Industries/Industrial.png",
      tag: "C&I and Solar + Storage",
      href: "/contact?service=commercial-solar",
    },
  ],
  howToTitle: "The Solar + Storage Energy Equation",
  howToSubtitle:
    "The combination of solar generation and battery storage creates a more resilient energy ecosystem.",
  categoryTags: [
    "Commercial & Industrial Units",
    "Residential Rooftops",
    "Solar + Storage Microgrids",
  ],
  deploymentSteps: [
    {
      number: "01",
      title: "GENERATE — Capture Clean Sunlight",
      desc: "High-efficiency monocrystalline solar modules convert solar irradiance into clean DC electrical energy on your premises.",
      points: [
        "Shadow-free roof survey",
        "Tilt-angle optimization",
        "Monthly generation estimate",
      ],
    },
    {
      number: "02",
      title: "STORE & MANAGE — Lithium Battery Synergy",
      desc: "Excess solar generation is seamlessly stored in high-performance lithium batteries rather than sent to the grid at low feed-in tariffs.",
      points: [
        "Lithium battery integration",
        "Dynamic charge management",
        "Peak-tariff load shifting",
      ],
    },
    {
      number: "03",
      title: "CONSUME — Reliable Zero-Emission Power",
      desc: "Power your critical loads, machinery, air conditioning, and EV chargers 24/7 with clean, economical energy.",
      points: [
        "Zero diesel generator reliance",
        "Continuous power reliability",
        "Long-term energy cost savings",
      ],
    },
  ],
};

export default function SolarEnergyPage() {
  return <ServicePageTemplate data={solarEnergyData} />;
}