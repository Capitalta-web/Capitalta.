-- Reversión de 20261010000100_seguridad_produccion.sql: deja políticas, funciones y
-- grants como estaban el 10-oct-2026 (incluidas las vulnerabilidades). Úsese solo si
-- la migración rompe la app y mientras se corrige.
begin;

create or replace function public.user_role()
returns text language sql stable as $$
  SELECT COALESCE(auth.jwt() ->> 'user_role', (SELECT role FROM profiles WHERE id = auth.uid() LIMIT 1), 'cliente')
$$;

create or replace function public.prevent_role_change()
returns trigger language plpgsql security definer set search_path = public as $$
declare caller_role text;
begin
  if (auth.role() = 'service_role') then return new; end if;
  select role into caller_role from public.profiles where id = auth.uid();
  if (caller_role = 'admin') then return new; end if;
  new.role := old.role; new.status := old.status; return new;
end;
$$;

grant execute on function public.is_admin(), public.user_role(), public.handle_new_user(), public.prevent_role_change()
  to public, anon, authenticated, service_role;

drop policy if exists "profiles_select_self" on public.profiles;
drop policy if exists "profiles_select_admin" on public.profiles;
drop policy if exists "profiles_select_all" on public.profiles;
create policy "profiles_select_all" on public.profiles for select using (true);
alter policy "profiles_update_self" on public.profiles to public using (auth.uid() = id) with check (auth.uid() = id);
alter policy "profiles_update_admin" on public.profiles to public using (is_admin()) with check (is_admin());

drop policy if exists "solicitudes_insert_self" on public.solicitudes;
create policy "solicitudes_insert_self" on public.solicitudes for insert with check (auth.uid() = cliente_id);
drop policy if exists "solicitudes_update_self" on public.solicitudes;
create policy "solicitudes_update_self" on public.solicitudes for update using (auth.uid() = cliente_id) with check (auth.uid() = cliente_id);
alter policy "solicitudes_select_self" on public.solicitudes to public using (auth.uid() = cliente_id);
alter policy "solicitudes_select_admin" on public.solicitudes to public using (is_admin());
alter policy "solicitudes_update_admin" on public.solicitudes to public using (is_admin()) with check (is_admin());

drop policy if exists "documentos_select_self" on public.documentos;
drop policy if exists "documentos_insert_self" on public.documentos;
drop policy if exists "documentos_update_self" on public.documentos;
drop policy if exists "documentos_admin" on public.documentos;
drop policy if exists "Cliente gestiona sus documentos" on public.documentos;
drop policy if exists "Staff ve todos los documentos" on public.documentos;
create policy "Cliente gestiona sus documentos" on public.documentos for all using (auth.uid() = cliente_id) with check (auth.uid() = cliente_id);
create policy "Staff ve todos los documentos" on public.documentos for select using (is_admin() or auth.role() = 'service_role');

drop policy if exists "Users see own citas" on public.citas;
create policy "Users see own citas" on public.citas for select using (
  solicitud_id in (select solicitudes.id from solicitudes where solicitudes.cliente_id = auth.uid())
  or analista_id = auth.uid() or (auth.jwt() ->> 'role') = 'admin');

drop policy if exists "Admins see leads" on public.leads;
create policy "Admins see leads" on public.leads for select using ((auth.jwt() ->> 'role') = any (array['admin', 'analista']));

alter policy "admin gestiona config credito" on public.config_credito to public using (is_admin()) with check (is_admin());
alter policy "lectura config credito autenticados" on public.config_credito to public using (auth.role() = 'authenticated');
alter policy "admin lee consultas buro" on public.buro_consultas to public using (is_admin());

update storage.buckets set file_size_limit = null, allowed_mime_types = null where id = 'documentos';
-- `documentos-credito` (vacío) se puede borrar desde Storage si se quiere volver al estado previo.
drop policy if exists "Admin lee documentos" on storage.objects;

commit;
notify pgrst, 'reload schema';
