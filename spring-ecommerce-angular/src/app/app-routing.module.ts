import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/dump/page-not-found/page-not-found.component';
import { LoginComponent } from './components/smart/login/login.component';
import { RegisterComponent } from './components/smart/register/register.component';



const routes : Routes = [
  {path: "", redirectTo:"/login", pathMatch: 'full'},
  {path:"login" , component: LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"**", component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
