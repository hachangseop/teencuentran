import Link from "next/link";
import { Logo } from "./Header";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
              ¿Te encuentran en ChatGPT? Auditoría y acciones automáticas para
              que la inteligencia artificial recomiende tu restaurante.
            </p>
          </div>
          <nav className="flex gap-16 text-[15px]">
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-slate-900">Producto</span>
              <Link href="/diagnostico" className="text-slate-600 hover:text-slate-900">
                Diagnóstico gratis
              </Link>
              <Link href="/beta" className="text-slate-600 hover:text-slate-900">
                Beta en CDMX
              </Link>
              <Link href="/login" className="text-slate-600 hover:text-slate-900">
                Entrar
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-slate-900">Empresa</span>
              <Link href="/#como-funciona" className="text-slate-600 hover:text-slate-900">
                Cómo funciona
              </Link>
              <Link href="/#precio" className="text-slate-600 hover:text-slate-900">
                Precio
              </Link>
            </div>
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <span>© 2026 TeEncuentran. Todos los derechos reservados.</span>
          <span>Hecho en CDMX 🇲🇽</span>
        </div>
      </div>
    </footer>
  );
}
