"use client";
import { useState } from "react";

export default function NewService() {
  const [f, setF] = useState({
    title: "",
    description: "",
    image: "",
    color: "from-blue-500 to-cyan-500",
    features: "",
  });

  const save = async () => {
    if (!f.title || !f.description || !f.color) {
      alert("Başlık, açıklama ve renk zorunlu");
      return;
    }

    await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });

    location.href = "/admin/services";
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl mb-6">Yeni Hizmet</h1>

      <input
        placeholder="Başlık"
        value={f.title}
        onChange={e => setF({ ...f, title: e.target.value })}
      />

      <input
        placeholder="Görsel URL"
        value={f.image}
        onChange={e => setF({ ...f, image: e.target.value })}
      />

      <input
        placeholder="Gradient (ör: from-blue-500 to-cyan-500)"
        value={f.color}
        onChange={e => setF({ ...f, color: e.target.value })}
      />

      <textarea
        placeholder="Açıklama"
        value={f.description}
        onChange={e => setF({ ...f, description: e.target.value })}
      />

      <input
        placeholder="Features (virgülle)"
        value={f.features}
        onChange={e => setF({ ...f, features: e.target.value })}
      />

      <button
        onClick={save}
        className="mt-4 bg-blue-600 px-4 py-2 rounded"
      >
        Kaydet
      </button>
    </div>
  );
}

