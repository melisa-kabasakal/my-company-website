export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import LogoutButton from "@/app/components/LogoutButton";

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
  const cookie = headers().get("cookie") || "";
  const isAdmin = cookie.includes("admin-auth=true");

  if (!isAdmin) {
    redirect("/admin/login");
  }

  const settings =
    (await prisma.siteSettings.findFirst()) ??
    (await prisma.siteSettings.create({
      data: { email: "", phone: "", address: "" },
    }));

  return (
    <div className="max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Ayarlar</h1>
          <p className="text-zinc-400 text-sm">Site iletişim ve genel bilgileri</p>
        </div>
        <LogoutButton />
      </div>

      <form
        action={saveSettings}
        className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"
      >
        <input name="email" defaultValue={settings.email} />
        <input name="phone" defaultValue={settings.phone} />
        <textarea name="address" defaultValue={settings.address} />

        <button type="submit">Kaydet</button>
      </form>
    </div>
  );
}
