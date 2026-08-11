"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, Tags, UtensilsCrossed } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn, isSupabaseConfigured } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Pedidos", icon: LayoutDashboard },
  { href: "/admin/pratos", label: "Pratos", icon: UtensilsCrossed },
  { href: "/admin/categorias", label: "Categorias", icon: Tags },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="panel rounded-[1.75rem] p-4 h-fit sticky top-24 space-y-2">
      <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        Administração
      </p>
      {links.map(({ href, label, icon: Icon }) => {
        const active =
          href === "/admin" ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 rounded-2xl px-3 py-2.5 text-sm font-semibold transition",
              active
                ? "bg-brand text-white"
                : "hover:bg-white/80 text-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
      <button
        type="button"
        onClick={handleLogout}
        className="flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-sm font-semibold text-muted hover:bg-white/80"
      >
        <LogOut className="h-4 w-4" />
        Sair
      </button>
    </aside>
  );
}
