// Helpers de formato para mostrar rangos de productos desde `src/data/datosNegocio.js`.
import { PRODUCTOS } from '@/data/datosNegocio';

const moneda = (valor) => valor.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

export function rangoMonto(clave, separador = ' - ') {
  const p = PRODUCTOS[clave];
  return `${moneda(p.montoMin)}${separador}${moneda(p.montoMax)}`;
}

export function rangoPlazo(clave) {
  const p = PRODUCTOS[clave];
  return `${p.plazoMin} a ${p.plazoMax} meses`;
}
