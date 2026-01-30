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
    codigo_cita
  } = body;

  if (!sucursal_id || !fecha || !hora || !nombre_cliente || !codigo_cita) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
  }

  // Validación básica de sucursal (según valores esperados)
  const sucursalesValidas = ['reforma', 'polanco'];
  if (!sucursalesValidas.includes(sucursal_id.toLowerCase())) {
     // Si no es una de las conocidas, permitimos pasar pero logueamos advertencia o rechazamos si es estricto.
     // Para MVP flexible, lo dejamos pasar pero normalizamos a minúsculas.
  }

  const { data, error } = await supabase
    .from('citas')
    .insert({
      sucursal_id: sucursal_id.toLowerCase(),
      fecha,
      hora,
      nombre_cliente,
      email,
      telefono,
      codigo_cita,
      status: 'programada',
      // Eliminamos campos cliente_id y credito_id ya que no existen en el schema actual de 'citas'
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
