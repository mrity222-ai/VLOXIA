"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Zap } from "lucide-react";

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
    <div >
      {/* Backdrop */}
      <div
        
        onClick={() => setIsCartOpen(false)}
      />

      <div >
        <div >
          {/* Header */}
          <div >
            <div >
              <div >
                <Zap  />
              </div>
              <div>
                <h2 >Shopping Cart</h2>
                <p >{totalItems} {totalItems === 1 ? "item" : "items"} selected</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              
            >
              <X  />
            </button>
          </div>

          {/* Cart Items List */}
          <div >
            {cart.length === 0 ? (
              <div >
                <div >
                  <Zap  />
                </div>
                <h3 >Your cart is empty</h3>
                <p >Explore our EV chargers and lithium batteries.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  
                >
                  Browse Marketplace
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  
                >
                  <div >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      
                    />
                  </div>
                  <div >
                    <div>
                      <div >
                        <h4 >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          
                        >
                          <Trash2  />
                        </button>
                      </div>
                      <span >
                        ₹{item.product.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div >
                      <div >
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          
                        >
                          <Minus  />
                        </button>
                        <span >{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          
                        >
                          <Plus  />
                        </button>
                      </div>
                      <span >
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Quick Customer Info Form if items in cart */}
            {cart.length > 0 && (
              <div >
                <h4 >
                  Buyer Information (For Invoice & Delivery)
                </h4>
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number (for Order Updates) *"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  
                  required
                />
                <div >
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    
                  />
                  <input
                    type="text"
                    placeholder="City / PIN Code"
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer & Razorpay Checkout */}
          {cart.length > 0 && (
            <div >
              <div >
                <div >
                  <span>Subtotal</span>
                  <span >₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div >
                  <span>GST (18% included/calculated)</span>
                  <span >₹{taxAmount.toLocaleString("en-IN")}</span>
                </div>
                <div >
                  <span>Shipping & Handling</span>
                  <span >FREE (All India)</span>
                </div>
                <div >
                  <span>Total Amount</span>
                  <span >₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                onClick={handleRazorpayCheckout}
                disabled={isProcessing}
                
              >
                {isProcessing ? (
                  <span>Initializing Secure Gateway...</span>
                ) : (
                  <>
                    <span>Pay with Razorpay 💳</span>
                    <ArrowRight  />
                  </>
                )}
              </button>

              <div >
                <ShieldCheck  />
                <span>Secured by 256-Bit SSL & Razorpay PCI-DSS Level 1</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
