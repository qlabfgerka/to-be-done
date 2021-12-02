import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateSubtaskDialogComponent} from './create-subtask-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreateSubtaskDialogRoutingModule } from './create-subtask-dialog-routing.module';

@NgModule({
  declarations: [CreateSubtaskDialogComponent],
  imports: [
    CommonModule,
    CreateSubtaskDialogRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [CreateSubtaskDialogComponent],
})
export class CreateSubtaskDialogModule {}
