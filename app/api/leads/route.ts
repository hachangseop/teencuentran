import { NextRequest, NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    // Sin credenciales de Supabase: no rompemos, avisamos con 503 y el
    // formulario muestra un mensaje amable.
    return NextResponse.json(
      { error: "Supabase no configurado" },
      { status: 503 }
    );
  }

  let body: {
    nombre?: string;
    negocio?: string;
    whatsapp?: string;
    email?: string;
    score?: number | null;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { nombre, negocio, whatsapp, email, score } = body;
  if (!nombre || !negocio || !whatsapp || !email) {
    return NextResponse.json(
      { error: "Faltan campos requeridos" },
      { status: 400 }
    );
  }

  const supabase = createClient();
  const { error } = await supabase.from("leads").insert({
    nombre,
    negocio,
    whatsapp,
    email,
    score: typeof score === "number" && !Number.isNaN(score) ? score : null,
    respuestas: {},
  });

  if (error) {
    return NextResponse.json({ error: "No se pudo guardar" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
