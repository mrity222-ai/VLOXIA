import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    if (!data.name || !data.category || !data.price) {
      return NextResponse.json(
        { error: "Name, Category and Price are required" },
        { status: 400 }
      );
    }

    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    // Process up to 5 images
    const rawImages: string[] = Array.isArray(data.images)
      ? data.images.filter((img: any) => typeof img === "string" && img.trim() !== "")
      : data.image
      ? [data.image]
      : [];

    const primaryImage =
      rawImages[0] ||
      data.image ||
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80";

    const imagesJson = JSON.stringify(
      rawImages.length > 0 ? rawImages.slice(0, 5) : [primaryImage]
    );

    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        slug,
        tagline: data.tagline || "",
        category: data.category,
        categoryLabel: data.categoryLabel || data.category,
        price: Number(data.price),
        originalPrice: data.originalPrice ? Number(data.originalPrice) : null,
        stockQuantity: Number(data.stockQuantity || 10),
        inStock: Boolean(data.inStock ?? true),
        warranty: data.warranty || "Standard OEM Warranty",
        specsJson: typeof data.specs === "string" ? data.specs : JSON.stringify(data.specs || {}),
        highlightsJson: typeof data.highlights === "string" ? data.highlights : JSON.stringify(data.highlights || []),
        image: primaryImage,
        imagesJson,
        badge: data.badge || null,
        isPublished: Boolean(data.isPublished ?? true),
        isFeatured: Boolean(data.isFeatured ?? false),
      },
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
