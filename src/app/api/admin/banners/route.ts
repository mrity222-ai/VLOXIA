import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const banners = await prisma.shopBanner.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ banners });
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

    const { title, subtitle, ctaText, ctaLink, badge, imageUrl, sortOrder, isActive } =
      await req.json();

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: "Banner Title and Image URL are required" },
        { status: 400 }
      );
    }

    const created = await prisma.shopBanner.create({
      data: {
        title,
        subtitle: subtitle || null,
        ctaText: ctaText || "Explore the Collections",
        ctaLink: ctaLink || "#catalog-grid",
        badge: badge || null,
        imageUrl,
        sortOrder: Number(sortOrder || 0),
        isActive: Boolean(isActive ?? true),
      },
    });

    return NextResponse.json({ success: true, banner: created });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
