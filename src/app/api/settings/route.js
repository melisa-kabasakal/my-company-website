import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();

  const email = formData.get("email");
  const phone = formData.get("phone");
  const address = formData.get("address");

  await prisma.siteSettings.updateMany({
    data: { email, phone, address },
  });

  return NextResponse.redirect(
    new URL("/admin/settings", req.url)
  );
}
