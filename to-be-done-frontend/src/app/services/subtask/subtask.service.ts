import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectDTO } from 'src/app/models/project/project.model';
import { SubtaskDTO } from 'src/app/models/subtask/subtask.module';

@Injectable({
  providedIn: 'root',
})
export class SubtaskService {
  private readonly hostname: string = 'http://localhost:3000';

  constructor(private readonly httpClient: HttpClient) {}

  public createSubtask(taskId: string, subtask: SubtaskDTO): Observable<SubtaskDTO> {
    return this.httpClient.post<SubtaskDTO>(`${this.hostname}/subtask?taskId=${taskId}`, {
      subtask,
    });
  }

  public getSubtasks(taskId: string): Observable<Array<SubtaskDTO>> {
    return this.httpClient.get<Array<SubtaskDTO>>(`${this.hostname}/subtask?tasktId=${taskId}`);
  }

  public deleteSubtask(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.hostname}/subtask/${id}`);
  }

  public editSubtask(subtask: SubtaskDTO): Observable<SubtaskDTO> {
    return this.httpClient.put<SubtaskDTO>(`${this.hostname}/subtask`, {
      subtask,
    });
  }
}