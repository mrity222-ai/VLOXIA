import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    const where: any = { isPublished: true };
    if (category && category !== "all") {
      where.category = category;
    }
    if (featured === "true") {
      where.isFeatured = true;
    }

    let products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    // Fallback: If featured=true was asked but returned fewer items than requested limit,
    // fill the remaining slots with latest active published products from DB
    if (featured === "true" && limit && products.length < limit) {
      const existingIds = products.map((p) => p.id);
      const remainingSlots = limit - products.length;

      const additional = await prisma.product.findMany({
        where: {
          isPublished: true,
          id: { notIn: existingIds },
        },
        orderBy: { createdAt: "desc" },
        take: remainingSlots,
      });

      products = [...products, ...additional];
    }

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
        isPublished: p.isPublished,
        createdAt: p.createdAt,
      };
    });

    return new NextResponse(JSON.stringify({ success: true, products: parsed }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error: any) {
    console.error("Public /api/products error:", error);
    return NextResponse.json(
      { success: false, error: error.message, products: [] },
      { status: 500 }
    );
  }
}
