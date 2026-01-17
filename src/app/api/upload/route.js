import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    console.log("UPLOAD ROUTE HIT");

    // ENV kontrolü (çok kritik)
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("CLOUDINARY ENV MISSING");
      return Response.json(
        { error: "Cloudinary env eksik" },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");

    console.log("FORM DATA RECEIVED");
    console.log("FILE:", file?.name, file?.type, file?.size);

    if (!file) {
      return Response.json({ error: "file yok" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log("UPLOADING TO CLOUDINARY");

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "services",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              console.error("CLOUDINARY ERROR:", error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    console.log("CLOUDINARY SUCCESS:", uploadResult.secure_url);

    return Response.json({
      url: uploadResult.secure_url,
    });
  } catch (err) {
    console.error("UPLOAD FAILED:", err);
    return Response.json(
      { error: "Upload failed", details: String(err) },
      { status: 500 }
    );
  }
}
