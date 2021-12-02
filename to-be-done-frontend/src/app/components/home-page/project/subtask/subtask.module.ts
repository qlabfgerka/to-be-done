import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubtaskRoutingModule } from './subtask-routing.module';
import { SubtaskComponent } from './subtask.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogModule } from 'src/app/shared/components/dialogs/confirmation-dialog/confirmation-dialog.module';
import { CreateTaskDialogModule } from 'src/app/shared/components/dialogs/create-task-dialog/create-task-dialog.module';
import { CreateSubtaskDialogModule } from 'src/app/shared/components/dialogs/create-subtask-dialog/create-subtask-dialog.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SubtaskRoutingModule,
    MatTableModule,
    MatButtonModule,
    CreateSubtaskDialogModule,
    ConfirmationDialogModule    
  ]
})
export class SubtaskModule { }
