import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public isLoggedIn = false;
  
  constructor(private searchService: SearchService) {
    this.searchService.search()
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err)
        }
      );
  }

  ngOnInit() {
  }

}
