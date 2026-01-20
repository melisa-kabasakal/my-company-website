export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

async function saveSettings(formData) {
  "use server";

  await prisma.siteSettings.updateMany({
    data: {
      companyName: formData.get("companyName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      linkedin: formData.get("linkedin"),
      instagram: formData.get("instagram"),
      footerText: formData.get("footerText"),
    },
  });
}

export default async function SettingsPage() {
  const cookieStore = await cookies();

  if (!cookieStore.get("admin-auth")) {
    redirect("/admin/login");
  }

  const settings =
    (await prisma.siteSettings.findFirst()) ??
    (await prisma.siteSettings.create({
      data: {
        companyName: "",
        email: "",
        phone: "",
        address: "",
        linkedin: "",
        instagram: "",
        footerText: "",
      },
    }));

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold">Ayarlar</h1>

      <form action={saveSettings} className="space-y-4">
        <input
          name="companyName"
          placeholder="Firma Adı"
          defaultValue={settings.companyName}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="email"
          placeholder="E-posta"
          defaultValue={settings.email}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="phone"
          placeholder="Telefon"
          defaultValue={settings.phone}
          className="w-full border px-3 py-2 rounded"
        />

        <textarea
          name="address"
          placeholder="Adres"
          defaultValue={settings.address}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="linkedin"
          placeholder="LinkedIn URL"
          defaultValue={settings.linkedin}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="instagram"
          placeholder="Instagram URL"
          defaultValue={settings.instagram}
          className="w-full border px-3 py-2 rounded"
        />

        <textarea
          name="footerText"
          placeholder="Footer açıklaması"
          defaultValue={settings.footerText}
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="px-4 py-2 rounded bg-black text-white"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
}