import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signAdminToken, setAdminSessionCookie } from "@/lib/auth";
import { sendOtpEmail } from "@/lib/mailer";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { email, password, otp, requireOtp } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    let admin;
    try {
      admin = await prisma.adminUser.findUnique({
        where: { email: email.toLowerCase().trim() },
      });
    } catch (dbErr: any) {
      if (dbErr?.message?.includes("resetToken") || dbErr?.message?.includes("column")) {
        // Automatically add missing columns in PostgreSQL on the fly
        try {
          await prisma.$executeRawUnsafe(`ALTER TABLE "AdminUser" ADD COLUMN IF NOT EXISTS "resetOtp" TEXT;`);
          await prisma.$executeRawUnsafe(`ALTER TABLE "AdminUser" ADD COLUMN IF NOT EXISTS "otpExpiresAt" TIMESTAMP(3);`);
          await prisma.$executeRawUnsafe(`ALTER TABLE "AdminUser" ADD COLUMN IF NOT EXISTS "resetToken" TEXT;`);
          await prisma.$executeRawUnsafe(`ALTER TABLE "AdminUser" ADD COLUMN IF NOT EXISTS "resetTokenExpiresAt" TIMESTAMP(3);`);
          await prisma.$executeRawUnsafe(`ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "imagesJson" TEXT DEFAULT '[]';`);
        } catch {
          // Ignore if already added
        }
        admin = await prisma.adminUser.findUnique({
          where: { email: email.toLowerCase().trim() },
        });
      } else {
        throw dbErr;
      }
    }

    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Phase A: Password check + Dispatch SMTP OTP
    if (!otp) {
      const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
      if (!isPasswordValid) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      // If requireOtp is enabled, generate and send 6-digit OTP via SMTP
      if (requireOtp) {
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        await prisma.adminUser.update({
          where: { id: admin.id },
          data: {
            resetOtp: generatedOtp,
            otpExpiresAt: expiresAt,
          },
        });

        const mailResult = await sendOtpEmail(admin.email, generatedOtp, admin.name);

        return NextResponse.json({
          step: "OTP_REQUIRED",
          message: mailResult.simulated
            ? `OTP generated (Simulation mode: ${generatedOtp})`
            : "OTP sent to your registered email via SMTP",
          email: admin.email,
          simulated: mailResult.simulated,
          simulatedOtp: mailResult.simulated ? generatedOtp : undefined,
        });
      }

      // Direct login if 2FA is skipped
      const token = signAdminToken({
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      });

      await setAdminSessionCookie(token);

      return NextResponse.json({
        success: true,
        message: "Login successful",
        admin: { name: admin.name, email: admin.email, role: admin.role },
      });
    }

    // Phase B: Verify OTP
    if (admin.resetOtp !== otp) {
      return NextResponse.json({ error: "Invalid or expired verification code" }, { status: 400 });
    }

    if (admin.otpExpiresAt && new Date() > admin.otpExpiresAt) {
      return NextResponse.json({ error: "Verification code has expired. Request a new one." }, { status: 400 });
    }

    // Clear OTP after successful verification
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { resetOtp: null, otpExpiresAt: null },
    });

    const token = signAdminToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    await setAdminSessionCookie(token);

    return NextResponse.json({
      success: true,
      message: "Authentication successful",
      admin: { name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error: any) {
    console.error("Admin Login Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
