/**
 * @jest-environment node
 */
// Chequeos estáticos de las migraciones de seguridad (no requieren base de datos).
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'supabase/migrations');
const read = (name) => fs.readFileSync(path.join(dir, name), 'utf8');
const strip = (sql) => sql.replace(/--.*$/gm, '');

describe('migraciones de seguridad', () => {
  const roles = strip(read('20261009000100_roles_seguros.sql'));
  const storage = strip(read('20261009000300_storage_documentos_privado.sql'));
  const otp = strip(read('20261009000200_otp_seguro.sql'));

  it('handle_new_user asigna siempre cliente y no lee el rol de metadata', () => {
    const fn = roles.slice(roles.indexOf('function public.handle_new_user'), roles.indexOf('drop trigger if exists on_auth_user_created'));
    expect(fn).toMatch(/'cliente'/);
    expect(fn).not.toMatch(/raw_user_meta_data->>'role'/);
  });

  it('ninguna política nueva usa user_metadata para autorizar', () => {
    expect(roles).not.toMatch(/user_metadata/);
    expect(storage).not.toMatch(/user_metadata/);
  });

  it('existe el trigger que impide cambiar el propio rol', () => {
    expect(roles).toMatch(/create trigger profiles_proteger_role/);
    expect(roles).toMatch(/Solo un administrador puede cambiar roles/);
  });

  it('el bucket documentos-credito queda privado', () => {
    expect(storage).toMatch(/set public = false/);
    expect(storage).not.toMatch(/'documentos-credito',\s*true/);
  });

  it('otp_codes tiene attempts y purpose', () => {
    expect(otp).toMatch(/add column if not exists attempts/);
    expect(otp).toMatch(/add column if not exists purpose/);
  });
});
