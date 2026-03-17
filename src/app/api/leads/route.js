import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/utils/supabaseClient';

export async function POST(request) {
  const supabase = createSupabaseServerClient();

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
      tipo_cliente, // Asegurarse que coincida con el frontend (PF/PM) o ajustar schema si es necesario
      empresa,
      rfc,
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

  return NextResponse.json({ lead: data }, { status: 201 });
}
