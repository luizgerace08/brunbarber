import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  TIME_SLOTS,
  isClosedDay,
  nowHHMM,
  todayISO,
  type ServiceId,
} from "./business";

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida");

/**
 * Horários livres para uma data. O histórico de reservas nunca é exposto
 * ao navegador — só a lista de horários disponíveis.
 */
export const getAvailableSlots = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ date: dateSchema }).parse(d))
  .handler(async ({ data }): Promise<{ date: string; slots: string[]; closed: boolean }> => {
    if (isClosedDay(data.date)) {
      return { date: data.date, slots: [], closed: true };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("appointments")
      .select("appointment_time")
      .eq("appointment_date", data.date)
      .neq("status", "cancelado");

    if (error) {
      console.error("[slots] query failed", error.message);
      throw new Error("Não foi possível consultar a agenda agora.");
    }

    const taken = new Set(
      (rows ?? []).map((r) => String(r.appointment_time).slice(0, 5)),
    );

    let slots = TIME_SLOTS.filter((s) => !taken.has(s));

    // Hoje: só horários com pelo menos 45 minutos de antecedência.
    if (data.date === todayISO()) {
      const [hh, mm] = nowHHMM().split(":");
      const nowMin = Number(hh) * 60 + Number(mm) + 45;
      slots = slots.filter((s) => {
        const [sh, sm] = s.split(":");
        return Number(sh) * 60 + Number(sm) >= nowMin;
      });
    }

    return { date: data.date, slots, closed: false };
  });

const bookingInput = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => v.length >= 10 && v.length <= 13, "Telefone inválido"),
  service: z.enum(["corte", "sobrancelha"]),
  date: dateSchema,
  time: z.string().regex(/^\d{2}:\d{2}$/, "Horário inválido"),
});

export type BookingResult =
  | { ok: true; service: ServiceId; date: string; time: string }
  | { ok: false; error: string };

/** Cria o agendamento. Conflito de horário é tratado com erro amigável. */
export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((d) => bookingInput.parse(d))
  .handler(async ({ data }): Promise<BookingResult> => {
    if (data.date < todayISO()) {
      return { ok: false, error: "Não é possível agendar em datas passadas." };
    }
    if (isClosedDay(data.date)) {
      return { ok: false, error: "Fechamos aos domingos e segundas. Escolha terça a sábado." };
    }
    if (TIME_SLOTS.includes(data.time) === false) {
      return { ok: false, error: "Horário fora do funcionamento (9h às 18h)." };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("appointments").insert({
      service: data.service,
      customer_name: data.name,
      customer_phone: data.phone,
      appointment_date: data.date,
      appointment_time: data.time,
      status: "confirmado",
    });

    if (error) {
      if (error.code === "23505") {
        return { ok: false, error: "Esse horário acabou de ser reservado. Escolha outro." };
      }
      console.error("[booking] insert failed", error.message);
      return { ok: false, error: "Não foi possível concluir o agendamento. Tente novamente." };
    }

    return { ok: true, service: data.service, date: data.date, time: data.time };
  });
