import { createFileRoute, Link } from "@tanstack/react-router";
import barberImg from "@/assets/barber.jpg";
import { BUSINESS } from "@/lib/business";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "O Barbeiro — Gustavo Brun | BRUN BARBER" },
      { name: "description", content: "Conheça Gustavo Brun, dono e barbeiro da BRUN BARBER. Um profissional, uma cadeira, atenção total." },
      { property: "og:title", content: "O Barbeiro — Gustavo Brun" },
      { property: "og:description", content: "Dono e único barbeiro da BRUN BARBER." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SobrePage,
});

const VALUES = [
  {
    title: "Atenção individual",
    text: "Um barbeiro por vez. Quando você está na cadeira, é só você que existe.",
  },
  {
    title: "Acabamento obsessivo",
    text: "Corte só está pronto quando o detalhe mais discreto está impecável.",
  },
  {
    title: "Ambiente com presença",
    text: "Luz baixa, espaço limpo, música no ponto — o resto do dia fica do lado de fora.",
  },
];

function SobrePage() {
  return (
    <div>
      <section className="section-pad">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <p className="eyebrow">O Barbeiro</p>
            <h1 className="mt-4 font-display text-5xl sm:text-6xl">
              {BUSINESS.barber}
            </h1>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              A BRUN BARBER nasceu de uma convicção simples: uma cadeira bem
              cuidada vale mais que dez apressadas. {BUSINESS.barber} é o dono —
              e o único barbeiro. É ele quem recebe, conversa, corta e finaliza.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Sem turnos rodando, sem terceirização. Cada cliente sai com o
              mesmo padrão, porque o padrão tem um nome só.
            </p>
            <p className="mt-8 font-display text-2xl italic text-gold-soft">
              “Aqui você não é o próximo da fila. Você é o único da vez.”
            </p>
            <Link
              to="/agendar"
              className="bg-gradient-gold mt-10 inline-block px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition-transform hover:scale-[1.02]"
            >
              Agendar com Gustavo
            </Link>
          </div>
          <div className="order-1 md:order-2">
            <img
              src={barberImg}
              alt={BUSINESS.barber}
              width={1056}
              height={1408}
              loading="lazy"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-border bg-ink-raised">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="eyebrow">Como trabalhamos</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">Três princípios</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <div key={v.title} className="card-lux p-8">
                <p className="font-display text-4xl text-gold/40">0{i + 1}</p>
                <h3 className="mt-4 font-display text-2xl">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
