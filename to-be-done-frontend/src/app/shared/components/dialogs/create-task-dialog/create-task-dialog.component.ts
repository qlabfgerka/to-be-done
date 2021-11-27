import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskDTO } from 'src/app/models/task/task.model';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss'],
})
export class CreateTaskDialogComponent implements OnInit {
  public taskForm: FormGroup;
  public task: TaskDTO;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.task) this.task = this.data.task;

    this.taskForm = this.formBuilder.group({
      title: [this.task ? this.task.title : '', [Validators.required]],
      description: [
        this.task ? this.task.description : '',
        [Validators.required],
      ],
    });
  }

  public createTask(): void {
    if (this.taskForm.valid) {
      const task: TaskDTO = {
        description: this.taskForm.get('description').value,
        title: this.taskForm.get('title').value,
        id: this.task && this.task.id ? this.task.id : null,
        completed: false,
        dueDate: new Date()
      };

      this.dialogRef.close(task);
    }
  }

  public edittask(): void {}

  public get errorControl() {
    return this.taskForm.controls;
  }
}
