import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import barberImg from "@/assets/barber.jpg";
import craftImg from "@/assets/craft.jpg";
import { BUSINESS, whatsappLink } from "@/lib/business";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BRUN BARBER — Barbearia | Corte R$ 25" },
      { name: "description", content: "Barbearia de Gustavo Brun. Corte R$ 25, sobrancelha R$ 10. Terça a sábado, 9h às 18h. Agende seu horário." },
      { property: "og:title", content: "BRUN BARBER — Barbearia" },
      { property: "og:description", content: "Corte R$ 25, sobrancelha R$ 10. Terça a sábado, 9h às 18h." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <img
          src={heroImg}
          alt="Interior da BRUN BARBER"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-40 sm:px-8">
          <p className="eyebrow animate-rise">{BUSINESS.tagline} · {BUSINESS.address}</p>
          <h1 className="mt-5 max-w-3xl font-display text-6xl leading-[0.95] sm:text-8xl">
            <span className="animate-rise block text-foreground" style={{ animationDelay: "0.1s" }}>
              Elegância
            </span>
            <span className="animate-rise block italic text-gradient-gold" style={{ animationDelay: "0.22s" }}>
              em cada detalhe
            </span>
          </h1>
          <p className="animate-rise mt-6 max-w-md text-base leading-relaxed text-muted-foreground" style={{ animationDelay: "0.34s" }}>
            {BUSINESS.services[0].name} e {BUSINESS.services[1].name.toLowerCase()} com a precisão
            de quem faz o mesmo com obsessão. Um barbeiro, uma cadeira, atenção total.
          </p>
          <div className="animate-rise mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.45s" }}>
            <Link
              to="/agendar"
              className="bg-gradient-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition-transform hover:scale-[1.02]"
            >
              Agendar horário
            </Link>
            <a
              href={whatsappLink("Olá, Gustavo! Quero agendar um horário na BRUN BARBER.")}
              target="_blank"
              rel="noreferrer"
              className="border border-gold/50 px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold/10"
            >
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="eyebrow">Serviços</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">Feito sob medida</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {BUSINESS.services.map((s) => (
              <Link
                key={s.id}
                to="/servicos"
                className="card-lux group p-8 transition-colors hover:border-gold/40"
              >
                <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">{s.name}</p>
                <p className="mt-4 font-display text-5xl text-gradient-gold">{s.price}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                <p className="mt-6 text-xs uppercase tracking-[0.22em] text-gold opacity-0 transition-opacity group-hover:opacity-100">
                  Agendar →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* O barbeiro */}
      <section className="section-pad border-y border-border bg-ink-raised">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 md:grid-cols-2">
          <div className="relative">
            <img
              src={barberImg}
              alt={BUSINESS.barber}
              width={1056}
              height={1408}
              loading="lazy"
              className="aspect-[3/4] w-full object-cover"
            />
            <div className="absolute -bottom-4 -right-4 hidden border border-gold/40 px-6 py-4 sm:block">
              <p className="font-display text-3xl text-gold">+ de 1.000</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">clientes atendidos</p>
            </div>
          </div>
          <div>
            <p className="eyebrow">O Barbeiro</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">{BUSINESS.barber}</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Dono e único profissional da BRUN BARBER. Cada corte que sai da
              cadeira passa pelas mãos dele — sem intermediários, sem fila
              anônima, sem pressa.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A proposta é simples: ambiente refinado, atenção individual e um
              resultado que você repete.
            </p>
            <Link
              to="/sobre"
              className="mt-8 inline-block text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-gold-soft"
            >
              Conhecer a história →
            </Link>
          </div>
        </div>
      </section>

      {/* Detalhe */}
      <section className="relative overflow-hidden">
        <img
          src={craftImg}
          alt="Ferramentas de barbearia"
          width={1056}
          height={1408}
          loading="lazy"
          className="h-[420px] w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <p className="max-w-2xl text-center font-display text-3xl italic leading-snug sm:text-4xl">
            “O acabamento está no detalhe que ninguém aponta —<span className="text-gradient-gold"> mas todos notam.</span>”
          </p>
        </div>
      </section>

      {/* Informações */}
      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
          <div className="mx-auto max-w-xl">
            <p className="eyebrow">Visite-nos</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">Terça a sábado, 9h às 18h</h2>
            <p className="mt-6 text-base text-muted-foreground">
              {BUSINESS.address} — garanta seu horário com antecedência.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/agendar"
                className="bg-gradient-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition-transform hover:scale-[1.02]"
              >
                Agendar horário
              </Link>
              <Link
                to="/contato"
                className="border border-border px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:border-gold/50 hover:text-gold"
              >
                Como chegar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
