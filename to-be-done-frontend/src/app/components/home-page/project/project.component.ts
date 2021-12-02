import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { mergeMap, take } from 'rxjs/operators';
import { ProjectDTO } from 'src/app/models/project/project.model';
import { ProjectService } from 'src/app/services/project/project.service';
import { TaskService } from 'src/app/services/task/task.service';
import { TaskDTO } from 'src/app/models/task/task.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { CreateTaskDialogComponent } from 'src/app/shared/components/dialogs/create-task-dialog/create-task-dialog.component';
import { UserDTO } from 'src/app/models/user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  public displayedColumns: string[] = [
    'title',
    'description',
    'owner',
    'completed',
    'dueDate',
    'enter',
    'edit',
    'delete',
  ];
  public dataSource: MatTableDataSource<TaskDTO>;
  public tasks: Array<TaskDTO>;
  public project: ProjectDTO;

  constructor(
    private readonly dialog: MatDialog,
    private readonly route: ActivatedRoute,
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.refreshProject();
  }

  public createTask(): void {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent);

    dialogRef.afterClosed().subscribe((task: TaskDTO) => {
      if (task) {
        this.taskService
          .createTask(this.project.id, task)
          .pipe(take(1))
          .subscribe((task: TaskDTO) => {
            this.tasks.push(task);
            this.dataSource = new MatTableDataSource(this.tasks);
          });
      }
    });
  }

  public editTask(task: TaskDTO): void {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      data: {
        task,
      },
    });

    

    dialogRef.afterClosed().subscribe((task: TaskDTO) => {
      if (task) {
        this.taskService
          .editTask(task)
          .pipe(take(1))
          .subscribe((task: TaskDTO) => {
            const index = this.tasks.indexOf(
              this.tasks.find((p) => p.id === task.id)
            );

            if (index > -1) {
              this.tasks[index] = task;
              this.dataSource = new MatTableDataSource(this.tasks);
            }
          });
      }
    });
  }

  public enterTask(id: string): void {

    //this.router.navigate([`project/${this.project.id}/subtask/${id}`]);

    //console.log(this.project.id + " " +id);

    this.router.navigate([`/subtask/${id}`]);
  }

  public deleteTask(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: `Remove task`,
        subtitle: `Are you sure you want to remove this task? Removing it will also delete all subtasks inside`,
        confirmButton: `REMOVE`,
        cancelButton: `CANCEL`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'REMOVE') {
        this.taskService
          .deleteTask(id)
          .pipe(take(1))
          .subscribe(() => {
            const index = this.tasks.indexOf(
              this.tasks.find((task) => task.id === id)
            );

            if (index > -1) {
              this.tasks.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.tasks);
            }
          });
      }
    });
  }

  private refreshProject(): void {
    this.route.paramMap
      .pipe(
        take(1),
        mergeMap((paramMap) =>
          this.projectService.getProject(paramMap.get('id'))
        )
      )
      .subscribe((project: ProjectDTO) => {
        this.tasks = project.tasks;
        this.dataSource = new MatTableDataSource(project.tasks);
        this.project = project;
      });
  }
}
