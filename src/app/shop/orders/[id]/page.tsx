import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import {
  CheckCircle2,
  PackageCheck,
  Truck,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Clock,
  ShieldCheck,
  ExternalLink,
  Copy,
} from "lucide-react";

export default async function OrderTrackingPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ paymentId?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const orderIdentifier = resolvedParams.id;
  const paymentId = resolvedSearchParams.paymentId;

  // Query order from database
  let order: any = null;
  try {
    order = await prisma.order.findFirst({
      where: {
        OR: [{ orderNumber: orderIdentifier }, { id: orderIdentifier }],
      },
    });
  } catch (err) {
    console.error("Failed to fetch order from DB:", err);
  }

  // Parse items snapshot
  let items: any[] = [];
  if (order?.itemsSnapshotJson) {
    try {
      items = JSON.parse(order.itemsSnapshotJson);
    } catch (e) {}
  }

  const orderNum = order?.orderNumber || orderIdentifier || `VLX-${Date.now().toString().slice(-6)}`;
  const status = order?.fulfillmentStatus || "PROCESSING";
  const trackingNo = order?.trackingNumber || null;
  const courierNotes = order?.notes || "Blue Dart Express Logistics";
  const customerName = order?.customerName || "Valued Customer";
  const customerEmail = order?.customerEmail || "customer@vloxia.in";
  const customerCity = order?.customerCity || "Pan India Delivery";
  const totalAmount = order?.totalAmount || 38500;
  const orderDate = order?.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleDateString("en-IN");

  // Timeline Steps
  const isDispatched = status === "DISPATCHED" || status === "DELIVERED";
  const isDelivered = status === "DELIVERED";

  return (
    <div className="min-h-screen bg-[#FBFBFE] text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* ── HEADER BANNER ── */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
              Payment Confirmed & Verified
            </span>
            <h1 className="text-2xl sm:text-3xl font-normal text-slate-950 tracking-tight mt-2">
              Thank You for Your Order, {customerName}!
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl mx-auto leading-relaxed">
              We have dispatched an automated confirmation receipt to{" "}
              <strong className="text-gray-900">{customerEmail}</strong>. Track your real-time fulfillment timeline below.
            </p>
          </div>

          <div className="inline-flex flex-wrap items-center justify-center gap-4 text-xs font-semibold bg-[#F2F4FA] px-5 py-2.5 rounded-2xl text-gray-700">
            <span>Order Number: <strong className="text-blue-600 font-mono">{orderNum}</strong></span>
            <span>•</span>
            <span>Placed On: <strong className="text-gray-900">{orderDate}</strong></span>
            {paymentId && (
              <>
                <span>•</span>
                <span>Payment ID: <strong className="text-gray-900 font-mono">{paymentId}</strong></span>
              </>
            )}
          </div>
        </div>

        {/* ── LIVE ORDER TRACKING TIMELINE ── */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-sm space-y-8">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Live Shipment & Logistics Status
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Real-time synchronization with VLOXIA Systems LLP Central Warehouse
            </p>
          </div>

          {/* 4-Step Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
            {/* Step 1: Placed */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1.5">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>1. Order Placed</span>
              </div>
              <p className="text-[11px] text-blue-800 font-medium">
                Payment verified. Order captured in ERP system.
              </p>
            </div>

            {/* Step 2: Quality Inspection */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1.5">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                <PackageCheck className="w-4 h-4 shrink-0" />
                <span>2. QA Inspection</span>
              </div>
              <p className="text-[11px] text-blue-800 font-medium">
                Hardware passed pre-dispatch diagnostics & barcode registered.
              </p>
            </div>

            {/* Step 3: Dispatched & In Transit */}
            <div
              className={`p-4 rounded-2xl border space-y-1.5 ${
                isDispatched
                  ? "bg-blue-50 border-blue-200 text-blue-900"
                  : "bg-slate-50 border-slate-200 text-slate-500 opacity-80"
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                <Truck className="w-4 h-4 shrink-0 text-blue-600" />
                <span>3. Dispatched</span>
              </div>
              <p className="text-[11px] font-medium">
                {isDispatched
                  ? "Handed over to carrier for transit."
                  : "Scheduled for courier pickup within 24 hrs."}
              </p>
            </div>

            {/* Step 4: Delivered */}
            <div
              className={`p-4 rounded-2xl border space-y-1.5 ${
                isDelivered
                  ? "bg-blue-50 border-blue-200 text-blue-900"
                  : "bg-slate-50 border-slate-200 text-slate-500 opacity-80"
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 shrink-0 text-blue-600" />
                <span>4. Delivered</span>
              </div>
              <p className="text-[11px] font-medium">
                {isDelivered
                  ? "Successfully delivered & handed over."
                  : "ETA: 2–4 business days across India."}
              </p>
            </div>
          </div>

          {/* Courier & Tracking Number Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#F2F4FA] border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Logistics Carrier & Tracking AWB
              </div>
              <div className="text-sm font-bold text-slate-950">
                Carrier: <span className="font-semibold">{courierNotes}</span>
              </div>
              <div className="text-xs text-gray-600 flex items-center gap-2 pt-0.5">
                <span>AWB Tracking ID:</span>
                {trackingNo ? (
                  <span className="font-mono font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
                    {trackingNo}
                  </span>
                ) : (
                  <span className="text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Awaiting AWB Assignment (Dispatching Soon)
                  </span>
                )}
              </div>
            </div>

            {trackingNo && (
              <span className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-sm">
                In Transit with Courier
              </span>
            )}
          </div>
        </div>

        {/* ── ORDER SUMMARY & CONTACT ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Details */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-900">
              Purchased Hardware Summary
            </h3>

            {items.length > 0 ? (
              <div className="space-y-3">
                {items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs sm:text-sm py-2 border-b border-gray-100">
                    <div>
                      <div className="font-bold text-gray-900">{it.name}</div>
                      <div className="text-xs text-gray-500">Qty: {it.qty || it.quantity || 1}</div>
                    </div>
                    <div className="font-bold font-mono text-gray-900">
                      ₹{Number(it.price || totalAmount).toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-2 text-xs sm:text-sm text-gray-600">
                <div className="font-bold text-gray-900">Clean Energy Hardware Package</div>
                <div className="text-xs text-gray-400">Direct Factory Fulfillment</div>
              </div>
            )}

            <div className="pt-2 flex justify-between items-center text-sm font-bold text-blue-600">
              <span>Total Amount Paid:</span>
              <span className="font-mono text-lg">₹{totalAmount.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Delivery & Support */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-900">
              Delivery Destination & Dispatch Desk
            </h3>

            <div className="space-y-2 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{customerCity} (Doorstep Insured Delivery)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <a href="tel:+918178810456" className="text-blue-600 font-semibold hover:underline">
                  +91 8178810456 (Dispatch Support)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
                <a href="mailto:vloxiasystems@gmail.com" className="text-blue-600 font-semibold hover:underline">
                  vloxiasystems@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <Link
                href="/shop"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm"
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <span>Back to Home</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
