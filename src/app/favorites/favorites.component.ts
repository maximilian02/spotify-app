import { Component } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  public results: Array<any>;

  constructor(private favoritesService: FavoritesService) {
    this.results = this.favoritesService.getFavorites();
  }

  removeFavorite(item) {
    // TODO: Would be great if this can prompt a confirmation dialog
    // just to avoid user deleting a record by error
    item.favorite = false;
    this.favoritesService.remove(item.id);
    this.results = this.favoritesService.getFavorites();
  }

}
