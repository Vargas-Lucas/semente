export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "pix" | "credit_card" | "debit_card" | "cash";

export type CustomizationOptionChoice = {
  id: string;
  label: string;
  price: number;
};

export type CustomizationOption = {
  id: string;
  label: string;
  type: "single";
  options: CustomizationOptionChoice[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  created_at?: string;
};

export type Dish = {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  price: number;
  image_url: string | null;
  category_id: string;
  is_available: boolean;
  tags: string[];
  customization_options: CustomizationOption[];
  created_at?: string;
  updated_at?: string;
  category?: Category | null;
};

export type SelectedOption = {
  groupId: string;
  groupLabel: string;
  optionId: string;
  optionLabel: string;
  price: number;
};

export type Order = {
  id: string;
  customer_name: string;
  customer_phone: string;
  address_or_table: string;
  payment_method: PaymentMethod;
  total_amount: number;
  status: OrderStatus;
  notes: string | null;
  created_at: string;
  updated_at?: string;
  order_items?: OrderItem[];
};

export type OrderItem = {
  id: string;
  order_id: string;
  dish_id: string | null;
  dish_title: string;
  quantity: number;
  unit_price: number;
  selected_options: SelectedOption[];
  created_at?: string;
};

export type CartItem = {
  key: string;
  dishId: string;
  title: string;
  imageUrl: string | null;
  unitPrice: number;
  quantity: number;
  selectedOptions: SelectedOption[];
};

export const DIETARY_TAGS = [
  { id: "sem-gluten", label: "Sem Glúten" },
  { id: "organico", label: "Orgânico" },
  { id: "apimentado", label: "Apimentado" },
  { id: "mais-vendidos", label: "Mais Vendidos" },
] as const;

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pendente",
  confirmed: "Confirmado",
  preparing: "Preparando",
  ready: "Pronto",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  pix: "PIX",
  credit_card: "Cartão de crédito",
  debit_card: "Cartão de débito",
  cash: "Dinheiro",
};
