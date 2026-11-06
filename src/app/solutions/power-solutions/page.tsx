import ServicePageTemplate, { ServicePageData } from "../../../components/ServicePageTemplate";

export const metadata = {
  title: "Power Continuity & Hybrid Inverter Services | VLOXIA Systems LLP",
  description:
    "Pure sine wave solar hybrid inverters, sub-10ms critical UPS backup, and cross-technology energy management by VLOXIA Systems LLP.",
};

const powerSolutionsData: ServicePageData = {
  categoryEyebrow: "SOLUTIONS",
  heroTitle: "Services to Support Continuous Power Solutions",
  heroSubtitle:
    "We present advanced power conditioning, hybrid inverter systems, and uninterrupted backup infrastructure engineered to eliminate costly operational downtime.",
  heroImage: "/Industries/Institutional.png",
  heroImageAlt: "VLOXIA Critical Power Backup & Inverter Systems",
  quoteLink: "/contact?service=power-solutions",
  whyPartnerTitle: "Why Should You Partner?",
  whyPartnerSubtitle:
    "Get a detailed understanding of the power factor correction, harmonic filtering, and true zero-switchover capabilities engineered into our power systems.",
  whyPartnerCards: [
    {
      iconText: "🔌",
      title: "Pure Sine Wave Integrity",
      desc: "Grid-grade clean AC output with total harmonic distortion (THD) < 2.5%, safeguarding high-precision diagnostic and semiconductor machinery.",
    },
    {
      iconText: "⚡",
      title: "Sub-10ms Critical Switchover",
      desc: "Ultra-fast transfer times ensuring server racks, medical electronics, and sensitive PLCs operate continuously without rebooting.",
    },
    {
      iconText: "🔄",
      title: "Hybrid Multi-Source Orchestration",
      desc: "Smart microcontrollers balance solar generation, grid power, battery reserves, and diesel generator synchronizing automatically.",
    },
    {
      iconText: "🛠️",
      title: "Field Diagnostic & 24/7 Support",
      desc: "Dedicated power quality engineers deploy on-site to perform harmonic spectrum analysis, earth fault tracking, and proactive maintenance.",
    },
  ],
  productsTitle: "Various Solutions Available at VLOXIA Power Services",
  productsSubtitle:
    "Explore our solar hybrid inverter range, online UPS backup systems, and integrated energy management hardware.",
  products: [
    {
      title: "VLOXIA Solar Hybrid Inverter Series (Dual MPPT)",
      desc: "High-voltage single and three-phase hybrid inverters engineered with dual MPPT trackers, customizable export control, and built-in lithium BMS communications.",
      image: "/ev-wallbox-isolated.png",
      tag: "Residential & Commercial",
      href: "/shop",
    },
    {
      title: "Enterprise Critical Power Backup & Online UPS",
      desc: "True online double-conversion UPS infrastructure delivering zero-transfer-time protection for hospitals, data centres, and industrial control rooms.",
      image: "/Industries/Industrial.png",
      tag: "Hospitals & Mission-Critical",
      href: "/contact?service=ups-backup",
    },
  ],
  howToTitle: "How to Deploy VLOXIA Power Solutions",
  howToSubtitle:
    "Ensure uninterrupted power continuity for your facility by following our structured 3-step power engineering process.",
  categoryTags: [
    "Healthcare & Hospitals",
    "IT & Data Centre Infrastructure",
    "Commercial & Industrial Operations",
  ],
  deploymentSteps: [
    {
      number: "01",
      title: "Audit Connected Loads & Power Factor",
      desc: "Evaluate your facility's single-phase vs. three-phase load balance, power factor penalties, inrush motor loads, and harmonic distortion levels.",
      points: [
        "Harmonic distortion analysis (THD)",
        "Phase balance verification",
        "Sensitive equipment isolation",
      ],
    },
    {
      number: "02",
      title: "System Sizing & Switchgear Architecture",
      desc: "We design the dual-conversion inverter topology, specify automatic transfer switch (ATS) ratings, and integrate lithium battery banks.",
      points: [
        "ATS & bypass switchgear sizing",
        "Battery autonomous runtime calculation",
        "Earthing & neutral grounding design",
      ],
    },
    {
      number: "03",
      title: "Turnkey Commissioning & Full-Load Testing",
      desc: "On-site switchgear installation, full simulated grid outage test, thermal imaging of all busbars, and 24/7 telemetry handover.",
      points: [
        "Simulated 100% load cutoff test",
        "Thermal busbar imaging",
        "Annual maintenance contract (AMC) setup",
      ],
    },
  ],
};

export default function PowerSolutionsPage() {
  return <ServicePageTemplate data={powerSolutionsData} />;
}
