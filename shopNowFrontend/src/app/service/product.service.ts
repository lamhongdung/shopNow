import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // apiUrl: "http://localhost:8080/api"
  private baseUrl = environment.apiUrl + '/product';

  // inject httpClient
  constructor(private httpClient: HttpClient) { }

  searchProducts(theKeyword: string): Observable<Product[]> {

    // need to build URL based on the keyword 
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).
      pipe(
        map(response => response._embedded.product)
      );
  }

  // private getProducts(searchUrl: string): Observable<Product[]> {
  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(this.baseUrl).
      pipe(
        map(response => response._embedded.product)
      );
  }

  // getProductListPaginate(thePage: number,
  //   thePageSize: number,
  //   theCategoryId: number): Observable<GetResponseProducts> {

  //   // need to build URL based on category id, page and size
  //   const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theCategoryId}`
  //     + `&page=${thePage}&size=${thePageSize}`;

  //   console.log(`Getting products from - ${searchUrl}`);

  //   return this.httpClient.get<GetResponseProducts>(searchUrl);
  // }
}

interface GetResponseProducts {
  _embedded: {
    product: Product[];
  };
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  };
}
