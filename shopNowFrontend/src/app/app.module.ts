import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './service/product.service';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { Routes, RouterModule, Router} from '@angular/router';
import { SearchComponent } from './component/search/search.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './component/cart-status/cart-status.component';
import { CartDetailComponent } from './component/cart-detail/cart-detail.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  // {path: 'order-history', component: OrderHistoryComponent, canActivate: [ OktaAuthGuard ]},
  // {path: 'members', component: MembersPageComponent, canActivate: [ OktaAuthGuard ]},

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
  declarations: [
    AppComponent,
    ProductListComponent,
    FooterComponent,
    HeaderComponent,
    SearchComponent,
    ProductDetailComponent,
    CartStatusComponent,
    CartDetailComponent,
    CheckoutComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
