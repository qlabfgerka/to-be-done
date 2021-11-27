import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectDTO } from 'src/app/models/project/project.model';
import { TaskDTO } from 'src/app/models/task/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly hostname: string = 'http://localhost:3000';

  constructor(private readonly httpClient: HttpClient) {}

  public createTask(projectId: string, task: TaskDTO): Observable<TaskDTO> {
    return this.httpClient.post<TaskDTO>(`${this.hostname}/task?projectId=${projectId}`, {
      task,
    });
  }

  public getTasks(projectId: string): Observable<Array<TaskDTO>> {
    return this.httpClient.get<Array<TaskDTO>>(`${this.hostname}/task?projectId=${projectId}`);
  }

  public deleteTask(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.hostname}/task/${id}`);
  }

  public editTask(task: TaskDTO): Observable<TaskDTO> {
    return this.httpClient.put<TaskDTO>(`${this.hostname}/task`, {
      task,
    });
  }
}
