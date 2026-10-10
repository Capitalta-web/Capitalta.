-- =============================================================================
-- 20261010000100_seguridad_produccion.sql
-- Endurecimiento de la base de PRODUCCIÓN (proyecto Supabase "Capitalta-app",
-- ref kzytjaiobipsgomocjxi), escrito contra su esquema REAL (inspeccionado el
-- 10-oct-2026): profiles, solicitudes, documentos, citas, leads, config_credito,
-- buro_config, buro_consultas, brokers; bucket privado `documentos`.
--
-- Corrige (confirmado en producción):
--   1. profiles: la política "profiles_select_all" (USING true, rol public) deja que
--      CUALQUIERA, incluso sin sesión (anon key), lea todos los perfiles: correo,
--      teléfono, RFC, CURP, fecha de nacimiento y domicilio.
--   2. solicitudes: "solicitudes_update_self" deja que el cliente cambie su solicitud
--      en cualquier momento, incluido status (p. ej. 'aprobada'), monto y admin_notes.
--      Al insertar podía crearla ya 'aprobada' o con admin_notes.
--   3. documentos: "Cliente gestiona sus documentos" (ALL) deja que el cliente se
--      apruebe sus propios documentos (status) o los borre.
--   4. Funciones SECURITY DEFINER ejecutables por anon vía /rest/v1/rpc
--      (handle_new_user, prevent_role_change, is_admin) y user_role() sin search_path.
--   5. citas / leads: las políticas comparaban auth.jwt()->>'role' con 'admin', que
--      nunca coincide (siempre es 'authenticated'). Se pasan a is_admin().
--   6. prevent_role_change() revertía en silencio los cambios de rol hechos desde el
--      SQL Editor (sin JWT). Ahora el SQL directo cuenta como canal administrativo.
--   7. /api/storage/ensure-bucket permite a cualquier usuario con sesión crear el
--      bucket `documentos-credito` como PÚBLICO. Se crea aquí PRIVADO para que esa
--      ruta solo lo encuentre ya existente (la app usa `documentos`).
--
-- Compatible con el código de main (cf9d849): el cliente solo INSERTA solicitudes
-- con status 'pendiente', sube documentos con upsert (status 'pendiente') y edita
-- su perfil; el admin lee/actualiza desde el panel (is_admin()).
-- Idempotente. Se ejecuta en una transacción. Reversión: ver
-- supabase/rollback/20261010000100_seguridad_produccion_rollback.sql
-- =============================================================================

begin;

-- -----------------------------------------------------------------------------
-- 0. Funciones de rol
-- -----------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- user_role(): ya no confía en un claim del JWT; lee solo profiles.
create or replace function public.user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select role from public.profiles where id = auth.uid()), 'cliente');
$$;

-- prevent_role_change(): usuarios finales no cambian role/status; admin, service_role
-- y SQL directo (sin JWT) sí.
create or replace function public.prevent_role_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(auth.role(), '') not in ('authenticated', 'anon') then
    return new;
  end if;
  if public.is_admin() then
    return new;
  end if;
  new.role := old.role;
  new.status := old.status;
  return new;
end;
$$;

revoke all on function public.is_admin() from public, anon;
revoke all on function public.user_role() from public, anon;
revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.prevent_role_change() from public, anon, authenticated;
grant execute on function public.is_admin() to authenticated, service_role;
grant execute on function public.user_role() to authenticated, service_role;

-- -----------------------------------------------------------------------------
-- 1. profiles
-- -----------------------------------------------------------------------------
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_all" on public.profiles;
drop policy if exists "profiles_select_self" on public.profiles;
drop policy if exists "profiles_select_admin" on public.profiles;

create policy "profiles_select_self"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()));

create policy "profiles_select_admin"
  on public.profiles for select to authenticated
  using ((select public.is_admin()));

alter policy "profiles_update_self" on public.profiles to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));
alter policy "profiles_update_admin" on public.profiles to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

