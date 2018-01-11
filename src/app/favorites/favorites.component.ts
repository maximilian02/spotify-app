import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  public results: Array<any>;

  constructor() {
    this.results = [];
  }

  ngOnInit() {
  }

}
