import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateTaskDialogRoutingModule as CreateTaskDialogRoutingModule } from './create-task-dialog-routing.module';
import { CreateTaskDialogComponent as CreateTaskDialogComponent } from './create-task-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [CreateTaskDialogComponent],
  imports: [
    CommonModule,
    CreateTaskDialogRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [CreateTaskDialogComponent],
})
export class CreateTaskDialogModule {}
