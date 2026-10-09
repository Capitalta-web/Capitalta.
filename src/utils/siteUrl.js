// URL canónica del sitio público (producción redirige capitalta.mx -> www.capitalta.mx).
export const SITE_URL = (process.env.NEXT_PUBLIC_METADATA_BASE || 'https://www.capitalta.mx').replace(/\/$/, '');
