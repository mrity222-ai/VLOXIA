import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getSystemSettings } from "@/lib/settings";

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
    const keyId = settings.razorpayKeyId;
    const keySecret = settings.razorpayKeySecret;

    // Razorpay requires amount in Paise (1 INR = 100 Paise)
    const amountInPaise = Math.round(amount * 100);

    // If using mock credentials or real credentials:
    if (keyId && keySecret && !keyId.includes("Mock")) {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const options = {
        amount: amountInPaise,
        currency: "INR",
        receipt: `rcpt_${Date.now()}`,
        notes: {
          customerName: customer?.name || "Customer",
          customerPhone: customer?.phone || "",
        },
      };

      const order = await razorpay.orders.create(options);
      return NextResponse.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId,
      });
    } else {
      // Development / Mock order simulation when real test keys are not configured yet
      const mockOrderId = `order_mock_${Date.now()}`;
      return NextResponse.json({
        orderId: mockOrderId,
        amount: amountInPaise,
        currency: "INR",
        isMock: true,
        keyId: "rzp_test_mock",
      });
    }
  } catch (error: any) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
