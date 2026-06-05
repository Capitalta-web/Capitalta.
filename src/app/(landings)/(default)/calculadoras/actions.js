'use server';

import { createSupabaseServerClient } from '@/utils/supabaseClient';

export async function submitLeadAction(data) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return { success: false, error: 'Error de configuración del servidor (Supabase)' };
  }

  const { email, nombre, apellido, telefono, tipo_cliente, empresa, rfc, monto_solicitado, plazo_meses, tipo_credito, notas } = data;

  if (!email || !nombre || !telefono) {
    return { success: false, error: 'Faltan campos obligatorios (nombre, email, teléfono)' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Formato de email inválido' };
  }

  try {
    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        email,
        nombre,
        apellido: apellido || '',
        telefono,
        tipo_cliente: tipo_cliente || 'PM',
        empresa: empresa || null,
        rfc: rfc || null,
        notas: JSON.stringify({
          empresa,
          rfc,
          monto_solicitado,
          plazo_meses,
          tipo_credito,
          ...(notas ? JSON.parse(notas) : {})
        }),
        estado: 'nuevo'
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting lead:', error);
      return { success: false, error: 'No pudimos guardar tu información. Intenta de nuevo.' };
    }

    return { success: true, lead };
  } catch (err) {
    console.error('Unexpected error inserting lead:', err);
    return { success: false, error: 'Error inesperado al procesar la solicitud.' };
  }
}

export async function submitCotizacionAction(data) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return { success: false, error: 'Error de configuración del servidor (Supabase)' };
  }

  const { lead_id, monto, plazo, tasa_anual, pago_mensual, interes_total, total_a_pagar, tabla_amortizacion } = data;

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
    return { success: false, error: 'Faltan datos de la cotización para guardar el registro.' };
  }

  try {
    const { data: cotizacion, error } = await supabase
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
      console.error('Error inserting cotizacion:', error);
      return { success: false, error: 'Error al guardar la cotización.' };
    }

    return { success: true, cotizacion };
  } catch (err) {
    console.error('Unexpected error inserting cotizacion:', err);
    return { success: false, error: 'Error inesperado al guardar la cotización.' };
  }
}
