/**
 * Verifica supabase/migrations/20261010000100_seguridad_produccion.sql contra una
 * réplica en memoria (PGlite) del esquema REAL de producción (inspeccionado el
 * 10-oct-2026: tablas, políticas, triggers, funciones y grants), sin datos reales.
 *
 * Uso: yarn test:db   (no se conecta a ninguna base real)
 */
import { PGlite } from '@electric-sql/pglite';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const MIGRATION = path.resolve('supabase/migrations/20261010000100_seguridad_produccion.sql');
const ROLLBACK = path.resolve('supabase/rollback/20261010000100_seguridad_produccion_rollback.sql');
const strip = (sql) => sql.replace(/notify pgrst[^;]*;/g, '');

const CLI = '00000000-0000-0000-0000-00000000000a';
const OTRO = '00000000-0000-0000-0000-00000000000b';
const ADM = '00000000-0000-0000-0000-00000000000c';

const db = new PGlite();
let passed = 0;
async function check(name, fn) {
  await fn();
  passed += 1;
  console.log(`  ✓ ${name}`);
}
async function rows(sql) {
  return (await db.query(sql)).rows;
}
async function as(uid, sql) {
  const role = uid ? 'authenticated' : 'anon';
  const claims = JSON.stringify(uid ? { sub: uid, role } : { role });
  await db.exec(`set role ${role}; select set_config('request.jwt.claims', '${claims}', false);`);
  try {
    const r = await db.query(sql);
    return { ok: true, rows: r.rows, affected: r.affectedRows };
  } catch (e) {
    return { ok: false, err: e.message };
  } finally {
    await db.exec(`reset role; select set_config('request.jwt.claims', '', false);`);
  }
}

