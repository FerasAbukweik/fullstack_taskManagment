import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addUserDTO } from '../../interfaces/user/user';


@Injectable({
  providedIn: 'root',
})
export class UsersServices {
  private _apiUrl = 'https://localhost:44362/api/Users';
  constructor(private _http: HttpClient) {}

  public add(toAdd: addUserDTO) {
    return this._http.post(this._apiUrl + '/add', {
      userName: toAdd.userName,
      email: toAdd.email,
      phoneNumber: toAdd.phoneNumber,
      password: toAdd.password,
    });
  }

  public delete(toDelId: number) {
    let params = new HttpParams();
    params = params.set('userId', toDelId);
    return this._http.delete(this._apiUrl + '/delete', { params });
  }
}
