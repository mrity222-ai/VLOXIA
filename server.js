const fs = require("fs");
const path = require("path");

// 1. Explicitly load .env in cPanel / Phusion Passenger environments
const envFile = path.resolve(__dirname, ".env");
if (fs.existsSync(envFile)) {
  const envContent = fs.readFileSync(envFile, "utf8");
  envContent.split(/\r?\n/).forEach((line) => {
    line = line.trim();
    if (line && !line.startsWith("#")) {
      const idx = line.indexOf("=");
      if (idx > 0) {
        const key = line.slice(0, idx).trim();
        let val = line.slice(idx + 1).trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        process.env[key] = val;
      }
    }
  });
}

// 2. Guarantee production mode in cPanel Phusion Passenger
process.env.NODE_ENV = "production";

if (
  !process.env.DATABASE_URL ||
  process.env.DATABASE_URL.includes("dev.db") ||
  process.env.DATABASE_URL.startsWith("file:")
) {
  if (process.platform !== "win32") {
    process.env.DATABASE_URL =
      "postgresql://avedatech_vloxia_user:Jaymatadi%40121@localhost/avedatech_vloxia?host=/var/run/postgresql&schema=public";
  }
}
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET =
    "vloxia_ultra_secure_jwt_secret_key_2026_clean_energy_systems_llp";
}

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = false;
const port =
  process.env.X_ZOHO_CATALYST_LISTEN_PORT || process.env.PORT || 3000;

const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        const { pathname } = parsedUrl;

        // 1. Direct high-performance static file serving from public directory
        if (
          pathname &&
          !pathname.startsWith("/_next") &&
          !pathname.startsWith("/api") &&
          pathname !== "/"
        ) {
          try {
            const sanitizedPath = path.normalize(decodeURIComponent(pathname)).replace(/^(\.\.[\/\\])+/, "");
            const publicFilePath = path.join(__dirname, "public", sanitizedPath);
            if (fs.existsSync(publicFilePath) && fs.statSync(publicFilePath).isFile()) {
              const ext = path.extname(publicFilePath).toLowerCase();
              const mimeTypes = {
                ".png": "image/png",
                ".jpg": "image/jpeg",
                ".jpeg": "image/jpeg",
                ".svg": "image/svg+xml",
                ".gif": "image/gif",
                ".webp": "image/webp",
                ".ico": "image/x-icon",
                ".css": "text/css",
                ".js": "application/javascript",
                ".woff": "font/woff",
                ".woff2": "font/woff2",
                ".ttf": "font/ttf",
              };
              const contentType = mimeTypes[ext] || "application/octet-stream";
              res.setHeader("Content-Type", contentType);
              res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
              return fs.createReadStream(publicFilePath).pipe(res);
            }
          } catch {
            // Fall through to Next.js handler
          }
        }

        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Error occurred handling", req.url, err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    })
      .once("error", (err) => {
        console.error("Server listener error:", err);
        process.exit(1);
      })
      .listen(port, () => {
        console.log(`> VLOXIA Next.js App Ready on ${port}`);

        // Async non-blocking database column verification
        if (process.platform !== "win32") {
          try {
            const { PrismaClient } = require("@prisma/client");
            const p = new PrismaClient();
            p.$executeRawUnsafe(`ALTER TABLE "AdminUser" ADD COLUMN IF NOT EXISTS "resetToken" TEXT;`).catch(() => {});
            p.$executeRawUnsafe(`ALTER TABLE "AdminUser" ADD COLUMN IF NOT EXISTS "resetOtp" TEXT;`).catch(() => {});
            p.$executeRawUnsafe(`ALTER TABLE "AdminUser" ADD COLUMN IF NOT EXISTS "otpExpiresAt" TIMESTAMP(3);`).catch(() => {});
            p.$executeRawUnsafe(`ALTER TABLE "AdminUser" ADD COLUMN IF NOT EXISTS "resetTokenExpiresAt" TIMESTAMP(3);`).catch(() => {});
            p.$executeRawUnsafe(`ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "imagesJson" TEXT DEFAULT '[]';`).catch(() => {});
          } catch {}
        }
      });
  })
  .catch((err) => {
    console.error("Fatal Next.js startup error:", err);
    process.exit(1);
  });
