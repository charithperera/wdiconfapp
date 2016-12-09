import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Presenter } from '../models/presenter';


/*
  Generated class for the WdiconfPresenters provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WdiconfPresenters {
  wdiconfPresentersApiUrl = 'https://wdiconfapi.herokuapp.com/api/presenters';

  constructor(public http: Http) {
    console.log('Hello WdiconfPresenters Provider');
  }

  load(): Observable<Presenter[]> {
    return this.http.get(`${this.wdiconfPresentersApiUrl}`)
      .map(res => <Presenter[]>res.json().results);
  }

  loadDetails(id: number): Observable<Presenter> {
    return this.http.get(`${this.wdiconfPresentersApiUrl}/${id}`)
      .map(res => <Presenter>(res.json().results[0]))
  }

  loadForEvent(id: Number): Observable<Presenter[]> {
    return this.http.get(`${this.wdiconfPresentersApiUrl}?event_id=${id}`)
      .map(res => <Presenter[]>res.json().results);
  }

  searchPresenters(searchParam: string): Observable<Presenter[]> {
    return this.http.get(`${this.wdiconfPresentersApiUrl}?q=${searchParam}`)
      .map(res => <Presenter[]>(res.json().results))
  }

}