// --- Réplica del esquema de producción (estado "antes") ----------------------------
await db.exec(`
create role anon nologin; create role authenticated nologin; create role service_role nologin bypassrls;
create schema auth; create schema storage;
create table auth.users (id uuid primary key, email text, raw_user_meta_data jsonb default '{}');
create function auth.jwt() returns jsonb language sql stable as $$ select coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb $$;
create function auth.uid() returns uuid language sql stable as $$ select nullif(auth.jwt()->>'sub', '')::uuid $$;
create function auth.role() returns text language sql stable as $$ select nullif(auth.jwt()->>'role', '') $$;
create table storage.buckets (id text primary key, name text, public boolean default false, file_size_limit bigint, allowed_mime_types text[]);
create table storage.objects (id uuid primary key default gen_random_uuid(), bucket_id text, name text, owner uuid);
create function storage.foldername(name text) returns text[] language sql immutable as
  $$ select (string_to_array(name, '/'))[1:array_length(string_to_array(name, '/'), 1) - 1] $$;
alter table storage.objects enable row level security;
insert into storage.buckets (id, name, public) values ('documentos', 'documentos', false);
create policy "Usuarios leen sus documentos" on storage.objects for select to authenticated
  using (bucket_id = 'documentos' and (storage.foldername(name))[1] = auth.uid()::text);

create table public.profiles (id uuid primary key references auth.users(id), email text unique, full_name text, phone text,
  role text not null default 'cliente' check (role in ('cliente', 'admin')), status text default 'activo' check (status in ('activo', 'inactivo')),
  rfc text, curp text, domicilio_calle text, updated_at timestamp default now());
create table public.solicitudes (id uuid primary key default gen_random_uuid(), cliente_id uuid not null references public.profiles(id),
  status text default 'pendiente' check (status in ('pendiente','en-revision','aprobada','rechazada','activo','cerrado')),
  monto_solicitado numeric, plazo_meses int, tipo text, admin_notes text, autoriza_buro boolean not null default false);
create table public.documentos (id uuid primary key default gen_random_uuid(), cliente_id uuid not null, tipo text not null, url text not null,
  status text not null default 'pendiente', uploaded_at timestamptz default now(), unique (cliente_id, tipo));
create table public.citas (id uuid primary key default gen_random_uuid(), solicitud_id uuid not null, analista_id uuid, fecha_hora timestamp not null);
create table public.leads (id uuid primary key default gen_random_uuid(), email text unique, nombre text);
create table public.config_credito (id text primary key default 'default', tasa_excelente numeric default 0.24);
create table public.buro_consultas (id uuid primary key default gen_random_uuid(), cliente_id uuid, score int);

create function public.user_role() returns text language sql stable as
  $$ SELECT COALESCE(auth.jwt() ->> 'user_role', (SELECT role FROM profiles WHERE id = auth.uid() LIMIT 1), 'cliente') $$;
create function public.is_admin() returns boolean language sql stable security definer set search_path = public as
  $$ select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') $$;
create function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, role, status)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''), 'cliente', 'activo')
  on conflict (id) do nothing;
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
create function public.prevent_role_change() returns trigger language plpgsql security definer set search_path = public as $$
declare caller_role text;
begin
  if (auth.role() = 'service_role') then return new; end if;
  select role into caller_role from public.profiles where id = auth.uid();
  if (caller_role = 'admin') then return new; end if;
  new.role := old.role; new.status := old.status; return new;
end $$;
create trigger protect_profile_privileges before update on public.profiles for each row execute function public.prevent_role_change();

alter table public.profiles enable row level security;
alter table public.solicitudes enable row level security;
alter table public.documentos enable row level security;
alter table public.citas enable row level security;
alter table public.leads enable row level security;
alter table public.config_credito enable row level security;
alter table public.buro_consultas enable row level security;
create policy "profiles_select_all" on public.profiles for select using (true);
create policy "profiles_update_admin" on public.profiles for update using (is_admin()) with check (is_admin());
create policy "profiles_update_self" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "solicitudes_insert_self" on public.solicitudes for insert with check (auth.uid() = cliente_id);
create policy "solicitudes_select_admin" on public.solicitudes for select using (is_admin());
create policy "solicitudes_select_self" on public.solicitudes for select using (auth.uid() = cliente_id);
create policy "solicitudes_update_admin" on public.solicitudes for update using (is_admin()) with check (is_admin());
create policy "solicitudes_update_self" on public.solicitudes for update using (auth.uid() = cliente_id) with check (auth.uid() = cliente_id);
create policy "Cliente gestiona sus documentos" on public.documentos for all using (auth.uid() = cliente_id) with check (auth.uid() = cliente_id);
create policy "Staff ve todos los documentos" on public.documentos for select using (is_admin() or auth.role() = 'service_role');
create policy "Users see own citas" on public.citas for select using (
  solicitud_id in (select solicitudes.id from solicitudes where solicitudes.cliente_id = auth.uid())
  or analista_id = auth.uid() or (auth.jwt() ->> 'role') = 'admin');
create policy "Admins see leads" on public.leads for select using ((auth.jwt() ->> 'role') = any (array['admin', 'analista']));
create policy "Anyone creates lead" on public.leads for insert with check (true);
create policy "admin gestiona config credito" on public.config_credito for all using (is_admin()) with check (is_admin());
create policy "lectura config credito autenticados" on public.config_credito for select using (auth.role() = 'authenticated');
create policy "admin lee consultas buro" on public.buro_consultas for select using (is_admin());

grant usage on schema public, auth, storage to anon, authenticated, service_role;
grant all on all tables in schema public to anon, authenticated, service_role;
grant all on all tables in schema storage to anon, authenticated, service_role;
grant execute on all functions in schema auth to anon, authenticated, service_role;
grant execute on all functions in schema public to public, anon, authenticated, service_role;

insert into auth.users (id, email) values ('${CLI}', 'cli@example.com'), ('${OTRO}', 'otro@example.com'), ('${ADM}', 'adm@example.com');
update public.profiles set rfc = 'XAXX010101000' where id = '${OTRO}';
`);
// En producción los admins se crearon por service_role.
await db.exec(`select set_config('request.jwt.claims', '{"role":"service_role"}', false);
  update public.profiles set role = 'admin' where id = '${ADM}';
  select set_config('request.jwt.claims', '', false);`);
