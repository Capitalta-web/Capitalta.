// @project
import { BUY_NOW_URL } from '@/path';

const linkProps = { target: '_blank', rel: 'noopener noreferrer' };

export const pricing = {
  heading: 'Planes de Financiamiento',
  caption: 'Elige la opción que mejor se adapte a tu estrategia de crecimiento.',
  features: [
    { id: 1, label: 'Atención personalizada' },
    { id: 2, label: 'Respuesta en 48 horas' },
    { id: 3, label: 'Sin penalización por prepago' },
    { id: 4, label: 'Tasas competitivas' },
    { id: 5, label: 'Plazos flexibles' },
    { id: 6, label: 'Asesoría financiera incluida' },
    { id: 7, label: 'Trámite 100% digital' },
    { id: 8, label: 'Renovación automática' }
  ],
  plans: [
    {
      title: 'Emprendedor',
      price: 'Desde 18%',
      active: false,
      featureTitle: 'Incluye',
      content: 'Ideal para negocios en etapa temprana.',
      exploreLink: { children: 'Solicitar ahora', href: '/auth/registro' },
      featuresID: [1, 2, 4, 5, 7]
    },
    {
      title: 'Pyme',
      active: true,
      price: 'Desde 15%',
      featureTitle: 'Recomendado',
      content: 'Para empresas en expansión consolidada.',
      exploreLink: { children: 'Solicitar ahora', href: '/auth/registro' },
      featuresID: [1, 2, 3, 4, 5, 6, 7]
    },
    {
      title: 'Corporativo',
      price: 'A medida',
      active: false,
      featureTitle: 'Incluye',
      content: 'Soluciones estructuradas de alto volumen.',
      link: { children: 'Contactar asesor', href: '/contacto', sx: { textTransform: 'none' } },
      exploreLink: { children: 'Cotizar', href: '/contacto' },
      featuresID: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  ]
};
