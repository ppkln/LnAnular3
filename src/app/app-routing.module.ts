import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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


const routes: Routes = [
  {path:'', pathMatch:'full',redirectTo:'product-list'},
  {path:'register',component:RegisterComponent},
  {path:'register/:regis',component:RegisterComponent},
  {path:'profile/:idMem',component:ProfileComponent},
  {path:'update-profile/:idMem',component:UpdateProfileComponent},
  {path:'delete-member',component:DeleteMemberComponent},
  {path:'login',component:LoginComponent},
  {path:'login/:loginAgn',component:LoginComponent},
  {path:'logout',component:LogoutComponent},
  {path:'add-product',component:AddProductComponent},
  {path:'add-product/:Agn',component:AddProductComponent},
  {path:'product-list',component:ProductsListComponent},
  {path:'update-product/:idPro',component:UpdateProductComponent},
  {path:'delete-product/:idPro',component:DeleteProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
