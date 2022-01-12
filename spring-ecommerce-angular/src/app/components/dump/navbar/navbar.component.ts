import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenService } from 'src/app/services/token.service';
import { transition, style, animate, trigger } from '@angular/animations';


const enterTransition = transition(':enter', [
  style({
    opacity: 0
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
  constructor(private accountService: AccountService,
    private tokenService: TokenService,
    private router: Router,
    public loaderService: LoaderService) {

  }


  ngOnInit(): void {

    this.accountService.authStatus.subscribe(() => {
      //   this.loaderService.isLoading;
      this.currentUser$ = this.tokenService.getInfos();
    })
  }

  logout() {
    this.tokenService.remove();
    this.accountService.changeStatus(false);
    this.router.navigateByUrl('/login');
  }


  show :boolean= false;
  showBalance :boolean=false;

  onClick() {
    if(this.show)
      return this.show=false
    else
        this.show = true;
    
    return null;
  
  }

  onSave() {
    this.show = false;
  }

  // cartFunction() {
  //   document.querySelectorAll("#cart").forEach(() => {
  //     document.querySelectorAll(".shopping-cart").forEach((y) => {

  //     })
  //   })
  // }
  // (function(){

  //   document.querySelector("#cart").addEventListener("click", function() {
  //     document.querySelector(".shopping-cart").fadeToggle( "fast");
  //   });

  // })();
}
