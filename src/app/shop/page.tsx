"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, Product as StaticProduct } from "@/data/products";
import { useCart } from "@/context/CartContext";
import {
  Heart,
  ShoppingCart,
  Star,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
  ChevronDown,
  X,
  Zap,
  Battery,
  Sun,
  ArrowRight,
  Eye,
} from "lucide-react";

interface ShopProduct extends StaticProduct {
  images?: string[];
}

export default function ShopPage() {
  const [products, setProducts] = useState<ShopProduct[]>(
    PRODUCTS.map((p) => ({
      ...p,
      images: [p.image],
    }))
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState<number>(8);

  // Modal State for 5-Image Gallery & Quick View
  const [activeModalProduct, setActiveModalProduct] = useState<ShopProduct | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [modalQuantity, setModalQuantity] = useState<number>(1);

  const { addToCart, totalItems, setIsCartOpen } = useCart();

  // Fetch live products from DB/API
  useEffect(() => {
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => {
        if (data?.products && data.products.length > 0) {
          const mapped: ShopProduct[] = data.products.map((p: any) => {
            let specs = {};
            let highlights: string[] = [];
            let images: string[] = [];
            try {
              specs = JSON.parse(p.specsJson || "{}");
            } catch (e) {}
            try {
              highlights = JSON.parse(p.highlightsJson || "[]");
            } catch (e) {}
            try {
              images = JSON.parse(p.imagesJson || "[]");
            } catch (e) {}
            if (images.length === 0 && p.image) images = [p.image];

            return {
              id: p.id,
              name: p.name,
              tagline: p.tagline,
              category: p.category as any,
              categoryLabel: p.categoryLabel,
              price: p.price,
              originalPrice: p.originalPrice,
              rating: p.rating || 5.0,
              reviewsCount: p.reviewsCount || 121,
              inStock: p.inStock,
              warranty: p.warranty,
              specs,
              highlights,
              image: p.image,
              images,
              badge: p.badge,
            };
          });
          setProducts(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openProductModal = (product: ShopProduct) => {
    setActiveModalProduct(product);
    setActiveImageIndex(0);
    setModalQuantity(1);
  };

  // Filter & Sort Logic
  const filteredProducts = products
    .filter((p) => {
      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
      if (inStockOnly && !p.inStock) return false;
      if (priceFilter === "under-50k" && p.price >= 50000) return false;
      if (priceFilter === "50k-150k" && (p.price < 50000 || p.price > 150000)) return false;
      if (priceFilter === "above-150k" && p.price <= 150000) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured
    });

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="bg-[#fcfdfd] min-h-screen pt-28 pb-20 select-none text-gray-900 font-sans antialiased">
      <div className="container-xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── TOP HERO PROMO BANNER (MATCHES USER REFERENCE) ── */}
        <section className="bg-[#fcf3e8] rounded-[32px] sm:rounded-[40px] p-8 sm:p-14 mb-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-orange-100 shadow-xs">
          {/* Subtle decorative circles */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-orange-200/30 blur-2xl pointer-events-none" />
          <div className="absolute left-1/3 -bottom-20 w-60 h-60 rounded-full bg-amber-200/20 blur-xl pointer-events-none" />

          {/* Left Text Content */}
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-200/60 text-orange-950 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-orange-700" />
              Special Festive Offer
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.15]">
              Grab Upto <span className="text-[#00c853]">30% Off</span> On Clean Energy Hardware
            </h1>
            <p className="mt-4 text-xs sm:text-sm text-gray-600 max-w-md leading-relaxed">
              Certified residential & commercial EV chargers, lithium LiFePO4 batteries, and hybrid solar inverters with all-India doorstep delivery.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById("catalog-grid");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-3.5 bg-[#0a1628] hover:bg-[#2563eb] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-full shadow-lg shadow-slate-900/15 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                Buy Now
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/90 hover:bg-white text-gray-900 text-xs sm:text-sm font-extrabold rounded-full border border-orange-200/80 shadow-xs transition-all"
              >
                <ShoppingCart className="w-4 h-4 text-gray-700" />
                <span>View Cart ({totalItems})</span>
              </button>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="relative z-10 w-full md:w-auto flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              <Image
                src="/Modern EV Charging.png"
                alt="Clean Energy Hardware"
                fill
                priority
                className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </section>

        {/* ── POPULAR CATEGORIES WIDGET (MATCHES RIGHT SUBSCREEN) ── */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm sm:text-base font-black text-gray-900 uppercase tracking-wider">
              Popular Categories
            </h3>
            <span className="text-xs text-gray-400">All India Installation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                id: "ev-charging",
                name: "EV Fast Chargers",
                items: "3.3 kW - 120 kW Available",
                icon: Zap,
                bgColor: "bg-blue-50 text-blue-600",
              },
              {
                id: "battery-storage",
                name: "Lithium Battery Storage",
                items: "5.12 kWh - MWh Modular",
                icon: Battery,
                bgColor: "bg-emerald-50 text-emerald-600",
              },
              {
                id: "power-solar",
                name: "Solar & Hybrid Inverters",
                items: "Dual MPPT High Yield",
                icon: Sun,
                bgColor: "bg-amber-50 text-amber-600",
              },
            ].map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() =>
                    setSelectedCategory(selectedCategory === cat.id ? "all" : cat.id)
                  }
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                    isSelected
                      ? "bg-white border-blue-600 shadow-md ring-2 ring-blue-600/10"
                      : "bg-white border-gray-200/80 hover:border-gray-300 shadow-xs hover:shadow-sm"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${cat.bgColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">{cat.name}</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">{cat.items}</p>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? "text-blue-600 translate-x-1" : "text-gray-300"}`} />
                </div>
              );
            })}
          </div>
        </section>

        {/* ── HORIZONTAL FILTER PILLS BAR (MATCHES REFERENCE SCREEN) ── */}
        <section className="mb-8" id="catalog-grid">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-gray-200/80 shadow-xs">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: "All Products" },
                { id: "ev-charging", label: "EV Chargers" },
                { id: "battery-storage", label: "Lithium Batteries" },
                { id: "power-solar", label: "Solar Inverters" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === c.id
                      ? "bg-gray-900 text-white shadow-xs"
                      : "bg-[#f5f6f8] text-gray-700 hover:bg-gray-200/80"
                  }`}
                >
                  {c.label}
                </button>
              ))}

              {/* Price Filter Pill Dropdown */}
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-4 py-2 rounded-full text-xs font-bold bg-[#f5f6f8] text-gray-700 hover:bg-gray-200/80 focus:outline-none border-none cursor-pointer"
              >
                <option value="all">Price: All Ranges</option>
                <option value="under-50k">Under ₹50,000</option>
                <option value="50k-150k">₹50,000 - ₹1,50,000</option>
                <option value="above-150k">Above ₹1,50,000</option>
              </select>

              {/* In Stock Toggle Pill */}
              <button
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  inStockOnly
                    ? "bg-emerald-600 text-white"
                    : "bg-[#f5f6f8] text-gray-700 hover:bg-gray-200/80"
                }`}
              >
                In Stock Only
              </button>
            </div>

            {/* Right Sort By Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full text-xs font-bold bg-[#f5f6f8] text-gray-900 hover:bg-gray-200/80 focus:outline-none border-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </section>

        {/* ── SECTION TITLE: "Clean Energy Hardware For You!" ── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Clean Energy Hardware For You!
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Showing {displayedProducts.length} of {filteredProducts.length} verified products with direct manufacturer warranty
            </p>
          </div>
        </div>

        {/* ── 4-COLUMN PRODUCT GRID (MATCHES REFERENCE SCREEN CARDS) ── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => {
            const isWishlisted = wishlist.has(product.id);
            return (
              <div
                key={product.id}
                onClick={() => openProductModal(product)}
                className="group bg-white rounded-3xl p-3 border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Photo Box Container (Matching reference #f6f6f6 rounded-2xl square) */}
                  <div className="relative aspect-square w-full rounded-2xl bg-[#f6f6f6] p-6 flex items-center justify-center overflow-hidden">
                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="text-[10px] font-black uppercase tracking-wider text-white bg-blue-600 px-2.5 py-1 rounded-full shadow-xs">
                          {product.badge}
                        </span>
                      </div>
                    )}

                    {/* Floating Wishlist Heart Icon (Top-Right) */}
                    <button
                      type="button"
                      onClick={(e) => toggleWishlist(product.id, e)}
                      className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center transition-all ${
                        isWishlisted
                          ? "text-rose-500 scale-110"
                          : "text-gray-400 hover:text-rose-500 hover:scale-105"
                      }`}
                      title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                      <Heart
                        className={`w-4 h-4 ${isWishlisted ? "fill-rose-500" : ""}`}
                      />
                    </button>

                    {/* Centered Product Photo */}
                    <div className="relative w-full h-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="pt-3 px-1">
                    {/* Title & Price Row */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xs sm:text-sm font-extrabold text-gray-900 tracking-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <span className="text-xs sm:text-sm font-black text-gray-900 whitespace-nowrap">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Tagline / Subtitle */}
                    <p className="text-[11px] text-gray-500 line-clamp-1 mt-1 leading-normal">
                      {product.tagline}
                    </p>

                    {/* Star Rating with Green Stars & Review Count */}
                    <div className="flex items-center gap-1 mt-2">
                      <div className="flex items-center text-[#00c853]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-[#00c853]"
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-semibold text-gray-400">
                        ({product.reviewsCount})
                      </span>
                    </div>
                  </div>
                </div>

                {/* DUAL ACTION BUTTONS: "View Details" & "Add to Cart" */}
                <div className="pt-4 px-1 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openProductModal(product);
                    }}
                    className="py-2.5 px-2 sm:px-3 rounded-full border border-gray-300 hover:border-gray-900 text-gray-700 hover:text-gray-900 font-bold text-[11px] uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1 bg-white hover:bg-gray-50 shadow-2xs"
                    title="View Details & 5-Image Gallery"
                  >
                    <Eye className="w-3.5 h-3.5 text-gray-500" />
                    <span>Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, 1);
                      setIsCartOpen(true);
                    }}
                    className="py-2.5 px-2 sm:px-3 rounded-full bg-gray-900 hover:bg-blue-600 text-white font-extrabold text-[11px] uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1 shadow-sm"
                    title="Add to Cart"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        {/* ── "VIEW MORE" HARDWARE SECTION (MATCHES USER REQUEST) ── */}
        {visibleCount < filteredProducts.length ? (
          <div className="mt-12 flex flex-col items-center justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="px-8 py-3.5 rounded-full border-2 border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs hover:shadow-md"
            >
              <span>View More Hardware ({filteredProducts.length - visibleCount} more)</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="mt-12 text-center text-xs text-gray-400 font-medium">
            Showing all {filteredProducts.length} clean energy products
          </div>
        )}

        {/* ── B2B COMMERCIAL CALLOUT ── */}
        <section className="mt-16 p-8 sm:p-12 bg-gradient-to-r from-slate-900 via-slate-850 to-[#0a1628] rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full">
              Bulk & Project Procurement
            </span>
            <h3 className="text-xl sm:text-2xl font-black mt-3">
              Ordering for Commercial Fleet, Society or Solar Farm?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Access wholesale pricing, formal commercial proforma invoices, turnkey civil installation, and AMC SLA support directly from VLOXIA Systems LLP.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-blue-600/30 transition-all shrink-0"
          >
            Request B2B Quote
          </Link>
        </section>
      </div>

      {/* ── INTERACTIVE 5-IMAGE PRODUCT DETAIL MODAL (MATCHES RIGHT SUBSCREEN) ── */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div
            className="fixed inset-0"
            onClick={() => setActiveModalProduct(null)}
          />

          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10 my-8 z-10 max-h-[92vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left Column: Main Photo + 5 Thumbnail Gallery */}
              <div>
                {/* Large Main Photo */}
                <div className="relative aspect-square w-full rounded-2xl bg-[#f6f6f6] p-8 flex items-center justify-center overflow-hidden border border-gray-100">
                  <Image
                    src={
                      activeModalProduct.images && activeModalProduct.images[activeImageIndex]
                        ? activeModalProduct.images[activeImageIndex]
                        : activeModalProduct.image
                    }
                    alt={activeModalProduct.name}
                    fill
                    sizes="400px"
                    className="object-contain drop-shadow-md"
                  />
                </div>

                {/* 5 Thumbnail Gallery underneath (Matches Subscreen) */}
                <div className="grid grid-cols-5 gap-2.5 mt-4">
                  {(activeModalProduct.images && activeModalProduct.images.length > 0
                    ? activeModalProduct.images
                    : [activeModalProduct.image]
                  ).map((thumb, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all bg-[#f6f6f6] ${
                        activeImageIndex === idx
                          ? "border-blue-600 scale-105 shadow-md"
                          : "border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={thumb}
                        alt={`View ${idx + 1}`}
                        fill
                        sizes="60px"
                        className="object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Details & Actions */}
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
                  {activeModalProduct.categoryLabel}
                </span>

                <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-snug">
                  {activeModalProduct.name}
                </h2>

                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {activeModalProduct.tagline}
                </p>

                {/* Green Star Rating */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="flex items-center text-[#00c853]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#00c853]" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-700">
                    {activeModalProduct.rating} / 5.0
                  </span>
                  <span className="text-xs text-gray-400">
                    ({activeModalProduct.reviewsCount} customer reviews)
                  </span>
                </div>

                {/* Price Display */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-black text-gray-900">
                      ₹{activeModalProduct.price.toLocaleString("en-IN")}
                    </span>
                    {activeModalProduct.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{activeModalProduct.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-400 block mt-1">
                    Inclusive of 18% GST & Doorstep Insured Freight
                  </span>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Quantity:
                  </span>
                  <div className="inline-flex items-center border border-gray-200 rounded-full bg-[#f8fafc] px-3 py-1 gap-4">
                    <button
                      type="button"
                      onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                      className="text-gray-500 hover:text-gray-900 font-bold text-sm w-4 text-center"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-gray-900 w-4 text-center">
                      {modalQuantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setModalQuantity(modalQuantity + 1)}
                      className="text-gray-500 hover:text-gray-900 font-bold text-sm w-4 text-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-3">
                  <button
                    onClick={() => {
                      addToCart(activeModalProduct, modalQuantity);
                      setActiveModalProduct(null);
                      setIsCartOpen(true);
                    }}
                    className="flex-1 py-3 px-6 rounded-full border border-gray-900 text-gray-900 font-bold text-xs uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-all text-center"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => {
                      addToCart(activeModalProduct, modalQuantity);
                      setActiveModalProduct(null);
                      setIsCartOpen(true);
                    }}
                    className="flex-1 py-3 px-6 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-600/25 transition-all text-center"
                  >
                    Buy Now
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Free Doorstep Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{activeModalProduct.warranty}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
