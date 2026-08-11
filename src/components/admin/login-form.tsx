"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/utils";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!isSupabaseConfigured()) {
        if (password.length >= 4) {
          sessionStorage.setItem("semente-demo-admin", "1");
          router.push(next);
          return;
        }
        throw new Error("No modo demo, use qualquer senha com 4+ caracteres.");
      }

      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      router.push(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="site-shell py-16 sm:py-24">
      <div className="panel mx-auto max-w-md rounded-[2rem] p-8 space-y-6 animate-rise">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
            Área restrita
          </p>
          <h1 className="font-display text-4xl text-brand-deep">
            Login do gerente
          </h1>
          <p className="text-sm text-muted">
            {isSupabaseConfigured()
              ? "Entre com a conta criada no Supabase Auth."
              : "Supabase não configurado — use o modo demo."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className="input"
              required={isSupabaseConfigured()}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="gerente@semente.app"
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              className="input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="rounded-xl bg-danger/10 px-3 py-2 text-sm text-danger">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <p className="text-center text-sm text-muted">
          <Link href="/" className="underline underline-offset-2">
            Voltar ao cardápio
          </Link>
        </p>
      </div>
    </div>
  );
}
