import { CONTACTO } from '@/data/datosNegocio';

export const contactUS = {
  heading: 'Hablemos de tu proyecto',
  caption: 'Estamos listos para escuchar tus necesidades y proponerte la mejor solución financiera.',
  list: [
    // TODO(Alberto): confirmar el 800 (CONTACTO.telefono800 en src/data/datosNegocio.js). Oculto mientras tanto.
    ...(CONTACTO.telefono800.mostrar
      ? [
          {
            icon: 'tabler-phone',
            title: 'Llámanos',
            content: 'Atención personalizada de lunes a viernes',
            link: { children: CONTACTO.telefono800.numero, href: `tel:${CONTACTO.telefono800.tel}` }
          }
        ]
      : []),
    {
      icon: 'tabler-device-mobile',
      title: 'Móvil / WhatsApp',
      content: 'Contáctanos directamente',
      link: {
        children: 'Abrir WhatsApp',
        href: 'https://wa.me/525594897309?text=Hola%20Capitalta%2C%20quiero%20informaci%C3%B3n%20sobre%20un%20cr%C3%A9dito.',
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    },
    {
      icon: 'tabler-device-mobile',
      title: 'Móvil / WhatsApp',
      content: 'Soporte adicional',
      link: {
        children: 'Abrir WhatsApp',
        href: 'https://wa.me/525652016445?text=Hola%20Capitalta%2C%20quiero%20informaci%C3%B3n%20sobre%20un%20cr%C3%A9dito.',
        target: '_blank',
        rel: 'noopener noreferrer'
      }
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
      content: 'Circuito Circunvalación Poniente 16, Local V - W, Ciudad Satélite, Naucalpan Estado de México, C.P. 53310',
      link: {
        children: 'Ver mapa',
        href: 'https://maps.google.com/?q=Circuito+Circunvalación+Poniente+16,+Naucalpan',
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    }
  ]
};
