import { getAttachmentPath } from "@/utils/notes";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

interface RouteParams {
  params: Promise<{ subject: string; filename: string }>;
}

export async function GET(_req: Request, { params }: RouteParams) {
  const { subject, filename } = await params;
  const decodedSubject = decodeURIComponent(subject);
  const decodedFilename = decodeURIComponent(filename);

  const notesDir = path.join(process.cwd(), "src/app/collegeNotes/notes");
  const filePath = getAttachmentPath(notesDir, decodedSubject, decodedFilename);

  if (!filePath) {
    return new NextResponse("Not found", { status: 404 });
  }

  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(decodedFilename).toLowerCase().slice(1);

  const mimeTypes: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    avif: "image/avif",
  };

  const contentType = mimeTypes[ext] ?? "application/octet-stream";

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
