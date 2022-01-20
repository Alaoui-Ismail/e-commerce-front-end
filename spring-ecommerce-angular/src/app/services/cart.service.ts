import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart } from '../models/Cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  // const bodyCart = {
  //   'name': product.articleName,
  //   'description': product.articleDescription,
  //   'price': product.articlePrice,
  //   'image': product.imageName
  // }
  // this.cartList = JSON.parse(localStorage.getItem('shopping'));
  // this.cartList.push(bodyCart);
  // localStorage.setItem('shopping', JSON.stringify(this.cartList));
  // console.log("items", this.cartList);

  cartItems: Cart[] = [];
  shopItems: Cart[] = [];

  readonly host = `http://localhost:8888/commands/add`;

  priceTotal$: Subject<number> = new Subject<number>();
  quantityTotal$: Subject<number> = new Subject<number>();

  constructor(private http: HttpClient) {
  // JSON.parse(localStorage.getItem('shopping'));
    // if (ls) {
    //   this.priceTotal$.next(ls);
    //   this.quantityTotal$.next(ls);
    //   console.log("price",this.priceTotal$.next(ls))
    //   console.log("qute",this.quantityTotal$.next(ls))

    // }
  }

  addToCart(cartItem: Cart) {
    //  JSON.parse(localStorage.getItem('shopping'));
    //   JSON.parse(localStorage.getItem('qte'));
    // const tmpStorage = JSON.parse(localStorage.getItem('shopping'));

    // console.log(tmpStorage);
    let existsInCart: boolean = false;
    let checkItem: Cart;


    if (this.cartItems.length > 0) {

      checkItem = this.cartItems.find(currentItem => currentItem.id === cartItem.id)
    }

    existsInCart = (checkItem != undefined);
    // JSON.parse(localStorage.getItem('shopping'));

    if (existsInCart) {
      checkItem.quantity++;
      console.log("exists");
      checkItem.quantity++;
      let incrementItem = ((checkItem.quantity - checkItem.quantity) + 1);
      console.log("incre", incrementItem++);
      incrementItem++;
      // localStorage.setItem('shopping', JSON.stringify(tmpStorage));
    } else {
       this.cartItems = JSON.parse(localStorage.getItem('cart'));
       this.cartItems.push(cartItem);
       localStorage.setItem('cart', JSON.stringify(this.cartItems));
      
       this.shopItems = this.cartItems;
       console.log("shop itmes", this.shopItems);
    }
    const body = {
      article_id: cartItem.id,
      articleQte: 1
    }
    // console.log("new storage ",JSON.parse(localStorage.getItem('shopping')));
    console.log("body ", body);

    this.countTotalPriceAndQuanity();
    return this.http.post(this.host, body, { responseType: 'text' });
  }



  countTotalPriceAndQuanity() {
  

    let totalPriceValue: number = 0;
    let totalQuanityValue: number = 0;

    for (let currentItem of this.cartItems) {
      // console.log('current quantity ', currentItem.quantity);
      console.log('click  quantity ', ((currentItem.quantity - currentItem.quantity) + 1));

      totalPriceValue += ((currentItem.quantity - currentItem.quantity) + 1) * currentItem.price;
      totalQuanityValue += ((currentItem.quantity - currentItem.quantity) + 1);
      localStorage.setItem('shopping',JSON.stringify(totalPriceValue));
      localStorage.setItem('qte',JSON.stringify(totalQuanityValue));

    }
    // JSON.parse(localStorage.getItem('shopping'));
    this.priceTotal$.next(totalPriceValue);
    this.quantityTotal$.next(totalQuanityValue);

    // localStorage.setItem('shopping',JSON.stringify(this.priceTotal$.next(totalPriceValue)));
    // localStorage.setItem('shopping',JSON.stringify(this.priceTotal$));
    // localStorage.setItem('shopping',JSON.stringify(this.quantityTotal$));

    this.logCartData(totalPriceValue, totalQuanityValue);
  }



  getStorageShopping() {
    return JSON.parse(localStorage.getItem('shopping'))
  }
  logCartData(totalPriceValue: number, totalQuanityValue: number) {
    console.log("----------------------------------------------")
    console.log("new strg ", JSON.parse(localStorage.getItem('shopping')))

    console.log("read cart data ...");
    for (let tempItemOfCart of this.cartItems) {
      const subTotalPrice = tempItemOfCart.price * ((tempItemOfCart.quantity - tempItemOfCart.quantity) + 1);
      console.log(`name = ${tempItemOfCart.name}, quantity = ${((tempItemOfCart.quantity - tempItemOfCart.quantity) + 1)},price = ${tempItemOfCart.price}, subTotal = ${subTotalPrice}`
      );
    }
    console.log(` price total = ${totalPriceValue.toFixed(2)}, quantity total = ${totalQuanityValue}`);
    console.log("e----n---d");
  }
}
