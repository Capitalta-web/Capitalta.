// Inspecciona el esquema real del proyecto Capitalta usando la service role key.
// Uso: node scripts/inspect-db.mjs
import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

// Parse .env.local manualmente (sin dependencias)
function loadEnv(path) {
  const env = {};
  try {
    const content = readFileSync(path, 'utf8');
    for (const line of content.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch (e) {
    // ignore
  }
  return env;
}

const env = { ...loadEnv('.env'), ...loadEnv('.env.local') };
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

console.log('Proyecto:', url);
const supabase = createClient(url, key, { auth: { persistSession: false } });

const tables = ['profiles', 'solicitudes', 'solicitudes_credito', 'documentos', 'citas', 'creditos'];

for (const t of tables) {
  const { data, error, count } = await supabase.from(t).select('*', { count: 'exact' }).limit(1);
  if (error) {
    console.log(`\n[${t}] NO EXISTE o sin acceso -> ${error.message}`);
  } else {
    const cols = data && data[0] ? Object.keys(data[0]) : '(tabla vacía, columnas desconocidas)';
    console.log(`\n[${t}] EXISTE (filas: ${count})`);
    console.log('   columnas:', cols);
  }
}

// Buckets de storage
const { data: buckets, error: bErr } = await supabase.storage.listBuckets();
if (bErr) {
  console.log('\n[storage] error listando buckets:', bErr.message);
} else {
  console.log('\n[storage] buckets:', buckets.map((b) => `${b.name} (${b.public ? 'público' : 'privado'})`));
}
