"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, SelectedOption } from "@/lib/types";

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "key" | "quantity"> & { quantity?: number }) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clear: () => void;
  totalItems: () => number;
  totalAmount: () => number;
};

function buildKey(dishId: string, selectedOptions: SelectedOption[]) {
  const optionsKey = selectedOptions
    .map((o) => `${o.groupId}:${o.optionId}`)
    .sort()
    .join("|");
  return `${dishId}::${optionsKey}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const key = buildKey(item.dishId, item.selectedOptions);
        const quantity = item.quantity ?? 1;
        set((state) => {
          const existing = state.items.find((i) => i.key === key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return {
            items: [...state.items, { ...item, key, quantity }],
          };
        });
      },
      removeItem: (key) =>
        set((state) => ({
          items: state.items.filter((item) => item.key !== key),
        })),
      updateQuantity: (key, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.key !== key)
              : state.items.map((item) =>
                  item.key === key ? { ...item, quantity } : item,
                ),
        })),
      clear: () => set({ items: [] }),
      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
      totalAmount: () =>
        get().items.reduce(
          (sum, item) => sum + item.unitPrice * item.quantity,
          0,
        ),
    }),
    { name: "semente-cart" },
  ),
);
