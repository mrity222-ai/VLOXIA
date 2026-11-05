import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const data = await req.json();

    const updated = await prisma.shopBanner.update({
      where: { id },
      data: {
        title: data.title,
        subtitle: data.subtitle || null,
        ctaText: data.ctaText || "Explore the Collections",
        ctaLink: data.ctaLink || "#catalog-grid",
        badge: data.badge || null,
        imageUrl: data.imageUrl,
        sortOrder: Number(data.sortOrder ?? 0),
        isActive: Boolean(data.isActive ?? true),
      },
    });

    return NextResponse.json({ success: true, banner: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.shopBanner.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Banner deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
