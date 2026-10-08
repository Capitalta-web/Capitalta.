-- ============================================================
-- CAPITALTA - Integración con Buró de Crédito
-- Tablas para configuración (credenciales cifradas) y bitácora
-- de consultas (obligatoria por ley conservar registro).
-- ============================================================

-- 1. Configuración del buró (una sola fila). Credenciales CIFRADAS.
create table if not exists public.buro_config (
  id text primary key default 'default',
  provider text not null default 'buro_de_credito',
  modo text not null default 'sandbox',          -- sandbox | produccion
  endpoint_url text,
  producto text default 'reporte_credito',
  credenciales_cifradas text,                     -- AES-256-GCM (cifrado en servidor)
  actualizado_por uuid references auth.users(id),
  updated_at timestamptz default now()
);

-- RLS: SIN políticas para usuarios -> solo el service_role (backend) accede.
alter table public.buro_config enable row level security;

-- 2. Bitácora de consultas a buró
create table if not exists public.buro_consultas (
  id uuid primary key default gen_random_uuid(),
  solicitud_id uuid references public.solicitudes(id) on delete set null,
  cliente_id uuid references auth.users(id) on delete set null,
  consultado_por uuid references auth.users(id),
  modo text,                                       -- sandbox | produccion
  score integer,
  resultado jsonb,
  status text default 'success',                   -- success | error
  error_msg text,
  created_at timestamptz default now()
);

alter table public.buro_consultas enable row level security;

-- El admin puede leer la bitácora; los inserts los hace el backend (service_role)
drop policy if exists "admin lee consultas buro" on public.buro_consultas;
create policy "admin lee consultas buro"
  on public.buro_consultas for select
  using ( public.is_admin() );
