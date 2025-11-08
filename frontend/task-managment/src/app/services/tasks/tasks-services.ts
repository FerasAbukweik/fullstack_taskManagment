import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddTaskDTO } from '../../interfaces/task/add-task-dto';
import { updateTaskDTO } from '../../interfaces/task/update-task-dto';
import { updateDescriptionData } from '../../interfaces/task/update-description-data';

@Injectable({
  providedIn: 'root',
})
export class TasksServices {
  private _apiUrl: string = 'https://localhost:44362/api/TasksController';
  constructor(private _http: HttpClient) {}

  public add(toAdd: AddTaskDTO) {
    return this._http.post(this._apiUrl + '/add', {
      title: toAdd.title,
      description: toAdd.description,
      goalDate: toAdd.GoalDate,
      projectId: toAdd.projectId,
    });
  }

  public update(updateData: updateTaskDTO) {
    return this._http.put(this._apiUrl + '/update', {
      taskId: updateData.taskId,
      title: updateData.title,
      goalDate: updateData.GoalDate,
      projectId : updateData.projectId
    });
  }

  public delete(toDelId: number) {
    let params = new HttpParams();
    params = params.set('toDelTaskId', toDelId);
    return this._http.delete(this._apiUrl + '/delete', { params });
  }

  public updateDescription(newData: updateDescriptionData) {
    return this._http.put(this._apiUrl + '/updateDescription', {
      id: newData.taskId,
      newDescription: newData.newDescription,
    });
  }
}
