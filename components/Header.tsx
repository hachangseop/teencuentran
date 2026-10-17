import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
          <path d="M11 8.5v5" />
          <path d="M8.5 11h5" />
        </svg>
      </span>
      <span className="text-xl font-extrabold tracking-tight text-slate-900">
        TeEncuentran
      </span>
    </Link>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-8 text-[15px] font-medium text-slate-600 md:flex">
          <Link href="/#como-funciona" className="hover:text-slate-900">
            Cómo funciona
          </Link>
          <Link href="/#precio" className="hover:text-slate-900">
            Precio
          </Link>
          <Link href="/login" className="hover:text-slate-900">
            Entrar
          </Link>
        </nav>
        <Link
          href="/diagnostico"
          className="rounded-xl bg-emerald-600 px-5 py-3 text-[15px] font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98]"
        >
          Diagnóstico gratis
        </Link>
      </div>
    </header>
  );
}
