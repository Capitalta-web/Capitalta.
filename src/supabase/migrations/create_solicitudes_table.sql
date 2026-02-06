-- Crear tabla solicitudes_credito
create table if not exists public.solicitudes_credito (
  id uuid default uuid_generate_v4() primary key,
  cliente_id uuid references auth.users(id) on delete cascade,
  tipo_credito text not null check (tipo_credito in ('simple', 'empresarial', 'revolvente', 'venta_key')),
  monto_solicitado numeric not null,
  plazo_meses integer not null,
  estado text default 'solicitud_iniciada',
  fecha_solicitud timestamptz default now(),
  updated_at timestamptz default now(),
  detalles jsonb -- Para campos extra como RFC, nombre empresa, etc.
);

-- Habilitar seguridad (RLS)
alter table public.solicitudes_credito enable row level security;

-- Políticas de acceso

-- Usuarios pueden ver sus propias solicitudes
drop policy if exists "Users can view their own applications" on public.solicitudes_credito;
create policy "Users can view their own applications"
  on public.solicitudes_credito for select
  using (auth.uid() = cliente_id);

-- Usuarios pueden insertar sus propias solicitudes
drop policy if exists "Users can insert their own applications" on public.solicitudes_credito;
create policy "Users can insert their own applications"
  on public.solicitudes_credito for insert
  with check (auth.uid() = cliente_id);

-- Usuarios pueden actualizar sus propias solicitudes
drop policy if exists "Users can update their own applications" on public.solicitudes_credito;
create policy "Users can update their own applications"
  on public.solicitudes_credito for update
  using (auth.uid() = cliente_id);

-- Trigger para updated_at
drop trigger if exists on_solicitudes_updated on public.solicitudes_credito;
create trigger on_solicitudes_updated
  before update on public.solicitudes_credito
  for each row execute procedure public.handle_updated_at();

-- NOTA: Se ha omitido la creación de la vista 'profiles' ya que la tabla 'profiles' ya existe en la base de datos.
