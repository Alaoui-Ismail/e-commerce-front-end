import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/Cart.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {


  cartItems: Cart[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  @Input()
  show: boolean = false;

  constructor(private carteService: CartService, public articleService: ArticlesService) { }

  ngOnInit(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cart'));
    JSON.parse(localStorage.getItem('shopping'));
    JSON.parse(localStorage.getItem('qte'));

    this.CartDetails();
  }


  CartDetails() {
    this.totalPrice = JSON.parse(localStorage.getItem('shopping'));
    this.totalQuantity = JSON.parse(localStorage.getItem('qte'));
    // this.cartItems =  this.carteService.shopItems;
    console.log("iteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeems", this.cartItems)
    this.cartItems = JSON.parse(localStorage.getItem('cart'));


    this.carteService.priceTotal$.subscribe(
      data => {
        this.totalPrice = data;

        console.log("data", data)
      }
    );
    this.carteService.quantityTotal$.subscribe(
      data => {
        this.totalQuantity = data
        // localStorage.setItem('qte',JSON.stringify(this.totalQuantity));
        console.log("data 2", data)
      }
    );

    // JSON.parse(localStorage.getItem('qte'))
    // localStorage.setItem('cart', JSON.stringify(this.cartItems));

    // this.show = true;
    // this.cartItems = this.carteService.cartItems;

    // this.carteService.priceTotal$.subscribe(
    //   data => this.totalPrice = data
    // );

    // this.carteService.quantityTotal$.subscribe(
    //   data => this.totalQuantity = data
    // );


    // localStorage.setItem('shopping', JSON.stringify(this.cartItems));
    // this.carteService.countTotalPriceAndQuanity();
  }


  removeItem(item: Cart) {
    // this.cartItems = JSON.parse(localStorage.getItem('cart'));
    console.log("remove", this.cartItems)
    this.cartItems.forEach((value, index) => {
      if (value === item) this.cartItems.splice(index, 1);
    });
    this.totalPrice -= item.price;
    console.log("price -1", this.totalPrice);
    this.totalQuantity--;

    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    localStorage.setItem('qte', JSON.stringify(this.cartItems.length));
    localStorage.setItem('shopping', JSON.stringify(this.totalPrice));

      location.reload();
   console.log("length",JSON.parse(localStorage.getItem('qte'))) 
    

    // this.CartDetails();
    console.log("items", this.cartItems);

  }



}

