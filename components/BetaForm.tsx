"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

type Status = "idle" | "sending" | "success" | "not_configured" | "error";

const inputCls =
  "w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 text-lg outline-none transition placeholder:text-slate-400 focus:border-emerald-500";

export default function BetaForm() {
  const searchParams = useSearchParams();
  const score = searchParams.get("score");

  const [nombre, setNombre] = useState("");
  const [negocio, setNegocio] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          negocio,
          whatsapp,
          email,
          score: score ? Number(score) : null,
        }),
      });
      if (res.status === 503) {
        setStatus("not_configured");
        return;
      }
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border-2 border-emerald-500 bg-emerald-50 p-10 text-center">
        <p className="text-5xl">🎉</p>
        <h2 className="mt-4 text-2xl font-extrabold">¡Listo, {nombre.split(" ")[0]}!</h2>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          Apartamos tu lugar en la beta de TeEncuentran. Te escribiremos por
          WhatsApp en los próximos días para activar tus 2 meses gratis.
        </p>
      </div>
    );
  }

  if (status === "not_configured") {
    return (
      <div className="rounded-3xl border-2 border-amber-400 bg-amber-50 p-10 text-center">
        <h2 className="text-2xl font-extrabold">Estamos activando el registro</h2>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          El formulario estará disponible muy pronto. Inténtalo de nuevo en unas
          horas — tu lugar en la beta sigue apartado.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      {score !== null && (
        <div className="rounded-2xl bg-slate-900 p-5 text-center text-white">
          <span className="text-sm text-slate-300">Tu puntaje de visibilidad</span>
          <p className="text-4xl font-extrabold">
            {score}
            <span className="text-lg font-medium text-slate-400">/100</span>
          </p>
        </div>
      )}

      <div>
        <label htmlFor="nombre" className="mb-2 block font-semibold">
          Tu nombre
        </label>
        <input
          id="nombre"
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej. María González"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="negocio" className="mb-2 block font-semibold">
          Nombre de tu negocio
        </label>
        <input
          id="negocio"
          required
          value={negocio}
          onChange={(e) => setNegocio(e.target.value)}
          placeholder="Ej. Café Roma Norte"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="whatsapp" className="mb-2 block font-semibold">
          WhatsApp
        </label>
        <input
          id="whatsapp"
          required
          type="tel"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="Ej. 55 1234 5678"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block font-semibold">
          Correo electrónico
        </label>
        <input
          id="email"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tucorreo@ejemplo.com"
          className={inputCls}
        />
      </div>

      {status === "error" && (
        <p className="rounded-xl bg-red-50 p-4 text-center font-medium text-red-700">
          Algo salió mal. Inténtalo de nuevo en un momento.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-touch bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        {status === "sending" ? "Enviando…" : "Apartar mi lugar en la beta"}
      </button>
      <p className="text-center text-sm text-slate-500">
        2 meses gratis · Sin tarjeta · Solo 10 lugares en CDMX
      </p>
    </form>
  );
}
