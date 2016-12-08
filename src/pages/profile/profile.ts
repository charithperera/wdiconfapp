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

  signupDetails = {
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  }

  user = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    image_url: 'http://placehold.it/350x350'
  }

  showLogin: boolean = false;
  showSignup: boolean = false;
  showProfile: boolean = false;

  loginError: string = ""
  signupError: string = ""


  constructor(public navCtrl: NavController, private userLogin: UserLogin, public http: Http) {

    this.checkToken();

  }

  loadSignup() {
    this.showLogin = false;
    this.showSignup = true;
    this.showProfile = false;
  }

  loadLogin() {
    this.showLogin = true;
    this.showSignup = false;
    this.showProfile = false;
  }

  hideAllPages() {
    this.showProfile = false;
    this.showSignup = false;
    this.showLogin = false;
    this.loginDetails = {
      email: "",
      password: ""
    }
    this.signupDetails = {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    }
  }

  checkToken() {
    this.loginError = "";
    this.signupError = "";
    this.hideAllPages();
    if (window.localStorage.getItem('wdiConfToken') !== null) {
      this.loadProfile();
    }
    else {
      this.showLogin = true;
    }

  }

  loadProfile() {
    var headers = new Headers();
      var auth = 'Bearer ' + window.localStorage.getItem('wdiConfToken');

      // headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Authorization', auth);

      new Promise(resolve => {
         this.http.get('http://wdiconfapi.herokuapp.com/getinfo', {headers: headers}).subscribe(data => {
             if(data){
               console.log(data.json())
               if (data.json().success) {
                 console.log(data.json().user);
                 this.user = data.json().user;
                 this.showProfile = true;

               } else {
                 this.showLogin = true;
               }
               resolve(true);
             }
             else {
               this.showLogin = true;
               resolve(false);
             }
         });
      });

  }

  loginForm(form) {
    this.hideAllPages();
   var creds = "email=" + form.value.email + "&password=" + form.value.password;
   var headers = new Headers();
   headers.append('Content-Type', 'application/x-www-form-urlencoded');


   new Promise(resolve => {
       this.http.post('https://wdiconfapi.herokuapp.com/authenticate', creds, {headers: headers}).subscribe(data => {
           if(data){
             console.log(data.json())
             if (data.json().success) {
               window.localStorage.setItem('wdiConfToken', data.json().token);
              this.checkToken();
             }
             else {
               this.loginError = data.json().msg;
             }
             resolve(true);
           }
           else {
             resolve(false);
           }

       });
   });

  }

  signupForm(form) {
   var creds = "first_name=" + form.value.first_name + "&last_name=" + form.value.last_name + "&email=" + form.value.email + "&password=" + form.value.password;
   var headers = new Headers();
   headers.append('Content-Type', 'application/x-www-form-urlencoded');


   new Promise(resolve => {
       this.http.post('http://wdiconfapi.herokuapp.com/signup', creds, {headers: headers}).subscribe(data => {
           if(data){
             console.log(data.json())
             if (data.json().success) {
               this.loginForm(form);
             }
             else {
               this.signupError = "Email already used";
             }
             resolve(true);
           }
           else {
             resolve(false);
           }
       });
   });

  }

   logOut() {
     window.localStorage.removeItem('wdiConfToken')
     this.checkToken();
   }

  ionViewDidLoad() {
    console.log('Hello ProfilePage Page');
  }

}
