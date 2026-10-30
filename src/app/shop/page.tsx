"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import {
  Zap,
  Battery,
  Sun,
  ShieldCheck,
  CheckCircle2,
  ShoppingCart,
  Star,
  ArrowRight,
  SlidersHorizontal,
  ChevronRight,
  Info,
} from "lucide-react";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const { addToCart, totalItems, setIsCartOpen } = useCart();

  const filteredProducts =
    selectedCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <main className="shop-page">
      {/* ── HERO BANNER ── */}
      <section className="shop-hero">
        <div className="shop-hero-glow" />
        <div className="shop-hero-orb" />

        <div className="shop-hero-inner">
          <div className="shop-eyebrow">
            <Zap aria-hidden="true" />
            VLOXIA Direct Clean Energy Marketplace
          </div>
          <h1>
            Buy EV Chargers & <span>Lithium Storage</span>
          </h1>
          <p>
            Certified residential & commercial clean energy hardware. Backed by OEM warranties,
            all-India doorstep delivery, and 100% secure Razorpay checkout.
          </p>

          {/* Quick Perks */}
          <div className="shop-perks">
            <span>
              <ShieldCheck aria-hidden="true" />
              Up to 10 Years Warranty
            </span>
            <span>
              <CheckCircle2 aria-hidden="true" />
              Free Doorstep Delivery in India
            </span>
            <span>
              <Zap aria-hidden="true" />
              Easy EMI & Instant Payment with Razorpay
            </span>
          </div>
        </div>
      </section>

      {/* ── FILTER TABS & STICKY CART BAR ── */}
      <section className="shop-toolbar">
        <div className="shop-toolbar-inner">
          {/* Category Tabs */}
          <div className="shop-filter-tabs" role="tablist" aria-label="Product categories">
            {[
              { id: "all", label: "All Hardware" },
              { id: "ev-charging", label: "⚡ EV Chargers (AC/DC)" },
              { id: "battery-storage", label: "🔋 Lithium Batteries" },
              { id: "power-solar", label: "☀️ Inverters & Solar" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`shop-filter${selectedCategory === tab.id ? " is-active" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Floating Cart Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="shop-cart-button"
          >
            <ShoppingCart aria-hidden="true" />
            <span>Cart ({totalItems})</span>
            <span className="shop-cart-divider"></span>
            <span>View & Checkout ↗</span>
          </button>
        </div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section className="shop-products-section">
        <div className="shop-content-width">
          <div className="shop-product-grid">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="shop-product-card"
              >
                {/* Image & Badge */}
                <div className="shop-product-image">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="shop-product-photo"
                  />
                  {product.badge && (
                    <div className="shop-product-badge">
                      {product.badge}
                    </div>
                  )}
                  <div className="shop-rating">
                    <Star aria-hidden="true" />
                    <span>{product.rating}</span>
                    <span>({product.reviewsCount})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="shop-product-info">
                  <div>
                    <div className="shop-category-label">
                      {product.categoryLabel}
                    </div>
                    <h3>
                      {product.name}
                    </h3>
                    <p className="shop-tagline">
                      {product.tagline}
                    </p>

                    {/* Key Specs Pill */}
                    <div className="shop-specs">
                      {Object.entries(product.specs)
                        .slice(0, 3)
                        .map(([k, v]) => (
                          <div key={k}>
                            <span>{k}:</span>
                            <span>{v}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="shop-product-footer">
                    <div className="shop-price-group">
                      <span className="shop-price">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {product.originalPrice && (
                        <span className="shop-old-price">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                      <span className="shop-tax-note">
                        Incl. 18% GST
                      </span>
                    </div>

                    <div className="shop-actions">
                      <button
                        onClick={() => setActiveProductModal(product)}
                        className="shop-details-button"
                      >
                        <Info aria-hidden="true" />
                        Details
                      </button>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="shop-buy-button"
                      >
                        <ShoppingCart aria-hidden="true" />
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── B2B BULK PURCHASE CALLOUT ── */}
      <section className="shop-b2b">
        <div className="shop-content-width">
          <div className="shop-b2b-inner">
            <div>
              <div className="shop-category-label">
                Commercial & Bulk Projects
              </div>
              <h2>
                Ordering for Fleet, Builder Society or Commercial Hub?
              </h2>
              <p>
                Get custom GST commercial invoices, volume discounts, turnkey installation, and
                annual maintenance contracts directly from VLOXIA Systems LLP.
              </p>
            </div>
            <Link
              href="/contact"
              className="shop-b2b-link"
            >
              Request B2B Quote <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── QUICK VIEW / DETAILS MODAL ── */}
      {activeProductModal && (
        <div className="shop-modal-overlay">
          <div
            className="shop-modal-backdrop"
            onClick={() => setActiveProductModal(null)}
          />

          <div className="shop-modal">
            <button
              onClick={() => setActiveProductModal(null)}
              className="shop-modal-close"
            >
              ✕
            </button>

            <div className="shop-modal-main">
              <div className="shop-modal-image">
                <Image
                  src={activeProductModal.image}
                  alt={activeProductModal.name}
                  fill
                  className="shop-product-photo"
                />
              </div>

              <div>
                <span className="shop-category-label">
                  {activeProductModal.categoryLabel}
                </span>
                <h3>
                  {activeProductModal.name}
                </h3>
                <p className="shop-tagline">{activeProductModal.tagline}</p>
                <div className="shop-price">
                  ₹{activeProductModal.price.toLocaleString("en-IN")}
                </div>

                <div className="shop-warranty-label">Warranty & Support:</div>
                <div className="shop-warranty">
                  🛡️ {activeProductModal.warranty}
                </div>

                <button
                  onClick={() => {
                    addToCart(activeProductModal, 1);
                    setActiveProductModal(null);
                  }}
                  className="shop-buy-button shop-modal-buy"
                >
                  <ShoppingCart aria-hidden="true" />
                  Add to Cart & Checkout
                </button>
              </div>
            </div>

            {/* Highlights */}
            <div className="shop-highlights">
              <h4>
                Key Features & Highlights
              </h4>
              <ul>
                {activeProductModal.highlights.map((h, i) => (
                  <li key={i}>
                    <CheckCircle2 aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
