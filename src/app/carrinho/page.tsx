"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { PaymentMethod } from "@/lib/types";
import { PAYMENT_METHOD_LABELS } from "@/lib/types";
import { createOrder } from "@/lib/menu-api";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const totalAmount = useCartStore((s) => s.totalAmount);
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    customer_name: "",
    customer_phone: "",
    address_or_table: "",
    payment_method: "pix" as PaymentMethod,
    notes: "",
  });

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="site-shell py-16 text-muted">Carregando carrinho…</div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    setError(null);

    try {
      const result = await createOrder({
        ...form,
        total_amount: totalAmount(),
        items: items.map((item) => ({
          dish_id: item.dishId,
          dish_title: item.title,
          quantity: item.quantity,
          unit_price: item.unitPrice,
          selected_options: item.selectedOptions,
        })),
      });
      clear();
      router.push(`/pedido/sucesso?id=${result.id}${result.demo ? "&demo=1" : ""}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar pedido");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="site-shell py-10 sm:py-14 space-y-8">
      <div className="space-y-2 animate-rise">
        <h1 className="font-display text-4xl sm:text-5xl text-brand-deep">
          Seu pedido
        </h1>
        <p className="text-muted">
          Revise os itens e finalize com seus dados.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="panel rounded-3xl p-10 text-center space-y-4">
          <p className="text-muted">Seu carrinho está vazio.</p>
          <Link href="/#cardapio" className="btn btn-primary">
            Voltar ao cardápio
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3 animate-rise">
            {items.map((item) => (
              <article
                key={item.key}
                className="panel rounded-3xl p-4 flex gap-4 items-start"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-surface">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : null}
                </div>
                <div className="flex-1 space-y-2 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-display text-xl">{item.title}</h2>
                      {item.selectedOptions.length > 0 && (
                        <p className="text-xs text-muted mt-1">
                          {item.selectedOptions
                            .map((o) => o.optionLabel)
                            .join(" · ")}
                        </p>
                      )}
                    </div>
                    <p className="font-semibold text-brand shrink-0">
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="inline-flex items-center rounded-full border border-border bg-white/80">
                      <button
                        type="button"
                        className="p-2"
                        onClick={() =>
                          updateQuantity(item.key, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-7 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="p-2"
                        onClick={() =>
                          updateQuantity(item.key, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.key)}
                      className="btn btn-danger !px-3 !py-2 text-sm"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remover
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="panel rounded-[2rem] p-6 space-y-4 h-fit animate-rise sticky top-24"
            style={{ animationDelay: "80ms" }}
          >
            <h2 className="font-display text-2xl">Finalizar</h2>

            <div>
              <label className="label" htmlFor="customer_name">
                Nome
              </label>
              <input
                id="customer_name"
                className="input"
                required
                value={form.customer_name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, customer_name: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="label" htmlFor="customer_phone">
                Telefone
              </label>
              <input
                id="customer_phone"
                className="input"
                required
                placeholder="(11) 99999-9999"
                value={form.customer_phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, customer_phone: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="label" htmlFor="address_or_table">
                Endereço ou mesa
              </label>
              <input
                id="address_or_table"
                className="input"
                required
                placeholder="Mesa 12 ou Rua Exemplo, 100"
                value={form.address_or_table}
                onChange={(e) =>
                  setForm((f) => ({ ...f, address_or_table: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="label" htmlFor="payment_method">
                Forma de pagamento
              </label>
              <select
                id="payment_method"
                className="select"
                value={form.payment_method}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    payment_method: e.target.value as PaymentMethod,
                  }))
                }
              >
                {Object.entries(PAYMENT_METHOD_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label" htmlFor="notes">
                Observações
              </label>
              <textarea
                id="notes"
                className="textarea min-h-24"
                value={form.notes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
              />
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-muted">Total</span>
              <span className="font-display text-3xl text-brand">
                {formatCurrency(totalAmount())}
              </span>
            </div>

            {error && (
              <p className="text-sm text-danger bg-danger/10 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary w-full disabled:opacity-60"
            >
              {submitting ? "Enviando…" : "Confirmar pedido"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
