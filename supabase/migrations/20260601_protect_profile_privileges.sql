-- ============================================================
-- CAPITALTA - Protección contra escalada de privilegios
-- Impide que un usuario normal cambie su propio 'role' o 'status'.
-- Los admins (por su perfil) y el service_role SÍ pueden hacerlo.
-- ============================================================

create or replace function public.prevent_role_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_role text;
begin
  -- El backend (service_role) puede cambiar todo
  if (auth.role() = 'service_role') then
    return new;
  end if;

  -- Un admin (según su perfil) puede cambiar roles desde el panel
  select role into caller_role from public.profiles where id = auth.uid();
  if (caller_role = 'admin') then
    return new;
  end if;

  -- Usuarios normales: se preservan role y status (no pueden auto-modificarlos)
  new.role := old.role;
  new.status := old.status;
  return new;
end;
$$;

drop trigger if exists protect_profile_privileges on public.profiles;
create trigger protect_profile_privileges
  before update on public.profiles
  for each row execute function public.prevent_role_change();
