import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';

import { StudentListComponent } from './features/students/student-list/student-list.component';

import { authGuard } from './core/guards/auth.guard';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [

  // Default Route
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // Auth Routes
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },

  // Protected Routes
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [authGuard]
  },
  {
    path: 'students',
    component: StudentListComponent,
    canActivate: [authGuard]
  },

  // Wildcard Route
  {
    path: '**',
    redirectTo: 'login'
  }
];