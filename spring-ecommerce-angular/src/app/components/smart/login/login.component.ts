import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  LoginForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null,
      [
        Validators.required, Validators.minLength(8), Validators.maxLength(8)
      ]
    )

  })
  constructor() { }

  ngOnInit(): void {
  }

}
