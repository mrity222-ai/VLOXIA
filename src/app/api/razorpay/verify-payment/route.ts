import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const origin = req.headers.get("origin") || "http://localhost:3000";

    if (!keySecret || keySecret.includes("Mock")) {
      // Mock mode: Allow verification for demonstration/testing & record order
      const orderIdNumber = `VLX-${Date.now().toString().slice(-6)}`;
      const customerEmail = body.orderDetails?.customer?.email || null;
      const customerName = body.orderDetails?.customer?.name || "Customer";
      const totalAmount = Number(body.orderDetails?.total || 38500);
      const items = body.orderDetails?.items || [];

      try {
        await prisma.order.create({
          data: {
            orderNumber: orderIdNumber,
            razorpayOrderId: razorpay_order_id || `order_mock_${Date.now()}`,
            razorpayPaymentId: razorpay_payment_id || `pay_mock_${Date.now()}`,
            customerName,
            customerPhone: body.orderDetails?.customer?.phone || "+91 9800000000",
            customerEmail,
            customerCity: body.orderDetails?.customer?.city || "Delhi NCR",
            totalAmount,
            paymentStatus: "PAID",
            fulfillmentStatus: "PROCESSING",
            itemsSnapshotJson: JSON.stringify(items),
          },
        });

        // Trigger Automated Order Confirmation Email via SMTP
        if (customerEmail) {
          sendOrderConfirmationEmail({
            to: customerEmail,
            customerName,
            orderNumber: orderIdNumber,
            items,
            totalAmount,
            trackingUrl: `${origin}/shop/orders/${orderIdNumber}`,
          }).catch((e) => console.error("Email dispatch failed:", e));
        }
      } catch (dbErr) {
        console.error("Failed to persist mock order:", dbErr);
      }

      return NextResponse.json({
        success: true,
        orderNumber: orderIdNumber,
        message: "Payment successfully verified (Mock Test Environment)",
      });
    }

    // Official Razorpay Signature Verification algorithm
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      // Record completed purchase order in database
      const orderIdNumber = `VLX-${Date.now().toString().slice(-6)}`;
      const customerEmail = orderDetails?.customer?.email || null;
      const customerName = orderDetails?.customer?.name || "Customer";
      const totalAmount = Number(orderDetails?.total || 0);
      const items = orderDetails?.items || [];

      try {
        await prisma.order.create({
          data: {
            orderNumber: orderIdNumber,
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            customerName,
            customerPhone: orderDetails?.customer?.phone || "",
            customerEmail,
            customerCity: orderDetails?.customer?.city || null,
            totalAmount,
            paymentStatus: "PAID",
            fulfillmentStatus: "PROCESSING",
            itemsSnapshotJson: JSON.stringify(items),
          },
        });

        // Trigger Automated Order Confirmation Email via SMTP
        if (customerEmail) {
          sendOrderConfirmationEmail({
            to: customerEmail,
            customerName,
            orderNumber: orderIdNumber,
            items,
            totalAmount,
            trackingUrl: `${origin}/shop/orders/${orderIdNumber}`,
          }).catch((e) => console.error("Email dispatch failed:", e));
        }
      } catch (dbErr) {
        console.error("Failed to persist order to database:", dbErr);
      }

      return NextResponse.json({
        success: true,
        orderNumber: orderIdNumber,
        message: "Payment signature verified successfully",
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid payment signature" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Razorpay verification error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
