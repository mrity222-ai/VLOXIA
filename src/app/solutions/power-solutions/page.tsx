import ServicePageTemplate, { ServicePageData } from "../../../components/ServicePageTemplate";

export const metadata = {
  title: "Integrated Power Solutions & Inverter Systems | VLOXIA Systems LLP",
  description:
    "Reliable Power for a Changing World. Power backup, hybrid inverter solutions, lithium energy storage, and integrated renewable energy systems by VLOXIA Systems LLP.",
  keywords: [
    "Power solutions Delhi",
    "Inverter solutions India",
    "Power backup systems",
    "Hybrid inverters",
    "Integrated renewable energy solutions",
    "VLOXIA Power Solutions",
  ],
};

const powerSolutionsData: ServicePageData = {
  categoryEyebrow: "08 | POWER SOLUTIONS",
  heroTitle: "Reliable Power for a Changing World",
  heroSubtitle:
    "Power reliability is no longer simply about backup. Modern businesses need power solutions that can deliver continuity, efficiency, flexibility and intelligent energy management. VLOXIA is developing an integrated portfolio addressing power backup, inverter solutions, lithium energy storage, solar + storage, and EV charging infrastructure.",
  heroImage: "/Industries/Institutional.png",
  heroImageAlt: "VLOXIA Integrated Power & Inverter Solutions",
  quoteLink: "/contact?service=power-solutions",
  whyPartnerTitle: "Multi-Technology Resilience Rather Than Isolated Units",
  whyPartnerSubtitle:
    "We aim to create solutions that combine multiple technologies rather than treating each energy requirement in isolation.",
  whyPartnerCards: [
    {
      iconText: "⚙️",
      title: "Power Backup & Inverters",
      desc: "Robust inverter and backup power systems engineered for immediate continuity, high surge tolerance, and clean pure sine wave electrical delivery.",
    },
    {
      iconText: "🔋",
      title: "Lithium Energy Storage",
      desc: "High-density lithium storage integrating seamlessly with inverter consoles to replace high-maintenance lead-acid battery banks.",
    },
    {
      iconText: "☀️",
      title: "Solar + Storage Integration",
      desc: "Unifying captive solar generation with battery storage so energy can be produced, stored, managed, and consumed autonomously.",
    },
    {
      iconText: "⚡",
      title: "EV Infrastructure Synergy",
      desc: "Coordinating high-demand EV charging bays with building power systems and inverters to avoid transformer overloads and demand penalties.",
    },
  ],
  productsTitle: "Comprehensive Power & Inverter Architecture",
  productsSubtitle:
    "Explore our multi-vertical power solutions addressing backup, reliability, efficiency, and evolving electrical infrastructure requirements.",
  products: [
    {
      title: "Inverter Solutions with Integrated Lithium",
      desc: "Compact system architecture with integrated lithium battery technology, intelligent energy management, and compatibility with renewable energy.",
      image: "/ev-wallbox-isolated.png",
      tag: "Residential & Commercial Inverters",
      href: "/shop",
    },
    {
      title: "Integrated Renewable & Industrial Power Systems",
      desc: "Combining solar PV, lithium storage, hybrid inverters, and EV charging into a single coordinated electrical ecosystem for commercial enterprises.",
      image: "/Industries/Industrial.png",
      tag: "Commercial & Industrial Power",
      href: "/contact?service=integrated-power",
    },
  ],
  howToTitle: "Our Integrated Power Delivery Strategy",
  howToSubtitle:
    "Engineering dependable power continuity through connected multi-vertical technologies.",
  categoryTags: [
    "Commercial Establishments & Offices",
    "Healthcare & Education",
    "Manufacturing & Industrial Facilities",
  ],
  deploymentSteps: [
    {
      number: "01",
      title: "Electrical Infrastructure & Load Continuity Audit",
      desc: "Evaluating your total connected load, essential vs. non-essential circuits, power quality, and peak demand spikes.",
      points: [
        "Load profile mapping",
        "Transformer & switchgear audit",
        "Downtime risk analysis",
      ],
    },
    {
      number: "02",
      title: "Multi-Technology Integration Design",
      desc: "Architecting a unified solution combining inverters, lithium storage, rooftop solar, and EV infrastructure for maximum efficiency.",
      points: [
        "Inverter & battery sizing",
        "Dynamic power management",
        "Single-line engineering BOM",
      ],
    },
    {
      number: "03",
      title: "Certified Implementation & SLA Handover",
      desc: "Professional installation, rigorous electrical testing, safety sign-offs, and dedicated warranty and technical support.",
      points: [
        "Zero-interruption commissioning",
        "OEM warranty validation",
        "Lifecycle after-sales support",
      ],
    },
  ],
};

export default function PowerSolutionsPage() {
  return <ServicePageTemplate data={powerSolutionsData} />;
}