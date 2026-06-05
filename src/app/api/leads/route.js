import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/utils/supabaseClient';
import { sendEmail } from '@/utils/nodemailer';

export async function POST(request) {
  const supabase = createSupabaseServerClient({ admin: true }) || createSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({ error: 'Supabase no está configurado' }, { status: 500 });
  }

  const body = await request.json();

  const { email, nombre, apellido, telefono, tipo_cliente, empresa, rfc, monto_solicitado, plazo_meses, tipo_credito, origen } = body;

  if (!email) {
    return NextResponse.json({ error: 'Email es obligatorio' }, { status: 400 });
  }

  // Validación de formato de email simple
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Formato de email inválido' }, { status: 400 });
  }

  let extraNotas = {};
  try {
    extraNotas = body.notas ? JSON.parse(body.notas) : {};
  } catch {
    extraNotas = {};
  }

  const safeNombre = (nombre && String(nombre).trim()) || 'Interesado';

  const { data, error } = await supabase
    .from('leads')
    .insert({
      email,
      nombre: safeNombre,
      apellido: apellido || '',
      telefono: telefono || null,
      // Mapping de campos del frontend a la base de datos si es necesario
      // Nota: schema.sql no tiene columnas explicitas para monto_solicitado, plazo_meses, tipo_credito en la tabla leads
      // Si queremos guardarlos, debemos agregarlos al schema o guardarlos en 'notas' o una tabla relacionada.
      // Revisando schema.sql:
      /*
        create table if not exists public.leads (
          id uuid default uuid_generate_v4() primary key,
          ...
          nombre text not null,
          apellido text,
          email text not null,
          telefono text,
          estado public.lead_status default 'nuevo',
          origen text default 'web',
          notas text
        );
      */
      // Los campos monto, plazo, tipo_credito NO existen en la tabla leads.
      // Se deben guardar en 'notas' o ignorar.
      // Sin embargo, el frontend los envía. Para MVP, los meteremos en 'notas' como JSON string si no hay columnas.
      notas: JSON.stringify({
        tipo_cliente,
        empresa,
        rfc,
        monto_solicitado,
        plazo_meses,
        tipo_credito,
        ...extraNotas
      }),
      origen: (origen && String(origen).trim()) || 'web',
      estado: 'nuevo' // Corregido para coincidir con el ENUM ('nuevo', 'contactado', etc.)
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const escapeHtml = (value) =>
    String(value || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');

  const shouldNotifyByEmail = String(origen || '').trim() === 'contacto';
  const isBroker = String(origen || '').trim() === 'broker' || (extraNotas && extraNotas.interes === 'broker');
  if (shouldNotifyByEmail) {
    const notas = data?.notas ? String(data.notas) : '';
    let parsedNotas = {};
    try {
      parsedNotas = notas ? JSON.parse(notas) : {};
    } catch {
      parsedNotas = {};
    }

    const subject = `Nuevo contacto web: ${safeNombre} ${apellido || ''}`.trim();
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; padding: 16px;">
        <h2 style="margin: 0 0 12px 0;">Nuevo mensaje desde /contacto</h2>
        <div style="padding: 12px; border: 1px solid #eee; border-radius: 8px;">
          <p style="margin: 6px 0;"><strong>Nombre:</strong> ${escapeHtml(safeNombre)} ${escapeHtml(apellido || '')}</p>
          <p style="margin: 6px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p style="margin: 6px 0;"><strong>Teléfono:</strong> ${escapeHtml(telefono || '-')}</p>
          <p style="margin: 6px 0;"><strong>Mensaje:</strong><br/>${escapeHtml(parsedNotas?.mensaje || '').replaceAll('\n', '<br/>')}</p>
          <p style="margin: 6px 0;"><strong>ID lead:</strong> ${escapeHtml(data?.id)}</p>
        </div>
      </div>
    `;

    try {
      await sendEmail({ to: 'contacto@capitalta.mx', subject, html });
    } catch {}
  }

  if (isBroker) {
    const subject = 'Gracias por tu interés en el Programa de Brókers de Capitalta';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; padding: 16px;">
        <h2 style="margin: 0 0 12px 0;">Registro recibido</h2>
        <p>Hola ${escapeHtml(safeNombre)}, tu correo quedó registrado para nuestro Programa de Brókers.</p>
        <p>Un asesor te contactará para continuar con tu onboarding y compartirte inventario, proceso y comisiones.</p>
        <div style="margin-top:16px;padding:12px;border:1px solid #eee;border-radius:8px;">
          <p style="margin:6px 0;"><strong>Correo:</strong> ${escapeHtml(email)}</p>
          <p style="margin:6px 0;"><strong>Lead ID:</strong> ${escapeHtml(data?.id)}</p>
        </div>
        <p style="margin-top:16px;">Si tienes dudas, escríbenos a contacto@capitalta.mx.</p>
      </div>
    `;
    try {
      await sendEmail({ to: email, cc: 'contacto@capitalta.mx', subject, html });
    } catch {}
  }

  return NextResponse.json({ lead: data }, { status: 201 });
}
