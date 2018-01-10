import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
  private base: string;
  private clientId: string;
  private clientSecret: string;
  private authUrl: string;
  private token: string;

  constructor(private _http: Http /*, private cookieService: CookieService*/) {
    this.base = environment.spotifyApi;
    this.authUrl = environment.spotifyAuthUrl;
    this.token = '';
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json');

    if(this.token) {
      headers.append('Authorization', `Bearer ${this.token}`);
    }
  }

  get(action) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this._http.get(this.base + action, {
      headers: headers
    });
  }

  post(action, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this._http.post(this.base + action, data, {
      headers: headers
    });
  }

  auth() {
    const headers = new Headers();
    this._http.post(this.authUrl + 'auth', {}, {
      headers: headers
    })
    .map(res => res.json())
    .subscribe(
      data => {
        if(data.success) {
          // TODO: The best way to store a token would be using cookies
          // for now lets keep it like this, in the future this can be fixed
          this.token = data.token;
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}