-- ============================================================
-- CAPITALTA - Arreglo de RLS para administradores
-- Las políticas de admin usaban auth.jwt()->>'role' = 'admin',
-- que NUNCA se cumple (Supabase no pone el rol de la app en el JWT).
-- Resultado: el admin no veía solicitudes/usuarios/documentos.
--
-- Solución: función is_admin() que lee el rol real desde profiles.
-- ============================================================

-- Función segura para saber si el usuario actual es admin
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- SOLICITUDES: admin ve y actualiza todas
drop policy if exists "solicitudes_select_admin" on public.solicitudes;
create policy "solicitudes_select_admin"
  on public.solicitudes for select
  using ( public.is_admin() );

drop policy if exists "solicitudes_update_admin" on public.solicitudes;
create policy "solicitudes_update_admin"
  on public.solicitudes for update
  using ( public.is_admin() )
  with check ( public.is_admin() );

-- PROFILES: admin actualiza cualquier perfil (cambiar rol/estado en el panel)
drop policy if exists "profiles_update_admin" on public.profiles;
create policy "profiles_update_admin"
  on public.profiles for update
  using ( public.is_admin() )
  with check ( public.is_admin() );

-- DOCUMENTOS: admin (o backend) ve todos los documentos de clientes
drop policy if exists "Staff ve todos los documentos" on public.documentos;
create policy "Staff ve todos los documentos"
  on public.documentos for select
  using ( public.is_admin() or auth.role() = 'service_role' );
