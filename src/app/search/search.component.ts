import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  public results: Array<any>;
  public query: string;
  public favorites: Array<any>;

  constructor(
    private searchService: SearchService,
    private favoritesService: FavoritesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.results = [];
      this.favorites = this.favoritesService.getFavorites();
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
              id: item.id,
              title: item.name,
              artist: artist,
              album: item.album.name,
              favorite: this.favoritesService.isFavorite(item.id)
            };
          });
        },
        err => {
          console.log(err);
        }
      );
  }

  addFavorite(item) {
    item.favorite = true;
    this.favoritesService.add(item);
  }

  removeFavorite(item) {
    item.favorite = false;
    this.favoritesService.remove(item.id);
  }
}
