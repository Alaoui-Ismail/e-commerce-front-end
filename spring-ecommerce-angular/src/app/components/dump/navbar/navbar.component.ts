import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenService } from 'src/app/services/token.service';
import { transition, style, animate, trigger } from '@angular/animations';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/Cart.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { DetailProductComponent } from '../detail-product/detail-product.component';


const enterTransition = transition(':enter', [
  style({
    opacity: 1
  }),
  animate('1s ease-in', style({
    opacity: 1
  }))
]);

const leaveTrans = transition(':leave', [
  style({
    opacity: 1
  }),
  animate('1s ease-out', style({
    opacity: 0
  }))
])

const fadeIn = trigger('fadeIn', [
  enterTransition
]);

const fadeOut = trigger('fadeOut', [
  leaveTrans
]);

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    fadeIn,
    fadeOut
  ]
})
export class NavbarComponent implements OnInit {

  currentUser$: null = null;


  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  cartItems: Cart[] = [];
  items: Cart[];
  qte: number;

  constructor(private accountService: AccountService,
    private tokenService: TokenService,
    private cartService: CartService,
    private router: Router,
    public loaderService: LoaderService,
    private carteService: CartService,
    public articleService: ArticlesService) {

  }


  ngOnInit(): void {
    //  this.getStorage();
    //  this.getLengthStorage();
    this.cartItems = JSON.parse(localStorage.getItem('cart'));
    this.totalPrice =  JSON.parse(localStorage.getItem('shopping'));
    this.totalQuantity =  JSON.parse(localStorage.getItem('qte'));

    

    
    this.updateCart()

    this.accountService.authStatus.subscribe(() => {
      this.currentUser$ = this.tokenService.getInfos();
    })

  }

  navigateTowishlist(){

   location.reload()
  }

  updateCart() {


     this.cartItems =  this.cartService.shopItems;
    console.log("iteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeems",this.cartItems)
     this.cartItems = JSON.parse(localStorage.getItem('cart'));
    console.log("items", this.items);

    this.cartService.priceTotal$.subscribe(
      data => {
        this.totalPrice = data;

        console.log("data", data)
      }
    );
    this.cartService.quantityTotal$.subscribe(
      data => {
        this.totalQuantity = data 
        // localStorage.setItem('qte',JSON.stringify(this.totalQuantity));
        console.log("data 2", data)
      }
    );

    console.log("cart status -----", this.totalPrice);
  }





  logout() {
    this.tokenService.remove();
    this.accountService.changeStatus(false);
    this.router.navigateByUrl('/login');
  }


  show: boolean = false;
  showBalance: boolean = false;

  onClick() {
    // this.navigateTowishlist();
    if (this.show)
      return this.show = false
    else
      this.show = true;

    return null;

  }

  onSave() {
    this.show = false;
  }


}
