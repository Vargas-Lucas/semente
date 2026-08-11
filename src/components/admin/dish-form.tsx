"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Category, CustomizationOption } from "@/lib/types";
import { DIETARY_TAGS } from "@/lib/types";
import { getCategories, getDishById, upsertDish } from "@/lib/menu-api";
import { cn } from "@/lib/utils";

type DishFormProps = {
  dishId?: string;
};

const emptyDish = {
  title: "",
  description: "",
  ingredientsText: "",
  price: "",
  image_url: "",
  category_id: "",
  is_available: true,
  tags: [] as string[],
  customizationJson: "[]",
};

export function DishForm({ dishId }: DishFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState(emptyDish);
  const [loading, setLoading] = useState(Boolean(dishId));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function boot() {
      const cats = await getCategories();
      setCategories(cats);

      if (!dishId) {
        setForm((f) => ({
          ...f,
          category_id: cats[0]?.id ?? "",
        }));
        setLoading(false);
        return;
      }

      const dish = await getDishById(dishId);
      if (!dish) {
        setError("Prato não encontrado");
        setLoading(false);
        return;
      }

      setForm({
        title: dish.title,
        description: dish.description,
        ingredientsText: dish.ingredients.join(", "),
        price: String(dish.price),
        image_url: dish.image_url ?? "",
        category_id: dish.category_id,
        is_available: dish.is_available,
        tags: dish.tags,
        customizationJson: JSON.stringify(dish.customization_options, null, 2),
      });
      setLoading(false);
    }

    void boot();
  }, [dishId]);

  function toggleTag(tag: string) {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tag)
        ? f.tags.filter((t) => t !== tag)
        : [...f.tags, tag],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      let customization_options: CustomizationOption[] = [];
      try {
        customization_options = JSON.parse(form.customizationJson) as CustomizationOption[];
      } catch {
        throw new Error("JSON de personalização inválido");
      }

      await upsertDish({
        ...(dishId ? { id: dishId } : {}),
        title: form.title.trim(),
        description: form.description.trim(),
        ingredients: form.ingredientsText
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
        price: Number(form.price),
        image_url: form.image_url.trim() || null,
        category_id: form.category_id,
        is_available: form.is_available,
        tags: form.tags,
        customization_options,
      });
      router.push("/admin/pratos");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-muted">Carregando formulário…</p>;

  return (
    <form onSubmit={handleSubmit} className="panel rounded-[2rem] p-6 space-y-4 max-w-2xl">
      <div>
        <label className="label" htmlFor="title">
          Título
        </label>
        <input
          id="title"
          className="input"
          required
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        />
      </div>

      <div>
        <label className="label" htmlFor="description">
          Descrição
        </label>
        <textarea
          id="description"
          className="textarea min-h-28"
          required
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="price">
            Preço (R$)
          </label>
          <input
            id="price"
            className="input"
            type="number"
            min="0"
            step="0.01"
            required
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
          />
        </div>
        <div>
          <label className="label" htmlFor="category_id">
            Categoria
          </label>
          <select
            id="category_id"
            className="select"
            required
            value={form.category_id}
            onChange={(e) =>
              setForm((f) => ({ ...f, category_id: e.target.value }))
            }
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="ingredients">
          Ingredientes (separados por vírgula)
        </label>
        <input
          id="ingredients"
          className="input"
          value={form.ingredientsText}
          onChange={(e) =>
            setForm((f) => ({ ...f, ingredientsText: e.target.value }))
          }
        />
      </div>

      <div>
        <label className="label" htmlFor="image_url">
          URL da imagem
        </label>
        <input
          id="image_url"
          className="input"
          value={form.image_url}
          onChange={(e) =>
            setForm((f) => ({ ...f, image_url: e.target.value }))
          }
        />
      </div>

      <div>
        <p className="label">Tags</p>
        <div className="flex flex-wrap gap-2">
          {DIETARY_TAGS.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => toggleTag(tag.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold",
                form.tags.includes(tag.id)
                  ? "bg-accent border-accent text-accent-ink"
                  : "bg-white/70 border-border",
              )}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-3 text-sm font-semibold">
        <input
          type="checkbox"
          checked={form.is_available}
          onChange={(e) =>
            setForm((f) => ({ ...f, is_available: e.target.checked }))
          }
          className="accent-[var(--brand)]"
        />
        Disponível no cardápio
      </label>

      <div>
        <label className="label" htmlFor="customization">
          Opções de personalização (JSON)
        </label>
        <textarea
          id="customization"
          className="textarea min-h-40 font-mono text-xs"
          value={form.customizationJson}
          onChange={(e) =>
            setForm((f) => ({ ...f, customizationJson: e.target.value }))
          }
        />
      </div>

      {error && (
        <p className="rounded-xl bg-danger/10 px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={saving}>
        {saving ? "Salvando…" : dishId ? "Atualizar prato" : "Criar prato"}
      </button>
    </form>
  );
}
