// @project

/***************************  DEFAULT - NAVBAR  ***************************/

export const navbar = {
  customization: false,
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
