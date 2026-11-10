import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

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

    const cleanSlug = data.slug
      ? data.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-")
      : undefined;

    const updated = await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        ...(cleanSlug ? { slug: cleanSlug } : {}),
        imageUrl: data.imageUrl,
        description: data.description || null,
        sortOrder: Number(data.sortOrder ?? 0),
        isActive: Boolean(data.isActive ?? true),
      },
    });

    return NextResponse.json({ success: true, category: updated });
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
    await prisma.category.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Category deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
