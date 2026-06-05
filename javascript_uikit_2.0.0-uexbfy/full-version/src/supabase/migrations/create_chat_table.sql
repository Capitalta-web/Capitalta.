
-- ------------------------------------------------------------
-- 7. TABLA: chat_conversaciones (Historial de Chat)
-- ------------------------------------------------------------
create table if not exists public.chat_conversaciones (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  usuario_id uuid references public.users(id) on delete set null,
  session_id text, -- Para identificar usuarios anónimos
  mensajes jsonb, -- Array de mensajes
  estado text default 'activa', -- activa, cerrada, transferida
  resumen text
);

-- RLS para chat_conversaciones
alter table public.chat_conversaciones enable row level security;

-- Permitir inserción pública (el chat inicia sin login a veces)
create policy "Permitir inserción pública de chats"
  on public.chat_conversaciones for insert
  with check (true);

-- Usuarios ven sus propios chats
create policy "Usuarios ven sus propios chats"
  on public.chat_conversaciones for select
  using ( auth.uid() = usuario_id );

-- Trigger para updated_at en chat
create trigger on_chat_updated
  before update on public.chat_conversaciones
  for each row execute procedure public.handle_updated_at();
