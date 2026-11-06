-- ==========================================
-- VLOXIA Complete Database Schema & Seed Data
-- PostgreSQL Production Setup
-- ==========================================

-- 1. Create Tables
CREATE TABLE IF NOT EXISTS "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "resetOtp" TEXT,
    "otpExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "categoryLabel" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "originalPrice" DOUBLE PRECISION,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
    "reviewsCount" INTEGER NOT NULL DEFAULT 0,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "stockQuantity" INTEGER NOT NULL DEFAULT 10,
    "warranty" TEXT NOT NULL,
    "specsJson" TEXT NOT NULL DEFAULT '{}',
    "highlightsJson" TEXT NOT NULL DEFAULT '[]',
    "image" TEXT NOT NULL,
    "imagesJson" TEXT NOT NULL DEFAULT '[]',
    "badge" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Order" (
    "id" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "razorpayOrderId" TEXT,
    "razorpayPaymentId" TEXT,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerEmail" TEXT,
    "customerCity" TEXT,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "paymentStatus" TEXT NOT NULL DEFAULT 'PAID',
    "fulfillmentStatus" TEXT NOT NULL DEFAULT 'PROCESSING',
    "itemsSnapshotJson" TEXT NOT NULL DEFAULT '[]',
    "trackingNumber" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Inquiry" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'GENERAL',
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "solution" TEXT,
    "customerType" TEXT,
    "city" TEXT,
    "companyName" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Service" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT NOT NULL,
    "pointsJson" TEXT NOT NULL DEFAULT '[]',
    "icon" TEXT,
    "bannerImage" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ClientLogo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "websiteUrl" TEXT,
    "category" TEXT NOT NULL DEFAULT 'TECHNOLOGY_PARTNER',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ClientLogo_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ShopBanner" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "ctaText" TEXT NOT NULL DEFAULT 'Explore the Collections',
    "ctaLink" TEXT NOT NULL DEFAULT '#catalog-grid',
    "badge" TEXT,
    "imageUrl" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ShopBanner_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- 2. Create Unique Indexes
CREATE UNIQUE INDEX IF NOT EXISTS "AdminUser_email_key" ON "AdminUser"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "Product_slug_key" ON "Product"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "Order_orderNumber_key" ON "Order"("orderNumber");
CREATE UNIQUE INDEX IF NOT EXISTS "Service_slug_key" ON "Service"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "Category_slug_key" ON "Category"("slug");

-- 3. Super Admin User (admin@vloxia.in / Admin@Vloxia2026)
INSERT INTO "AdminUser" ("id", "email", "name", "passwordHash", "role", "createdAt", "updatedAt")
VALUES (
  'admin_vloxia_001',
  'admin@vloxia.in',
  'VLOXIA Administrator',
  '$2b$10$DQG4iU9I7TxVTc11sDofYuu9SR9aBZeC473vJIipea.EOSnsqKGFK',
  'SUPER_ADMIN',
  NOW(),
  NOW()
)
ON CONFLICT ("email") DO UPDATE SET "passwordHash" = EXCLUDED."passwordHash";

