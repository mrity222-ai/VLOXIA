import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ services });
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

    const { title, category, subtitle, description, points } = await req.json();

    if (!title || !category || !description) {
      return NextResponse.json(
        { error: "Title, Category and Description are required" },
        { status: 400 }
      );
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const created = await prisma.service.create({
      data: {
        title,
        slug,
        category,
        subtitle: subtitle || null,
        description,
        pointsJson: typeof points === "string" ? points : JSON.stringify(points || []),
        isVisible: true,
      },
    });

    return NextResponse.json({ success: true, service: created });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
