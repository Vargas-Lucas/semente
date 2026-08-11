import { DEMO_CATEGORIES, DEMO_DISHES } from "@/lib/demo-data";
import type {
  Category,
  Dish,
  Order,
  OrderStatus,
  PaymentMethod,
  SelectedOption,
} from "@/lib/types";
import { isSupabaseConfigured } from "@/lib/utils";
import { createPublicClient } from "@/lib/supabase/public";

function normalizeDish(raw: Record<string, unknown>): Dish {
  return {
    id: String(raw.id),
    title: String(raw.title),
    description: String(raw.description ?? ""),
    ingredients: (raw.ingredients as string[]) ?? [],
    price: Number(raw.price),
    image_url: (raw.image_url as string | null) ?? null,
    category_id: String(raw.category_id),
    is_available: Boolean(raw.is_available),
    tags: (raw.tags as string[]) ?? [],
    customization_options:
      (raw.customization_options as Dish["customization_options"]) ?? [],
    created_at: raw.created_at as string | undefined,
    updated_at: raw.updated_at as string | undefined,
    category: (raw.category as Category | null | undefined) ?? null,
  };
}

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) {
    return DEMO_CATEGORIES;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data?.length) {
      return DEMO_CATEGORIES;
    }

    return data as Category[];
  } catch {
    return DEMO_CATEGORIES;
  }
}

export async function getDishes(options?: {
  includeUnavailable?: boolean;
}): Promise<Dish[]> {
  if (!isSupabaseConfigured()) {
    return options?.includeUnavailable
      ? DEMO_DISHES
      : DEMO_DISHES.filter((d) => d.is_available);
  }

  try {
    const supabase = createPublicClient();
    let query = supabase
      .from("dishes")
      .select("*, category:categories(*)")
      .order("title", { ascending: true });

    if (!options?.includeUnavailable) {
      query = query.eq("is_available", true);
    }

    const { data, error } = await query;

    if (error || !data?.length) {
      return options?.includeUnavailable
        ? DEMO_DISHES
        : DEMO_DISHES.filter((d) => d.is_available);
    }

    return data.map((row) => normalizeDish(row as Record<string, unknown>));
  } catch {
    return options?.includeUnavailable
      ? DEMO_DISHES
      : DEMO_DISHES.filter((d) => d.is_available);
  }
}

export async function getDishById(id: string): Promise<Dish | null> {
  if (!isSupabaseConfigured()) {
    return DEMO_DISHES.find((d) => d.id === id) ?? null;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("dishes")
      .select("*, category:categories(*)")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      return DEMO_DISHES.find((d) => d.id === id) ?? null;
    }

    return normalizeDish(data as Record<string, unknown>);
  } catch {
    return DEMO_DISHES.find((d) => d.id === id) ?? null;
  }
}

export async function createOrder(input: {
  customer_name: string;
  customer_phone: string;
  address_or_table: string;
  payment_method: PaymentMethod;
  total_amount: number;
  notes?: string;
  items: {
    dish_id: string;
    dish_title: string;
    quantity: number;
    unit_price: number;
    selected_options: SelectedOption[];
  }[];
}): Promise<{ id: string; demo?: boolean }> {
  if (!isSupabaseConfigured()) {
    const id = crypto.randomUUID();
    const existing = JSON.parse(
      localStorage.getItem("semente-demo-orders") ?? "[]",
    ) as Order[];
    const order: Order = {
      id,
      customer_name: input.customer_name,
      customer_phone: input.customer_phone,
      address_or_table: input.address_or_table,
      payment_method: input.payment_method,
      total_amount: input.total_amount,
      status: "pending",
      notes: input.notes ?? null,
      created_at: new Date().toISOString(),
      order_items: input.items.map((item, index) => ({
        id: `${id}-${index}`,
        order_id: id,
        dish_id: item.dish_id,
        dish_title: item.dish_title,
        quantity: item.quantity,
        unit_price: item.unit_price,
        selected_options: item.selected_options,
      })),
    };
    localStorage.setItem(
      "semente-demo-orders",
      JSON.stringify([order, ...existing]),
    );
    return { id, demo: true };
  }

  const supabase = createPublicClient();
  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      customer_name: input.customer_name,
      customer_phone: input.customer_phone,
      address_or_table: input.address_or_table,
      payment_method: input.payment_method,
      total_amount: input.total_amount,
      notes: input.notes ?? null,
      status: "pending",
    })
    .select("id")
    .single();

  if (error || !order) {
    throw new Error(error?.message ?? "Não foi possível criar o pedido");
  }

  const { error: itemsError } = await supabase.from("order_items").insert(
    input.items.map((item) => ({
      order_id: order.id,
      dish_id: item.dish_id,
      dish_title: item.dish_title,
      quantity: item.quantity,
      unit_price: item.unit_price,
      selected_options: item.selected_options,
    })),
  );

  if (itemsError) {
    throw new Error(itemsError.message);
  }

  return { id: order.id };
}

export async function getOrders(): Promise<Order[]> {
  if (!isSupabaseConfigured()) {
    if (typeof window === "undefined") return [];
    return JSON.parse(
      localStorage.getItem("semente-demo-orders") ?? "[]",
    ) as Order[];
  }

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data as Order[]) ?? [];
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  if (!isSupabaseConfigured()) {
    const orders = JSON.parse(
      localStorage.getItem("semente-demo-orders") ?? "[]",
    ) as Order[];
    const next = orders.map((order) =>
      order.id === id ? { ...order, status } : order,
    );
    localStorage.setItem("semente-demo-orders", JSON.stringify(next));
    return;
  }

  const supabase = createPublicClient();
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function upsertCategory(
  input: Partial<Category> & { name: string; slug: string },
) {
  if (!isSupabaseConfigured()) {
    throw new Error("Conecte o Supabase para gerenciar categorias.");
  }
  const supabase = createPublicClient();
  const payload = {
    name: input.name,
    slug: input.slug,
    sort_order: input.sort_order ?? 0,
    ...(input.id ? { id: input.id } : {}),
  };
  const { error } = await supabase.from("categories").upsert(payload);
  if (error) throw new Error(error.message);
}

export async function deleteCategory(id: string) {
  if (!isSupabaseConfigured()) {
    throw new Error("Conecte o Supabase para gerenciar categorias.");
  }
  const supabase = createPublicClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function upsertDish(
  input: Omit<Dish, "id" | "created_at" | "updated_at" | "category"> & {
    id?: string;
  },
) {
  if (!isSupabaseConfigured()) {
    throw new Error("Conecte o Supabase para gerenciar pratos.");
  }
  const supabase = createPublicClient();
  const payload: Record<string, unknown> = {
    title: input.title,
    description: input.description,
    ingredients: input.ingredients,
    price: input.price,
    image_url: input.image_url,
    category_id: input.category_id,
    is_available: input.is_available,
    tags: input.tags,
    customization_options: input.customization_options,
  };

  if (input.id) {
    payload.id = input.id;
  }

  const { error } = await supabase.from("dishes").upsert(payload);
  if (error) throw new Error(error.message);
}

export async function deleteDish(id: string) {
  if (!isSupabaseConfigured()) {
    throw new Error("Conecte o Supabase para gerenciar pratos.");
  }
  const supabase = createPublicClient();
  const { error } = await supabase.from("dishes").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
