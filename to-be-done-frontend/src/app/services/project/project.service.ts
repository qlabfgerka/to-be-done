import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectDTO } from 'src/app/models/project/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly hostname: string = 'http://localhost:3000';

  constructor(private readonly httpClient: HttpClient) {}

  public createProject(project: ProjectDTO): Observable<ProjectDTO> {
    return this.httpClient.post<ProjectDTO>(`${this.hostname}/project`, {
      project,
    });
  }

  public getProjects(): Observable<Array<ProjectDTO>> {
    return this.httpClient.get<Array<ProjectDTO>>(`${this.hostname}/project`);
  }

  public getProject(id: string): Observable<ProjectDTO> {
    return this.httpClient.get<ProjectDTO>(`${this.hostname}/project/${id}`);
  }

  public deleteProject(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.hostname}/project/${id}`);
  }

  public editProject(project: ProjectDTO): Observable<ProjectDTO> {
    return this.httpClient.put<ProjectDTO>(`${this.hostname}/project`, {
      project,
    });
  }
}
