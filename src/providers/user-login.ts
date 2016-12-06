import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

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

  getJwt(loginDetails) {
   // this.showConfirm(form.value);
   console.log(loginDetails)
   var creds = "email=" + loginDetails.email + "&password=" + loginDetails.password;
   var headers = new Headers();
   headers.append('Content-Type', 'application/x-www-form-urlencoded');

   new Promise(resolve => {
       this.http.post('http://wdiconfapi.herokuapp.com/authenticate', creds, {headers: headers}).subscribe(data => {
           if(data){

             resolve(true);
           }
           else
             resolve(false);
           return data.json
       });
   });
 }






}
