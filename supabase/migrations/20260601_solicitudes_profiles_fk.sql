-- ============================================================
-- CAPITALTA - Relación solicitudes -> profiles para PostgREST
-- El panel admin embebe los datos del cliente con
-- select('*, profiles:cliente_id(...)'). Eso requiere una FK
-- de solicitudes.cliente_id hacia profiles.id.
-- ============================================================

alter table public.solicitudes
  drop constraint if exists solicitudes_cliente_id_profiles_fkey;

alter table public.solicitudes
  add constraint solicitudes_cliente_id_profiles_fkey
  foreign key (cliente_id) references public.profiles(id) on delete cascade;
