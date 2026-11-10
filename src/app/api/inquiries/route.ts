import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ inquiries });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.fullName || !data.phone) {
      return NextResponse.json(
        { error: "Name and Phone number are required" },
        { status: 400 }
      );
    }

    const newInquiry = await prisma.inquiry.create({
      data: {
        type: data.type || "GENERAL",
        fullName: data.fullName,
        phone: data.phone,
        email: data.email || null,
        solution: data.solution || null,
        customerType: data.customerType || null,
        city: data.city || null,
        companyName: data.companyName || null,
        message: data.message || "Request for consultation / quote",
        status: "NEW",
      },
    });

    return NextResponse.json({ success: true, inquiry: newInquiry });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, status, notes } = await req.json();

    const updated = await prisma.inquiry.update({
      where: { id },
      data: {
        status: status || undefined,
        notes: notes || undefined,
      },
    });

    return NextResponse.json({ success: true, inquiry: updated });
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
    await prisma.inquiry.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Lead removed" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
