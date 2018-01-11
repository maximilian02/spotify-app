import { Component } from '@angular/core';
import { Router, NavigationEnd, Event} from '@angular/router';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: String = 'Spotify Web App';
  public content: string;

  constructor(private router: Router) {
    this.content = 'search';
    this.router.events.filter(event => event instanceof NavigationEnd)
        .subscribe(event => {
            this.content = (event as NavigationEnd).url;
            // TODO: just in case we have query parameters in the url, lets asume we always gonna have this format
            this.content = this.content.includes('?') ? this.content.split('?')[0] : this.content;
        });
  }

}
