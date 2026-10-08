export const CONTACT_EMAIL = 'contacto@capitalta.mx';

export const escapeHtml = (value) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

/** Renglón "Etiqueta: valor" para los correos internos; el valor se escapa. */
export const row = (label, value) =>
  `<p style="margin: 6px 0;"><strong>${label}:</strong> ${escapeHtml(value || '-').replaceAll('\n', '<br/>')}</p>`;
