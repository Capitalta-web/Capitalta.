# Guía Completa de Configuración - Proyecto Capitalta

## 📋 Resumen del Proyecto

**Nombre:** Capitalta  
**Project ID:** fhntmbfpuppmiashynlu  
**Región:** AWS us-west-2  
**Plan:** NANO (Gratuito)  
**Estado:** Activo, base de datos vacía

---

## 🔐 Credenciales del Proyecto

### URL del Proyecto
```
https://fhntmbfpuppmiashynlu.supabase.co
```

### Anon Key (Pública - para Frontend)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZobnRtYmZwdXBwbWlhc2h5bmx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NjExNjUsImV4cCI6M...
```

### Publishable Key (Nueva - Recomendada)
```
sb_publishable_pPCi0YY6Y2YN_3lI0o2jnQ_d4ySrN2Z
```

### Service Role Key (Secreta - Solo Backend)
```
(Disponible en: Settings → API → API Keys → Legacy anon, service_role API keys → Reveal)
```

---

## 📝 Paso 1: Ejecutar el Script SQL

### Opción A: Desde el Dashboard de Supabase (Recomendado)

1. Abre tu proyecto en https://supabase.com/dashboard/project/fhntmbfpuppmiashynlu

2. Ve a **SQL Editor** en el menú lateral izquierdo

3. Haz clic en **"New query"** o usa el editor existente

4. Copia y pega el siguiente script SQL completo:

```sql
-- Habilitar la extensión UUID si no está habilitada
create extension if not exists "uuid-ossp";

-- 1. ENUMS

create type public.lead_status as enum (
  'nuevo',
  'contactado',
  'en_proceso',
  'convertido',
  'perdido'
);

create type public.blog_category as enum (
  'noticias',
  'tutoriales',
  'finanzas',
  'tecnologia',
  'casos_exito'
);

-- 2. TABLA: users (perfiles extendiendo auth.users)