await db.exec(`insert into public.config_credito (id) values ('default');
  insert into public.leads (email) values ('lead@example.com');
  insert into public.solicitudes (id, cliente_id, status, monto_solicitado) values ('11111111-1111-1111-1111-111111111111', '${OTRO}', 'pendiente', 100000);`);

console.log('Estado "antes" (vulnerabilidades confirmadas en producción)');
await check('anon lee todos los perfiles (con RFC)', async () => {
  assert.equal((await as(null, 'select rfc from profiles')).rows.length, 3);
});
await check('el cliente se puede aprobar su solicitud', async () => {
  const r = await as(OTRO, `update solicitudes set status = 'aprobada' where cliente_id = '${OTRO}'`);
  assert.equal(r.affected, 1);
  await db.exec(`update solicitudes set status = 'pendiente'`);
});

console.log('Aplicando la migración (2 veces para comprobar idempotencia)');
const sql = strip(fs.readFileSync(MIGRATION, 'utf8'));
await db.exec(sql);
await db.exec(sql);

console.log('Perfiles');
await check('anon ya no lee perfiles', async () => {
  assert.equal((await as(null, 'select * from profiles')).rows.length, 0);
});
await check('el cliente solo ve su perfil; el admin ve todos', async () => {
  assert.equal((await as(CLI, 'select id from profiles')).rows.length, 1);
  assert.equal((await as(ADM, 'select id from profiles')).rows.length, 3);
});
await check('el cliente edita sus datos pero no su rol ni status', async () => {
  const r = await as(CLI, `update profiles set full_name = 'Ana', role = 'admin', status = 'inactivo' where id = '${CLI}'`);
  assert.equal(r.affected, 1);
  const p = (await rows(`select full_name, role, status from profiles where id = '${CLI}'`))[0];
  assert.deepEqual([p.full_name, p.role, p.status], ['Ana', 'cliente', 'activo']);
});
await check('el cliente no edita perfiles ajenos', async () => {
  assert.equal((await as(CLI, `update profiles set full_name = 'x' where id = '${OTRO}'`)).affected, 0);
});
await check('el admin cambia roles desde el panel', async () => {
  assert.equal((await as(ADM, `update profiles set role = 'admin' where id = '${CLI}'`)).affected, 1);
  assert.equal((await rows(`select role from profiles where id = '${CLI}'`))[0].role, 'admin');
});
await check('el SQL Editor (sin JWT) también puede bajar un rol', async () => {
  await db.exec(`update profiles set role = 'cliente' where id = '${CLI}'`);
  assert.equal((await rows(`select role from profiles where id = '${CLI}'`))[0].role, 'cliente');
});
await check('el alta de usuario sigue creando el perfil como cliente', async () => {
  await db.exec(`insert into auth.users (id, email, raw_user_meta_data) values ('00000000-0000-0000-0000-00000000000d', 'd@example.com', '{"role":"admin","full_name":"D"}')`);
  assert.equal((await rows(`select role from profiles where email = 'd@example.com'`))[0].role, 'cliente');
});

console.log('Solicitudes');
let sol;
await check('el cliente crea su solicitud en pendiente (como FormSolicitudWizard)', async () => {
  const r = await as(CLI, `insert into solicitudes (cliente_id, monto_solicitado, plazo_meses, tipo, status) values ('${CLI}', 50000, 12, 'simple', 'pendiente') returning id`);
  assert.equal(r.ok, true, r.err);
  sol = r.rows[0].id;
});
await check('no puede crearla aprobada, con notas de admin o a nombre de otro', async () => {
  assert.equal((await as(CLI, `insert into solicitudes (cliente_id, status) values ('${CLI}', 'aprobada')`)).ok, false);
  assert.equal((await as(CLI, `insert into solicitudes (cliente_id, admin_notes) values ('${CLI}', 'ok')`)).ok, false);
  assert.equal((await as(CLI, `insert into solicitudes (cliente_id) values ('${OTRO}')`)).ok, false);
});
await check('el cliente ya no modifica status ni monto de su solicitud', async () => {
  assert.equal((await as(CLI, `update solicitudes set status = 'aprobada', monto_solicitado = 1e9 where id = '${sol}'`)).affected, 0);
  assert.equal((await rows(`select status from solicitudes where id = '${sol}'`))[0].status, 'pendiente');
});
await check('el cliente solo ve sus solicitudes; el admin ve y actualiza todas', async () => {
  assert.equal((await as(CLI, 'select id from solicitudes')).rows.length, 1);
  assert.equal((await as(ADM, 'select id from solicitudes')).rows.length, 2);
  assert.equal((await as(ADM, `update solicitudes set status = 'en-revision' where id = '${sol}'`)).affected, 1);
});

