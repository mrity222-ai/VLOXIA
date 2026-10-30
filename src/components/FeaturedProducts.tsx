import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
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
    ? productIds.map((id) => PRODUCTS.find((product) => product.id === id)).filter((product): product is Product => Boolean(product))
    : PRODUCTS.slice(0, 4);

  return (
    <section className={`featured-products${compact ? " featured-products-compact" : ""}`}>
      <div className="featured-products-inner">
        <div className="featured-products-heading">
          <div>
            <p className="featured-products-eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
            <p className="featured-products-description">{description}</p>
          </div>
          <Link className="featured-products-all" href="/shop">
            View all products <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="featured-products-grid">
          {items.map((product) => (
            <article className="featured-product-card" key={product.id}>
              <Link className="featured-product-image" href="/shop" aria-label={`View ${product.name}`}>
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 84vw, (max-width: 1000px) 42vw, 24vw" />
                {product.badge && <span className="featured-product-badge">{product.badge}</span>}
              </Link>
              <div className="featured-product-content">
                <span className="featured-product-category">{product.categoryLabel}</span>
                <h3><Link href="/shop">{product.name}</Link></h3>
                <p>{product.tagline}</p>
                <div className="featured-product-bottom">
                  <strong>₹{product.price.toLocaleString("en-IN")}</strong>
                  <Link href="/shop" aria-label={`Shop ${product.name}`}><ShoppingBag aria-hidden="true" /> Shop</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
