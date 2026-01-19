export const dynamic = "force-dynamic";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {children}
    </div>
  );
}
