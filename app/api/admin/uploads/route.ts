import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { requireApiRole } from "@/lib/api-auth";
import { writeAuditLog } from "@/lib/audit-log";

const MAX_FILE_SIZE = 8 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

export async function POST(request: Request) {
  const auth = await requireApiRole(["super_admin", "admin", "content_editor", "bookings_manager"]);

  if (!auth.ok) {
    return auth.response;
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  const extension = ALLOWED_MIME_TYPES.get(file.type);

  if (!extension) {
    return NextResponse.json({ error: "Unsupported file type." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File is too large. Maximum size is 8 MB." }, { status: 400 });
  }

  const uploadDirectory = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDirectory, { recursive: true });

  const filename = `${Date.now()}-${randomUUID()}${extension}`;
  const outputPath = path.join(uploadDirectory, filename);
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(outputPath, buffer);

  await writeAuditLog({
    action: "media.uploaded",
    actorUserId: auth.user._id,
    actorEmail: auth.user.email,
    targetCollection: "uploads",
    targetId: filename,
    metadata: {
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
    },
  });

  return NextResponse.json({ url: `/uploads/${filename}` });
}
