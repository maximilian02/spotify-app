import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  public results: Array<any>;
  public query: string;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.results = [];
      let currentQuery = this.activatedRoute.snapshot.queryParams.q;
      if (currentQuery) {
        this.query = currentQuery;
        this.executeSearch(currentQuery);
      }
  }

  search(query: string) {
    this.router.navigate([ '/search' ], { queryParams: { q: query }, queryParamsHandling: 'merge'},)
    this.executeSearch(query);
  }

  executeSearch(query: string) {
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
