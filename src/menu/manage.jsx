// @project
import { AuthRole } from '@/enum';

/***************************  MENU ITEMS - APPLICATIONS  ***************************/

const manage = {
  id: 'group-manage',
  title: 'manage',
  icon: 'IconBrandAsana',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'dashboard',
      type: 'item',
      url: '/dashboard/analytics/overview',
      icon: 'IconLayoutGrid'
    },
    {
      id: 'account',
      title: 'account',
      type: 'item',
      url: '/account',
      icon: 'IconUserCog',
      roles: [AuthRole.SUPER_ADMIN]
    },
    {
      id: 'user',
      title: 'user',
      type: 'item',
      url: '/user',
      icon: 'IconUsers'
    },
    // {
    //   id: 'role-permission',
    //   title: "roles-permissions",
    //   type: 'item',
    //   url: '/role-permission',
    //   icon: 'IconChartHistogram',
    //   roles: [AuthRole.SUPER_ADMIN]
    // },
    {
      id: 'billing',
      title: 'billing',
      type: 'item',
      url: '/billing',
      icon: 'IconFileInvoice'
    },
    {
      id: 'blog',
      title: 'blog',
      type: 'item',
      url: '/blog',
      icon: 'IconBrandBlogger'
    },
    {
      id: 'setting',
      title: 'setting',
      type: 'item',
      url: '/setting',
      icon: 'IconSettings',
      roles: [AuthRole.SUPER_ADMIN, AuthRole.ADMIN]
    }
  ]
};

export default manage;
