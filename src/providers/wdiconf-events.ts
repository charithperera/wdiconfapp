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
  now = new Date( Date.now() );
  hours = this.now.getHours();
  year = this.now.getFullYear();
  month = (this.now.getMonth() + 1 < 10) ? ("0" + ( this.now.getMonth() + 1 )) : this.now.getMonth() + 1;
  day = (this.now.getDate() < 10) ? ("0" + this.now.getDate()) : this.now.getDate();
  upNextDate = "" + this.year + this.month + this.day;
  upNextTime = this.hours + "00";

  constructor(public http: Http) {
    console.log('Hello WdiconfEvents Provider');
  }

  load(): Observable<Event[]> {
    return this.http.get(`${this.wdiconfEventsApiUrl}`)
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

  loadUpNext(): Observable<Event[]> {
    return this.http.get(`${this.wdiconfEventsApiUrl}?date_from=${this.upNextDate}&time_from=${this.upNextTime}`)
      .map(res => <Event[]>res.json().results);
  }

}
