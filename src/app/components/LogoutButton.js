"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <button
    onClick={handleLogout}
    className="
        rounded-lg
        border border-blue-600
        px-4 py-2
        text-sm font-medium
        text-blue-500
        hover:bg-blue-600
        hover:text-white
        transition
    "
    >
    Çıkış Yap
    </button>

  );
}

