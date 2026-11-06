"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Zap, ShoppingCart } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotal,
    taxAmount,
    shippingAmount,
    grandTotal,
    clearCart,
  } = useCart();

  const [isProcessing, setIsProcessing] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
  });

  if (!isCartOpen) return null;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayCheckout = async () => {
    if (cart.length === 0) return;

    if (!customer.name || !customer.phone) {
      alert("Please provide your Name and Phone Number to initiate checkout.");
      return;
    }

    setIsProcessing(true);

    try {
      const resScript = await loadRazorpayScript();
      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_51MockVloxiaKey";

      // Step 1: Create Order on backend
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: grandTotal,
          items: cart.map((i) => ({
            id: i.product.id,
            name: i.product.name,
            qty: i.quantity,
            price: i.product.price,
          })),
          customer,
        }),
      });

      const orderData = await res.json();
      if (!res.ok) {
        throw new Error(orderData.error || "Failed to create payment order");
      }

      if (window.Razorpay && !keyId.includes("Mock")) {
        // Step 2: Open Razorpay Modal
        const options = {
          key: keyId,
          amount: orderData.amount,
          currency: orderData.currency || "INR",
          name: "VLOXIA Systems LLP",
          description: `Order #${orderData.orderId} - Clean Energy Hardware`,
          image: "/vloxia-logo.png",
          order_id: orderData.orderId,
          prefill: {
            name: customer.name,
            email: customer.email,
            contact: customer.phone,
          },
          theme: {
            color: "#2563EB",
          },
          handler: async function (response: any) {
            try {
              const verifyRes = await fetch("/api/razorpay/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  orderDetails: {
                    items: cart.map((i) => ({
                      id: i.product.id,
                      name: i.product.name,
                      quantity: i.quantity,
                      price: i.product.price,
                    })),
                    total: grandTotal,
                    customer,
                  },
                }),
              });

              const verifyData = await verifyRes.json();
              if (verifyRes.ok && verifyData.success) {
                clearCart();
                setIsCartOpen(false);
                const orderNum = verifyData.orderNumber || orderData.orderId;
                window.location.href = `/shop/orders/${orderNum}?paymentId=${response.razorpay_payment_id}`;
              } else {
                alert("Payment verification failed: " + verifyData.error);
              }
            } catch (e: any) {
              alert("Verification error: " + e.message);
            }
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
            },
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        // Mock Mode: Auto-verify and redirect
        const verifyRes = await fetch("/api/razorpay/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: orderData.orderId || `order_mock_${Date.now()}`,
            razorpay_payment_id: `pay_mock_${Date.now()}`,
            razorpay_signature: "mock_signature",
            orderDetails: {
              items: cart.map((i) => ({
                id: i.product.id,
                name: i.product.name,
                quantity: i.quantity,
                price: i.product.price,
              })),
              total: grandTotal,
              customer,
            },
          }),
        });

        const verifyData = await verifyRes.json();
        clearCart();
        setIsCartOpen(false);
        const orderNum = verifyData.orderNumber || orderData.orderId || `VLX-${Date.now().toString().slice(-6)}`;
        window.location.href = `/shop/orders/${orderNum}?paymentId=pay_mock_${Date.now()}`;
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "An error occurred during checkout");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sliding Side Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#07132B] text-white h-full shadow-2xl flex flex-col justify-between z-10 overflow-hidden font-sans border-l border-blue-900/40">
        {/* Header */}
        <div className="p-5 border-b border-blue-900/40 flex items-center justify-between bg-[#091533]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-cyan-400 border border-blue-500/30 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Shopping Cart</h2>
              <p className="text-xs text-slate-400">
                {totalItems} {totalItems === 1 ? "item" : "items"} selected
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-blue-900/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-950/70 text-slate-500 mx-auto flex items-center justify-center border border-blue-900/40">
                <ShoppingCart className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-base font-bold text-white">Your cart is empty</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explore our EV chargers, lithium storage packs, and hybrid inverters.
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/20"
              >
                Browse Marketplace
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="p-3.5 rounded-2xl bg-[#091533] flex items-center gap-3 border border-blue-900/40"
              >
                {/* 64x64 Thumbnail */}
                <div className="relative w-16 h-16 rounded-xl bg-[#050B18] p-1 overflow-hidden shrink-0 border border-blue-950">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-xs font-bold text-white truncate">
                      {item.product.name}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-red-400 transition-colors p-0.5"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    ₹{item.product.price.toLocaleString("en-IN")} each
                  </span>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-blue-800/40 rounded-lg overflow-hidden bg-[#050B18]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 hover:bg-blue-900/30 text-slate-300 text-xs font-bold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-bold text-white font-mono">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 hover:bg-blue-900/30 text-slate-300 text-xs font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-cyan-300 font-mono">
                      ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Quick Customer Info Form if items in cart */}
          {cart.length > 0 && (
            <div className="pt-4 border-t border-blue-900/40 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Buyer Information (Invoice &amp; Delivery)
              </h4>
              <input
                type="text"
                placeholder="Full Name *"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#050B18] border border-blue-900/40 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number (for Order Updates) *"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#050B18] border border-blue-900/40 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                required
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#050B18] border border-blue-900/40 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
                <input
                  type="text"
                  placeholder="City / PIN Code"
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#050B18] border border-blue-900/40 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer & Razorpay Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-blue-900/40 bg-[#091533] space-y-3">
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-white font-mono">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18% included)</span>
                <span className="font-semibold text-white font-mono">₹{taxAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping &amp; Handling</span>
                <span className="font-semibold text-cyan-400">FREE (All India)</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-900 pt-1.5 border-t border-gray-200">
                <span>Total Amount</span>
                <span className="text-blue-600 font-mono text-base">₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRazorpayCheckout}
              disabled={isProcessing}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Initializing Secure Gateway...</span>
              ) : (
                <>
                  <span>Pay with Razorpay 💳</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Secured by 256-Bit SSL & Razorpay PCI-DSS Level 1</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
