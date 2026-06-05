import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/utils/supabaseClient';

export async function POST(request) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({ error: 'Supabase no está configurado' }, { status: 500 });
  }

  const body = await request.json();

  const { lead_id, monto, plazo, tasa_anual, pago_mensual, interes_total, total_a_pagar, tabla_amortizacion } = body;

  if (
    !lead_id ||
    !monto ||
    !plazo ||
    !tasa_anual ||
    !pago_mensual ||
    !interes_total ||
    !total_a_pagar ||
    !Array.isArray(tabla_amortizacion) ||
    tabla_amortizacion.length === 0
  ) {
    return NextResponse.json({ error: 'Faltan campos obligatorios de la cotización' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('cotizaciones')
    .insert({
      lead_id,
      monto,
      plazo,
      tasa_anual,
      pago_mensual,
      interes_total,
      total_a_pagar,
      tabla_amortizacion
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ cotizacion: data }, { status: 201 });
}
