export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import LogoutButton from "@/app/components/LogoutButton";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-zinc-950 text-zinc-100">
      
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-zinc-800 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-8">Admin Panel</h2>

          <nav className="space-y-3">
            <a
              href="/admin/services"
              className="block text-zinc-300 hover:text-white"
            >
              Hizmetler
            </a>
            <a
              href="/admin/messages"
              className="block text-zinc-300 hover:text-white"
            >
              Mesajlar
            </a>
            <a
              href="/admin/settings"
              className="block text-zinc-300 hover:text-white"
            >
              Ayarlar
            </a>
          </nav>
        </div>
        <LogoutButton />
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}
