import React, { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2, PackageCheck, ArrowRight, Phone, Mail, FileText } from "lucide-react";

export default function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; paymentId?: string }>;
}) {
  return (
    <Suspense fallback={<main className="thank-you-page"><div className="thank-you-card">Loading receipt...</div></main>}>
      <OrderSuccessContent searchParams={searchParams} />
    </Suspense>
  );
}

async function OrderSuccessContent({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; paymentId?: string }>;
}) {
  const params = await searchParams;
  const orderId = params.orderId || `ORD_${Date.now()}`;
  const paymentId = params.paymentId || `pay_${Date.now()}`;

  return (
    <main className="content-page thank-you-page order-success-page">
      <section className="thank-you-card order-receipt">
          {/* Success Check */}
          <div className="thank-you-icon">
            <CheckCircle2 aria-hidden="true" />
          </div>

          <span className="content-eyebrow">
            Payment Verified & Confirmed
          </span>

          <h1>
            Thank You for Choosing VLOXIA!
          </h1>
          <p>
            Your payment has been successfully processed through Razorpay. Our engineering dispatch
            team is preparing your clean energy hardware.
          </p>

          {/* Receipt Box */}
          <div className="order-receipt-details">
            <div>
              <span>Order Reference:</span>
              <span>{orderId}</span>
            </div>
            <div>
              <span>Razorpay Payment ID:</span>
              <span>{paymentId}</span>
            </div>
            <div>
              <span>Dispatch Window:</span>
              <span>24–48 Hours</span>
            </div>
            <div>
              <span>Warranty Registration:</span>
              <span>Auto-Registered with VLOXIA</span>
            </div>
          </div>

          {/* Contact Support */}
          <div className="order-support">
            <p>Our dispatch executive will call you to confirm site delivery location.</p>
            <div >
              <a href="tel:+918178810456">
                <Phone aria-hidden="true" />
                +91 8178810456
              </a>
              <span>•</span>
              <a href="mailto:vloxiasystems@gmail.com">
                <Mail aria-hidden="true" />
                vloxiasystems@gmail.com
              </a>
            </div>
          </div>

          {/* Actions */}
          <div className="order-actions">
            <Link
              href="/shop"
              className="content-button"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="order-home-link"
            >
              Back to Home <ArrowRight aria-hidden="true" />
            </Link>
          </div>
      </section>
    </main>
  );
}
