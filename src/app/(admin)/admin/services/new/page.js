"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminServicesPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch("/api/admin/check")
      .then((r) => {
        if (!r.ok) router.replace("/admin/login");
        else setChecked(true);
      })
      .catch(() => router.replace("/admin/login"));
  }, [router]);

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
    if (checked) loadServices();
  }, [checked]);

  const uploadImage = async (file) => {
    const { supabase } = await import("@/lib/supabase");

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

  if (!checked) return null;

  return (
    <div className="p-8 max-w-6xl">
      ADMIN SERVICES ÇALIŞIYOR
    </div>
  );
}
