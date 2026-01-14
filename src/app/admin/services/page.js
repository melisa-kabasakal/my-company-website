"use client";

import { useEffect, useState, useRef } from "react";

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    features: "",
  });

  const fileRef = useRef(null);

  // SERVİSLERİ YÜKLE
  const load = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data);
  };

  useEffect(() => {
    load();
  }, []);

  // GÖRSEL UPLOAD
  const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    if (data?.url) {
      setForm((prev) => ({ ...prev, image: data.url }));
    }
  };

  // YENİ HİZMET EKLE
  const submit = async () => {
    if (!form.title || !form.description) {
      alert("Başlık ve açıklama zorunlu");
      return;
    }

    await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ title: "", description: "", image: "", features: "" });
    load();
  };

  // HİZMET SİL
  const deleteService = async (id, title) => {
    if (!confirm(`"${title}" silinsin mi?`)) return;

    const res = await fetch(`/api/services?id=${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Silme başarısız");
      return;
    }

    load();
  };

  return (
    <div className="space-y-10 p-8">
      <h1 className="text-2xl font-bold">Hizmetler</h1>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl bg-zinc-900/60 p-6 rounded-xl border border-zinc-800">
        <input
          placeholder="Başlık"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border border-zinc-800 bg-zinc-950 p-2 rounded"
        />

        {/* GÖRSEL */}
        <div className="col-span-full">
          {form.image && (
            <img
              src={form.image}
              className="h-32 rounded-lg object-cover mb-2 border border-zinc-800"
            />
          )}

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              if (file) uploadImage(file);
            }}
            onClick={() => fileRef.current.click()}
            className="border border-dashed border-zinc-700 rounded-lg p-4 text-center cursor-pointer bg-zinc-950"
          >
            <p className="text-sm text-zinc-400">
              Görsel sürükle-bırak veya tıkla
            </p>
          </div>

          <input
            type="text"
            placeholder="Görsel URL (opsiyonel)"
            value={form.image}
            onChange={(e) =>
              setForm({ ...form, image: e.target.value })
            }
            className="border border-zinc-800 bg-zinc-950 p-2 rounded w-full mb-2"
          />


          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadImage(file);
            }}
          />
        </div>

        <textarea
          placeholder="Açıklama"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="border border-zinc-800 bg-zinc-950 p-2 rounded col-span-full"
        />

        <textarea
          placeholder="Özellikler (virgülle)"
          value={form.features}
          onChange={(e) =>
            setForm({ ...form, features: e.target.value })
          }
          className="border border-zinc-800 bg-zinc-950 p-2 rounded col-span-full"
        />

        <button
          onClick={submit}
          className="bg-cyan-600 hover:bg-cyan-500 transition text-white py-2 rounded col-span-full"
        >
          Hizmet Ekle
        </button>
      </div>

      {/* LİSTE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s) => (
          <div
            key={s.id}
            className="border border-zinc-800 p-4 rounded bg-zinc-900/40"
          >
            <p className="text-xs text-zinc-500 mb-1">
              ID: {s.id}
            </p>

            {s.image && (
              <img
                src={s.image}
                className="h-32 w-full object-cover rounded mb-2"
              />
            )}

            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm text-zinc-400 mb-3">
              {s.description}
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => deleteService(s.id, s.title)}
                className="text-sm text-red-500"
              >
                Sil
              </button>

              <a
                href={`/admin/services/edit/${s.id}`}
                className="text-sm text-blue-500"
              >
                Düzenle
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