create table if not exists public.users (
  id uuid references auth.users(id) on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.users enable row level security;

create policy "Usuarios pueden ver su propio perfil"
  on public.users for select
  using ( auth.uid() = id );

create policy "Usuarios pueden actualizar su propio perfil"
  on public.users for update
  using ( auth.uid() = id );

-- 3. TABLA: leads

create table if not exists public.leads (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  nombre text not null,
  apellido text,
  email text not null,
  telefono text,
  estado public.lead_status default 'nuevo',
  origen text default 'web',
  notas text
);

alter table public.leads enable row level security;

create policy "Permitir inserción pública de leads"
  on public.leads for insert
  with check (true);

create policy "Solo usuarios autenticados ven leads"
  on public.leads for select
  using ( auth.role() = 'authenticated' or auth.role() = 'service_role' );

-- 4. TABLA: cotizaciones

create table if not exists public.cotizaciones (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  lead_id uuid references public.leads(id) on delete set null,
  monto numeric not null,
  plazo integer not null,
  tasa_anual numeric not null,
  pago_mensual numeric not null,
  interes_total numeric not null,
  total_a_pagar numeric not null,
  tabla_amortizacion jsonb,
  comentarios text
);

alter table public.cotizaciones enable row level security;

create policy "Permitir inserción pública de cotizaciones"
  on public.cotizaciones for insert
  with check (true);

create policy "Solo usuarios autenticados ven cotizaciones"
  on public.cotizaciones for select
  using ( auth.role() = 'authenticated' or auth.role() = 'service_role' );

-- 5. TABLA: articulos_blog

create table if not exists public.articulos_blog (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  image_url text,
  author_id uuid references public.users(id) on delete set null,
  category public.blog_category default 'noticias',
  tags text[],
  is_published boolean default false,
  published_at timestamptz
);

create index if not exists articulos_blog_slug_idx on public.articulos_blog (slug);
create index if not exists articulos_blog_category_idx on public.articulos_blog (category);

alter table public.articulos_blog enable row level security;

create policy "Cualquiera puede ver artículos publicados"
  on public.articulos_blog for select
  using ( is_published = true );

create policy "Usuarios autenticados gestionan articulos"
  on public.articulos_blog for all
  using ( auth.role() = 'authenticated' );

-- TRIGGER: actualizar updated_at

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_auth_user_updated
  before update on public.users
  for each row execute procedure public.handle_updated_at();

create trigger on_articulos_blog_updated
  before update on public.articulos_blog
  for each row execute procedure public.handle_updated_at();
```

5. Haz clic en el botón **"Run"** (o presiona Ctrl+Enter)

6. Verifica que se ejecutó correctamente (deberías ver "Success" sin errores)

---

## ✅ Paso 2: Verificar la Creación

1. Ve a **Database** → **Tables** en el menú lateral

2. Deberías ver las siguientes tablas creadas:
   - `users`
   - `leads`
   - `cotizaciones`
   - `articulos_blog`

3. Ve a **Database** → **Enumerated Types** y verifica:
   - `lead_status`
   - `blog_category`

4. Ve a **Database** → **Policies** y verifica que existen políticas RLS para cada tabla

---

## 🔌 Paso 3: Configurar tu Frontend (Next.js)

### Instalar el Cliente de Supabase

```bash
npm install @supabase/supabase-js
# o
yarn add @supabase/supabase-js
# o
pnpm add @supabase/supabase-js
```

### Crear archivo `.env.local` en la raíz de tu proyecto Next.js

```env
NEXT_PUBLIC_SUPABASE_URL=https://fhntmbfpuppmiashynlu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_pPCi0YY6Y2YN_3lI0o2jnQ_d4ySrN2Z
```

### Crear el cliente de Supabase

Crea un archivo `lib/supabase.ts` (o `.js`):

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

---

## 📊 Estructura de la Base de Datos Creada

### Tabla: `users`
Perfiles de usuario extendidos desde `auth.users`
- `id` (UUID, PK, FK a auth.users)
- `email` (text, unique)
- `full_name` (text)
- `avatar_url` (text)
- `created_at`, `updated_at` (timestamptz)

**RLS:** Los usuarios solo pueden ver y actualizar su propio perfil

### Tabla: `leads`
Gestión de leads/prospectos
- `id` (UUID, PK)
- `nombre`, `apellido`, `email`, `telefono` (text)
- `estado` (enum: lead_status)
- `origen` (text, default 'web')
- `notas` (text)
- `created_at` (timestamptz)

**RLS:** Inserción pública permitida, solo usuarios autenticados pueden leer

### Tabla: `cotizaciones`
Cotizaciones de préstamos
- `id` (UUID, PK)
- `lead_id` (UUID, FK a leads)
- `monto`, `plazo`, `tasa_anual` (numeric/integer)
- `pago_mensual`, `interes_total`, `total_a_pagar` (numeric)
- `tabla_amortizacion` (jsonb)
- `comentarios` (text)
- `created_at` (timestamptz)

**RLS:** Inserción pública permitida, solo usuarios autenticados pueden leer

### Tabla: `articulos_blog`
Sistema de blog/contenido
- `id` (UUID, PK)
- `slug` (text, unique, indexed)
- `title`, `excerpt`, `content` (text)
- `image_url` (text)
- `author_id` (UUID, FK a users)
- `category` (enum: blog_category, indexed)
- `tags` (text[])
- `is_published` (boolean)
- `published_at`, `created_at`, `updated_at` (timestamptz)

**RLS:** Público puede ver artículos publicados, usuarios autenticados gestionan todos

---

## 🚀 Próximos Pasos

1. **Configurar Autenticación:**
   - Ve a Authentication → Providers
   - Habilita los proveedores que necesites (Email, Google, etc.)

2. **Configurar Storage (si es necesario):**
   - Ve a Storage
   - Crea buckets para imágenes de blog, avatares, etc.

3. **Configurar Edge Functions (opcional):**
   - Para lógica de negocio compleja del lado del servidor

4. **Revisar el proyecto duplicado:**
   - Existe otro proyecto llamado "Capiatalta" en us-east-1
   - Considera eliminarlo si no es necesario

---

## 📚 Recursos Adicionales

- **Documentación de Supabase:** https://supabase.com/docs
- **Guía de Next.js + Supabase:** https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- **Row Level Security:** https://supabase.com/docs/guides/auth/row-level-security

---

## ⚠️ Notas de Seguridad

1. **NUNCA** compartas tu Service Role Key públicamente
2. La Anon Key es segura para usar en el frontend gracias a RLS
3. Asegúrate de que todas las tablas sensibles tengan RLS habilitado
4. Revisa y prueba tus políticas RLS antes de ir a producción

---

**Fecha de creación:** 18 de enero de 2026  
**Estado:** Listo para desarrollo

