import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const clients = await prisma.clientLogo.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ clients });
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

    const { name, logoUrl, websiteUrl, category, sortOrder, isActive } = await req.json();

    if (!name || !logoUrl) {
      return NextResponse.json({ error: "Name and Logo URL are required" }, { status: 400 });
    }

    const created = await prisma.clientLogo.create({
      data: {
        name,
        logoUrl,
        websiteUrl: websiteUrl || null,
        category: category || "TECHNOLOGY_PARTNER",
        sortOrder: Number(sortOrder || 0),
        isActive: Boolean(isActive ?? true),
      },
    });

    return NextResponse.json({ success: true, client: created });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    await prisma.clientLogo.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Logo removed" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
