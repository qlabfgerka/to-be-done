import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, take } from 'rxjs/operators';
import { ProjectDTO } from 'src/app/models/project/project.model';
import { SubtaskDTO } from 'src/app/models/subtask/subtask.module';
import { TaskDTO } from 'src/app/models/task/task.model';
import { ProjectService } from 'src/app/services/project/project.service';
import { SubtaskService } from 'src/app/services/subtask/subtask.service';
import { TaskService } from 'src/app/services/task/task.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { CreateProjectDialogComponent } from 'src/app/shared/components/dialogs/create-project-dialog/create-project-dialog.component';
import { CreateSubtaskDialogComponent } from 'src/app/shared/components/dialogs/create-subtask-dialog/create-subtask-dialog.component';
import { CreateTaskDialogComponent } from 'src/app/shared/components/dialogs/create-task-dialog/create-task-dialog.component';


@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.scss']
})
export class SubtaskComponent implements OnInit {

  public displayedColumns: string[] = [
    'title',
    'description',
    'owner',
    'completed',
    'dueDate',
    'edit',
    'delete',
  ];

  public dataSource: MatTableDataSource<SubtaskDTO>;
  public subtasks: Array<SubtaskDTO>;
  //public project: ProjectDTO;
  public task: TaskDTO;

  constructor(
    private readonly dialog: MatDialog,
    private readonly route: ActivatedRoute,
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService,
    private readonly router: Router,
    private readonly subtaskService: SubtaskService
  ) {}

  ngOnInit(): void {
    this.refreshTask();
  }

  private refreshTask(): void {
    this.route.paramMap
      .pipe(
        take(1),
        mergeMap((paramMap) =>
          this.taskService.getTask(paramMap.get('id'))
        )
      )
      .subscribe((task: TaskDTO) => {
        this.subtasks = task.subtasks;
        this.dataSource = new MatTableDataSource(task.subtasks);
        this.task = task;
        console.log(task);
      });
  }


  public createSubtask(): void {
    const dialogRef = this.dialog.open(CreateSubtaskDialogComponent);

    dialogRef.afterClosed().subscribe((subtask: SubtaskDTO) => {
      console.log(this.task.id + " " + subtask);
      if (subtask) {
        this.subtaskService
          .createSubtask(this.task.id, subtask)
          .pipe(take(1))
          .subscribe((subtask: SubtaskDTO) => {
            this.subtasks.push(subtask);
            this.dataSource = new MatTableDataSource(this.subtasks);
          }
          );
      }
    });
  }


  public editSubtask(subtask: SubtaskDTO): void {
    const dialogRef = this.dialog.open(CreateSubtaskDialogComponent, {
      data: {
        subtask,
      },
    });

    

    dialogRef.afterClosed().subscribe((subtask: SubtaskDTO) => {
      if (subtask) {
        this.subtaskService
          .editSubtask(subtask)
          .pipe(take(1))
          .subscribe((subtask: SubtaskDTO) => {
            const index = this.subtasks.indexOf(
              this.subtasks.find((p) => p.id === subtask.id)
            );
            console.log("subtask:", subtask);

            if (index > -1) {
              this.subtasks[index] = subtask;
              this.dataSource = new MatTableDataSource(this.subtasks);
            }
          });
      }
    });
  }


  public deleteSubtask(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: `Remove subtask`,
        subtitle: `Are you sure you want to remove this subtask? Removing it will also delete all subtasks inside`,
        confirmButton: `REMOVE`,
        cancelButton: `CANCEL`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'REMOVE') {
        this.subtaskService
          .deleteSubtask(id)
          .pipe(take(1))
          .subscribe(() => {
            const index = this.subtasks.indexOf(
              this.subtasks.find(subtask => subtask.id === id)
            );

            if (index > -1) {
              this.subtasks.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.subtasks);
            }
          });
      }
    });
  }

  
}
