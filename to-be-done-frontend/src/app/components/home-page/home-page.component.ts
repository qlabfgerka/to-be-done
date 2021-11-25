import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ProjectDTO } from 'src/app/models/project/project.model';
import { ProjectService } from 'src/app/services/project/project.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { CreateProjectDialogComponent } from 'src/app/shared/components/dialogs/create-project-dialog/create-project-dialog.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public displayedColumns: string[] = [
    'title',
    'description',
    'owner',
    'enter',
    'edit',
    'delete',
  ];
  public dataSource: MatTableDataSource<ProjectDTO>;
  public projects: Array<ProjectDTO>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.refreshProjects();
  }

  public createProject(): void {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent);

    dialogRef.afterClosed().subscribe((project: ProjectDTO) => {
      if (project) {
        this.projectService
          .createProject(project)
          .pipe(take(1))
          .subscribe((project: ProjectDTO) => {
            this.projects.push(project);
            this.dataSource = new MatTableDataSource(this.projects);
          });
      }
    });
  }

  public enterProject(id: string): void {
    this.router.navigate([`/project/${id}`]);
  }

  public deleteProject(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: `Remove project`,
        subtitle: `Are you sure you want to remove this project? Removing it will also delete all lists and tasks inside`,
        confirmButton: `REMOVE`,
        cancelButton: `CANCEL`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'REMOVE') {
        this.projectService
          .deleteProject(id)
          .pipe(take(1))
          .subscribe(() => {
            const index = this.projects.indexOf(
              this.projects.find((project) => project.id === id)
            );

            if (index > -1) {
              this.projects.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.projects);
            }
          });
      }
    });
  }

  public editProject(project: ProjectDTO): void {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent, {
      data: {
        project,
      },
    });

    dialogRef.afterClosed().subscribe((project: ProjectDTO) => {
      if (project) {
        this.projectService
          .editProject(project)
          .pipe(take(1))
          .subscribe((project: ProjectDTO) => {
            const index = this.projects.indexOf(
              this.projects.find((p) => p.id === project.id)
            );

            if (index > -1) {
              this.projects[index] = project;
              this.dataSource = new MatTableDataSource(this.projects);
            }
          });
      }
    });
  }

  private refreshProjects(): void {
    this.projectService
      .getProjects()
      .pipe(take(1))
      .subscribe((projects: Array<ProjectDTO>) => {
        this.projects = projects;
        this.dataSource = new MatTableDataSource(projects);
      });
  }
}
