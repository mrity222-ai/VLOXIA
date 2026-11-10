"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Sparkles, ShieldCheck } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";

type FeaturedProductsProps = {
  title?: React.ReactNode;
  eyebrow?: string;
  description?: string;
  productIds?: string[];
  limit?: number;
};

export default function FeaturedProducts({
  title = "Featured Clean Energy Equipment",
  eyebrow = "Live Marketplace",
  description = "Browse popular Tier-1 commercial EV chargers, solar packages, and lithium batteries.",
  productIds,
  limit = 3,
}: FeaturedProductsProps) {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchLiveProducts = useCallback(async () => {
    try {
      const res = await fetch(`/api/products?featured=true&limit=${limit}`, {
        cache: "no-store",
        headers: { "Pragma": "no-cache", "Cache-Control": "no-cache" },
      });
      const data = await res.json();
      if (data?.success && Array.isArray(data.products) && data.products.length > 0) {
        if (productIds && productIds.length > 0) {
          const filtered = data.products.filter((p: any) =>
            productIds.includes(p.id) || productIds.includes(p.slug)
          );
          if (filtered.length > 0) {
            setItems(filtered.slice(0, limit));
            return;
          }
        }
        setItems(data.products.slice(0, limit));
      }
    } catch (e) {
      console.error("Failed to load real-time marketplace products:", e);
    } finally {
      setIsLoading(false);
    }
  }, [limit, productIds]);

  useEffect(() => {
    fetchLiveProducts();

    // Auto-refresh when tab gains focus to reflect real-time admin changes
    const onFocus = () => fetchLiveProducts();
    window.addEventListener("focus", onFocus);

    // Periodic 30s background sync
    const interval = setInterval(fetchLiveProducts, 30000);

    return () => {
      window.removeEventListener("focus", onFocus);
      clearInterval(interval);
    };
  }, [fetchLiveProducts]);

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Block */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-950 tracking-tight">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl">
                {description}
              </p>
            </div>

            <Link
              href="/shop"
              className="text-xs font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1.5 transition-colors shrink-0 group"
            >
              <span className="underline-hover-effect">View Full Catalog</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </ScrollReveal>

        {/* 3-Column Real-time Products Grid */}
        {isLoading && items.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-2xl border border-gray-100 bg-slate-50 p-6 h-96 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {items.map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 0.1}>
                <article className="card-hover-effect lift-effect shadow-hover-effect rounded-2xl border border-gray-200/90 bg-slate-50/60 p-5 flex flex-col justify-between hover:border-blue-400 hover:shadow-xl transition-all duration-300 group h-full">
                  <div>
                    <Link
                      href={`/shop/${product.slug || product.id}`}
                      className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-white mb-4 border border-gray-100 flex items-center justify-center block"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      {product.badge && (
                        <span className="absolute top-2.5 left-2.5 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                          {product.badge}
                        </span>
                      )}
                      {product.warranty && (
                        <span className="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                          <ShieldCheck className="w-3 h-3 text-blue-400" />
                          <span>{product.warranty}</span>
                        </span>
                      )}
                    </Link>

                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                      {product.categoryLabel || product.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors duration-200">
                      <Link href={`/shop/${product.slug || product.id}`}>{product.name}</Link>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Bottom Price & Shop Button */}
                  <div className="pt-4 mt-5 border-t border-gray-200/70 flex items-center justify-between">
                    <div>
                      <div className="text-base font-extrabold text-slate-950 font-mono">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </div>
                      {product.originalPrice && (
                        <div className="text-[11px] text-slate-400 line-through font-mono">
                          ₹{Number(product.originalPrice).toLocaleString("en-IN")}
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/shop/${product.slug || product.id}`}
                      aria-label={`Shop ${product.name}`}
                      className="btn-hover-effect glow-hover-blue inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order Unit</span>
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
