import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { UnAuthGuard } from './guards/unauth/unauth.guard';

const routes: Routes = [
  {
    path: `login`,
    loadChildren: () =>
      import('./components/account/login/login.module').then(
        (m) => m.LoginModule
      ),
    canActivate: [UnAuthGuard],
  },
  {
    path: `register`,
    loadChildren: () =>
      import('./components/account/register/register.module').then(
        (m) => m.RegisterModule
      ),
    canActivate: [UnAuthGuard],
  },
  {
    path: `error`,
    loadChildren: () =>
      import('./components/error-page/error-page.module').then(
        (m) => m.ErrorPageModule
      ),
  },
  {
    path: ``,
    loadChildren: () =>
      import('./components/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: `/error`,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
