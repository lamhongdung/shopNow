import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // user the router to navigate to specific url
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // search products based on its name
  searchProduct(searchValue: string) {
    
    console.log(`search value = ${searchValue}`);

    // navigate to `/search/${searchValue}`
    this.router.navigateByUrl(`/search/${searchValue}`);
  }
}
