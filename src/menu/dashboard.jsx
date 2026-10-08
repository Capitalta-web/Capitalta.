import {
  IconDashboard,
  IconFilePlus,
  IconFiles,
  IconUser,
  IconFolders,
  IconSettings,
  IconUsers,
  IconCreditCard,
  IconChartBar
} from '@tabler/icons-react';

const dashboard = {
  id: 'dashboard-group',
  title: 'Capitalta',
  type: 'group',
  children: [
    // ========== CLIENTE MENU ==========
    {
      id: 'cliente-home',
      title: 'Inicio',
      type: 'item',
      url: '/dashboard/cliente',
      icon: IconDashboard,
      roles: ['cliente']
    },
    {
      id: 'cliente-nueva',
      title: 'Nueva Solicitud',
      type: 'item',
      url: '/dashboard/cliente/nueva',
      icon: IconFilePlus,
      roles: ['cliente']
    },
    {
      id: 'cliente-solicitudes',
      title: 'Mis Solicitudes',
      type: 'item',
      url: '/dashboard/cliente/solicitudes',
      icon: IconFiles,
      roles: ['cliente']
    },
    {
      id: 'cliente-documentos',
      title: 'Documentos',
      type: 'item',
      url: '/dashboard/cliente/documentos',
      icon: IconFolders,
      roles: ['cliente']
    },
    {
      id: 'cliente-creditos',
      title: 'Mis Créditos',
      type: 'item',
      url: '/dashboard/cliente/creditos',
      icon: IconCreditCard,
      roles: ['cliente']
    },

    // ========== ADMIN MENU ==========
    {
      id: 'admin-dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/admin',
      icon: IconDashboard,
      roles: ['admin']
    },
    {
      id: 'admin-solicitudes',
      title: 'Solicitudes',
      type: 'item',
      url: '/dashboard/admin/solicitudes',
      icon: IconFiles,
      roles: ['admin']
    },
    {
      id: 'admin-usuarios',
      title: 'Gestionar Usuarios',
      type: 'item',
      url: '/dashboard/admin/usuarios',
      icon: IconUsers,
      roles: ['admin']
    },
    {
      id: 'admin-reportes',
      title: 'Reportes',
      type: 'item',
      url: '/dashboard/admin/reportes',
      icon: IconChartBar,
      roles: ['admin']
    },
    {
      id: 'admin-configuracion',
      title: 'Configuración',
      type: 'item',
      url: '/dashboard/admin/configuracion',
      icon: IconSettings,
      roles: ['admin']
    },

    // ========== SHARED ==========
    {
      id: 'profile',
      title: 'Mi Perfil',
      type: 'item',
      url: '/dashboard/profile',
      icon: IconUser,
      roles: ['cliente', 'admin']
    }
  ]
};

export default dashboard;
