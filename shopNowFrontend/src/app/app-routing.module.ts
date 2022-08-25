import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailComponent } from './component/cart-detail/cart-detail.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { ProductListComponent } from './component/product-list/product-list.component';

const routes: Routes = [
  // {path: 'order-history', component: OrderHistoryComponent, canActivate: [ OktaAuthGuard ]},
  // {path: 'login/callback', component: OktaCallbackComponent},
  // {path: 'login', component: LoginComponent},

  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-detail', component: CartDetailComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'search/:searchTerm', component: ProductListComponent},
  {path: 'product', component: ProductListComponent},
  {path: '', redirectTo: '/product', pathMatch: 'full'},

  // if paths are not in the above list then redirects to path '/product'
  {path: '**', redirectTo: '/product', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
