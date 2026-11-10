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

    // Process up to 5 images if provided
    let primaryImage: string | undefined = undefined;
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
      primaryImage = data.image;
      imagesJson = JSON.stringify([data.image]);
    }

    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.tagline !== undefined) updateData.tagline = data.tagline;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.categoryLabel !== undefined) updateData.categoryLabel = data.categoryLabel;
    if (data.price !== undefined) updateData.price = Number(data.price);
    if (data.originalPrice !== undefined)
      updateData.originalPrice = data.originalPrice ? Number(data.originalPrice) : null;
    if (data.stockQuantity !== undefined) updateData.stockQuantity = Number(data.stockQuantity);
    if (data.inStock !== undefined) updateData.inStock = Boolean(data.inStock);
    if (data.warranty !== undefined) updateData.warranty = data.warranty;
    if (primaryImage !== undefined) updateData.image = primaryImage;
    if (imagesJson !== undefined) updateData.imagesJson = imagesJson;
    if (data.badge !== undefined) updateData.badge = data.badge || null;
    if (data.isPublished !== undefined) updateData.isPublished = Boolean(data.isPublished);
    if (data.isFeatured !== undefined) updateData.isFeatured = Boolean(data.isFeatured);

    const updated = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    console.error("PUT /api/admin/products/[id] error:", error);
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
    console.error("DELETE /api/admin/products/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
