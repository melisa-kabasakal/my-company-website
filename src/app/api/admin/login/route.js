import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const response = NextResponse.json({ success: true });

    response.cookies.set("admin-auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });


    return response;
  }

  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 }
  );
}
