import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public confirmButton: string;
  public cancelButton: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    if (this.data) {
      this.title = this.data.title;
      this.subtitle = this.data.subtitle;
      this.confirmButton = this.data.confirmButton;
      this.cancelButton = this.data.cancelButton;
    }
  }

  ngOnInit(): void {}
}
