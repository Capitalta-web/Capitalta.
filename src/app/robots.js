import { SITE_URL } from '@/utils/siteUrl';

/***************************  ROBOTS  ***************************/
// Áreas privadas o transaccionales fuera del índice de buscadores.

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/admin', '/auth', '/mi-cuenta', '/api']
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
