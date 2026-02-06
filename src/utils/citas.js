export function obtenerProximasFechas() {
  const hoy = new Date();
  const fechas = [];

  for (let i = 0; i < 21; i += 1) {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() + i);

    const diaSemana = fecha.getDay();
    if (diaSemana === 0 || diaSemana === 6) {
      continue;
    }

    fechas.push(fecha);
  }

  return fechas;
}

export function generarCodigoCita(fecha, hora) {
  const base = fecha.getFullYear();
  const aleatorio = Math.floor(100000 + Math.random() * 900000);
  return `CAP-${base}-${aleatorio.toString()}`;
}

export const horasDisponibles = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

export const sucursalesMock = [
  {
    id: 'reforma',
    nombre: 'Oficinas Centrales',
    direccion: 'Torre Cuarzo, Piso 33, Av. Paseo de la Reforma 26, Col. Juárez',
    ciudad: 'Ciudad de México',
    estado: 'CDMX',
    cp: '06600',
    telefono: '+52 (55) 0000 0001' // TODO: Actualizar con teléfono real si está disponible
  }
];
