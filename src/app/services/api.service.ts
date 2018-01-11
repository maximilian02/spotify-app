import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
  private base: string;
  private clientId: string;
  private clientSecret: string;
  private authUrl: string;
  private token: any;

  constructor(private _http: Http /*, private cookieService: CookieService*/) {
    this.base = environment.spotifyApi;
    this.authUrl = environment.spotifyAuthUrl;
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json');

    if(this.token) {
      headers.append('Authorization', `Bearer ${this.token}`);
    }
  }

  get(action) {
    let headers = new Headers();

    return this.getToken().flatMap(res => {
      this.createAuthorizationHeader(headers);
      return this._http.get(this.base + action, {
        headers: headers
      });
    });
  }

  getToken(): Observable<string> {
    if(this.token) {
      return Observable.of(this.token);
    } else {
      return this.auth().map(res => {
        let data = res.json();
        if(data.success) {
          // TODO: The best way to store a token would be using cookies
          // for now lets keep it like this, in the future this can be fixed
          this.token = data.token;
        }
        return data;
      })
    }
  }

  auth() {
    const headers = new Headers();
    return this._http.post(this.authUrl + 'auth', {}, {
      headers: headers
    })
    .catch(this.handleError)
    .share();
  }

  private handleError (error: any) {
    const errMsg = error.message || 'Server error retrieving settings/rna';
    return Observable.throw(errMsg);
   }
}