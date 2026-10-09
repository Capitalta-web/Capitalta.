-- =============================================================================
-- 20261009000300_storage_documentos_privado.sql
-- Bucket `documentos-credito` (INE, comprobantes, escrituras...) pasa a PRIVADO.
--
-- Estructura de rutas que usa la app: <solicitud_id>/<tipo>_<timestamp>_<rand>.<ext>
-- Acceso:
--   * Cliente: solo objetos dentro de carpetas de SUS solicitudes (o que subió él).
--   * Analista / admin: lectura de todo el bucket (public.is_staff()).
--   * Admin: puede borrar.
-- La app ya no guarda URLs públicas: guarda la ruta del objeto y genera
-- signed URLs de corta duración (src/utils/documentosStorage.js).
-- Requiere: 20261009000100_roles_seguros.sql (funciones is_staff / is_admin).
-- =============================================================================

begin;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'documentos-credito',
  'documentos-credito',
  false,
  10485760, -- 10 MB
  array['application/pdf', 'image/jpeg', 'image/png']
)
on conflict (id) do update
  set public = false,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Políticas antiguas / genéricas que pudieran existir
drop policy if exists "Public can view" on storage.objects;
drop policy if exists "Authenticated can upload" on storage.objects;
drop policy if exists "documentos_credito_select" on storage.objects;
drop policy if exists "documentos_credito_insert" on storage.objects;
drop policy if exists "documentos_credito_update" on storage.objects;
drop policy if exists "documentos_credito_delete" on storage.objects;

-- Lectura: dueño de la solicitud, quien subió el archivo, o staff.
create policy "documentos_credito_select"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'documentos-credito'
    and (
      owner = auth.uid()
      or exists (
        select 1 from public.solicitudes_credito s
         where s.id::text = (storage.foldername(name))[1]
           and s.cliente_id = auth.uid()
      )
      or public.is_staff()
    )
  );

-- Subida: solo a carpetas de solicitudes propias (o staff).
create policy "documentos_credito_insert"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'documentos-credito'
    and (
      exists (
        select 1 from public.solicitudes_credito s
         where s.id::text = (storage.foldername(name))[1]
           and s.cliente_id = auth.uid()
      )
      or public.is_staff()
    )
  );

-- Reemplazo: solo quien lo subió (o staff).
create policy "documentos_credito_update"
  on storage.objects for update to authenticated
  using (bucket_id = 'documentos-credito' and (owner = auth.uid() or public.is_staff()))
  with check (bucket_id = 'documentos-credito' and (owner = auth.uid() or public.is_staff()));

-- Borrado: solo admin.
create policy "documentos_credito_delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'documentos-credito' and public.is_admin());

-- documentos.url_archivo: de URL pública a ruta del objeto dentro del bucket.
do $$
begin
  if to_regclass('public.documentos') is not null then
    update public.documentos
       set url_archivo = regexp_replace(url_archivo, '^.*/storage/v1/object/public/documentos-credito/', '')
     where url_archivo like '%/storage/v1/object/public/documentos-credito/%';

    -- Analistas y admins necesitan ver las filas de documentos para revisar expedientes.
    execute 'drop policy if exists "Staff ve documentos (rol en profiles)" on public.documentos';
    execute $p$create policy "Staff ve documentos (rol en profiles)"
      on public.documentos for select to authenticated
      using (public.is_staff())$p$;
  end if;
end $$;

commit;
