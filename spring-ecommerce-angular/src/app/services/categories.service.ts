import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }


  readonly host: string = "http://localhost:8888";

  public getHost() {
    this.host;
  }
  public getRessources(url: string): Observable<any> {
    return this.http.get(this.host + url);
  }
}
