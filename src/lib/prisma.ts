import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

// 1. Production connection URL for Neon Cloud PostgreSQL
const DEFAULT_POSTGRES_URL =
  "postgresql://neondb_owner:npg_Vem8kqdvp4gN@ep-floral-rain-bc1ay2eb-pooler.c-16.us-east-1.aws.neon.tech/neondb?sslmode=require";

// 2. Explicitly load .env into process.env if DATABASE_URL is missing
if (!process.env.DATABASE_URL) {
  try {
    const candidatePaths = [
      path.resolve(process.cwd(), ".env"),
      path.resolve(process.cwd(), ".env.local"),
      path.resolve(__dirname, "../../.env"),
      path.resolve(__dirname, "../../../.env"),
      "/home/avedatech/vloxia.in/.env",
    ];

    for (const p of candidatePaths) {
      if (fs.existsSync(p)) {
        const raw = fs.readFileSync(p, "utf8");
        for (let line of raw.split(/\r?\n/)) {
          line = line.trim();
          if (line && !line.startsWith("#")) {
            const eq = line.indexOf("=");
            if (eq > 0) {
              const k = line.substring(0, eq).trim();
              let v = line.substring(eq + 1).trim();
              if (
                (v.startsWith('"') && v.endsWith('"')) ||
                (v.startsWith("'") && v.endsWith("'"))
              ) {
                v = v.substring(1, v.length - 1);
              }
              if (!process.env[k]) {
                process.env[k] = v;
              }
            }
          }
        }
        if (process.env.DATABASE_URL) break;
      }
    }
  } catch {
    // Non-fatal if filesystem access fails
  }
}

// 3. Resolve active database URL (defaults directly to Neon PostgreSQL)
const activeDatabaseUrl =
  process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith("file:")
    ? process.env.DATABASE_URL
    : DEFAULT_POSTGRES_URL;

if (!process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith("file:")) {
  process.env.DATABASE_URL = activeDatabaseUrl;
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: activeDatabaseUrl,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export default prisma;
