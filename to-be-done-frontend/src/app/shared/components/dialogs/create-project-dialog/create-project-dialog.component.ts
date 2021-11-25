import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectDTO } from 'src/app/models/project/project.model';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.scss'],
})
export class CreateProjectDialogComponent implements OnInit {
  public projectForm: FormGroup;
  public project: ProjectDTO;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.project) this.project = this.data.project;

    this.projectForm = this.formBuilder.group({
      title: [this.project ? this.project.title : '', [Validators.required]],
      description: [
        this.project ? this.project.description : '',
        [Validators.required],
      ],
    });
  }

  public createProject(): void {
    if (this.projectForm.valid) {
      const project: ProjectDTO = {
        description: this.projectForm.get('description').value,
        title: this.projectForm.get('title').value,
        id: this.project && this.project.id ? this.project.id : null,
      };

      this.dialogRef.close(project);
    }
  }

  public editProject(): void {}

  public get errorControl() {
    return this.projectForm.controls;
  }
}
