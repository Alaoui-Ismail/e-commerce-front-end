import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { UpdateInfoService } from 'src/app/services/update-info.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-save-command',
  templateUrl: './save-command.component.html',
  styleUrls: ['./save-command.component.css']
})
export class SaveCommandComponent implements OnInit {



  personalDetails!: FormGroup;
  addressDetails!: FormGroup;
  educationalDetails!: FormGroup;
  personal_step = false;
  address_step = false;
  education_step = false;
  step = 1;

  public usersList$: any;

  public id: any;

  public user: any;

  public userFullName: string;

  public userEmail: string;

  public message: string;

  cmd: any;

  public cartArray: Array<any> = [];



  constructor(private formBuilder: FormBuilder, public userService: UserService,
    private updateService: UpdateInfoService, private cartService: CartService, private _toastr: ToastrService) { }

  ngOnInit() {

    this.executeBeforeMethod();
    this.personalDetails = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    });

    this.addressDetails = this.formBuilder.group({
      city: ['', Validators.required],
      phone: ['', Validators.required]
    });

    this.educationalDetails = this.formBuilder.group({

    });

    this.checkId();
    this.getInfosUserConnected();
    this.getName();
    this.getEmail();

  }

  executeBeforeMethod() {
    this.cartService.beforePayed().subscribe((data) => {

      this.cmd = data;
    })
  }
  get personal() { return this.personalDetails.controls; }

  get address() { return this.addressDetails.controls; }

  public getName(): string {
    //console.log(this.personalDetails.get('name').value)
    return this.personalDetails.get('name').value;

  }

  public getEmail(): string {
    return this.personalDetails.get('email').value;
  }

  public getCity(): string {
    return this.addressDetails.get('city').value;
  }
  public getPhone(): string {
    return this.addressDetails.get('phone').value;
  }


  showToastr() {
    this._toastr.success("command payed succesfully", "success")
  }

  next() {

    if (this.step == 1) {
      this.personal_step = true;
      if (this.personalDetails.invalid) { return }

      if (this.userFullName != this.getName()) {
        console.log("ERREUUUR");
        this.message = "Invalid full name";
        return false;
      }

      if (this.userEmail != this.getEmail()) {
        this.message = "Invalid email";
        return false;
      }

      this.step++
    }

    else if (this.step == 2) {
      this.address_step = true;
      this.updateInfoUser();
      if (this.addressDetails.invalid) { return }
      this.step++;
    }

  }




  updateInfoUser() {

    console.log("---------------------------------------")
    console.log("city ", this.getCity());
    const data = {
      'customerCity': this.getCity(),
      'customerPhone': this.getPhone()
    }
    this.updateService.updateinfo(data, this.user.id).subscribe((data) => {

      console.log("dataa user ", data);
    }, () => {
      console.error("error")
    }, () => {
      console.log("completed observable......")
    })
  }


  previous() {
    this.step--

    if (this.step == 1) {
      this.address_step = false;
    }
    if (this.step == 2) {

      this.education_step = false;
    }

  }


  submit() {

    if (this.step == 3) {

      const body = {
        commandId: this.cmd.commandId,
        client_id: this.user.id
      }
      this.cartService.payedCommand(body).subscribe((res) => {
        console.log(res);
      }, (error) => {
        console.log(error)
      }, () => {
        console.log("completed");
      })
      localStorage.setItem('cart', JSON.stringify(this.cartArray));
      localStorage.setItem('qte', JSON.stringify(0));
      localStorage.setItem('shopping', JSON.stringify(0));
      
      location.reload();
      this.showToastr();
      // alert("your order has been confirmed!")
    }
  }

  public checkId() {
    this.id = localStorage.getItem('id');
    console.log(this.id);
  }


  public getInfosUserConnected() {
    this.userService.getRessources("/users/getAll")

      .subscribe(data => {
        console.log("its time to show informations");

        console.log(data)
        this.usersList$ = data;
        let item = 0;
        for (item; item < this.usersList$.length; item++) {
          if (this.usersList$[item].userId === this.id) {
            this.user = this.usersList$[item];
            console.log(this.usersList$[item]);
          }
        }
        this.userFullName = this.user.firstname + " " + this.user.lastname;
        this.userEmail = this.user.email;

      })

  }

}
