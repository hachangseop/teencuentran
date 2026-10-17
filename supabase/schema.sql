-- TeEncuentran — esquema inicial (W1)
-- Ejecutar en el SQL Editor de Supabase (una sola vez).

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  negocio text not null,
  whatsapp text not null,
  email text not null,
  score int,
  respuestas jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- El formulario /beta inserta con la anon key: permitir INSERT público,
-- sin permitir lectura pública.
drop policy if exists "leads_insert_anon" on public.leads;
create policy "leads_insert_anon"
  on public.leads
  for insert
  to anon
  with check (true);
