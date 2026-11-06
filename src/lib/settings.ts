import { prisma } from "@/lib/prisma";

export interface SystemSettingsData {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  smtpFrom: string;
  razorpayKeyId: string;
  razorpayKeySecret: string;
  razorpayWebhookSecret: string;
}

export async function getSystemSettings(): Promise<SystemSettingsData> {
  let dbSettings: any = null;
  try {
    dbSettings = await prisma.systemSetting.findUnique({
      where: { id: "global_config" },
    });
  } catch (err) {
    console.error("Failed to fetch SystemSetting from DB:", err);
  }

  return {
    smtpHost: dbSettings?.smtpHost || process.env.SMTP_HOST || "smtp.gmail.com",
    smtpPort: Number(dbSettings?.smtpPort) || Number(process.env.SMTP_PORT) || 587,
    smtpUser: dbSettings?.smtpUser || process.env.SMTP_USER || "",
    smtpPass: dbSettings?.smtpPass || process.env.SMTP_PASS || "",
    smtpFrom:
      dbSettings?.smtpFrom ||
      process.env.SMTP_FROM ||
      `"VLOXIA Security" <${dbSettings?.smtpUser || process.env.SMTP_USER || "admin@vloxia.in"}>`,
    razorpayKeyId:
      dbSettings?.razorpayKeyId ||
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      process.env.RAZORPAY_KEY_ID ||
      "",
    razorpayKeySecret:
      dbSettings?.razorpayKeySecret || process.env.RAZORPAY_KEY_SECRET || "",
    razorpayWebhookSecret:
      dbSettings?.razorpayWebhookSecret ||
      process.env.RAZORPAY_WEBHOOK_SECRET ||
      "",
  };
}

export async function updateSystemSettings(
  data: Partial<SystemSettingsData>
): Promise<any> {
  const payload: any = {};
  if (data.smtpHost !== undefined) payload.smtpHost = data.smtpHost.trim();
  if (data.smtpPort !== undefined) payload.smtpPort = Number(data.smtpPort);
  if (data.smtpUser !== undefined) payload.smtpUser = data.smtpUser.trim();
  if (data.smtpPass !== undefined && data.smtpPass !== "••••••••") {
    payload.smtpPass = data.smtpPass;
  }
  if (data.smtpFrom !== undefined) payload.smtpFrom = data.smtpFrom.trim();
  if (data.razorpayKeyId !== undefined)
    payload.razorpayKeyId = data.razorpayKeyId.trim();
  if (
    data.razorpayKeySecret !== undefined &&
    data.razorpayKeySecret !== "••••••••"
  ) {
    payload.razorpayKeySecret = data.razorpayKeySecret.trim();
  }
  if (data.razorpayWebhookSecret !== undefined) {
    payload.razorpayWebhookSecret = data.razorpayWebhookSecret.trim();
  }

  return await prisma.systemSetting.upsert({
    where: { id: "global_config" },
    update: payload,
    create: {
      id: "global_config",
      ...payload,
    },
  });
}
