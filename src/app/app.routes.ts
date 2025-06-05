import { Routes } from '@angular/router';

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
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },


  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then( m => m.RegistroPage)
  },

  {
  path: 'perfil',
  loadComponent: () => import('./perfil/perfil.component').then(m => m.PerfilComponent)
}

];