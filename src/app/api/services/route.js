export const runtime = "nodejs";

import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });
    return Response.json(services);
  } catch (err) {
    console.error("GET /api/services ERROR", err);
    return new Response(
      JSON.stringify({ error: "services fetch failed" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, description, image = "", features = "", color = "" } = body;

    if (!title || !description) {
      return new Response(
        JSON.stringify({ error: "title ve description zorunlu" }),
        { status: 400 }
      );
    }

    await prisma.service.create({
      data: {
        title,
        description,
        image,
        features,
        color: color || "from-blue-500 to-cyan-500",
      },
    });

    return Response.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("POST /api/services ERROR", err);
    return new Response(
      JSON.stringify({ error: "service create failed" }),
      { status: 500 }
    );
  }
}
