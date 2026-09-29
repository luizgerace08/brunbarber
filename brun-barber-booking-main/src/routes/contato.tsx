import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { BUSINESS, whatsappLink } from "@/lib/business";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — BRUN BARBER" },
      { name: "description", content: `BRUN BARBER — ${BUSINESS.address}. Terça a sábado, 9h às 18h. Fale pelo WhatsApp ou agende online.` },
      { property: "og:title", content: "Contato — BRUN BARBER" },
      { property: "og:description", content: `${BUSINESS.address} · Terça a sábado, 9h às 18h.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  return (
    <div>
      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="eyebrow">Contato</p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl">Fale com a BRUN</h1>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <div className="card-lux p-10">
              <p className="eyebrow">Onde estamos</p>
              <p className="mt-4 font-display text-3xl">{BUSINESS.address}</p>
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-gold-soft"
              >
                Abrir no Google Maps →
              </a>

              <div className="hairline my-8" />

              <p className="eyebrow">Horário</p>
              <p className="mt-4 font-display text-2xl">{BUSINESS.hoursLabel}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Fechado aos domingos e segundas.
              </p>

              <div className="hairline my-8" />

              <p className="eyebrow">WhatsApp</p>
              <a
                href={whatsappLink("Olá, Gustavo! Quero agendar um horário na BRUN BARBER.")}
                target="_blank"
                rel="noreferrer"
                className="bg-gradient-gold mt-4 inline-flex items-center gap-3 px-7 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition-transform hover:scale-[1.02]"
              >
                Chamar no WhatsApp — {BUSINESS.whatsappDisplay}
              </a>
              <p className="mt-3 text-xs text-muted-foreground">
                Respondemos dentro do horário de funcionamento.
              </p>
            </div>

            <div className="relative min-h-[420px] overflow-hidden">
              <img
                src={heroImg}
                alt="Interior da BRUN BARBER"
                width={1920}
                height={1200}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <p className="font-display text-3xl italic text-foreground">
                  “Cadeira quente, mente fria.”
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-gold">BRUN BARBER</p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground">
              Prefere já garantir a vaga na agenda?
            </p>
            <Link
              to="/agendar"
              className="border border-gold/60 mt-6 inline-block px-10 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              Agendar horário
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
