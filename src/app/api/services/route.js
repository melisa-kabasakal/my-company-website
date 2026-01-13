import prisma from "@/lib/prisma";

export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
  });
  return Response.json(services);
}

export async function POST(req) {
  const body = await req.json();

  const {
    title,
    description,
    image = "",
    features = "",
  } = body;

  const featuresString = Array.isArray(features)
    ? features.join(", ")
    : features;

  if (!title || !description) {
    return Response.json(
      { error: "title ve description zorunlu" },
      { status: 400 }
    );
  }

  await prisma.service.create({
    data: {
      title,
      description,
      image,
      features: featuresString,
      color: "from-blue-500 to-cyan-500",
    },
  });

  return Response.json({ ok: true }, { status: 201 });
}

export async function PUT(req) {
  const body = await req.json();

  const {
    id,
    title,
    description,
    image = "",
    features = "",
    color = "from-blue-500 to-cyan-500",
  } = body;

  if (!id) {
    return Response.json(
      { error: "id zorunlu" },
      { status: 400 }
    );
  }

  const featuresString = Array.isArray(features)
    ? features.join(", ")
    : features;

  await prisma.service.update({
    where: { id: Number(id) },
    data: {
      title,
      description,
      image,
      features: featuresString,
      color,
    },
  });

  return Response.json({ ok: true });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json(
      { error: "id zorunlu" },
      { status: 400 }
    );
  }

  await prisma.service.delete({
    where: { id: Number(id) },
  });

  return Response.json({ ok: true });
}
