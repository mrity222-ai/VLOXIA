"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { PRODUCTS, Product as StaticProduct } from "../data/products";
import ScrollReveal from "./animations/ScrollReveal";

type FeaturedProductsProps = {
  title?: React.ReactNode;
  eyebrow?: React.ReactNode;
  description?: string;
  productIds?: string[];
  compact?: boolean;
};

export default function FeaturedProducts({
  title = "Explore Our Hardware Catalogue",
  eyebrow = "VLOXIA Hardware Marketplace",
  description = "Browse reliable, tier-1 clean-energy hardware for EV charging, lithium storage, and industrial power.",
  productIds,
  compact = false,
}: FeaturedProductsProps) {
  const [items, setItems] = useState<any[]>(PRODUCTS.slice(0, 4));

  useEffect(() => {
    fetch("/api/products?featured=true")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.products) && data.products.length > 0) {
          if (productIds && productIds.length > 0) {
            const filtered = data.products.filter((p: any) =>
              productIds.includes(p.id) || productIds.includes(p.slug)
            );
            if (filtered.length > 0) {
              setItems(filtered);
              return;
            }
          }
          setItems(data.products.slice(0, 4));
        }
      })
      .catch(() => {});
  }, [productIds]);

  return (
    <section className="py-20 bg-[#060E22] border-t border-blue-900/30 text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Block */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-cyan-300 border border-blue-500/20 mb-3 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{eyebrow}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                <span className="text-shimmer">{title}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl">
                {description}
              </p>
            </div>

            <Link
              href="/shop"
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors shrink-0 group px-4 py-2 rounded-full border border-cyan-500/30 hover:border-cyan-400/60 bg-blue-950/40"
            >
              <span>View Full Marketplace</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Products Grid with Scroll Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product, idx) => (
            <ScrollReveal key={product.id} delay={idx * 0.08}>
              <article className="rounded-2xl border border-blue-900/40 bg-[#091533]/80 backdrop-blur-md p-4 flex flex-col justify-between hover:border-cyan-400/50 hover:bg-[#0c1a3e] hover:shadow-2xl hover:shadow-blue-950/50 transition-all duration-300 group h-full">
                <div>
                  <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-[#050B18] mb-4 border border-blue-950">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {product.badge && (
                      <span className="absolute top-2.5 right-2.5 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-600 text-white shadow-sm">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
                    {product.categoryLabel || product.category}
                  </span>
                  <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-blue-900/30 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-extrabold text-white">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[11px] text-slate-500 line-through ml-2">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/shop/${product.slug || product.id}`}
                    className="p-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-cyan-300 hover:text-white transition-all border border-blue-500/30 hover:border-blue-500"
                    title="View Hardware Specifications"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
