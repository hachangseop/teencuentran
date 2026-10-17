// Lógica del diagnóstico de 2 minutos — 100% rule-based, sin llamadas a IA.
// Spec: MVP-PLAN.md §6. Pesos: 20/20/20/15/15/10 = 100.

export interface DiagnosisOption {
  value: string;
  label: string;
  score: number;
}

export interface DiagnosisQuestion {
  id: string;
  dimension: string;
  title: string;
  subtitle?: string;
  maxScore: number;
  options: DiagnosisOption[];
  /** Acción concreta que se muestra si esta dimensión está entre las más débiles. */
  fix: string;
}

export const QUESTIONS: DiagnosisQuestion[] = [
  {
    id: "perfil",
    dimension: "Perfil de Google",
    title: "¿Tu perfil de Google está reclamado?",
    subtitle: "El Perfil de Empresa en Google (antes Google Mi Negocio)",
    maxScore: 20,
    options: [
      { value: "no", label: "No", score: 0 },
      { value: "parcial", label: "Parcialmente", score: 10 },
      { value: "completo", label: "Por completo", score: 20 },
    ],
    fix: "Reclama tu Perfil de Empresa en Google hoy mismo: busca tu negocio en Google Maps, haz clic en “Reclamar esta empresa” y completa la verificación. Sin esto, la IA no tiene una fuente oficial que citar.",
  },
  {
    id: "contenido",
    dimension: "Información actualizada",
    title: "¿Tus fotos, horario, menú y enlace están actualizados?",
    subtitle: "Del 1 (muy desactualizado) al 5 (todo al día)",
    maxScore: 20,
    options: [
      { value: "1", label: "1", score: 4 },
      { value: "2", label: "2", score: 8 },
      { value: "3", label: "3", score: 12 },
      { value: "4", label: "4", score: 16 },
      { value: "5", label: "5", score: 20 },
    ],
    fix: "Sube 10 fotos recientes, confirma tu horario (incluye días festivos) y agrega el enlace a tu menú. Un perfil completo y actualizado es lo primero que revisa la IA antes de recomendarte.",
  },
  {
    id: "resenas",
    dimension: "Reseñas",
    title: "¿Cuántas reseñas tienes en Google?",
    maxScore: 20,
    options: [
      { value: "menos10", label: "Menos de 10", score: 0 },
      { value: "10-50", label: "10 – 50", score: 8 },
      { value: "50-200", label: "50 – 200", score: 14 },
      { value: "mas200", label: "Más de 200", score: 20 },
    ],
    fix: "Activa un recordatorio por WhatsApp después de cada visita: un mensaje corto con el enlace directo a tus reseñas de Google. Es la forma más rápida de multiplicar reseñas reales.",
  },
  {
    id: "respuestas",
    dimension: "Respuesta a reseñas",
    title: "¿Respondes a las reseñas de tus clientes?",
    maxScore: 15,
    options: [
      { value: "nunca", label: "Nunca", score: 0 },
      { value: "aveces", label: "A veces", score: 10 },
      { value: "siempre", label: "Siempre", score: 15 },
    ],
    fix: "Responde todas las reseñas — buenas y malas — en menos de 48 horas. Google lo toma como señal de un negocio activo, y la IA también lo nota.",
  },
  {
    id: "estructura",
    dimension: "Datos estructurados",
    title: "¿Tu web o menú tiene información estructurada?",
    subtitle: "Datos que la IA puede leer directamente (schema.org)",
    maxScore: 15,
    options: [
      { value: "no", label: "No", score: 0 },
      { value: "parcial", label: "Parcial", score: 8 },
      { value: "si", label: "Sí", score: 15 },
    ],
    fix: "Agrega datos estructurados (schema.org/Restaurant) a tu web o menú digital: nombre, dirección, horario y platillos en un formato que ChatGPT y Gemini pueden leer y citar directamente.",
  },
  {
    id: "whatsapp",
    dimension: "Reseñas por WhatsApp",
    title: "¿Pides reseñas a tus clientes por WhatsApp?",
    maxScore: 10,
    options: [
      { value: "no", label: "No", score: 0 },
      { value: "manual", label: "Manual", score: 6 },
      { value: "automatico", label: "Automático", score: 10 },
    ],
    fix: "Automatiza la solicitud: un mensaje de WhatsApp un par de horas después de la visita, con enlace directo a tus reseñas. Las respuestas de tus clientes dentro de la ventana de 24 h no te cuestan nada.",
  },
];

export type Answers = Record<string, string>;

export interface Tier {
  label: string;
  description: string;
  color: string; // tailwind classes
  ring: string;
}

export function getTier(score: number): Tier {
  if (score < 35)
    return {
      label: "En riesgo",
      description:
        "Hoy la IA casi no tiene de dónde tomarte. Cada pregunta que la IA no puede responder sobre tu negocio es un cliente que se va con la competencia.",
      color: "text-red-600",
      ring: "border-red-500",
    };
  if (score < 60)
    return {
      label: "Visibilidad parcial",
      description:
        "Tienes bases, pero hay huecos importantes. La IA te menciona a veces… y otras veces recomienda al de enfrente.",
      color: "text-amber-600",
      ring: "border-amber-500",
    };
  if (score < 80)
    return {
      label: "En crecimiento",
      description:
        "Vas por buen camino. Con unos ajustes, tu negocio puede convertirse en la respuesta favorita de la IA en tu zona.",
      color: "text-sky-600",
      ring: "border-sky-500",
    };
  return {
    label: "Excelente",
    description:
      "Tu negocio está listo para que la IA lo recomiende. Ahora el juego es mantenerte y medir cuántas veces te mencionan.",
    color: "text-emerald-600",
    ring: "border-emerald-500",
  };
}

export interface Finding {
  dimension: string;
  fix: string;
  score: number;
  maxScore: number;
}

/** Las 3 dimensiones más débiles (por proporción puntaje/máximo), con su acción concreta. */
export function getFindings(answers: Answers): Finding[] {
  return QUESTIONS.map((q) => {
    const opt = q.options.find((o) => o.value === answers[q.id]);
    const score = opt ? opt.score : 0;
    return { dimension: q.dimension, fix: q.fix, score, maxScore: q.maxScore };
  })
    .sort((a, b) => a.score / a.maxScore - b.score / b.maxScore)
    .slice(0, 3);
}

export function calculateScore(answers: Answers): number {
  return QUESTIONS.reduce((total, q) => {
    const opt = q.options.find((o) => o.value === answers[q.id]);
    return total + (opt ? opt.score : 0);
  }, 0);
}
