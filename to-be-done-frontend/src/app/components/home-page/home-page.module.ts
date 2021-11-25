import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CreateProjectDialogModule } from 'src/app/shared/components/dialogs/create-project-dialog/create-project-dialog.module';
import { ConfirmationDialogModule } from 'src/app/shared/components/dialogs/confirmation-dialog/confirmation-dialog.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    MatTableModule,
    MatButtonModule,
    CreateProjectDialogModule,
    ConfirmationDialogModule,
  ],
})
export class HomePageModule {}
