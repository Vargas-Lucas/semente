import Link from "next/link";
import { MenuExplorer } from "@/components/menu/menu-explorer";
import { getCategories, getDishes } from "@/lib/menu-api";

export default async function HomePage() {
  const [categories, dishes] = await Promise.all([
    getCategories(),
    getDishes({ includeUnavailable: true }),
  ]);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/92 via-brand-deep/75 to-brand-deep/35" />
        <div className="site-shell relative grid min-h-[78vh] items-end py-16 sm:py-20">
          <div className="max-w-2xl space-y-6 text-white animate-rise">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              Culinária vegana
            </p>
            <h1 className="font-display text-5xl sm:text-7xl leading-[0.95]">
              Semente
            </h1>
            <p className="max-w-lg text-lg text-white/85">
              Pratos plant-based frescos, feitos na hora. Escolha no cardápio
              digital e peça direto da mesa ou para entrega.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="#cardapio" className="btn btn-accent">
                Ver cardápio
              </Link>
              <Link href="/carrinho" className="btn btn-ghost !text-white !border-white/30">
                Meu pedido
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="cardapio" className="site-shell py-12 sm:py-16 space-y-6">
        <div className="max-w-2xl space-y-2 animate-rise">
          <h2 className="font-display text-4xl text-brand-deep">Cardápio</h2>
          <p className="text-muted">
            Explore por categoria ou filtre por preferências dietéticas.
          </p>
        </div>
        <MenuExplorer categories={categories} dishes={dishes} />
      </section>
    </div>
  );
}
