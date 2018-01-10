import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import { CookieService } from 'ngx-cookie';

import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
  private base: String;
  private clientId: String;

  constructor(private _http: Http /*, private cookieService: CookieService*/) {
    this.base = environment.spotifyApi;
    this.clientId = environment.spotifyApi
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json')
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
      let url = this.base + `authorize?client_id=${this.clientId}&response_type=code&redirect_uri=http://localhost:4200`;
      debugger;
      return this.get(url);
  }
}