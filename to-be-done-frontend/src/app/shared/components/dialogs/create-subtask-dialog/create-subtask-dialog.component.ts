import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubtaskDTO } from 'src/app/models/subtask/subtask.module';
import { TaskDTO } from 'src/app/models/task/task.model';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';

@Component({
  selector: 'app-create-subtask-dialog',
  templateUrl: './create-subtask-dialog.component.html',
  styleUrls: ['./create-subtask-dialog.component.scss'],
})
export class CreateSubtaskDialogComponent implements OnInit {
  public subtaskForm: FormGroup;
  public subtask: SubtaskDTO;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<CreateSubtaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.subtask) this.subtask = this.data.subtask;

    this.subtaskForm = this.formBuilder.group({
      title: [this.subtask ? this.subtask.title : '', [Validators.required]],
      description: [
        this.subtask ? this.subtask.description : '',
        [Validators.required],
      ],
      deadline: [
        this.subtask ? this.subtask.dueDate : '',
        [Validators.required],
      ],
    });
  }

  public createSubtask(): void {
    console.log('mela');

    if (this.subtaskForm.valid) {
      const subtask: SubtaskDTO = {
        description: this.subtaskForm.get('description').value,
        title: this.subtaskForm.get('title').value,
        id: this.subtask && this.subtask.id ? this.subtask.id : null,
        completed: false,
        dueDate: this.subtaskForm.get('deadline').value,
      };

      this.dialogRef.close(subtask);
    }
  }

  public editSubtask(): void {}

  public get errorControl() {
    return this.subtaskForm.controls;
  }
}
