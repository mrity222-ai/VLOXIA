import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const partners = await prisma.clientLogo.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ partners });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
