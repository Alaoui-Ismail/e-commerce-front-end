import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  public usersList$ : any;

  public id : any;

  public user : any;

  constructor(public userService : UserService) { }

  ngOnInit(): void {
   
    this.check();
    this.getUserConnected();
  }

  public check(){
    this.id = localStorage.getItem('id');
    console.log(this.id);
  }



   
//  resolveAfter1Second() {
//   console.log("starting fast promise")
//   return new Promise(resolve => {
//     setTimeout(()=> {
//       this.getUserConnected();
//       resolve("fast")
     
//     }, 3000)
//   })
// }
  

   public getUserConnected(){
    this.userService.getRessources("/users/getAll")
    
    .subscribe(data =>{
      console.log("its time to show informations");

      console.log(data)
      this.usersList$= data;
      let item = 0;
      for(item; item< this.usersList$.length; item++){
        if(this.usersList$[item].userId === this.id){
          this.user = this.usersList$[item];
          console.log(this.usersList$[item]);
        }
      }
    })
  }

}