INSERT INTO "Product" ("id", "name", "slug", "tagline", "category", "categoryLabel", "price", "originalPrice", "rating", "reviewsCount", "inStock", "stockQuantity", "warranty", "specsJson", "highlightsJson", "image", "imagesJson", "badge", "isPublished", "isFeatured", "createdAt", "updatedAt")
VALUES (
  'ev-home-7kw',
  'VLOXIA Smart Home Wallbox 7.4 kW',
  'ev-home-7kw',
  'Intelligent residential AC fast charger with app & RFID access',
  'ev-charging',
  'EV Charging',
  38500,
  45000,
  4.9,
  38,
  true,
  10,
  '3 Years Comprehensive Warranty',
  '{"Power Output":"7.4 kW (Single Phase)","Connector Type":"Type 2 Gun (IEC 62196)","Cable Length":"5 Metres Heavy-duty","Protection":"IP65 Weatherproof & IK10","Connectivity":"Wi-Fi, Bluetooth & RFID"}',
  '["Overnight full charge for 4-wheelers in 5-7 hours","Mobile app scheduling & energy consumption tracking","Inbuilt dynamic load balancing & surge protection","Compatible with Tata Nexon, Tiago, MG ZS EV, Mahindra XUV400 & all Type-2 EVs"]',
  'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
  '[]',
  'Best Seller',
  true,
  true,
  NOW(),
  NOW()
)
ON CONFLICT ("slug") DO NOTHING;
INSERT INTO "Product" ("id", "name", "slug", "tagline", "category", "categoryLabel", "price", "originalPrice", "rating", "reviewsCount", "inStock", "stockQuantity", "warranty", "specsJson", "highlightsJson", "image", "imagesJson", "badge", "isPublished", "isFeatured", "createdAt", "updatedAt")
VALUES (
  'ev-comm-22kw',
  'VLOXIA Commercial Dual-Gun AC Charger 22 kW',
  'ev-comm-22kw',
  'Heavy-duty commercial charging station for fleets, offices & malls',
  'ev-charging',
  'EV Charging',
  85000,
  98000,
  4.8,
  19,
  true,
  10,
  '3 Years Warranty + AMC Support',
  '{"Power Output":"22 kW (3-Phase 32A per gun)","Guns":"Dual Type 2 Fast Charging Ports","Protocol":"OCPP 1.6J Open Protocol","Billing":"CMS Integrated / UPI QR Billing Ready","Enclosure":"Corrosion-resistant Metallic IP54"}',
  '["Charge two electric vehicles simultaneously at high speed","Centralised cloud management with remote firmware updates","Automated revenue collection with billing software","Ideal for hotels, hospitals, tech parks and public hubs"]',
  'https://images.unsplash.com/photo-1558441719-8b459c86f6c0?auto=format&fit=crop&w=800&q=80',
  '[]',
  'Commercial Grade',
  true,
  true,
  NOW(),
  NOW()
)
ON CONFLICT ("slug") DO NOTHING;
INSERT INTO "Product" ("id", "name", "slug", "tagline", "category", "categoryLabel", "price", "originalPrice", "rating", "reviewsCount", "inStock", "stockQuantity", "warranty", "specsJson", "highlightsJson", "image", "imagesJson", "badge", "isPublished", "isFeatured", "createdAt", "updatedAt")
VALUES (
  'ev-dc-30kw',
  'VLOXIA Ultra DC Fast Charger 30 kW',
  'ev-dc-30kw',
  'Rapid DC charging unit for commercial hubs and fleet corridors',
  'ev-charging',
  'EV Charging',
  345000,
  380000,
  5,
  12,
  true,
  10,
  '2 Years OEM Warranty',
  '{"Output Capacity":"30 kW Direct DC Fast Charge","Connector":"Single CCS2 Liquid/Air-cooled Connector","Efficiency":"> 95% High Efficiency Conversion","Display":"7-inch Touchscreen Interactive HMI","Network":"4G / Ethernet / Wi-Fi Cloud Sync"}',
  '["0 to 80% charge in 40–55 minutes depending on battery size","Emergency stop button & multi-layer isolation safety","Complete compliance with ARAI & CEA regulations","Engineered for heavy-duty fleet turnaround cycles"]',
  'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
  '[]',
  'DC Rapid',
  true,
  true,
  NOW(),
  NOW()
)
ON CONFLICT ("slug") DO NOTHING;
INSERT INTO "Product" ("id", "name", "slug", "tagline", "category", "categoryLabel", "price", "originalPrice", "rating", "reviewsCount", "inStock", "stockQuantity", "warranty", "specsJson", "highlightsJson", "image", "imagesJson", "badge", "isPublished", "isFeatured", "createdAt", "updatedAt")
VALUES (
  'batt-lifepo4-5kwh',
  'VLOXIA Wall-Mount LiFePO4 Energy Pack 5.12 kWh',
  'batt-lifepo4-5kwh',
  'Ultra-long life lithium battery system with smart BMS for homes and offices',
  'battery-storage',
  'Lithium Storage',
  115000,
  130000,
  4.9,
  44,
  true,
  10,
  '10 Years Lifespan / 5 Years Replacement',
  '{"Nominal Voltage":"51.2 V","Rated Capacity":"100 Ah (5.12 kWh Total)","Cycle Life":"6,000+ Cycles @ 80% DoD","BMS":"Built-in Smart Active Equalizer BMS","Form Factor":"Ultra-slim Wall Mount / Rack Mount"}',
  '["Zero maintenance, 100% safe Grade-A LiFePO4 chemistry","Direct drop-in replacement for bulky lead-acid inverter batteries","Parallel expandable up to 16 units (over 80 kWh)","High thermal stability & built-in short circuit protection"]',
  'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=800&q=80',
  '[]',
  'Popular',
  true,
  true,
  NOW(),
  NOW()
)
ON CONFLICT ("slug") DO NOTHING;
INSERT INTO "Product" ("id", "name", "slug", "tagline", "category", "categoryLabel", "price", "originalPrice", "rating", "reviewsCount", "inStock", "stockQuantity", "warranty", "specsJson", "highlightsJson", "image", "imagesJson", "badge", "isPublished", "isFeatured", "createdAt", "updatedAt")
VALUES (
  'batt-lifepo4-2kwh',
  'VLOXIA Compact LiFePO4 Battery 2.56 kWh',
  'batt-lifepo4-2kwh',
  'Compact 24V lithium battery pack for modern home inverters & backup',
  'battery-storage',
  'Lithium Storage',
  58000,
  65000,
  4.8,
  27,
  true,
  10,
  '5 Years Full Warranty',
  '{"Nominal Voltage":"25.6 V","Rated Capacity":"100 Ah (2.56 kWh)","Cycle Life":"5,000+ Cycles","Weight":"approx. 22 kg (70% lighter than tubular lead-acid)","Protection":"Over-charge, over-discharge & high-temp cut-off"}',
  '["Charges 3x faster than standard lead-acid tubular batteries","No acid fumes, no water top-up, 100% safe indoor placement","Provides consistent voltage until fully discharged","Compatible with major branded 24V inverter models"]',
  'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
  '[]',
  NULL,
  true,
  true,
  NOW(),
  NOW()
)
ON CONFLICT ("slug") DO NOTHING;
INSERT INTO "Product" ("id", "name", "slug", "tagline", "category", "categoryLabel", "price", "originalPrice", "rating", "reviewsCount", "inStock", "stockQuantity", "warranty", "specsJson", "highlightsJson", "image", "imagesJson", "badge", "isPublished", "isFeatured", "createdAt", "updatedAt")
VALUES (
  'inverter-hybrid-5kw',
  'VLOXIA NextGen Hybrid Solar Inverter 5 kW',
  'inverter-hybrid-5kw',
  'All-in-one smart inverter with dual MPPT and lithium battery auto-sync',
  'power-solar',
  'Power & Solar',
  64000,
  72000,
  4.9,
  31,
  true,
  10,
  '5 Years Standard Warranty',
  '{"Continuous Rating":"5 kW Pure Sine Wave","MPPT Voltage Range":"120V – 450V DC","Max Solar Array":"6,500 Watts","Battery Support":"48V / 51.2V Lithium & Tubular","Transfer Time":"< 10ms (Zero computer reset)"}',
  '["Simultaneous solar, grid, and battery power sharing","Export to grid option with bi-directional net-metering compatibility","Wi-Fi dongle included for live smartphone monitoring","Pure sine wave output safe for sensitive electronics"]',
  'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
  '[]',
  'Smart Hybrid',
  true,
  true,
  NOW(),
  NOW()
)
ON CONFLICT ("slug") DO NOTHING;
INSERT INTO "ClientLogo" ("id", "name", "logoUrl", "websiteUrl", "category", "sortOrder", "isActive", "createdAt", "updatedAt")
VALUES ('logo_' || md5('Tata Power Solaroof'), 'Tata Power Solaroof', '/partners/tatapower.png', 'https://www.tatapower.com', 'Tier-1 Rooftop Solar & EV', 1, true, NOW(), NOW())
ON CONFLICT DO NOTHING;
INSERT INTO "ClientLogo" ("id", "name", "logoUrl", "websiteUrl", "category", "sortOrder", "isActive", "createdAt", "updatedAt")
VALUES ('logo_' || md5('Waaree Energies'), 'Waaree Energies', '/partners/waaree.png', 'https://www.waaree.com', 'India''s #1 Solar PV Modules', 2, true, NOW(), NOW())
ON CONFLICT DO NOTHING;
INSERT INTO "ClientLogo" ("id", "name", "logoUrl", "websiteUrl", "category", "sortOrder", "isActive", "createdAt", "updatedAt")
VALUES ('logo_' || md5('Emmvee Solar'), 'Emmvee Solar', '/partners/emmvee.png', 'https://www.emmvee.com', 'High-Efficiency PV Systems', 3, true, NOW(), NOW())
ON CONFLICT DO NOTHING;
INSERT INTO "ClientLogo" ("id", "name", "logoUrl", "websiteUrl", "category", "sortOrder", "isActive", "createdAt", "updatedAt")
VALUES ('logo_' || md5('Rayzon Solar'), 'Rayzon Solar', '/partners/rayzon.png', 'https://www.rayzonsolar.com', 'TOPCon & Mono PERC Panels', 4, true, NOW(), NOW())
ON CONFLICT DO NOTHING;
INSERT INTO "ClientLogo" ("id", "name", "logoUrl", "websiteUrl", "category", "sortOrder", "isActive", "createdAt", "updatedAt")
VALUES ('logo_' || md5('Websol Energy System'), 'Websol Energy System', '/partners/websol.png', 'https://www.webelsolar.com', 'PV Crystalline Cells & Modules', 5, true, NOW(), NOW())
ON CONFLICT DO NOTHING;
INSERT INTO "ClientLogo" ("id", "name", "logoUrl", "websiteUrl", "category", "sortOrder", "isActive", "createdAt", "updatedAt")
VALUES ('logo_' || md5('Havells Solar'), 'Havells Solar', '/partners/havells.svg', 'https://www.havells.com', 'Inverters & HT Switchgear', 6, true, NOW(), NOW())
ON CONFLICT DO NOTHING;
INSERT INTO "ClientLogo" ("id", "name", "logoUrl", "websiteUrl", "category", "sortOrder", "isActive", "createdAt", "updatedAt")
VALUES ('logo_' || md5('Delta Electronics'), 'Delta Electronics', '/partners/delta.svg', 'https://www.deltaelectronicsindia.com', 'EV Chargers & Power Electronics', 7, true, NOW(), NOW())
ON CONFLICT DO NOTHING;
INSERT INTO "ShopBanner" ("id", "title", "subtitle", "ctaText", "ctaLink", "badge", "imageUrl", "sortOrder", "isActive", "createdAt", "updatedAt")
VALUES ('banner_' || md5('Timeless Clean Energy,
Conscious Choices.'), 'Timeless Clean Energy,
Conscious Choices.', 'Sustainably designed, high-efficiency solar, EV charging, and storage solutions built to stand the test of time.', 'Explore the Collections', '#catalog-grid', 'VLOXIA Hardware Marketplace', 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1600&q=80', 1, true, NOW(), NOW())
ON CONFLICT DO NOTHING;
INSERT INTO "ShopBanner" ("id", "title", "subtitle", "ctaText", "ctaLink", "badge", "imageUrl", "sortOrder", "isActive", "createdAt", "updatedAt")
VALUES ('banner_' || md5('Next-Gen EV Fast Charging,
Engineered for High Uptime.'), 'Next-Gen EV Fast Charging,
Engineered for High Uptime.', 'Commercial AC Wallboxes & DC Ultra-fast corridors with cloud CMS telemetry, RFID access, and dynamic load balancing.', 'Explore Fast Chargers', '#catalog-grid', 'Commercial & Fleet Charging', 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1600&q=80', 2, true, NOW(), NOW())
ON CONFLICT DO NOTHING;
INSERT INTO "ShopBanner" ("id", "title", "subtitle", "ctaText", "ctaLink", "badge", "imageUrl", "sortOrder", "isActive", "createdAt", "updatedAt")
VALUES ('banner_' || md5('Automotive-Grade Lithium Storage,
Zero-Maintenance Reliability.'), 'Automotive-Grade Lithium Storage,
Zero-Maintenance Reliability.', '6,000+ cycle LiFePO4 battery packs with intelligent BMS balancing and smart hybrid inverters.', 'Explore Energy Storage', '#catalog-grid', 'Tier-1 Lithium BESS', 'https://images.unsplash.com/photo-1558441719-8b489c63f7d1?auto=format&fit=crop&w=1600&q=80', 3, true, NOW(), NOW())
ON CONFLICT DO NOTHING;
INSERT INTO "Category" ("id", "name", "slug", "imageUrl", "description", "sortOrder", "isActive", "createdAt", "updatedAt")
VALUES ('cat_' || 'ev-charging', 'EV Fast Chargers', 'ev-charging', 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=600&q=80', 'AC Wallboxes & DC Ultra-fast commercial chargers', 1, true, NOW(), NOW())
ON CONFLICT ("slug") DO NOTHING;
INSERT INTO "Category" ("id", "name", "slug", "imageUrl", "description", "sortOrder", "isActive", "createdAt", "updatedAt")
VALUES ('cat_' || 'power-solar', 'Solar Panels', 'power-solar', 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80', 'High-efficiency Tier-1 monocrystalline & TOPCon solar arrays', 2, true, NOW(), NOW())
ON CONFLICT ("slug") DO NOTHING;
INSERT INTO "Category" ("id", "name", "slug", "imageUrl", "description", "sortOrder", "isActive", "createdAt", "updatedAt")
VALUES ('cat_' || 'battery-storage', 'Lithium Storage', 'battery-storage', 'https://images.unsplash.com/photo-1558441719-8b489c63f7d1?auto=format&fit=crop&w=600&q=80', 'LiFePO4 modular energy storage with smart BMS', 3, true, NOW(), NOW())
ON CONFLICT ("slug") DO NOTHING;
INSERT INTO "Category" ("id", "name", "slug", "imageUrl", "description", "sortOrder", "isActive", "createdAt", "updatedAt")
VALUES ('cat_' || 'smart-inverters', 'Smart Inverters', 'smart-inverters', 'https://images.unsplash.com/photo-1548611716-ad01fbf9df24?auto=format&fit=crop&w=600&q=80', 'Hybrid dual-MPPT inverters with zero transfer latency', 4, true, NOW(), NOW())
ON CONFLICT ("slug") DO NOTHING;
INSERT INTO "Category" ("id", "name", "slug", "imageUrl", "description", "sortOrder", "isActive", "createdAt", "updatedAt")
VALUES ('cat_' || 'accessories', 'Accessories & Cables', 'accessories', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80', 'Type 2 heavy-duty guns, isolators & surge protection switchgear', 5, true, NOW(), NOW())
ON CONFLICT ("slug") DO NOTHING;
INSERT INTO "Category" ("id", "name", "slug", "imageUrl", "description", "sortOrder", "isActive", "createdAt", "updatedAt")
VALUES ('cat_' || 'commercial', 'Commercial EPC', 'commercial', 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&q=80', 'Turnkey captive solar arrays and fleet depot electrification', 6, true, NOW(), NOW())
ON CONFLICT ("slug") DO NOTHING;
