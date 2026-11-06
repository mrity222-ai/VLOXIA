import { NextResponse } from "next/server";
import { getSystemSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await getSystemSettings();
    return NextResponse.json({
      success: true,
      razorpayKeyId: settings.razorpayKeyId,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to load public settings" },
      { status: 500 }
    );
  }
}
