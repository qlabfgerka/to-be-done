import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project.component';

//TODO: močnik je peder ker mi ni nastavo routinga
//const routes: Routes = [{ path: '', component: ProjectComponent }];

const routes: Routes = [
  { path: '', component: ProjectComponent },
  {
    path: `/subtask/:id`,
    loadChildren: () =>
      import('./subtask/subtask.module').then((m) => m.SubtaskModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
