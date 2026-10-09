-- =============================================================================
-- 20261009000100_roles_seguros.sql
-- Seguridad de roles (bloque de seguridad, oct-2026).
--
-- Problema que corrige:
--   * handle_new_user() tomaba el rol de raw_user_meta_data->>'role', que controla
--     el propio usuario al registrarse => cualquiera podía crearse como 'admin'.
--   * La política UPDATE de profiles no impedía que un usuario cambiara su `role`.
--   * Varias políticas usaban auth.jwt()->'user_metadata'->>'role' (editable por el
--     usuario con supabase.auth.updateUser) para dar acceso de analista/admin.
--   * La política "Staff ve todos los perfiles" consultaba profiles dentro de una
--     política de profiles (recursión infinita).
--   * leads / cotizaciones eran legibles por CUALQUIER usuario autenticado y los
--     artículos del blog editables por cualquier usuario autenticado.
--
-- Es idempotente: se puede ejecutar más de una vez. Las secciones que dependen de
-- tablas opcionales comprueban si la tabla existe antes de tocarla.
-- =============================================================================

begin;

-- -----------------------------------------------------------------------------
-- 1. Columna role: default 'cliente', no nula y con valores válidos
-- -----------------------------------------------------------------------------
alter table public.profiles add column if not exists role text;
alter table public.profiles add column if not exists email text;

update public.profiles set role = 'cliente'
 where role is null or role not in ('cliente', 'analista', 'admin', 'notario');

alter table public.profiles alter column role set default 'cliente';
alter table public.profiles alter column role set not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint
     where conrelid = 'public.profiles'::regclass and conname = 'profiles_role_valido'
  ) then
    alter table public.profiles
      add constraint profiles_role_valido check (role in ('cliente', 'analista', 'admin', 'notario'));
  end if;
end $$;

-- -----------------------------------------------------------------------------
-- 2. Funciones auxiliares (SECURITY DEFINER => no disparan RLS de profiles y
--    evitan la recursión infinita). Leen SIEMPRE de profiles.role.
-- -----------------------------------------------------------------------------
create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select p.role from public.profiles p where p.id = auth.uid()
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_user_role() = 'admin', false)
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_user_role() in ('analista', 'admin'), false)
$$;

revoke all on function public.current_user_role() from public, anon;
revoke all on function public.is_admin() from public, anon;
revoke all on function public.is_staff() from public, anon;
grant execute on function public.current_user_role() to authenticated, service_role;
grant execute on function public.is_admin() to authenticated, service_role;
grant execute on function public.is_staff() to authenticated, service_role;

-- -----------------------------------------------------------------------------
-- 3. Alta de perfil: SIEMPRE con rol 'cliente'. Nunca se lee el rol de metadata.
-- -----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, nombre_completo, role, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'nombre_completo', 'Usuario Nuevo'),
    'cliente',
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- -----------------------------------------------------------------------------
-- 4. Trigger que protege la columna role.
--    * Peticiones de usuarios finales (JWT con role 'authenticated' o 'anon'):
--        - INSERT: el rol se fuerza a 'cliente'.
--        - UPDATE: solo un admin puede cambiar el rol de alguien.
--    * service_role (backend) y conexiones directas (SQL editor, sin JWT) no se
--      restringen: son los canales administrativos.
-- -----------------------------------------------------------------------------
create or replace function public.profiles_proteger_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  jwt_role text := coalesce(auth.role(), '');
begin
  if jwt_role not in ('authenticated', 'anon') then
    return new;
  end if;

  if tg_op = 'INSERT' then
    new.role := 'cliente';
    return new;
  end if;

  if new.role is distinct from old.role and not public.is_admin() then
    raise exception 'Solo un administrador puede cambiar roles'
      using errcode = '42501';
  end if;

  return new;
end;
$$;

drop trigger if exists profiles_proteger_role on public.profiles;
create trigger profiles_proteger_role
  before insert or update on public.profiles
  for each row execute function public.profiles_proteger_role();

-- -----------------------------------------------------------------------------
-- 5. RLS de profiles
-- -----------------------------------------------------------------------------
alter table public.profiles enable row level security;

drop policy if exists "Staff ve todos los perfiles" on public.profiles;          -- recursiva
drop policy if exists "Analistas ven todos los perfiles" on public.profiles;     -- usaba user_metadata
drop policy if exists "Usuarios actualizan su propio perfil" on public.profiles;
drop policy if exists "Usuarios ven su propio perfil" on public.profiles;
drop policy if exists "Usuarios crean su propio perfil" on public.profiles;
drop policy if exists "Staff ve perfiles" on public.profiles;
drop policy if exists "Admins actualizan perfiles" on public.profiles;

