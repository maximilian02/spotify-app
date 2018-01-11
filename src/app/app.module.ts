import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Ng2Webstorage } from 'ngx-webstorage';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';

import { routing } from './app.routing';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

import { ApiService } from './services/api.service'
import { SearchService } from './services/search.service'
import { FavoritesService } from './services/favorites.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    Ng2Webstorage,
    routing
  ],
  declarations: [
    AppComponent,
    SearchComponent,
    FavoritesComponent,
    PageNotFoundComponent
  ],
  providers: [ApiService, SearchService, FavoritesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
