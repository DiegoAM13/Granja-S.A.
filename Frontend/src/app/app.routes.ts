import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  { 
    path: 'porcinos', 
    loadComponent: () => import('./components/porcinos/porcinos.component').then(m => m.PorcinosComponent)
  },
  { 
    path: 'clientes', 
    loadComponent: () => import('./components/clientes/clientes.component').then(m => m.ClientesComponent)
  },
  { 
    path: 'alimentacion', 
    loadComponent: () => import('./components/alimentacion/alimentacion.component').then(m => m.AlimentacionComponent)
  },
  { 
    path: 'reportes', 
    loadComponent: () => import('./components/reportes/reportes.component').then(m => m.ReportesComponent)
  },
  { path: '**', redirectTo: '/dashboard' }
];
