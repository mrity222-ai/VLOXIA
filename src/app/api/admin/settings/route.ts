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
