"use client";

import { useEffect, useState, useRef } from "react";

const UI_TEXT = {
  tr: {
    title: "Hizmetler",
    add: "Hizmet Ekle",
    titlePh: "Başlık",
    descPh: "Açıklama",
    featPh: "Özellikler (virgülle)",
    imgUrl: "Görsel URL (opsiyonel)",
    required: "Başlık ve açıklama zorunlu",
    delete: "Sil",
    edit: "Düzenle",
    confirm: "silinsin mi?",
  },
  en: {
    title: "Services",
    add: "Add Service",
    titlePh: "Title",
    descPh: "Description",
    featPh: "Features (comma separated)",
    imgUrl: "Image URL (optional)",
    required: "Title and description are required",
    delete: "Delete",
    edit: "Edit",
    confirm: "should be deleted?",
  },
};

export default function AdminServicesPage() {
  const [lang, setLang] = useState("tr");
  const t = UI_TEXT[lang];

  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    title: { tr: "", en: "" },
    description: { tr: "", en: "" },
    features: { tr: "", en: "" },
    image: "",
  });

  const fileRef = useRef(null);

  const load = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data);
  };

  useEffect(() => {
    load();
  }, []);

  const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    if (data?.url) {
      setForm((p) => ({ ...p, image: data.url }));
    }
  };

  const submit = async () => {
    if (!form.title.tr || !form.title.en || !form.description.tr || !form.description.en) {
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

    load();
  };

  return (
    <div className="space-y-10 p-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t.title}</h1>

        {/* DİL SEÇİCİ */}
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
      </div>

      {/* FORM (AYNI ARAYÜZ) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl bg-zinc-900/60 p-6 rounded-xl border border-zinc-800">
        <input
          placeholder={t.titlePh}
          value={form.title[lang]}
          onChange={(e) =>
            setForm({
              ...form,
              title: { ...form.title, [lang]: e.target.value },
            })
          }
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
            onClick={() => fileRef.current.click()}
            className="border border-dashed border-zinc-700 rounded-lg p-4 text-center cursor-pointer bg-zinc-950"
          >
            Görsel sürükle-bırak veya tıkla
          </div>

          {/* ❗ GÖRSEL URL INPUTU BURADA – KALDIRILMADI */}
          <input
            type="text"
            placeholder={t.imgUrl}
            value={form.image}
            onChange={(e) =>
              setForm({ ...form, image: e.target.value })
            }
            className="border border-zinc-800 bg-zinc-950 p-2 rounded w-full mt-2"
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
          placeholder={t.descPh}
          value={form.description[lang]}
          onChange={(e) =>
            setForm({
              ...form,
              description: { ...form.description, [lang]: e.target.value },
            })
          }
          className="border border-zinc-800 bg-zinc-950 p-2 rounded col-span-full"
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
          className="border border-zinc-800 bg-zinc-950 p-2 rounded col-span-full"
        />

        <button
          onClick={submit}
          className="bg-cyan-600 hover:bg-cyan-500 transition text-white py-2 rounded col-span-full"
        >
          {t.add}
        </button>
      </div>
    </div>
  );
}
