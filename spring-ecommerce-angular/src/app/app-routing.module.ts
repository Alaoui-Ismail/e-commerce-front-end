import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './components/dump/page-not-found/page-not-found.component';
import { DropdownsearchComponent } from './components/dump/dropdownsearch/dropdownsearch.component';

import { LoginComponent } from './components/smart/login/login.component';
import { RegisterComponent } from './components/smart/register/register.component';
import { CategoryComponent } from './components/smart/category/category.component';
import { ArticleComponent } from './components/smart/article/article.component';
import { DetailProductComponent } from './components/dump/detail-product/detail-product.component';
import { SaveCommandComponent } from './components/smart/save-command/save-command.component';



const routes : Routes = [
  {path: "", redirectTo:"/login", pathMatch: 'full'},
  {path:"login" , component: LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"all",component:DropdownsearchComponent},
  {path:"product-details",component:DetailProductComponent},
  {path:'categories/:id', component: CategoryComponent},
  {path:'articles/:id', component: ArticleComponent},
  {path:'checkout', component: SaveCommandComponent},

  {path:"**", component:PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
