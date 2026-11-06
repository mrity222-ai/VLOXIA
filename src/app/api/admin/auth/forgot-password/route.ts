import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/mailer";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const admin = await prisma.adminUser.findUnique({
      where: { email: normalizedEmail },
    });

    if (!admin) {
      // Return helpful message
      return NextResponse.json(
        { error: "No administrator found with this email address." },
        { status: 404 }
      );
    }

    // Generate secure 64-character hexadecimal token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour validity

    await prisma.adminUser.update({
      where: { id: admin.id },
      data: {
        resetToken,
        resetTokenExpiresAt: expiresAt,
      },
    });

    // Determine host origin for link
    let origin = req.headers.get("origin") || req.headers.get("referer");
    if (!origin) {
      const host = req.headers.get("host");
      const proto = host?.includes("localhost") ? "http" : "https";
      origin = `${proto}://${host || "vloxia.in"}`;
    }
    // Clean trailing slash
    origin = origin.replace(/\/$/, "");

    const resetLink = `${origin}/admin/reset-password?token=${resetToken}&email=${encodeURIComponent(
      admin.email
    )}`;

    const mailResult = await sendPasswordResetEmail(
      admin.email,
      resetLink,
      admin.name
    );

    return NextResponse.json({
      success: true,
      message: mailResult.simulated
        ? `Reset link generated (Simulation mode)`
        : `Password reset link has been sent to ${admin.email}.`,
      simulated: mailResult.simulated,
      simulatedLink: mailResult.simulated ? resetLink : undefined,
    });
  } catch (error: any) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
