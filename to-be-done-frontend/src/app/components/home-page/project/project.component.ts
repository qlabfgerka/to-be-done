import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, take } from 'rxjs/operators';
import { ProjectDTO } from 'src/app/models/project/project.model';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.refreshProject();
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
        console.log(project);
      });
  }
}
