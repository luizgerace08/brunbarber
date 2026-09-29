create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  service text not null check (service in ('corte','sobrancelha')),
  customer_name text not null,
  customer_phone text not null,
  appointment_date date not null,
  appointment_time time not null,
  status text not null default 'confirmado',
  created_at timestamptz not null default now(),
  unique (appointment_date, appointment_time)
);

GRANT ALL ON public.appointments TO service_role;

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;