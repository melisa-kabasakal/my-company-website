export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import LogoutButton from "@/app/components/LogoutButton";
import prisma from "@/lib/prisma";

async function saveSettings(formData) {
  "use server";

  const email = formData.get("email");
  const phone = formData.get("phone");
  const address = formData.get("address");

  await prisma.siteSettings.updateMany({
    data: { email, phone, address },
  });
}

export default async function SettingsPage() {
  const isAdmin = cookies().get("admin-auth");
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
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">
            Ayarlar
          </h1>
          <p className="text-zinc-400 text-sm">
            Site iletişim ve genel bilgileri
          </p>
        </div>

        <LogoutButton />
      </div>

      {/* CARD */}
      <form
        action={saveSettings}
        className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm"
      >
        {/* EMAIL */}
        <div className="space-y-1">
          <label className="text-sm text-zinc-400">Email</label>
          <input
            name="email"
            defaultValue={settings.email}
            placeholder="info@firma.com"
            className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2 text-zinc-100 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* TELEFON */}
        <div className="space-y-1">
          <label className="text-sm text-zinc-400">Telefon</label>
          <input
            name="phone"
            defaultValue={settings.phone}
            placeholder="+90 5xx xxx xx xx"
            className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2 text-zinc-100 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* ADRES */}
        <div className="space-y-1">
          <label className="text-sm text-zinc-400">Adres</label>
          <textarea
            name="address"
            defaultValue={settings.address}
            placeholder="Firma adresi"
            rows={4}
            className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2 text-zinc-100 focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>

        {/* SAVE */}
        <div className="pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-500 transition"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}
