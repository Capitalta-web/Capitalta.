create table if not exists public.avaluos (
  id uuid default uuid_generate_v4() primary key,
  solicitud_id uuid references public.solicitudes_credito(id) on delete cascade,
  valor_inmueble numeric(15, 2) not null check (valor_inmueble > 0),
  situacion_legal text,
  fecha_avaluo date not null,
  perito_nombre text,
  documento_avaluo_id uuid references public.documentos(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indices
create index if not exists idx_avaluos_solicitud_id on public.avaluos(solicitud_id);

-- RLS
alter table public.avaluos enable row level security;

-- Drop policies if they exist to avoid "already exists" errors when re-running
drop policy if exists "Clientes ven sus avalúos" on public.avaluos;
drop policy if exists "Staff gestiona avalúos" on public.avaluos;

-- Clientes ven avalúos de sus solicitudes
create policy "Clientes ven sus avalúos"
  on public.avaluos for select
  using (
    exists (
      select 1 from public.solicitudes_credito
      where id = avaluos.solicitud_id
      and cliente_id = auth.uid()
    )
  );

-- Staff gestiona avalúos (Analista y Admin)
create policy "Staff gestiona avalúos"
  on public.avaluos for all
  using (
    (auth.jwt() -> 'user_metadata' ->> 'role') in ('analista', 'admin')
  );
