import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';

import { routing } from './app.routing';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

import { ApiService } from './services/api.service'
import { SearchService } from './services/search.service'

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    routing
  ],
  declarations: [
    AppComponent,
    SearchComponent,
    FavoritesComponent,
    PageNotFoundComponent
  ],
  providers: [ApiService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
