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

// 2. Guarantee production mode on cPanel (prevents memory exhaustion)
process.env.NODE_ENV = "production";

// 3. Guarantee PostgreSQL socket database URL in cPanel production if unset or local sqlite
if (
  !process.env.DATABASE_URL ||
  process.env.DATABASE_URL.includes("dev.db") ||
  process.env.DATABASE_URL.startsWith("file:")
) {
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

// On cPanel / Phusion Passenger, dev must always be false
const dev = false;
const hostname = process.env.HOSTNAME || "0.0.0.0";

// Support both numeric TCP ports and Unix domain sockets passed by Phusion Passenger
const rawPort = process.env.PORT || "3000";
const isNumericPort = !isNaN(Number(rawPort));
const port = isNumericPort ? parseInt(rawPort, 10) : rawPort;

const app = next({ dev, dir: __dirname, hostname: isNumericPort ? hostname : undefined, port: isNumericPort ? port : undefined });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Error occurred handling", req.url, err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    });

    server.once("error", (err) => {
      console.error("Server listener error:", err);
      process.exit(1);
    });

    if (isNumericPort) {
      server.listen(port, hostname, () => {
        console.log(`> VLOXIA Next.js App Ready on http://${hostname}:${port}`);
      });
    } else {
      // Phusion Passenger Unix socket mode
      server.listen(port, () => {
        console.log(`> VLOXIA Next.js App Ready on socket ${port}`);
      });
    }
  })
  .catch((err) => {
    console.error("CRITICAL: Next.js failed to prepare production build:", err);
    process.exit(1);
  });
