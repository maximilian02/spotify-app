import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import { CookieService } from 'ngx-cookie';

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
    this.clientId = environment.spotifyClientId;
    this.clientSecret = environment.spotifySecret;
    this.token = '';
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'application/json');
  }

  createAuthorizationToken(headers: Headers) {
    const clientId = btoa(this.clientId);
    // TODO: this is not good. Frontend shouldn't handle this kind of secret stuff.
    // but for this example keep it
    const clientSecret = btoa(this.clientSecret);
    headers.append('Authorization', `Basic: ${clientId}:${clientSecret}`);
    const a = `Basic: ${clientId}:${clientSecret}`;
    debugger;
  }

  get(action) {
    let headers = new Headers();
    // this.createAuthorizationHeader(headers);
    return this._http.get(this.base + action, {
      headers: headers
    });
  }

  post(action, data) {
    let headers = new Headers();
    // this.createAuthorizationHeader(headers);
    return this._http.post(this.base + action, data, {
      headers: headers
    });
  }

  auth() {
    let headers = new Headers();
    this.createAuthorizationToken(headers);

    const url = this.authUrl + `client_id=${this.clientId}&response_type=code&redirect_uri=http://localhost:4200`;
    const data = { grant_type: 'client_credentials' };
    return this._http.post(url, data, {
      headers: headers
    });
  }
}