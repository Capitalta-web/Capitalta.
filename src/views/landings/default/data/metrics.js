import { METRICAS } from '@/data/datosNegocio';

export const metrics = {
  heading: 'Resultados que respaldan tu confianza',
  caption: 'Capitalta impulsa el crecimiento de personas y negocios con soluciones de crédito a la medida.',
  // TODO(Alberto): cifras sin verificar; la sección se oculta mientras METRICAS.mostrar = false.
  blockDetail: METRICAS.items,
  mostrar: METRICAS.mostrar
};
