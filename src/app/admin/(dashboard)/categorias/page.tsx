"use client";

import { useEffect, useState } from "react";
import type { Category } from "@/lib/types";
import {
  deleteCategory,
  getCategories,
  upsertCategory,
} from "@/lib/menu-api";
import { isSupabaseConfigured, slugify } from "@/lib/utils";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [editing, setEditing] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setCategories(await getCategories());
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await upsertCategory({
        id: editing?.id,
        name: name.trim(),
        slug: slugify(name),
        sort_order: Number(sortOrder) || 0,
      });
      setName("");
      setSortOrder("0");
      setEditing(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir esta categoria?")) return;
    try {
      await deleteCategory(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir");
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl">Categorias</h2>
        <p className="text-sm text-muted">Organize o cardápio</p>
      </div>

      {!isSupabaseConfigured() && (
        <p className="rounded-2xl bg-surface px-4 py-3 text-sm text-muted">
          Configure o Supabase para criar/editar/excluir categorias.
        </p>
      )}

      <form onSubmit={handleSubmit} className="panel rounded-3xl p-5 space-y-3 max-w-xl">
        <div>
          <label className="label" htmlFor="cat-name">
            Nome
          </label>
          <input
            id="cat-name"
            className="input"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Entradas"
          />
        </div>
        <div>
          <label className="label" htmlFor="cat-order">
            Ordem
          </label>
          <input
            id="cat-order"
            className="input"
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          />
        </div>
        {error && (
          <p className="text-sm text-danger bg-danger/10 rounded-xl px-3 py-2">
            {error}
          </p>
        )}
        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary !py-2.5">
            {editing ? "Atualizar" : "Criar categoria"}
          </button>
          {editing && (
            <button
              type="button"
              className="btn btn-ghost !py-2.5"
              onClick={() => {
                setEditing(null);
                setName("");
                setSortOrder("0");
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-muted">Carregando…</p>
      ) : (
        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="panel rounded-2xl px-4 py-3 flex items-center justify-between gap-3"
            >
              <div>
                <p className="font-semibold">{category.name}</p>
                <p className="text-xs text-muted">
                  /{category.slug} · ordem {category.sort_order}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="btn btn-ghost !px-3 !py-2 text-sm"
                  onClick={() => {
                    setEditing(category);
                    setName(category.name);
                    setSortOrder(String(category.sort_order));
                  }}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="btn btn-danger !px-3 !py-2 text-sm"
                  onClick={() => void handleDelete(category.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
