import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private securityService: SecurityService
  ) {}

  public login(paramsData: any): Observable<any> {
    let url = `${environment.apiUrl}login`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers };

    return this.http.post<ApiResponse>(url, paramsData, options);
  }

  public olvidoClave(paramsData: any): Observable<any> {
    let url = `${environment.apiUrl}user/olvido-clave`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers };

    return this.http.post<any>(url, paramsData, options);
  }

  /*  public getToken(): string | null {
    for (let i = 0; i < localStorage.length; i++) {
      if (
        localStorage.key(i).endsWith(environment.ACCESS_TOKEN) &&
        localStorage.key(i).includes(environment.CLIENT_ID)
      ) {
        return localStorage.getItem(localStorage.key(i));
      }
    }
    return null;
  } */
}
