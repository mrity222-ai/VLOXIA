import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ categories });
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

    const { name, slug, imageUrl, description, sortOrder, isActive } = await req.json();

    if (!name || !imageUrl) {
      return NextResponse.json(
        { error: "Category Name and Image URL are required" },
        { status: 400 }
      );
    }

    const cleanSlug = (slug || name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-");

    const created = await prisma.category.create({
      data: {
        name,
        slug: cleanSlug,
        imageUrl,
        description: description || null,
        sortOrder: Number(sortOrder || 0),
        isActive: Boolean(isActive ?? true),
      },
    });

    return NextResponse.json({ success: true, category: created });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
