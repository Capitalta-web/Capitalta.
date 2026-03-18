// @project

/***************************  DEFAULT - NAVBAR  ***************************/

export const navbar = {
  customization: false,
  whatsappBtn: {
    children: '',
    href: 'https://wa.me/525652016445?text=Hola%20Capitalta%2C%20quiero%20informaci%C3%B3n%20sobre%20un%20cr%C3%A9dito.',
    target: '_blank',
    sx: { minWidth: 40, width: 40, px: 0 }
  },
  secondaryBtn: { children: 'Brokers', href: '/brokers' },
  primaryBtn: { children: 'Solicitar crédito', href: '/auth/registro' },
  animated: true,
  navItems: [
    { id: 'home', title: 'Inicio', link: '/' },
    { id: 'productos', title: 'Productos', link: '/productos' },
    { id: 'sobre-nosotros', title: 'Sobre nosotros', link: '/sobre-nosotros' },
    { id: 'contacto', title: 'Contacto', link: '/contacto' }
  ]
};
