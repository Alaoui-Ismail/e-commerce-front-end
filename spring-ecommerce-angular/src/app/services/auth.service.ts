import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }



  login(data: { email: string, password: string }): Observable<any> {
    return this.http.post("http://localhost:8888/users/login", data);
  }
}
