import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/smart/login/login.component';
import { NavbarComponent } from './components/dump/navbar/navbar.component';
import { PageNotFoundComponent } from './components/dump/page-not-found/page-not-found.component';

import { DropdownsearchComponent } from './components/dump/dropdownsearch/dropdownsearch.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/smart/register/register.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { InterceptorService } from './services/interceptor.service';
import { CategoryService } from './services/categories.service';
import { CategoryComponent } from './components/smart/category/category.component';
import { ArticleComponent } from './components/smart/article/article.component';
import { DetailProductComponent } from './components/dump/detail-product/detail-product.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SaveCommandComponent } from './components/smart/save-command/save-command.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    PageNotFoundComponent,
    RegisterComponent,
    DropdownsearchComponent,
    CategoryComponent,
    ArticleComponent,
    DetailProductComponent,
    SaveCommandComponent,
   
    
    
   
  

  ],
  imports: [
   BrowserModule,
   AppRoutingModule,
   ReactiveFormsModule,
   HttpClientModule,
   FormsModule,
   MatProgressBarModule,
   BrowserAnimationsModule
   

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS, useClass:InterceptorService, multi: true
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
