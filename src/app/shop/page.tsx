"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, Product as StaticProduct } from "../../data/products";
import { useCart } from "../../context/CartContext";
import ScrollReveal from "../../components/animations/ScrollReveal";
import {
  Heart,
  ShoppingCart,
  Star,
  ShieldCheck,
  Truck,
  Sparkles,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Zap,
  Battery,
  Sun,
  ArrowRight,
  Eye,
  Search,
  Check,
} from "lucide-react";

interface ShopProduct extends StaticProduct {
  images?: string[];
}

interface ShopBannerItem {
  id: string;
  title: string;
  subtitle?: string | null;
  ctaText: string;
  ctaLink: string;
  badge?: string | null;
  imageUrl: string;
  sortOrder: number;
}

interface ShopCategoryItem {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  description?: string | null;
  sortOrder: number;
}

const DEFAULT_HERO_SLIDES: ShopBannerItem[] = [
  {
    id: "slide-1",
    badge: "VLOXIA Hardware Marketplace",
    title: "Timeless Clean Energy,\nConscious Choices.",
    subtitle: "Sustainably designed, high-efficiency solar, EV charging, and storage solutions built to stand the test of time.",
    ctaText: "Explore the Collections",
    ctaLink: "#catalog-grid",
    imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 1,
  },
  {
    id: "slide-2",
    badge: "Commercial & Fleet Charging",
    title: "Next-Gen EV Fast Charging,\nEngineered for High Uptime.",
    subtitle: "Commercial AC Wallboxes & DC Ultra-fast corridors with cloud CMS telemetry, RFID access, and dynamic load balancing.",
    ctaText: "Explore Fast Chargers",
    ctaLink: "#catalog-grid",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 2,
  },
  {
    id: "slide-3",
    badge: "Tier-1 Lithium BESS",
    title: "Automotive-Grade Lithium Storage,\nZero-Maintenance Reliability.",
    subtitle: "6,000+ cycle LiFePO4 battery packs with intelligent BMS balancing, wall-mounted form factor, and smart hybrid inverters.",
    ctaText: "Explore Energy Storage",
    ctaLink: "#catalog-grid",
    imageUrl: "https://images.unsplash.com/photo-1558441719-8b489c63f7d1?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 3,
  },
];

