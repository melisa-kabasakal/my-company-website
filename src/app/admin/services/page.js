"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";

const UI_TEXT = {
  tr: {
    title: "Hizmetler",
    add: "Hizmet Ekle",
    titlePh: "Başlık",
    descPh: "Açıklama",
    featPh: "Özellikler (virgülle)",
    imgUrl: "Görsel URL (opsiyonel)",
    required: "Başlık ve açıklama zorunlu",
  },
  en: {
    title: "Services",
    add: "Add Service",
    titlePh: "Title",
    descPh: "Description",
    featPh: "Features (comma separated)",
    imgUrl: "Image URL (optional)",
    required: "Title and description are required",
  },
};

export default function AdminServicesPage() {
  const [lang, setLang] = useState("tr");
  const t = UI_TEXT[lang];

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
      alert(t.required);
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
    <div className="p-8 max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">{t.title}</h1>
      <div className="flex gap-2">
        {["tr", "en"].map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-4 py-1 rounded ${
              lang === l
                ? "bg-cyan-600 text-white"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <input
        placeholder={t.titlePh}
        value={form.title[lang]}
        onChange={(e) =>
          setForm({ ...form, title: { ...form.title, [lang]: e.target.value } })
        }
        className="w-full p-2 border rounded"
      />

      {/* IMAGE */}
      {form.image && (
        <img src={form.image} className="h-32 object-cover rounded" />
      )}

      <div
        onClick={() => fileRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (file) uploadImage(file);
        }}
        className="p-4 border-dashed border text-center cursor-pointer"
      >
        Görsel sürükle-bırak veya tıkla
      </div>

      <input
        type="text"
        placeholder={t.imgUrl}
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

      <textarea
        placeholder={t.descPh}
        value={form.description[lang]}
        onChange={(e) =>
          setForm({
            ...form,
            description: { ...form.description, [lang]: e.target.value },
          })
        }
        className="w-full p-2 border rounded"
      />

      <textarea
        placeholder={t.featPh}
        value={form.features[lang]}
        onChange={(e) =>
          setForm({
            ...form,
            features: { ...form.features, [lang]: e.target.value },
          })
        }
        className="w-full p-2 border rounded"
      />

      <button
        onClick={submit}
        className="bg-cyan-600 text-white py-2 rounded"
      >
        {t.add}
      </button>
    </div>
  );
}
