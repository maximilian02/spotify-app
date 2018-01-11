import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class FavoritesService {
    public favorites: Array<any>;

    constructor(private storage: LocalStorageService) {
        this.init();
    }

    init() {
        if(this.storage.retrieve('favorites')) {
            this.updateFavorites();
        } else {
            this.storage.store('favorites', []);
            this.favorites = [];
        }
    }

    getFavorites(): Array<any> {
        this.updateFavorites();
        return this.favorites;
    }

    updateFavorites() {
        this.favorites = this.storage.retrieve('favorites');
    }

    isFavorite(itemId) {
        return this.favorites.some((fav) => {
            return fav.id === itemId;
        });
    }

    add(item) {
        // Before adding verify is not duplicated
        this.updateFavorites();

        if(!this.isFavorite(item.id)) {
            this.favorites.push(item);
            this.storage.store('favorites', this.favorites);
            console.log('', this.favorites);
        }
    }

    remove(itemId) {
        this.favorites = this.favorites.filter(item => {
            return item.id !== itemId;
        });
        this.storage.store('favorites', this.favorites);
    }
}