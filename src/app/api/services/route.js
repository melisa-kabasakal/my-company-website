export const runtime = "nodejs";

import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });

    return Response.json(services);
  } catch (e) {
    console.error("SERVICES GET ERROR:", e);
    return Response.json([], { status: 200 });
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

    return Response.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error("SERVICES POST ERROR:", e);
    return Response.json({ error: "internal error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();

    const id = Number(body.id);
    if (!id) {
      return Response.json({ error: "id required" }, { status: 400 });
    }

    const {
      title,
      description,
      image = "",
      features = "",
      color = "",
    } = body;

    await prisma.service.update({
      where: { id },
      data: {
        title,
        description,
        image,
        features,
        color,
      },
    });

    return Response.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error("SERVICES PUT ERROR:", e);
    return Response.json({ error: "internal error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    let id;

    const { searchParams } = new URL(req.url);
    const queryId = searchParams.get("id");

    if (queryId) {
      id = Number(queryId);
    } else {
      const body = await req.json();
      id = Number(body.id);
    }

    if (!id) {
      return Response.json({ error: "id required" }, { status: 400 });
    }

    await prisma.service.delete({
      where: { id },
    });

    return Response.json({ ok: true });
  } catch (e) {
    console.error("SERVICES DELETE ERROR:", e);
    return Response.json({ error: "internal error" }, { status: 500 });
  }
}

