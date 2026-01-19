import { cookies } from "next/headers";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin-auth");

  return (
    <div className="min-h-screen flex bg-zinc-950 text-zinc-100">

      {/* SIDEBAR – SADECE ADMIN VARSA */}
      {isAdmin && (
        <aside className="w-64 border-r border-zinc-800 p-6">
          <h2 className="text-xl font-semibold mb-8">Admin Panel</h2>

          <nav className="space-y-3">
            <Link href="/admin/services" className="block text-zinc-300 hover:text-white">
              Hizmetler
            </Link>
            <Link href="/admin/messages" className="block text-zinc-300 hover:text-white">
              Mesajlar
            </Link>
            <Link href="/admin/settings" className="block text-zinc-300 hover:text-white">
              Ayarlar
            </Link>
          </nav>
        </aside>
      )}

      {/* CONTENT */}
      <main className="flex-1 p-10">
        {children}
      </main>

    </div>
  );
}
