import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return Response.json({ error: "file yok" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public/uploads");

  await mkdir(uploadDir, { recursive: true });

  const filename = `${Date.now()}-${file.name}`;
  const uploadPath = path.join(uploadDir, filename);

  await writeFile(uploadPath, buffer);

  return Response.json({
    url: `/uploads/${filename}`,
  });
}
