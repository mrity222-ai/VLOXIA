import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";

type FeaturedProductsProps = {
  title?: React.ReactNode;
  eyebrow?: React.ReactNode;
  description?: string;
  productIds?: string[];
  compact?: boolean;
};

export default function FeaturedProducts({
  title = "Explore Our Products",
  eyebrow = "VLOXIA Marketplace",
  description = "Browse reliable clean-energy products for charging, storage and power.",
  productIds,
  compact = false,
}: FeaturedProductsProps) {
  const items = productIds
    ? productIds
        .map((id) => PRODUCTS.find((product) => product.id === id))
        .filter((product): product is Product => Boolean(product))
    : PRODUCTS.slice(0, 4);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{eyebrow}</span>
            </div>
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
            <span className="underline-hover-effect">View All Products</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <article
              key={product.id}
              className="card-hover-effect lift-effect shadow-hover-effect rounded-2xl border border-gray-200/80 bg-slate-50/50 p-4 flex flex-col justify-between hover:border-blue-400 hover:bg-white hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                {/* Product Image Box with Zoom & Overlay */}
                <Link
                  href="/shop"
                  aria-label={`View ${product.name}`}
                  className="img-zoom-container block relative w-full h-48 rounded-xl overflow-hidden bg-gray-100 mb-4"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="img-zoom-target object-cover group-hover:scale-108 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="img-overlay-effect absolute inset-0 bg-blue-900/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-[10px] font-bold text-slate-800 px-2.5 py-1 rounded-full shadow-xs">
                      {product.badge}
                    </span>
                  )}
                </Link>

                {/* Content */}
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                    {product.categoryLabel}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors duration-200">
                    <Link href="/shop">{product.name}</Link>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>
                </div>
              </div>

              {/* Bottom Price & Shop Button */}
              <div className="pt-4 mt-4 border-t border-gray-200/60 flex items-center justify-between">
                <div className="text-sm font-extrabold text-slate-950">
                  ₹{product.price.toLocaleString("en-IN")}
                </div>
                <Link
                  href="/shop"
                  aria-label={`Shop ${product.name}`}
                  className="btn-hover-effect glow-hover-blue inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white hover:bg-blue-600 text-xs font-semibold shadow-xs hover:shadow-md transition-all active:scale-95"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>Shop</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
