-- ============================================================
-- CAPITALTA - Permitir tipo 'revolvente' + configuración de tasas
-- ============================================================

-- 1. La restricción de tipo no permitía 'revolvente' (el wizard sí lo ofrece)
alter table public.solicitudes drop constraint if exists solicitudes_tipo_check;
alter table public.solicitudes
  add constraint solicitudes_tipo_check
  check (tipo = any (array['simple'::text, 'empresarial'::text, 'revolvente'::text]));

-- 2. Configuración de tasas de interés (editable por el admin)
-- Tasas ANUALES por banda de BC Score. Mínimo (mejor perfil) = 24%.
create table if not exists public.config_credito (
  id text primary key default 'default',
  tasa_excelente numeric not null default 0.24,  -- score >= 750
  tasa_buena numeric not null default 0.30,       -- score 700-749
  tasa_regular numeric not null default 0.38,     -- score 650-699
  tasa_alta numeric not null default 0.45,        -- score 600-649
  tasa_muy_alta numeric not null default 0.55,    -- score < 600
  updated_at timestamptz default now()
);

insert into public.config_credito (id) values ('default') on conflict (id) do nothing;

alter table public.config_credito enable row level security;

-- El admin lee y edita la configuración de tasas
drop policy if exists "admin gestiona config credito" on public.config_credito;
create policy "admin gestiona config credito"
  on public.config_credito for all
  using ( public.is_admin() )
  with check ( public.is_admin() );

-- Lectura pública opcional (para mostrar 'tasa desde' a clientes) — solo SELECT
drop policy if exists "lectura config credito autenticados" on public.config_credito;
create policy "lectura config credito autenticados"
  on public.config_credito for select
  using ( auth.role() = 'authenticated' );
