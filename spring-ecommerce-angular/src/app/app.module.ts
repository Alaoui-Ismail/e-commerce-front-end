import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailProductComponent } from './components/dump/detail-product/detail-product.component';
import { DropdownsearchComponent } from './components/dump/dropdownsearch/dropdownsearch.component';
import { NavbarComponent } from './components/dump/navbar/navbar.component';
import { PageNotFoundComponent } from './components/dump/page-not-found/page-not-found.component';
import { UserDetailComponent } from './components/dump/user-detail/user-detail.component';
import { ArticleComponent } from './components/smart/article/article.component';
import { CategoryComponent } from './components/smart/category/category.component';
import { LoginComponent } from './components/smart/login/login.component';
import { RegisterComponent } from './components/smart/register/register.component';
import { SaveCommandComponent } from './components/smart/save-command/save-command.component';
import { InterceptorService } from './services/interceptor.service';
import { WishlistComponent } from './components/dump/wishlist/wishlist.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorService } from './services/auth-interceptor.service';




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
    UserDetailComponent,
    WishlistComponent,
   
    
    
   
  

  ],
  imports: [
   BrowserModule,
   AppRoutingModule,
   ReactiveFormsModule,
   HttpClientModule,
   FormsModule,
   MatProgressBarModule,
   BrowserAnimationsModule,
   ToastrModule.forRoot()
   

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS, useClass:InterceptorService, multi: true
    },
    {
       provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true 
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
