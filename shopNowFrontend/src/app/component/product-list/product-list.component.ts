import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  searchMode: boolean = false;

  searchTerm: string | undefined;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;


  constructor(private productService: ProductService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    // the observables in this class only emit when the current and previous values differ based on shallow equality.
    // this.route.paramMap returns an "Observable<ParamMap>""
    this.route.paramMap.subscribe(
      () => {
        this.listProducts();
      });
  }

  listProducts() {

    // check whether current url has "keyword" or not
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }

  handleSearchProducts() {

    // get value user inputs in the search box
    // const theKeyword = this.route.snapshot.paramMap.get('keyword') || "";
    this.searchTerm = this.route.snapshot.paramMap.get('keyword') || "";

    // now search for the products using keyword
    // this.productService.searchProducts(theKeyword).subscribe(
    this.productService.searchProducts(this.searchTerm).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleListProducts() {

    // now get the products for the given category id
    this.productService.getProducts().subscribe(
      data => this.products = data
    )

    // this.productService.getProductListPaginate(this.thePageNumber - 1,
    //   this.thePageSize,
    //   this.currentCategoryId)
    //   .subscribe(data => {
    //     this.products = data._embedded.product;
    //     this.thePageNumber = data.page.number + 1;
    //     this.thePageSize = data.page.size;
    //     this.theTotalElements = data.page.totalElements;
    //   });
  }

  // processResult() {
  //   return data => {
  //     this.products = data._embedded.product;
  //     this.thePageNumber = data.page.number + 1;
  //     this.thePageSize = data.page.size;
  //     this.theTotalElements = data.page.totalElements;
  //   };
  // }

}
