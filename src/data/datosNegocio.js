/**
 * Fuente única de datos de negocio que se muestran en el sitio público de Capitalta
 * (ALTA CAPITAL S.A. de C.V., SOFOM ENR).
 *
 * Reglas:
 *  - Toda cifra comercial visible (tasa, CAT, montos, plazos, métricas, teléfonos) debe salir de aquí.
 *  - Lo que no esté confirmado por Dirección/Cumplimiento se deja en `null` o con `mostrar: false`
 *    y un TODO. Los componentes NO deben mostrar nada cuando el valor es `null`/`mostrar: false`.
 *  - Antes de publicar un valor nuevo, validarlo con Cumplimiento (CONDUSEF / Banxico: la publicidad
 *    de crédito debe incluir el CAT junto a la tasa).
 */

/* ---------------------------------------------------------------------------
 * Tasa y CAT
 * ------------------------------------------------------------------------- */

// Tasa de interés ordinaria anual fija. Decisión vigente: commit del 5-jun-2026 (36% -> 24%).
export const TASA_ANUAL_FIJA = 24;

/**
 * CAT (Costo Anual Total).
 * TODO(Alberto/Cumplimiento): confirmar el CAT promedio, si es "sin IVA", y la fecha de cálculo.
 * Mientras `valor` sea null, el componente <TasaYCat /> solo muestra la tasa y deja el espacio
 * reservado para el CAT (no se publica ninguna cifra inventada).
 */
export const CAT = {
  valor: null, // p. ej. 30.5 (número, en %)
  sinIva: true,
  fechaCalculo: null, // p. ej. '1 de noviembre de 2026'
  vigencia: null, // p. ej. 'Vigente al 30 de noviembre de 2026'
  leyenda: 'Para fines informativos y de comparación exclusivamente.'
};

/* ---------------------------------------------------------------------------
 * Productos (montos y plazos)
 * Fuente: límites aplicados en las calculadoras (commits de Alberto del 25-feb-2026
 * "Cleanup-and-updates": mínimo $500,000 y 12 meses; y del 13-mar-2026
 * "raise revolvente max to 50M").
 * TODO(Alberto): confirmar rangos y el nombre comercial del producto de /productos/credito-simple
 * ("Crédito Revolvente" vs "Crédito Simple").
 * ------------------------------------------------------------------------- */
export const PRODUCTOS = {
  revolvente: {
    nombre: 'Crédito Revolvente',
    href: '/productos/credito-simple',
    calculadora: '/calculadoras/calculadora-simple',
    montoMin: 500000,
    montoMax: 50000000,
    plazoMin: 12,
    plazoMax: 60
  },
  empresarial: {
    nombre: 'Crédito Empresarial',
    href: '/productos/credito-empresarial',
    calculadora: '/calculadoras/calculadora-empresarial',
    montoMin: 500000,
    montoMax: 50000000,
    plazoMin: 12,
    plazoMax: 120
  }
};

/* ---------------------------------------------------------------------------
 * Contacto
 * ------------------------------------------------------------------------- */
export const CONTACTO = {
  email: 'contacto@capitalta.mx',
  // TODO(Alberto): confirmar que el 800 258 2000 es de Capitalta y está activo. Oculto mientras tanto.
  telefono800: { numero: '800 258 2000', tel: '8002582000', mostrar: false }
};

/* ---------------------------------------------------------------------------
 * Métricas y prueba social (NO verificadas: ocultas hasta confirmarlas)
 * TODO(Alberto): confirmar cada valor con datos reales y la fecha de corte antes de mostrarlo.
 * ------------------------------------------------------------------------- */
export const METRICAS = {
  // Sección "Resultados que respaldan tu confianza" de la home.
  mostrar: false,
  items: [
    { counter: 60, defaultUnit: '', caption: 'Total de activos' }, // TODO: ¿60 qué? (¿millones de pesos?)
    { counter: 150, defaultUnit: '', caption: 'Créditos otorgados' },
    { counter: 5, defaultUnit: '+', caption: 'Años de experiencia' },
    { counter: 98, defaultUnit: '%', caption: 'Tasa de satisfacción' }
  ]
};

export const PRUEBA_SOCIAL = {
  // "10k+ Clientes confían en nosotros" y "Excelencia en servicio (4.9 de 5)" del bloque de contacto (CTA).
  mostrar: false,
  clientes: { count: 10, defaultUnit: 'k+', caption: 'Clientes confían en nosotros' },
  calificacion: 'Excelencia en servicio (4.9 de 5)'
};

/* ---------------------------------------------------------------------------
 * Tiempos de respuesta y condiciones comerciales
 * ------------------------------------------------------------------------- */
// TODO(Alberto): confirmar el tiempo de respuesta inicial. El FAQ decía "menos de 72 horas hábiles"
// y el registro dice "Aprobación en 48 horas". Mientras sea null, no se promete un plazo.
export const TIEMPO_RESPUESTA = null;

// TODO(Alberto/Cumplimiento): confirmar que el contrato no tiene penalización por prepago.
export const SIN_PENALIZACION_PREPAGO = { mostrar: false };

/* ---------------------------------------------------------------------------
 * Panel lateral de /auth/registro
 * ------------------------------------------------------------------------- */
export const REGISTRO = {
  beneficios: [
    // Depende de TIEMPO_RESPUESTA: sin plazo confirmado no se promete "Aprobación en 48 horas".
    { texto: TIEMPO_RESPUESTA ? `Respuesta en ${TIEMPO_RESPUESTA}` : null },
    { texto: 'Sin costos ocultos' }, // TODO(Alberto/Cumplimiento): confirmar (comisiones, CAT).
    { texto: 'Trámite 100% digital' }, // TODO(Alberto): confirmar; hoy se agendan citas y documentos presenciales.
    { texto: 'Asesoría personalizada' }
  ].filter((b) => b.texto),
  // TODO(Alberto): el testimonio "Carlos Mendoza, Director General, TechSolutions" no tiene fuente.
  // Solo mostrar un testimonio real con autorización por escrito del cliente.
  testimonio: { mostrar: false, cita: '', nombre: '', cargo: '' }
};
