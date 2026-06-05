// @project

/***************************  DEFAULT - NAVBAR  ***************************/

export const navbar = {
  customization: false,
  secondaryBtn: { children: 'Iniciar sesión', href: '/auth/login' },
  primaryBtn: { children: 'Solicitar crédito', href: '/auth/registro' },
  animated: true,
  navItems: [
    { id: 'home', title: 'Inicio', link: '/' },
    { id: 'productos', title: 'Productos', link: '/productos' },
    { id: 'sobre-nosotros', title: 'Sobre nosotros', link: '/sobre-nosotros' },
    { id: 'blog', title: 'Blog', link: '/blog' },
    { id: 'contacto', title: 'Contacto', link: '/contacto' }
  ]
};
