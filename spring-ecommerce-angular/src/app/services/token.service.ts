import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public array : Array<any> = [];
  public arrayCart : Array<any> = [];
  public qte : number;
  public cart : Array<any> = [];



  constructor() { }


  set(data: any) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('id', data.id);
    // local storage
    if(localStorage.getItem('favorites') === null){

      localStorage.setItem('favorites', JSON.stringify(this.array));

    }
    if(localStorage.getItem('shopping') === null){

      localStorage.setItem('shopping', JSON.stringify(this.arrayCart));

    }
    if(localStorage.getItem('qte') === null){

      localStorage.setItem('qte', JSON.stringify(this.qte));

    }
    if(localStorage.getItem('cart') === null){

      localStorage.setItem('cart', JSON.stringify(this.cart));

    }


  }

  handle(data: any) {
    this.set(data);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getId() {
    return localStorage.getItem('id');
  }

  remove() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');

  }




  decode(payload: any) {
   
    return JSON.parse(atob(payload))
    
  }

  payload(token: any) {

    const payload = token.split('.')[1];
    //console.log("payload",payload);
    return this.decode(payload);
  }

  isValid() {

    const token = this.getToken();
    const id = this.getId();

    if (token) {
      const payload = this.payload(token);

      if (payload) {
        return id == payload.id;
      }
    }
    return false;

  }

  getInfos() {

    const token = this.getToken();

    if (token) {

      const payload = this.payload(token);
      return payload ? payload : null;
    }
    return null;
  }


  loggedIn() {
    return this.isValid();
  }
}