const DEFAULT_CATEGORIES: ShopCategoryItem[] = [
  {
    id: "cat-1",
    name: "EV Fast Chargers",
    slug: "ev-charging",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=600&q=80",
    description: "AC Wallboxes & DC Ultra-fast commercial chargers",
    sortOrder: 1,
  },
  {
    id: "cat-2",
    name: "Solar Panels",
    slug: "power-solar",
    imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80",
    description: "High-efficiency Tier-1 monocrystalline & TOPCon solar arrays",
    sortOrder: 2,
  },
  {
    id: "cat-3",
    name: "Lithium Storage",
    slug: "battery-storage",
    imageUrl: "https://images.unsplash.com/photo-1558441719-8b489c63f7d1?auto=format&fit=crop&w=600&q=80",
    description: "LiFePO4 modular energy storage with smart BMS",
    sortOrder: 3,
  },
  {
    id: "cat-4",
    name: "Smart Inverters",
    slug: "smart-inverters",
    imageUrl: "https://images.unsplash.com/photo-1548611716-ad01fbf9df24?auto=format&fit=crop&w=600&q=80",
    description: "Hybrid dual-MPPT inverters with zero transfer latency",
    sortOrder: 4,
  },
  {
    id: "cat-5",
    name: "Accessories & Cables",
    slug: "accessories",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    description: "Type 2 heavy-duty guns, isolators & surge protection switchgear",
    sortOrder: 5,
  },
  {
    id: "cat-6",
    name: "Commercial EPC",
    slug: "commercial",
    imageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&q=80",
    description: "Turnkey captive solar arrays and fleet depot electrification",
    sortOrder: 6,
  },
];

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
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Dynamic Banners & Categories State
  const [banners, setBanners] = useState<ShopBannerItem[]>(DEFAULT_HERO_SLIDES);
  const [categoriesList, setCategoriesList] = useState<ShopCategoryItem[]>(DEFAULT_CATEGORIES);

  // Auto-scrolling Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { addToCart, totalItems, setIsCartOpen } = useCart();

  // Fetch live banners from DB/API
  useEffect(() => {
    fetch("/api/banners")
      .then((res) => res.json())
      .then((data) => {
        if (data?.banners && data.banners.length > 0) {
          setBanners(data.banners);
        }
      })
      .catch(() => {});
  }, []);

  // Fetch live categories from DB/API
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data?.categories && data.categories.length > 0) {
          setCategoriesList(data.categories);
        }
      })
      .catch(() => {});
  }, []);

  // Fetch live products from DB/API
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.products)) {
          setProducts(data.products);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch products from /api/products:", err);
      });
  }, []);

  // Auto-scroll Timer for Banners
  useEffect(() => {
    if (isPaused || banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, banners.length]);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Filter & Sort Logic
  const filteredProducts = products
    .filter((p) => {
      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
      if (inStockOnly && !p.inStock) return false;
      if (priceFilter === "under-50k" && p.price >= 50000) return false;
      if (priceFilter === "50k-150k" && (p.price < 50000 || p.price > 150000)) return false;
      if (priceFilter === "above-150k" && p.price <= 150000) return false;
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query) ||
          p.categoryLabel.toLowerCase().includes(query)
        );
      }
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
    <div className="min-h-screen bg-[#FBFBFE] text-slate-900 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-14">

        {/* ── 1. EDITORIAL HERO BANNER SLIDER (MATCHES IMAGE 1 REFERENCE) ── */}
        <section
          className="relative overflow-hidden rounded-3xl text-white shadow-2xl min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] flex items-center transition-all duration-700 select-none bg-slate-950"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {banners.map((slide, idx) => {
            const isActive = idx === currentSlide;
            const lines = slide.title.split("\n");
            const line1 = lines[0] || slide.title;
            const line2 = lines.slice(1).join(" ");

            return (
              <div
                key={slide.id || idx}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  isActive
                    ? "opacity-100 pointer-events-auto z-10"
                    : "opacity-0 pointer-events-none z-0"
                }`}
              >
                {/* Full-bleed background image with subtle cinematic overlay */}
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  fill
                  priority={idx === 0}
                  className="object-cover object-center scale-100 transition-transform duration-7000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                {/* Editorial Typography (Image 1 Style) */}
                <div className="relative z-10 w-full h-full p-8 md:p-14 lg:p-20 flex flex-col justify-center max-w-3xl">
                  {slide.badge && (
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-300 mb-4 drop-shadow">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      {slide.badge}
                    </span>
                  )}

                  {/* Headline: First line bold + second line italicized font-serif */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] drop-shadow-md">
                    <span>{line1}</span>
                    {line2 && (
                      <span className="block font-serif italic font-normal text-slate-100 mt-1 sm:mt-2">
                        {line2}
                      </span>
                    )}
                  </h1>

                  {slide.subtitle && (
                    <p className="mt-4 sm:mt-6 text-sm sm:text-base text-slate-200/95 max-w-xl leading-relaxed drop-shadow">
                      {slide.subtitle}
                    </p>
                  )}

                  {/* Pill CTA Button (Image 1 Style) */}
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        const target = slide.ctaLink.startsWith("#")
                          ? document.querySelector(slide.ctaLink)
                          : null;
                        if (target) {
                          target.scrollIntoView({ behavior: "smooth" });
                        } else if (slide.ctaLink) {
                          window.location.href = slide.ctaLink;
                        }
                      }}
                      className="px-8 py-3.5 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-semibold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                      <span>{slide.ctaText || "Explore the Collections"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsCartOpen(true)}
                      className="px-6 py-3.5 rounded-full border border-white/40 hover:border-white text-white hover:bg-white/10 font-medium text-sm backdrop-blur-md transition-all flex items-center gap-2 active:scale-95"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Cart ({totalItems})</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Bottom-Right Navigation Buttons Matching Image 1 exactly: (←) (→) */}
          <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-12 z-20 flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === 0 ? banners.length - 1 : prev - 1
                )
              }
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/75 hover:bg-white text-slate-900 backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-200 active:scale-90"
              title="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % banners.length)
              }
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/75 hover:bg-white text-slate-900 backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-200 active:scale-90"
              title="Next Slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </section>

        {/* ── 2. "SHOP OUR TOP CATEGORIES" SECTION (MATCHES IMAGE 2 REFERENCE) ── */}
        <section className="space-y-6">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Shop Top <span className="text-shimmer font-bold">Categories</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Explore dedicated portfolios with certified Tier-1 hardware &amp; turnkey availability
                </p>
              </div>
              {selectedCategory !== "all" && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 flex items-center gap-1.5 self-start sm:self-auto transition-colors"
                >
                  <span>✕ Clear Filter ({selectedCategory})</span>
                </button>
              )}
            </div>
          </ScrollReveal>

          {/* Image 2 Style: Visual Photo Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {categoriesList.map((cat, idx) => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <ScrollReveal key={cat.id || cat.slug} delay={idx * 0.05}>
                  <div
                    onClick={() => {
                      setSelectedCategory(isSelected ? "all" : cat.slug);
                      const el = document.getElementById("catalog-grid");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`group img-zoom-container lift-effect shadow-hover-effect relative aspect-4/5 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 select-none h-full ${
                      isSelected
                        ? "border-blue-600 shadow-xl shadow-blue-500/25 scale-[1.03] -translate-y-1.5"
                        : "border-transparent hover:border-blue-400 hover:shadow-xl hover:-translate-y-2"
                    }`}
                  >
                    {/* Photo Background */}
                    <Image
                      src={cat.imageUrl}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                      className="img-zoom-target object-cover group-hover:scale-115 transition-transform duration-700 ease-out"
                    />

                    {/* Dark Vignette Overlay for Readability */}
                    <div
                      className={`img-overlay-effect absolute inset-0 transition-colors duration-300 ${
                        isSelected
                          ? "bg-blue-950/50"
                          : "bg-black/35 group-hover:bg-blue-950/40"
                      }`}
                    />

                    {/* Centered White Bold Category Name (Image 2 Typography) */}
                    <div className="absolute inset-0 p-3 sm:p-4 flex flex-col items-center justify-center text-center">
                      <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg tracking-tight drop-shadow-md">
                        {cat.name}
                      </h3>
                      {cat.description && (
                        <p className="text-[11px] text-white/80 line-clamp-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {cat.description}
                        </p>
                      )}
                    </div>

                    {/* Active Selected Badge */}
                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* ── 3. PRODUCT CATALOG WITH DUAL BUTTONS ("Details" & "Add to Cart") ── */}
        <section id="catalog-grid" className="space-y-6 pt-4">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-slate-950">
                  Explore Hardware <span className="text-shimmer font-bold">Products</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Showing {displayedProducts.length} of {filteredProducts.length} verified products
                </p>
              </div>

              {/* In-Stock Toggle */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setInStockOnly(!inStockOnly)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                    inStockOnly
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {inStockOnly ? "✓ In Stock Only" : "Show In Stock Only"}
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Filter Bar */}
          <ScrollReveal delay={0.08}>
            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4">
              {/* Search Input */}
              <div className="relative w-full lg:w-72">
                <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, models..."
                  className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm text-slate-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "all", label: "All Items" },
                  { id: "ev-charging", label: "EV Chargers" },
                  { id: "battery-storage", label: "Lithium Batteries" },
                  { id: "power-solar", label: "Solar Inverters" },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedCategory === c.id
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Dropdowns */}
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="bg-gray-50 border border-gray-200 text-xs font-medium text-gray-700 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500"
                >
                  <option value="all">Price: All Ranges</option>
                  <option value="under-50k">Under ₹50,000</option>
                  <option value="50k-150k">₹50,000 - ₹1,50,000</option>
                  <option value="above-150k">Above ₹1,50,000</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 border border-gray-200 text-xs font-medium text-gray-700 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </ScrollReveal>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product, pIdx) => {
              const isWishlisted = wishlist.has(product.id);
              const targetSlug = product.slug || product.id;
              return (
                <ScrollReveal key={product.id} delay={Math.min(pIdx * 0.05, 0.3)}>
                  <div
                    className="group rounded-3xl p-5 transition-all duration-300 flex flex-col justify-between border border-gray-200/80 bg-white hover:border-blue-300 hover:shadow-xl cursor-pointer h-full"
                  >
                    <div>
                      {/* Photo Box Container with Image Zoom */}
                      <Link
                        href={`/shop/${targetSlug}`}
                        className="img-zoom-container relative block w-full h-48 rounded-2xl bg-[#F8F9FD] p-3 overflow-hidden mb-4 border border-gray-100"
                      >
                        {product.badge && (
                          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-blue-600 text-white z-10 shadow-sm">
                            {product.badge}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={(e) => toggleWishlist(product.id, e)}
                          className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-red-500 transition-colors z-10 shadow-sm hover:scale-110 active:scale-90"
                          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                        </button>

                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 250px"
                          className="img-zoom-target object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                      </Link>

                      {/* Meta */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600">
                          {product.categoryLabel || "Hardware"}
                        </span>
                        <Link
                          href={`/shop/${targetSlug}`}
                          className="block text-sm sm:text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {product.tagline}
                        </p>
                        <div className="flex items-center gap-1 pt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="text-[11px] text-gray-500 ml-1 font-semibold">
                            {product.rating} ({product.reviewsCount} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price & DUAL ACTION BUTTONS ("Details" & "Add to Cart") */}
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="text-gray-900 font-extrabold text-base font-mono tracking-tight mb-3">
                        ₹{product.price.toLocaleString("en-IN")}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/shop/${targetSlug}`}
                          className="btn-hover-effect px-2.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-gray-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1 transition-all shadow-2xs text-center active:scale-95"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                          <span>Details</span>
                        </Link>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className="btn-hover-effect px-2.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1 transition-all shadow-md shadow-blue-600/30 text-center active:scale-95"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* View More Hardware */}
          {visibleCount < filteredProducts.length ? (
            <div className="text-center pt-8">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 8)}
                className="px-7 py-3 rounded-full bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold text-xs sm:text-sm inline-flex items-center gap-2 shadow-sm transition-all"
              >
                <span>View More Hardware ({filteredProducts.length - visibleCount} more)</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-center pt-8 text-xs text-gray-400">
              Showing all {filteredProducts.length} clean energy products
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
