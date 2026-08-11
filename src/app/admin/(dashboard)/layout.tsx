import { AdminNav } from "@/components/admin/admin-nav";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="site-shell py-8 sm:py-10">
      <div className="mb-8 space-y-1">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
          Semente
        </p>
        <h1 className="font-display text-4xl text-brand-deep">Painel</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <AdminNav />
        <div>{children}</div>
      </div>
    </div>
  );
}
