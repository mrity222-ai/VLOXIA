import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import Razorpay from "razorpay";
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

    const keyId = body.razorpayKeyId?.trim() || settings.razorpayKeyId;
    const keySecret =
      body.razorpayKeySecret && body.razorpayKeySecret !== "••••••••"
        ? body.razorpayKeySecret.trim()
        : settings.razorpayKeySecret;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Both Razorpay Key ID and Key Secret are required to test." },
        { status: 400 }
      );
    }

    if (keyId.includes("Mock") || keyId.includes("rzp_test_mock")) {
      return NextResponse.json({
        success: true,
        isMock: true,
        message: "Simulation / Mock Mode is enabled. Credentials accepted.",
      });
    }

    const rzp = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // Make a test lightweight ping to verify credentials
    const ordersList = await rzp.orders.all({ count: 1 });

    const isLive = keyId.startsWith("rzp_live");

    return NextResponse.json({
      success: true,
      isLive,
      message: `Authentication successful! Connected to Razorpay (${isLive ? "LIVE Production Mode" : "TEST Sandbox Mode"}).`,
      ordersCount: ordersList.items?.length ?? 0,
    });
  } catch (error: any) {
    console.error("Test Razorpay error:", error);
    const message =
      error?.error?.description ||
      error?.message ||
      "Invalid Razorpay Key ID or Secret.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
