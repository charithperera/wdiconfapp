import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserLogin } from '../../providers/user-login';

import { Http, Headers } from '@angular/http';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  loginDetails = {
    email: "",
    password: ""
  }

  loggedIn: boolean = false;


  constructor(public navCtrl: NavController, private userLogin: UserLogin, public http: Http) {
    

    // this.loggedIn = false;
  }

  // logForm(form) {
  //   var result = this.userLogin.getJwt(form.value)
  //   console.log("hi" + result);
  //
  //
  //   // if (data.json().success) {
  //   // // this.showConfirm(data.json().token);
  //   // window.localStorage.setItem('raja', data.json().token);
  // }

  logForm(form) {
   // this.showConfirm(form.value);
   console.log(form.value)
   var creds = "email=" + form.value.email + "&password=" + form.value.password;
   var headers = new Headers();
   headers.append('Content-Type', 'application/x-www-form-urlencoded');


   new Promise(resolve => {
       this.http.post('http://wdiconfapi.herokuapp.com/authenticate', creds, {headers: headers}).subscribe(data => {
           if(data){
             console.log(data.json())
             if (data.json().success) {
               this.loggedIn = true;
               console.log(this.loggedIn);
              // this.showConfirm(data.json().token);
               window.localStorage.setItem('wdiConfToken', data.json().token);

             }
             resolve(true);
           }
           else
             resolve(false);
             return (data.json);
       });
   });


 }

  ionViewDidLoad() {
    console.log('Hello ProfilePage Page');
  }

}
