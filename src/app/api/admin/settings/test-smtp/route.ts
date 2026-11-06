import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { sendTestEmail } from "@/lib/mailer";
import { getSystemSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const settings = await getSystemSettings();

    const targetEmail = body.testEmail?.trim() || session.email;
    if (!targetEmail) {
      return NextResponse.json(
        { error: "Target recipient email is required" },
        { status: 400 }
      );
    }

    const config = {
      smtpHost: body.smtpHost?.trim() || settings.smtpHost,
      smtpPort: Number(body.smtpPort) || settings.smtpPort,
      smtpUser: body.smtpUser?.trim() || settings.smtpUser,
      smtpPass:
        body.smtpPass && body.smtpPass !== "••••••••"
          ? body.smtpPass
          : settings.smtpPass,
      smtpFrom: body.smtpFrom?.trim() || settings.smtpFrom,
    };

    if (!config.smtpUser || !config.smtpPass) {
      return NextResponse.json(
        {
          error:
            "Please provide both SMTP Username (Email) and SMTP Password before testing.",
        },
        { status: 400 }
      );
    }

    await sendTestEmail(targetEmail, config);

    return NextResponse.json({
      success: true,
      message: `Test email sent successfully to ${targetEmail}! Check inbox or spam folder.`,
    });
  } catch (error: any) {
    console.error("Test SMTP error:", error);
    return NextResponse.json(
      {
        error:
          error?.message ||
          "SMTP Connection failed. Verify host, port, user and app password.",
      },
      { status: 500 }
    );
  }
}
