import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateProjectDialogRoutingModule } from './create-project-dialog-routing.module';
import { CreateProjectDialogComponent } from './create-project-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CreateProjectDialogComponent],
  imports: [
    CommonModule,
    CreateProjectDialogRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [CreateProjectDialogComponent],
})
export class CreateProjectDialogModule {}
