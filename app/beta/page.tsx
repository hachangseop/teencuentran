import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BetaForm from "@/components/BetaForm";

export const metadata: Metadata = {
  title: "Beta en CDMX — 2 meses gratis",
  description:
    "Aparta tu lugar en la beta de TeEncuentran: 2 meses gratis para restaurantes y cafés en CDMX.",
};

export default function BetaPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-xl px-5 py-10 md:py-16">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
          Beta en CDMX
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          Aparta tu lugar: 2 meses gratis
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Déjanos tus datos y te contactamos por WhatsApp para activar tu
          negocio. Sin tarjeta, sin compromiso.
        </p>
        <div className="mt-8">
          <Suspense
            fallback={
              <div className="rounded-2xl bg-slate-100 p-10 text-center text-slate-500">
                Cargando…
              </div>
            }
          >
            <BetaForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
