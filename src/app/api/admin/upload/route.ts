import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "general";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate MIME type (images only)
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/svg+xml",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only image files (PNG, JPG, WEBP, SVG, GIF) are allowed" },
        { status: 400 }
      );
    }

    // Limit to 10MB
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Image file exceeds maximum allowed size of 10MB" },
        { status: 400 }
      );
    }

    // Sanitize folder name to prevent path traversal
    const safeFolder = folder.replace(/[^a-zA-Z0-9_-]/g, "");

    // Prepare target directory in public/uploads/<safeFolder>
    const uploadsDir = path.join(process.cwd(), "public", "uploads", safeFolder);
    await fs.mkdir(uploadsDir, { recursive: true });

    // Generate safe, collision-free filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || ".png";
    const baseName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-zA-Z0-9_-]/g, "-")
      .slice(0, 40);

    const uniqueFileName = `${Date.now()}-${baseName}${ext}`;
    const filePath = path.join(uploadsDir, uniqueFileName);

    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${safeFolder}/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: uniqueFileName,
      size: file.size,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}
