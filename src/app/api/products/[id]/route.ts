import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Search by either ID or slug
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
        isPublished: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found or unpublished" },
        { status: 404 }
      );
    }

    let specs = {};
    let highlights: string[] = [];
    let images: string[] = [];

    try {
      specs = JSON.parse(product.specsJson || "{}");
    } catch (e) {}
    try {
      highlights = JSON.parse(product.highlightsJson || "[]");
    } catch (e) {}
    try {
      images = JSON.parse(product.imagesJson || "[]");
    } catch (e) {}

    if (images.length === 0 && product.image) {
      images = [product.image];
    }

    const parsed = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      tagline: product.tagline,
      category: product.category,
      categoryLabel: product.categoryLabel,
      price: product.price,
      originalPrice: product.originalPrice,
      rating: product.rating,
      reviewsCount: product.reviewsCount,
      inStock: product.inStock,
      stockQuantity: product.stockQuantity,
      warranty: product.warranty,
      specs,
      highlights,
      image: product.image,
      images,
      badge: product.badge,
      isFeatured: product.isFeatured,
      createdAt: product.createdAt,
    };

    return NextResponse.json({ success: true, product: parsed });
  } catch (error: any) {
    console.error("Public /api/products/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
