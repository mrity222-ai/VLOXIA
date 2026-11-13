const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

// Load .env if present
const envFile = path.resolve(__dirname, "../.env");
if (fs.existsSync(envFile)) {
  const envContent = fs.readFileSync(envFile, "utf8");
  envContent.split(/\r?\n/).forEach((line) => {
    line = line.trim();
    if (line && !line.startsWith("#")) {
      const idx = line.indexOf("=");
      if (idx > 0) {
        const key = line.slice(0, idx).trim();
        let val = line.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[key] = val;
      }
    }
  });
}

// Fallback to PostgreSQL Unix Socket URL if on Linux
let dbUrl = process.env.DATABASE_URL;
if (!dbUrl || dbUrl.includes("dev.db") || dbUrl.startsWith("file:")) {
  if (process.platform !== "win32") {
    dbUrl = "postgresql://avedatech_vloxia_user:Jaymatadi%40121@localhost/avedatech_vloxia?host=/var/run/postgresql&schema=public";
  }
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
});

async function run() {
  console.log("Using Database URL:", dbUrl ? dbUrl.replace(/:[^:@]+@/, ":****@") : "none");

  const queries = [
    // 1. AdminUser missing columns
    `ALTER TABLE "AdminUser" ADD COLUMN IF NOT EXISTS "resetOtp" TEXT;`,
    `ALTER TABLE "AdminUser" ADD COLUMN IF NOT EXISTS "otpExpiresAt" TIMESTAMP(3);`,
    `ALTER TABLE "AdminUser" ADD COLUMN IF NOT EXISTS "resetToken" TEXT;`,
    `ALTER TABLE "AdminUser" ADD COLUMN IF NOT EXISTS "resetTokenExpiresAt" TIMESTAMP(3);`,

    // 2. Product missing columns
    `ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "imagesJson" TEXT DEFAULT '[]';`,

    // 3. ShopBanner table
    `CREATE TABLE IF NOT EXISTS "ShopBanner" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "title" TEXT NOT NULL,
      "subtitle" TEXT,
      "ctaText" TEXT NOT NULL DEFAULT 'Explore the Collections',
      "ctaLink" TEXT NOT NULL DEFAULT '#catalog-grid',
      "badge" TEXT,
      "imageUrl" TEXT NOT NULL,
      "sortOrder" INTEGER NOT NULL DEFAULT 0,
      "isActive" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,

    // 4. Category table
    `CREATE TABLE IF NOT EXISTS "Category" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "slug" TEXT NOT NULL UNIQUE,
      "imageUrl" TEXT NOT NULL,
      "description" TEXT,
      "sortOrder" INTEGER NOT NULL DEFAULT 0,
      "isActive" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,

    // 5. SystemSetting table
    `CREATE TABLE IF NOT EXISTS "SystemSetting" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "smtpHost" TEXT DEFAULT 'smtp.gmail.com',
      "smtpPort" INTEGER DEFAULT 587,
      "smtpUser" TEXT,
      "smtpPass" TEXT,
      "smtpFrom" TEXT,
      "razorpayKeyId" TEXT,
      "razorpayKeySecret" TEXT,
      "razorpayWebhookSecret" TEXT,
      "socialLinkedin" TEXT DEFAULT '',
      "socialInstagram" TEXT DEFAULT '',
      "socialFacebook" TEXT DEFAULT '',
      "socialYoutube" TEXT DEFAULT '',
      "socialTwitter" TEXT DEFAULT '',
      "socialWhatsapp" TEXT DEFAULT '',
      "enableWhatsAppWidget" BOOLEAN DEFAULT true,
      "enableAiBotWidget" BOOLEAN DEFAULT true,
      "whatsappGreeting" TEXT DEFAULT 'Hi VLOXIA Team, I would like to inquire about clean energy solutions.',
      "aiBotWelcomeMsg" TEXT DEFAULT 'Hello! I am VLOXIA''s AI Energy Assistant. How can I assist you with Solar, EV Charging, or Batteries today?',
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,
  ];

  for (const q of queries) {
    try {
      await prisma.$executeRawUnsafe(q);
      console.log("✓ Executed:", q.split("\n")[0].trim().slice(0, 60) + "...");
    } catch (err) {
      console.warn("Notice for query:", err.message);
    }
  }

  console.log("All columns & tables successfully synchronized!");
  await prisma.$disconnect();
}

run().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
