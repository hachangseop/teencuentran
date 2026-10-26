import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const VALUE_PROPS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
    title: "Auditoría de tu perfil de Google",
    text: "Revisamos tu Perfil de Empresa: fotos, horarios, categorías, menú y reseñas. Detectamos exactamente qué te impide aparecer cuando la IA recomienda dónde comer.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    title: "Reseñas en automático por WhatsApp",
    text: "Después de cada visita, tus clientes reciben un mensaje con el enlace directo a tus reseñas de Google. Más reseñas reales, sin perseguir a nadie.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
    title: "Contenido que la IA puede citar",
    text: "Generamos las preguntas frecuentes y los datos estructurados de tu negocio para que ChatGPT, Gemini y Perplexity tengan qué citar cuando recomiendan.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Diagnóstico de 2 minutos",
    text: "Responde 6 preguntas desde tu tablet o celular, ahí mismo en tu local.",
  },
  {
    n: "2",
    title: "Recibe tu score",
    text: "Ve tu puntaje de visibilidad sobre 100 y los 3 arreglos más urgentes, al instante.",
  },
  {
    n: "3",
    title: "Lo arreglamos en automático",
    text: "Ejecutamos las mejoras semana a semana y medimos cuántas veces te menciona la IA.",
  },
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://teencuentran.mx/#organizacion",
        name: "TeEncuentran",
        url: "https://teencuentran.mx/",
        description:
          "Auditoría y acciones automáticas para que restaurantes y cafés de la Ciudad de México aparezcan cuando la inteligencia artificial recomienda dónde comer.",
        areaServed: { "@type": "City", name: "Ciudad de México" },
        inLanguage: "es-MX",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "¿Qué es TeEncuentran?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Es una auditoría continua y acciones automáticas para que tu restaurante o café aparezca cuando la inteligencia artificial recomienda dónde comer en CDMX: revisamos tu perfil de Google, generamos reseñas por WhatsApp y creamos contenido que la IA puede citar.",
            },
          },
          {
            "@type": "Question",
            name: "¿Cuánto cuesta TeEncuentran?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Un precio simple: $499 MXN al mes por local, cancela cuando quieras. La beta incluye 2 meses gratis a cambio de tu testimonio.",
            },
          },
          {
            "@type": "Question",
            name: "¿Cómo funciona?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "1) Diagnóstico gratis de 2 minutos con 6 preguntas. 2) Recibes tu puntaje de visibilidad sobre 100 y los 3 arreglos más urgentes. 3) Ejecutamos las mejoras semana a semana y medimos cuántas veces te menciona la IA.",
            },
          },
          {
            "@type": "Question",
            name: "¿Por qué la inteligencia artificial no recomienda mi restaurante?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "La IA responde con los negocios que puede verificar y citar. Si tu información está incompleta, desactualizada o no tienes reseñas recientes, para la IA simplemente no existes. TeEncuentran detecta exactamente qué te impide aparecer y lo arregla.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 0%, rgba(16,185,129,0.25), transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 md:pb-28 md:pt-24">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Beta abierta en CDMX · 2 meses gratis
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl">
                ¿Te encuentran en{" "}
                <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                  ChatGPT
                </span>
                ?
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
                Cada día, más personas le preguntan a la inteligencia artificial
                dónde comer. Si tu restaurante no aparece en esas respuestas,
                esos clientes se van con la competencia.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/diagnostico" className="btn-touch bg-emerald-500 text-white hover:bg-emerald-400 text-center">
                  Hacer mi diagnóstico gratis
                </Link>
                <Link
                  href="#como-funciona"
                  className="btn-touch border border-slate-600 text-white hover:border-slate-400 text-center"
                >
                  Ver cómo funciona
                </Link>
              </div>
              <p className="mt-5 text-sm text-slate-400">
                Toma 2 minutos · Sin tarjeta · Resultado al instante
              </p>
            </div>
          </div>
        </section>

        {/* PROBLEMA */}
        <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
              El problema
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Tus clientes ya no solo buscan en Google
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Le preguntan a ChatGPT, Gemini y Perplexity:{" "}
              <em className="text-slate-800">
                “¿dónde como unos buenos tacos en la Roma?”
              </em>{" "}
              La IA responde con los negocios que puede verificar y citar. Si tu
              información está incompleta, desactualizada o no tienes reseñas,
              para la IA simplemente no existes.
            </p>
          </div>
        </section>

        {/* PROPUESTA DE VALOR */}
        <section className="border-y border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Qué hacemos por tu negocio
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {VALUE_PROPS.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    {v.icon}
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section id="como-funciona" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Cómo funciona
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="relative rounded-2xl border border-slate-200 p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-xl font-extrabold text-white">
                  {s.n}
                </span>
                <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/diagnostico" className="btn-touch inline-block bg-slate-900 text-white hover:bg-slate-700">
              Empezar con el diagnóstico
            </Link>
          </div>
        </section>

        {/* PRECIO */}
        <section id="precio" className="border-y border-slate-100 bg-slate-950 text-white">
          <div className="mx-auto max-w-4xl px-5 py-16 text-center md:py-24">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-400">
              Precio simple
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Un precio, sin sorpresas
            </h2>
            <div className="mx-auto mt-10 max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-8">
              <p className="text-5xl font-extrabold">
                $499 <span className="text-xl font-medium text-slate-400">MXN/mes</span>
              </p>
              <p className="mt-2 text-slate-400">por local · cancela cuando quieras</p>
              <ul className="mt-6 space-y-3 text-left text-slate-300">
                <li>✓ Auditoría continua de tu perfil de Google</li>
                <li>✓ Reseñas automáticas por WhatsApp</li>
                <li>✓ Contenido optimizado para la IA</li>
                <li>✓ Reporte semanal de menciones</li>
              </ul>
              <Link
                href="/beta"
                className="btn-touch mt-8 block bg-emerald-500 text-white hover:bg-emerald-400 text-center"
              >
                Quiero la beta gratis
              </Link>
              <p className="mt-4 text-sm text-slate-400">
                Beta: 2 meses gratis a cambio de tu testimonio
              </p>
            </div>
          </div>
        </section>

        {/* CTA BETA */}
        <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="rounded-3xl bg-emerald-600 px-8 py-14 text-center text-white md:py-20">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Sé de los primeros 10 locales en CDMX
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-50">
              Estamos incorporando restaurantes y cafés de la Roma, Condesa,
              Coyoacán y Narvarte. Dos meses gratis, sin tarjeta.
            </p>
            <Link
              href="/beta"
              className="btn-touch mt-8 inline-block bg-white text-emerald-700 hover:bg-emerald-50"
            >
              Apartar mi lugar en la beta
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
