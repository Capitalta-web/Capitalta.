const RFC_CHAR_MAP = (() => {
  const chars = '0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ';
  const map = new Map();
  for (let i = 0; i < chars.length; i += 1) map.set(chars[i], i);
  return map;
})();

export function normalizeRfc(input) {
  return String(input || '')
    .toUpperCase()
    .replace(/[\s-]+/g, '')
    .trim();
}

function isValidDateYYMMDD(yyMMdd) {
  if (!/^\d{6}$/.test(yyMMdd)) return false;
  const yy = Number(yyMMdd.slice(0, 2));
  const mm = Number(yyMMdd.slice(2, 4));
  const dd = Number(yyMMdd.slice(4, 6));
  if (mm < 1 || mm > 12) return false;
  if (dd < 1 || dd > 31) return false;
  const year = yy < 30 ? 2000 + yy : 1900 + yy;
  const date = new Date(Date.UTC(year, mm - 1, dd));
  return date.getUTCFullYear() === year && date.getUTCMonth() === mm - 1 && date.getUTCDate() === dd;
}

function computeVerificationDigit(rfcBase) {
  const base = normalizeRfc(rfcBase);
  const len = base.length;
  let sum = 0;
  for (let i = 0; i < len; i += 1) {
    const ch = base[i];
    const value = RFC_CHAR_MAP.get(ch);
    if (value === undefined) return null;
    const weight = len + 1 - i;
    sum += value * weight;
  }
  const mod = sum % 11;
  const digit = 11 - mod;
  if (digit === 11) return '0';
  if (digit === 10) return 'A';
  if (digit >= 0 && digit <= 9) return String(digit);
  return null;
}

export function validateRfc(rfcInput) {
  const rfc = normalizeRfc(rfcInput);
  const errors = [];

  if (!rfc) {
    errors.push('RFC requerido');
    return { isValid: false, normalized: rfc, errors, type: null };
  }

  if (!(rfc.length === 12 || rfc.length === 13)) {
    errors.push('Longitud inválida');
    return { isValid: false, normalized: rfc, errors, type: null };
  }

  const isPerson = rfc.length === 13;
  const prefix = rfc.slice(0, isPerson ? 4 : 3);
  const datePart = rfc.slice(isPerson ? 4 : 3, (isPerson ? 4 : 3) + 6);
  const homoclave = rfc.slice((isPerson ? 4 : 3) + 6);

  const prefixRe = isPerson ? /^[A-ZÑ&]{4}$/ : /^[A-ZÑ&]{3}$/;
  if (!prefixRe.test(prefix)) errors.push('Prefijo inválido');
  if (!isValidDateYYMMDD(datePart)) errors.push('Fecha inválida');
  if (!/^[A-Z0-9]{3}$/.test(homoclave)) errors.push('Homoclave inválida');

  const expectedDigit = computeVerificationDigit(rfc.slice(0, rfc.length - 1));
  const actualDigit = rfc.slice(-1);
  if (!expectedDigit || expectedDigit !== actualDigit) errors.push('Dígito verificador inválido');

  const type =
    rfc === 'XAXX010101000'
      ? 'generic'
      : rfc === 'XEXX010101000'
        ? 'foreign'
        : isPerson
          ? 'person'
          : 'company';

  return { isValid: errors.length === 0, normalized: rfc, errors, type };
}

