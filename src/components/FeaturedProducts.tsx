import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";

type FeaturedProductsProps = {
  title?: string;
  eyebrow?: string;
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
    <section className={`bg-white ${compact ? "py-10" : "py-16 sm:py-24"} border-t border-slate-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{eyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              {title}
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              {description}
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow-md flex-shrink-0"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <article
              key={product.id}
              className="group rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Product Image Box */}
                <Link
                  href="/shop"
                  aria-label={`View ${product.name}`}
                  className="relative block w-full h-56 sm:h-60 bg-slate-50 border-b border-slate-100 overflow-hidden"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                      {product.badge}
                    </span>
                  )}
                </Link>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
                    {product.categoryLabel}
                  </span>
                  <h3 className="text-base font-bold text-slate-950 group-hover:text-blue-600 transition-colors line-clamp-1">
                    <Link href="/shop">{product.name}</Link>
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>
                </div>
              </div>

              {/* Bottom Price & Shop Button */}
              <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                <div className="text-base font-extrabold text-slate-950">
                  ₹{product.price.toLocaleString("en-IN")}
                </div>
                <Link
                  href="/shop"
                  aria-label={`Shop ${product.name}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold text-xs transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
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
