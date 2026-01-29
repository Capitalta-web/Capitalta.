-- Habilitar la extensión UUID si no está habilitada
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------
-- 1. ENUMS (Tipos de datos personalizados)
-- ------------------------------------------------------------

-- Estado para los leads
create type public.lead_status as enum (
  'nuevo',
  'contactado',
  'en_proceso',
  'convertido',
  'perdido'
);

-- Categorías para el blog (ejemplo)
create type public.blog_category as enum (
  'noticias',
  'tutoriales',
  'finanzas',
  'tecnologia',
  'casos_exito'
);

-- ------------------------------------------------------------
-- 2. TABLA: users (Perfiles de usuario)
-- Nota: Esta tabla suele extender la tabla auth.users de Supabase
-- ------------------------------------------------------------
create table if not exists public.users (
  id uuid references auth.users(id) on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS para users
alter table public.users enable row level security;

-- Política: Los usuarios pueden ver su propio perfil
create policy "Usuarios pueden ver su propio perfil"
  on public.users for select
  using ( auth.uid() = id );

-- Política: Los usuarios pueden actualizar su propio perfil
create policy "Usuarios pueden actualizar su propio perfil"
  on public.users for update
  using ( auth.uid() = id );

-- ------------------------------------------------------------
-- 3. TABLA: leads
-- ------------------------------------------------------------
create table if not exists public.leads (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  nombre text not null,
  apellido text,
  email text not null,
  telefono text,
  estado public.lead_status default 'nuevo',
  origen text default 'web', -- De dónde vino el lead (calculadora, contacto, etc.)
  notas text
);

-- RLS para leads (Asumiendo que solo admins o servicio pueden ver/escribir)
alter table public.leads enable row level security;

-- Permitir inserción pública (anon key) para formularios de contacto/calculadora
create policy "Permitir inserción pública de leads"
  on public.leads for insert
  with check (true);

-- Permitir lectura solo a usuarios autenticados (o rol service_role)
create policy "Solo usuarios autenticados ven leads"
  on public.leads for select
  using ( auth.role() = 'authenticated' or auth.role() = 'service_role' );

-- ------------------------------------------------------------
-- 4. TABLA: cotizaciones
-- Relacionada con leads y almacena resultados de la calculadora
-- ------------------------------------------------------------
create table if not exists public.cotizaciones (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  lead_id uuid references public.leads(id) on delete set null,
  monto numeric not null,
  plazo integer not null, -- en meses o años según lógica
  tasa_anual numeric not null,
  pago_mensual numeric not null,
  interes_total numeric not null,
  total_a_pagar numeric not null,
  tabla_amortizacion jsonb, -- Almacena el array completo de la tabla
  comentarios text
);

-- RLS para cotizaciones
alter table public.cotizaciones enable row level security;

-- Permitir inserción pública (necesario si la calculadora lo hace desde el cliente o vía API pública)
create policy "Permitir inserción pública de cotizaciones"
  on public.cotizaciones for insert
  with check (true);

-- Permitir lectura solo autenticados
create policy "Solo usuarios autenticados ven cotizaciones"
  on public.cotizaciones for select
  using ( auth.role() = 'authenticated' or auth.role() = 'service_role' );

-- ------------------------------------------------------------
-- 5. TABLA: articulos_blog
-- Contenido del blog
-- ------------------------------------------------------------
create table if not exists public.articulos_blog (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  slug text unique not null,
  title text not null,
  excerpt text, -- Resumen corto para cards
  content text, -- HTML o Markdown
  image_url text, -- Imagen destacada
  author_id uuid references public.users(id) on delete set null,
  category public.blog_category default 'noticias',
  tags text[], -- Array de strings para etiquetas
  is_published boolean default false,
  published_at timestamptz
);

-- Índices para mejorar búsqueda
create index if not exists articulos_blog_slug_idx on public.articulos_blog (slug);
create index if not exists articulos_blog_category_idx on public.articulos_blog (category);

-- RLS para articulos_blog
alter table public.articulos_blog enable row level security;

-- Todo el mundo puede ver artículos publicados
create policy "Cualquiera puede ver artículos publicados"
  on public.articulos_blog for select
  using ( is_published = true );

-- Solo usuarios autenticados (admins/editores) pueden ver todo (incluido borradores) e insertar/editar
-- Ajustar lógica según roles reales. Aquí simplificado a 'authenticated'.
create policy "Usuarios autenticados gestionan articulos"
  on public.articulos_blog for all
  using ( auth.role() = 'authenticated' );

-- ------------------------------------------------------------
-- TRIGGER: Auto-update updated_at
-- ------------------------------------------------------------
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger para users
create trigger on_auth_user_updated
  before update on public.users
  for each row execute procedure public.handle_updated_at();

-- Función para manejar nuevo usuario (insertar en public.users)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger para creación de usuario
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Trigger para articulos_blog
create trigger on_articulos_blog_updated
  before update on public.articulos_blog
  for each row execute procedure public.handle_updated_at();

-- ------------------------------------------------------------
-- 6. TABLA: citas (Citas presenciales)
-- ------------------------------------------------------------
create table if not exists public.citas (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  fecha date not null,
  hora text not null,
  sucursal_id text not null,
  nombre_cliente text not null,
  email text,
  telefono text,
  codigo_cita text unique not null,
  status text default 'programada', -- programada, confirmada, cancelada, completada
  notas text
);

-- RLS para citas
alter table public.citas enable row level security;

-- Permitir inserción pública (para que el Chatbot y la Web puedan agendar sin login estricto)
create policy "Permitir inserción pública de citas"
  on public.citas for insert
  with check (true);

-- Permitir lectura solo a usuarios autenticados (staff)
create policy "Solo staff ve todas las citas"
  on public.citas for select
  using ( auth.role() = 'service_role' );

-- Permitir a usuarios ver sus propias citas basadas en el email
create policy "Usuarios ven sus propias citas por email"
  on public.citas for select
  using ( (select auth.jwt() ->> 'email') = email );
