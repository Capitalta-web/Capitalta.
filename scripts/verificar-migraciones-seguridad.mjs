/**
 * Verifica las migraciones de seguridad (supabase/migrations/20261009*) contra un
 * Postgres real en memoria (PGlite), con un esquema mínimo que imita Supabase
 * (roles anon/authenticated/service_role, auth.uid(), auth.role(), storage.objects).
 *
 * Parte de un estado "vulnerable" como el del repo (trigger que lee el rol de
 * metadata, políticas con user_metadata, bucket público), aplica las migraciones
 * dos veces (idempotencia) y comprueba los controles.
 *
 * Uso: yarn test:db   (no se conecta a ninguna base real)
 */
import { PGlite } from '@electric-sql/pglite';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const MIGRATIONS_DIR = path.resolve('supabase/migrations');
const files = fs
  .readdirSync(MIGRATIONS_DIR)
  .filter((f) => f.startsWith('20261009') && f.endsWith('.sql'))
  .sort();

const A = '00000000-0000-0000-0000-00000000000a';
const B = '00000000-0000-0000-0000-00000000000b';
const C = '00000000-0000-0000-0000-00000000000c';
const SOL_B = '11111111-1111-1111-1111-111111111111';

const db = new PGlite();
let passed = 0;

function check(name, fn) {
  return Promise.resolve()
    .then(fn)
    .then(() => {
      passed += 1;
      console.log(`  ✓ ${name}`);
    });
}

async function rows(sql) {
  return (await db.query(sql)).rows;
}

/** Ejecuta SQL como un usuario autenticado (JWT con user_metadata.role = 'admin' para probar que se ignora). */
async function as(uid, sql) {
  const claims = JSON.stringify({ sub: uid, role: 'authenticated', user_metadata: { role: 'admin' } });
  await db.exec(`set role authenticated; select set_config('request.jwt.claims', '${claims}', false);`);
  try {
    const r = await db.query(sql);
    return { ok: true, rows: r.rows, affected: r.affectedRows };
  } catch (e) {
    return { ok: false, err: e.message };
  } finally {
    await db.exec(`reset role; select set_config('request.jwt.claims', '', false);`);
  }
}

async function applyMigrations() {
  for (const f of files) {
    const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, f), 'utf8').replace(/notify pgrst[^;]*;/g, '');
    await db.exec(sql);
  }
}

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
insert into storage.buckets (id, name, public) values ('documentos-credito', 'documentos-credito', true);

create table public.profiles (id uuid primary key references auth.users(id), role text not null default 'cliente', nombre_completo text, tipo_persona text);
create table public.solicitudes_credito (id uuid primary key default gen_random_uuid(), cliente_id uuid, analista_id uuid, estado text, monto numeric);
create table public.documentos (id uuid primary key default gen_random_uuid(), solicitud_id uuid, url_archivo text not null, subido_por uuid,
  estado text default 'subido', comentarios text);
create table public.leads (id serial primary key, email text);
create table public.articulos (id serial primary key, titulo text);
create table public.avaluos (id serial primary key, solicitud_id uuid);
create table public.otp_codes (id uuid primary key default gen_random_uuid(), created_at timestamptz default now(), email text not null,
  user_id uuid, code text not null, expires_at timestamptz not null default now() + interval '15 minutes', used boolean default false, used_at timestamptz);

-- Estado vulnerable de partida (como el SQL histórico del repo)
create function public.handle_new_user() returns trigger language plpgsql security definer as
  $$ begin insert into public.profiles (id, role) values (new.id, coalesce(new.raw_user_meta_data->>'role', 'cliente')); return new; end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
alter table public.profiles enable row level security;
create policy "Usuarios actualizan su propio perfil" on public.profiles for update using (auth.uid() = id);
create policy "Staff ve todos los perfiles" on public.profiles for select
  using (exists (select 1 from profiles where id = auth.uid() and role in ('analista', 'admin')));
alter table public.solicitudes_credito enable row level security;
create policy "Users can view their own applications" on public.solicitudes_credito for select using (auth.uid() = cliente_id);
create policy "Users can insert their own applications" on public.solicitudes_credito for insert with check (auth.uid() = cliente_id);
create policy "Users can update their own applications" on public.solicitudes_credito for update using (auth.uid() = cliente_id);
create policy "Analistas y Admins ven todas las solicitudes" on public.solicitudes_credito for select
  using ((auth.jwt() -> 'user_metadata' ->> 'role') in ('analista', 'admin'));
alter table public.leads enable row level security;
create policy "Solo usuarios autenticados ven leads" on public.leads for select using (auth.role() = 'authenticated');
alter table public.documentos enable row level security;
create policy "Usuarios ven sus propios documentos" on public.documentos for select using (auth.uid() = subido_por);
create policy "Usuarios pueden subir documentos" on public.documentos for insert with check (auth.uid() = subido_por);
create policy "Usuarios editan documentos (legado inseguro)" on public.documentos for update using (auth.uid() = subido_por);
alter table public.articulos enable row level security;
create policy "Usuarios autenticados gestionan articulos" on public.articulos for all using (auth.role() = 'authenticated');
alter table public.avaluos enable row level security;

