import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/members/register/register.component';
import { ProfileComponent } from './components/members/profile/profile.component';
import { UpdateProfileComponent } from './components/members/update-profile/update-profile.component';
import { DeleteMemberComponent } from './components/members/delete-member/delete-member.component';
import { LoginComponent } from './components/members/login/login.component';
import { LogoutComponent } from './components/members/logout/logout.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { DeleteProductComponent } from './components/products/delete-product/delete-product.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ProfileComponent,
    UpdateProfileComponent,
    DeleteMemberComponent,
    LoginComponent,
    LogoutComponent,
    AddProductComponent,
    ProductsListComponent,
    UpdateProductComponent,
    DeleteProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
