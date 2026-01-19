export const dynamic = "force-dynamic";

export default function LoginLayout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {children}
    </div>
  );
}
