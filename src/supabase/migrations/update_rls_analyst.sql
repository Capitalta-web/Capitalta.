-- ------------------------------------------------------------
-- MIGRACIÓN: Permisos para Analistas y Admins
-- ------------------------------------------------------------

-- 1. Políticas para tabla 'solicitudes_credito'

-- Permitir a Analistas y Admins ver TODAS las solicitudes
-- Se basa en el rol guardado en user_metadata del JWT para evitar dependencias circulares con tablas
drop policy if exists "Analistas y Admins ven todas las solicitudes" on public.solicitudes_credito;
create policy "Analistas y Admins ven todas las solicitudes"
  on public.solicitudes_credito for select
  using (
    (auth.jwt() -> 'user_metadata' ->> 'role') in ('analista', 'admin')
  );

-- Permitir a Analistas y Admins actualizar solicitudes (ej. cambiar estado)
drop policy if exists "Analistas y Admins gestionan solicitudes" on public.solicitudes_credito;
create policy "Analistas y Admins gestionan solicitudes"
  on public.solicitudes_credito for update
  using (
    (auth.jwt() -> 'user_metadata' ->> 'role') in ('analista', 'admin')
  );


-- 2. Políticas para tabla 'profiles' (necesario para ver nombres de clientes)

-- Asegurar RLS habilitado
alter table public.profiles enable row level security;

-- Permitir a Analistas ver todos los perfiles
drop policy if exists "Analistas ven todos los perfiles" on public.profiles;
create policy "Analistas ven todos los perfiles"
  on public.profiles for select
  using (
    (auth.jwt() -> 'user_metadata' ->> 'role') in ('analista', 'admin')
  );
