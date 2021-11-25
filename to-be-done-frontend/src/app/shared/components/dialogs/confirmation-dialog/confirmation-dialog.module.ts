import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationDialogRoutingModule } from './confirmation-dialog-routing.module';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    ConfirmationDialogRoutingModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [ConfirmationDialogComponent],
})
export class ConfirmationDialogModule {}
