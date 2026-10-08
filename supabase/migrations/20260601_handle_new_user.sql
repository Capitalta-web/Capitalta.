-- ============================================================
-- CAPITALTA - Auto-creación de perfil al registrarse
-- Crea un perfil en public.profiles cuando se crea un usuario
-- en auth.users, y rellena los perfiles faltantes existentes.
-- Operación ADITIVA: no borra ni modifica datos existentes.
-- ============================================================

-- 1. Función que crea el perfil (security definer para poder insertar)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role, status)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    'cliente',
    'activo'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- 2. Trigger en auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3. Backfill: crear perfiles para usuarios auth que no lo tengan
insert into public.profiles (id, email, full_name, role, status)
select
  au.id,
  au.email,
  coalesce(au.raw_user_meta_data->>'full_name', au.raw_user_meta_data->>'name', ''),
  'cliente',
  'activo'
from auth.users au
left join public.profiles p on p.id = au.id
where p.id is null
on conflict (id) do nothing;
