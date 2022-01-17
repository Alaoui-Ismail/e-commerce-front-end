import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart } from '../models/Cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItems: Cart[] = [];
   readonly host = "http://localhost:8888/commands/add";

  priceTotal$: Subject<number> = new Subject<number>();
  quantityTotal$: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: Cart) {
    
    let existsInCart: boolean = false;
    let checkItem: Cart ;

    if (this.cartItems.length > 0) {

        checkItem = this.cartItems.find(currentItem => currentItem.id === cartItem.id)
    }

    existsInCart = (checkItem!=undefined);

    if(existsInCart){
       checkItem.quantity++;
      console.log("exists");
      checkItem.quantity++;
      let incrementItem =  ((checkItem.quantity-checkItem.quantity)+1);
      console.log("incre" ,incrementItem++);
      incrementItem++;
    }else{
      this.cartItems.push(cartItem);
    }

    this.countTotalPriceAndQuanity();
  }

  countTotalPriceAndQuanity() {
      let totalPriceValue :number =0;
      let totalQuanityValue :number = 0;

      for(let currentItem of this.cartItems){
        // console.log('current quantity ', currentItem.quantity);
        console.log('click  quantity ', ((currentItem.quantity-currentItem.quantity)+1));

        totalPriceValue += ((currentItem.quantity-currentItem.quantity)+1) * currentItem.price;
        totalQuanityValue+= ((currentItem.quantity-currentItem.quantity)+1);
      }

      this.priceTotal$.next(totalPriceValue);
      this.quantityTotal$.next(totalQuanityValue);


      this.logCartData(totalPriceValue, totalQuanityValue);
  }

  logCartData(totalPriceValue: number, totalQuanityValue: number) {

    console.log("read cart data ...");
    for(let tempItemOfCart of this.cartItems){
      const subTotalPrice = tempItemOfCart.price * ((tempItemOfCart.quantity-tempItemOfCart.quantity)+1);
      console.log(`name = ${tempItemOfCart.name}, quantity = ${((tempItemOfCart.quantity-tempItemOfCart.quantity)+1)},price = ${tempItemOfCart.price}, subTotal = ${subTotalPrice}`
                 );
    }
    console.log(` price total = ${totalPriceValue.toFixed(2)}, quantity total = ${totalQuanityValue}`);
    console.log("e----n---d");
  }
}
