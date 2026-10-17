import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DiagnosisQuiz from "@/components/DiagnosisQuiz";

export const metadata: Metadata = {
  title: "Diagnóstico gratis en 2 minutos",
  description:
    "Responde 6 preguntas y descubre tu puntaje de visibilidad en la inteligencia artificial. Gratis, al instante.",
};

export default function DiagnosticoPage() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh]">
        <DiagnosisQuiz />
      </main>
      <Footer />
    </>
  );
}
