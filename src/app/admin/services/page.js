"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: { tr: "", en: "" },
    description: { tr: "", en: "" },
    features: { tr: "", en: "" },
    image: "",
  });

  const fileRef = useRef(null);

  const loadServices = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const uploadImage = async (file) => {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;
    const filePath = `services/${fileName}`;

    const { error } = await supabase.storage
      .from("services")
      .upload(filePath, file);

    if (error) {
      alert("Görsel yüklenemedi");
      return;
    }

    const { data } = supabase.storage
      .from("services")
      .getPublicUrl(filePath);

    setForm((p) => ({ ...p, image: data.publicUrl }));
  };

  const submit = async () => {
    if (
      !form.title.tr ||
      !form.title.en ||
      !form.description.tr ||
      !form.description.en
    ) {
      alert("Türkçe ve İngilizce alanların tamamını doldur");
      return;
    }

    await fetch("/api/services", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingId,
        title: JSON.stringify(form.title),
        description: JSON.stringify(form.description),
        features: JSON.stringify(form.features),
        image: form.image,
      }),
    });

    setForm({
      title: { tr: "", en: "" },
      description: { tr: "", en: "" },
      features: { tr: "", en: "" },
      image: "",
    });

    setEditingId(null);
    loadServices();
  };

  const editService = (s) => {
    setEditingId(s.id);
    setForm({
      title: JSON.parse(s.title),
      description: JSON.parse(s.description),
      features: JSON.parse(s.features),
      image: s.image || "",
    });
  };

  const deleteService = async (id) => {
    if (!confirm("Silinsin mi?")) return;
    await fetch(`/api/services?id=${id}`, { method: "DELETE" });
    loadServices();
  };

  return (
    <div className="p-8 max-w-6xl space-y-10">
      <h1 className="text-2xl font-bold">
        {editingId ? "Hizmeti Düzenle" : "Hizmet Ekle"}
      </h1>

      <div className="space-y-2 max-w-md">
        {form.image && (
          <img src={form.image} className="h-32 rounded object-cover border" />
        )}

        <div
          onClick={() => fileRef.current.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) uploadImage(file);
          }}
          className="border border-dashed p-4 text-center cursor-pointer"
        >
          Görsel sürükle-bırak veya tıkla
        </div>

        <input
          type="text"
          placeholder="Görsel URL (opsiyonel)"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full p-2 border rounded"
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

      {/* TR | EN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TR */}
        <div className="space-y-3">
          <h2 className="font-semibold text-lg">Türkçe</h2>

          <input
            placeholder="Başlık (TR)"
            value={form.title.tr}
            onChange={(e) =>
              setForm({
                ...form,
                title: { ...form.title, tr: e.target.value },
              })
            }
            className="w-full p-2 border rounded"
          />

          <textarea
            placeholder="Açıklama (TR)"
            value={form.description.tr}
            onChange={(e) =>
              setForm({
                ...form,
                description: { ...form.description, tr: e.target.value },
              })
            }
            className="w-full p-2 border rounded"
          />

          <textarea
            placeholder="Özellikler (TR)"
            value={form.features.tr}
            onChange={(e) =>
              setForm({
                ...form,
                features: { ...form.features, tr: e.target.value },
              })
            }
            className="w-full p-2 border rounded"
          />
        </div>


        <div className="space-y-3">
          <h2 className="font-semibold text-lg">English</h2>

          <input
            placeholder="Title (EN)"
            value={form.title.en}
            onChange={(e) =>
              setForm({
                ...form,
                title: { ...form.title, en: e.target.value },
              })
            }
            className="w-full p-2 border rounded"
          />

          <textarea
            placeholder="Description (EN)"
            value={form.description.en}
            onChange={(e) =>
              setForm({
                ...form,
                description: { ...form.description, en: e.target.value },
              })
            }
            className="w-full p-2 border rounded"
          />

          <textarea
            placeholder="Features (EN)"
            value={form.features.en}
            onChange={(e) =>
              setForm({
                ...form,
                features: { ...form.features, en: e.target.value },
              })
            }
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <button
        onClick={submit}
        className="bg-cyan-600 hover:bg-cyan-500 transition text-white py-2 px-6 rounded"
      >
        {editingId ? "Güncelle" : "Hizmet Ekle"}
      </button>

      <hr />

      <h2 className="text-xl font-semibold">Eklenen Hizmetler</h2>

      <div className="space-y-3">
        {services.map((s) => (
          <div
            key={s.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div>
              {JSON.parse(s.title).tr} / {JSON.parse(s.title).en}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => editService(s)}
                className="bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Düzenle
              </button>

              <button
                onClick={() => deleteService(s.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
