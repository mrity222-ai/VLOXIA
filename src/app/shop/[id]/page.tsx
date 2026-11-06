"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PRODUCTS, Product as StaticProduct } from "../../../data/products";
import { useCart } from "../../../context/CartContext";
import ScrollReveal from "@/components/animations/ScrollReveal";
import {
  Star,
  ShieldCheck,
  Truck,
  Heart,
  ShoppingCart,
  Zap,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Clock,
  ArrowLeft,
  X,
  CreditCard,
  User,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

interface ShopProduct extends StaticProduct {
  images?: string[];
  stockQuantity?: number;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const [product, setProduct] = useState<ShopProduct | null>(null);
  const [allProducts, setAllProducts] = useState<ShopProduct[]>(
    PRODUCTS.map((p) => ({ ...p, images: [p.image] }))
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "reviews">("overview");

  // Buy Now Direct Checkout Modal State
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  const { addToCart, setIsCartOpen } = useCart();

  const [notFound, setNotFound] = useState(false);

  // Find product from live API / Database
  useEffect(() => {
    if (!productId) return;

    // 1. Fetch exact product from live DB
    fetch(`/api/products/${productId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product not found");
        }
        return res.json();
      })
      .then((data) => {
        if (data?.success && data.product) {
          setProduct(data.product);
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => {
        // Fallback check static PRODUCTS if offline
        const foundStatic = PRODUCTS.find((p) => p.id === productId || p.slug === productId);
        if (foundStatic) {
          setProduct({ ...foundStatic, images: [foundStatic.image] });
        } else {
          setNotFound(true);
        }
      });

    // 2. Fetch all live products for recommendations
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.products)) {
          setAllProducts(data.products);
        }
      })
      .catch(() => {});
  }, [productId]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#FBFBFE] flex items-center justify-center p-6 text-slate-900 font-sans">
        <div className="text-center max-w-md mx-auto space-y-5 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto text-2xl font-bold">
            !
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Product Not Available</h2>
          <p className="text-sm text-slate-500">
            This hardware item is no longer in our active catalogue or has been removed by the administrator.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Hardware Marketplace
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FBFBFE] flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-500 font-medium">Loading hardware specifications...</p>
        </div>
      </div>
    );
  }

  const galleryImages =
    product.images && product.images.length > 0 ? product.images : [product.image];

  const suggestedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  // Script loader for Razorpay
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
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

  // Direct Buy Now Checkout Handler
  const handleDirectBuyNow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name || !customer.phone) {
      alert("Please provide your name and phone number.");
      return;
    }

    setIsProcessing(true);

    try {
      await loadRazorpayScript();

      const totalAmount = product.price * quantity;

      // 1. Create order
      const createRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          items: [
            {
              id: product.id,
              name: product.name,
              qty: quantity,
              price: product.price,
            },
          ],
          customer: {
            ...customer,
            city: customer.city || "Pan India",
          },
        }),
      });

      const orderData = await createRes.json();
      if (!createRes.ok) {
        throw new Error(orderData.error || "Failed to initiate payment gateway");
      }

      // Check if Razorpay key is present
      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_51MockVloxiaKey";

      if ((window as any).Razorpay && !keyId.includes("Mock")) {
        const options = {
          key: keyId,
          amount: orderData.amount,
          currency: "INR",
          name: "VLOXIA Systems LLP",
          description: `Direct Purchase: ${product.name}`,
          image: "/vloxia-logo.png",
          order_id: orderData.orderId,
          handler: async (response: any) => {
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderDetails: {
                  customer,
                  total: totalAmount,
                  items: [
                    {
                      id: product.id,
                      name: product.name,
                      quantity,
                      price: product.price,
                    },
                  ],
                },
              }),
            });

            const verifyData = await verifyRes.json();
            const orderNum = verifyData.orderNumber || `VLX-${Date.now().toString().slice(-6)}`;
            router.push(`/shop/orders/${orderNum}?paymentId=${response.razorpay_payment_id}`);
          },
          prefill: {
            name: customer.name,
            email: customer.email,
            contact: customer.phone,
          },
          theme: { color: "#2563EB" },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        // Mock Mode: Direct Instant Payment Verification
        const verifyRes = await fetch("/api/razorpay/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: orderData.orderId || `order_mock_${Date.now()}`,
            razorpay_payment_id: `pay_mock_${Date.now()}`,
            razorpay_signature: "mock_signature",
            orderDetails: {
              customer,
              total: totalAmount,
              items: [
                {
                  id: product.id,
                  name: product.name,
                  quantity,
                  price: product.price,
                },
              ],
            },
          }),
        });

        const verifyData = await verifyRes.json();
        const orderNum = verifyData.orderNumber || `VLX-${Date.now().toString().slice(-6)}`;
        router.push(`/shop/orders/${orderNum}?paymentId=pay_mock_${Date.now()}`);
      }
    } catch (err: any) {
      alert(err.message || "Something went wrong during checkout.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] text-gray-900 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-10">

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/shop" className="hover:text-blue-600 transition-colors">
            Marketplace
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-400 uppercase tracking-wider">{product.categoryLabel}</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* ── MAIN PRODUCT SHOWCASE CONTAINER ── */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left Column: 5-Image Gallery */}
            <div className="lg:col-span-6 space-y-4">
              {/* Primary Large Image */}
              <div className="relative w-full h-80 sm:h-96 md:h-[460px] rounded-3xl bg-[#F2F4FA] p-8 flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm">
                {product.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600 text-white shadow-sm z-10">
                    {product.badge}
                  </span>
                )}

                <Image
                  src={galleryImages[activeImageIndex] || product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-contain p-4 transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* 5 Thumbnail Gallery Strip */}
              <div className="grid grid-cols-5 gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-20 sm:h-24 rounded-2xl overflow-hidden bg-[#F2F4FA] p-2 border-2 transition-all ${
                      activeImageIndex === idx
                        ? "border-blue-600 shadow-md scale-95"
                        : "border-transparent opacity-75 hover:opacity-100 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Angle ${idx + 1}`}
                      fill
                      sizes="100px"
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Meta, Pricing, Rating & Direct Buy Actions */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100 mb-2">
                  {product.categoryLabel}
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-slate-950 tracking-tight leading-tight">
                  <span className="text-shimmer font-bold">{product.name}</span>
                </h1>
                <p className="text-sm sm:text-base text-gray-500 mt-2 leading-relaxed">
                  {product.tagline}
                </p>
              </div>

              {/* Star Rating & Reviews Count */}
              <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-950">
                  {product.rating} / 5.0
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer">
                  {product.reviewsCount} verified customer reviews
                </span>
              </div>

              {/* Price Box */}
              <div className="bg-[#F2F4FA] rounded-3xl p-6 space-y-2 border border-gray-100">
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl sm:text-4xl font-bold text-blue-600 font-mono tracking-tight">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                      Save ₹{(product.originalPrice - product.price).toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Inclusive of 18% GST • Doorstep Insured Transport Across India</span>
                </div>
              </div>

              {/* Stock & Warranty Highlights */}
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-gray-200">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <div className="text-gray-900">In Stock Ready to Ship</div>
                    <div className="text-[11px] text-gray-400 font-normal">{product.stockQuantity || 12} Units at Factory Depot</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-gray-200">
                  <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <div className="text-gray-900">Official Warranty</div>
                    <div className="text-[11px] text-gray-400 font-normal">{product.warranty}</div>
                  </div>
                </div>
              </div>

              {/* Quantity Stepper & Dual Action Buttons */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-600">Quantity:</span>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2 hover:bg-gray-100 text-gray-700 font-bold transition-colors"
                    >
                      -
                    </button>
                    <span className="px-5 py-2 text-sm font-bold text-gray-900 font-mono">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2 hover:bg-gray-100 text-gray-700 font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* DUAL ACTION BUTTONS: "Add to Cart" & "Buy Now" */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* OPTION 1: ADD TO CART */}
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(product, quantity);
                      setIsCartOpen(true);
                    }}
                    className="py-4 px-6 rounded-2xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  {/* OPTION 2: BUY NOW (Direct Checkout) */}
                  <button
                    type="button"
                    onClick={() => setIsBuyNowOpen(true)}
                    className="py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-tight text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-500/25 transition-all active:scale-95"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Buy Now (Instant Checkout)</span>
                  </button>
                </div>
              </div>

              {/* Quick Guarantees */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-blue-600" />
                  Free Doorstep Delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Dispatches in 24-48 Hours
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  100% Authentic VLOXIA Certified
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── TABS: OVERVIEW, TECHNICAL SPECS & CUSTOMER REVIEWS ── */}
        <ScrollReveal delay={0.1}>
          <section className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 overflow-x-auto">
            {[
              { id: "overview", label: "Overview & Features" },
              { id: "specs", label: "Technical Specifications" },
              { id: "reviews", label: `Customer Reviews (${product.reviewsCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Product Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed max-w-4xl">
                  {product.tagline}. Engineered by VLOXIA Systems LLP to withstand demanding commercial and residential operating conditions across India, featuring ruggedized components, thermal safety fail-safes, and cloud remote diagnostic capabilities.
                </p>
              </div>

              {product.highlights && product.highlights.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                    Key Engineering Highlights
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-700">
                    {product.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F2F4FA]">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TECHNICAL SPECIFICATIONS */}
          {activeTab === "specs" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Engineering Data Sheet</h3>
              <div className="overflow-hidden rounded-2xl border border-gray-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <tbody>
                    {product.specs && Object.keys(product.specs).length > 0 ? (
                      Object.entries(product.specs).map(([k, v], i) => (
                        <tr
                          key={k}
                          className={i % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}
                        >
                          <td className="py-3 px-4 font-bold text-gray-800 w-1/3 border-r border-gray-100">
                            {k}
                          </td>
                          <td className="py-3 px-4 text-gray-600">{v}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="p-4 text-gray-500">
                          Standard commercial specifications apply. Contact VLOXIA engineering for detailed datasheet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: REVIEWS */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#F2F4FA]">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-normal text-slate-950 font-mono tracking-tight">
                    {product.rating}
                  </div>
                  <div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 font-semibold">
                      Based on {product.reviewsCount} customer reviews
                    </span>
                  </div>
                </div>
                <div className="text-xs text-blue-700 bg-blue-100 px-3 py-1.5 rounded-full font-bold self-start sm:self-auto">
                  ✓ 100% Verified Hardware Buyers
                </div>
              </div>

              {/* Review Testimonials */}
              <div className="space-y-4">
                {[
                  {
                    author: "Rajesh Sharma",
                    city: "Gurugram, Haryana",
                    rating: 5,
                    date: "2 weeks ago",
                    text: "Exceptional build quality! Installed at our commercial parking bay in Cyber City. Charging speeds are solid and the RFID auth works seamlessly.",
                  },
                  {
                    author: "Amitabh Verma",
                    city: "Bengaluru, Karnataka",
                    rating: 5,
                    date: "1 month ago",
                    text: "Delivered within 48 hours to Whitefield. The VLOXIA engineering team called to assist with installation guidance. High yield and premium finish.",
                  },
                  {
                    author: "Siddharth Nair",
                    city: "Pune, Maharashtra",
                    rating: 5,
                    date: "Last month",
                    text: "Installed the battery storage system with our rooftop solar setup. Zero transfer lag during power cuts. Highly recommended!",
                  },
                ].map((rev, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-gray-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xs sm:text-sm text-gray-900">
                        {rev.author} <span className="text-gray-400 font-normal">• {rev.city}</span>
                      </div>
                      <span className="text-[11px] text-gray-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center">
                      {[...Array(rev.rating)].map((_, s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      &quot;{rev.text}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          </section>
        </ScrollReveal>

        {/* ── SUGGESTED HARDWARE PRODUCTS (AT BOTTOM AS REQUESTED) ── */}
        <section className="space-y-6 pt-6">
          <ScrollReveal>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-normal text-slate-950 tracking-tight">
                  You May Also Like & <span className="text-shimmer font-bold">Hardware Suggestions</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Explore complementary charging units and modular power systems
                </p>
              </div>
              <Link
                href="/shop"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>View All Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {suggestedProducts.map((item, sIdx) => (
              <ScrollReveal key={item.id} delay={Math.min(sIdx * 0.05, 0.25)}>
                <div
                  className="group bg-[#F2F4FA] hover:bg-[#EBEEF8] rounded-3xl p-5 transition-all duration-300 flex flex-col justify-between border border-transparent hover:border-blue-200 hover:shadow-lg h-full"
                >
                  <div>
                    <Link
                      href={`/shop/${item.id}`}
                      className="relative block w-full h-44 rounded-2xl bg-white/70 p-3 overflow-hidden mb-4"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="250px"
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <span className="text-[10px] uppercase font-bold text-gray-400">
                      {item.categoryLabel}
                    </span>
                    <Link
                      href={`/shop/${item.id}`}
                      className="block text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 mt-0.5"
                    >
                      {item.name}
                    </Link>
                    <div className="text-blue-600 font-bold text-sm font-mono mt-1">
                      ₹{item.price.toLocaleString("en-IN")}
                    </div>
                  </div>

                  <Link
                    href={`/shop/${item.id}`}
                    className="mt-4 pt-3 border-t border-gray-200/60 text-xs font-bold text-blue-600 flex items-center justify-between group-hover:gap-2 transition-all"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

      </div>

      {/* ── DIRECT "BUY NOW" CHECKOUT MODAL ── */}
      {isBuyNowOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => !isProcessing && setIsBuyNowOpen(false)}
          />

          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Instant Checkout & Order Confirmation
                </h3>
                <p className="text-xs text-gray-500">VLOXIA Secure Razorpay Payment Perimeter</p>
              </div>
              <button
                type="button"
                onClick={() => setIsBuyNowOpen(false)}
                disabled={isProcessing}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Product Summary Box */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#F2F4FA]">
              <div className="relative w-16 h-16 rounded-xl bg-white p-1 overflow-hidden shrink-0 border border-gray-200">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                  {product.name}
                </h4>
                <div className="text-xs text-gray-500 mt-0.5">
                  Quantity: <strong className="text-gray-900">{quantity}</strong> × ₹{product.price.toLocaleString("en-IN")}
                </div>
                <div className="text-xs font-bold text-blue-600 mt-1">
                  Total Payable: ₹{(product.price * quantity).toLocaleString("en-IN")}
                </div>
              </div>
            </div>

            {/* Customer Delivery Details Form */}
            <form onSubmit={handleDirectBuyNow} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">
                    Email Address (For Invoice & Tracking) *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      placeholder="rahul@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">
                  Complete Shipping Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    placeholder="Plot / House No, Street, Landmark"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">
                    City / State *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    placeholder="e.g. Gurugram, HR"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.pincode}
                    onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                    placeholder="122002"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-tight text-sm shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>
                    {isProcessing
                      ? "Processing Payment Gateway..."
                      : `Pay ₹${(product.price * quantity).toLocaleString("en-IN")} via Razorpay`}
                  </span>
                </button>
                <div className="text-center text-[11px] text-gray-400 mt-2">
                  🔒 256-bit SSL Encrypted • Invoice auto-sent to email upon payment
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
