-- Semente — schema inicial do cardápio digital

create extension if not exists "pgcrypto";

-- Enums
create type public.order_status as enum (
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'delivered',
  'cancelled'
);

create type public.payment_method as enum (
  'pix',
  'credit_card',
  'debit_card',
  'cash'
);

-- Categories
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Dishes
create table public.dishes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  ingredients text[] not null default '{}',
  price numeric(10, 2) not null check (price >= 0),
  image_url text,
  category_id uuid not null references public.categories (id) on delete restrict,
  is_available boolean not null default true,
  tags text[] not null default '{}',
  customization_options jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index dishes_category_id_idx on public.dishes (category_id);
create index dishes_is_available_idx on public.dishes (is_available);
create index dishes_tags_gin_idx on public.dishes using gin (tags);

-- Orders
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  address_or_table text not null,
  payment_method public.payment_method not null,
  total_amount numeric(10, 2) not null check (total_amount >= 0),
  status public.order_status not null default 'pending',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index orders_status_idx on public.orders (status);
create index orders_created_at_idx on public.orders (created_at desc);

-- Order items
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  dish_id uuid references public.dishes (id) on delete set null,
  dish_title text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10, 2) not null check (unit_price >= 0),
  selected_options jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index order_items_order_id_idx on public.order_items (order_id);

-- updated_at helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger dishes_set_updated_at
before update on public.dishes
for each row execute function public.set_updated_at();

create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

-- RLS
alter table public.categories enable row level security;
alter table public.dishes enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Public read for menu
create policy "Categories are publicly readable"
  on public.categories for select
  using (true);

create policy "Available dishes are publicly readable"
  on public.dishes for select
  using (true);

-- Anyone can create orders (checkout público)
create policy "Anyone can create orders"
  on public.orders for insert
  with check (true);

create policy "Anyone can create order items"
  on public.order_items for insert
  with check (true);

-- Authenticated admins: full access
create policy "Admins manage categories"
  on public.categories for all
  to authenticated
  using (true)
  with check (true);

create policy "Admins manage dishes"
  on public.dishes for all
  to authenticated
  using (true)
  with check (true);

create policy "Admins read orders"
  on public.orders for select
  to authenticated
  using (true);

create policy "Admins update orders"
  on public.orders for update
  to authenticated
  using (true)
  with check (true);

create policy "Admins delete orders"
  on public.orders for delete
  to authenticated
  using (true);

create policy "Admins read order items"
  on public.order_items for select
  to authenticated
  using (true);

create policy "Admins manage order items"
  on public.order_items for all
  to authenticated
  using (true)
  with check (true);

-- Realtime for orders
alter publication supabase_realtime add table public.orders;
alter publication supabase_realtime add table public.order_items;
