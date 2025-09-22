import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component') },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES) },
  { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./features/dashboard/dashboard.component') },
  { path: 'admin', canActivate: [authGuard, adminGuard], loadComponent: () => import('./features/admin/admin.component') },
  { path: 'p/:username', loadComponent: () => import('./features/portfolio/public-profile/public-profile.component') },
  { path: '**', redirectTo: '' }
];
