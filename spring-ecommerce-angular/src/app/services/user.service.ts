import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public host : String = "http://localhost:8888"



  constructor(private http:HttpClient) { }



  public getRessources(url:string){

    return this.http.get(this.host+url);

  }
}
