import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../services/account.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public tokenService: TokenService, private accoutService: AccountService,
    private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.tokenService.loggedIn()) {
      this.tokenService.remove();
      this.accoutService.changeStatus(false);
      this.router.navigateByUrl("/login");
      return false;
    }
    return true;
  }

  }
