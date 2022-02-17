import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateInfoService {

  readonly host = "http://localhost:8888/users/update/"

  constructor(private _http :HttpClient) { }


    updateinfo(data: {customerCity:any,customerPhone:any}, id:string):Observable<any>{
        return this._http.put("http://localhost:8888/users/update/"+id,data);
    }

}
