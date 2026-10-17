import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleLoginButton from "@/components/GoogleLoginButton";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Entra a tu panel de TeEncuentran con tu cuenta de Google.",
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-md px-5 py-14 md:py-20">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Entra a TeEncuentran
          </h1>
          <p className="mt-3 text-slate-600">
            Usa tu cuenta de Google para ver tu puntaje y tus reportes.
          </p>
        </div>
        <div className="mt-8">
          <GoogleLoginButton />
        </div>
      </main>
      <Footer />
    </>
  );
}
