import ServicePageTemplate, { ServicePageData } from "../../../components/ServicePageTemplate";

export const metadata = {
  title: "Energy Storage & Lithium BESS Services | VLOXIA Systems LLP",
  description:
    "LiFePO4 lithium battery energy storage systems, modular inverters, and commercial peak-shaving BESS by VLOXIA Systems LLP.",
};

const energyStorageData: ServicePageData = {
  categoryEyebrow: "SOLUTIONS",
  heroTitle: "Services to Support Energy Storage & Lithium BESS",
  heroSubtitle:
    "We present next-generation LiFePO4 battery energy storage systems engineered for instantaneous power switchover, high cycle life, and intelligent commercial peak shaving.",
  heroImage: "/Industries/Industrial.png",
  heroImageAlt: "VLOXIA Lithium BESS Energy Storage Installation",
  quoteLink: "/contact?service=energy-storage",
  whyPartnerTitle: "Why Should You Partner?",
  whyPartnerSubtitle:
    "Get a detailed understanding of the advanced safety, thermal stability, and long cycle life features offered across our lithium energy storage portfolio.",
  whyPartnerCards: [
    {
      iconText: "🔋",
      title: "LiFePO4 Safety Verification",
      desc: "Prismatic Lithium Iron Phosphate (LiFePO4) chemistry with zero thermal runaway risk, rated for over 6,000 deep discharge cycles at 90% DoD.",
    },
    {
      iconText: "📦",
      title: "Stock Supply Guarantee",
      desc: "Standard 5.12 kWh / 100Ah wall-mount battery modules and containerized BESS racks in ready warehouse stock for rapid nationwide dispatch.",
    },
    {
      iconText: "⚡",
      title: "Peak Shaving & Tariff Arbitrage",
      desc: "Intelligent energy management software automatically charges during off-peak tariff hours and discharges during peak kVAh penalty windows.",
    },
    {
      iconText: "🛠️",
      title: "Active BMS & Cloud Telemetry",
      desc: "Automated multi-point temperature monitoring, cell-level active voltage balancing, and cloud diagnostics delivering 24/7 preventive alerts.",
    },
  ],
  productsTitle: "Various Products Available at VLOXIA Storage Services",
  productsSubtitle:
    "Explore our modular residential battery packs, integrated inverter-battery consoles, and utility-scale containerized BESS solutions.",
  products: [
    {
      title: "VLOXIA All-in-One Integrated Hybrid Lithium System",
      desc: "Sleek wall-mounted unit combining pure sine wave inverter and modular 5.12 kWh LiFePO4 battery pack with seamless instant grid switchover.",
      image: "/ev-wallbox-clean.png",
      tag: "Residential & Small Commercial",
      href: "/shop",
    },
    {
      title: "Containerized Commercial & Industrial BESS (20 kWh – 1 MWh+)",
      desc: "Utility-grade containerized battery storage with built-in HVAC, aerosol fire suppression, and SCADA monitoring for factories and microgrids.",
      image: "/Industries/Institutional.png",
      tag: "Commercial & Microgrids",
      href: "/contact?service=commercial-bess",
    },
  ],
  howToTitle: "How to Deploy VLOXIA Energy Storage Services",
  howToSubtitle:
    "Seamlessly integrate lithium energy storage into your existing solar array or grid connection with our structured 3-step deployment.",
  categoryTags: [
    "Commercial & Industrial BESS",
    "Residential & Home Power Backup",
    "Microgrids & Remote Facilities",
  ],
  deploymentSteps: [
    {
      number: "01",
      title: "Analyze Load Profile & Outage Criticality",
      desc: "Provide your peak connected load (kW), critical vs. non-critical circuit distribution, and required backup duration during power cuts.",
      points: [
        "Critical load segregation",
        "Peak inrush current assessment",
        "Target autonomous runtime (hrs)",
      ],
    },
    {
      number: "02",
      title: "Battery Chemistry & Inverter Compatibility Sizing",
      desc: "We engineer the optimal kWh capacity, match low-voltage / high-voltage inverter architectures, and calibrate BMS communication protocols (CAN/RS485).",
      points: [
        "Inverter CAN/RS485 protocol matching",
        "Thermal enclosure & airflow design",
        "Payback via demand charge reduction",
      ],
    },
    {
      number: "03",
      title: "Drop-In Installation & Automatic Failover Testing",
      desc: "Certified electrical installation, sub-10ms automatic switchover testing, BMS commissioning, and client mobile dashboard activation.",
      points: [
        "Automatic transfer switch (ATS) validation",
        "Emergency battery disconnect test",
        "10-Year performance warranty certification",
      ],
    },
  ],
};

export default function EnergyStoragePage() {
  return <ServicePageTemplate data={energyStorageData} />;
}