-- -----------------------------------------------------------------------------
-- 2. solicitudes: el cliente crea su solicitud en 'pendiente' y ya no la modifica.
-- -----------------------------------------------------------------------------
alter table public.solicitudes enable row level security;

drop policy if exists "solicitudes_update_self" on public.solicitudes;
drop policy if exists "solicitudes_insert_self" on public.solicitudes;

create policy "solicitudes_insert_self"
  on public.solicitudes for insert to authenticated
  with check (
    cliente_id = (select auth.uid())
    and coalesce(status, 'pendiente') = 'pendiente'
    and admin_notes is null
  );

alter policy "solicitudes_select_self" on public.solicitudes to authenticated
  using (cliente_id = (select auth.uid()));
alter policy "solicitudes_select_admin" on public.solicitudes to authenticated
  using ((select public.is_admin()));
alter policy "solicitudes_update_admin" on public.solicitudes to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

-- -----------------------------------------------------------------------------
-- 3. documentos: el cliente ve y (re)sube los suyos en 'pendiente'; no los aprueba
--    ni los borra. El admin los ve y gestiona.
-- -----------------------------------------------------------------------------
alter table public.documentos enable row level security;

drop policy if exists "Cliente gestiona sus documentos" on public.documentos;
drop policy if exists "Staff ve todos los documentos" on public.documentos;
drop policy if exists "documentos_select_self" on public.documentos;
drop policy if exists "documentos_insert_self" on public.documentos;
drop policy if exists "documentos_update_self" on public.documentos;
drop policy if exists "documentos_admin" on public.documentos;

create policy "documentos_select_self"
  on public.documentos for select to authenticated
  using (cliente_id = (select auth.uid()));

create policy "documentos_insert_self"
  on public.documentos for insert to authenticated
  with check (cliente_id = (select auth.uid()) and status = 'pendiente');

-- Re-subir (upsert on conflict cliente_id,tipo) vuelve el documento a 'pendiente'.
create policy "documentos_update_self"
  on public.documentos for update to authenticated
  using (cliente_id = (select auth.uid()))
  with check (cliente_id = (select auth.uid()) and status = 'pendiente');

create policy "documentos_admin"
  on public.documentos for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

-- -----------------------------------------------------------------------------
-- 4. citas, leads, config_credito, buro_consultas: is_admin() y solo authenticated
-- -----------------------------------------------------------------------------
drop policy if exists "Users see own citas" on public.citas;
create policy "Users see own citas"
  on public.citas for select to authenticated
  using (
    solicitud_id in (select s.id from public.solicitudes s where s.cliente_id = (select auth.uid()))
    or analista_id = (select auth.uid())
    or (select public.is_admin())
  );

drop policy if exists "Admins see leads" on public.leads;
create policy "Admins see leads"
  on public.leads for select to authenticated
  using ((select public.is_admin()));
-- "Anyone creates lead" (INSERT con check true) se conserva: formulario público.

alter policy "admin gestiona config credito" on public.config_credito to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
alter policy "lectura config credito autenticados" on public.config_credito to authenticated
  using (true);

alter policy "admin lee consultas buro" on public.buro_consultas to authenticated
  using ((select public.is_admin()));

-- -----------------------------------------------------------------------------
-- 5. Storage
-- -----------------------------------------------------------------------------
-- Bucket real de expedientes: privado, 10 MB, PDF/JPG/PNG.
update storage.buckets
   set public = false,
       file_size_limit = 10485760,
       allowed_mime_types = array['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
 where id = 'documentos';

-- Reservar `documentos-credito` como PRIVADO (ensure-bucket ya no podrá crearlo público).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('documentos-credito', 'documentos-credito', false, 10485760,
        array['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'])
on conflict (id) do update set public = false;

-- El admin puede ver los archivos del bucket `documentos` (revisión de expedientes).
drop policy if exists "Admin lee documentos" on storage.objects;
create policy "Admin lee documentos"
  on storage.objects for select to authenticated
  using (bucket_id = 'documentos' and (select public.is_admin()));

commit;

notify pgrst, 'reload schema';
