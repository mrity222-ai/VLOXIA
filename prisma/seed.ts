import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PRODUCTS } from "../src/data/products";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Admin User...");

  const adminEmail = "admin@vloxia.in";
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("Admin@Vloxia2026", 10);
    await prisma.adminUser.create({
      data: {
        email: adminEmail,
        name: "VLOXIA Administrator",
        passwordHash,
        role: "SUPER_ADMIN",
      },
    });
    console.log("Created Super Admin user: admin@vloxia.in / Admin@Vloxia2026");
  } else {
    console.log("Admin user already exists.");
  }

  console.log("Seeding Products into SQLite Database...");
  for (const prod of PRODUCTS) {
    const exists = await prisma.product.findUnique({ where: { slug: prod.id } });
    if (!exists) {
      await prisma.product.create({
        data: {
          id: prod.id,
          slug: prod.id,
          name: prod.name,
          tagline: prod.tagline,
          category: prod.category,
          categoryLabel: prod.categoryLabel,
          price: prod.price,
          originalPrice: prod.originalPrice || null,
          rating: prod.rating,
          reviewsCount: prod.reviewsCount,
          inStock: prod.inStock,
          warranty: prod.warranty,
          specsJson: JSON.stringify(prod.specs),
          highlightsJson: JSON.stringify(prod.highlights),
          image: prod.image,
          badge: prod.badge || null,
          isPublished: true,
          isFeatured: true,
        },
      });
    }
  }

  console.log("Seeding Tier-1 Technology Partners & OEM Logos...");
  const PARTNER_LOGOS = [
    {
      name: "Tata Power Solaroof",
      logoUrl: "/partners/tatapower.png",
      websiteUrl: "https://www.tatapower.com",
      category: "Tier-1 Rooftop Solar & EV",
      sortOrder: 1,
      isActive: true,
    },
    {
      name: "Waaree Energies",
      logoUrl: "/partners/waaree.png",
      websiteUrl: "https://www.waaree.com",
      category: "India's #1 Solar PV Modules",
      sortOrder: 2,
      isActive: true,
    },
    {
      name: "Emmvee Solar",
      logoUrl: "/partners/emmvee.png",
      websiteUrl: "https://www.emmvee.com",
      category: "High-Efficiency PV Systems",
      sortOrder: 3,
      isActive: true,
    },
    {
      name: "Rayzon Solar",
      logoUrl: "/partners/rayzon.png",
      websiteUrl: "https://www.rayzonsolar.com",
      category: "TOPCon & Mono PERC Panels",
      sortOrder: 4,
      isActive: true,
    },
    {
      name: "Websol Energy System",
      logoUrl: "/partners/websol.png",
      websiteUrl: "https://www.webelsolar.com",
      category: "PV Crystalline Cells & Modules",
      sortOrder: 5,
      isActive: true,
    },
    {
      name: "Havells Solar",
      logoUrl: "/partners/havells.svg",
      websiteUrl: "https://www.havells.com",
      category: "Inverters & HT Switchgear",
      sortOrder: 6,
      isActive: true,
    },
    {
      name: "Delta Electronics",
      logoUrl: "/partners/delta.svg",
      websiteUrl: "https://www.deltaelectronicsindia.com",
      category: "EV Chargers & Power Electronics",
      sortOrder: 7,
      isActive: true,
    },
  ];

  for (const partner of PARTNER_LOGOS) {
    const existing = await prisma.clientLogo.findFirst({
      where: { name: partner.name },
    });
    if (!existing) {
      await prisma.clientLogo.create({ data: partner });
    }
  }

  console.log("Seeding Shop Banners (Hero Editorial Slider)...");
  const SHOP_BANNERS = [
    {
      title: "Timeless Clean Energy,\nConscious Choices.",
      subtitle: "Sustainably designed, high-efficiency solar, EV charging, and storage solutions built to stand the test of time.",
      ctaText: "Explore the Collections",
      ctaLink: "#catalog-grid",
      badge: "VLOXIA Hardware Marketplace",
      imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1600&q=80",
      sortOrder: 1,
      isActive: true,
    },
    {
      title: "Next-Gen EV Fast Charging,\nEngineered for High Uptime.",
      subtitle: "Commercial AC Wallboxes & DC Ultra-fast corridors with cloud CMS telemetry, RFID access, and dynamic load balancing.",
      ctaText: "Explore Fast Chargers",
      ctaLink: "#catalog-grid",
      badge: "Commercial & Fleet Charging",
      imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1600&q=80",
      sortOrder: 2,
      isActive: true,
    },
    {
      title: "Automotive-Grade Lithium Storage,\nZero-Maintenance Reliability.",
      subtitle: "6,000+ cycle LiFePO4 battery packs with intelligent BMS balancing and smart hybrid inverters.",
      ctaText: "Explore Energy Storage",
      ctaLink: "#catalog-grid",
      badge: "Tier-1 Lithium BESS",
      imageUrl: "https://images.unsplash.com/photo-1558441719-8b489c63f7d1?auto=format&fit=crop&w=1600&q=80",
      sortOrder: 3,
      isActive: true,
    },
  ];

  for (const banner of SHOP_BANNERS) {
    const existing = await prisma.shopBanner.findFirst({
      where: { title: banner.title },
    });
    if (!existing) {
      await prisma.shopBanner.create({ data: banner });
    }
  }

  console.log("Seeding Shop Top Categories (Visual Photo Cards)...");
  const CATEGORIES = [
    {
      name: "EV Fast Chargers",
      slug: "ev-charging",
      imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=600&q=80",
      description: "AC Wallboxes & DC Ultra-fast commercial chargers",
      sortOrder: 1,
      isActive: true,
    },
    {
      name: "Solar Panels",
      slug: "power-solar",
      imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80",
      description: "High-efficiency Tier-1 monocrystalline & TOPCon solar arrays",
      sortOrder: 2,
      isActive: true,
    },
    {
      name: "Lithium Storage",
      slug: "battery-storage",
      imageUrl: "https://images.unsplash.com/photo-1558441719-8b489c63f7d1?auto=format&fit=crop&w=600&q=80",
      description: "LiFePO4 modular energy storage with smart BMS",
      sortOrder: 3,
      isActive: true,
    },
    {
      name: "Smart Inverters",
      slug: "smart-inverters",
      imageUrl: "https://images.unsplash.com/photo-1548611716-ad01fbf9df24?auto=format&fit=crop&w=600&q=80",
      description: "Hybrid dual-MPPT inverters with zero transfer latency",
      sortOrder: 4,
      isActive: true,
    },
    {
      name: "Accessories & Cables",
      slug: "accessories",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
      description: "Type 2 heavy-duty guns, isolators & surge protection switchgear",
      sortOrder: 5,
      isActive: true,
    },
    {
      name: "Commercial EPC",
      slug: "commercial",
      imageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&q=80",
      description: "Turnkey captive solar arrays and fleet depot electrification",
      sortOrder: 6,
      isActive: true,
    },
  ];

  for (const cat of CATEGORIES) {
    const existing = await prisma.category.findUnique({
      where: { slug: cat.slug },
    });
    if (!existing) {
      await prisma.category.create({ data: cat });
    }
  }

  console.log("Seeding Demo Inquiry Leads...");
  const inquiryCount = await prisma.inquiry.count();
  if (inquiryCount === 0) {
    await prisma.inquiry.createMany({
      data: [
        {
          type: "QUOTE",
          fullName: "Rajesh Sharma",
          phone: "+91 9811223344",
          email: "rajesh.sharma@dlf.in",
          solution: "EV Charging",
          customerType: "Commercial",
          city: "Gurugram, Haryana",
          message: "Require 4 Dual-gun 22kW AC Chargers for commercial IT office parking.",
          status: "NEW",
        },
        {
          type: "PARTNER",
          fullName: "Amit Verma",
          companyName: "Verma Solar Solutions EPC",
          phone: "+91 9988776655",
          email: "amit@vermasolar.com",
          solution: "Multiple Solutions",
          customerType: "Dealer / Channel Partner",
          city: "Jaipur, Rajasthan",
          message: "Interested in becoming an authorised channel distributor for VLOXIA Lithium batteries.",
          status: "IN_REVIEW",
        },
      ],
    });
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
