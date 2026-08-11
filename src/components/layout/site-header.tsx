"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Leaf, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const totalItems = useCartStore((s) => s.totalItems);
  const [mounted, setMounted] = useState(false);
  const count = mounted ? totalItems() : 0;

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-[#f3f6f1]/80 backdrop-blur-xl">
      <div className="site-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand text-accent transition-transform group-hover:rotate-[-8deg]">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="font-display text-2xl tracking-tight text-brand-deep">
            Semente
          </span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3 text-sm font-medium">
          <Link
            href="/#cardapio"
            className="hidden sm:inline-flex px-3 py-2 rounded-full hover:bg-white/60 transition"
          >
            Cardápio
          </Link>
          <Link
            href="/admin"
            className="hidden sm:inline-flex px-3 py-2 rounded-full hover:bg-white/60 transition text-muted"
          >
            Admin
          </Link>
          <Link
            href="/carrinho"
            className={cn(
              "btn btn-accent relative !px-3.5 !py-2.5",
              count > 0 && "shadow-[0_8px_20px_rgba(198,242,77,0.45)]",
            )}
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Carrinho</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
