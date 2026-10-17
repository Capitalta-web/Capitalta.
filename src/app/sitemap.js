/***************************  SITEMAP  ***************************/
// Solo páginas públicas reales de Capitalta. No incluir dashboard, admin, auth, mi-cuenta ni API.

import { SITE_URL } from '@/utils/siteUrl';

const routes = [
  { url: '', priority: 1, changeFrequency: 'weekly' },
  { url: '/productos', priority: 0.9, changeFrequency: 'monthly' },
  { url: '/productos/credito-simple', priority: 0.9, changeFrequency: 'monthly' },
  { url: '/productos/credito-empresarial', priority: 0.9, changeFrequency: 'monthly' },
  { url: '/calculadoras/calculadora-simple', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/calculadoras/calculadora-empresarial', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/sobre-nosotros', priority: 0.7, changeFrequency: 'yearly' },
  { url: '/contacto', priority: 0.7, changeFrequency: 'yearly' },
  { url: '/faq', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/blog', priority: 0.6, changeFrequency: 'weekly' },
  { url: '/quiero-ser-broker', priority: 0.6, changeFrequency: 'yearly' },
  { url: '/aviso-de-privacidad', priority: 0.3, changeFrequency: 'yearly' },
  { url: '/legales/terminos-y-condiciones', priority: 0.3, changeFrequency: 'yearly' }
];

export default function sitemap() {
  return routes.map((route) => ({
    url: `${SITE_URL}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}
