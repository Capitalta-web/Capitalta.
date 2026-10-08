import crypto from 'crypto';

// Conector con Buró de Crédito.
// - modo 'sandbox': genera un reporte simulado realista (para desarrollo/demo).
// - modo 'produccion': llama a la API real de Buró (APIF) con las credenciales.
//
// NOTA: el formato exacto de request/response de APIF se ajusta cuando se
// tengan las credenciales y la documentación del contrato. La función
// consultaProduccion está marcada para mapear esos campos.

// ---- Helpers de scoring (BC Score va aprox. de 300 a 850) ----
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function nivelRiesgo(score) {
  if (score >= 700) return { nivel: 'Bajo', recomendacion: 'Aprobar', color: 'success' };
  if (score >= 600) return { nivel: 'Medio', recomendacion: 'Revisar', color: 'warning' };
  return { nivel: 'Alto', recomendacion: 'Rechazar', color: 'error' };
}

// ---- SANDBOX: reporte simulado determinista ----
export function consultaSandbox(persona) {
  // Determinista a partir del RFC/CURP para que el mismo solicitante dé el mismo score
  const semilla = crypto
    .createHash('sha256')
    .update(String(persona.rfc || persona.curp || persona.nombre || 'anon'))
    .digest();
  const base = 300 + (semilla[0] / 255) * 550; // 300-850

  // Ajuste por capacidad de pago (ingreso - gastos)
  const ingreso = Number(persona.ingreso_mensual) || 0;
  const gastos = Number(persona.gastos_mensuales) || 0;
  const capacidad = ingreso - gastos;
  let ajuste = 0;
  if (ingreso > 0) {
    const ratio = capacidad / ingreso;
    ajuste = ratio * 80; // hasta +80 si la capacidad es alta
  }

  const score = Math.round(clamp(base + ajuste, 300, 850));
  const riesgo = nivelRiesgo(score);

  const numCuentas = 2 + (semilla[1] % 6);
  const deudaTotal = Math.round((semilla[2] / 255) * 250000);
  const pagosPuntuales = clamp(Math.round((score - 300) / 5.5), 0, 100);

  return {
    modo: 'sandbox',
    score,
    bc_score: score,
    nivel_riesgo: riesgo.nivel,
    recomendacion: riesgo.recomendacion,
    color: riesgo.color,
    resumen: {
      cuentas_totales: numCuentas,
      cuentas_al_corriente: Math.max(0, numCuentas - (semilla[3] % 2)),
      deuda_total: deudaTotal,
      porcentaje_pagos_puntuales: pagosPuntuales,
      cuentas_morosas: semilla[3] % 2,
      consultas_recientes: semilla[4] % 4
    },
    alertas_hawk: score < 550 ? ['Verificar identidad', 'Revisar comportamiento reciente'] : [],
    aviso: 'DATOS SIMULADOS — modo sandbox. No representan el historial real.',
    consultado_en: null // lo estampa el servidor
  };
}

// ---- PRODUCCIÓN: llamada real a APIF de Buró de Crédito ----
export async function consultaProduccion({ endpoint, credenciales, persona, producto }) {
  if (!endpoint) throw new Error('Falta endpoint_url en la configuración del buró');
  const token = credenciales?.token || credenciales?.access_token || credenciales?.api_key;
  if (!token) throw new Error('Faltan credenciales (token) del buró');

  // El cuerpo exacto depende del producto/contrato APIF. Estructura base con
  // los datos que ya recabamos. Ajustar el mapeo según la doc del contrato.
  const body = {
    producto: producto || 'reporte_credito',
    persona: {
      primer_nombre: persona.nombres,
      apellido_paterno: persona.apellido_paterno,
      apellido_materno: persona.apellido_materno,
      rfc: persona.rfc,
      curp: persona.curp,
      fecha_nacimiento: persona.fecha_nacimiento,
      domicilio: {
        calle: persona.domicilio_calle,
        numero: persona.domicilio_numero,
        colonia: persona.domicilio_colonia,
        cp: persona.domicilio_cp,
        municipio: persona.domicilio_municipio,
        estado: persona.domicilio_estado
      }
    }
  };

  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(credenciales?.headers || {})
    },
    body: JSON.stringify(body)
  });

  const text = await resp.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  if (!resp.ok) {
    throw new Error(`Buró respondió ${resp.status}: ${typeof data === 'object' ? JSON.stringify(data).slice(0, 300) : text.slice(0, 300)}`);
  }

  // Mapear el score del response real (ajustar la ruta del campo según APIF)
  const score = data?.score ?? data?.bc_score ?? data?.scoring?.valor ?? null;
  const riesgo = score != null ? nivelRiesgo(Number(score)) : { nivel: null, recomendacion: null, color: 'default' };

  return {
    modo: 'produccion',
    score: score != null ? Number(score) : null,
    bc_score: score != null ? Number(score) : null,
    nivel_riesgo: riesgo.nivel,
    recomendacion: riesgo.recomendacion,
    color: riesgo.color,
    resultado_crudo: data,
    consultado_en: null
  };
}

export async function consultarBuro({ config, persona }) {
  if (!config || config.modo === 'sandbox') {
    return consultaSandbox(persona);
  }
  return consultaProduccion({
    endpoint: config.endpoint_url,
    credenciales: config.credenciales,
    producto: config.producto,
    persona
  });
}
