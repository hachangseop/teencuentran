"use client";

import { useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function GoogleLoginButton() {
  const [error, setError] = useState<string | null>(null);
  const configured = isSupabaseConfigured();

  async function signIn() {
    if (!configured) return;
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) setError("No se pudo iniciar sesión. Inténtalo de nuevo.");
  }

  if (!configured) {
    return (
      <div className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-8 text-center">
        <h2 className="text-xl font-extrabold">Inicio de sesión en preparación</h2>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          Estamos terminando la configuración del acceso. Vuelve en unas horas
          para entrar a tu panel.
        </p>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={signIn}
        className="btn-touch flex w-full items-center justify-center gap-3 border-2 border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M23.5 12.3c0-.9-.1-1.5-.3-2.3H12v4.5h6.5c-.1 1.1-.8 2.7-2.4 3.8l-.1.6 3.4 2.7.2.1c2.2-2 3.3-5 3.3-9.4z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.8-2.9c-1 .7-2.4 1.2-4.1 1.2-3.1 0-5.8-2.1-6.8-5l-.6.1-3.6 2.8v.4C2.9 21.3 7.1 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.2 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.7.4-2.4l-.1-.6-3.5-2.7-.1.1C.4 7.9 0 9.9 0 12s.4 4.1 1.5 5.6l3.7-3.2z"
          />
          <path
            fill="#EA4335"
            d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.3-3.2C17.9 1.1 15.2 0 12 0 7.1 0 2.9 2.7 1.5 6.4l3.7 2.9c1-2.9 3.7-4.6 6.8-4.6z"
          />
        </svg>
        Continuar con Google
      </button>
      {error && (
        <p className="mt-4 rounded-xl bg-red-50 p-4 text-center font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
