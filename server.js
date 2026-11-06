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

// 2. Guarantee PostgreSQL socket database URL if not set
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL =
    "postgresql://avedatech_vloxia_user:Jaymatadi%40121@localhost/avedatech_vloxia?host=/var/run/postgresql&schema=public";
}
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET =
    "vloxia_ultra_secure_jwt_secret_key_2026_clean_energy_systems_llp";
}

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, dir: __dirname, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> VLOXIA Next.js App Ready on http://${hostname}:${port}`);
    });
});
