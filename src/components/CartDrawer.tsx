"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
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
      if (!resScript) {
        alert("Failed to load Razorpay payment gateway. Please check internet connection.");
        setIsProcessing(false);
        return;
      }

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

      // Step 2: Open Razorpay Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_51MockVloxiaKey",
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "VLOXIA Systems LLP",
        description: `Order #${orderData.orderId} - Clean Energy Hardware`,
        image: "/vloxia-logo.png",
        order_id: orderData.orderId,
        prefill: {
          name: customer.name,
          email: customer.email || "customer@vloxia.in",
          contact: customer.phone,
        },
        theme: {
          color: "#2563eb",
        },
        handler: async function (response: any) {
          // Verify on backend
          try {
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderDetails: {
                  customer,
                  items: cart,
                  total: grandTotal,
                },
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok) {
              clearCart();
              setIsCartOpen(false);
              window.location.href = `/shop/order-success?orderId=${orderData.orderId}&paymentId=${response.razorpay_payment_id}`;
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
    } catch (err: any) {
      console.error(err);
      alert(err.message || "An error occurred during checkout");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sliding Side Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-gray-900 tracking-tight">Shopping Cart</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {totalItems} {totalItems === 1 ? "item" : "items"} selected
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="py-20 text-center text-gray-400 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 mb-3">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-gray-800">Your cart is empty</h3>
              <p className="text-xs text-gray-400 mt-1 max-w-xs">
                Explore our EV chargers, lithium storage packs, and hybrid inverters.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-5 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
              >
                Browse Marketplace
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="p-4 rounded-2xl bg-[#f8fafc] border border-gray-200/80 flex gap-3.5 items-center"
              >
                {/* 64x64 Thumbnail */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white border border-gray-200/80 shadow-xs">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1 text-gray-400 hover:text-rose-600 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-xs font-semibold text-gray-500 block mt-0.5">
                    ₹{item.product.price.toLocaleString("en-IN")} each
                  </span>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200/60">
                    <div className="inline-flex items-center border border-gray-200 rounded-lg bg-white px-2 py-0.5 gap-2.5 shadow-2xs">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="text-gray-400 hover:text-gray-900 font-bold text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-gray-900 w-3 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="text-gray-400 hover:text-gray-900 font-bold text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs sm:text-sm font-black text-gray-900">
                      ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Quick Customer Info Form if items in cart */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 mt-4">
              <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider">
                Buyer Information (For Invoice & Delivery)
              </h4>
              <input
                type="text"
                placeholder="Full Name *"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-blue-500 shadow-2xs"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number (for Order Updates) *"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-blue-500 shadow-2xs"
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:border-blue-500 shadow-2xs"
                />
                <input
                  type="text"
                  placeholder="City / PIN Code"
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:border-blue-500 shadow-2xs"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer & Razorpay Checkout */}
        {cart.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-gray-100 bg-white space-y-4 shadow-lg sticky bottom-0">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>GST (18% included)</span>
                <span className="font-bold text-gray-900">₹{taxAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Shipping & Handling</span>
                <span>FREE (All India)</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-black text-gray-900 pt-2 border-t border-gray-100">
                <span>Total Amount</span>
                <span>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button
              onClick={handleRazorpayCheckout}
              disabled={isProcessing}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Secured by 256-Bit SSL & Razorpay PCI-DSS Level 1</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
