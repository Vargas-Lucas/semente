"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { Dish } from "@/lib/types";
import { deleteDish, getDishes } from "@/lib/menu-api";
import { formatCurrency, isSupabaseConfigured } from "@/lib/utils";

export default function AdminDishesPage() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const data = await getDishes({ includeUnavailable: true });
    setDishes(data);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Excluir o prato "${title}"?`)) return;
    try {
      await deleteDish(id);
      await load();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Erro ao excluir");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl">Pratos</h2>
          <p className="text-sm text-muted">CRUD completo do cardápio</p>
        </div>
        <Link href="/admin/pratos/novo" className="btn btn-primary !py-2.5">
          <Plus className="h-4 w-4" />
          Novo prato
        </Link>
      </div>

      {!isSupabaseConfigured() && (
        <p className="rounded-2xl bg-surface px-4 py-3 text-sm text-muted">
          Sem Supabase configurado: a listagem usa dados demo. Para criar,
          editar e excluir de verdade, configure o `.env.local`.
        </p>
      )}

      {message && (
        <p className="rounded-2xl bg-danger/10 px-4 py-3 text-sm text-danger">
          {message}
        </p>
      )}

      {loading ? (
        <p className="text-muted">Carregando…</p>
      ) : (
        <div className="space-y-2">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="panel rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3"
            >
              <div>
                <p className="font-semibold">{dish.title}</p>
                <p className="text-sm text-muted">
                  {formatCurrency(dish.price)} ·{" "}
                  {dish.is_available ? "Disponível" : "Esgotado"}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/pratos/${dish.id}`}
                  className="btn btn-ghost !px-3 !py-2 text-sm"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Editar
                </Link>
                <button
                  type="button"
                  onClick={() => void handleDelete(dish.id, dish.title)}
                  className="btn btn-danger !px-3 !py-2 text-sm"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
