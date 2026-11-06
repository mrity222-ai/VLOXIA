import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const where: any = { isPublished: true };
    if (category && category !== "all") {
      where.category = category;
    }
    if (featured === "true") {
      where.isFeatured = true;
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const parsed = products.map((p) => {
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

      if (images.length === 0 && p.image) {
        images = [p.image];
      }

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        tagline: p.tagline,
        category: p.category,
        categoryLabel: p.categoryLabel,
        price: p.price,
        originalPrice: p.originalPrice,
        rating: p.rating,
        reviewsCount: p.reviewsCount,
        inStock: p.inStock,
        stockQuantity: p.stockQuantity,
        warranty: p.warranty,
        specs,
        highlights,
        image: p.image,
        images,
        badge: p.badge,
        isFeatured: p.isFeatured,
        createdAt: p.createdAt,
      };
    });

    return NextResponse.json({ success: true, products: parsed });
  } catch (error: any) {
    console.error("Public /api/products error:", error);
    return NextResponse.json(
      { success: false, error: error.message, products: [] },
      { status: 500 }
    );
  }
}
