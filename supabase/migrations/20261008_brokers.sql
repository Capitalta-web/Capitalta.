-- Registro de interesados en el Programa de Brókers (/quiero-ser-broker).
-- Solo el backend (service role) lee y escribe: RLS activo y sin políticas públicas.

create table if not exists public.brokers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  nombre text not null,
  apellido text not null,
  email text not null unique,
  telefono text not null,
  ciudad text not null,
  experiencia text not null,
  perfil text,
  mensaje text,
  acepta_privacidad boolean not null default false,
  status text not null default 'nuevo' check (status in ('nuevo', 'contactado', 'en_proceso', 'activo', 'descartado')),
  origen text not null default 'web',
  source_path text
);

create index if not exists brokers_created_at_idx on public.brokers (created_at desc);

alter table public.brokers enable row level security;

-- Que la API REST vea la tabla nueva de inmediato
notify pgrst, 'reload schema';
