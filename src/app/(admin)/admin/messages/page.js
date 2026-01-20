import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const cookieStore = await cookies();
  const admin = cookieStore.get("admin-auth");

  if (!admin) redirect("/admin/login");


  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white mb-1">
          Mesajlar
        </h1>
        <p className="text-zinc-400 text-sm">
          İletişim formundan gelen mesajlar
        </p>
      </div>

      {messages.length === 0 && (
        <div className="text-zinc-500 text-center py-20">
          Henüz mesaj yok.
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {messages.map((m) => (
          <div
            key={m.id}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm hover:border-cyan-500/40 transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-medium text-lg">
                  {m.name}
                </h3>
                <p className="text-zinc-400 text-sm break-all">
                  {m.email}
                </p>
              </div>

              <span className="text-xs text-zinc-500 whitespace-nowrap">
                {new Date(m.createdAt).toLocaleDateString("tr-TR")}
              </span>
            </div>

            <p className="text-zinc-300 text-sm leading-relaxed mb-5">
              {m.message}
            </p>

            <div className="flex gap-4 text-xs text-zinc-400">
              <span>📞 {m.phone || "-"}</span>
              <span>🏢 {m.company || "-"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
