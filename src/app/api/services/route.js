export const runtime = "nodejs";

import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany();
    return new Response(JSON.stringify(services), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("SERVICES GET ERROR:", e);
    return new Response(
      JSON.stringify({ error: "internal error" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, description, image = "", features = "", color = "" } = body;

    await prisma.service.create({
      data: {
        title,
        description,
        image,
        features,
        color,
      },
    });

    return new Response(JSON.stringify({ ok: true }), { status: 201 });
  } catch (e) {
    console.error("SERVICES POST ERROR:", e);
    return new Response(
      JSON.stringify({ error: "internal error" }),
      { status: 500 }
    );
  }
}
