/**
 * Reglas de edición de solicitudes de crédito para el CLIENTE.
 * La base de datos lo hace cumplir (migración 20261009000400_solicitudes_bloqueo_cliente.sql);
 * aquí se refleja en la interfaz y se arma el payload de alta con una lista blanca.
 */

export const ESTADO_BORRADOR = 'borrador';
export const ESTADO_ENVIADA = 'solicitud_iniciada';

/** El cliente solo puede modificar una solicitud mientras está en borrador. */
export function clientePuedeEditarSolicitud(solicitud) {
  return solicitud?.estado === ESTADO_BORRADOR;
}

/**
 * Payload de alta de una solicitud desde el dashboard del cliente.
 * Solo campos permitidos: nunca estado avanzado, analista ni otro cliente.
 */
export function buildNuevaSolicitudPayload({ userId, formData = {}, rfc = null }) {
  const monto = Number.parseFloat(formData.monto_solicitado);
  const plazo = Number.parseInt(formData.plazo_meses, 10);
  return {
    cliente_id: userId,
    tipo_credito: formData.tipo_credito,
    monto_solicitado: Number.isFinite(monto) ? monto : null,
    plazo_meses: Number.isFinite(plazo) ? plazo : null,
    estado: ESTADO_ENVIADA,
    detalles: {
      empresa: formData.empresa,
      rfc,
      notas: formData.notas
    }
  };
}
