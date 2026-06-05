// @project
import branding from '@/branding.json';

export const contactUS = {
  heading: 'Hablemos de tu proyecto',
  caption: 'Estamos listos para escuchar tus necesidades y proponerte la mejor solución financiera.',
  list: [
    {
      icon: 'tabler-phone',
      title: 'Llámanos',
      content: 'Atención personalizada de Lunes a Viernes',
      link: { children: '55 1234 5678', href: 'tel:+525512345678' }
    },
    {
      icon: 'tabler-mail',
      title: 'Escríbenos',
      content: 'Envíanos tus dudas o comentarios',
      link: { children: 'contacto@capitalta.mx', href: 'mailto:contacto@capitalta.mx' }
    },
    {
      icon: 'tabler-map-pin',
      title: 'Ubicación',
      content: 'Ciudad de México, México',
      link: { children: 'Ver mapa', href: '#', target: '_blank', rel: 'noopener noreferrer' }
    }
  ]
};
