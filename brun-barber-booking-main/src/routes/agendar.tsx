import { useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Link, createFileRoute } from "@tanstack/react-router";
import { getAvailableSlots, createBooking } from "@/lib/appointments.functions";
import {
  BUSINESS,
  formatBR,
  isClosedDay,
  serviceById,
  todayISO,
  weekdayPT,
  whatsappLink,
  type ServiceId,
} from "@/lib/business";

export const Route = createFileRoute("/agendar")({
  head: () => ({
    meta: [
      { title: "Agendar horário — BRUN BARBER" },
      { name: "description", content: "Agende seu corte ou sobrancelha na BRUN BARBER. Escolha data e horário, terça a sábado, 9h às 18h." },
      { property: "og:title", content: "Agendar horário — BRUN BARBER" },
      { property: "og:description", content: "Escolha data e horário e garanta sua cadeira." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AgendarPage,
});

const MAX_DATE_DAYS = 45;

function dateMax() {
  const d = new Date(Date.now() + MAX_DATE_DAYS * 86400_000);
  return d.toISOString().slice(0, 10);
}

function AgendarPage() {
  const fetchSlots = useServerFn(getAvailableSlots);
  const submitBooking = useServerFn(createBooking);

  const [service, setService] = useState<ServiceId | null>(null);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState<{ service: ServiceId; date: string; time: string } | null>(null);

  const slotsQuery = useQuery({
    queryKey: ["slots", date],
    queryFn: () => fetchSlots({ data: { date } }),
    enabled: date.length === 10,
  });

  const minDate = useMemo(() => todayISO(), []);
  const dateRef = useRef<HTMLInputElement>(null);
  const canSubmit =
    service !== null && date.length === 10 && time !== null && name.trim().length >= 2 && phone.trim().length >= 8;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setError(null);
    const result = await submitBooking({ data: { name, phone, service: service!, date, time: time! } });
    setSubmitting(false);
    if (result.ok) {
      setBooked({ service: result.service, date: result.date, time: result.time });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setError(result.error);
      if (time) setTime(null);
      void slotsQuery.refetch();
    }
  }

  if (booked) {
    const svc = serviceById(booked.service);
    const message = `Olá, Gustavo! Acabei de agendar pelo site: ${svc?.name} em ${formatBR(booked.date)} às ${booked.time}. Meu nome é ${name.trim()} (tel: ${phone.trim()}).`;
    return (
      <section className="section-pad">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <div className="card-lux p-12 text-center">
            <p className="eyebrow">Agendamento confirmado</p>
            <h1 className="mt-5 font-display text-5xl">
              Nos vemos<span className="text-gradient-gold"> em breve</span>
            </h1>
            <div className="hairline my-8" />
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground">{svc?.name}</span> · {formatBR(booked.date)} às{" "}
              <span className="text-foreground">{booked.time}</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {BUSINESS.address} · {BUSINESS.hoursShort}
            </p>
            <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Toque abaixo para confirmar com o Gustavo no WhatsApp — já vai tudo preenchido.
            </p>
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noreferrer"
              className="bg-gradient-gold mt-8 inline-block px-10 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition-transform hover:scale-[1.02]"
            >
              Confirmar no WhatsApp
            </a>
            <button
              type="button"
              onClick={() => {
                setBooked(null);
                setService(null);
                if (dateRef.current) dateRef.current.value = "";
                setDate("");
                setTime(null);
                setName("");
                setPhone("");
              }}
              className="mt-6 block w-full text-center text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-gold"
            >
              Fazer outro agendamento
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <p className="eyebrow">Agendamento</p>
        <h1 className="mt-4 font-display text-5xl sm:text-6xl">Sua cadeira espera</h1>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Escolha o serviço, a data e o horário. Ao final, a confirmação é enviada
          direto no WhatsApp do Gustavo.
        </p>

        <form onSubmit={handleSubmit} className="card-lux mt-12 p-8 sm:p-10">
          {/* Serviço */}
          <p className="eyebrow">1 · Serviço</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {BUSINESS.services.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setService(s.id)}
                aria-pressed={service === s.id}
                className={`border p-5 text-left transition-colors ${
                  service === s.id
                    ? "border-gold bg-gold/10"
                    : "border-border hover:border-gold/50"
                }`}
              >
                <p className="font-display text-2xl">{s.name}</p>
                <p className="mt-1 text-sm text-gold">{s.price}</p>
                <p className="mt-2 text-xs text-muted-foreground">{s.duration} min</p>
              </button>
            ))}
          </div>

          {/* Data */}
          <p className="eyebrow mt-10">2 · Data</p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <input
              type="date"
              required
              // Não controlado: reescrever `value` no meio da digitação faz o
              // Chromium resetar os segmentos do campo (bug clássico de
              // input[type=date] controlado no React). O onChange alimenta o
              // estado; o campo nunca é reescrito.
              ref={dateRef}
              min={minDate}
              max={dateMax()}
              onChange={(e) => {
                setDate(e.target.value);
                setTime(null);
                setError(null);
              }}
              className="border border-input bg-transparent px-4 py-3 text-sm text-foreground outline-none focus:border-gold [color-scheme:dark]"
            />
            {date && (
              <span className="text-sm text-muted-foreground">
                {isClosedDay(date)
                  ? "Fechamos neste dia (dom/seg)."
                  : weekdayPT(date)}
              </span>
            )}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{BUSINESS.hoursShort}</p>

          {/* Horário */}
          <p className="eyebrow mt-10">3 · Horário</p>
          <div className="mt-4 min-h-16">
            {!date ? (
              <p className="text-sm text-muted-foreground">Escolha uma data primeiro.</p>
            ) : isClosedDay(date) ? (
              <p className="text-sm text-muted-foreground">
                Não atendemos aos domingos e segundas. Escolha de terça a sábado.
              </p>
            ) : slotsQuery.isPending ? (
              <p className="text-sm text-muted-foreground">Consultando agenda…</p>
            ) : slotsQuery.isError ? (
              <p className="text-sm text-destructive">
                Não foi possível consultar a agenda. Tente novamente.
              </p>
            ) : (slotsQuery.data?.slots.length ?? 0) === 0 ? (
              <p className="text-sm text-muted-foreground">
                Sem horários livres nesse dia. Tente outra data.
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {slotsQuery.data!.slots.map((slot: string) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      setTime(slot);
                      setError(null);
                    }}
                    aria-pressed={time === slot}
                    className={`border py-2.5 text-sm transition-colors ${
                      time === slot
                        ? "border-gold bg-gold text-ink"
                        : "border-border text-muted-foreground hover:border-gold/60 hover:text-gold"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dados */}
          <p className="eyebrow mt-10">4 · Seus dados</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Nome</span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                maxLength={80}
                className="mt-2 w-full border border-input bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-gold"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">WhatsApp / Telefone</span>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                maxLength={20}
                className="mt-2 w-full border border-input bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-gold"
              />
            </label>
          </div>

          {error && (
            <p className="mt-6 border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="bg-gradient-gold mt-10 w-full py-4 text-xs font-semibold uppercase tracking-[0.24em] text-ink transition-opacity disabled:opacity-40"
          >
            {submitting ? "Reservando…" : "Confirmar agendamento"}
          </button>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Depois de confirmar, você será levado ao WhatsApp para falar com o Gustavo.
          </p>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Dúvidas?{" "}
          <Link to="/contato" className="text-gold hover:text-gold-soft">
            Fale com a gente
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
