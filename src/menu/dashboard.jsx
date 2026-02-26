import { IconDashboard, IconFilePlus, IconFiles, IconUser, IconFolders, IconCalendar, IconSettings, IconUsers } from '@tabler/icons-react';

const dashboard = {
  id: 'dashboard-group',
  title: 'Capitalta',
  type: 'group',
  children: [
    // CLIENTE
    {
      id: 'cliente-home',
      title: 'Inicio',
      type: 'item',
      url: '/dashboard/cliente',
      icon: IconDashboard,
      roles: ['cliente']
    },
    {
      id: 'nueva-solicitud',
      title: 'Nueva Solicitud',
      type: 'item',
      url: '/dashboard/cliente/solicitud/nueva',
      icon: IconFilePlus,
      roles: ['cliente']
    },
    {
      id: 'mis-solicitudes',
      title: 'Mis Solicitudes',
      type: 'item',
      url: '/dashboard/cliente/solicitudes',
      icon: IconFiles,
      roles: ['cliente']
    },
    {
      id: 'mis-documentos',
      title: 'Documentos',
      type: 'item',
      url: '/dashboard/cliente/documentos',
      icon: IconFolders,
      roles: ['cliente']
    },
    {
      id: 'mis-citas',
      title: 'Agendar Cita',
      type: 'item',
      url: '/dashboard/cliente/citas',
      icon: IconCalendar,
      roles: ['cliente']
    },
    {
      id: 'mi-perfil',
      title: 'Mi Perfil',
      type: 'item',
      url: '/dashboard/profile',
      icon: IconUser,
      roles: ['cliente']
    },

    // ANALISTA
    {
      id: 'analista-home',
      title: 'Bandeja de Entrada',
      type: 'item',
      url: '/dashboard/analista',
      icon: IconDashboard,
      roles: ['analista', 'admin']
    },
    {
      id: 'analista-solicitudes',
      title: 'Solicitudes',
      type: 'item',
      url: '/dashboard/analista/solicitudes',
      icon: IconFiles,
      roles: ['analista', 'admin']
    },
    {
      id: 'analista-calendario',
      title: 'Calendario',
      type: 'item',
      url: '/dashboard/analista/calendario',
      icon: IconCalendar,
      roles: ['analista', 'admin']
    },

    // ADMIN
    {
      id: 'admin-usuarios',
      title: 'Usuarios',
      type: 'item',
      url: '/dashboard/admin/usuarios',
      icon: IconUsers,
      roles: ['admin']
    },
    {
      id: 'admin-config',
      title: 'Configuración',
      type: 'item',
      url: '/dashboard/admin/configuracion',
      icon: IconSettings,
      roles: ['admin']
    }
  ]
};

export default dashboard;
