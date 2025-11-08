import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observer } from 'rxjs';
import { AuthData } from '../../interfaces/auth/auth';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private _apiUrl: string = 'https://localhost:44362';
  constructor(private _http: HttpClient) {}

  public login(toTest: AuthData) {
    let params = new HttpParams();
    params = params.set('email', toTest.email);
    params = params.set('Password', toTest.Password);
    return this._http.get(this._apiUrl + '/login', { params });
  }
}
