import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Menu'
    },
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./views/dashboard/dashboard.component').then(m => m.DashboardComponent),
        data: {
          title: 'Home'
        }
      },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login'
    }
  },
  {
    path: 'add-employee',
    loadComponent: () => import('./views/pages/add-employee/add-employee.component').then(m => m.AddEmployeeComponent),
    data: {
      title: 'Onboard New Employee'
    }
  },
  {
    path: 'post-job',
    loadComponent: () => import('./views/pages/post-job/post-job.component').then(m => m.PostJobComponent),
    data: {
      title: 'Post A Job'
    }
  },
  {
    path: 'payroll-management',
    loadComponent: () => import('./views/pages/payroll-management/payroll-management.component').then(m => m.PayrollManagementComponent),
    data: {
      title: 'Payroll Management'
    }
  },
  {
    path: 'requests',
    loadComponent: () => import('./views/pages/requests/requests.component').then(m => m.RequestsComponent),
    data: {
      title: 'Requests'
    }
  },
  {
    path: 'add-users',
    loadComponent: () => import('./views/pages/add-users/add-users.component').then(m => m.AddUsersComponent),
    data: {
      title: 'Add New Users'
    }
  },
  {
    path: 'vacancy-applications',
    loadComponent: () => import('./views/pages/vacancy-applications/vacancy-applications.component').then(m => m.VacancyApplicationsComponent),
    data: {
      title: 'Vacancy Applications'
    }
  },
  {
    path: 'leave-management',
    loadComponent: () => import('./views/pages/leave-management/leave-management.component').then(m => m.LeaveManagementComponent),
    data: {
      title: 'Leave Management'
    }
  },
  {
    path: 'request-details/:id',
    loadComponent: () => import('./views/pages/request-details/request-details.component').then(m => m.RequestDetailsComponent),
    data: {
      title: 'Request Details'
    }
  },
  {
    path: 'applicant-details/:id',
    loadComponent: () => import('./views/pages/applicant-details/applicant-details.component').then(m => m.ApplicantDetailsComponent),
    data: {
      title: 'Applicant Details'
    }
  },
]
},
  { path: '**', redirectTo: 'register' }
];
