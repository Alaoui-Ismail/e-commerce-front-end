import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  readonly rootUrl = 'http://localhost:8888/users/signUp';


  constructor(private http: HttpClient) {


  }

  registerUser(user: User) : Observable<User>{

      const body : User = {
        firstname : user.firstname,
        lastname : user.lastname,
        email : user.email,
        password : user.password
      }

      return this.http.post<User>(this.rootUrl,body);
  }
}
