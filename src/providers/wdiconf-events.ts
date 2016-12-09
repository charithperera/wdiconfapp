import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Event } from '../models/event';

/*
  Generated class for the WdiconfEvents provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WdiconfEvents {
  wdiconfEventsApiUrl = "https://wdiconfapi.herokuapp.com/api/events";
  now = new Date( Date.now() )
  upNextToday = new Date( Date.now() ).toDateString();
  temp = new Date( Date.now() );
  upNextFromTmrw = new Date(this.temp.setDate(this.temp.getDate() + 1)).toDateString();
  hours = this.now.getHours() < 10 ? ("0" + this.now.getHours()) : this.now.getHours();
  upNextTime = this.hours + "00";

  constructor(public http: Http) {
    console.log('Hello WdiconfEvents Provider');
  }

  load(): Observable<Event[]> {
    return this.http.get(`${this.wdiconfEventsApiUrl}?sort=date`)
      .map(res => <Event[]>res.json().results);
  }

  loadDetails(id: number): Observable<Event> {
    return this.http.get(`${this.wdiconfEventsApiUrl}/${id}`)
      .map(res => <Event>(res.json().results[0]))
  }

  loadForPresenter(id: number): Observable<Event[]> {
    return this.http.get(`${this.wdiconfEventsApiUrl}?presenter_id=${id}`)
      .map(res => <Event[]>res.json().results);
  }

  loadForVenue(id: number): Observable<Event[]> {
    return this.http.get(`${this.wdiconfEventsApiUrl}?venue_id=${id}`)
      .map(res => <Event[]>res.json().results);
  }

  loadForEvents(id: number): Observable<Event[]> {
    return this.http.get(`${this.wdiconfEventsApiUrl}?venue_id=${id}`)
      .map(res => <Event[]>res.json().results);
  }

  loadForDate(date: string): Observable<Event[]> {
    return this.http.get(`${this.wdiconfEventsApiUrl}?date=${date}&sort=time&order=desc`)
      .map(res => <Event[]>res.json().results);
  }

  loadUpNextToday(): Observable<Event[]> {
    return this.http.get(`${this.wdiconfEventsApiUrl}?date=${this.upNextToday}&time_from=${this.upNextTime}&sort=date`)
      .map(res => <Event[]>res.json().results);
  }

  loadUpNextFromTmrw(): Observable<Event[]> {
    return this.http.get(`${this.wdiconfEventsApiUrl}?date_from=${this.upNextFromTmrw}&sort=date`)
      .map(res => <Event[]>res.json().results);
  }

  searchEvents(searchParam: string): Observable<Event[]> {
    return this.http.get(`${this.wdiconfEventsApiUrl}?q=${searchParam}`)
      .map(res => <Event[]>(res.json().results))
  }

}
