import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { BUSINESS } from "@/lib/business";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/servicos", label: "Serviços" },
  { to: "/sobre", label: "O Barbeiro" },
  { to: "/contato", label: "Contato" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="group flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl font-semibold tracking-[0.18em] text-foreground">
            BRUN
          </span>
          <span className="text-[0.6rem] font-medium tracking-[0.42em] text-gold">
            BARBER
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-gold" }}
              className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/agendar"
            className="border border-gold/60 px-5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            Agendar
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-gold md:hidden"
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-full bg-current transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-ink/95 px-5 pb-6 pt-3 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/agendar"
            onClick={() => setOpen(false)}
            className="mt-3 block border border-gold/60 py-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-gold"
          >
            Agendar horário
          </Link>
          <p className="mt-4 text-xs text-muted-foreground">{BUSINESS.hoursShort}</p>
        </nav>
      )}
    </header>
  );
}
