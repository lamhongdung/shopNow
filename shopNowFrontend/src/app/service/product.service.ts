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

  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(this.baseUrl).
      pipe(
        map(response => response._embedded.product)
      );
  }

  // getProductById()
  getProduct(theProductId: number): Observable<Product> {

    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  searchProducts(searchTerm: string,thePage: number, thePageSize: number): Observable<GetResponseProducts> {

    // need to build URL based on the keyword 
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${searchTerm}&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
  
  getProductListPaginate(thePage: number, thePageSize: number): Observable<GetResponseProducts> {

    // need to build URL based on category id, page and size
    const searchUrl = `${this.baseUrl}?page=${thePage}&size=${thePageSize}`;

    console.log(`Getting products from - ${searchUrl}`);

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
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
