import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  const { id } = await params;

  if (!id) {
    return Response.json({ error: "id yok" }, { status: 400 });
  }

  const service = await prisma.service.findUnique({
    where: { id: Number(id) },
  });

  if (!service) {
    return Response.json({ error: "Bulunamadı" }, { status: 404 });
  }

  return Response.json(service);
}

export async function PUT(request, { params }) {
  const { id } = await params;

  if (!id) {
    return Response.json({ error: "id yok" }, { status: 400 });
  }

  const body = await request.json();

  await prisma.service.update({
    where: { id: Number(id) },
    data: body,
  });

  return Response.json({ ok: true });
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  if (!id) {
    return Response.json({ error: "id yok" }, { status: 400 });
  }

  await prisma.service.delete({
    where: { id: Number(id) },
  });

  return Response.json({ ok: true });
}
