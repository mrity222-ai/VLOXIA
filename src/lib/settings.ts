import { prisma } from "@/lib/prisma";
import { encryptSecret, decryptSecret } from "@/lib/encryption";

export interface SystemSettingsData {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  smtpFrom: string;
  razorpayKeyId: string;
  razorpayKeySecret: string;
  razorpayWebhookSecret: string;
  socialLinkedin: string;
  socialInstagram: string;
  socialFacebook: string;
  socialYoutube: string;
  socialTwitter: string;
  socialWhatsapp: string;
  enableWhatsAppWidget: boolean;
  enableAiBotWidget: boolean;
  whatsappGreeting: string;
  aiBotWelcomeMsg: string;
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

  // Decrypt sensitive credentials if stored encrypted with AES-256-GCM
  const rawSmtpPass = dbSettings?.smtpPass || process.env.SMTP_PASS || "";
  const decryptedSmtpPass = decryptSecret(rawSmtpPass);

  const rawRazorpaySecret =
    dbSettings?.razorpayKeySecret || process.env.RAZORPAY_KEY_SECRET || "";
  const decryptedRazorpaySecret = decryptSecret(rawRazorpaySecret);

  const rawWebhookSecret =
    dbSettings?.razorpayWebhookSecret ||
    process.env.RAZORPAY_WEBHOOK_SECRET ||
    "";
  const decryptedWebhookSecret = decryptSecret(rawWebhookSecret);

  const smtpUser =
    dbSettings?.smtpUser ||
    process.env.SMTP_USER ||
    "info@avedatechnologies.com";

  return {
    smtpHost: dbSettings?.smtpHost || process.env.SMTP_HOST || "smtp.hostinger.com",
    smtpPort: Number(dbSettings?.smtpPort) || Number(process.env.SMTP_PORT) || 465,
    smtpUser,
    smtpPass: decryptedSmtpPass,
    smtpFrom:
      dbSettings?.smtpFrom ||
      process.env.SMTP_FROM ||
      `"VLOXIA Systems" <${smtpUser}>`,
    razorpayKeyId:
      dbSettings?.razorpayKeyId ||
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      process.env.RAZORPAY_KEY_ID ||
      "rzp_test_TwqQsNg2Z5pFSl",
    razorpayKeySecret: decryptedRazorpaySecret,
    razorpayWebhookSecret: decryptedWebhookSecret,
    socialLinkedin: dbSettings?.socialLinkedin || "",
    socialInstagram: dbSettings?.socialInstagram || "",
    socialFacebook: dbSettings?.socialFacebook || "",
    socialYoutube: dbSettings?.socialYoutube || "",
    socialTwitter: dbSettings?.socialTwitter || "",
    socialWhatsapp: dbSettings?.socialWhatsapp || "+918178810456",
    enableWhatsAppWidget:
      dbSettings?.enableWhatsAppWidget !== undefined && dbSettings?.enableWhatsAppWidget !== null
        ? Boolean(dbSettings.enableWhatsAppWidget)
        : true,
    enableAiBotWidget:
      dbSettings?.enableAiBotWidget !== undefined && dbSettings?.enableAiBotWidget !== null
        ? Boolean(dbSettings.enableAiBotWidget)
        : true,
    whatsappGreeting:
      dbSettings?.whatsappGreeting ||
      "Hi VLOXIA Team, I would like to inquire about clean energy solutions.",
    aiBotWelcomeMsg:
      dbSettings?.aiBotWelcomeMsg ||
      "Hello! I am VLOXIA's AI Energy Assistant. How can I assist you with Solar, EV Charging, or Batteries today?",
  };
}

export async function updateSystemSettings(
  data: Partial<SystemSettingsData>
): Promise<any> {
  const payload: any = {};
  if (data.smtpHost !== undefined) payload.smtpHost = data.smtpHost.trim();
  if (data.smtpPort !== undefined) payload.smtpPort = Number(data.smtpPort);
  if (data.smtpUser !== undefined) payload.smtpUser = data.smtpUser.trim();

  // Encrypt SMTP password at rest using AES-256-GCM
  if (data.smtpPass !== undefined && data.smtpPass !== "••••••••") {
    payload.smtpPass = encryptSecret(data.smtpPass.trim());
  }

  if (data.smtpFrom !== undefined) payload.smtpFrom = data.smtpFrom.trim();
  if (data.razorpayKeyId !== undefined)
    payload.razorpayKeyId = data.razorpayKeyId.trim();

  // Encrypt Razorpay Secret at rest using AES-256-GCM
  if (
    data.razorpayKeySecret !== undefined &&
    data.razorpayKeySecret !== "••••••••"
  ) {
    payload.razorpayKeySecret = encryptSecret(data.razorpayKeySecret.trim());
  }

  // Encrypt Webhook Secret at rest using AES-256-GCM
  if (
    data.razorpayWebhookSecret !== undefined &&
    data.razorpayWebhookSecret !== "••••••••"
  ) {
    payload.razorpayWebhookSecret = encryptSecret(
      data.razorpayWebhookSecret.trim()
    );
  }

  // Social Media Links
  if (data.socialLinkedin !== undefined) payload.socialLinkedin = data.socialLinkedin.trim();
  if (data.socialInstagram !== undefined) payload.socialInstagram = data.socialInstagram.trim();
  if (data.socialFacebook !== undefined) payload.socialFacebook = data.socialFacebook.trim();
  if (data.socialYoutube !== undefined) payload.socialYoutube = data.socialYoutube.trim();
  if (data.socialTwitter !== undefined) payload.socialTwitter = data.socialTwitter.trim();
  if (data.socialWhatsapp !== undefined) payload.socialWhatsapp = data.socialWhatsapp.trim();

  // Floating Widgets & AI Bot Controls
  if (data.enableWhatsAppWidget !== undefined)
    payload.enableWhatsAppWidget = Boolean(data.enableWhatsAppWidget);
  if (data.enableAiBotWidget !== undefined)
    payload.enableAiBotWidget = Boolean(data.enableAiBotWidget);
  if (data.whatsappGreeting !== undefined)
    payload.whatsappGreeting = data.whatsappGreeting.trim();
  if (data.aiBotWelcomeMsg !== undefined)
    payload.aiBotWelcomeMsg = data.aiBotWelcomeMsg.trim();

  return await prisma.systemSetting.upsert({
    where: { id: "global_config" },
    update: payload,
    create: {
      id: "global_config",
      ...payload,
    },
  });
}
