"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/admin/settings");
    } else {
      setStatus({ type: "error", message: "Giriş başarısız" });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-80 space-y-4"
      >
        <h1 className="text-lg font-semibold text-center">
          Admin Login
        </h1>

        {status.message && (
          <div
            className={`p-3 rounded text-sm font-medium border
              ${
                status.type === "error"
                  ? "bg-red-500/10 text-red-600 border-red-500/30"
                  : "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
              }`}
          >
            {status.message}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Şifre"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full rounded-lg border border-blue-600 py-2 font-medium text-blue-500 hover:bg-blue-600 hover:text-white transition"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}
