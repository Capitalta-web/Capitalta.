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
    id: 'satelite',
    nombre: 'Oficinas Satélite',
    direccion: 'Circuito Circunvalación Poniente 16, Local V - W, Ciudad Satélite',
    ciudad: 'Naucalpan',
    estado: 'Estado de México',
    cp: '53310',
    telefono: '800 258 2000'
  }
];
