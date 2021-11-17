import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: `login`,
    loadChildren: () =>
      import('./components/account/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: `register`,
    loadChildren: () =>
      import('./components/account/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: ``,
    loadChildren: () =>
      import('./components/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
