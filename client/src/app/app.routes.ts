import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { authGuard } from './auth.guard';

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
        path: 'home',
        loadComponent: () => import('./views/pages/home/home.component').then(m => m.HomeComponent),
        data: {
          title: 'Home'
        }
      },
      // {
      //   path: 'login',
      //   loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
      //   data: {
      //     title: 'Login'
      //   }
      // },
      {
        path: 'view-employee-profile',
        loadComponent: () => import('./views/pages/view-employee-profile/view-employee-profile.component').then(m => m.ViewEmployeeProfileComponent),
        data: {
          title: 'View Profile'
        }
      },
      {
        path: 'view-job',
        loadComponent: () => import('./views/pages/view-job/view-job.component').then(m => m.ViewJobComponent),
        data: {
          title: 'View Jobs'
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
        path: 'create-request',
        loadComponent: () => import('./views/pages/create-request/create-request.component').then(m => m.CreateRequestComponent),
        data: {
          title: 'Create A Request'
        }
      },
      {
        path: 'user-details',
        loadComponent: () => import('./views/pages/user-details/user-details.component').then(m => m.UserDetailsComponent),
        data: {
          title: 'User Details'
        }
      },
      {
        path: 'applied-jobs',
        loadComponent: () => import('./views/pages/applied-jobs/applied-jobs.component').then(m => m.AppliedJobsComponent),
        data: {
          title: 'Applied Jobs'
        }
      },
      {
        path: 'add-employee',
        loadComponent: () => import('./views/pages/add-employee/add-employee.component').then(m => m.AddEmployeeComponent),
        data: {
          title: 'Update Profile'
        }
      },
      {
        path: 'leave',
        loadComponent: () => import('./views/pages/leave/leave.component').then(m => m.LeaveComponent),
        data: {
          title: 'Leave'
        }
      },
      {
        path: 'job-details/:id',
        loadComponent: () => import('./views/pages/job-details/job-details.component').then(m => m.JobDetailsComponent),
        data: {
          title: 'Job Details'
        }
      },
    ]
  },
  { path: '**', redirectTo: 'register' }
];
