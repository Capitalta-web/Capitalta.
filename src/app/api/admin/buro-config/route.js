import { NextResponse } from 'next/server';
import { getAdminContext } from '@/utils/buro/server-auth';
import { encrypt } from '@/utils/buro/crypto';

// GET: estado de la configuración (sin exponer credenciales)
export async function GET() {
  try {
    const ctx = await getAdminContext();
    if (ctx.error) return NextResponse.json({ error: ctx.error }, { status: ctx.status });

    const { data } = await ctx.admin.from('buro_config').select('*').eq('id', 'default').maybeSingle();

    return NextResponse.json({
      configurado: Boolean(data?.credenciales_cifradas),
      provider: data?.provider || 'buro_de_credito',
      modo: data?.modo || 'sandbox',
      producto: data?.producto || 'reporte_credito',
      endpoint_url: data?.endpoint_url || '',
      updated_at: data?.updated_at || null
    });
  } catch (err) {
    return NextResponse.json({ error: err?.message || 'Error' }, { status: 500 });
  }
}

// POST: guardar configuración (cifra credenciales). Body:
// { modo, endpoint_url, producto, credenciales: { token, ... } }
export async function POST(request) {
  try {
    const ctx = await getAdminContext();
    if (ctx.error) return NextResponse.json({ error: ctx.error }, { status: ctx.status });

    const body = await request.json();
    const modo = body?.modo === 'produccion' ? 'produccion' : 'sandbox';
    const endpoint_url = String(body?.endpoint_url || '').trim() || null;
    const producto = String(body?.producto || 'reporte_credito').trim();

    const update = {
      id: 'default',
      provider: 'buro_de_credito',
      modo,
      endpoint_url,
      producto,
      actualizado_por: ctx.user.id,
      updated_at: new Date().toISOString()
    };

    // Solo re-cifrar credenciales si vienen en el body (para no borrarlas al editar otros campos)
    if (body?.credenciales && Object.keys(body.credenciales).length > 0) {
      update.credenciales_cifradas = encrypt(JSON.stringify(body.credenciales));
    }

    const { error } = await ctx.admin.from('buro_config').upsert(update, { onConflict: 'id' });
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err?.message || 'Error' }, { status: 500 });
  }
}
