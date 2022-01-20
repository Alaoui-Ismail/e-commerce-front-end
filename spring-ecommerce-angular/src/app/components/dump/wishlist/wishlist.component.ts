import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  
  public wishlist :  Array<any> = [];

  constructor(public articleService:ArticlesService) { }

  ngOnInit(): void {
    console.log("show wishlist ...");

        this.getData().then((res) => {
          console.log(res);
        }).catch((error) => {
          console.log(error);
        });
  }

  public getData() {
  ///TODO : wish list refresh
   return new Promise((resolve,reject) => {
    let status = true;

    if (status) {

        return resolve( this.wishlist = JSON.parse(localStorage.getItem('favorites')))
    }else {
      return reject("list not found");
    }
   })
    
  
  }

  
  removeItem(item) {


    this.wishlist.forEach((value, index) => {
      if (value == item) this.wishlist.splice(index, 1);
    });
   
    localStorage.setItem('favorites', JSON.stringify(this.wishlist));

    console.log(this.wishlist);

  }


}