console.log('Documentos');
const upsert = (status) => `insert into documentos (cliente_id, tipo, url, status) values ('${CLI}', 'ine', '${CLI}/ine/1.pdf', '${status}')
  on conflict (cliente_id, tipo) do update set url = excluded.url, status = excluded.status returning id`;
await check('el cliente sube y vuelve a subir su documento (upsert en pendiente)', async () => {
  assert.equal((await as(CLI, upsert('pendiente'))).ok, true);
  assert.equal((await as(CLI, upsert('pendiente'))).ok, true);
});
await check('el cliente no se aprueba documentos ni los borra', async () => {
  assert.equal((await as(CLI, upsert('aprobado'))).ok, false);
  assert.equal((await as(CLI, `update documentos set status = 'aprobado' where cliente_id = '${CLI}'`)).ok, false);
  assert.equal((await as(CLI, `delete from documentos where cliente_id = '${CLI}'`)).affected, 0);
});
await check('otro cliente no ve documentos ajenos; el admin sí y los gestiona', async () => {
  assert.equal((await as(OTRO, 'select id from documentos')).rows.length, 0);
  assert.equal((await as(ADM, `update documentos set status = 'aprobado' where cliente_id = '${CLI}'`)).affected, 1);
});

console.log('Otras tablas y funciones');
await check('el admin ve leads y citas; el cliente no ve leads', async () => {
  assert.equal((await as(ADM, 'select id from leads')).rows.length, 1);
  assert.equal((await as(CLI, 'select id from leads')).rows.length, 0);
  assert.equal((await as(null, `insert into leads (email) values ('nuevo@example.com')`)).ok, true);
});
await check('config_credito: autenticado lee, anon no ve nada (sin error), solo admin escribe', async () => {
  assert.equal((await as(CLI, 'select id from config_credito')).rows.length, 1);
  const a = await as(null, 'select id from config_credito');
  assert.equal(a.ok, true, a.err);
  assert.equal(a.rows.length, 0);
  assert.equal((await as(CLI, `update config_credito set tasa_excelente = 0.01`)).affected, 0);
  assert.equal((await as(ADM, `update config_credito set tasa_excelente = 0.24`)).affected, 1);
});
await check('anon no puede ejecutar las funciones SECURITY DEFINER', async () => {
  for (const f of ['is_admin()', 'user_role()']) {
    assert.equal((await as(null, `select public.${f}`)).ok, false);
  }
});
await check('bucket documentos privado con límites y documentos-credito reservado privado', async () => {
  const b = await rows(`select id, public, file_size_limit from storage.buckets order by id`);
  assert.deepEqual(b.map((x) => [x.id, x.public, Number(x.file_size_limit)]), [
    ['documentos', false, 10485760],
    ['documentos-credito', false, 10485760]
  ]);
});

console.log('Reversión');
await check('el rollback se aplica limpio y la migración se puede volver a aplicar', async () => {
  await db.exec(strip(fs.readFileSync(ROLLBACK, 'utf8')));
  assert.equal((await as(null, 'select id from profiles')).rows.length, 4);
  await db.exec(sql);
  assert.equal((await as(null, 'select id from profiles')).rows.length, 0);
});

console.log(`\n${passed} verificaciones OK`);
