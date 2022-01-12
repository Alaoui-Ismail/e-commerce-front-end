import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';

import { AuthService } from 'src/app/services/auth.service';
import { InterceptorService } from 'src/app/services/interceptor.service';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  message: string = "";
  logged: boolean = false

  LoginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(5)])

  })



  get email() {
    return this.LoginForm.get('email');
  }

  get password() {
    return this.LoginForm.get('password');
  }
  constructor(private authService: AuthService,
    private tokenService: TokenService,
    private accountService: AccountService,
    private router: Router,
    private loader: LoaderService) { }

  ngOnInit(): void {
  }


  Login() {
    this.authService.login(this.LoginForm.value)
      .subscribe(data => {
        this.logged = true;

        this.handleLoginResponse(data);
        console.log(data);
        //this.loader.isLoading;

      },
        error => {
          console.error(error);
          this.message = "Bad Credentials, Please enter valid email and password !";
        },
        () => {
          console.log("completed with success");
        });

  }

  handleLoginResponse(res: Observable<User>) {

    this.tokenService.handle(res);
    this.accountService.changeStatus(true);
    this.router.navigateByUrl("categories/all");


  }

}
