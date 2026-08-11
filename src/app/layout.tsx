import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Semente — Cardápio Vegano",
  description:
    "Cardápio digital e pedidos online do Semente, restaurante de culinária vegana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <footer className="site-shell py-10 text-sm text-muted">
          <div className="panel rounded-2xl px-5 py-4 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
            <p>
              <span className="font-display text-brand">Semente</span> — culinária
              vegana, do campo ao prato.
            </p>
            <p>Feito com Next.js + Supabase</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
