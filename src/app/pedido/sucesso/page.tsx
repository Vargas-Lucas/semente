import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

type PageProps = {
  searchParams: Promise<{ id?: string; demo?: string }>;
};

export default async function OrderSuccessPage({ searchParams }: PageProps) {
  const { id, demo } = await searchParams;

  return (
    <div className="site-shell py-16 sm:py-24">
      <div className="panel mx-auto max-w-lg rounded-[2rem] p-8 sm:p-10 text-center space-y-5 animate-rise">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent animate-float">
          <CheckCircle2 className="h-8 w-8 text-accent-ink" />
        </div>
        <h1 className="font-display text-4xl text-brand-deep">
          Pedido recebido!
        </h1>
        <p className="text-muted">
          Obrigado por pedir no Semente. Já estamos preparando tudo com carinho.
        </p>
        {id && (
          <p className="rounded-2xl bg-surface px-4 py-3 text-sm">
            Código do pedido:{" "}
            <span className="font-semibold text-brand-deep">{id.slice(0, 8)}</span>
          </p>
        )}
        {demo === "1" && (
          <p className="text-xs text-muted">
            Modo demonstração (sem Supabase). O pedido foi salvo localmente.
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/#cardapio" className="btn btn-primary">
            Voltar ao cardápio
          </Link>
          <Link href="/" className="btn btn-ghost">
            Início
          </Link>
        </div>
      </div>
    </div>
  );
}
