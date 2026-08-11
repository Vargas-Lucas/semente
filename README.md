# Semente

Cardápio digital e sistema de pedidos para restaurante de **culinária vegana**.

Stack: **Next.js (App Router) · Tailwind CSS · TypeScript · Supabase**

## Funcionalidades

- Cardápio público por categorias com filtros dietéticos
- Detalhe do prato com ingredientes, preço e personalização
- Carrinho + checkout (nome, telefone, endereço/mesa, pagamento)
- Painel admin com login (Supabase Auth), CRUD de pratos/categorias e pedidos em tempo real

## Começar

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Sem variáveis do Supabase, o app roda em **modo demo** (dados locais + pedidos no `localStorage`).

## Configurar Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Em **SQL Editor**, rode na ordem:
   - `supabase/migrations/20260811120000_initial_schema.sql`
   - `supabase/seed.sql`
3. Em **Authentication → Users**, crie o usuário gerente (e-mail/senha)
4. Em **Project Settings → API**, copie URL e `anon` key para `.env.local`
5. Em **Database → Replication**, confirme que `orders` e `order_items` estão no Realtime (a migration já tenta adicionar)

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Cardápio público |
| `/prato/[id]` | Detalhe do prato |
| `/carrinho` | Carrinho e checkout |
| `/pedido/sucesso` | Confirmação |
| `/admin/login` | Login do gerente |
| `/admin` | Pedidos em tempo real |
| `/admin/pratos` | CRUD de pratos |
| `/admin/categorias` | CRUD de categorias |

## Schema

- `categories` — id, name, slug, sort_order
- `dishes` — id, title, description, ingredients, price, image_url, category_id, is_available, tags, customization_options
- `orders` — id, customer_name, customer_phone, address_or_table, payment_method, total_amount, status, notes, created_at
- `order_items` — id, order_id, dish_id, dish_title, quantity, unit_price, selected_options
