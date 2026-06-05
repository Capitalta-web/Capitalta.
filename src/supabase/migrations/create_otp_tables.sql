create table if not exists public.otp_codes (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  email text not null,
  user_id uuid references auth.users(id) on delete cascade,
  code text not null,
  expires_at timestamptz not null default (now() + interval '15 minutes'),
  used boolean default false,
  used_at timestamptz
);

create index if not exists idx_otp_codes_email_code on public.otp_codes (email, code);
create index if not exists idx_otp_codes_expires_at on public.otp_codes (expires_at);

alter table public.otp_codes enable row level security;

drop policy if exists "Service role manages otp_codes" on public.otp_codes;
create policy "Service role manages otp_codes"
  on public.otp_codes for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create table if not exists public.temp_verification_codes (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  email text not null,
  code text not null,
  expires_at timestamptz not null default (now() + interval '15 minutes')
);

create index if not exists idx_temp_verification_codes_email_code on public.temp_verification_codes (email, code);
create index if not exists idx_temp_verification_codes_expires_at on public.temp_verification_codes (expires_at);

alter table public.temp_verification_codes enable row level security;

drop policy if exists "Service role manages temp_verification_codes" on public.temp_verification_codes;
create policy "Service role manages temp_verification_codes"
  on public.temp_verification_codes for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
