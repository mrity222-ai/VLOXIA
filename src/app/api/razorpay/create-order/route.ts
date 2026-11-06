import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getSystemSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, customer } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid payment amount" },
        { status: 400 }
      );
    }

    const settings = await getSystemSettings();
    const keyId =
      settings.razorpayKeyId?.trim() ||
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim() ||
      "rzp_live_TgYaltSzwb0T98";
    const keySecret =
      settings.razorpayKeySecret?.trim() ||
      process.env.RAZORPAY_KEY_SECRET?.trim() ||
      "855BDzuUSmvIqoI0CfXx6cNv";

    // Razorpay requires amount in Paise (1 INR = 100 Paise)
    const amountInPaise = Math.round(amount * 100);

    let razorpayOrderId: string | null = null;
    let isMock = false;

    // Check if keys are non-mock
    const isRealKey =
      keyId &&
      keySecret &&
      !keyId.toLowerCase().includes("mock") &&
      !keyId.includes("rzp_test_mock");

    if (isRealKey) {
      try {
        const razorpay = new Razorpay({
          key_id: keyId,
          key_secret: keySecret,
        });

        const order = await razorpay.orders.create({
          amount: amountInPaise,
          currency: "INR",
          receipt: `rcpt_${Date.now()}`,
          notes: {
            customerName: customer?.name || "Customer",
            customerPhone: customer?.phone || "",
          },
        });
        razorpayOrderId = order?.id || null;
      } catch (rzpErr: any) {
        // Log warning but DO NOT fail the request.
        // Razorpay checkout.js allows opening payment modal directly with keyId & amount even without order_id!
        console.warn(
          "Razorpay server order creation warning (using direct client modal fallback):",
          rzpErr?.error?.description || rzpErr?.message || rzpErr
        );
      }
    } else {
      isMock = true;
    }

    return NextResponse.json({
      success: true,
      orderId: razorpayOrderId,
      amount: amountInPaise,
      currency: "INR",
      keyId,
      isMock,
    });
  } catch (error: any) {
    console.error("Razorpay order route error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
