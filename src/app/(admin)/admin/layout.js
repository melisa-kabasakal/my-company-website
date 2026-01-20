export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }) {
  const cookie = headers().get("cookie") || "";

  if (!cookie.includes("admin-auth=true")) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-zinc-950 text-zinc-100">
      <aside className="w-64 border-r border-zinc-800 p-6">
        <h2 className="text-xl font-semibold mb-8">Admin Panel</h2>

        <nav className="space-y-3">
          <a href="/admin/services">Hizmetler</a>
          <a href="/admin/messages">Mesajlar</a>
          <a href="/admin/settings">Ayarlar</a>
        </nav>
      </aside>

      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
