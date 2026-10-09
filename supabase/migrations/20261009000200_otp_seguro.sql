-- =============================================================================
-- 20261009000200_otp_seguro.sql
-- Códigos de verificación (OTP) con expiración, límite de intentos y propósito.
--
-- El código de la app (src/utils/security/otpStore.js) ahora:
--   * guarda el código HASHEADO (sha256), nunca en claro,
--   * expira a los 10 minutos,
--   * invalida el código tras 5 intentos fallidos (columna attempts),
--   * limita a 5 envíos por email/propósito por hora,
--   * usa la misma tabla para el registro ('signup') y el chat ('chat').
-- =============================================================================

begin;

create table if not exists public.otp_codes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  user_id uuid references auth.users(id) on delete cascade,
  code text not null,
  expires_at timestamptz not null default (now() + interval '10 minutes'),
  used boolean not null default false,
  used_at timestamptz
);

alter table public.otp_codes add column if not exists attempts integer not null default 0;
alter table public.otp_codes add column if not exists purpose text not null default 'signup';
alter table public.otp_codes alter column expires_at set default (now() + interval '10 minutes');

create index if not exists idx_otp_codes_email_purpose_created
  on public.otp_codes (email, purpose, created_at desc);

-- Los códigos existentes estaban en claro y sin límite de intentos: se invalidan.
update public.otp_codes set used = true, used_at = now() where used is not true;

-- Solo el backend (service_role) accede. Sin políticas para anon/authenticated.
alter table public.otp_codes enable row level security;
drop policy if exists "Service role manages otp_codes" on public.otp_codes;
create policy "Service role manages otp_codes"
  on public.otp_codes for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- La tabla temp_verification_codes ya no se usa (el chat usa otp_codes con purpose='chat').
-- Se invalidan sus filas si existe; se puede borrar más adelante.
do $$
begin
  if to_regclass('public.temp_verification_codes') is not null then
    execute 'delete from public.temp_verification_codes';
  end if;
end $$;

commit;

notify pgrst, 'reload schema';
