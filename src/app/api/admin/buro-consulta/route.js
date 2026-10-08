import { NextResponse } from 'next/server';
import { getAdminContext } from '@/utils/buro/server-auth';
import { decrypt } from '@/utils/buro/crypto';
import { consultarBuro } from '@/utils/buro/connector';

// POST { solicitudId } -> consulta buró para esa solicitud, registra y devuelve el resultado.
export async function POST(request) {
  try {
    const ctx = await getAdminContext();
    if (ctx.error) return NextResponse.json({ error: ctx.error }, { status: ctx.status });

    const body = await request.json();
    const solicitudId = body?.solicitudId;
    if (!solicitudId) return NextResponse.json({ error: 'Falta solicitudId' }, { status: 400 });

    // Traer solicitud + perfil del cliente
    const { data: sol, error: solErr } = await ctx.admin
      .from('solicitudes')
      .select('*, profiles:cliente_id(*)')
      .eq('id', solicitudId)
      .single();
    if (solErr || !sol) return NextResponse.json({ error: 'Solicitud no encontrada' }, { status: 404 });

    const p = sol.profiles || {};
    const persona = {
      nombres: (p.full_name || '').split(' ')[0],
      apellido_paterno: p.apellido_paterno,
      apellido_materno: p.apellido_materno,
      rfc: p.rfc,
      curp: p.curp,
      fecha_nacimiento: p.fecha_nacimiento,
      domicilio_calle: p.domicilio_calle,
      domicilio_numero: p.domicilio_numero,
      domicilio_colonia: p.domicilio_colonia,
      domicilio_cp: p.domicilio_cp,
      domicilio_municipio: p.domicilio_municipio,
      domicilio_estado: p.domicilio_estado,
      ingreso_mensual: sol.ingreso_mensual,
      gastos_mensuales: sol.gastos_mensuales,
      nombre: p.full_name
    };

    // Configuración
    const { data: cfg } = await ctx.admin.from('buro_config').select('*').eq('id', 'default').maybeSingle();
    const config = {
      modo: cfg?.modo || 'sandbox',
      endpoint_url: cfg?.endpoint_url,
      producto: cfg?.producto,
      credenciales: cfg?.credenciales_cifradas ? JSON.parse(decrypt(cfg.credenciales_cifradas)) : null
    };

    if (config.modo === 'produccion' && (!config.endpoint_url || !config.credenciales)) {
      return NextResponse.json({ error: 'Modo producción sin credenciales configuradas' }, { status: 400 });
    }

    // En producción (consulta real) se requiere el consentimiento del cliente.
    // En sandbox (datos simulados) no, para poder demostrar el flujo.
    if (config.modo === 'produccion' && !sol.autoriza_buro) {
      return NextResponse.json({ error: 'El cliente no autorizó la consulta a buró' }, { status: 400 });
    }

    let resultado;
    let status = 'success';
    let errorMsg = null;
    try {
      resultado = await consultarBuro({ config, persona });
      resultado.consultado_en = new Date().toISOString();
    } catch (err) {
      status = 'error';
      errorMsg = err?.message || 'Error en la consulta';
    }

    // Registrar en bitácora (obligatorio conservar evidencia)
    await ctx.admin.from('buro_consultas').insert([
      {
        solicitud_id: solicitudId,
        cliente_id: sol.cliente_id,
        consultado_por: ctx.user.id,
        modo: config.modo,
        score: resultado?.score ?? null,
        resultado: resultado || null,
        status,
        error_msg: errorMsg
      }
    ]);

    if (status === 'error') {
      return NextResponse.json({ error: errorMsg }, { status: 502 });
    }

    return NextResponse.json({ ok: true, resultado });
  } catch (err) {
    return NextResponse.json({ error: err?.message || 'Error' }, { status: 500 });
  }
}
