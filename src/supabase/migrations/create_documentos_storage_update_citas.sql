-- ------------------------------------------------------------
-- 7. TABLA: documentos (Expediente digital)
-- ------------------------------------------------------------
create table if not exists public.documentos (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  solicitud_id uuid references public.solicitudes_credito(id) on delete cascade,
  tipo_documento text not null, -- ine, comprobante_domicilio, etc.
  nombre_archivo text not null,
  url_archivo text not null,
  subido_por uuid references auth.users(id),
  estado text default 'subido', -- subido, validado, rechazado
  comentarios text
);

-- RLS para documentos
alter table public.documentos enable row level security;

-- Usuarios ven sus propios documentos (vía solicitud -> cliente_id o subido_por)
-- Simplificación: si subido_por coincide
create policy "Usuarios ven sus propios documentos"
  on public.documentos for select
  using ( auth.uid() = subido_por );

-- Usuarios pueden subir documentos
create policy "Usuarios pueden subir documentos"
  on public.documentos for insert
  with check ( auth.uid() = subido_por );

-- Staff puede ver todos los documentos
create policy "Staff ve todos los documentos"
  on public.documentos for select
  using ( auth.role() = 'service_role' );


-- ------------------------------------------------------------
-- ACTUALIZACIÓN TABLA: citas
-- Agregar campos de relación
-- ------------------------------------------------------------
alter table public.citas 
add column if not exists cliente_id uuid references auth.users(id) on delete set null,
add column if not exists solicitud_id uuid references public.solicitudes_credito(id) on delete set null;

-- Actualizar políticas de citas para usar cliente_id además de email
drop policy if exists "Usuarios ven sus propias citas por email" on public.citas;
create policy "Usuarios ven sus propias citas"
  on public.citas for select
  using ( auth.uid() = cliente_id or (select auth.jwt() ->> 'email') = email );

-- ------------------------------------------------------------
-- STORAGE BUCKET
-- Nota: La creación de buckets suele requerir permisos de superadmin o hacerse vía API/Dashboard.
-- Intentamos insertar en storage.buckets si es posible (funciona en migraciones locales/directas si se tiene rol postgres).
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('documentos-credito', 'documentos-credito', true)
on conflict (id) do nothing;

-- Políticas de Storage (simplificadas para permitir subida a autenticados)
-- Nota: Esto requiere que se ejecute en el esquema 'storage' o via dashboard
-- create policy "Authenticated can upload" on storage.objects for insert to authenticated with check ( bucket_id = 'documentos-credito' );
-- create policy "Public can view" on storage.objects for select to public using ( bucket_id = 'documentos-credito' );