create policy "Usuarios ven su propio perfil"
  on public.profiles for select to authenticated
  using (auth.uid() = id);

create policy "Staff ve perfiles"
  on public.profiles for select to authenticated
  using (public.current_user_role() in ('analista', 'admin', 'notario'));

-- El usuario solo puede crear SU fila (el trigger fuerza role = 'cliente').
create policy "Usuarios crean su propio perfil"
  on public.profiles for insert to authenticated
  with check (auth.uid() = id);

-- El usuario puede editar su fila; el trigger impide cambiar role.
create policy "Usuarios actualizan su propio perfil"
  on public.profiles for update to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Solo admin puede editar perfiles ajenos (incluido el rol).
create policy "Admins actualizan perfiles"
  on public.profiles for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- -----------------------------------------------------------------------------
-- 6. Reemplazar políticas basadas en user_metadata por funciones sobre profiles
-- -----------------------------------------------------------------------------
do $$
begin
  if to_regclass('public.solicitudes_credito') is not null then
    execute 'drop policy if exists "Analistas y Admins ven todas las solicitudes" on public.solicitudes_credito';
    execute 'drop policy if exists "Analistas y Admins gestionan solicitudes" on public.solicitudes_credito';
    execute $p$create policy "Analistas y Admins ven todas las solicitudes"
      on public.solicitudes_credito for select to authenticated
      using (public.is_staff())$p$;
    execute $p$create policy "Analistas y Admins gestionan solicitudes"
      on public.solicitudes_credito for update to authenticated
      using (public.is_staff()) with check (public.is_staff())$p$;
  end if;

  if to_regclass('public.avaluos') is not null then
    execute 'drop policy if exists "Staff gestiona avalúos" on public.avaluos';
    execute $p$create policy "Staff gestiona avalúos"
      on public.avaluos for all to authenticated
      using (public.is_staff()) with check (public.is_staff())$p$;
  end if;

  -- leads: antes cualquier usuario autenticado veía TODOS los leads (datos personales).
  if to_regclass('public.leads') is not null then
    execute 'drop policy if exists "Solo usuarios autenticados ven leads" on public.leads';
    execute 'drop policy if exists "Staff ve leads" on public.leads';
    execute $p$create policy "Staff ve leads"
      on public.leads for select to authenticated
      using (public.is_staff())$p$;
  end if;

  if to_regclass('public.cotizaciones') is not null then
    execute 'drop policy if exists "Solo usuarios autenticados ven cotizaciones" on public.cotizaciones';
    execute 'drop policy if exists "Staff ve cotizaciones" on public.cotizaciones';
    execute $p$create policy "Staff ve cotizaciones"
      on public.cotizaciones for select to authenticated
      using (public.is_staff())$p$;
  end if;

  -- artículos del blog: antes cualquier usuario autenticado podía editarlos/borrarlos.
  if to_regclass('public.articulos') is not null then
    execute 'drop policy if exists "Usuarios autenticados gestionan articulos" on public.articulos';
    execute 'drop policy if exists "Admins gestionan articulos" on public.articulos';
    execute $p$create policy "Admins gestionan articulos"
      on public.articulos for all to authenticated
      using (public.is_admin()) with check (public.is_admin())$p$;
  end if;
end $$;

-- -----------------------------------------------------------------------------
-- 7. Solicitudes: un cliente no puede cambiar el estado/analista de su solicitud
--    ni crearla en un estado avanzado (auto-aprobación).
-- -----------------------------------------------------------------------------
create or replace function public.solicitudes_proteger_campos()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(auth.role(), '') not in ('authenticated', 'anon') or public.is_staff() then
    return new;
  end if;

  if tg_op = 'INSERT' then
    new.estado := 'solicitud_iniciada';
    new.cliente_id := auth.uid();
    return new;
  end if;

  if new.estado is distinct from old.estado
     or new.cliente_id is distinct from old.cliente_id
     or (to_jsonb(new) ->> 'analista_id') is distinct from (to_jsonb(old) ->> 'analista_id') then
    raise exception 'No autorizado para modificar estado, cliente o analista de la solicitud'
      using errcode = '42501';
  end if;
  return new;
end;
$$;

do $$
begin
  if to_regclass('public.solicitudes_credito') is not null then
    execute 'drop trigger if exists solicitudes_proteger_campos on public.solicitudes_credito';
    execute 'create trigger solicitudes_proteger_campos
               before insert or update on public.solicitudes_credito
               for each row execute function public.solicitudes_proteger_campos()';
  end if;
end $$;

commit;

notify pgrst, 'reload schema';
