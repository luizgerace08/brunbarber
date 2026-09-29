import { createFileRoute, Link } from "@tanstack/react-router";
import craftImg from "@/assets/craft.jpg";
import { BUSINESS } from "@/lib/business";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — BRUN BARBER" },
      { name: "description", content: "Corte R$ 25 e sobrancelha R$ 10 na BRUN BARBER. Terça a sábado, 9h às 18h. Agende online." },
      { property: "og:title", content: "Serviços — BRUN BARBER" },
      { property: "og:description", content: "Corte R$ 25 e sobrancelha R$ 10. Agende seu horário." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicosPage,
});

function ServicosPage() {
  return (
    <div>
      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="eyebrow">Serviços</p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl">O essencial, bem feito</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Duas especialidades, nenhum atalho. Preço fechado, sem surpresa.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {BUSINESS.services.map((s) => (
              <article key={s.id} className="card-lux flex flex-col p-10">
                <p className="eyebrow">{s.name}</p>
                <p className="mt-5 font-display text-6xl text-gradient-gold">{s.price}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Aprox. {s.duration} minutos
                </p>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-3"><span className="text-gold">—</span> Consulta rápida sobre o formato ideal</li>
                  <li className="flex gap-3"><span className="text-gold">—</span> Acabamento na navalha</li>
                  <li className="flex gap-3"><span className="text-gold">—</span> Finalização com produto</li>
                </ul>
                <Link
                  to="/agendar"
                  className="mt-10 inline-block border border-gold/60 px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-ink"
                >
                  Agendar {s.name.toLowerCase()}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border">
        <img
          src={craftImg}
          alt="Ferramentas de barbearia"
          width={1056}
          height={1408}
          loading="lazy"
          className="h-72 w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <p className="max-w-xl text-center font-display text-2xl italic sm:text-3xl">
            Corte + sobrancelha no mesmo horário? <span className="text-gradient-gold">Basta escolher os dois ao agendar.</span>
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
          <h2 className="font-display text-4xl">Pronto para a cadeira?</h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            {BUSINESS.hoursLabel} · {BUSINESS.address}
          </p>
          <Link
            to="/agendar"
            className="bg-gradient-gold mt-10 inline-block px-10 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition-transform hover:scale-[1.02]"
          >
            Agendar horário
          </Link>
        </div>
      </section>
    </div>
  );
}
