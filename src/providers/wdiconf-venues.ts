import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Venue } from '../models/venue';

/*
  Generated class for the WdiconfVenues provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WdiconfVenues {

  wdiconfVenuesApiUrl = 'https://wdiconfapi.herokuapp.com/api/venues';

  constructor(public http: Http) {
    console.log('Hello WdiconfVenues Provider');
  }

  // Load all wdiconf venues
  load(): Observable<Venue[]> {
    return this.http.get(`${this.wdiconfVenuesApiUrl}`)
      .map(res => <Venue[]>res.json().results);
  }

  // Get venue details user by venue ID
  loadDetails(id: number): Observable<Venue> {
    return this.http.get(`${this.wdiconfVenuesApiUrl}/${id}`)
      .map(res => <Venue>(res.json().results));
  }



}
