export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

async function saveSettings(formData) {
  "use server";

  await prisma.siteSettings.updateMany({
    data: {
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
    },
  });
}

export default async function SettingsPage() {
  if (!cookies().has("admin-auth")) {
    redirect("/admin/login");
  }

  const settings =
    (await prisma.siteSettings.findFirst()) ??
    (await prisma.siteSettings.create({
      data: { email: "", phone: "", address: "" },
    }));

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-6">Ayarlar</h1>

      <form action={saveSettings} className="space-y-4">
        <input name="email" defaultValue={settings.email} />
        <input name="phone" defaultValue={settings.phone} />
        <textarea name="address" defaultValue={settings.address} />

        <button type="submit">Kaydet</button>
      </form>
    </div>
  );
}
