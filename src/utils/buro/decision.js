// Motor de decisión de crédito.
// Combina el resultado del buró + datos declarados para sugerir
// capacidad de pago, DTI, tasa, monto máximo y una recomendación.
// Función pura (sin dependencias) — usable en cliente o servidor.

export function evaluarSolicitud({ buro, solicitud, tasas }) {
  const ingreso = Number(solicitud?.ingreso_mensual) || 0;
  const gastos = Number(solicitud?.gastos_mensuales) || 0;
  const monto = Number(solicitud?.monto_solicitado) || 0;
  const plazo = Number(solicitud?.plazo_meses) || 12;
  const score = buro?.score ?? null;

  const disponible = ingreso - gastos;

  // Tasas configurables (config_credito). Defaults: mínimo 24%.
  const T = tasas || {};
  const tEx = Number(T.tasa_excelente) || 0.24;
  const tBu = Number(T.tasa_buena) || 0.30;
  const tRe = Number(T.tasa_regular) || 0.38;
  const tAl = Number(T.tasa_alta) || 0.45;
  const tMu = Number(T.tasa_muy_alta) || 0.55;

  // Tasa anual sugerida por banda de BC Score (300-850)
  let tasaAnual;
  if (score == null) tasaAnual = null;
  else if (score >= 750) tasaAnual = tEx;
  else if (score >= 700) tasaAnual = tBu;
  else if (score >= 650) tasaAnual = tRe;
  else if (score >= 600) tasaAnual = tAl;
  else tasaAnual = tMu;

  // Mensualidad del monto solicitado (amortización con tasa sugerida)
  const rAnual = tasaAnual ?? tRe;
  const r = rAnual / 12;
  const mensualidad = monto > 0 && r > 0 ? (monto * r) / (1 - Math.pow(1 + r, -plazo)) : 0;

  // Pago máximo afrontable: 60% del ingreso disponible (deja colchón)
  const maxPayment = Math.max(0, disponible * 0.6);
  // Monto máximo sugerido: invertir la fórmula de amortización
  const montoMaximo = maxPayment > 0 && r > 0 ? (maxPayment * (1 - Math.pow(1 + r, -plazo))) / r : 0;

  // DTI: (gastos + nueva mensualidad) / ingreso
  const dti = ingreso > 0 ? (gastos + mensualidad) / ingreso : null;

  const razones = [];
  let nivel = 'aprobar';

  if (score != null && score < 600) {
    nivel = 'rechazar';
    razones.push(`BC Score bajo (${score})`);
  }
  if (disponible <= 0) {
    nivel = 'rechazar';
    razones.push('Sin capacidad de pago (gastos ≥ ingreso)');
  }
  if (buro?.alertas_hawk?.length) {
    if (nivel !== 'rechazar') nivel = 'revisar';
    razones.push('Alertas de fraude/identidad (Hawk)');
  }
  if (mensualidad > maxPayment && disponible > 0 && nivel === 'aprobar') {
    nivel = 'revisar';
    razones.push('La mensualidad solicitada excede su capacidad recomendada');
  }
  if (dti != null && dti > 0.5 && nivel === 'aprobar') {
    nivel = 'revisar';
    razones.push('Nivel de endeudamiento alto (DTI > 50%)');
  }
  if (score != null && score >= 600 && score < 650 && nivel === 'aprobar') {
    nivel = 'revisar';
    razones.push('Score en rango medio (600–649)');
  }
  if (score == null && nivel === 'aprobar') {
    nivel = 'revisar';
    razones.push('Falta consultar el buró');
  }
  if (nivel === 'aprobar') {
    razones.push('Cumple capacidad de pago y score adecuado');
  }

  const meta = {
    aprobar: { label: 'Aprobar', color: 'success' },
    revisar: { label: 'Revisar', color: 'warning' },
    rechazar: { label: 'Rechazar', color: 'error' }
  }[nivel];

  return {
    ingreso,
    gastos,
    disponible,
    mensualidad,
    maxPayment,
    montoMaximo,
    dti,
    tasaAnual,
    score,
    nivel,
    label: meta.label,
    color: meta.color,
    razones
  };
}
