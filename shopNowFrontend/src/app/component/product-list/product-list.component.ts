import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product.service';
import { environment } from 'src/environments/environment';

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

  // thePageSize = 8;
  thePageSize: number = environment.pageSize;
  thePageSizeInit: number = environment.pageSize;

  theTotalElements: number = 0;

  previousSearchTerm: string | undefined;

  constructor(private productService: ProductService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    // this.route.paramMap returns an "Observable<ParamMap>""
    this.route.paramMap.subscribe(
      () => {
        this.listProducts();
      });
  }

  listProducts() {

    // check whether current url has "searchTerm" or not
    this.searchMode = this.route.snapshot.paramMap.has('searchTerm');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }

  handleSearchProducts() {

    // get value user inputs in the search box
    this.searchTerm = this.route.snapshot.paramMap.get('searchTerm') || "";

    if (this.previousSearchTerm != this.searchTerm) {
      this.thePageNumber = 1;
    }

    this.previousSearchTerm = this.searchTerm;

    this.productService.searchProducts(this.searchTerm, this.thePageNumber - 1,
      this.thePageSize).subscribe(
        data => {
          this.products = data._embedded.product;
          this.thePageNumber = data.page.number + 1;
          this.thePageSize = data.page.size;
          this.theTotalElements = data.page.totalElements;
        }
      )
  }

  handleListProducts() {

    this.productService.getProductListPaginate(this.thePageNumber - 1,
      this.thePageSize)
      .subscribe(data => {
        this.products = data._embedded.product;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      });
  }

  updatePageSize(target: any) {
    this.thePageSize = target.value;
    this.thePageNumber = 1;
    this.listProducts();
  }
}
