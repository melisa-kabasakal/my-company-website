import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const { name, email, phone, company, message } = await request.json();

    if (!name || !email || !phone || !message) {
      return Response.json(
        { error: "Zorunlu alanlar eksik" },
        { status: 400 }
      );
    }

    const saved = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        company,
        message,
      },
    });

    return Response.json({ success: true, saved }, { status: 201 });

  } catch (err) {
    console.error("API ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
