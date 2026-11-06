import { NextResponse } from "next/server";
import { getAdminSession, signAdminToken, setAdminSessionCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function PUT(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, email, currentPassword, newPassword } = await req.json();

    const admin = await prisma.adminUser.findUnique({
      where: { id: session.id },
    });

    if (!admin) {
      return NextResponse.json({ error: "Admin account not found" }, { status: 404 });
    }

    const updates: any = {};

    // 1. Update Name
    if (name && name.trim()) {
      updates.name = name.trim();
    }

    // 2. Update Email / User ID
    if (email && email.trim() && email.trim().toLowerCase() !== admin.email) {
      const normalizedEmail = email.trim().toLowerCase();
      // Check duplicate
      const existing = await prisma.adminUser.findUnique({
        where: { email: normalizedEmail },
      });
      if (existing && existing.id !== admin.id) {
        return NextResponse.json(
          { error: "Another administrator account is already using this email." },
          { status: 400 }
        );
      }
      updates.email = normalizedEmail;
    }

    // 3. Update Password
    if (newPassword && newPassword.trim()) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: "Current password is required to set a new password." },
          { status: 400 }
        );
      }

      const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);
      if (!isMatch) {
        return NextResponse.json(
          { error: "Current password is incorrect." },
          { status: 400 }
        );
      }

      if (newPassword.trim().length < 6) {
        return NextResponse.json(
          { error: "New password must be at least 6 characters long." },
          { status: 400 }
        );
      }

      updates.passwordHash = await bcrypt.hash(newPassword.trim(), 10);
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ message: "No changes submitted" });
    }

    const updatedAdmin = await prisma.adminUser.update({
      where: { id: admin.id },
      data: updates,
    });

    // Refresh JWT session cookie
    const token = signAdminToken({
      id: updatedAdmin.id,
      email: updatedAdmin.email,
      name: updatedAdmin.name,
      role: updatedAdmin.role,
    });
    await setAdminSessionCookie(token);

    return NextResponse.json({
      success: true,
      message: "Admin profile updated successfully!",
      admin: {
        id: updatedAdmin.id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        role: updatedAdmin.role,
      },
    });
  } catch (error: any) {
    console.error("Admin Profile Update Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update profile" },
      { status: 500 }
    );
  }
}
