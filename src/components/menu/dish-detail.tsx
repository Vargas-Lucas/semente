"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Minus, Plus } from "lucide-react";
import type { Dish, SelectedOption } from "@/lib/types";
import { DIETARY_TAGS } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

type DishDetailProps = {
  dish: Dish;
  categoryName?: string;
};

export function DishDetail({ dish, categoryName }: DishDetailProps) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const initialSelections = useMemo(() => {
    const map: Record<string, string> = {};
    dish.customization_options.forEach((group) => {
      if (group.options[0]) map[group.id] = group.options[0].id;
    });
    return map;
  }, [dish.customization_options]);

  const [selections, setSelections] = useState(initialSelections);

  const selectedOptions: SelectedOption[] = dish.customization_options
    .map((group) => {
      const optionId = selections[group.id];
      const option = group.options.find((o) => o.id === optionId);
      if (!option) return null;
      return {
        groupId: group.id,
        groupLabel: group.label,
        optionId: option.id,
        optionLabel: option.label,
        price: option.price,
      };
    })
    .filter(Boolean) as SelectedOption[];

  const unitPrice =
    dish.price + selectedOptions.reduce((sum, o) => sum + o.price, 0);

  function handleAdd() {
    if (!dish.is_available) return;
    addItem({
      dishId: dish.id,
      title: dish.title,
      imageUrl: dish.image_url,
      unitPrice,
      quantity,
      selectedOptions,
    });
    setAdded(true);
    setTimeout(() => {
      router.push("/carrinho");
    }, 500);
  }

  return (
    <div className="site-shell py-8 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="panel relative aspect-[4/3] overflow-hidden rounded-[2rem] animate-rise">
          {dish.image_url ? (
            <Image
              src={dish.image_url}
              alt={dish.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-surface text-muted">
              Sem imagem
            </div>
          )}
        </div>

        <div className="space-y-6 animate-rise" style={{ animationDelay: "100ms" }}>
          <div className="space-y-2">
            {categoryName && (
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
                {categoryName}
              </p>
            )}
            <h1 className="font-display text-4xl sm:text-5xl text-brand-deep">
              {dish.title}
            </h1>
            <p className="text-lg text-muted">{dish.description}</p>
          </div>

          <p className="font-display text-3xl text-brand">
            {formatCurrency(unitPrice)}
          </p>

          {dish.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {dish.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-accent/70 px-3 py-1 text-xs font-semibold text-accent-ink"
                >
                  {DIETARY_TAGS.find((t) => t.id === tag)?.label ?? tag}
                </span>
              ))}
            </div>
          )}

          <div className="panel rounded-3xl p-5 space-y-3">
            <h2 className="font-semibold">Ingredientes</h2>
            <p className="text-sm text-muted leading-relaxed">
              {dish.ingredients.join(" · ")}
            </p>
          </div>

          {dish.customization_options.map((group) => (
            <fieldset key={group.id} className="space-y-3">
              <legend className="font-semibold">{group.label}</legend>
              <div className="grid gap-2">
                {group.options.map((option) => (
                  <label
                    key={option.id}
                    className="panel flex cursor-pointer items-center justify-between rounded-2xl px-4 py-3 has-[:checked]:border-brand has-[:checked]:bg-white"
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={group.id}
                        checked={selections[group.id] === option.id}
                        onChange={() =>
                          setSelections((prev) => ({
                            ...prev,
                            [group.id]: option.id,
                          }))
                        }
                        className="accent-[var(--brand)]"
                      />
                      {option.label}
                    </span>
                    <span className="text-sm text-muted">
                      {option.price === 0
                        ? "Incluso"
                        : option.price > 0
                          ? `+ ${formatCurrency(option.price)}`
                          : formatCurrency(option.price)}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="inline-flex items-center rounded-full border border-border bg-white/80">
              <button
                type="button"
                className="p-3"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Diminuir quantidade"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-8 text-center font-semibold">{quantity}</span>
              <button
                type="button"
                className="p-3"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Aumentar quantidade"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={!dish.is_available}
              className="btn btn-primary flex-1 min-w-[180px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" /> Adicionado
                </>
              ) : dish.is_available ? (
                `Adicionar · ${formatCurrency(unitPrice * quantity)}`
              ) : (
                "Esgotado"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
