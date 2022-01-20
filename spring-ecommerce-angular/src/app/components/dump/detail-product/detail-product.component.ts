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
    this.CartDetails();
  }


  CartDetails() {

    this.show = true;
    this.cartItems = this.carteService.cartItems;

    this.carteService.priceTotal$.subscribe(
      data => this.totalPrice = data
    );

    this.carteService.quantityTotal$.subscribe(
      data => this.totalQuantity = data
    );

   
    // localStorage.setItem('shopping', JSON.stringify(this.cartItems));
    this.carteService.countTotalPriceAndQuanity();
  }


  removeItem(item: Cart) {


    this.cartItems.forEach((value, index) => {
      if (value == item) this.cartItems.splice(index, 1);
    });
    this.totalPrice -=item.price;
    console.log("price -1", this.totalPrice);
    this.totalQuantity--;

    this.CartDetails();
    console.log(this.cartItems);

  }



}

