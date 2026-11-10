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
    const { name, logoUrl, websiteUrl, category, sortOrder, isActive } = await req.json();

    const updated = await prisma.clientLogo.update({
      where: { id },
      data: {
        name,
        logoUrl,
        websiteUrl: websiteUrl || null,
        category: category || "TECHNOLOGY_PARTNER",
        sortOrder: Number(sortOrder ?? 0),
        isActive: Boolean(isActive ?? true),
      },
    });

    return NextResponse.json({ success: true, client: updated });
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
    await prisma.clientLogo.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Logo removed" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
