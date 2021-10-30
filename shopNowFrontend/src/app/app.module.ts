import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from './service/product.service';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { Routes, RouterModule, Router} from '@angular/router';
import { SearchComponent } from './component/search/search.component';


const routes: Routes = [
  // {path: 'order-history', component: OrderHistoryComponent, canActivate: [ OktaAuthGuard ]},
  // {path: 'members', component: MembersPageComponent, canActivate: [ OktaAuthGuard ]},

  // {path: 'login/callback', component: OktaCallbackComponent},
  // {path: 'login', component: LoginComponent},

  // {path: 'checkout', component: CheckoutComponent},
  // {path: 'cart-details', component: CartDetailsComponent},
  // {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},

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
    SearchComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
