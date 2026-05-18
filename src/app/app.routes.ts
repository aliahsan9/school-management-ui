import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';

import { authGuard } from './core/guards/auth.guard';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { TeacherComponent } from './features/teachers/teacher/teacher.component';
import { StudentComponent } from './features/students/student/student.component';
import { ClassComponent } from './features/classes/class/class.component';
import { SubjectComponent } from './features/subjects/subject/subject.component';
import { AttendanceComponent } from './features/attendance/attendance/attendance.component';
import { FeeComponent } from './features/fees/fee/fee.component';

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
    // canActivate: [authGuard]
  },
  {
    path: 'teachers',
    component: TeacherComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'students',
    component: StudentComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'classes',
    component: ClassComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'subjects',
    component: SubjectComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'attendance',
    component: AttendanceComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'fees',
    component: FeeComponent,
    // canActivate: [authGuard]
  },
  // Wildcard Route
  {
    path: '**',
    redirectTo: 'login'
  }
]; 