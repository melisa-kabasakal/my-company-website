"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditService() {
  const { id } = useParams();
  const [f, setF] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/services/${id}`)
      .then(async (r) => (r.ok ? r.json() : null))
      .then((data) => data && setF(data));
  }, [id]);

  if (!f) return null;

  const save = async () => {
    await fetch(`/api/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });
    location.href = "/admin/services";
  };

  const del = async () => {
    if (!confirm("Silinsin mi?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    location.href = "/admin/services";
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Hizmet Düzenle</h1>

      <div className="space-y-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Başlık</label>
          <input
            className="w-full rounded-lg bg-zinc-950 border border-zinc-800 p-3"
            value={f.title}
            onChange={(e) => setF({ ...f, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">Görsel URL</label>
          <input
            className="w-full rounded-lg bg-zinc-950 border border-zinc-800 p-3"
            value={f.image || ""}
            onChange={(e) => setF({ ...f, image: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">Gradient</label>
          <input
            className="w-full rounded-lg bg-zinc-950 border border-zinc-800 p-3"
            value={f.color || ""}
            onChange={(e) => setF({ ...f, color: e.target.value })}
            placeholder="from-blue-500 to-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">Açıklama</label>
          <textarea
            className="w-full rounded-lg bg-zinc-950 border border-zinc-800 p-3 min-h-[120px]"
            value={f.description}
            onChange={(e) => setF({ ...f, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">
            Özellikler (virgülle)
          </label>
          <input
            className="w-full rounded-lg bg-zinc-950 border border-zinc-800 p-3"
            value={f.features || ""}
            onChange={(e) => setF({ ...f, features: e.target.value })}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={save}
            className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-lg text-white"
          >
            Kaydet
          </button>
          <button
            onClick={del}
            className="bg-red-600 hover:bg-red-500 transition px-6 py-3 rounded-lg text-white"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}
