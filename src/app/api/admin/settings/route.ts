import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getSystemSettings, updateSystemSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await getSystemSettings();

    return NextResponse.json({
      success: true,
      settings: {
        smtpHost: settings.smtpHost,
        smtpPort: settings.smtpPort,
        smtpUser: settings.smtpUser,
        smtpFrom: settings.smtpFrom,
        hasSmtpPass: Boolean(settings.smtpPass),
        razorpayKeyId: settings.razorpayKeyId,
        hasRazorpayKeySecret: Boolean(settings.razorpayKeySecret),
        razorpayWebhookSecret: settings.razorpayWebhookSecret,
        socialLinkedin: settings.socialLinkedin,
        socialInstagram: settings.socialInstagram,
        socialFacebook: settings.socialFacebook,
        socialYoutube: settings.socialYoutube,
        socialTwitter: settings.socialTwitter,
        socialWhatsapp: settings.socialWhatsapp,
        enableWhatsAppWidget: settings.enableWhatsAppWidget,
        enableAiBotWidget: settings.enableAiBotWidget,
        whatsappGreeting: settings.whatsappGreeting,
        aiBotWelcomeMsg: settings.aiBotWelcomeMsg,
      },
    });
  } catch (error: any) {
    console.error("GET /api/admin/settings error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to load settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const updated = await updateSystemSettings({
      smtpHost: body.smtpHost,
      smtpPort: body.smtpPort,
      smtpUser: body.smtpUser,
      smtpPass: body.smtpPass,
      smtpFrom: body.smtpFrom,
      razorpayKeyId: body.razorpayKeyId,
      razorpayKeySecret: body.razorpayKeySecret,
      razorpayWebhookSecret: body.razorpayWebhookSecret,
      socialLinkedin: body.socialLinkedin,
      socialInstagram: body.socialInstagram,
      socialFacebook: body.socialFacebook,
      socialYoutube: body.socialYoutube,
      socialTwitter: body.socialTwitter,
      socialWhatsapp: body.socialWhatsapp,
      enableWhatsAppWidget: body.enableWhatsAppWidget,
      enableAiBotWidget: body.enableAiBotWidget,
      whatsappGreeting: body.whatsappGreeting,
      aiBotWelcomeMsg: body.aiBotWelcomeMsg,
    });

    return NextResponse.json({
      success: true,
      message: "System settings updated successfully",
      settings: {
        smtpHost: updated.smtpHost,
        smtpPort: updated.smtpPort,
        smtpUser: updated.smtpUser,
        smtpFrom: updated.smtpFrom,
        hasSmtpPass: Boolean(updated.smtpPass),
        razorpayKeyId: updated.razorpayKeyId,
        hasRazorpayKeySecret: Boolean(updated.razorpayKeySecret),
        razorpayWebhookSecret: updated.razorpayWebhookSecret,
        socialLinkedin: updated.socialLinkedin,
        socialInstagram: updated.socialInstagram,
        socialFacebook: updated.socialFacebook,
        socialYoutube: updated.socialYoutube,
        socialTwitter: updated.socialTwitter,
        socialWhatsapp: updated.socialWhatsapp,
        enableWhatsAppWidget: updated.enableWhatsAppWidget,
        enableAiBotWidget: updated.enableAiBotWidget,
        whatsappGreeting: updated.whatsappGreeting,
        aiBotWelcomeMsg: updated.aiBotWelcomeMsg,
      },
    });
  } catch (error: any) {
    console.error("POST /api/admin/settings error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to save settings" },
      { status: 500 }
    );
  }
}
