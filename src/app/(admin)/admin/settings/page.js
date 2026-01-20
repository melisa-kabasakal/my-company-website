import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
  const cookieStore = await cookies();

  if (!cookieStore.has("admin-auth")) {
    redirect("/admin/login");
  }
  const settings =
    (await prisma.siteSettings.findFirst()) ??
    (await prisma.siteSettings.create({
      data: { email: "", phone: "", address: "" },
    }));

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-6">
        Ayarlar
      </h1>

      <form action={saveSettings} className="space-y-4">
        <input
          name="email"
          placeholder="E-posta"
          defaultValue={settings.email}
          className="w-full px-3 py-2 rounded border"
        />

        <input
          name="phone"
          placeholder="Telefon"
          defaultValue={settings.phone}
          className="w-full px-3 py-2 rounded border"
        />

        <textarea
          name="address"
          placeholder="Adres"
          defaultValue={settings.address}
          className="w-full px-3 py-2 rounded border"
          rows={4}
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
