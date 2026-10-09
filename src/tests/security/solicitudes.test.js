import { buildNuevaSolicitudPayload, clientePuedeEditarSolicitud } from '@/utils/solicitudes';

describe('solicitudes del cliente', () => {
  it('solo un borrador es editable por el cliente', () => {
    expect(clientePuedeEditarSolicitud({ estado: 'borrador' })).toBe(true);
    expect(clientePuedeEditarSolicitud({ estado: 'solicitud_iniciada' })).toBe(false);
    expect(clientePuedeEditarSolicitud({ estado: 'en_comite' })).toBe(false);
    expect(clientePuedeEditarSolicitud(null)).toBe(false);
  });

  it('el alta usa lista blanca: sin analista ni estado avanzado', () => {
    const payload = buildNuevaSolicitudPayload({
      userId: 'u1',
      rfc: 'XAXX010101000',
      formData: { tipo_credito: 'simple', monto_solicitado: '500000', plazo_meses: '24', estado: 'aprobado', analista_id: 'x', empresa: 'ACME' }
    });
    expect(payload).toEqual({
      cliente_id: 'u1',
      tipo_credito: 'simple',
      monto_solicitado: 500000,
      plazo_meses: 24,
      estado: 'solicitud_iniciada',
      detalles: { empresa: 'ACME', rfc: 'XAXX010101000', notas: undefined }
    });
  });
});
