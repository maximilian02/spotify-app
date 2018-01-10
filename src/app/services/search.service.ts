import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SearchService {

  constructor(private apiService: ApiService) {}

  search() {
      return this.apiService.auth()
        .map(res => res.json());
  }

}