grant usage on schema public, auth, storage to anon, authenticated, service_role;
grant all on all tables in schema public to anon, authenticated, service_role;
grant all on all tables in schema storage to anon, authenticated, service_role;
grant all on all sequences in schema public to anon, authenticated, service_role;
grant execute on all functions in schema auth to anon, authenticated, service_role;

insert into public.otp_codes (email, code) values ('x@y.z', '123456');
insert into public.leads (email) values ('lead@example.com');
`);

console.log('Aplicando migraciones (2 veces para comprobar idempotencia):', files.join(', '));
await applyMigrations();
await applyMigrations();

await db.exec(`insert into auth.users (id, email, raw_user_meta_data) values
  ('${A}', 'a@example.com', '{"role":"admin"}'), ('${B}', 'b@example.com', '{}'), ('${C}', 'c@example.com', '{}');`);
// Cambios de rol por canal administrativo (SQL editor, sin JWT)
await db.exec(`update public.profiles set role = 'admin' where id = '${B}'; update public.profiles set role = 'analista' where id = '${C}';`);

console.log('Roles');
await check('el alta ignora raw_user_meta_data.role y asigna cliente', async () => {
  assert.equal((await rows(`select role from profiles where id = '${A}'`))[0].role, 'cliente');
});
await check('un usuario no puede subirse el rol', async () => {
  const r = await as(A, `update profiles set role = 'admin' where id = '${A}'`);
  assert.equal(r.ok, false);
  assert.match(r.err, /Solo un administrador/);
});
await check('un usuario sí puede editar sus otros datos', async () => {
  assert.equal((await as(A, `update profiles set nombre_completo = 'Ana' where id = '${A}'`)).affected, 1);
});
await check('un usuario no puede editar perfiles ajenos', async () => {
  assert.equal((await as(A, `update profiles set nombre_completo = 'x' where id = '${B}'`)).affected, 0);
});
await check('un usuario que inserta su perfil queda como cliente', async () => {
  await db.exec(`delete from profiles where id = '${A}'`);
  const r = await as(A, `insert into profiles (id, role) values ('${A}', 'admin') returning role`);
  assert.equal(r.rows[0].role, 'cliente');
});
await check('un cliente solo ve su perfil; staff ve todos sin recursión', async () => {
  assert.equal((await as(A, `select id from profiles`)).rows.length, 1);
  assert.equal((await as(C, `select id from profiles`)).rows.length, 3);
});
await check('solo admin cambia roles', async () => {
  assert.equal((await as(C, `update profiles set role = 'admin' where id = '${C}'`)).ok, false);
  assert.equal((await as(B, `update profiles set role = 'analista' where id = '${A}'`)).affected, 1);
  await db.exec(`update profiles set role = 'cliente' where id = '${A}'`);
});
await check('anon no puede ejecutar las funciones de rol', async () => {
  await db.exec('set role anon');
  try {
    await assert.rejects(db.query('select public.is_admin()'));
  } finally {
    await db.exec('reset role');
  }
});

console.log('RLS de datos');
await check('user_metadata.role en el JWT ya no da acceso a leads ni solicitudes ajenas', async () => {
  await db.exec(`insert into solicitudes_credito (id, cliente_id, estado) values ('${SOL_B}', '${B}', 'solicitud_iniciada')`);
  assert.equal((await as(A, `select * from leads`)).rows.length, 0);
  assert.equal((await as(A, `select * from solicitudes_credito where id = '${SOL_B}'`)).rows.length, 0);
  assert.equal((await as(C, `select * from leads`)).rows.length, 1);
});
await check('un cliente no edita artículos del blog', async () => {
  assert.equal((await as(A, `insert into articulos (titulo) values ('x')`)).ok, false);
});
let solA;
await check('un cliente no crea solicitudes en estado avanzado ni cambia el estado', async () => {
  const r = await as(A, `insert into solicitudes_credito (cliente_id, estado) values ('${A}', 'aprobada') returning id, estado`);
  assert.equal(r.rows[0].estado, 'solicitud_iniciada');
  solA = r.rows[0].id;
  const upd = await as(A, `update solicitudes_credito set estado = 'fondeado' where id = '${solA}'`);
  assert.equal(upd.ok === false || upd.affected === 0, true);
  assert.equal((await rows(`select estado from solicitudes_credito where id = '${solA}'`))[0].estado, 'solicitud_iniciada');
  assert.equal((await as(C, `update solicitudes_credito set estado = 'en_comite' where id = '${solA}'`)).affected, 1);
});

await check('una solicitud enviada no se puede modificar (monto, plazo, etc.)', async () => {
  const r = await as(A, `update solicitudes_credito set monto = 999999999 where id = '${solA}'`);
  assert.equal(r.ok === false || r.affected === 0, true);
  assert.equal((await rows(`select monto from solicitudes_credito where id = '${solA}'`))[0].monto, null);
});
await check('el trigger bloquea cambios aunque exista una política UPDATE permisiva heredada', async () => {
  await db.exec(`create policy "legado permisivo" on public.solicitudes_credito for update using (auth.uid() = cliente_id)`);
  try {
    const r = await as(A, `update solicitudes_credito set monto = 1 where id = '${solA}'`);
    assert.equal(r.ok, false);
    assert.match(r.err, /ya fue enviada/);
  } finally {
    await db.exec(`drop policy "legado permisivo" on public.solicitudes_credito`);
  }
});
await check('una solicitud enviada no se puede borrar', async () => {
  const r = await as(A, `delete from solicitudes_credito where id = '${solA}'`);
  assert.equal(r.ok === false || r.affected === 0, true);
  assert.equal((await rows(`select count(*)::int as n from solicitudes_credito where id = '${solA}'`))[0].n, 1);
});
await check('un borrador sí se edita y se envía; después queda bloqueado', async () => {
  const r = await as(A, `insert into solicitudes_credito (cliente_id, estado, monto) values ('${A}', 'borrador', 100) returning id, estado`);
  assert.equal(r.rows[0].estado, 'borrador');
  const draftId = r.rows[0].id;
  assert.equal((await as(A, `update solicitudes_credito set monto = 200 where id = '${draftId}'`)).affected, 1);
  assert.equal((await as(A, `update solicitudes_credito set estado = 'aprobado' where id = '${draftId}'`)).ok, false);
  assert.equal((await as(A, `update solicitudes_credito set estado = 'solicitud_iniciada' where id = '${draftId}'`)).affected, 1);
  const after = await as(A, `update solicitudes_credito set monto = 300 where id = '${draftId}'`);
  assert.equal(after.ok === false || after.affected === 0, true);
  assert.equal((await rows(`select monto::int as m from solicitudes_credito where id = '${draftId}'`))[0].m, 200);
});
await check('un cliente no puede asignarse analista al crear la solicitud', async () => {
  const r = await as(A, `insert into solicitudes_credito (cliente_id, estado, analista_id) values ('${A}', 'solicitud_iniciada', '${C}') returning analista_id`);
  assert.equal(r.rows[0].analista_id, null);
});
await check('el staff sí puede ajustar el monto de una solicitud enviada', async () => {
  assert.equal((await as(C, `update solicitudes_credito set monto = 500000 where id = '${solA}'`)).affected, 1);
});
await check('el cliente no valida sus propios documentos', async () => {
  const r = await as(A, `insert into documentos (solicitud_id, url_archivo, subido_por, estado) values ('${solA}', 'x/y.pdf', '${A}', 'validado') returning id, estado`);
  assert.equal(r.rows[0].estado, 'subido');
  const docId = r.rows[0].id;
  assert.equal((await as(A, `update documentos set estado = 'validado' where id = '${docId}'`)).ok, false);
  const del = await as(A, `delete from documentos where id = '${docId}'`);
  assert.equal(del.ok === false || del.affected === 0, true);
  assert.equal((await rows(`select estado from documentos where id = '${docId}'`))[0].estado, 'subido');
  await db.exec(`delete from documentos where id = '${docId}'`);
});

console.log('Storage');
await check('documentos-credito es privado', async () => {
  assert.equal((await rows(`select public from storage.buckets where id = 'documentos-credito'`))[0].public, false);
});
await check('cada cliente solo ve sus archivos; staff ve todos', async () => {
  await db.exec(`insert into storage.objects (bucket_id, name, owner) values
    ('documentos-credito', '${solA}/ine.pdf', '${A}'), ('documentos-credito', '${SOL_B}/ine.pdf', '${B}')`);
  assert.deepEqual((await as(A, `select name from storage.objects`)).rows.map((r) => r.name), [`${solA}/ine.pdf`]);
  assert.equal((await as(C, `select name from storage.objects`)).rows.length, 2);
});
await check('no se puede subir a la carpeta de otra solicitud', async () => {
  assert.equal((await as(A, `insert into storage.objects (bucket_id, name, owner) values ('documentos-credito', '${SOL_B}/x.pdf', '${A}')`)).ok, false);
  assert.equal((await as(A, `insert into storage.objects (bucket_id, name, owner) values ('documentos-credito', '${solA}/x.pdf', '${A}')`)).ok, true);
});
await check('un cliente no borra archivos', async () => {
  assert.equal((await as(A, `delete from storage.objects where name = '${solA}/x.pdf'`)).affected, 0);
});
await check('las URLs públicas guardadas se convierten en rutas', async () => {
  await db.exec(`insert into documentos (solicitud_id, url_archivo) values
    ('${solA}', 'https://p.supabase.co/storage/v1/object/public/documentos-credito/${solA}/ine.pdf')`);
  await applyMigrations();
  assert.equal((await rows(`select url_archivo from documentos`))[0].url_archivo, `${solA}/ine.pdf`);
});

console.log('OTP');
await check('los códigos previos (en claro) quedan invalidados y hay columnas attempts/purpose', async () => {
  const [r] = await rows(`select used, attempts, purpose from otp_codes`);
  assert.deepEqual(r, { used: true, attempts: 0, purpose: 'signup' });
});

console.log(`\n${passed} verificaciones OK`);
