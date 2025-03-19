import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-home' },
    badge: {
      color: 'info',
      text: 'HOME'
    }
  },
  {
    title: true,
    name: 'Menu A'
  },
  {
    name: 'Add Employee',
    url: '/add-employee',
    iconComponent: { name: 'cil-user-follow' }
  },
  {
    name: 'Post Job',
    url: '/post-job',
    //linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Payroll Management',
    url: '/payroll-management',
    //linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-dollar' }
  },
  {
    name: 'Menu B',
    title: true
  },
  {
    name: 'Requests',
    url: '/requests',
    //linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-List' },
  },
  {
    name: 'Leave Management',
    url: '/leave-management',
    //linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-layers' },
  },
  {
    name: 'Applied Vacancies',
    url: '/vacancy-applications',
    //linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-spreadsheet' },
  },

  {
    title: true,
    name: 'Menu C'
  },
  {
    name: 'Add Users',
    url: '/add-users',
    //linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-User' },
  },
  {
    name: 'Logout',
    url: '/register',
    //linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-chevron-left' },
  }
];
