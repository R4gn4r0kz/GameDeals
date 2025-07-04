import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'registro',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'info-adicional',
    loadComponent: () =>
      import('./info-adicional/info-adicional.component').then((m) => m.InfoAdicionalComponent),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
    canActivate: [authGuard]  // 🔐 protegida
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then(m => m.RegistroPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.component').then(m => m.PerfilComponent)
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contacto/contacto.page').then(m => m.ContactoPage)
  },


  {
    path: 'not-found',
    loadComponent: () => import('./pages/not-found/not-found.page').then(m => m.NotFoundPage)
  },
  // ---> ESTA ES LA RUTA COMODÍN PARA 404, SIEMPRE AL FINAL <---
  {
    path: '**',
    redirectTo: 'not-found'
  },






];