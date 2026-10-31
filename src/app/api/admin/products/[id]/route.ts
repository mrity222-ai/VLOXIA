import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const data = await req.json();

    // Process up to 5 images
    let primaryImage = data.image;
    let imagesJson: string | undefined = undefined;

    if (Array.isArray(data.images)) {
      const validImages = data.images.filter(
        (img: any) => typeof img === "string" && img.trim() !== ""
      );
      if (validImages.length > 0) {
        primaryImage = validImages[0];
        imagesJson = JSON.stringify(validImages.slice(0, 5));
      }
    } else if (data.image) {
      imagesJson = JSON.stringify([data.image]);
    }

    const updateData: any = {
      name: data.name,
      tagline: data.tagline,
      category: data.category,
      categoryLabel: data.categoryLabel,
      price: Number(data.price),
      originalPrice: data.originalPrice ? Number(data.originalPrice) : null,
      stockQuantity: Number(data.stockQuantity || 0),
      inStock: Boolean(data.inStock),
      warranty: data.warranty,
      image: primaryImage,
      badge: data.badge || null,
      isPublished: Boolean(data.isPublished),
      isFeatured: Boolean(data.isFeatured),
    };

    if (imagesJson !== undefined) {
      updateData.imagesJson = imagesJson;
    }

    const updated = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
