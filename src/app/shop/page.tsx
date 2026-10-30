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
    <main >
      {/* ── HERO BANNER ── */}
      <section >
        <div  />
        <div  />

        <div >
          <div >
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
          <div >
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
      <section >
        <div >
          {/* Category Tabs */}
          <div  role="tablist" aria-label="Product categories">
            {[
              { id: "all", label: "All Hardware" },
              { id: "ev-charging", label: "⚡ EV Chargers (AC/DC)" },
              { id: "battery-storage", label: "🔋 Lithium Batteries" },
              { id: "power-solar", label: "☀️ Inverters & Solar" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Floating Cart Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            
          >
            <ShoppingCart aria-hidden="true" />
            <span>Cart ({totalItems})</span>
            <span ></span>
            <span>View & Checkout ↗</span>
          </button>
        </div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section >
        <div >
          <div >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                
              >
                {/* Image & Badge */}
                <div >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    
                  />
                  {product.badge && (
                    <div >
                      {product.badge}
                    </div>
                  )}
                  <div >
                    <Star aria-hidden="true" />
                    <span>{product.rating}</span>
                    <span>({product.reviewsCount})</span>
                  </div>
                </div>

                {/* Content */}
                <div >
                  <div>
                    <div >
                      {product.categoryLabel}
                    </div>
                    <h3>
                      {product.name}
                    </h3>
                    <p >
                      {product.tagline}
                    </p>

                    {/* Key Specs Pill */}
                    <div >
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
                  <div >
                    <div >
                      <span >
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {product.originalPrice && (
                        <span >
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                      <span >
                        Incl. 18% GST
                      </span>
                    </div>

                    <div >
                      <button
                        onClick={() => setActiveProductModal(product)}
                        
                      >
                        <Info aria-hidden="true" />
                        Details
                      </button>
                      <button
                        onClick={() => addToCart(product, 1)}
                        
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
      <section >
        <div >
          <div >
            <div>
              <div >
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
              
            >
              Request B2B Quote <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── QUICK VIEW / DETAILS MODAL ── */}
      {activeProductModal && (
        <div >
          <div
            
            onClick={() => setActiveProductModal(null)}
          />

          <div >
            <button
              onClick={() => setActiveProductModal(null)}
              
            >
              ✕
            </button>

            <div >
              <div >
                <Image
                  src={activeProductModal.image}
                  alt={activeProductModal.name}
                  fill
                  
                />
              </div>

              <div>
                <span >
                  {activeProductModal.categoryLabel}
                </span>
                <h3>
                  {activeProductModal.name}
                </h3>
                <p >{activeProductModal.tagline}</p>
                <div >
                  ₹{activeProductModal.price.toLocaleString("en-IN")}
                </div>

                <div >Warranty & Support:</div>
                <div >
                  🛡️ {activeProductModal.warranty}
                </div>

                <button
                  onClick={() => {
                    addToCart(activeProductModal, 1);
                    setActiveProductModal(null);
                  }}
                  
                >
                  <ShoppingCart aria-hidden="true" />
                  Add to Cart & Checkout
                </button>
              </div>
            </div>

            {/* Highlights */}
            <div >
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
