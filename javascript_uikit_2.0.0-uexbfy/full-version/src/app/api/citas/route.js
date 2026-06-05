import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/utils/supabaseClient';

export async function POST(request) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    // Fallback para desarrollo si no hay Supabase configurado
    return NextResponse.json({ 
      cita: { 
        id: 'mock-id', 
        status: 'mock-confirmada',
        ...await request.json() 
      } 
    }, { status: 201 });
  }

  const body = await request.json();

  const { 
    sucursal_id, 
    fecha, 
    hora, 
    nombre_cliente, 
    email, 
    telefono, 
    codigo_cita,
    cliente_id, // Opcional
    credito_id  // Opcional
  } = body;

  if (!sucursal_id || !fecha || !hora || !nombre_cliente || !codigo_cita) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('citas')
    .insert({
      sucursal_id,
      fecha,
      hora,
      nombre_cliente,
      email,
      telefono,
      codigo_cita,
      status: 'programada',
      // Campos opcionales si existen en la tabla (si no, Supabase los ignorará o dará error si no están en schema)
      // Asegúrate de que el schema coincida.
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ cita: data }, { status: 201 });
}

export async function GET(request) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({ error: 'Supabase no está configurado' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const clienteId = searchParams.get('cliente_id');
  const codigoCita = searchParams.get('codigo_cita');

  if (clienteId) {
    // Buscar por cliente (si tuviéramos tabla relacionada)
    // Por ahora, asumimos que no hay campo cliente_id en la tabla citas según mi migración anterior,
    // pero si lo agregamos, funcionaría.
    // Usaremos nombre_cliente o codigo por ahora para simplicidad del MVP.
    return NextResponse.json({ error: 'Búsqueda por ID no implementada en MVP' }, { status: 501 });
  }

  if (codigoCita) {
    const { data, error } = await supabase
      .from('citas')
      .select('*')
      .eq('codigo_cita', codigoCita)
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ cita: data }, { status: 200 });
  }

  return NextResponse.json({ error: 'Parámetros insuficientes' }, { status: 400 });
}
