"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Category, Dish } from "@/lib/types";
import { DIETARY_TAGS } from "@/lib/types";
import { cn, formatCurrency } from "@/lib/utils";

type MenuExplorerProps = {
  categories: Category[];
  dishes: Dish[];
};

export function MenuExplorer({ categories, dishes }: MenuExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return dishes.filter((dish) => {
      const categoryOk =
        activeCategory === "all" || dish.category_id === activeCategory;
      const tagsOk =
        activeTags.length === 0 ||
        activeTags.every((tag) => dish.tags.includes(tag));
      return categoryOk && tagsOk;
    });
  }, [dishes, activeCategory, activeTags]);

  const grouped = useMemo(() => {
    return categories
      .map((category) => ({
        category,
        dishes: filtered.filter((dish) => dish.category_id === category.id),
      }))
      .filter((group) => group.dishes.length > 0);
  }, [categories, filtered]);

  function toggleTag(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-semibold border transition",
            activeCategory === "all"
              ? "bg-brand text-white border-brand"
              : "bg-white/70 border-border hover:bg-white",
          )}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold border transition",
              activeCategory === category.id
                ? "bg-brand text-white border-brand"
                : "bg-white/70 border-border hover:bg-white",
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {DIETARY_TAGS.map((tag) => (
          <button
            key={tag.id}
            type="button"
            onClick={() => toggleTag(tag.id)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold border transition",
              activeTags.includes(tag.id)
                ? "bg-accent text-accent-ink border-accent"
                : "bg-transparent border-border text-muted hover:bg-white/70",
            )}
          >
            {tag.label}
          </button>
        ))}
      </div>

      {grouped.length === 0 ? (
        <div className="panel rounded-3xl p-10 text-center text-muted">
          Nenhum prato encontrado com esses filtros.
        </div>
      ) : (
        grouped.map(({ category, dishes: categoryDishes }, index) => (
          <section
            key={category.id}
            className="animate-rise space-y-4"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="flex items-end justify-between gap-3">
              <h2 className="font-display text-3xl text-brand-deep">
                {category.name}
              </h2>
              <span className="text-sm text-muted">
                {categoryDishes.length}{" "}
                {categoryDishes.length === 1 ? "prato" : "pratos"}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoryDishes.map((dish) => (
                <Link
                  key={dish.id}
                  href={`/prato/${dish.id}`}
                  className="group panel overflow-hidden rounded-[1.5rem] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(20,38,28,0.12)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                    {dish.image_url ? (
                      <Image
                        src={dish.image_url}
                        alt={dish.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-muted">
                        Sem imagem
                      </div>
                    )}
                    {!dish.is_available && (
                      <span className="absolute left-3 top-3 rounded-full bg-brand-deep/85 px-3 py-1 text-xs font-semibold text-white">
                        Esgotado
                      </span>
                    )}
                  </div>
                  <div className="space-y-3 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl leading-tight">
                        {dish.title}
                      </h3>
                      <span className="shrink-0 font-semibold text-brand">
                        {formatCurrency(dish.price)}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-sm text-muted">
                      {dish.description}
                    </p>
                    {dish.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {dish.tags.slice(0, 3).map((tag) => {
                          const label =
                            DIETARY_TAGS.find((t) => t.id === tag)?.label ?? tag;
                          return (
                            <span
                              key={tag}
                              className="rounded-full bg-surface px-2 py-0.5 text-[11px] font-medium text-muted"
                            >
                              {label}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
