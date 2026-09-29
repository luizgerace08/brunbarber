export const BUSINESS = {
  name: "BRUN BARBER",
  tagline: "Barbearia",
  barber: "Gustavo Brun",
  address: "Rua Ciro Monteiro, 174",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Rua Ciro Monteiro, 174"),
  hoursLabel: "Terça a Sábado · 9h às 18h",
  hoursShort: "Ter–Sáb · 9h–18h",
  whatsappNumber: "5511999999999", // TODO: confirmar número real do WhatsApp com o cliente
  whatsappDisplay: "(11) 99999-9999",
  services: [
    {
      id: "corte",
      name: "Corte",
      price: "R$ 25",
      duration: 40,
      description:
        "Corte assinado com precisão: máquina, tesoura e finalização com produto.",
    },
    {
      id: "sobrancelha",
      name: "Sobrancelha",
      price: "R$ 10",
      duration: 15,
      description:
        "Design na navalha, com acabamento limpo e natural, sem exageros.",
    },
  ],
} as const;

export type ServiceId = (typeof BUSINESS.services)[number]["id"];

export function serviceById(id: string) {
  return BUSINESS.services.find((s) => s.id === id);
}

/** Horários oferecidos: 9h às 17h30, de 30 em 30 minutos. */
export const TIME_SLOTS: string[] = (() => {
  const slots: string[] = [];
  for (let h = 9; h <= 17; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h < 17) slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  slots.push("17:30");
  return slots;
})();

export function whatsappLink(message: string) {
  return `https://wa.me/qr/OASDZ7QGV4FUJ1${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Dia da semana (0=domingo … 6=sábado) para uma data YYYY-MM-DD. */
export function weekdayOf(dateISO: string) {
  return new Date(`${dateISO}T12:00:00Z`).getUTCDay();
}

export function isClosedDay(dateISO: string) {
  const d = weekdayOf(dateISO);
  return d === 0 || d === 1; // domingo e segunda
}

export function todayISO(offsetHours = -3) {
  const now = new Date(Date.now() + offsetHours * 3600_000);
  return now.toISOString().slice(0, 10);
}

export function nowHHMM(offsetHours = -3) {
  const now = new Date(Date.now() + offsetHours * 3600_000);
  return now.toISOString().slice(11, 16);
}

export function formatBR(dateISO: string) {
  const [y, m, d] = dateISO.split("-");
  return `${d}/${m}/${y}`;
}

const WEEKDAYS_PT = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

export function weekdayPT(dateISO: string) {
  return WEEKDAYS_PT[weekdayOf(dateISO)];
}
