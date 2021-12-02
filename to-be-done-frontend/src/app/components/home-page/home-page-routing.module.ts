import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: `project/:id`,
    loadChildren: () =>
      import('./project/project.module').then((m) => m.ProjectModule),
  },

  {
    path: `subtask/:id`,
    loadChildren: () =>
      import('./project/subtask/subtask.module').then((m) => m.SubtaskModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
