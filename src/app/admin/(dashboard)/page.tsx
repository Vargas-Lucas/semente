"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Order, OrderStatus } from "@/lib/types";
import { ORDER_STATUS_LABELS, PAYMENT_METHOD_LABELS } from "@/lib/types";
import { getOrders, updateOrderStatus } from "@/lib/menu-api";
import { createClient } from "@/lib/supabase/client";
import { formatCurrency, isSupabaseConfigured } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STATUS_FLOW: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "delivered",
  "cancelled",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadOrders() {
    try {
      const data = await getOrders();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar pedidos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadOrders();

    if (!isSupabaseConfigured()) {
      const interval = setInterval(() => void loadOrders(), 3000);
      return () => clearInterval(interval);
    }

    const supabase = createClient();
    const channel = supabase
      .channel("orders-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => {
          void loadOrders();
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "order_items" },
        () => {
          void loadOrders();
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  async function handleStatusChange(id: string, status: OrderStatus) {
    await updateOrderStatus(id, status);
    await loadOrders();
  }

  if (loading) {
    return <p className="text-muted">Carregando pedidos…</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl">Pedidos em tempo real</h2>
          <p className="text-sm text-muted">
            {isSupabaseConfigured()
              ? "Atualizações via Supabase Realtime"
              : "Modo demo — sincroniza pelo navegador"}
          </p>
        </div>
        <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-ink">
          {orders.length} pedidos
        </span>
      </div>

      {error && (
        <p className="rounded-2xl bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      {orders.length === 0 ? (
        <div className="panel rounded-3xl p-8 text-center text-muted">
          Nenhum pedido ainda. Assim que chegarem, aparecem aqui.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <article key={order.id} className="panel rounded-3xl p-5 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl">{order.customer_name}</h3>
                  <p className="text-sm text-muted">
                    {order.customer_phone} · {order.address_or_table}
                  </p>
                  <p className="text-xs text-muted mt-1">
                    {formatDistanceToNow(new Date(order.created_at), {
                      addSuffix: true,
                      locale: ptBR,
                    })}{" "}
                    · {PAYMENT_METHOD_LABELS[order.payment_method]}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl text-brand">
                    {formatCurrency(Number(order.total_amount))}
                  </p>
                  <span
                    className={cn(
                      "inline-flex mt-1 rounded-full px-2.5 py-1 text-xs font-semibold",
                      order.status === "cancelled"
                        ? "bg-danger/10 text-danger"
                        : "bg-surface text-brand",
                    )}
                  >
                    {ORDER_STATUS_LABELS[order.status]}
                  </span>
                </div>
              </div>

              <ul className="space-y-1 text-sm">
                {(order.order_items ?? []).map((item) => (
                  <li key={item.id} className="flex justify-between gap-3">
                    <span>
                      {item.quantity}× {item.dish_title}
                    </span>
                    <span className="text-muted">
                      {formatCurrency(Number(item.unit_price) * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {STATUS_FLOW.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => void handleStatusChange(order.id, status)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                      order.status === status
                        ? "bg-brand text-white border-brand"
                        : "bg-white/70 border-border hover:bg-white",
                    )}
                  >
                    {ORDER_STATUS_LABELS[status]}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
