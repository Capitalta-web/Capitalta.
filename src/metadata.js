// @project
import branding from '@/branding.json';

/***************************  SEO METADATA - MAIN LAYOUT  ***************************/

const title = `${branding.brandName} ${branding.title}`;
const description = `Capitalta ofrece soluciones de crédito ágiles y transparentes para personas y empresas en México. Impulsa tu crecimiento con financiamiento a tu medida.`;

const ogCommonMetadata = {
  locale: 'es_MX',
  type: 'website',
  siteName: `${branding.brandName}`,
  images: '/assets/images/metadata/og.png' // recommended dimensions of 1200x630
};

export const mainMetadata = {
  title: {
    template: `%s | ${title}`,
    default: title // a default is required when creating a template
  },
  description,
  applicationName: title,
  keywords: ['Crédito', `${branding.brandName}`, 'Financiamiento', 'Crédito Empresarial', 'Crédito Revolvente', 'México'],
  creator: `${branding.company.name}`,
  metadataBase: new URL(process.env.NEXT_PUBLIC_METADATA_BASE || 'https://www.capitalta.mx'),
  icons: {
    icon: [{ url: '/assets/images/capitalta/logo.png', type: 'image/png' }],
    shortcut: ['/assets/images/capitalta/logo.png'],
    apple: [{ url: '/assets/images/capitalta/logo.png', type: 'image/png' }]
  },
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title,
    description,
    url: '/',
    ...ogCommonMetadata
  }
};

/***************************  SEO METADATA - PÁGINAS  ***************************/

function pagina(title, description, url) {
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, ...ogCommonMetadata } };
}

export const SEO_CONTENT = {
  openGraph: ogCommonMetadata,
  aboutPage: pagina(
    'Sobre nosotros',
    'Conoce a Capitalta (ALTA CAPITAL S.A. de C.V., SOFOM ENR): quiénes somos, nuestra misión, visión y principios.',
    '/sobre-nosotros'
  ),
  faqPage: pagina('Preguntas frecuentes', 'Resuelve las dudas más comunes sobre los créditos de Capitalta y su proceso.', '/faq'),
  contactUs: pagina('Contacto', 'Contacta a un asesor de Capitalta por correo, WhatsApp o visítanos en nuestra oficina.', '/contacto'),
  productos: pagina(
    'Productos de crédito',
    'Crédito Revolvente y Crédito Empresarial con garantía para personas y empresas en México.',
    '/productos'
  ),
  creditoRevolvente: pagina(
    'Crédito Revolvente',
    'Conoce montos, plazos, requisitos y simula tu Crédito Revolvente con Capitalta.',
    '/productos/credito-simple'
  ),
  creditoEmpresarial: pagina(
    'Crédito Empresarial',
    'Financiamiento a la medida para empresas: montos, plazos, requisitos y simulador.',
    '/productos/credito-empresarial'
  ),
  avisoPrivacidad: pagina(
    'Aviso de privacidad',
    'Aviso de privacidad de ALTA CAPITAL S.A. de C.V., SOFOM ENR (Capitalta).',
    '/aviso-de-privacidad'
  ),
  terminos: pagina('Términos y condiciones', 'Términos y condiciones de uso del sitio de Capitalta.', '/legales/terminos-y-condiciones'),
  calculadoraRevolvente: pagina(
    'Calculadora de Crédito Revolvente',
    'Simula tu pago mensual y la tabla de amortización de tu Crédito Revolvente.',
    '/calculadoras/calculadora-simple'
  ),
  calculadoraEmpresarial: pagina(
    'Calculadora de Crédito Empresarial',
    'Simula tu pago mensual y la tabla de amortización de tu Crédito Empresarial.',
    '/calculadoras/calculadora-empresarial'
  )
};
