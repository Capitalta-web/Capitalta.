export function generarTablaAmortizacion(monto, plazoMeses, tasaAnual, fechaInicio) {
  const tasaMensual = tasaAnual / 12 / 100;
  const pagoMensual = (monto * tasaMensual * Math.pow(1 + tasaMensual, plazoMeses)) / (Math.pow(1 + tasaMensual, plazoMeses) - 1);

  let saldo = monto;
  const pagos = [];
  const inicio = new Date(fechaInicio);

  for (let i = 1; i <= plazoMeses; i++) {
    const interes = saldo * tasaMensual;
    const capital = pagoMensual - interes;
    saldo -= capital;

    const fechaPago = new Date(inicio);
    fechaPago.setMonth(fechaPago.getMonth() + i);

    pagos.push({
      numero_pago: i,
      fecha_programada: fechaPago.toISOString().split('T')[0],
      monto_programado: Math.round(pagoMensual * 100) / 100,
      capital: Math.round(capital * 100) / 100,
      interes: Math.round(interes * 100) / 100,
      saldo_restante: Math.max(0, Math.round(saldo * 100) / 100),
      estado: 'pendiente'
    });
  }

  return pagos;
}
