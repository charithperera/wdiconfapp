import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { User } from '../models/user';



/*
  Generated class for the UserLogin provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserLogin {

  wdiConfUser = 'https://wdiconfapi.herokuapp.com/users';

  constructor(public http: Http) {
    console.log('Hello UserLogin Provider');

  }

  // loadForEvents(email: string, password: string): Observable<Event[]> {
  //   return this.http.post(`${this.wdiConfUser}?email=${id}&password=${password}`)
  //     .map(res => <User[]>res.json());
  // }

  // Load all user1
  load(): Observable<User[]> {
    return this.http.get(`${this.wdiConfUser}/users/1`)
      .map(res => <User[]>res.json().results);
  }


}
