import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/utils/supabaseClient';

export async function POST(request) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({ error: 'Supabase no está configurado' }, { status: 500 });
  }

  const body = await request.json();

  const { email, nombre, apellido, telefono, tipo_cliente, empresa, rfc, monto_solicitado, plazo_meses, tipo_credito } = body;

  if (!email || !nombre || !telefono) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('leads')
    .insert({
      email,
      nombre,
      apellido,
      telefono,
      tipo_cliente,
      empresa,
      rfc,
      monto_solicitado,
      plazo_meses,
      tipo_credito,
      estado: 'lead'
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ lead: data }, { status: 201 });
}
