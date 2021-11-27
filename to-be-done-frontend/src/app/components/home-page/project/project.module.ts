import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogModule } from 'src/app/shared/components/dialogs/confirmation-dialog/confirmation-dialog.module';
import { CreateTaskDialogModule } from 'src/app/shared/components/dialogs/create-task-dialog/create-task-dialog.module';


@NgModule({
  declarations: [
    ProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MatTableModule,
    MatButtonModule,
    CreateTaskDialogModule,
    ConfirmationDialogModule
  ]
})
export class ProjectModule { }
