import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    { path: 'search', component: SearchComponent },
    { path: 'favorites', component: FavoritesComponent },
    { path: '', redirectTo: '/search', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(appRoutes);