import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="site-shell py-24 text-center text-muted">
          Carregando…
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
