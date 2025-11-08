import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddProjectDTO } from '../../interfaces/project/add-project-dto';

@Injectable({
  providedIn: 'root',
})
export class ProjectsServices {
  private _apiUrl: string = 'https://localhost:44362/api/Projects';
  constructor(private _http: HttpClient) {}

  public getFullProjects() {
    return this._http.get(this._apiUrl + '/getFullProjects');
  }

  public add(toAddData: AddProjectDTO) {
    return this._http.post(this._apiUrl + '/add', {
      name: toAddData.name,
      color: toAddData.color,
    });
  }

  public delete(toDelId: number) {
    let params = new HttpParams();
    params = params.set('toDelId', toDelId);
    return this._http.delete(this._apiUrl + '/delete', { params });
  }
}
