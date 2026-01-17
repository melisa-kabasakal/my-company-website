"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminServicesPage() {
  const [form, setForm] = useState({
    title: { tr: "", en: "" },
    description: { tr: "", en: "" },
    features: { tr: "", en: "" },
    image: "",
  });

  const fileRef = useRef(null);


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
      alert("Lütfen Türkçe ve İngilizce alanların tamamını doldurun");
      return;
    }

    await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
  };

  return (
    <div className="p-8 max-w-5xl space-y-8">
      <h1 className="text-2xl font-bold">Hizmet Ekle (TR | EN)</h1>

      <div className="space-y-2 max-w-md">
        {form.image && (
          <img
            src={form.image}
            className="h-32 rounded object-cover border"
          />
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h2 className="font-semibold text-lg">🇹🇷 Türkçe</h2>

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
            placeholder="Özellikler (virgülle) (TR)"
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
          <h2 className="font-semibold text-lg">🇬🇧 English</h2>

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
            placeholder="Features (comma separated) (EN)"
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
        Hizmet Ekle
      </button>
    </div>
  );
}
