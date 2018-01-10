import { Component, OnInit} from '@angular/core';
import { SearchService } from '../services/search.service';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  public results: Array<any>;

  constructor(
    private searchService: SearchService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.results = [];

    this.activatedRoute.params.subscribe((params: Params) => {
      let query = params['q'];
      debugger;
      if(query) {
        debugger;
        this.executeSearch(query);
      }
    });
  }


  search(query) {
    this.router.navigate([ '/search' ], { queryParams: { q: query }, replaceUrl: true},)
  }

  executeSearch(query) {
    this.searchService.search(query)
      .subscribe(
        data => {
          this.results = data.tracks.items.map((item) => {
            let artist = item.artists.map((artist) => artist.name);
            if(artist.length) {
              artist = artist.join(', ');
            }
            
            return {
              title: item.name,
              artist: artist,
              album: item.album.name
            };
          });
        },
        err => {
          console.log(err);
        }
      );
  }
}
