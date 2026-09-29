import { Link } from "@tanstack/react-router";
import { BUSINESS, whatsappLink } from "@/lib/business";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <p className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-semibold tracking-[0.18em]">BRUN</span>
            <span className="text-[0.6rem] font-medium tracking-[0.42em] text-gold">BARBER</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Barbearia de {BUSINESS.barber}. Precisão, presença e um ambiente
            pensado para você sair melhor do que entrou.
          </p>
        </div>

        <div>
          <p className="eyebrow">Navegue</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-gold">Início</Link></li>
            <li><Link to="/servicos" className="hover:text-gold">Serviços</Link></li>
            <li><Link to="/sobre" className="hover:text-gold">O Barbeiro</Link></li>
            <li><Link to="/agendar" className="hover:text-gold">Agendar horário</Link></li>
            <li><Link to="/contato" className="hover:text-gold">Contato</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Visite</p>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>{BUSINESS.address}</li>
            <li>{BUSINESS.hoursLabel}</li>
            <li>
              <a
                href={whatsappLink("Olá, Gustavo! Gostaria de saber mais sobre a BRUN BARBER.")}
                target="_blank"
                rel="noreferrer"
                className="text-gold hover:text-gold-soft"
              >
                WhatsApp {BUSINESS.whatsappDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="hairline" />
      <p className="py-6 text-center text-xs tracking-widest text-muted-foreground/70">
        © {new Date().getFullYear()} BRUN BARBER — Todos os direitos reservados
      </p>
    </footer>
  );
}
