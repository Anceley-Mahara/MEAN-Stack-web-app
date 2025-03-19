import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/home',
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
    name: 'Update Profile',
    url: '/add-employee',
    iconComponent: { name: 'cil-user-follow' }
  },
  {
    name: 'Vacancies',
    url: '/view-job',
    //linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Payslips',
    url: '/payroll-management',
    //linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-dollar' }
  },
  {
    name: 'Menu B',
    title: true
  },
  {
    name: 'Create A Request',
    url: '/create-request',
    //linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-List' },
  },
  {
    name: 'Apply Leave',
    url: '/leave',
    //linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-layers' },
  },
  {
    name: 'Applied Jobs',
    url: '/applied-jobs',
    //linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-spreadsheet' },
  },

  {
    title: true,
    name: 'Menu C'
  },
  {
    name: 'User Details',
    url: '/user-details',
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
