import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://teencuentran.mx"),
  alternates: { canonical: "/" },
  title: {
    default: "TeEncuentran — ¿Te encuentran en ChatGPT?",
    template: "%s | TeEncuentran",
  },
  description:
    "Auditoría y acciones automáticas para que tu restaurante o café aparezca cuando la inteligencia artificial recomienda dónde comer en CDMX.",
  keywords: [
    "GEO",
    "visibilidad en IA",
    "ChatGPT restaurantes",
    "perfil de Google",
    "reseñas Google",
    "marketing para restaurantes CDMX",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://teencuentran.mx",
    siteName: "TeEncuentran",
    title: "TeEncuentran — ¿Te encuentran en ChatGPT?",
    description:
      "Descubre en 2 minutos si la inteligencia artificial recomienda tu restaurante. Diagnóstico gratis.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TeEncuentran — ¿Te encuentran en ChatGPT?",
    description:
      "Descubre en 2 minutos si la inteligencia artificial recomienda tu restaurante. Diagnóstico gratis.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-white text-slate-900">{children}</body>
    </html>
  );
}
