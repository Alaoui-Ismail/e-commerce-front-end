import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  message: string = "";

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
  constructor(private authService: AuthService, private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  Login() {
    this.authService.login(this.LoginForm.value)
      .subscribe(data => {
      
        console.log(data)

      },
        error => {
         
          console.error(error);

          this.message = "Bad Credentials, Please enter valid email and password !";
        },
        ()=> {
          console.log("completed with success");
        });

  }

}
